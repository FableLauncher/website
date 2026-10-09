import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import yaml from "yaml";
import { marked, type Tokens } from "marked";
import type { Author, BlogIndex, BlogPost, BlogPostFrontmatter } from "../src/types/blog";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contentDirectory = path.join(root, "content", "blog");
const outputPath = path.join(root, "src", "data", "blog-index.json");

marked.setOptions({ gfm: true, breaks: false });
const renderer = new marked.Renderer();
renderer.heading = ({ depth, text }: Tokens.Heading) => {
  const id = text
    .toLocaleLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
    .replace(/^-|-$/g, "");
  return `<h${depth} id="${id}">${text}</h${depth}>\n`;
};
marked.use({ renderer });

const calculateReadingTime = (content: string) => {
  const chineseCharacters = (content.match(/[\u4e00-\u9fa5]/g) ?? []).length;
  const englishWords = (content.match(/[a-zA-Z]+/g) ?? []).length;
  return Math.max(1, Math.ceil(chineseCharacters / 300 + englishWords / 200));
};

const parseFrontmatter = (source: string) => {
  const match = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(source);
  if (!match) return { metadata: {}, content: source };
  return {
    metadata: yaml.parse(match[1]) ?? {},
    content: source.slice(match[0].length),
  };
};

const listMarkdownFiles = async (directory: string): Promise<string[]> => {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) return listMarkdownFiles(entryPath);
      return entry.isFile() && entry.name === "index.md" ? [entryPath] : [];
    }),
  );
  return nested.flat();
};

const makeExcerpt = (content: string, maximumLength = 160) => {
  const plainText = content
    .replace(/#{1,6}\s/g, "")
    .replace(/\*\*|__|\*|_/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/`{1,3}[^`]*`{1,3}/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return plainText.length > maximumLength
    ? `${plainText.slice(0, maximumLength).trim()}…`
    : plainText;
};

const readAuthors = async (): Promise<Record<string, Author>> => {
  const authorFile = path.join(contentDirectory, "authors.yml");
  try {
    const source = await fs.readFile(authorFile, "utf8");
    return yaml.parse(source) ?? {};
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return {};
    throw error;
  }
};

const loadPost = async (
  filePath: string,
  language: "en" | "zh",
  authors: Record<string, Author>,
): Promise<BlogPost | null> => {
  const source = await fs.readFile(filePath, "utf8");
  const { metadata, content } = parseFrontmatter(source);
  const frontmatter = metadata as BlogPostFrontmatter;
  if (!frontmatter.title || !frontmatter.slug || !frontmatter.date) {
    console.warn(`Skipping a blog post without required title, slug, or date: ${filePath}`);
    return null;
  }

  const excerpt = frontmatter.description || makeExcerpt(content);
  const postAuthors = (frontmatter.authors ?? [])
    .map((authorId) => {
      const author = authors[authorId];
      if (!author) {
        console.warn(`Skipping unknown blog author "${authorId}" in ${filePath}`);
        return null;
      }
      return { ...author, id: authorId };
    })
    .filter((author): author is Author & { id: string } => author !== null);

  return {
    slug: frontmatter.slug,
    title: frontmatter.title,
    date: frontmatter.date,
    authors: postAuthors,
    tags: frontmatter.tags ?? [],
    category: frontmatter.category ?? "uncategorized",
    description: excerpt,
    image: frontmatter.image,
    content: await marked.parse(content),
    excerpt,
    readingTime: calculateReadingTime(content),
    lang: language,
  };
};

const buildBlogIndex = async (): Promise<BlogIndex> => {
  const authors = await readAuthors();
  const posts: BlogPost[] = [];

  for (const language of ["en", "zh"] as const) {
    const languageDirectory = path.join(contentDirectory, language);
    const files = await listMarkdownFiles(languageDirectory);
    for (const file of files) {
      const post = await loadPost(file, language, authors);
      if (post) posts.push(post);
    }
  }

  posts.sort((left, right) => Date.parse(right.date) - Date.parse(left.date));
  return {
    posts,
    authors,
    categories: [...new Set(posts.map((post) => post.category))],
    tags: [...new Set(posts.flatMap((post) => post.tags))],
  };
};

const main = async () => {
  const index = await buildBlogIndex();
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, `${JSON.stringify(index, null, 2)}\n`, "utf8");
  console.log(`Generated the Fable news index (${index.posts.length} published posts).`);
};

main().catch((error: unknown) => {
  console.error("Could not build the Fable news index.", error);
  process.exitCode = 1;
});

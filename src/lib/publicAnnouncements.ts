import DOMPurify from "dompurify";
import { marked } from "marked";
import type { BlogPost } from "../types/blog";
import { blogIndex, resolveBlogLang } from "./blog";

type PublicAnnouncement = {
  slug: string;
  title: string;
  summary: string;
  contentMarkdown: string;
  category: string;
  tags: string[];
  linkUrl: string | null;
  publishAt: string;
};

const apiBaseUrl = import.meta.env.VITE_ANNOUNCEMENTS_API_URL?.trim().replace(/\/+$/, "");

export function publicAnnouncementsUrl(baseUrl: string): string {
  return `${baseUrl.replace(/\/+$/, "")}/api/public/announcements`;
}

function estimateReadingTime(content: string): number {
  const cjk = (content.match(/[\u4e00-\u9fff]/g) ?? []).length;
  const words = (content.match(/[a-zA-Z]+/g) ?? []).length;
  return Math.max(1, Math.ceil(cjk / 300 + words / 200));
}

export function renderAnnouncementMarkdown(content: string): string {
  return DOMPurify.sanitize(marked.parse(content, { async: false, gfm: true }));
}

function isPublicAnnouncement(value: unknown): value is PublicAnnouncement {
  if (typeof value !== "object" || value === null) return false;
  const item = value as Record<string, unknown>;
  return typeof item.slug === "string" &&
    typeof item.title === "string" &&
    typeof item.summary === "string" &&
    typeof item.contentMarkdown === "string" &&
    typeof item.category === "string" &&
    Array.isArray(item.tags) &&
    item.tags.every((tag) => typeof tag === "string") &&
    (item.linkUrl === null || typeof item.linkUrl === "string") &&
    typeof item.publishAt === "string" &&
    Number.isFinite(Date.parse(item.publishAt));
}

export function parsePublicAnnouncements(payload: unknown): PublicAnnouncement[] {
  if (typeof payload !== "object" || payload === null || !("announcements" in payload) ||
      !Array.isArray(payload.announcements) ||
      !payload.announcements.every(isPublicAnnouncement)) {
    throw new Error("Announcements endpoint returned an invalid response.");
  }
  return payload.announcements;
}

function toBlogPost(item: PublicAnnouncement): BlogPost {
  return {
    slug: item.slug,
    title: item.title,
    date: item.publishAt,
    authors: [],
    tags: item.tags,
    category: item.category,
    description: item.summary,
    content: renderAnnouncementMarkdown(item.contentMarkdown),
    excerpt: item.summary,
    readingTime: estimateReadingTime(item.contentMarkdown),
    lang: "en",
    announcementLink: item.linkUrl,
  };
}

export async function loadPublicAnnouncements(
  signal?: AbortSignal,
  baseUrl = apiBaseUrl,
  fetcher: typeof fetch = fetch,
): Promise<BlogPost[]> {
  if (!baseUrl) return [];
  const response = await fetcher(
    publicAnnouncementsUrl(baseUrl),
    { method: "GET", signal, headers: { accept: "application/json" } },
  );
  if (!response.ok) throw new Error(`Announcements endpoint returned HTTP ${response.status}.`);
  const items = parsePublicAnnouncements(await response.json());
  const staticSlugs = new Set(blogIndex.posts.map((post) => post.slug));
  return Promise.all(items
    .filter((item) => typeof item.slug === "string" && !staticSlugs.has(item.slug))
    .map(toBlogPost));
}

export function mergeBlogPosts(
  language: string,
  dynamicPosts: BlogPost[],
  staticPostsSource: BlogPost[] = blogIndex.posts,
): BlogPost[] {
  const lang = resolveBlogLang(language);
  const staticPosts = staticPostsSource.filter((post) => post.lang === lang);
  const staticSlugs = new Set(staticPostsSource.map((post) => post.slug));
  const dynamic = dynamicPosts.filter((post) => !staticSlugs.has(post.slug));
  const combined = [...staticPosts, ...dynamic].sort(
    (left, right) => new Date(right.date).getTime() - new Date(left.date).getTime(),
  );
  return combined.length > 0 ? combined : staticPostsSource;
}

export function staticBlogPost(slug: string | undefined, language: string): BlogPost | undefined {
  if (!slug) return undefined;
  return blogIndex.posts.find((post) => post.slug === slug && post.lang === resolveBlogLang(language))
    ?? blogIndex.posts.find((post) => post.slug === slug);
}

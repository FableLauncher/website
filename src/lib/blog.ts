import blogIndexData from "../data/blog-index.json";
import type { BlogIndex, BlogPost } from "../types/blog";

export const blogIndex = blogIndexData as BlogIndex;

export type BlogLang = "zh" | "en";

export const resolveBlogLang = (language: string): BlogLang =>
  language.toLowerCase().startsWith("zh") ? "zh" : "en";

export const getPostsByLang = (language: string): BlogPost[] => {
  const posts = blogIndex.posts.filter((post) => post.lang === resolveBlogLang(language));
  return posts.length > 0 ? posts : blogIndex.posts;
};

export const findPost = (slug: string | undefined, language: string): BlogPost | undefined => {
  if (!slug) return undefined;
  return (
    blogIndex.posts.find(
      (post) => post.slug === slug && post.lang === resolveBlogLang(language),
    ) ?? blogIndex.posts.find((post) => post.slug === slug)
  );
};

import { useMemo } from "react";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import AuthorCard from "../components/blog/AuthorCard";
import RelatedPosts from "../components/blog/RelatedPosts";
import TOC from "../components/blog/TOC";
import { findPost, getPostsByLang, resolveBlogLang } from "../lib/blog";
import type { TOCItem } from "../types/blog";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const post = useMemo(() => findPost(slug, i18n.language), [slug, i18n.language]);
  const tocItems = useMemo((): TOCItem[] => {
    if (!post) return [];
    const headings = post.content.matchAll(/<h([2-3]) id="([^"]+)">([^<]+)<\/h[2-3]>/g);
    return Array.from(headings, (match) => ({
      level: Number(match[1]),
      id: match[2],
      text: match[3],
    }));
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen bg-[color-mix(in_srgb,var(--bg)_82%,transparent)] pb-20">
        <div className="mx-auto max-w-4xl px-4 pt-8 sm:px-6 lg:px-8">
          <Link
            to="/blog"
            className="mb-8 inline-flex min-h-11 items-center gap-2 text-[var(--text-2)] transition-colors hover:text-[var(--brand)]"
          >
            <ArrowLeft size={18} aria-hidden="true" />
            {t("blog.backToList")}
          </Link>
          <div className="glass-card p-12 text-center">
            <h1 tabIndex={-1} className="text-2xl font-bold text-[var(--text-1)]">
              {t("blog.notFound")}
            </h1>
          </div>
        </div>
      </div>
    );
  }

  const date = new Intl.DateTimeFormat(
    resolveBlogLang(i18n.language) === "zh" ? "zh-CN" : "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  ).format(new Date(post.date));

  return (
    <div className="min-h-screen bg-[color-mix(in_srgb,var(--bg)_82%,transparent)] pb-20 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <Link
          to="/blog"
          className="group mb-8 inline-flex min-h-11 items-center gap-2 text-[var(--text-2)] transition-colors hover:text-[var(--brand)]"
        >
          <ArrowLeft size={18} aria-hidden="true" className="transition-transform group-hover:-translate-x-1" />
          {t("blog.backToList")}
        </Link>

        <div className="flex flex-col gap-8 lg:flex-row">
          <article className="min-w-0 flex-1">
            {post.image && (
              <div className="relative mb-8 h-56 overflow-hidden bg-[var(--bg-alt)] sm:h-64 sm:rounded-2xl md:h-96">
                <img
                  src={post.image}
                  alt={post.title}
                  width="1600"
                  height="900"
                  decoding="async"
                  className="size-full object-cover"
                />
              </div>
            )}
            <header className="mb-8">
              <div className="mb-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-sm bg-[color-mix(in_srgb,var(--brand)_12%,transparent)] px-2 py-1 text-xs text-[var(--brand)]">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 tabIndex={-1} className="mb-4 text-3xl font-bold text-[var(--text-1)] md:text-4xl">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--text-2)]">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar size={14} aria-hidden="true" />
                  <time dateTime={post.date}>{date}</time>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={14} aria-hidden="true" />
                  {t("blog.readingTime", { minutes: post.readingTime })}
                </span>
              </div>
              {post.authors.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-4 border-t border-[var(--divider)]/20 pt-6">
                  {post.authors.map((author) => (
                    <AuthorCard key={author.id ?? author.name} author={author} />
                  ))}
                </div>
              )}
            </header>

            {tocItems.length > 0 && <div className="glass-card mb-8 p-5 lg:hidden"><TOC items={tocItems} /></div>}
            <div className="prose-custom max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>
          {tocItems.length > 0 && (
            <aside className="hidden w-64 shrink-0 lg:block">
              <TOC items={tocItems} />
            </aside>
          )}
        </div>
        <RelatedPosts posts={getPostsByLang(i18n.language)} currentSlug={post.slug} />
      </div>
    </div>
  );
};

export default BlogPostPage;

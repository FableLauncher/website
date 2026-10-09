import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import BlogCard from "../components/blog/BlogCard";
import { getPostsByLang } from "../lib/blog";

const BlogListPage = () => {
  const { t, i18n } = useTranslation();
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timeout = window.setTimeout(() => setQuery(searchInput.trim().toLocaleLowerCase()), 300);
    return () => window.clearTimeout(timeout);
  }, [searchInput]);

  const posts = useMemo(() => {
    const allPosts = getPostsByLang(i18n.language);
    if (!query) return allPosts;
    return allPosts.filter((post) =>
      [post.title, post.excerpt, ...post.tags].some((value) =>
        value.toLocaleLowerCase().includes(query),
      ),
    );
  }, [i18n.language, query]);

  return (
    <div className="min-h-screen bg-[color-mix(in_srgb,var(--bg)_82%,transparent)] pb-20 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 sm:pt-12 lg:px-8">
        <Link
          to="/"
          className="mb-6 inline-flex min-h-11 items-center gap-2 text-sm text-[var(--text-2)] transition-colors hover:text-[var(--brand)]"
        >
          <span aria-hidden="true">←</span>
          {t("common.backToHome")}
        </Link>

        <div className="mb-8 flex flex-col justify-between gap-6 sm:mb-12 lg:flex-row lg:items-end">
          <div>
            <h1 tabIndex={-1} className="mb-2 text-3xl font-bold text-[var(--text-1)] sm:text-4xl">
              {t("blog.title")}
            </h1>
            <p className="text-[var(--text-2)]">{t("blog.subtitle")}</p>
          </div>
          <label className="relative block w-full lg:max-w-xs">
            <Search
              size={17}
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-2)]"
            />
            <span className="sr-only">{t("blog.search")}</span>
            <input
              type="search"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder={t("blog.search")}
              className="min-h-12 w-full rounded-lg border border-[var(--divider)]/50 bg-[var(--bg)] py-2 pl-10 pr-3 text-base text-[var(--text-1)] placeholder:text-[var(--text-2)]/70"
            />
          </label>
        </div>

        {posts.length > 0 ? (
          <section aria-label={t("blog.title")} className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {posts.map((post) => <BlogCard key={post.slug} post={post} />)}
          </section>
        ) : (
          <div className="glass-card p-8 text-center sm:p-12" role="status">
            <p className="text-[var(--text-2)]">
              {query ? t("blog.noSearchResults") : t("blog.noPosts")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogListPage;

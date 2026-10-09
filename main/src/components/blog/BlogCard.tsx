import { Calendar, Clock, Tag } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import type { BlogPost } from "../../types/blog";
import { resolveBlogLang } from "../../lib/blog";

const BlogCard = ({ post }: { post: BlogPost }) => {
  const { t, i18n } = useTranslation();
  const formattedDate = new Intl.DateTimeFormat(
    resolveBlogLang(i18n.language) === "zh" ? "zh-CN" : "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  ).format(new Date(post.date));

  return (
    <Link
      to={`/blog/${post.slug}`}
      className="glass-card group block min-h-44 p-6 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-[var(--brand)]/40 hover:shadow-xl hover:shadow-[var(--brand)]/10"
    >
      {post.tags.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded-sm bg-[color-mix(in_srgb,var(--brand)_12%,transparent)] px-2 py-1 text-xs text-[var(--brand)]"
            >
              <Tag size={10} aria-hidden="true" />
              {tag}
            </span>
          ))}
        </div>
      )}
      <h2 className="mb-3 line-clamp-2 text-xl font-bold text-[var(--text-1)] transition-colors group-hover:text-[var(--brand)]">
        {post.title}
      </h2>
      <p className="mb-5 line-clamp-2 text-sm text-[var(--text-2)]">{post.excerpt}</p>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[var(--divider)]/20 pt-3 text-xs text-[var(--text-2)]">
        <span className="inline-flex items-center gap-1.5">
          <Calendar size={12} aria-hidden="true" />
          <time dateTime={post.date}>{formattedDate}</time>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock size={12} aria-hidden="true" />
          {t("blog.readingTime", { minutes: post.readingTime })}
        </span>
      </div>
    </Link>
  );
};

export default BlogCard;

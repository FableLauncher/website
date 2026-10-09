import { useTranslation } from "react-i18next";
import BlogCard from "./BlogCard";
import type { BlogPost } from "../../types/blog";

const RelatedPosts = ({ posts, currentSlug }: { posts: BlogPost[]; currentSlug: string }) => {
  const { t } = useTranslation();
  const related = posts.filter((post) => post.slug !== currentSlug).slice(0, 3);
  if (related.length === 0) return null;

  return (
    <section className="mt-16" aria-labelledby="related-posts-title">
      <h2 id="related-posts-title" className="mb-6 text-2xl font-bold text-[var(--text-1)]">
        {t("blog.relatedPosts")}
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {related.map((post) => <BlogCard key={post.slug} post={post} />)}
      </div>
    </section>
  );
};

export default RelatedPosts;

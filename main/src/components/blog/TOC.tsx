import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { TOCItem } from "../../types/blog";

const TOC = ({
  items,
  className = "sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto",
}: {
  items: TOCItem[];
  className?: string;
}) => {
  const { t } = useTranslation();
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const active = entries.find((entry) => entry.isIntersecting);
        if (active) setActiveId(active.target.id);
      },
      { rootMargin: "-80px 0% -80% 0%", threshold: 0 },
    );
    items.forEach((item) => {
      const heading = document.getElementById(item.id);
      if (heading) observer.observe(heading);
    });
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav className={className} aria-label={t("blog.toc")}>
      <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-[var(--text-1)]">
        {t("blog.toc")}
      </h2>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${encodeURIComponent(item.id)}`}
              aria-current={activeId === item.id ? "location" : undefined}
              className={`flex min-h-10 items-center rounded px-2 py-1 text-sm transition-colors hover:text-[var(--brand)] ${
                item.level === 3 ? "pl-4" : ""
              } ${activeId === item.id ? "bg-[color-mix(in_srgb,var(--brand)_10%,transparent)] text-[var(--brand)]" : "text-[var(--text-2)]"}`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TOC;

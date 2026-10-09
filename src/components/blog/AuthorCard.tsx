import type { Author } from "../../types/blog";

const AuthorCard = ({ author }: { author: Author }) => {
  const content = (
    <>
      {author.image_url ? (
        <img
          src={author.image_url}
          alt=""
          width="40"
          height="40"
          loading="lazy"
          decoding="async"
          className="size-10 rounded-full object-cover"
        />
      ) : (
        <span
          aria-hidden="true"
          className="flex size-10 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--brand)_16%,transparent)] text-sm font-semibold text-[var(--brand)]"
        >
          {author.name.slice(0, 1)}
        </span>
      )}
      <span className="min-w-0">
        <span className="block truncate text-sm font-semibold text-[var(--text-1)]">{author.name}</span>
        {author.title && <span className="block truncate text-xs text-[var(--text-2)]">{author.title}</span>}
      </span>
    </>
  );

  return author.url ? (
    <a
      href={author.url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-11 min-w-11 items-center gap-3"
    >
      {content}
    </a>
  ) : (
    <div className="inline-flex min-h-11 min-w-11 items-center gap-3">{content}</div>
  );
};

export default AuthorCard;

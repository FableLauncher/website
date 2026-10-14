// @vitest-environment jsdom
import { describe, expect, it, vi } from "vitest";
import type { BlogPost } from "../types/blog";
import {
  mergeBlogPosts,
  loadPublicAnnouncements,
  parsePublicAnnouncements,
  publicAnnouncementsUrl,
  renderAnnouncementMarkdown,
} from "./publicAnnouncements";

function post(slug: string, lang = "en", date = "2030-01-01T00:00:00.000Z"): BlogPost {
  return {
    slug,
    title: slug,
    date,
    authors: [],
    tags: [],
    category: "",
    description: "",
    content: "",
    excerpt: "",
    readingTime: 1,
    lang,
  };
}

describe("public Blog announcement merge", () => {
  it("prefers static Markdown content when a dynamic slug collides", () => {
    const staticPost = post("release-notes");
    const dynamicPost = post("release-notes");

    expect(mergeBlogPosts("en", [dynamicPost], [staticPost])).toEqual([staticPost]);
  });

  it("combines non-colliding posts and orders them newest first", () => {
    const staticPost = post("static", "en", "2030-01-01T00:00:00.000Z");
    const dynamicPost = post("dynamic", "en", "2030-02-01T00:00:00.000Z");

    expect(mergeBlogPosts("en", [dynamicPost], [staticPost])).toEqual([dynamicPost, staticPost]);
  });

  it("merges English announcements with localized Chinese static Blog listings", () => {
    const englishAnnouncement = post("english-announcement", "en", "2031-01-01T00:00:00.000Z");
    const chineseStatic = post("chinese-static", "zh");

    expect(mergeBlogPosts("zh-CN", [englishAnnouncement], [chineseStatic])).toEqual([
      englishAnnouncement,
      chineseStatic,
    ]);
  });

  it("preserves static Blog content when no dynamic announcements are available", () => {
    const staticPost = post("static-release");
    expect(mergeBlogPosts("en", [], [staticPost])).toEqual([staticPost]);
  });

  it("requests the English-only public endpoint without language parameters", () => {
    expect(publicAnnouncementsUrl("https://admin.example.com/")).toBe(
      "https://admin.example.com/api/public/announcements",
    );
  });

  it("rejects announcement records with malformed fields", () => {
    expect(() => parsePublicAnnouncements({
      announcements: [{ slug: "invalid", tags: "not-a-list" }],
    })).toThrow("Announcements endpoint returned an invalid response.");
  });

  it("accepts records matching the public announcement shape", () => {
    const item = {
      slug: "spring-update",
      title: "Spring update",
      summary: "A short update",
      contentMarkdown: "## Details",
      category: "News",
      tags: ["release"],
      linkUrl: null,
      publishAt: "2030-01-01T00:00:00.000Z",
    };

    expect(parsePublicAnnouncements({ announcements: [item] })).toEqual([item]);
  });

  it("loads and maps successful published announcement responses", async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(new Response(JSON.stringify({
      announcements: [{
        slug: "spring-update",
        title: "Spring update",
        summary: "A short update",
        contentMarkdown: "## Details",
        category: "News",
        tags: ["release"],
        linkUrl: null,
        publishAt: "2030-01-01T00:00:00.000Z",
      }],
    })));

    const posts = await loadPublicAnnouncements(undefined, "https://admin.example.com/", fetcher);

    expect(fetcher).toHaveBeenCalledWith(
      "https://admin.example.com/api/public/announcements",
      expect.objectContaining({ method: "GET", headers: { accept: "application/json" } }),
    );
    expect(posts).toHaveLength(1);
    expect(posts[0]).toMatchObject({
      slug: "spring-update",
      title: "Spring update",
      lang: "en",
      announcementLink: null,
    });
  });

  it("accepts a successful empty announcement response", async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(
      new Response(JSON.stringify({ announcements: [] })),
    );

    await expect(loadPublicAnnouncements(undefined, "https://admin.example.com", fetcher))
      .resolves.toEqual([]);
  });

  it("rejects non-2xx responses instead of treating them as empty results", async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(
      new Response(JSON.stringify({ error: "unavailable" }), { status: 500 }),
    );

    await expect(loadPublicAnnouncements(undefined, "https://admin.example.com", fetcher))
      .rejects.toThrow("Announcements endpoint returned HTTP 500.");
  });

  it("propagates network failures", async () => {
    const fetcher = vi.fn<typeof fetch>().mockRejectedValue(new TypeError("Network unavailable"));

    await expect(loadPublicAnnouncements(undefined, "https://admin.example.com", fetcher))
      .rejects.toThrow("Network unavailable");
  });

  it("rejects unexpected successful response shapes", async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(
      new Response(JSON.stringify({ data: [] })),
    );

    await expect(loadPublicAnnouncements(undefined, "https://admin.example.com", fetcher))
      .rejects.toThrow("Announcements endpoint returned an invalid response.");
  });

  it("sanitizes unsafe Markdown-generated HTML before rendering", () => {
    const html = renderAnnouncementMarkdown('<img src=x onerror="alert(1)">\n\n[click](javascript:alert(1))');

    expect(html).not.toContain("onerror");
    expect(html).not.toContain("javascript:");
  });
});

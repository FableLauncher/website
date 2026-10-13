import { useEffect, useState } from "react";
import type { BlogPost } from "../types/blog";
import { loadPublicAnnouncements } from "../lib/publicAnnouncements";

export function usePublicAnnouncements(): {
  announcements: BlogPost[];
  error: string | null;
  loading: boolean;
} {
  const [announcements, setAnnouncements] = useState<BlogPost[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    setAnnouncements([]);
    setError(null);
    setLoading(true);
    loadPublicAnnouncements(controller.signal)
      .then(setAnnouncements)
      .catch((caught: unknown) => {
        if (controller.signal.aborted) return;
        setError(caught instanceof Error ? caught.message : "Published announcements could not be loaded.");
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, []);

  return { announcements, error, loading };
}

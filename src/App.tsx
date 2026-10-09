import { lazy, Suspense, useEffect, useRef } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { NoticeProvider } from "./components/Notice";
import { usePageMeta } from "./hooks/usePageMeta";
import Home from "./pages/Home";

const DownloadPage = lazy(() => import("./pages/DownloadPage"));
const BlogListPage = lazy(() => import("./pages/BlogListPage"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const TermsPage = lazy(() => import("./pages/TermsPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

const ROUTE_META: Record<string, { en: string; zh: string }> = {
  "/": { en: "Minecraft Java Edition launcher", zh: "Minecraft Java 版启动器" },
  "/download": { en: "Download", zh: "下载" },
  "/blog": { en: "News and changelog", zh: "动态与更新日志" },
  "/privacy": { en: "Privacy policy", zh: "隐私政策" },
  "/terms": { en: "Terms of service", zh: "服务条款" },
};

const PageFallback = () => (
  <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-label="Loading page">
    <span className="size-8 animate-spin rounded-full border-2 border-[var(--brand)] border-t-transparent" />
  </div>
);

const AppContent = () => {
  const location = useLocation();
  const previousLocation = useRef<string | null>(null);
  const { i18n } = useTranslation();
  const language = i18n.language.startsWith("zh") ? "zh" : "en";
  const pageLabel = ROUTE_META[location.pathname]?.[language] ?? (language === "zh" ? "页面" : "Page");
  const title = location.pathname === "/" ? "Fable Launcher" : `${pageLabel} — Fable Launcher`;
  const descriptions = {
    en: "Fable Launcher is a Minecraft Java Edition launcher for instances, mod loaders, Java runtimes, and Modrinth content.",
    zh: "Fable Launcher 是一款 Minecraft Java 版启动器，支持实例、模组加载器、Java 运行时和 Modrinth 内容。",
  };

  usePageMeta({ title, description: descriptions[language] });

  useEffect(() => {
    const key = `${location.pathname}${location.hash}`;
    if (previousLocation.current === null) {
      previousLocation.current = key;
      if (location.hash) {
        window.requestAnimationFrame(() => {
          document.getElementById(location.hash.slice(1))?.scrollIntoView({
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
          });
        });
      }
      return;
    }
    previousLocation.current = key;

    const target = location.hash ? document.getElementById(location.hash.slice(1)) : null;
    if (target) {
      target.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      });
      target.querySelector<HTMLElement>("h1, h2")?.focus({ preventScroll: true });
      return;
    }

    window.scrollTo({ top: 0, behavior: "auto" });
    window.requestAnimationFrame(() => {
      document.querySelector<HTMLElement>("#main-content h1")?.focus({ preventScroll: true });
    });
  }, [location.pathname, location.hash]);

  const isHomePage = location.pathname === "/";

  return (
    <div className="site-shell min-h-screen">
      <Navbar />
      <div id="site-content">
        <main id="main-content" className={isHomePage ? "" : "pt-16"}>
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/download" element={<DownloadPage />} />
              <Route path="/blog" element={<BlogListPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
        {!isHomePage && <Footer />}
      </div>
    </div>
  );
};

const App = () => {
  useEffect(() => {
    const loader = document.getElementById("boot-loader");
    if (!loader) return;
    loader.classList.add("boot-done");
    const timeout = window.setTimeout(() => loader.remove(), 700);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <BrowserRouter>
      <NoticeProvider>
        <AppContent />
      </NoticeProvider>
    </BrowserRouter>
  );
};

export default App;

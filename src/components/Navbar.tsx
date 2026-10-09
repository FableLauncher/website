import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Github, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FABLE_RELEASE_LABEL } from "../brand";
import { useNotice } from "./Notice";
import { fableLogo } from "../assets/launcherScreens";

const Navbar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { showNotice } = useNotice();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef(true);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const siteContent = document.getElementById("site-content");
    const previousOverflow = document.body.style.overflow;
    if (siteContent) siteContent.inert = true;
    document.body.style.overflow = "hidden";

    const focusableSelector = 'a[href], button:not([disabled])';
    const focusFirstItem = window.requestAnimationFrame(() => {
      menuPanelRef.current?.querySelector<HTMLElement>(focusableSelector)?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        restoreFocusRef.current = true;
        menuButtonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !menuPanelRef.current) return;

      const focusable = Array.from(
        menuPanelRef.current.querySelectorAll<HTMLElement>(focusableSelector),
      ).filter((element) => element.offsetParent !== null);
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!focusable.some((element) => element === document.activeElement)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFirstItem);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      if (siteContent) siteContent.inert = false;
      if (restoreFocusRef.current) menuButtonRef.current?.focus();
      restoreFocusRef.current = true;
    };
  }, [menuOpen]);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 900px)");
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (!event.matches) return;
      restoreFocusRef.current = false;
      setMenuOpen(false);
    };
    desktopQuery.addEventListener("change", closeOnDesktop);
    return () => desktopQuery.removeEventListener("change", closeOnDesktop);
  }, []);

  const activePath = (path: string) => {
    if (path === "/#features") return location.pathname === "/" && location.hash === "#features";
    return location.pathname === path && !location.hash;
  };

  const navLinks = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.features"), path: "/#features" },
    { name: t("nav.download"), path: "/download" },
    { name: t("nav.news"), path: "/blog" },
  ];

  const handleGitHub = () => {
    showNotice(t("notice.github"));
    setMenuOpen(false);
  };

  const navigationLinks = (mobile = false) =>
    navLinks.map((link) => {
      const isActive = activePath(link.path);
      return (
        <Link
          key={link.path}
          to={link.path}
          onClick={() => {
            if (!mobile) return;
            restoreFocusRef.current = false;
            setMenuOpen(false);
          }}
          aria-current={
            isActive ? (link.path === "/#features" ? "location" : "page") : undefined
          }
          className={`relative flex min-h-11 items-center font-medium transition-colors hover:text-[var(--brand)] ${
            mobile ? "py-3 text-lg" : "py-1 text-sm"
          } ${isActive ? "text-[var(--brand)]" : "text-[var(--text-2)]"}`}
        >
          {link.name}
          {!mobile && isActive && (
            <motion.span
              layoutId="fable-navbar-active-underline"
              className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-[var(--brand)]"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
        </Link>
      );
    });

  const utilityControls = () => (
    <button
      type="button"
      onClick={handleGitHub}
      aria-label={t("common.github")}
      className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-[var(--text-2)] transition-colors hover:text-[var(--brand)]"
    >
      <Github size={19} aria-hidden="true" />
    </button>
  );

  return (
    <>
      <nav
        className={`fixed top-0 z-[100] w-full border-b transition-[background-color,border-color,box-shadow] duration-300 ${
          scrolled
            ? "border-[var(--divider)]/40 bg-[var(--bg)]/90 shadow-sm shadow-black/10 backdrop-blur-lg"
            : "border-transparent bg-[var(--bg)]/55 backdrop-blur-md"
        }`}
        aria-label="Main navigation"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="group flex min-h-11 items-center gap-2" aria-label="Fable Launcher home">
              <img
                src={fableLogo}
                alt=""
                width="32"
                height="32"
                className="size-8 object-contain transition-transform group-hover:scale-105"
              />
              <span className="flex flex-col">
                <span className="text-xl font-bold leading-none tracking-tight text-[var(--text-1)]" translate="no">
                  Fable Launcher
                </span>
                <span className="mt-1 flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-widest text-[var(--status)]">
                  <span>{FABLE_RELEASE_LABEL}</span>
                </span>
              </span>
            </Link>

            <div className="hidden items-center gap-5 min-[900px]:flex xl:gap-7">
              {navigationLinks()}
              <span className="mx-1 h-4 w-px bg-[var(--divider)]/60" aria-hidden="true" />
              {utilityControls()}
            </div>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => {
                restoreFocusRef.current = true;
                setMenuOpen((open) => !open);
              }}
              className="inline-flex size-11 items-center justify-center rounded-full text-[var(--text-1)] min-[900px]:hidden"
              aria-label={menuOpen ? t("common.closeMenu") : t("common.openMenu")}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.button
              type="button"
              aria-label={t("common.closeMenu")}
              tabIndex={-1}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => {
                restoreFocusRef.current = true;
                setMenuOpen(false);
              }}
              className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm min-[900px]:hidden"
            />
            <motion.div
              ref={menuPanelRef}
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label={t("common.navigationMenu")}
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
              className="fixed inset-y-0 right-0 z-[95] flex w-[min(80%,20rem)] flex-col border-l border-[var(--divider)]/30 bg-[var(--bg)]/95 pb-[env(safe-area-inset-bottom)] shadow-2xl shadow-black/25 backdrop-blur-xl min-[900px]:hidden"
            >
              <nav className="flex-1 overflow-y-auto px-6 pb-6 pt-24" aria-label={t("common.navigationMenu")}>
                <div className="flex flex-col divide-y divide-[var(--divider)]/30">
                  {navigationLinks(true)}
                  <button
                    type="button"
                    onClick={handleGitHub}
                    className="flex min-h-12 items-center gap-2 py-3 text-left text-lg text-[var(--text-2)] hover:text-[var(--brand)]"
                  >
                    {t("nav.github")}
                    <Github size={16} aria-hidden="true" />
                  </button>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

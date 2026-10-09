import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { useNotice } from "./Notice";
import { fableLogo } from "../assets/launcherScreens";

const Footer = () => {
  const { t } = useTranslation();
  const { showNotice } = useNotice();
  const year = new Date().getFullYear();

  const groups: {
    title: string;
    links: Array<{ label: string; to?: string; action?: () => void }>;
  }[] = [
    {
      title: t("footer.projects"),
      links: [
        { label: t("nav.home"), to: "/" },
        { label: t("nav.features"), to: "/#features" },
        { label: t("nav.download"), to: "/download" },
        { label: t("nav.news"), to: "/blog" },
      ],
    },
    {
      title: t("footer.community"),
      links: [{ label: t("nav.github"), action: () => showNotice(t("notice.github")) }],
    },
    {
      title: t("footer.support"),
      links: [
        { label: t("common.privacy"), to: "/privacy" },
        { label: t("common.terms"), to: "/terms" },
      ],
    },
  ];

  return (
    <footer className="border-t border-[var(--divider)]/40 bg-[var(--bg)]/80 pb-[env(safe-area-inset-bottom)] pt-14 sm:pt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-3 lg:grid-cols-5 lg:gap-x-8">
          <div className="col-span-2 space-y-5 md:col-span-3 lg:col-span-2">
            <Link to="/" className="inline-flex min-h-11 items-center gap-3">
              <img src={fableLogo} alt="" width="40" height="40" className="size-10 object-contain" />
              <span className="text-2xl font-bold tracking-tight" translate="no">Fable Launcher</span>
            </Link>
            <p className="max-w-sm leading-relaxed text-[var(--text-2)]">{t("footer.description")}</p>
            <p className="text-sm text-[var(--status)]">{t("footer.version")}</p>
          </div>

          {groups.map((group) => (
            <div key={group.title} className="space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--text-1)]">
                {group.title}
              </h2>
              <ul className="space-y-1">
                {group.links.map((link) => (
                  <li key={link.label}>
                    {link.to ? (
                      <Link
                        to={link.to}
                        className="flex min-h-11 items-center gap-2 text-[var(--text-2)] transition-colors hover:text-[var(--brand)]"
                      >
                        {link.label}
                      </Link>
                    ) : link.action ? (
                      <button
                        type="button"
                        onClick={link.action}
                        className="flex min-h-11 items-center gap-2 text-[var(--text-2)] transition-colors hover:text-[var(--brand)]"
                      >
                        {link.label}
                        <ExternalLink size={13} aria-hidden="true" />
                      </button>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-5 border-t border-[var(--divider)]/30 py-7 text-center text-xs text-[var(--text-2)] md:flex-row md:text-left">
          <p>© {year} Fable Launcher. {t("footer.copyright")}</p>
          <p className="max-w-2xl opacity-75">{t("footer.notAffiliated")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

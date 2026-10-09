import { Shield, FileText } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface LegalPageProps {
  kind: "privacy" | "terms";
  icon: ReactNode;
}

const LegalPage = ({ kind, icon }: LegalPageProps) => {
  const { t } = useTranslation();
  const namespace = kind;

  return (
    <div className="min-h-screen bg-[color-mix(in_srgb,var(--bg)_82%,transparent)] pb-20 transition-colors duration-300">
      <div className="mx-auto max-w-4xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="mb-12">
          <Link
            to="/"
            className="group mb-8 inline-flex min-h-11 items-center gap-2 text-[var(--text-2)] transition-colors hover:text-[var(--brand)]"
          >
            <span aria-hidden="true" className="transition-transform group-hover:-translate-x-1">←</span>
            {t("common.backToHome")}
          </Link>

          <div className="mb-4 flex items-center gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[color-mix(in_srgb,var(--brand)_12%,transparent)] text-[var(--brand)]">
              {icon}
            </div>
            <h1
              id={`${kind}-title`}
              tabIndex={-1}
              className="text-3xl font-bold text-[var(--text-1)] md:text-4xl"
            >
              {t(`${namespace}.title`)}
            </h1>
          </div>
        </div>

        <article className="glass-card p-6 sm:p-8 md:p-12">
          <p className="prose-custom m-0">{t(`${namespace}.notPublished`)}</p>
        </article>

        <section className="mt-12 rounded-3xl border border-[var(--divider)]/30 bg-[var(--bg-alt)] p-6 text-center sm:p-8">
          <h2 className="mb-2 text-xl font-bold text-[var(--text-1)]">
            {t(`${namespace}.questionTitle`)}
          </h2>
          <p className="mb-5 text-[var(--text-2)]">{t(`${namespace}.questionDescription`)}</p>
          <button
            type="button"
            disabled
            className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-[var(--divider)]/50 px-8 text-sm text-[var(--text-2)] disabled:cursor-not-allowed disabled:opacity-65 sm:w-auto"
            title={t(`${namespace}.submitIssue`)}
          >
            {t(`${namespace}.submitIssue`)}
          </button>
        </section>
      </div>
    </div>
  );
};

export const PrivacyPage = () => <LegalPage kind="privacy" icon={<Shield size={28} aria-hidden="true" />} />;
export const TermsPage = () => <LegalPage kind="terms" icon={<FileText size={28} aria-hidden="true" />} />;

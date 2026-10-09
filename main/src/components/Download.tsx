import { Download as DownloadIcon, ExternalLink, FileDown, MonitorDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FABLE_DOWNLOAD_URL, FABLE_RELEASE_LABEL } from "../brand";
import { fableLogo } from "../assets/launcherScreens";

const DownloadSection = () => {
  const { t } = useTranslation();

  return (
    <section
      id="download"
      className="relative overflow-hidden bg-[var(--bg-alt)] py-10 transition-colors duration-300 sm:py-16 lg:py-24"
      aria-labelledby="download-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center sm:mb-16">
          <h2 id="download-title" tabIndex={-1} className="mb-4 text-3xl font-bold text-[var(--text-1)] md:text-5xl">
            {t("download.title")}
          </h2>
          <p className="mx-auto max-w-2xl text-[var(--text-2)]">{t("download.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="relative z-10 space-y-6 lg:col-span-2">
            <section className="glass-card p-4 sm:p-8" aria-labelledby="release-title">
              <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={fableLogo}
                    alt=""
                    width="48"
                    height="48"
                    className="size-12 object-contain"
                  />
                  <div>
                    <h3 id="release-title" className="text-2xl font-bold text-[var(--brand)]">
                      {t("download.release")}
                    </h3>
                    <p className="mt-1 text-sm text-[var(--text-2)]">{FABLE_RELEASE_LABEL}</p>
                  </div>
                </div>
                <span className="inline-flex min-h-8 items-center gap-2 rounded-md bg-[color-mix(in_srgb,var(--status)_12%,transparent)] px-3 py-1 text-xs font-semibold text-[var(--status)]">
                  <span className="size-2 rounded-full bg-[var(--status)]" aria-hidden="true" />
                  {t("common.beta")}
                </span>
              </div>

              <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 sm:mb-8">
                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[var(--text-2)]">
                    {t("download.platform")}
                  </p>
                  <div className="flex min-h-12 items-center gap-3 rounded-xl border border-[var(--divider)]/40 bg-[var(--bg)] px-4 text-sm font-medium text-[var(--text-1)]">
                    <MonitorDown size={19} className="shrink-0 text-[var(--brand)]" aria-hidden="true" />
                    {t("download.windows")}
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[var(--text-2)]">
                    {t("download.availability")}
                  </p>
                  <div className="flex min-h-12 items-center gap-3 rounded-xl border border-[var(--divider)]/40 bg-[var(--bg)] px-4 text-sm font-medium text-[var(--text-1)]">
                    <FileDown size={19} className="shrink-0 text-[var(--brand)]" aria-hidden="true" />
                    {t("download.unavailable")}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="mb-4 flex items-center gap-2 text-sm font-bold text-[var(--text-2)]">
                  <DownloadIcon size={16} aria-hidden="true" />
                  {t("download.assetList")}
                </h4>
                <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-[var(--divider)]/30 bg-[var(--bg-alt)] p-4 sm:flex-row sm:items-center">
                  <div className="flex w-full min-w-0 items-start gap-4 sm:items-center">
                    <div className="mt-1 flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[color-mix(in_srgb,var(--brand)_12%,transparent)] text-[var(--brand)] sm:mt-0">
                      <MonitorDown size={20} aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="break-words text-sm font-bold text-[var(--text-1)]">
                        {t("download.windows")}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-[var(--text-2)]">
                        {t("download.unavailableDescription")}
                      </p>
                    </div>
                  </div>
                  {FABLE_DOWNLOAD_URL ? (
                    <a
                      href={FABLE_DOWNLOAD_URL}
                      className="btn-primary w-full shrink-0 gap-2 sm:w-auto"
                      download
                    >
                      {t("common.download")}
                      <ExternalLink size={16} aria-hidden="true" />
                    </a>
                  ) : (
                    <button
                      type="button"
                      className="btn-primary w-full shrink-0 gap-2 sm:w-auto"
                      disabled
                      aria-describedby="download-unavailable"
                    >
                      {t("download.unavailable")}
                    </button>
                  )}
                </div>
                <p id="download-unavailable" className="text-xs text-[var(--text-2)]" role="status">
                  {t("download.downloadStatus")}
                </p>
              </div>
            </section>
          </div>

          <aside className="relative z-0">
            <section className="glass-card flex h-full min-h-72 flex-col p-4 sm:p-8" aria-labelledby="notes-title">
              <div className="mb-6 flex items-center gap-2 border-b border-[var(--divider)]/25 pb-4">
                <FileDown size={18} className="text-[var(--brand)]" aria-hidden="true" />
                <h3 id="notes-title" className="text-lg font-bold text-[var(--text-1)]">
                  {t("download.releaseNotes")}
                </h3>
              </div>
              <div className="flex flex-1 items-center">
                <p className="text-sm leading-relaxed text-[var(--text-2)]">{t("download.noNotes")}</p>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;

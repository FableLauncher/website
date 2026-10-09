import { useTranslation } from "react-i18next";
import DownloadSection from "../components/Download";

const DownloadPage = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-[color-mix(in_srgb,var(--bg)_82%,transparent)] pt-8 transition-colors duration-300 sm:pt-12">
      <h1 tabIndex={-1} className="text-center text-2xl font-bold text-[var(--text-1)] sm:text-3xl">
        {t("download.pageTitle")}
      </h1>
      <p className="mx-auto mt-2 max-w-2xl px-4 text-center text-sm text-[var(--text-2)] sm:text-base">
        {t("download.subtitle")}
      </p>
      <DownloadSection />
    </div>
  );
};

export default DownloadPage;

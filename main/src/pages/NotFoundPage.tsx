import { motion, useReducedMotion } from "framer-motion";
import { AlertTriangle, ArrowLeft, Newspaper } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();

  return (
    <div className="flex min-h-[calc(100svh-4rem)] items-center justify-center bg-[color-mix(in_srgb,var(--bg)_82%,transparent)] py-16 transition-colors duration-300">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8"
      >
        <div className="mb-8 inline-flex size-24 items-center justify-center rounded-3xl bg-[color-mix(in_srgb,var(--brand)_12%,transparent)] text-[var(--brand)]">
          <AlertTriangle size={48} aria-hidden="true" />
        </div>
        <h1 tabIndex={-1} className="mb-4 text-6xl font-bold tracking-tight text-[var(--text-1)] md:text-8xl">
          404
        </h1>
        <h2 className="mb-4 text-2xl font-bold text-[var(--text-1)] md:text-3xl">{t("notFound.title")}</h2>
        <p className="mx-auto mb-10 max-w-md text-lg text-[var(--text-2)]">
          {t("notFound.description")}
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link to="/" className="btn-primary w-full gap-2 sm:w-auto">
            <ArrowLeft size={18} aria-hidden="true" />
            {t("common.backToHome")}
          </Link>
          <Link
            to="/blog"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-[var(--divider)]/50 px-8 text-base text-[var(--text-1)] transition-colors hover:bg-[var(--bg-alt)] sm:w-auto"
          >
            <Newspaper size={18} aria-hidden="true" />
            {t("notFound.browseNews")}
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;

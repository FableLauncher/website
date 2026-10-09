import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { homeScreen } from "../../assets/launcherScreens";

const HeroSection = () => {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const reveal = (delay: number) =>
    reduceMotion
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.6, delay },
        };

  return (
    <section className="relative flex flex-col items-center overflow-hidden">
      <div className="relative flex min-h-[80svh] w-full items-center pb-12 pt-16 supports-[height:100dvh]:min-h-[80dvh] md:pb-16">
        <div className="hero-glow" aria-hidden="true" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              id="home-title"
              tabIndex={-1}
              {...reveal(0.1)}
              className="mb-6 text-4xl font-bold leading-tight tracking-tight text-[var(--text-1)] sm:text-5xl lg:text-6xl"
            >
              {t("hero.titleFirst")}{" "}
              <span className="text-[var(--brand)]">{t("hero.titleLast")}</span>
            </motion.h1>
            <motion.p
              {...reveal(0.2)}
              className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-[var(--text-2)] sm:text-lg lg:text-xl"
            >
              {t("hero.description")}
            </motion.p>
            <motion.div
              {...reveal(0.3)}
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Link to="/download" className="btn-primary group gap-2">
                <Download size={20} aria-hidden="true" />
                {t("common.download")}
                <ArrowRight
                  size={18}
                  aria-hidden="true"
                  className="opacity-70 transition-transform group-hover:translate-x-1"
                />
              </Link>
              <Link
                to="/#features"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[var(--divider)]/60 px-6 py-3 text-[var(--text-1)] transition-colors hover:bg-[var(--bg-alt)]"
              >
                {t("common.viewFeatures")}
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">
        <motion.figure
          {...(reduceMotion
            ? { initial: false }
            : {
                initial: { opacity: 0, y: 40 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                transition: { duration: 0.8, delay: 0.4 },
              })}
          className="group relative overflow-hidden rounded-2xl border border-[var(--divider)]/20 md:hidden"
        >
          <img
            src={homeScreen}
            alt={t("hero.screenshotAlt")}
            width="1600"
            height="900"
            fetchPriority="high"
            decoding="async"
            className="aspect-[16/9] h-auto w-full object-cover object-[right_top] transition-transform duration-700 group-hover:scale-[1.01]"
          />
          <figcaption className="sr-only">{t("hero.screenshotLabel")}</figcaption>
        </motion.figure>
      </div>
    </section>
  );
};

export default HeroSection;

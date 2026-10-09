import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { cn } from "../../lib/utils";
import { launcherScreens } from "../../assets/launcherScreens";

const FeaturesSection = () => {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();

  const features = [
    {
      id: "ui",
      title: t("features.ui.title"),
      description: t("features.ui.desc"),
      image: launcherScreens.interface,
      alt: t("features.screenshots.ui"),
    },
    {
      id: "content",
      title: t("features.content.title"),
      description: t("features.content.desc"),
      image: launcherScreens.discover,
      alt: t("features.screenshots.content"),
    },
    {
      id: "versions",
      title: t("features.versions.title"),
      description: t("features.versions.desc"),
      image: launcherScreens.instances,
      alt: t("features.screenshots.versions"),
    },
    {
      id: "java",
      title: t("features.java.title"),
      description: t("features.java.desc"),
      image: launcherScreens.java,
      alt: t("features.screenshots.java"),
    },
    {
      id: "instances",
      title: t("features.instances.title"),
      description: t("features.instances.desc"),
      image: launcherScreens.instances,
      alt: t("features.screenshots.instances"),
    },
    {
      id: "settings",
      title: t("features.settings.title"),
      description: t("features.settings.desc"),
      image: launcherScreens.settings,
      alt: t("features.screenshots.settings"),
    },
  ];

  const reveal = (x: number, delay = 0) =>
    reduceMotion
      ? { initial: false as const }
      : {
          initial: { opacity: 0, x, y: 20 },
          whileInView: { opacity: 1, x: 0, y: 0 },
          viewport: { once: true, margin: "-50px" },
          transition: { duration: 0.6, ease: "easeOut" as const, delay },
        };

  return (
    <section
      id="features"
      className="overflow-hidden bg-[color-mix(in_srgb,var(--bg-alt)_78%,transparent)] py-16 transition-colors duration-300 md:py-20"
      aria-labelledby="features-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center md:mb-14">
          <motion.h2
            id="features-title"
            tabIndex={-1}
            {...(reduceMotion
              ? { initial: false }
              : {
                  initial: { opacity: 0, y: 20 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true, margin: "-50px" },
                  transition: { duration: 0.6, ease: "easeOut" },
                })}
            className="mb-4 text-3xl font-bold text-[var(--text-1)] md:mb-6 md:text-5xl"
          >
            {t("features.title")}
          </motion.h2>
          <motion.p
            {...(reduceMotion
              ? { initial: false }
              : {
                  initial: { opacity: 0, y: 20 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true, margin: "-50px" },
                  transition: { duration: 0.6, ease: "easeOut", delay: 0.1 },
                })}
            className="mx-auto max-w-2xl text-base text-[var(--text-2)] md:text-lg"
          >
            {t("features.subtitle")}
          </motion.p>
        </div>

        <div className="space-y-12 md:space-y-16 lg:space-y-20">
          {features.map((feature, index) => {
            const even = index % 2 === 0;
            return (
              <div
                key={feature.id}
                className={cn(
                  "flex flex-col items-center gap-8 md:gap-10 lg:gap-12",
                  even ? "md:flex-row" : "md:flex-row-reverse",
                )}
              >
                <motion.div
                  {...reveal(even ? -30 : 30)}
                  className="flex w-full flex-col items-start space-y-3 text-left md:w-1/2 md:space-y-6"
                >
                  <h3
                    id={index === 0 ? "feature-ui-title" : undefined}
                    className="text-xl font-bold leading-tight text-[var(--text-1)] sm:text-2xl md:text-4xl"
                  >
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--text-2)] sm:text-base md:text-lg">
                    {feature.description}
                  </p>
                </motion.div>

                <motion.figure {...reveal(even ? 30 : -30, 0.1)} className="w-full md:w-1/2">
                  <div className="group relative overflow-hidden rounded-2xl border border-[var(--divider)]/25 shadow-2xl shadow-black/15 transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-1 hover:border-[var(--brand)]/40 hover:shadow-[var(--brand)]/10">
                    <img
                      src={feature.image}
                      alt={feature.alt}
                      width="1600"
                      height="900"
                      loading="lazy"
                      decoding="async"
                      className="h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    />
                  </div>
                  <figcaption className="sr-only">{feature.alt}</figcaption>
                </motion.figure>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

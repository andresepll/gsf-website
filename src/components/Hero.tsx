"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useI18n } from "@/lib/i18n";

export default function Hero() {
  const { t } = useI18n();

  return (
    <section className="relative min-h-screen overflow-hidden bg-navy-950">
      {/* Background gradient & geometric overlays */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800" />
        <div className="absolute inset-0 opacity-[0.07]">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-[20%] left-[-10%] w-[120%] h-px bg-white rotate-[-8deg]" />
            <div className="absolute top-[40%] left-[-10%] w-[120%] h-px bg-white rotate-[-8deg]" />
            <div className="absolute top-[60%] left-[-10%] w-[120%] h-px bg-white rotate-[-8deg]" />
            <div className="absolute top-[80%] left-[-10%] w-[120%] h-px bg-white rotate-[-8deg]" />
          </div>
        </div>
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-accent-500/5 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-accent-500/3 blur-[80px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pt-24 pb-32 lg:flex-row lg:items-center lg:gap-16 lg:px-8">
        <div className="flex-1 lg:max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-accent-400 animate-pulse" />
              <span className="text-xs font-medium tracking-wider text-white/70 uppercase">
                {t.hero.badge}
              </span>
            </div>

            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
              {t.hero.headline1}{" "}
              <span className="relative">
                <span className="relative z-10 text-accent-400">
                  {t.hero.headlineAccent}
                </span>
                <span className="absolute bottom-2 left-0 right-0 h-3 bg-accent-500/20 -skew-x-6" />
              </span>{" "}
              {t.hero.headline2}
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy-300 sm:text-xl">
              {t.hero.subtitle}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="mailto:contacto@gsf.com.do"
                className="group inline-flex items-center gap-2 rounded-full bg-accent-500 px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-600 hover:shadow-xl hover:shadow-accent-500/25"
              >
                {t.hero.cta}
                <svg
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </a>
              <a
                href="#project"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-8 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-white/5 hover:border-white/25"
              >
                {t.hero.ctaSecondary}
              </a>
            </div>
          </motion.div>

          {/* Key Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 grid grid-cols-3 gap-8 border-t border-white/10 pt-8"
          >
            {[
              {
                value: t.hero.stat1value,
                unit: t.hero.stat1unit,
                label: t.hero.stat1label,
              },
              {
                value: t.hero.stat2value,
                unit: "",
                label: t.hero.stat2label,
              },
              {
                value: t.hero.stat3value,
                unit: "",
                label: t.hero.stat3label,
              },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                  {stat.value}
                  <span className="text-accent-400 text-lg ml-0.5">
                    {stat.unit}
                  </span>
                </div>
                <div className="mt-1 text-xs font-medium uppercase tracking-wider text-navy-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Image Column — Floating turbine */}
        <motion.div
          initial={{ opacity: 0, x: 60, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="hidden lg:flex flex-1 items-center justify-center"
        >
          <div className="relative">
            <div className="absolute -inset-8 rounded-3xl border border-white/5 rotate-3" />
            <div className="absolute -inset-16 rounded-3xl border border-white/[0.02] -rotate-2" />
            <div className="relative animate-float">
              <Image
                src="/images/turbine-hero.png"
                alt="GE Vernova 7HA.02 Gas Turbine"
                width={560}
                height={320}
                className="drop-shadow-2xl"
                priority
              />
              <div className="absolute -bottom-4 -right-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 px-4 py-3">
                <div className="text-xs font-medium text-navy-300">
                  {t.hero.turbineBadgeLabel}
                </div>
                <div className="text-sm font-bold text-white">
                  {t.hero.turbineBadgeValue}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom diagonal cut */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 bg-white"
        style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }}
      />
    </section>
  );
}

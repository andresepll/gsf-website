"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { useI18n } from "@/lib/i18n";
import ConstructionGallery from "./ConstructionGallery";

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Project() {
  const { t } = useI18n();
  const timelineRef = useRef(null);
  const timelineInView = useInView(timelineRef, {
    once: true,
    margin: "-100px",
  });

  const specs = [
    { label: t.project.specConfig, value: t.project.specConfigVal },
    { label: t.project.specGas, value: t.project.specGasVal },
    { label: t.project.specSteam, value: t.project.specSteamVal },
    { label: t.project.specPPA, value: t.project.specPPAVal },
    { label: t.project.specNet, value: t.project.specNetVal },
    { label: t.project.specEfficiency, value: t.project.specEfficiencyVal },
  ];

  const timeline = [
    {
      year: t.project.tl1year,
      quarter: t.project.tl1quarter,
      title: t.project.tl1title,
      description: t.project.tl1desc,
    },
    {
      year: t.project.tl2year,
      quarter: t.project.tl2quarter,
      title: t.project.tl2title,
      description: t.project.tl2desc,
    },
    {
      year: t.project.tl3year,
      quarter: t.project.tl3quarter,
      title: t.project.tl3title,
      description: t.project.tl3desc,
    },
    {
      year: t.project.tl4year,
      quarter: t.project.tl4quarter,
      title: t.project.tl4title,
      description: t.project.tl4desc,
    },
  ];

  const impacts = [
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      ),
      title: t.project.impact1title,
      description: t.project.impact1desc,
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
        </svg>
      ),
      title: t.project.impact2title,
      description: t.project.impact2desc,
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
        </svg>
      ),
      title: t.project.impact3title,
      description: t.project.impact3desc,
    },
  ];

  return (
    <section id="project" className="relative">
      {/* Technical Specs */}
      <div className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-accent-500" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-600">
                {t.project.tag}
              </span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl lg:text-5xl">
              {t.project.title1}{" "}
              <span className="text-navy-400">{t.project.title2}</span>
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-navy-500 leading-relaxed">
              {t.project.subtitle}
            </p>
          </FadeIn>

          <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
            <FadeIn delay={0.1}>
              <div className="relative">
                <div className="absolute -inset-4 rounded-2xl bg-navy-50/50 -rotate-2" />
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-navy-50 to-navy-100 p-8 lg:p-12">
                  <Image src="/images/turbine-detail.png" alt="GE Vernova 7HA.02 Combustor Technology" width={600} height={400} className="w-full h-auto" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl bg-white/80 backdrop-blur-sm px-4 py-3">
                    <div>
                      <div className="text-xs text-navy-400">Technology</div>
                      <div className="text-sm font-semibold text-navy-900">7HA.02 Combustor</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-navy-400">Class</div>
                      <div className="text-sm font-semibold text-navy-900">HA-Class</div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {specs.map((spec) => (
                  <div key={spec.label} className="group rounded-xl border border-navy-100 bg-white p-5 transition-all duration-300 hover:border-accent-200 hover:shadow-lg hover:shadow-accent-500/5">
                    <div className="text-xs font-medium uppercase tracking-wider text-navy-400 mb-1">{spec.label}</div>
                    <div className="text-sm font-semibold text-navy-900">{spec.value}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-xl bg-navy-950 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 rounded-lg bg-accent-500/10 p-2">
                    <svg className="h-5 w-5 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{t.project.locationTitle}</div>
                    <div className="mt-1 text-sm text-navy-300">{t.project.locationValue}</div>
                    <div className="mt-2 text-xs text-navy-400">{t.project.locationGas}</div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative bg-navy-50 py-16 lg:py-20 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-24 bg-white" style={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 100%)" }} />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn>
            <div className="text-center">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="h-px w-12 bg-accent-500" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-600">{t.project.timelineTag}</span>
                <div className="h-px w-12 bg-accent-500" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">{t.project.timelineTitle}</h2>
            </div>
          </FadeIn>

          <div ref={timelineRef} className="mt-12 relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-navy-200 md:-translate-x-px" />
            {timeline.map((item, i) => (
              <motion.div key={item.year} initial={{ opacity: 0, y: 20 }} animate={timelineInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: i * 0.1 }} className={`relative flex items-start gap-6 mb-6 last:mb-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                <div className="absolute left-4 md:left-1/2 top-2 h-2.5 w-2.5 -translate-x-[5px] md:-translate-x-[5px] rounded-full bg-accent-500 ring-[3px] ring-navy-50 z-10" />
                <div className={`ml-10 md:ml-0 md:w-[calc(50%-1.5rem)] ${i % 2 === 0 ? "md:pr-6 md:text-right" : "md:pl-6"}`}>
                  <div className="rounded-lg bg-white px-5 py-4 shadow-sm border border-navy-100 hover:shadow-md transition-shadow">
                    <div className="inline-flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-bold text-accent-600">{item.year}</span>
                      <span className="text-[11px] text-navy-400">{item.quarter}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-navy-900 leading-snug">{item.title}</h3>
                    <p className="mt-1 text-xs text-navy-500 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Construction Progress */}
      <ConstructionGallery />

      {/* Economic Impact */}
      <div className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="h-px w-12 bg-accent-500" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-600">{t.project.impactTag}</span>
                <div className="h-px w-12 bg-accent-500" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">{t.project.impactTitle}</h2>
              <p className="mt-4 text-lg text-navy-500">{t.project.impactSubtitle}</p>
            </div>
          </FadeIn>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {impacts.map((impact, i) => (
              <FadeIn key={impact.title} delay={i * 0.1}>
                <div className="group relative rounded-2xl border border-navy-100 bg-white p-8 transition-all duration-500 hover:border-accent-200 hover:shadow-xl hover:shadow-accent-500/5">
                  <div className="absolute top-0 right-0 h-24 w-24 overflow-hidden rounded-tr-2xl">
                    <div className="absolute -top-12 -right-12 h-24 w-24 rotate-45 bg-gradient-to-br from-accent-500/10 to-transparent" />
                  </div>
                  <div className="inline-flex rounded-xl bg-navy-50 p-3 text-navy-600 group-hover:bg-accent-50 group-hover:text-accent-600 transition-colors">{impact.icon}</div>
                  <h3 className="mt-5 text-xl font-semibold text-navy-900">{impact.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-500">{impact.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

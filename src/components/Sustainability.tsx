"use client";

import { useI18n } from "@/lib/i18n";
import FadeIn from "./FadeIn";
import SectionEyebrow from "./SectionEyebrow";

export default function Sustainability() {
  const { t } = useI18n();

  const environmentalItems = [
    { title: t.sustainability.env1title, description: t.sustainability.env1desc },
    { title: t.sustainability.env2title, description: t.sustainability.env2desc },
    { title: t.sustainability.env3title, description: t.sustainability.env3desc },
    { title: t.sustainability.env4title, description: t.sustainability.env4desc },
  ];

  const transitionItems = [
    { title: t.sustainability.trans1title, description: t.sustainability.trans1desc },
    { title: t.sustainability.trans2title, description: t.sustainability.trans2desc },
    { title: t.sustainability.trans3title, description: t.sustainability.trans3desc },
  ];

  const reports = [
    { title: t.sustainability.report1, href: "/reports/estudio-impacto-ambiental.pdf" },
    { title: t.sustainability.report2, href: "/reports/cambio-climatico.pdf" },
    { title: t.sustainability.report3, href: "/reports/evaluacion-derechos-humanos.pdf" },
    { title: t.sustainability.report4, href: "/reports/emisiones-gei.pdf" },
  ];

  return (
    <section id="sustainability" className="relative overflow-hidden">
      <div className="relative bg-navy-950 py-16 lg:py-20">
        <div className="absolute top-0 left-0 right-0 h-32 bg-white" style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }} />
        <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-accent-500/5 blur-[100px]" />
        <div className="absolute bottom-1/4 left-0 w-64 h-64 rounded-full bg-accent-500/5 blur-[80px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 pt-16">
          <FadeIn>
            <SectionEyebrow label={t.sustainability.tag} dark />
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {t.sustainability.title1}{" "}
              <span className="text-accent-400">{t.sustainability.titleAccent}</span>
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-navy-300 leading-relaxed">
              {t.sustainability.subtitle}
            </p>
          </FadeIn>

          <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-2">
            {/* Environmental Performance */}
            <FadeIn delay={0.1}>
              <div>
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-accent-500/10">
                    <svg aria-hidden="true" className="h-4 w-4 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  </span>
                  {t.sustainability.envTitle}
                </h3>
                <div className="space-y-4">
                  {environmentalItems.map((item) => (
                    <div key={item.title} className="group rounded-xl border border-white/5 bg-white/[0.03] p-5 transition-all duration-300 hover:border-accent-500/20 hover:bg-white/[0.05]">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0 h-1.5 w-1.5 rounded-full bg-accent-400" />
                        <div>
                          <div className="text-sm font-semibold text-white">{item.title}</div>
                          <div className="mt-1 text-sm text-navy-400 leading-relaxed">{item.description}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Energy Transition */}
            <FadeIn delay={0.2}>
              <div>
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-accent-500/10">
                    <svg aria-hidden="true" className="h-4 w-4 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                    </svg>
                  </span>
                  {t.sustainability.transTitle}
                </h3>
                <div className="space-y-4">
                  {transitionItems.map((item) => (
                    <div key={item.title} className="group rounded-xl border border-white/5 bg-white/[0.03] p-5 transition-all duration-300 hover:border-accent-500/20 hover:bg-white/[0.05]">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0 h-1.5 w-1.5 rounded-full bg-accent-400" />
                        <div>
                          <div className="text-sm font-semibold text-white">{item.title}</div>
                          <div className="mt-1 text-sm text-navy-400 leading-relaxed">{item.description}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-xl bg-gradient-to-r from-accent-500/10 to-accent-500/5 border border-white/5 p-6">
                  <h4 className="text-sm font-semibold text-white">{t.sustainability.socialTitle}</h4>
                  <p className="mt-2 text-sm text-navy-300 leading-relaxed">{t.sustainability.socialDesc}</p>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Sustainability Reports */}
          <FadeIn delay={0.3}>
            <div className="mt-20">
              <h3 className="text-lg font-semibold text-white mb-6">{t.sustainability.reportsTitle}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {reports.map((report) => (
                  <a key={report.title} href={report.href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-4 transition-all duration-300 hover:border-accent-500/20 hover:bg-white/[0.05] cursor-pointer">
                    <div className="flex-shrink-0 rounded-lg bg-accent-500/10 p-2">
                      <svg aria-hidden="true" className="h-5 w-5 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-medium text-white leading-tight">{report.title}</div>
                      <div className="text-xs text-navy-500 mt-0.5">PDF</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}

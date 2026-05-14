"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";

type ParagraphSection = { title: string; body: readonly string[] };
type ListSection = {
  title: string;
  intro?: string;
  items: readonly string[];
  howTo?: string;
  authority?: string;
};
type Section = ParagraphSection | ListSection;

function isListSection(section: Section): section is ListSection {
  return "items" in section;
}

export default function PrivacyPage() {
  const { t } = useI18n();
  const p = t.privacy;

  const sections: Section[] = [
    p.controller,
    p.dataCollected,
    p.purposes,
    p.legalBasis,
    p.retention,
    p.thirdParties,
    p.internationalTransfers,
    p.rights,
    p.security,
    p.cookies,
    p.anonymity,
    p.changes,
    p.contact,
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="relative bg-navy-950 pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800" />
        <div className="absolute inset-0 opacity-[0.05]">
          <div className="absolute top-[30%] left-[-10%] w-[120%] h-px bg-white rotate-[-8deg]" />
          <div className="absolute top-[60%] left-[-10%] w-[120%] h-px bg-white rotate-[-8deg]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-navy-400 hover:text-white transition-colors mb-8"
            >
              <svg
                aria-hidden="true"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
              {p.back}
            </Link>
            <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              {p.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-navy-300 leading-relaxed">
              {p.subtitle}
            </p>
            <p className="mt-6 text-sm text-navy-400">{p.lastUpdated}</p>
          </motion.div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-16 bg-white"
          style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }}
        />
      </div>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-6 py-16 lg:py-24 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-12"
        >
          {sections.map((section, idx) => (
            <section key={idx} className="space-y-4">
              <h2 className="text-xl font-bold text-navy-900">
                {section.title}
              </h2>
              {isListSection(section) ? (
                <>
                  {section.intro && (
                    <p className="text-navy-600 leading-relaxed">
                      {section.intro}
                    </p>
                  )}
                  <ul className="space-y-2 pl-5 list-disc text-navy-600 leading-relaxed marker:text-accent-500">
                    {section.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                  {section.howTo && (
                    <p className="text-navy-600 leading-relaxed">
                      {section.howTo}
                    </p>
                  )}
                  {section.authority && (
                    <p className="text-navy-600 leading-relaxed">
                      {section.authority}
                    </p>
                  )}
                </>
              ) : (
                section.body.map((para, i) => (
                  <p key={i} className="text-navy-600 leading-relaxed">
                    {para}
                  </p>
                ))
              )}
            </section>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

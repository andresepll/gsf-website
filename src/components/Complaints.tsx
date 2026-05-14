"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export default function Complaints() {
  const { t } = useI18n();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-navy-50 to-white border border-navy-100 px-6 py-10 sm:px-10 lg:px-14 lg:py-14"
        >
          <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-accent-500/10 blur-3xl" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-3 mb-3">
                <div className="h-px w-12 bg-accent-500" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-600">
                  {t.complaintsSection.tag}
                </span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
                {t.complaintsSection.title}
              </h2>
              <p className="mt-4 text-base text-navy-500 leading-relaxed sm:text-lg">
                {t.complaintsSection.desc}
              </p>
            </div>
            <Link
              href="/complaints"
              className="group inline-flex items-center justify-center gap-2 self-start rounded-full bg-navy-950 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-navy-800 hover:shadow-lg lg:flex-shrink-0"
            >
              {t.complaintsSection.btn}
              <svg aria-hidden="true"
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
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

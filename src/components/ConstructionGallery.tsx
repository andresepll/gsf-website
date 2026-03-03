"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useI18n } from "@/lib/i18n";

const images = [
  { src: "/images/construction-1.jpg", alt: "Construction progress — aerial view 1" },
  { src: "/images/construction-2.jpg", alt: "Construction progress — aerial view 2" },
  { src: "/images/construction-3.jpg", alt: "Construction progress — aerial view 3" },
  { src: "/images/construction-4.jpg", alt: "Construction progress — aerial view 4" },
  { src: "/images/construction-5.jpg", alt: "Construction progress — aerial view 5" },
  { src: "/images/construction-6.jpg", alt: "Construction progress — aerial view 6" },
  { src: "/images/construction-7.jpg", alt: "Construction progress — panoramic view" },
];

export default function ConstructionGallery() {
  const { t } = useI18n();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % images.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  }, []);

  // Auto-advance every 4 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(next, 4000);
    return () => clearInterval(interval);
  }, [isPaused, next]);

  return (
    <div className="bg-navy-50 py-16 lg:py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-accent-500" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-600">
                {t.project.constructionTag}
              </span>
              <div className="h-px w-12 bg-accent-500" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
              {t.project.constructionTitle}
            </h2>
            <p className="mt-3 text-navy-500">
              {t.project.constructionSubtitle}
            </p>
          </div>

          {/* Slideshow */}
          <div
            className="relative rounded-2xl overflow-hidden bg-navy-900 shadow-xl"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Main Image */}
            <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-[2.5/1]">
              <Image
                src={images[current].src}
                alt={images[current].alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1200px"
                priority={current === 0}
              />

              {/* Gradient overlay at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />

              {/* Date badge */}
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2">
                  <svg
                    className="h-4 w-4 text-accent-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                    />
                  </svg>
                  <span className="text-sm font-medium text-white">
                    {t.project.constructionDate}
                  </span>
                </div>
              </div>

              {/* Counter */}
              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6">
                <span className="text-sm font-mono text-white/70">
                  {String(current + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
                </span>
              </div>

              {/* Prev/Next Arrows */}
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-black/50 transition-colors"
                aria-label="Previous image"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-black/50 transition-colors"
                aria-label="Next image"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>

            {/* Progress Dots */}
            <div className="flex items-center justify-center gap-2 py-4 bg-navy-950">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-8 bg-accent-500"
                      : "w-1.5 bg-navy-600 hover:bg-navy-400"
                  }`}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

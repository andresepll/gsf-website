"use client";

import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

export type LightboxImage = {
  src: string;
  alt: string;
};

type LightboxProps = {
  open: boolean;
  images: LightboxImage[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  caption?: string;
  labels: {
    close: string;
    previous: string;
    next: string;
    dialogLabel: string;
  };
};

export default function Lightbox({
  open,
  images,
  index,
  onClose,
  onPrev,
  onNext,
  caption,
  labels,
}: LightboxProps) {
  const [mounted, setMounted] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Body scroll lock while open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose, onPrev, onNext]);

  // Focus the close button on open
  useEffect(() => {
    if (open) {
      closeRef.current?.focus();
    }
  }, [open]);

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const swipe = Math.abs(info.offset.x) * info.velocity.x;
    if (swipe < -10000 || info.offset.x < -100) onNext();
    else if (swipe > 10000 || info.offset.x > 100) onPrev();
  };

  if (!mounted) return null;

  const image = images[index];

  return createPortal(
    <AnimatePresence>
      {open && image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={labels.dialogLabel}
        >
          {/* Close button */}
          <button
            ref={closeRef}
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 h-11 w-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 flex items-center justify-center text-white hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/40"
            aria-label={labels.close}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Previous */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 flex items-center justify-center text-white hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/40"
            aria-label={labels.previous}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 flex items-center justify-center text-white hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/40"
            aria-label={labels.next}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>

          {/* Image */}
          <motion.div
            key={image.src}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="relative h-[80vh] w-[92vw] max-w-7xl cursor-grab active:cursor-grabbing"
            onClick={(e) => e.stopPropagation()}
            style={{ touchAction: "pinch-zoom" }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-contain select-none pointer-events-none"
              sizes="92vw"
              priority
              draggable={false}
            />
          </motion.div>

          {/* Caption + counter */}
          <div
            className="absolute bottom-4 sm:bottom-6 left-0 right-0 flex items-center justify-between px-4 sm:px-8 pointer-events-none"
            aria-live="polite"
          >
            <div className="text-sm text-white/80">{caption}</div>
            <div className="text-sm font-mono text-white/70">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(images.length).padStart(2, "0")}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

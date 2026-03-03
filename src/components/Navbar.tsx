"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useI18n } from "@/lib/i18n";

export default function Navbar() {
  const { locale, setLocale, t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "#project", label: t.nav.project },
    { href: "#sustainability", label: t.nav.sustainability },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const toggleLocale = () => {
    setLocale(locale === "en" ? "es" : "en");
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-8">
          <Link href="/" className="relative h-10 w-[140px]">
            {/* Color logo for scrolled (white bg) */}
            <Image
              src="/images/logo-gsf-new.png"
              alt="Generadora San Felipe"
              width={200}
              height={60}
              className={`absolute inset-0 h-10 w-auto object-contain object-left transition-opacity duration-500 ${
                scrolled ? "opacity-100" : "opacity-0"
              }`}
              priority
            />
            {/* White logo for hero (dark bg) */}
            <Image
              src="/images/logo-gsf-new.png"
              alt="Generadora San Felipe"
              width={200}
              height={60}
              className={`absolute inset-0 h-10 w-auto object-contain object-left brightness-0 invert transition-opacity duration-500 ${
                scrolled ? "opacity-0" : "opacity-100"
              }`}
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors duration-300 hover:text-accent-500 ${
                  scrolled ? "text-navy-700" : "text-white/90"
                }`}
              >
                {link.label}
              </a>
            ))}

            {/* Language Toggle */}
            <button
              onClick={toggleLocale}
              className={`text-xs font-bold tracking-wider uppercase border rounded-full px-3 py-1 transition-all duration-300 ${
                scrolled
                  ? "border-navy-200 text-navy-600 hover:bg-navy-50"
                  : "border-white/20 text-white/80 hover:bg-white/10"
              }`}
            >
              {locale === "en" ? "ES" : "EN"}
            </button>

            <a
              href="mailto:contacto@gsf.com.do"
              className="rounded-full bg-accent-500 px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-600 hover:shadow-lg hover:shadow-accent-500/25"
            >
              {t.nav.contact}
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative z-50 h-10 w-10 flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-1.5">
              <span
                className={`block h-0.5 w-6 transition-all duration-300 ${
                  mobileOpen
                    ? "rotate-45 translate-y-2 bg-white"
                    : scrolled
                    ? "bg-navy-900"
                    : "bg-white"
                }`}
              />
              <span
                className={`block h-0.5 w-6 transition-all duration-300 ${
                  mobileOpen
                    ? "opacity-0"
                    : scrolled
                    ? "bg-navy-900"
                    : "bg-white"
                }`}
              />
              <span
                className={`block h-0.5 w-6 transition-all duration-300 ${
                  mobileOpen
                    ? "-rotate-45 -translate-y-2 bg-white"
                    : scrolled
                    ? "bg-navy-900"
                    : "bg-white"
                }`}
              />
            </div>
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-navy-950 flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-2xl font-medium text-white hover:text-accent-400 transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.button
              onClick={() => {
                toggleLocale();
                setMobileOpen(false);
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg font-medium text-white/60 hover:text-white transition-colors"
            >
              {locale === "en" ? "Cambiar a Español" : "Switch to English"}
            </motion.button>
            <motion.a
              href="mailto:contacto@gsf.com.do"
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-4 rounded-full bg-accent-500 px-8 py-3 text-lg font-semibold text-white"
            >
              {t.nav.contact}
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

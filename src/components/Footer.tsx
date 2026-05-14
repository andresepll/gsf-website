"use client";

import Link from "next/link";
import Image from "next/image";
import { useI18n } from "@/lib/i18n";

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="bg-white text-navy-900">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Image
              src="/images/logo-gsf-new.png"
              alt="Generadora San Felipe"
              width={200}
              height={60}
              className="h-14 w-auto mb-4"
            />
            <p className="text-sm text-navy-500 leading-relaxed">
              Generadora San Felipe
              <br />
              Limited Partnership
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-navy-500 mb-4">
              {t.footer.navTitle}
            </h4>
            <ul className="space-y-1">
              {[
                { href: "#project", label: t.nav.project },
                { href: "#sustainability", label: t.nav.sustainability },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex items-center min-h-[44px] text-sm text-navy-600 hover:text-accent-600 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-navy-500 mb-4">
              {t.footer.resourcesTitle}
            </h4>
            <ul className="space-y-1">
              <li>
                <a
                  href="https://www.grupotsk.com/proyecto/central-ciclo-combinado-generadora-san-felipe-470-mw/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center min-h-[44px] text-sm text-navy-600 hover:text-accent-600 transition-colors"
                >
                  {t.footer.epc}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-navy-500 mb-4">
              {t.footer.contactTitle}
            </h4>
            <ul className="space-y-3 text-sm text-navy-600">
              <li>
                <a
                  href="mailto:contacto@gsf.com.do"
                  className="inline-flex items-center min-h-[44px] hover:text-accent-600 transition-colors"
                >
                  contacto@gsf.com.do
                </a>
              </li>
              <li>
                <a
                  href="tel:+18095638182"
                  className="inline-flex items-center min-h-[44px] hover:text-accent-600 transition-colors"
                >
                  (809) 563-8182
                </a>
              </li>
              <li>
                <Link
                  href="/complaints"
                  className="inline-flex items-center min-h-[44px] hover:text-accent-600 transition-colors"
                >
                  {t.footer.complaints}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Partner Logos Row */}
        <div className="mt-12 border-t border-navy-200 pt-8">
          <div className="flex flex-wrap items-start justify-between gap-12">
            {/* Nexgen Capital */}
            <div className="flex flex-col items-start gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-navy-500">
                Sponsor
              </span>
              <Image
                src="/images/logo-nexgen.png"
                alt="Nexgen Capital"
                width={128}
                height={128}
                className="h-[4.5rem] w-auto rounded-sm"
              />
            </div>

            {/* Social */}
            <div className="flex flex-col items-start gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-navy-500">
                {t.footer.followUs}
              </span>
              <a
                href="https://www.instagram.com/generadorasanfelipe"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.footer.instagramLabel}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
              >
                <svg
                  aria-hidden="true"
                  className="h-7 w-7"
                  viewBox="0 0 24 24"
                >
                  <defs>
                    <linearGradient
                      id="gsf-instagram-gradient"
                      x1="0%"
                      y1="100%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#fed373" />
                      <stop offset="25%" stopColor="#f15245" />
                      <stop offset="50%" stopColor="#d92e7f" />
                      <stop offset="75%" stopColor="#9b36b7" />
                      <stop offset="100%" stopColor="#515ecf" />
                    </linearGradient>
                  </defs>
                  <path
                    fill="url(#gsf-instagram-gradient)"
                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-navy-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-navy-500">
            &copy; {new Date().getFullYear()} Generadora San Felipe Limited
            Partnership. {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { useI18n } from "@/lib/i18n";

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="bg-navy-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Image
              src="/images/logo-gsf-new.png"
              alt="Generadora San Felipe"
              width={200}
              height={60}
              className="h-14 w-auto brightness-0 invert mb-4"
            />
            <p className="text-sm text-navy-300 leading-relaxed">
              Generadora San Felipe
              <br />
              Limited Partnership
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-navy-400 mb-4">
              {t.footer.navTitle}
            </h4>
            <ul className="space-y-3">
              {[
                { href: "#project", label: t.nav.project },
                { href: "#sustainability", label: t.nav.sustainability },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-navy-300 hover:text-accent-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-navy-400 mb-4">
              {t.footer.resourcesTitle}
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://www.grupotsk.com/proyecto/central-ciclo-combinado-generadora-san-felipe-470-mw/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-navy-300 hover:text-accent-400 transition-colors"
                >
                  {t.footer.epc}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-navy-400 mb-4">
              {t.footer.contactTitle}
            </h4>
            <ul className="space-y-3 text-sm text-navy-300">
              <li>
                <a
                  href="mailto:contacto@gsf.com.do"
                  className="hover:text-accent-400 transition-colors"
                >
                  contacto@gsf.com.do
                </a>
              </li>
              <li>
                <a
                  href="tel:+18095638182"
                  className="hover:text-accent-400 transition-colors"
                >
                  (809) 563-8182
                </a>
              </li>
              <li>
                <Link
                  href="/complaints"
                  className="hover:text-accent-400 transition-colors"
                >
                  {t.footer.complaints}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Partner Logos Row */}
        <div className="mt-12 border-t border-navy-800 pt-8">
          <div className="flex flex-wrap items-start gap-12">
            {/* Nexgen Capital - Sponsor */}
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
            {/* TSK - EPC */}
            <div className="flex flex-col items-start gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-navy-500">
                EPC
              </span>
              <a
                href="https://www.grupotsk.com/proyecto/central-ciclo-combinado-generadora-san-felipe-470-mw/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/images/logo-tsk.png"
                  alt="TSK"
                  width={100}
                  height={40}
                  className="h-10 w-auto brightness-0 invert opacity-70 hover:opacity-100 transition-opacity"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-navy-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-navy-500">
            &copy; {new Date().getFullYear()} Generadora San Felipe Limited
            Partnership. {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}

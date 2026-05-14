"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
          language?: string;
        }
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

type Props = {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
  locale?: "es" | "en";
};

const SCRIPT_ID = "cf-turnstile-script";
const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js";

// Module-level promise so a second mount during navigation reuses the same
// script load instead of stacking duplicate <script> tags in the head.
let scriptLoadPromise: Promise<void> | null = null;

function loadTurnstileScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.turnstile) return Promise.resolve();
  if (scriptLoadPromise) return scriptLoadPromise;

  scriptLoadPromise = new Promise<void>((resolve, reject) => {
    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("turnstile-load")), { once: true });
      return;
    }
    const s = document.createElement("script");
    s.id = SCRIPT_ID;
    s.src = SCRIPT_SRC;
    s.async = true;
    s.defer = true;
    s.addEventListener("load", () => resolve(), { once: true });
    s.addEventListener("error", () => reject(new Error("turnstile-load")), { once: true });
    document.head.appendChild(s);
  });

  return scriptLoadPromise;
}

export default function TurnstileWidget({
  onVerify,
  onExpire,
  onError,
  locale = "es",
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    if (!siteKey) {
      console.warn(
        "[turnstile] NEXT_PUBLIC_TURNSTILE_SITE_KEY not set — widget disabled"
      );
      return;
    }

    let cancelled = false;

    loadTurnstileScript()
      .then(() => {
        if (cancelled) return;
        const el = containerRef.current;
        if (!el || !window.turnstile || widgetIdRef.current) return;
        widgetIdRef.current = window.turnstile.render(el, {
          sitekey: siteKey,
          callback: onVerify,
          "expired-callback": onExpire,
          "error-callback": onError,
          theme: "light",
          language: locale,
        });
      })
      .catch((err) => {
        console.error("[turnstile] script load failed:", err);
        onError?.();
      });

    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          // Widget may already be torn down by re-render.
        }
        widgetIdRef.current = null;
      }
    };
  }, [onVerify, onExpire, onError, locale]);

  return <div ref={containerRef} />;
}

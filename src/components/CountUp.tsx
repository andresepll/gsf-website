"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

type CountUpProps = {
  /** Final value as a string. May include prefix like "+$" or suffix like "%", "M". */
  value: string;
  /** Animation duration in ms. Defaults to 1400ms. */
  durationMs?: number;
};

type ParsedValue = {
  prefix: string;
  number: number;
  suffix: string;
  decimals: number;
};

function parseStatValue(input: string): ParsedValue {
  // Match optional prefix (non-digit / minus chars), the number, then optional suffix
  const match = input.match(/^([^\d-]*)(-?\d+(?:[.,]\d+)?)(.*)$/);
  if (!match) {
    return { prefix: input, number: 0, suffix: "", decimals: 0 };
  }
  const [, prefix, numStr, suffix] = match;
  const normalized = numStr.replace(",", ".");
  const decimals = normalized.includes(".") ? normalized.split(".")[1].length : 0;
  return {
    prefix,
    number: parseFloat(normalized),
    suffix,
    decimals,
  };
}

export default function CountUp({ value, durationMs = 1400 }: CountUpProps) {
  const parsed = useMemo(() => parseStatValue(value), [value]);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(reduceMotion ? parsed.number : 0);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / durationMs, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(parsed.number * eased);
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setDisplay(parsed.number);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduceMotion, parsed.number, durationMs]);

  const formatted =
    parsed.decimals > 0
      ? display.toFixed(parsed.decimals)
      : Math.round(display).toLocaleString("en-US");

  return (
    <span ref={ref} aria-label={value}>
      {parsed.prefix}
      {formatted}
      {parsed.suffix}
    </span>
  );
}

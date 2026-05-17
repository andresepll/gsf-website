"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/**
 * Interactive stylized plot plan for GSF-1.
 *
 * v3 — adds numbered hotspots placed at approximate zone centers in plan
 * space (viewBox 2440x1372). Coordinates are best-guess from visual
 * inspection of the source plot plan; the user is expected to confirm
 * what each numbered marker should represent before the v4 pass that
 * locks labels + technical detail.
 */

const SOURCE_ASPECT_RATIO = 2440 / 1372;

type Hotspot = {
  id: number;
  cx: number;
  cy: number;
  /** Optional bounding box, in viewBox coords, for a translucent zone fill */
  zone?: { x: number; y: number; width: number; height: number };
  /** Working name visible until the user confirms the real label */
  placeholderName: string;
  /** Optional working description */
  placeholderDescription: string;
};

const HOTSPOTS: Hotspot[] = [
  {
    id: 1,
    cx: 1100,
    cy: 160,
    zone: { x: 220, y: 80, width: 1260, height: 180 },
    placeholderName: "Top elongated structure",
    placeholderDescription:
      "Long building running along the top boundary. Possibly pipe rack / utilities corridor / loading bay. Confirm.",
  },
  {
    id: 2,
    cx: 1700,
    cy: 180,
    zone: { x: 1510, y: 80, width: 360, height: 200 },
    placeholderName: "Three circular tanks",
    placeholderDescription:
      "Cluster of three round structures. Likely raw water / demin / fire water tanks. Confirm.",
  },
  {
    id: 3,
    cx: 2050,
    cy: 190,
    zone: { x: 1920, y: 90, width: 280, height: 240 },
    placeholderName: "Top-right corner building",
    placeholderDescription:
      "Compact rectangular building near the top-right corner. Probably admin / control room / electrical bay. Confirm.",
  },
  {
    id: 4,
    cx: 440,
    cy: 510,
    zone: { x: 200, y: 380, width: 540, height: 280 },
    placeholderName: "Center-left main building",
    placeholderDescription:
      "Largest building on the left, oriented along the turbine axis. Likely gas turbine / steam turbine hall. Confirm.",
  },
  {
    id: 5,
    cx: 440,
    cy: 800,
    zone: { x: 200, y: 720, width: 540, height: 180 },
    placeholderName: "Left mid building",
    placeholderDescription:
      "Smaller rectangle below the main hall. Possibly auxiliary equipment / electrical / water treatment. Confirm.",
  },
  {
    id: 6,
    cx: 440,
    cy: 1060,
    zone: { x: 200, y: 930, width: 540, height: 280 },
    placeholderName: "Switchyard grid",
    placeholderDescription:
      "Grid-pattern complex in the bottom-left. Looks like a switchyard with bus bars and transformers. Confirm.",
  },
  {
    id: 7,
    cx: 1180,
    cy: 700,
    zone: { x: 820, y: 460, width: 760, height: 520 },
    placeholderName: "Central equipment cluster",
    placeholderDescription:
      "Dense process area in the middle. Likely HRSG + steam turbine + condenser + auxiliary skids. Confirm.",
  },
  {
    id: 8,
    cx: 1640,
    cy: 880,
    zone: { x: 1500, y: 790, width: 280, height: 220 },
    placeholderName: "Stack / chimney zone",
    placeholderDescription:
      "Circular signature visible in the lower-center area. Stack base or condenser. Confirm.",
  },
  {
    id: 9,
    cx: 2310,
    cy: 720,
    zone: { x: 2180, y: 280, width: 250, height: 870 },
    placeholderName: "Right vertical column",
    placeholderDescription:
      "Long column of repeating rectangular cells on the right edge. Air-cooled condenser (ACC) bay or cooling tower row. Confirm.",
  },
  {
    id: 10,
    cx: 2280,
    cy: 1240,
    zone: { x: 2160, y: 1160, width: 260, height: 160 },
    placeholderName: "Bottom-right corner building",
    placeholderDescription:
      "Detached building in the bottom-right. Possibly transformer / GIS / utility. Confirm.",
  },
];

export default function PlantMap() {
  const [active, setActive] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);

  // ESC closes the panel
  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  const activeHotspot = HOTSPOTS.find((h) => h.id === active) ?? null;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr] lg:items-start">
      <div className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 shadow-2xl">
        {/* Grid texture */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div
          className="relative w-full"
          style={{ aspectRatio: `${SOURCE_ASPECT_RATIO}` }}
        >
          {/* Inverted plot plan */}
          <picture>
            <img
              src="/images/gsf-plotplan-source.png"
              alt="GSF-1 plant plot plan"
              className="absolute inset-0 h-full w-full select-none object-contain"
              style={{
                filter: "invert(1) brightness(1.05) contrast(1.1)",
                mixBlendMode: "screen",
                opacity: 0.88,
              }}
              draggable={false}
            />
          </picture>

          {/* SVG overlay: accents + hotspots */}
          <svg
            viewBox="0 0 2440 1372"
            className="absolute inset-0 h-full w-full"
            role="img"
            aria-label="GSF-1 stylized plant map with numbered zones"
          >
            <defs>
              <radialGradient id="pm-accent-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
                <stop offset="70%" stopColor="#f59e0b" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Accent zone fills (rendered first so markers sit above) */}
            <g className="pointer-events-none">
              {HOTSPOTS.map((h) => {
                if (!h.zone) return null;
                const isActive = h.id === active;
                return (
                  <rect
                    key={`zone-${h.id}`}
                    x={h.zone.x}
                    y={h.zone.y}
                    width={h.zone.width}
                    height={h.zone.height}
                    rx="16"
                    fill="#f59e0b"
                    fillOpacity={isActive ? 0.22 : 0.05}
                    stroke="#f59e0b"
                    strokeOpacity={isActive ? 0.8 : 0.25}
                    strokeWidth={isActive ? 3 : 1.5}
                    strokeDasharray={isActive ? "0" : "8 6"}
                    style={{ transition: "fill-opacity 0.3s, stroke-opacity 0.3s" }}
                  />
                );
              })}
            </g>

            {/* Compass */}
            <g transform="translate(140, 160)" className="pointer-events-none">
              <circle cx="0" cy="0" r="44" fill="#0a1929" fillOpacity="0.7" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1.5" />
              <path d="M 0 -32 L 9 8 L 0 0 L -9 8 Z" fill="#f59e0b" />
              <text x="0" y="-52" textAnchor="middle" fill="#ffffff" fillOpacity="0.9" fontSize="16" fontWeight="700">N</text>
            </g>

            {/* Scale bar */}
            <g transform="translate(2200, 1300)" className="pointer-events-none">
              <rect x="-10" y="-22" width="170" height="40" rx="6" fill="#0a1929" fillOpacity="0.7" stroke="#ffffff" strokeOpacity="0.25" strokeWidth="1" />
              <line x1="10" y1="0" x2="140" y2="0" stroke="#ffffff" strokeOpacity="0.75" strokeWidth="2" />
              <line x1="10" y1="-6" x2="10" y2="6" stroke="#ffffff" strokeOpacity="0.75" strokeWidth="2" />
              <line x1="75" y1="-5" x2="75" y2="5" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="1.5" />
              <line x1="140" y1="-6" x2="140" y2="6" stroke="#ffffff" strokeOpacity="0.75" strokeWidth="2" />
              <text x="75" y="-14" textAnchor="middle" fill="#ffffff" fillOpacity="0.8" fontSize="13" fontFamily="ui-monospace, monospace">≈ 50 m</text>
            </g>

            {/* Disclaimer */}
            <text x="120" y="1340" fill="#ffffff" fillOpacity="0.4" fontSize="14" fontFamily="ui-monospace, monospace" className="pointer-events-none">
              GSF-1 PLOT PLAN · STYLIZED REFERENCE · NOT TO SCALE
            </text>

            {/* Hotspot markers (rendered last so they stay on top) */}
            <g>
              {HOTSPOTS.map((h) => {
                const isActive = h.id === active;
                return (
                  <g key={`mark-${h.id}`}>
                    {/* Pulse ring */}
                    {!reduceMotion && (
                      <motion.circle
                        cx={h.cx}
                        cy={h.cy}
                        r={28}
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="3"
                        initial={{ scale: 1, opacity: 0.5 }}
                        animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{
                          duration: 2.4,
                          repeat: Infinity,
                          ease: "easeOut",
                          delay: h.id * 0.18,
                        }}
                        style={{ transformOrigin: `${h.cx}px ${h.cy}px` }}
                      />
                    )}
                    {/* Outer halo */}
                    <circle
                      cx={h.cx}
                      cy={h.cy}
                      r={38}
                      fill="url(#pm-accent-glow)"
                      className="pointer-events-none"
                    />
                    {/* Marker button — invisible bigger hit area */}
                    <circle
                      cx={h.cx}
                      cy={h.cy}
                      r={44}
                      fill="transparent"
                      className="cursor-pointer focus:outline-none"
                      onClick={() => setActive(h.id === active ? null : h.id)}
                      role="button"
                      tabIndex={0}
                      aria-label={`Open details for zone ${h.id}: ${h.placeholderName}`}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setActive(h.id === active ? null : h.id);
                        }
                      }}
                    />
                    {/* Visible disc */}
                    <circle
                      cx={h.cx}
                      cy={h.cy}
                      r={isActive ? 26 : 22}
                      fill="#f59e0b"
                      stroke="#ffffff"
                      strokeOpacity={isActive ? 1 : 0.85}
                      strokeWidth={isActive ? 3 : 2.5}
                      className="pointer-events-none"
                      style={{ transition: "r 0.2s, stroke-opacity 0.2s" }}
                    />
                    {/* Number label */}
                    <text
                      x={h.cx}
                      y={h.cy + 7}
                      textAnchor="middle"
                      fill="#0a1929"
                      fontSize="22"
                      fontWeight="800"
                      className="pointer-events-none select-none"
                    >
                      {h.id}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>
      </div>

      {/* Side panel */}
      <aside
        ref={panelRef}
        className="rounded-2xl border border-navy-200 bg-white p-6 lg:sticky lg:top-24"
      >
        <h2 className="text-sm font-semibold uppercase tracking-wider text-navy-500">
          Zone detail
        </h2>
        <AnimatePresence mode="wait">
          {activeHotspot ? (
            <motion.div
              key={activeHotspot.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="mt-3"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent-500 text-base font-bold text-white">
                  {activeHotspot.id}
                </span>
                <h3 className="text-lg font-semibold text-navy-900">
                  {activeHotspot.placeholderName}
                </h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-navy-600">
                {activeHotspot.placeholderDescription}
              </p>
              <button
                type="button"
                onClick={() => setActive(null)}
                className="mt-4 text-xs font-medium uppercase tracking-wider text-accent-600 hover:text-accent-700"
              >
                Close
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-3"
            >
              <p className="text-sm text-navy-500">
                Click a numbered marker on the map to see the working description
                of that zone. All names below are placeholders pending confirmation
                from the project team.
              </p>
              <ol className="mt-4 space-y-1 text-sm text-navy-700">
                {HOTSPOTS.map((h) => (
                  <li key={h.id}>
                    <button
                      type="button"
                      onClick={() => setActive(h.id)}
                      className="text-left hover:text-accent-600"
                    >
                      <span className="inline-block w-6 font-mono font-bold text-accent-600">
                        {h.id}.
                      </span>{" "}
                      {h.placeholderName}
                    </button>
                  </li>
                ))}
              </ol>
            </motion.div>
          )}
        </AnimatePresence>
      </aside>
    </div>
  );
}

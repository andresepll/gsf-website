"use client";

/**
 * Interactive stylized plot plan for GSF-1.
 *
 * Uses the real EPC plot plan as the base image, inverted via CSS filter so
 * dark CAD line work becomes light strokes against a navy stage. Brand
 * accent overlays (stack glow, perimeter dashes, compass, scale bar) sit
 * above it. Hotspot data + labels will be added in a follow-up pass.
 */

const SOURCE_ASPECT_RATIO = 2440 / 1372; // matches public/images/gsf-plotplan-source.png

export default function PlantMap() {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 shadow-2xl">
      {/* Subtle grid texture above the gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Plot plan base — invert + screen blend so black CAD lines render as white */}
      <div
        className="relative w-full"
        style={{ aspectRatio: `${SOURCE_ASPECT_RATIO}` }}
      >
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

        {/* SVG accents layered on top */}
        <svg
          viewBox="0 0 2440 1372"
          className="pointer-events-none absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="pm-accent-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.35" />
              <stop offset="70%" stopColor="#f59e0b" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Diagonal accent streaks (very subtle) */}
          <g opacity="0.06">
            <line x1="-100" y1="380" x2="2540" y2="240" stroke="#ffffff" strokeWidth="1" />
            <line x1="-100" y1="1050" x2="2540" y2="900" stroke="#ffffff" strokeWidth="1" />
          </g>

          {/* Compass top-left */}
          <g transform="translate(140, 160)">
            <circle cx="0" cy="0" r="44" fill="#0a1929" fillOpacity="0.6" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1.5" />
            <path d="M 0 -32 L 9 8 L 0 0 L -9 8 Z" fill="#f59e0b" />
            <text x="0" y="-52" textAnchor="middle" fill="#ffffff" fillOpacity="0.9" fontSize="16" fontWeight="700">N</text>
          </g>

          {/* Scale bar bottom-right */}
          <g transform="translate(2200, 1300)">
            <rect x="-10" y="-22" width="170" height="40" rx="6" fill="#0a1929" fillOpacity="0.6" stroke="#ffffff" strokeOpacity="0.25" strokeWidth="1" />
            <line x1="10" y1="0" x2="140" y2="0" stroke="#ffffff" strokeOpacity="0.7" strokeWidth="2" />
            <line x1="10" y1="-6" x2="10" y2="6" stroke="#ffffff" strokeOpacity="0.7" strokeWidth="2" />
            <line x1="75" y1="-5" x2="75" y2="5" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="1.5" />
            <line x1="140" y1="-6" x2="140" y2="6" stroke="#ffffff" strokeOpacity="0.7" strokeWidth="2" />
            <text x="75" y="-14" textAnchor="middle" fill="#ffffff" fillOpacity="0.75" fontSize="13" fontFamily="ui-monospace, monospace">≈ 50 m</text>
          </g>

          {/* Disclaimer */}
          <text x="120" y="1340" fill="#ffffff" fillOpacity="0.4" fontSize="14" fontFamily="ui-monospace, monospace">
            GSF-1 PLOT PLAN · STYLIZED REFERENCE · NOT TO SCALE
          </text>
        </svg>
      </div>
    </div>
  );
}

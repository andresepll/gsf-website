"use client";

/**
 * Stylized interactive plot plan for GSF-1.
 *
 * Hand-traced from the reference plot plan into a simplified SVG that keeps
 * the recognizable site layout while replacing CAD line work with brand-aligned
 * shapes. Hotspot data + labels will be added in a follow-up pass once the
 * visual is approved.
 *
 * viewBox is 0 0 2000 1100 — site reads roughly 16:9 in the source. All
 * coordinates are virtual; the SVG scales fluidly via w-full on the wrapper.
 */
export default function PlantMap() {
  // Generate fence-post markers around the perimeter
  const fencePosts = [
    // top edge
    ...Array.from({ length: 14 }, (_, i) => ({ x: 180 + i * 130, y: 80 })),
    // bottom edge
    ...Array.from({ length: 14 }, (_, i) => ({ x: 180 + i * 130, y: 1020 })),
    // left edge
    ...Array.from({ length: 7 }, (_, i) => ({ x: 80, y: 200 + i * 120 })),
    // right edge
    ...Array.from({ length: 7 }, (_, i) => ({ x: 1920, y: 200 + i * 120 })),
  ];

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-navy-950 shadow-2xl">
      <svg
        viewBox="0 0 2000 1100"
        className="block h-auto w-full"
        role="img"
        aria-label="GSF-1 plant simplified plot plan"
      >
        <defs>
          {/* Background gradient — diagonal navy depth */}
          <linearGradient id="pm-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0a1929" />
            <stop offset="55%" stopColor="#1e3a5f" />
            <stop offset="100%" stopColor="#0f2444" />
          </linearGradient>

          {/* Subtle technical grid */}
          <pattern id="pm-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#ffffff" strokeOpacity="0.035" strokeWidth="1" />
          </pattern>

          {/* Soft accent radial glow used behind key zones */}
          <radialGradient id="pm-accent-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.18" />
            <stop offset="70%" stopColor="#f59e0b" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </radialGradient>

          {/* Standard building fill style — referenced via class on shapes */}
          <linearGradient id="pm-building" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.06" />
          </linearGradient>
        </defs>

        {/* Background layers */}
        <rect width="2000" height="1100" fill="url(#pm-bg)" />
        <rect width="2000" height="1100" fill="url(#pm-grid)" />

        {/* Diagonal accent streaks */}
        <g opacity="0.06">
          <line x1="-100" y1="350" x2="2100" y2="200" stroke="#ffffff" strokeWidth="1" />
          <line x1="-100" y1="800" x2="2100" y2="650" stroke="#ffffff" strokeWidth="1" />
        </g>

        {/* Site boundary — rounded, dashed soft outline */}
        <rect
          x="60"
          y="60"
          width="1880"
          height="980"
          rx="40"
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.16"
          strokeWidth="2"
          strokeDasharray="6 5"
        />

        {/* Fence posts */}
        {fencePosts.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="4" fill="#ffffff" fillOpacity="0.22" />
        ))}

        {/* Compass — top-left */}
        <g transform="translate(120, 130)">
          <circle cx="0" cy="0" r="36" fill="#ffffff" fillOpacity="0.05" stroke="#ffffff" strokeOpacity="0.25" />
          <path d="M 0 -26 L 7 6 L 0 0 L -7 6 Z" fill="#f59e0b" />
          <text x="0" y="-44" textAnchor="middle" fill="#ffffff" fillOpacity="0.85" fontSize="14" fontWeight="700">N</text>
        </g>

        {/* TOP: long support / loading structure */}
        <g>
          <rect x="220" y="170" width="1020" height="170" rx="10" fill="url(#pm-building)" stroke="#ffffff" strokeOpacity="0.32" strokeWidth="1.5" />
          {/* internal divisions */}
          {[260, 480, 700, 920].map((x) => (
            <line key={x} x1={x} y1="190" x2={x} y2="320" stroke="#ffffff" strokeOpacity="0.18" strokeWidth="1" />
          ))}
        </g>

        {/* TOP-RIGHT: 3 water / process tanks */}
        <g>
          {[1320, 1455, 1590].map((cx) => (
            <g key={cx}>
              <circle cx={cx} cy="240" r="65" fill="url(#pm-building)" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1.8" />
              <circle cx={cx} cy="240" r="40" fill="none" stroke="#ffffff" strokeOpacity="0.18" strokeWidth="1" />
            </g>
          ))}
        </g>

        {/* TOP-RIGHT corner: admin / control building */}
        <rect x="1690" y="170" width="200" height="180" rx="8" fill="url(#pm-building)" stroke="#ffffff" strokeOpacity="0.38" strokeWidth="1.5" />

        {/* CENTER-LEFT: main building / GT hall */}
        <g>
          <rect x="220" y="440" width="520" height="240" rx="10" fill="url(#pm-building)" stroke="#ffffff" strokeOpacity="0.42" strokeWidth="2" />
          {/* arrow inside indicating turbine axis */}
          <path d="M 280 565 L 680 565" stroke="#ffffff" strokeOpacity="0.18" strokeWidth="1.5" />
          <path d="M 680 565 L 660 555 L 660 575 Z" fill="#ffffff" fillOpacity="0.2" />
        </g>

        {/* CENTER: HRSG + Gas Turbine + Steam Turbine cluster */}
        <g transform="translate(820, 420)">
          {/* HRSG block (elongated rectangle) */}
          <rect x="0" y="0" width="420" height="130" rx="6" fill="url(#pm-building)" stroke="#ffffff" strokeOpacity="0.38" strokeWidth="1.6" />
          {/* HRSG internal segmentation */}
          {[80, 160, 240, 320].map((x) => (
            <line key={x} x1={x} y1="10" x2={x} y2="120" stroke="#ffffff" strokeOpacity="0.16" strokeWidth="1" />
          ))}
          {/* Gas turbine — rounded pill */}
          <rect x="20" y="160" width="170" height="90" rx="45" fill="url(#pm-building)" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="2" />
          {/* Steam turbine — rounded pill */}
          <rect x="220" y="160" width="180" height="90" rx="45" fill="url(#pm-building)" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="2" />
        </g>

        {/* Stack near HRSG — small accent circle */}
        <g>
          <circle cx="1260" cy="470" r="60" fill="url(#pm-accent-glow)" />
          <circle cx="1260" cy="470" r="22" fill="#0a1929" stroke="#f59e0b" strokeOpacity="0.7" strokeWidth="2" />
          <circle cx="1260" cy="470" r="12" fill="none" stroke="#f59e0b" strokeOpacity="0.5" strokeWidth="1.5" />
        </g>

        {/* RIGHT: ACC column — 7 cooling modules */}
        <g>
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <g key={i}>
              <rect x="1730" y={400 + i * 80} width="150" height="64" rx="8" fill="url(#pm-building)" stroke="#ffffff" strokeOpacity="0.32" strokeWidth="1.5" />
              {/* fan circles inside */}
              <circle cx="1770" cy={432 + i * 80} r="14" fill="none" stroke="#ffffff" strokeOpacity="0.32" strokeWidth="1.2" />
              <circle cx="1810" cy={432 + i * 80} r="14" fill="none" stroke="#ffffff" strokeOpacity="0.32" strokeWidth="1.2" />
              <circle cx="1850" cy={432 + i * 80} r="14" fill="none" stroke="#ffffff" strokeOpacity="0.32" strokeWidth="1.2" />
            </g>
          ))}
        </g>

        {/* CENTER-LEFT lower: secondary equipment block */}
        <rect x="780" y="720" width="380" height="180" rx="8" fill="url(#pm-building)" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="1.5" />

        {/* BOTTOM-LEFT: switchyard grid */}
        <g transform="translate(220, 760)">
          <rect x="0" y="0" width="440" height="230" rx="12" fill="#ffffff" fillOpacity="0.04" stroke="#ffffff" strokeOpacity="0.28" strokeWidth="1.5" />
          {/* Vertical bus bars */}
          {Array.from({ length: 8 }, (_, i) => (
            <line key={i} x1={40 + i * 50} y1="30" x2={40 + i * 50} y2="200" stroke="#ffffff" strokeOpacity="0.32" strokeWidth="2.5" strokeLinecap="round" />
          ))}
          {/* Horizontal interconnects */}
          {[60, 115, 170].map((y) => (
            <line key={y} x1="30" y1={y} x2="410" y2={y} stroke="#ffffff" strokeOpacity="0.18" strokeWidth="1" />
          ))}
          {/* Transformer dual-circle symbols */}
          {[
            { x: 80, y: 60 },
            { x: 220, y: 60 },
            { x: 360, y: 60 },
          ].map((t, i) => (
            <g key={i} transform={`translate(${t.x}, ${t.y})`}>
              <circle cx="-8" cy="0" r="10" fill="none" stroke="#f59e0b" strokeOpacity="0.7" strokeWidth="1.5" />
              <circle cx="8" cy="0" r="10" fill="none" stroke="#f59e0b" strokeOpacity="0.7" strokeWidth="1.5" />
            </g>
          ))}
        </g>

        {/* BOTTOM-RIGHT: auxiliary building */}
        <rect x="1690" y="830" width="200" height="160" rx="8" fill="url(#pm-building)" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="1.5" />

        {/* Connection lines between major zones — suggest flow */}
        <g stroke="#f59e0b" strokeOpacity="0.25" strokeWidth="1.5" strokeDasharray="4 4" fill="none">
          {/* GT to HRSG */}
          <path d="M 1010 580 L 1110 540" />
          {/* HRSG to stack */}
          <path d="M 1230 520 L 1260 480" />
          {/* HRSG to ACC */}
          <path d="M 1240 510 L 1720 460" />
          {/* Main building to switchyard */}
          <path d="M 480 680 L 480 760" />
        </g>

        {/* Scale bar bottom-right */}
        <g transform="translate(1700, 1040)">
          <line x1="0" y1="0" x2="120" y2="0" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="2" />
          <line x1="0" y1="-5" x2="0" y2="5" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="2" />
          <line x1="60" y1="-4" x2="60" y2="4" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1.5" />
          <line x1="120" y1="-5" x2="120" y2="5" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="2" />
          <text x="60" y="-12" textAnchor="middle" fill="#ffffff" fillOpacity="0.55" fontSize="11" fontFamily="ui-monospace, monospace">≈ 50 m</text>
        </g>

        {/* Label disclaimer */}
        <text x="120" y="1060" fill="#ffffff" fillOpacity="0.35" fontSize="11" fontFamily="ui-monospace, monospace">
          GSF-1 SIMPLIFIED PLOT PLAN · NOT TO SCALE · STYLIZED REFERENCE
        </text>
      </svg>
    </div>
  );
}

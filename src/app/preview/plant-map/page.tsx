"use client";

import { useState } from "react";
import PlantMap from "@/components/PlantMap";

export default function PlantMapPreview() {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <div className="min-h-screen bg-navy-50">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="mb-8 flex flex-col gap-2">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-accent-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-700">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent-500" />
            Internal preview · noindex
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
            GSF-1 Plot Plan — Visual Pass v5 (debug overlay)
          </h1>
          <p className="max-w-2xl text-sm text-navy-500 leading-relaxed">
            The real EPC plot plan rendered as inverted strokes over a navy
            stage with 15 hotspot markers placed pixel-precise from the
            annotated file. Use the toggle below to overlay the user&apos;s
            original colored annotation and verify whether each marker lands
            where the zone was painted.
          </p>
          <div className="mt-3">
            <label className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-navy-700 border border-navy-200 cursor-pointer hover:border-accent-300 transition-colors">
              <input
                type="checkbox"
                checked={showOverlay}
                onChange={(e) => setShowOverlay(e.target.checked)}
                className="h-4 w-4 accent-accent-500"
              />
              Show annotation overlay (your painted zones)
            </label>
          </div>
        </div>

        <PlantMap showAnnotationOverlay={showOverlay} />

        <div className="mt-8 rounded-2xl border border-navy-200 bg-white p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-navy-500">
            What this debug overlay tells us
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-navy-700">
            <li>
              <strong>Overlay ON:</strong> shows the colored zones you painted
              on the original plot plan, semi-transparent.
            </li>
            <li>
              <strong>If markers sit inside the colored zones:</strong> the
              detection is correct — the zones were painted next to (not on
              top of) the buildings you intended. Solution: repaint annotation
              with zones directly on the building footprints.
            </li>
            <li>
              <strong>If markers are far from the colored zones:</strong> the
              detection or image alignment is wrong. We dig deeper.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

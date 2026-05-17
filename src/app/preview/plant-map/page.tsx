import type { Metadata } from "next";
import PlantMap from "@/components/PlantMap";

export const metadata: Metadata = {
  title: "Plant Map Preview — GSF Internal",
  description: "Private visual preview of the GSF-1 simplified plot plan.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PlantMapPreview() {
  return (
    <div className="min-h-screen bg-navy-50">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="mb-8 flex flex-col gap-2">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-accent-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-700">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent-500" />
            Internal preview · noindex
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
            GSF-1 Simplified Plot Plan
          </h1>
          <p className="max-w-2xl text-sm text-navy-500 leading-relaxed">
            Hand-traced stylized interpretation of the EPC plot plan. Visual
            pass first — labels and interactive hotspots will follow once the
            aesthetic is approved.
          </p>
        </div>

        <PlantMap />

        <div className="mt-8 rounded-2xl border border-navy-200 bg-white p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-navy-500">
            Reference legend (working)
          </h2>
          <ul className="mt-4 grid grid-cols-1 gap-3 text-sm text-navy-700 sm:grid-cols-2">
            <li>
              <span className="font-semibold">Top, long structure:</span> support
              / loading / pipe rack
            </li>
            <li>
              <span className="font-semibold">3 circular tanks:</span> water /
              process storage
            </li>
            <li>
              <span className="font-semibold">Top-right block:</span> admin /
              control building
            </li>
            <li>
              <span className="font-semibold">Center-left rectangle:</span> main
              building / gas turbine hall
            </li>
            <li>
              <span className="font-semibold">Center cluster:</span> HRSG + Gas
              Turbine + Steam Turbine
            </li>
            <li>
              <span className="font-semibold">Right column:</span> air-cooled
              condenser (ACC) modules
            </li>
            <li>
              <span className="font-semibold">Bottom-left grid:</span>{" "}
              switchyard (with transformer markers)
            </li>
            <li>
              <span className="font-semibold">Accent circle near HRSG:</span>{" "}
              stack / chimney
            </li>
            <li>
              <span className="font-semibold">Bottom-right block:</span>{" "}
              auxiliary building
            </li>
            <li>
              <span className="font-semibold">Dashed perimeter:</span> site
              boundary with fence posts
            </li>
          </ul>
        </div>

        <div className="mt-6 text-xs text-navy-500">
          This page is excluded from search engines via the page-level robots
          meta tag and is not linked from anywhere in the public site.
        </div>
      </div>
    </div>
  );
}

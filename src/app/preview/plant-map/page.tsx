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
            GSF-1 Plot Plan — Visual Pass v2
          </h1>
          <p className="max-w-2xl text-sm text-navy-500 leading-relaxed">
            The real EPC plot plan rendered as inverted strokes over a navy
            stage. Compass and scale bar overlaid. Labels and interactive
            hotspots come next once the aesthetic is approved.
          </p>
        </div>

        <PlantMap />

        <div className="mt-8 rounded-2xl border border-navy-200 bg-white p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-navy-500">
            Next iteration
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-navy-700">
            <li>If the inversion feel is right, we lock the visual treatment and move on to overlays.</li>
            <li>Knockout key zones with accent fills (turbines, HRSG, switchyard, ACC, stack).</li>
            <li>Add numbered hotspots with hover/click that reveal a side panel with name + technical detail.</li>
            <li>Mobile: stack layout so hotspots become a list under the map.</li>
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

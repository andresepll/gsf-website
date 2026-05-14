type SectionEyebrowProps = {
  label: string;
  centered?: boolean;
  dark?: boolean;
  className?: string;
};

export default function SectionEyebrow({
  label,
  centered = false,
  dark = false,
  className = "",
}: SectionEyebrowProps) {
  const lineColor = dark ? "bg-accent-400" : "bg-accent-500";
  const textColor = dark ? "text-accent-400" : "text-accent-600";
  return (
    <div className={`inline-flex items-center gap-3 mb-4 ${className}`}>
      <div className={`h-px w-12 ${lineColor}`} />
      <span className={`text-xs font-semibold uppercase tracking-[0.2em] ${textColor}`}>
        {label}
      </span>
      {centered && <div className={`h-px w-12 ${lineColor}`} />}
    </div>
  );
}

import { cn } from "@/lib/utils";

export function SectionTitle({
  index,
  title,
  subtitle,
  eyebrow,
  className,
}: {
  index: string;
  title: string;
  subtitle?: string;
  eyebrow?: string;
  className?: string;
}) {
  return (
    <header className={cn("grid-magazine items-end mb-12 md:mb-20", className)}>
      <div className="col-span-12 md:col-span-2 flex items-baseline gap-2">
        <span className="font-mono text-sm uppercase tracking-overline text-accent">
          / {index}
        </span>
        {eyebrow && (
          <span className="font-mono text-[10px] uppercase tracking-overline text-text-3">
            {eyebrow}
          </span>
        )}
      </div>

      <h2 className="col-span-12 md:col-span-7 text-title font-display uppercase text-text">
        {title}
      </h2>

      {subtitle && (
        <p className="col-span-12 md:col-span-3 text-lead text-text-3 md:text-right mt-4 md:mt-0 font-heading whitespace-nowrap">
          {subtitle}
        </p>
      )}
    </header>
  );
}

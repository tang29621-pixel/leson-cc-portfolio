import { cn } from "@/lib/utils";

export function Tag({
  children,
  className,
  active,
}: {
  children: React.ReactNode;
  className?: string;
  active?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center border px-3 py-1 text-[10px] font-mono uppercase tracking-overline transition-colors",
        active
          ? "border-accent bg-accent/15 text-accent shadow-neon-primary"
          : "border-line text-text-3 hover:border-accent-2 hover:text-accent-2",
        className,
      )}
    >
      {children}
    </span>
  );
}

"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Tabs<T extends string>({
  tabs,
  active,
  onChange,
  className,
}: {
  tabs: { key: T; label: string }[];
  active: T;
  onChange: (k: T) => void;
  className?: string;
}) {
  return (
    <div className={cn("relative flex flex-wrap gap-6 md:gap-10 border-b border-line", className)}>
      {tabs.map((t) => {
        const isActive = active === t.key;
        return (
          <button
            key={t.key}
            onClick={() => onChange(t.key)}
            className={cn(
              "relative pb-3 font-heading text-sm uppercase tracking-label transition-colors",
              isActive ? "text-text" : "text-text-3 hover:text-text",
            )}
          >
            {t.label}
            {isActive && (
              <motion.span
                layoutId="tab-underline"
                className="absolute -bottom-px left-0 right-0 h-[2px] bg-chrome-line"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

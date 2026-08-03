"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 font-heading uppercase tracking-label transition-all duration-normal ease-standard will-change-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-disabled cursor-pointer";

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-xs",
  md: "h-12 px-6 text-sm",
  lg: "h-14 px-8 text-sm",
};

const variants: Record<Variant, string> = {
  // 主按钮：primary_cta 渐变 + 深色文字
  primary:
    "bg-primary-cta text-text-inv shadow-neon-primary hover:translate-x-[2px] hover:-translate-y-[2px] hover:brightness-110",
  ghost:
    "bg-transparent text-text px-0 hover:text-accent",
  // 次级：透明背景 + 细描边，hover 切到粉色发光
  outline:
    "border border-line bg-transparent text-text hover:border-accent hover:text-accent hover:shadow-neon-primary",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  onClick,
  type = "button",
  ariaLabel,
  target,
  rel,
  download,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  ariaLabel?: string;
  target?: "_blank" | "_self";
  rel?: string;
  download?: boolean | string;
}) {
  const cls = cn(base, sizes[size], variants[variant], className);
  if (href) {
    return (
      <Link
        href={href}
        className={cls}
        aria-label={ariaLabel}
        target={target}
        rel={rel}
        download={download}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      onClick={onClick}
      type={type}
      className={cls}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

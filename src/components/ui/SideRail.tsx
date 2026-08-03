"use client";
import { Github } from "lucide-react";
import { profile } from "@data/profile";

/**
 * Hero 区左侧装饰侧栏（参考 Cyber of X）
 * - 顶部：滚动提示
 * - 中部：项目名竖排
 * - 底部：社交图标
 * 桌面 ≥lg 启用，移动端隐藏
 */
export function HeroSideRail() {
  return (
    <aside
      aria-hidden
      className="hidden lg:flex absolute left-0 top-0 bottom-0 w-16 flex-col items-center justify-between py-20 z-20 pointer-events-none"
    >
      {/* 顶部滚动提示 */}
      <div className="font-mono text-[10px] uppercase tracking-overline text-text-3 [writing-mode:vertical-rl]">
        ↳ Scroll
      </div>

      {/* 中部项目名竖排 */}
      <div className="font-display text-[10px] tracking-label uppercase text-text-3 [writing-mode:vertical-rl]">
        Cyber · Metaverse · Leson-cc · 2026
      </div>

      {/* 底部社交 */}
      <div className="flex flex-col gap-3 pointer-events-auto">
        {profile.social.slice(0, 3).map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 grid place-items-center border border-line text-text-3 hover:text-accent hover:border-accent hover:shadow-neon-primary transition-all text-[10px] font-mono uppercase"
            aria-label={s.label}
          >
            {s.label === "GitHub" ? (
              <Github size={12} />
            ) : (
              s.label.charAt(0)
            )}
          </a>
        ))}
      </div>
    </aside>
  );
}

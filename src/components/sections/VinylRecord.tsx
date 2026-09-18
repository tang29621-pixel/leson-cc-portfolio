"use client";

/**
 * 黑胶唱片组件（v2 · 2026-09-18 简化版）
 *
 * 视觉：
 *   - 圆形黑胶（多层 radial-gradient 模拟刻槽，比硬编码 stop 优雅）
 *   - 中心彩色 label（brand-accent 渐变 + 曲目名）
 *   - 唱针（绝对定位右上角，斜放 + 微微光晕）
 *   - 整体 animate-spin-slow 旋转（12s/圈）
 *
 * v2 改：用 SVG conic-gradient 做刻槽 + box-shadow 立体感
 */

type VinylRecordProps = {
  label: string;
  sublabel?: string;
  isActive?: boolean;
};

export default function VinylRecord({ label, sublabel }: VinylRecordProps) {
  return (
    <div className="relative max-w-md mx-auto aspect-square">
      {/* 唱针（右上角，斜 18°，光晕） */}
      <div
        className="absolute -top-2 -right-2 md:top-0 md:right-2 z-20 origin-top-right pointer-events-none"
        style={{ transform: "rotate(22deg)" }}
      >
        <div className="w-1.5 h-40 bg-gradient-to-b from-text via-muted to-line rounded-full shadow-[0_0_4px_rgba(0,0,0,0.6)]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-4 h-4 rounded-full bg-accent shadow-[0_0_12px_rgba(255,45,122,0.7)]" />
      </div>

      {/* 黑胶唱片本体（旋转 + SVG 刻槽） */}
      <div className="absolute inset-0 rounded-full animate-spin-slow shadow-[0_24px_80px_rgba(0,0,0,0.62),0_0_60px_rgba(255,45,122,0.10)] overflow-hidden">
        {/* 黑胶底层 + 模拟同心刻槽 */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at center,
              #FF2D7A 0%,
              #FF2D7A 14%,
              transparent 14%,
              transparent 14.6%,
              rgba(255,255,255,0.04) 14.6%,
              rgba(255,255,255,0.04) 14.9%,
              transparent 14.9%,
              transparent 16%,
              rgba(255,255,255,0.04) 16%,
              rgba(255,255,255,0.04) 16.3%,
              transparent 16.3%,
              transparent 50%,
              rgba(255,255,255,0.025) 50%,
              rgba(255,255,255,0.025) 50.3%,
              transparent 50.3%,
              transparent 51%,
              rgba(255,255,255,0.025) 51%,
              rgba(255,255,255,0.025) 51.3%,
              transparent 51.3%
            )`,
            backgroundColor: "#0a0a0a",
          }}
        />

        {/* SVG 精刻槽（35 圈渐变细线） */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <radialGradient id="groove" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(0,0,0,0)" />
              <stop offset="42%" stopColor="rgba(0,0,0,0)" />
              <stop offset="42.5%" stopColor="rgba(255,255,255,0.05)" />
              <stop offset="42.8%" stopColor="rgba(0,0,0,0)" />
              <stop offset="50%" stopColor="rgba(0,0,0,0)" />
              <stop offset="50.3%" stopColor="rgba(255,255,255,0.04)" />
              <stop offset="50.6%" stopColor="rgba(0,0,0,0)" />
              <stop offset="60%" stopColor="rgba(0,0,0,0)" />
              <stop offset="60.3%" stopColor="rgba(255,255,255,0.03)" />
              <stop offset="60.6%" stopColor="rgba(0,0,0,0)" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="50" fill="url(#groove)" />
          {/* 高光弧（顶部左侧光线感） */}
          <ellipse
            cx="32"
            cy="22"
            rx="22"
            ry="6"
            fill="rgba(255,255,255,0.06)"
            transform="rotate(-25 32 22)"
          />
        </svg>

        {/* 中心彩色标签（不旋转） */}
        <div className="absolute inset-0 grid place-items-center">
          <div
            className="w-[28%] aspect-square rounded-full relative"
            style={{
              background:
                "radial-gradient(circle, #FF9FFC 0%, #FF2D7A 60%, #D91E63 100%)",
              boxShadow:
                "inset 0 0 12px rgba(0,0,0,0.4), 0 0 16px rgba(255,45,122,0.4)",
            }}
          >
            {/* 唱轴黑点 */}
            <div className="absolute inset-0 grid place-items-center">
              <div className="w-3 h-3 rounded-full bg-bg shadow-[inset_0_0_4px_rgba(0,0,0,0.8)]" />
            </div>
            {/* 标签文字（叠在轴周围） */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-2 pt-3">
              <span className="font-display font-bold uppercase text-bg text-[0.62em] leading-tight tracking-tight text-center line-clamp-2 max-w-[90%]">
                {label.length > 16 ? label.slice(0, 15) + "…" : label}
              </span>
              {sublabel && (
                <span className="mt-1 font-mono text-bg/75 text-[0.42em] uppercase tracking-widest leading-none text-center line-clamp-1 max-w-[90%]">
                  {sublabel.length > 18 ? sublabel.slice(0, 17) + "…" : sublabel}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 装饰光晕（唱片边缘高光） */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.06) 0%, transparent 35%)",
        }}
      />
    </div>
  );
}
import type { Metadata, Viewport } from "next";
import dynamic from "next/dynamic";
import "./globals.css";

// @fontsource：本地托管字体（避免 next/font/google 在 build 时联网 Google Fonts）
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/700.css";
import "@fontsource/orbitron/500.css";
import "@fontsource/orbitron/700.css";
import "@fontsource/orbitron/900.css";
import "@fontsource/rajdhani/400.css";
import "@fontsource/rajdhani/500.css";
import "@fontsource/rajdhani/600.css";
import "@fontsource/rajdhani/700.css";

// 重型客户端特效 → 全部 lazy + ssr:false，避免阻塞首屏渲染与 layout bundle
// LiquidEther 是 Navier-Stokes 流体（WebGL），最重；其它为 DOM 端辅助
const CursorFollower = dynamic(
  () => import("@/components/effects/CursorFollower"),
  { ssr: false },
);
const FloatingParticles = dynamic(
  () => import("@/components/effects/FloatingParticles"),
  { ssr: false, loading: () => null },
);
const LiquidEther = dynamic(
  () => import("@/components/effects/LiquidEther"),
  { ssr: false, loading: () => null },
);

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: {
    default: "Leson-cc · Visual & 3D Designer",
    template: "%s · Leson-cc",
  },
  description:
    "把抽象的想法，做成能看到的质感。视觉设计 × 3D 动效，独立设计师作品集。",
  openGraph: {
    type: "website",
    title: "Leson-cc · Visual & 3D Designer",
    description: "Visual designer + 3D / motion. Portfolio & contact.",
  },
};

export const viewport: Viewport = {
  themeColor: "#05050A",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className="dark">
      <body className="min-h-screen bg-bg text-text antialiased">
        {children}
        {/* 全局 UI 特效：粉点光标跟随 + 背景星点 twinkle + 流体背景 LiquidEther（cyber 粉主题） */}
        <CursorFollower />
        <FloatingParticles />
        {/* 流体背景：fixed inset-0 全屏 · mix-blend-mode: screen 与深背景融合 · 不抢戏 */}
        <div
          className="fixed inset-0 z-0 pointer-events-none"
          style={{ mixBlendMode: "screen", opacity: 0.55 }}
        >
          <LiquidEther
            colors={["#FF2D7A", "#FF9FFC", "#C44DFF"]}
            mouseForce={12}
            cursorSize={80}
            isViscous={false}
            viscous={30}
            iterationsViscous={16}
            iterationsPoisson={16}
            resolution={0.4}
            isBounce={false}
            autoDemo
            autoSpeed={0.3}
            autoIntensity={0.8}
            takeoverDuration={0.25}
            autoResumeDelay={5000}
            autoRampDuration={1.0}
          />
        </div>
      </body>
    </html>
  );
}
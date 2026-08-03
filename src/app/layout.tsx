import type { Metadata, Viewport } from "next";
import {
  Rajdhani,
  Orbitron,
  Inter,
  JetBrains_Mono,
} from "next/font/google";
import CursorFollower from "@/components/effects/CursorFollower";
import FloatingParticles from "@/components/effects/FloatingParticles";
import LiquidEther from "@/components/effects/LiquidEther";
import "./globals.css";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-rajdhani",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["500", "700", "900"],
  variable: "--font-orbitron",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});

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
    <html
      lang="zh-CN"
      className={`${rajdhani.variable} ${orbitron.variable} ${inter.variable} ${jetbrains.variable} dark`}
    >
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

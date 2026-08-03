"use client";
/**
 * v4 · 2026-08-03 Hero 全面重做（目标 90+）
 * 参考：Locomotive / Basic Agency / Dogstudio / Active Theory / Fantasy Interactive
 *
 * 信息架构：
 *   左 4 层：品牌 → 一句话 → 身份标签 → 按钮
 *   中 3 行：DESIGN FOR / INTELLIGENCE / & IMAGINATION + 关键词
 *   右 3 块：Currently Looking For → Status → 双按钮
 *   底 3 卡：taller 250px + 80px 大数字
 *
 * 视觉：3 层 background 文字（5% opacity）+ 聚光灯 radial glow + 鼠标视差
 * 字体：font-weight 600 (SemiBold) · tracking -0.05em · leading 0.8
 * 配色：80% 黑白 / 15% 灰 / 5% 粉紫（accent 只在 CTA / hover / glow 用）
 */
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, useMotionValue, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HeroSideRail } from "@/components/ui/SideRail";
import TextScramble from "@/components/effects/TextScramble";
import {
  ContactModal,
  openContact,
} from "@/components/contact/ContactModal";
import { profile } from "@data/profile";
import { profileMeta } from "@data/profile-section";
import { heroStats } from "@/lib/stats";

// 关键词（hover 亮 · 杂志感横排）
const KEYWORDS = ["Visual", "Interaction", "AIGC", "Realtime", "Film", "Product"];

// Currently Looking For
const LOOKING_FOR = [
  "AI Commercial",
  "AI Drama",
  "Digital Experience",
  "Brand Film",
  "Interactive Installation",
];

// 身份标签
const IDENTITY = [
  "Visual Designer",
  "Creative Technologist",
  "AIGC Creator",
  "Art & Technology",
];

// stagger 子动画（fadeUp）
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

// Design Statement 文案的渐变 + 轻光晕（SemiBold · -5% 字距 · 0.8 行距）
const statementTextStyle: React.CSSProperties = {
  background: "linear-gradient(90deg, #FFFFFF 0%, #D8C5F0 50%, #FFAFD3 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  fontWeight: 600,
  letterSpacing: "-0.05em",
  lineHeight: 0.8,
  // 比之前轻：SemiBold 不需要那么强的纵深
  textShadow:
    "0 0 40px rgba(216,197,240,0.4), " +
    "0 0 90px rgba(255,175,211,0.3)",
};

export default function IntroSection() {
  // ===== 鼠标视差（5px 范围） =====
  const parallaxX = useMotionValue(0);
  const parallaxY = useMotionValue(0);

  // 3 张统计卡 → 点击/键盘跳 /works
  const router = useRouter();
  const goWorks = () => router.push("/works");
  const goWorksByKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      goWorks();
    }
  };

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      // 中心点为 0；移动到边缘为 ±2.5px（* 5 范围 = ±5px）
      const x = (e.clientX / window.innerWidth - 0.5) * 5;
      const y = (e.clientY / window.innerHeight - 0.5) * 5;
      parallaxX.set(x);
      parallaxY.set(y);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [parallaxX, parallaxY]);

  return (
    <section
      id="intro"
      className="relative overflow-hidden"
      style={{ minHeight: "max(900px, calc(100vh - 72px))" }}
    >
      {/* ===== 背景层 ===== */}
      {/* 3 层 background 文字（depth · 5% opacity） */}
      <p
        aria-hidden
        className="absolute top-[10%] left-0 right-0 text-center text-[clamp(80px,18vw,260px)] font-display font-black text-white/[0.045] whitespace-nowrap pointer-events-none select-none tracking-[-0.04em] z-0"
      >
        METAVERSE
      </p>
      <p
        aria-hidden
        className="absolute top-[38%] left-0 right-0 text-center text-[clamp(70px,15vw,210px)] font-display font-black text-white/[0.035] whitespace-nowrap pointer-events-none select-none tracking-[-0.04em] z-0"
      >
        FUTURE
      </p>
      <p
        aria-hidden
        className="absolute bottom-[30%] left-0 right-0 text-center text-[clamp(70px,15vw,210px)] font-display font-black text-white/[0.035] whitespace-nowrap pointer-events-none select-none tracking-[-0.04em] z-0"
      >
        DESIGN
      </p>

      {/* 中心 radial glow（聚光灯 · 中心亮 四周暗） */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 55% 50% at 50% 50%, rgba(255,45,122,0.20) 0%, rgba(196,77,255,0.10) 35%, transparent 70%)",
          animation: "glow-breathe 6s ease-in-out infinite",
        }}
      />
      {/* 暗角（边缘微微压暗） */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 80% 75% at 50% 50%, transparent 60%, rgba(5,5,10,0.4) 100%)",
        }}
      />

      {/* Scan line + glitch overlay（已有 · 保留） */}
      <div aria-hidden className="hud-scanline absolute inset-0 z-[2] pointer-events-none" />
      <div aria-hidden className="glitch-overlay absolute inset-0 z-[3] pointer-events-none" />

      {/* ===== 左侧固定 SideRail ===== */}
      <HeroSideRail />

      {/* ===== 主体（鼠标视差包一层） ===== */}
      <motion.div
        style={{ x: parallaxX, y: parallaxY }}
        className="relative z-10 h-full"
      >
        {/* 用自定义 div 撑满，左边多留一点空隙 */}
        <div className="h-full pt-14 md:pt-20 pb-8 flex flex-col pl-10 md:pl-16 lg:pl-24 pr-6 md:pr-10 lg:pr-16">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10% 0px" }}
            className="grid grid-cols-12 gap-4 lg:gap-8 flex-1 items-stretch min-h-0"
          >
            {/* =====================================================
                左侧：4 层信息层级
                ===================================================== */}
            <motion.div
              variants={fadeUp}
              className="col-span-12 md:col-span-3 flex flex-col justify-between"
            >
              <div>
                {/* Layer 1: 品牌 */}
                <div className="font-mono text-[10px] uppercase tracking-overline text-accent mb-2 flex items-center gap-2">
                  <span className="w-6 h-px bg-chrome-line" />
                  / 01 · Identity
                </div>
                <h3 className="font-display font-light uppercase text-text leading-[0.92] tracking-heading">
                  <span className="text-3xl md:text-4xl lg:text-5xl">Leson-cc</span>
                  <span className="block text-accent text-2xl md:text-3xl mt-1">/ Portfolio.</span>
                </h3>

                {/* Layer 2: 一句话（不超过一行 + 中文镜像） */}
                <p className="text-sm text-text-2 leading-snug mt-5">
                  Turning ideas into visual experiences.
                </p>
                <p className="text-xs text-text-3 leading-relaxed mt-1">
                  把抽象想法转化为可感知的视觉与体验。
                </p>
              </div>

              {/* Layer 3 + 4: 身份标签 + 按钮 */}
              <div>
                <ul className="space-y-1 mb-6 border-l border-line pl-3">
                  {IDENTITY.map((tag) => (
                    <li
                      key={tag}
                      className="text-sm text-text-2 font-display leading-snug"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>

                <Button
                  variant="primary"
                  size="md"
                  href="/works"
                  className="h-14 w-[220px] group"
                >
                  Explore Works
                  <ArrowUpRight
                    size={14}
                    className="ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Button>
              </div>
            </motion.div>

            {/* =====================================================
                中央：Design Statement + 关键词
                ===================================================== */}
            <motion.div
              variants={fadeUp}
              className="col-span-12 md:col-span-6 flex flex-col items-center justify-center text-center"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted mb-3">
                // Manifesto · Stmt 02 / 26
              </p>

              {/* line 1: Design for（小 · light） */}
              <p className="font-display font-light uppercase tracking-[0.04em] text-text-3 text-base md:text-lg mt-1">
                Design for
              </p>

              {/* line 2: INTELLIGENCE（巨大 · SemiBold · 白紫粉渐变） */}
              <h2
                className="text-[clamp(2.75rem,12vw,8.5rem)] mt-1"
                style={statementTextStyle}
              >
                Intelligence
              </h2>

              {/* line 3: &（小） */}
              <p className="font-display font-light uppercase tracking-[0.04em] text-text-3 text-base md:text-lg mt-3">
                &amp;
              </p>

              {/* line 4: IMAGINATION（巨大 · SemiBold · 渐变） */}
              <h2
                className="text-[clamp(2.5rem,10vw,7.5rem)]"
                style={statementTextStyle}
              >
                Imagination
              </h2>

              {/* 关键词（hover 亮 + 微放大 + glow） */}
              <div className="mt-6 md:mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 max-w-md">
                {KEYWORDS.map((kw) => (
                  <motion.span
                    key={kw}
                    whileHover={{
                      color: "#FF2D7A",
                      scale: 1.05,
                      textShadow: "0 0 12px rgba(255,45,122,0.6)",
                    }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-3 cursor-default"
                  >
                    {kw}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* =====================================================
                右侧：Currently Looking For + Status + 2 按钮
                ===================================================== */}
            <motion.div
              variants={fadeUp}
              className="col-span-12 md:col-span-3 flex flex-col justify-between md:text-right"
            >
              <div>
                <p className="font-mono text-[10px] uppercase tracking-overline text-accent mb-3 flex items-center gap-2 md:justify-end">
                  / 02 · Collaboration
                </p>
                <ul className="space-y-1.5 mb-6 md:ml-auto">
                  {LOOKING_FOR.map((item) => (
                    <li key={item} className="text-sm text-text-2 leading-snug">
                      {item}
                    </li>
                  ))}
                </ul>

                <p className="font-mono text-[10px] uppercase tracking-overline text-text-3 mb-2 md:text-right">
                  // Status
                </p>
                <div className="space-y-1.5 mb-6 md:ml-auto">
                  <p className="text-[11px] text-text-2 flex items-center gap-1.5 md:justify-end">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                    <span>Available for Collaboration</span>
                  </p>
                  <p className="text-[11px] text-text-2 flex items-center gap-1.5 md:justify-end">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
                    <span>Open to Internship</span>
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 md:items-end">
                <Button
                  variant="primary"
                  size="md"
                  onClick={openContact}
                  className="h-12 w-[200px] group"
                >
                  Contact
                  <ArrowUpRight size={14} className="ml-1" />
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  href={profileMeta.resumeHref}
                  download
                  className="h-12 w-[200px] group"
                >
                  Resume
                  <ArrowUpRight size={14} className="ml-1" />
                </Button>
              </div>
            </motion.div>
          </motion.div>

          {/* =====================================================
              底部：3 张统计卡（250px 高 + 80px 数字 + hover lift）
              ===================================================== */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-4 mt-8 md:mt-10">
            {heroStats.map((s, i) => (
              <motion.div
                key={s.label}
                role="link"
                tabIndex={0}
                aria-label={`${s.label} - 查看作品列表`}
                onClick={goWorks}
                onKeyDown={goWorksByKey}
                whileHover={{
                  y: -6,
                  boxShadow: "0 0 32px rgba(255,45,122,0.35)",
                  borderColor: "rgba(255,45,122,0.6)",
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="group glass-panel p-5 transition-all duration-normal cursor-pointer min-h-[250px] flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="font-mono text-[10px] uppercase tracking-overline text-text-3">
                    // 0{i + 1} · Selected Works
                  </p>
                  <ArrowUpRight
                    size={12}
                    className="text-text-3 group-hover:text-accent transition-colors"
                  />
                </div>
                <p className="font-display font-semibold text-[clamp(56px,6vw,80px)] text-accent leading-[0.95] tracking-[-0.04em] mt-auto">
                  {s.value}
                </p>
                <p className="font-mono text-[11px] uppercase tracking-overline text-text mt-2">
                  {s.label}
                </p>
                <p className="text-xs text-text-3 mt-1.5 leading-relaxed line-clamp-2">
                  {s.caption}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 全站唯一的 ContactModal 实例 — 监听 contact:open 事件 */}
      <ContactModal />
    </section>
  );
}

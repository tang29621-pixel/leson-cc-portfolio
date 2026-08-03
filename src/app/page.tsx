"use client";
// / 落地页（v3 · 2026-08-03 编辑式 Design Statement）
// 参考：Studio Dumbar / Locomotive / Huge Inc — 大字 + 留白 + 极简 meta
// 中央 huge "Make the future visible." · "future" 词粉色高亮
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="relative h-screen w-full overflow-hidden bg-bg">
      {/* 顶部 meta：极简品牌 + 期号 */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center px-6 md:px-10 py-6"
      >
        <span className="font-mono text-xs uppercase tracking-widest text-text">
          Leson-cc <span className="text-muted">/ Portfolio</span>
        </span>
        <span className="font-mono text-xs uppercase tracking-widest text-muted">
          Vol. 01 / 2026
        </span>
      </motion.header>

      {/* 中央：Design Statement（编辑式 · 杂志感） */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-10 grid place-items-center pointer-events-none px-6"
      >
        <div className="text-center max-w-page">
          {/* eyebrow tag */}
          <div className="mb-6 md:mb-10 inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.4em] text-muted">
            <span className="h-px w-8 bg-line" />
            <span>Design Statement</span>
            <span className="h-px w-8 bg-line" />
          </div>

          {/* 主标语（huge） */}
          <h1 className="font-display font-light uppercase leading-[0.92] tracking-[-0.04em] text-text text-[clamp(2.75rem,9vw,7.5rem)]">
            Make the{" "}
            <span className="text-accent font-medium">future</span>
            <br />
            visible
            <span className="text-accent">.</span>
          </h1>

          {/* 下方 meta */}
          <div className="mt-8 md:mt-12 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
            <span>Visual Designer</span>
            <span className="hidden md:inline text-line">/</span>
            <span>Shanghai</span>
            <span className="hidden md:inline text-line">/</span>
            <span>2026</span>
          </div>
        </div>
      </motion.div>

      {/* 底部：简化为 subtitle + Enter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute bottom-0 left-0 right-0 z-10 px-6 md:px-10 pb-10 md:pb-12"
      >
        <div className="flex items-end justify-between">
          <p className="text-sm font-mono uppercase tracking-widest text-muted max-w-xs">
            AIGC · 3D · Motion · Visual Storytelling
          </p>
          <button
            onClick={() => router.push("/main")}
            className="group inline-flex items-center gap-3 border border-text px-6 py-3 font-mono text-xs uppercase tracking-widest text-text transition-all duration-300 hover:bg-text hover:text-bg"
          >
            <span>Enter</span>
            <ArrowDown className="w-3 h-3 transition-transform group-hover:translate-y-0.5" />
          </button>
        </div>
      </motion.div>

      {/* 右侧竖排刻度 */}
      <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-10 hidden md:block">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted [writing-mode:vertical-rl]">
          STMT · 01 / 26
        </span>
      </div>
    </main>
  );
}

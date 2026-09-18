"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Tabs } from "@/components/ui/Tabs";
import {
  projects,
  categoryLabels,
  categoryLabelsZh,
  type ProjectCategory,
} from "@data/projects";
import { fadeUp, stagger, viewport } from "@/lib/motion";
import { openProject } from "@/components/project-detail/openProject";
import ProjectDetailModal from "@/components/project-detail/ProjectDetailModal";

type Filter = "all" | ProjectCategory;

const filters: { key: Filter; label: string }[] = [
  { key: "all", label: "All / 全部" },
  { key: "motion-aigc", label: "Motion & AIGC" },
  { key: "visual-branding", label: "Visual & Branding" },
  { key: "product-interaction", label: "Product & Interaction" },
  { key: "digital-art", label: "Digital Art" },
];

export default function WorksPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const sorted = useMemo(
    () => [...projects].sort((a, b) => b.year.localeCompare(a.year)),
    [],
  );
  const filtered = useMemo(
    () =>
      filter === "all"
        ? sorted
        : sorted.filter((p) => p.category === filter),
    [filter, sorted],
  );

  return (
    <main className="min-h-screen bg-bg text-text font-body relative overflow-hidden">
      {/* 顶部扫描线 */}
      <div aria-hidden className="hud-scanline" />

      <Container className="pt-32 md:pt-40 pb-section relative z-10">
        {/* 顶部导航 */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <Link
            href="/main"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-overline text-text-3 hover:text-accent transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to Home</span>
          </Link>
        </motion.div>

        {/* 标题 */}
        <motion.header
          variants={stagger}
          initial="hidden"
          animate="show"
          className="grid-magazine items-end mb-12 md:mb-16"
        >
          <motion.div
            variants={fadeUp}
            className="col-span-12 md:col-span-2 text-sm font-mono text-accent uppercase tracking-overline"
          >
            / INDEX
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="col-span-12 md:col-span-7 text-display font-display uppercase leading-none text-text tracking-display"
          >
            All Works
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="col-span-12 md:col-span-3 text-lead text-text-3 md:text-right mt-4 md:mt-0 font-heading"
          >
            共 {projects.length} 个项目 · 按时间倒序
          </motion.p>
        </motion.header>

        {/* 分类 Tab */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10"
        >
          <Tabs tabs={filters} active={filter} onChange={setFilter} />
        </motion.div>

        {/* 当前筛选描述 */}
        <AnimatePresence mode="wait">
          <motion.p
            key={filter}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="text-sm text-text-3 mb-8 font-heading"
          >
            {filter === "all"
              ? "展示全部作品"
              : `${categoryLabels[filter]} · ${categoryLabelsZh[filter]}`}
            <span className="ml-3 font-mono text-[10px] uppercase tracking-overline text-accent">
              {filtered.length} 项
            </span>
          </motion.p>
        </AnimatePresence>

        {/* 列表 */}
        <AnimatePresence mode="wait">
          <motion.ul
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
          >
            {filtered.map((p, i) => (
              <motion.li
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                role="button"
                tabIndex={0}
                onClick={() => openProject(p.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openProject(p.id);
                  }
                }}
                aria-label={`查看 ${p.title} 项目详情`}
                className="group glass-panel hover:neon-border transition-all duration-normal cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                {/* 封面图（按 coverAspect 字段调整比例，默认 16/9） */}
                <div
                  className="relative w-full overflow-hidden"
                  style={{
                    aspectRatio: p.coverAspect || "16/9",
                    backgroundColor: p.coverHue,
                  }}
                >
                  <Image
                    src={p.cover}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover opacity-90 group-hover:opacity-70 transition-opacity duration-normal"
                  />
                  <div className="absolute inset-0 p-5 flex flex-col justify-between pointer-events-none">
                    <span className="font-mono text-xs uppercase tracking-overline text-text">
                      {p.year} · {p.id.toUpperCase()}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-overline text-text">
                      {p.tags.slice(0, 2).join(" / ")}
                    </span>
                  </div>
                </div>

                {/* 信息 */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <span className="font-mono text-[10px] uppercase tracking-overline text-accent">
                      {categoryLabels[p.category]}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-overline text-text-3">
                      {p.role}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl text-text leading-tight uppercase group-hover:text-accent transition-colors tracking-heading">
                    {p.title}
                  </h3>
                  {p.subtitle && (
                    <p className="text-sm text-text-3 mt-1 font-heading">{p.subtitle}</p>
                  )}
                  <p className="mt-3 text-sm text-text-2 leading-relaxed whitespace-pre-line">
                    {p.desc}
                  </p>
                  {p.awards && p.awards.length > 0 && (
                    <ul className="mt-3 space-y-0.5">
                      {p.awards.map((a) => (
                        <li
                          key={a}
                          className="font-mono text-[10px] uppercase tracking-overline text-accent"
                        >
                          ✦ {a}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] uppercase tracking-overline text-text-3 border border-line px-2 py-0.5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-line">
                    <span className="font-mono text-[10px] uppercase tracking-overline text-text-3">
                      {p.tools.join(" / ")}
                    </span>
                  </div>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>

        {filtered.length === 0 && (
          <p className="text-center text-text-3 py-20 font-mono uppercase tracking-overline">
            该分类下暂无作品。
          </p>
        )}
      </Container>

      {/* 项目详情 Modal（监听 project:open 事件） */}
      <ProjectDetailModal />
    </main>
  );
}

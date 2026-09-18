"use client";
/**
 * #04 动态作品 / Showreel（v2 · 2026-08-02 重写：1+3 布局）
 *
 * 布局：
 *   - 左侧 (col-span-8) : 当前选中视频的大窗口（16:9）
 *   - 右侧 (col-span-4) : 3 个缩略图（垂直堆叠），点击切换主位
 *   - 占位态 (source="placeholder") : 大窗口 + 缩略图都显示 "Coming Soon"
 *   - 选中态 : 缩略图 neon 边框高亮
 *
 * 数据：videos 数组来自 @data/videos
 * v4 占位已删除（2026-09-18）
 *   v1 = P4 REBUILD THE CITY（B 站 BV1qH7p6MEMK）
 *   v2 = P7 HYDRA FLOW STATION（B 站 BV1qiMD6FEEf）
 *   v3-v4 = Coming Soon 占位
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, ArrowUpRight, Play } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { videos } from "@data/videos";
import { projects } from "@data/projects";
import { fadeUp, stagger, viewport } from "@/lib/motion";

export default function ShowreelSection() {
  const [activeId, setActiveId] = useState(videos[0].id);
  const active = videos.find((v) => v.id === activeId) ?? videos[0];
  const activeProject = active.projectId
    ? projects.find((p) => p.id === active.projectId)
    : null;

  return (
    <section id="showreel" className="py-section rule-top">
      <Container>
        <SectionTitle
          index="04"
          eyebrow="SHOWREEL"
          title="动态作品"
          subtitle="品牌动效 / 3D 视觉 / 程序化生成。"
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="grid grid-cols-12 gap-4 md:gap-6"
        >
          {/* ===== 左侧：大窗口 ===== */}
          <motion.div variants={fadeUp} className="col-span-12 md:col-span-8">
            <div className="relative aspect-video bg-text overflow-hidden border border-line">
              {active.source === "bilibili" && active.bvid ? (
                <iframe
                  src={`//player.bilibili.com/player.html?bvid=${active.bvid}&autoplay=0&danmaku=0&high_quality=1`}
                  width="100%"
                  height="100%"
                  frameBorder="no"
                  scrolling="no"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  style={{ border: 0, display: "block" }}
                  title={active.title}
                />
              ) : active.source === "self" && active.src ? (
                <video
                  src={active.src}
                  controls
                  playsInline
                  className="w-full h-full object-cover"
                  poster={active.poster}
                />
              ) : (
                /* placeholder */
                <div
                  className="absolute inset-0 grid place-items-center"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, #2B4A6F 0%, #0E0E0E 70%)",
                  }}
                >
                  <div className="relative text-center text-bg">
                    <Clock
                      size={32}
                      className="mx-auto mb-3 text-bg/60"
                      aria-hidden
                    />
                    <p className="font-mono text-xs uppercase tracking-overline text-bg/60 mb-2">
                      Coming Soon
                    </p>
                    <h3 className="font-serif text-3xl md:text-5xl mb-2">
                      {active.id.toUpperCase()}
                    </h3>
                    {active.year && (
                      <p className="font-mono text-[10px] uppercase tracking-overline text-bg/50">
                        {active.year}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* 角标：当前视频 ID */}
              <div className="absolute top-3 left-3 z-10 font-mono text-[10px] uppercase tracking-overline text-bg/80 bg-bg/60 backdrop-blur px-2 py-0.5">
                ▶ {active.id.toUpperCase()}
              </div>
              {active.type && (
                <div className="absolute top-3 right-3 z-10 font-mono text-[10px] uppercase tracking-overline text-bg/80 bg-bg/60 backdrop-blur px-2 py-0.5">
                  {active.type}
                </div>
              )}
            </div>

            {/* 主位视频元信息 */}
            <div className="mt-4 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
              <div className="min-w-0">
                <h3 className="font-display text-xl md:text-2xl text-text uppercase tracking-heading truncate">
                  {active.title}
                  {active.subtitle && (
                    <span className="ml-2 text-accent">· {active.subtitle}</span>
                  )}
                </h3>
                {active.desc && (
                  <p className="text-sm text-text-3 mt-1">{active.desc}</p>
                )}
              </div>
              {activeProject && (
                <a
                  href="/works"
                  className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-overline text-text-3 hover:text-accent transition-colors shrink-0"
                  title={`查看作品 ${activeProject.title}`}
                >
                  <span>查看作品 · {activeProject.title}</span>
                  <ArrowUpRight size={12} />
                </a>
              )}
            </div>
          </motion.div>

          {/* ===== 右侧：3 个缩略图 ===== */}
          <motion.ul
            variants={fadeUp}
            className="col-span-12 md:col-span-4 flex flex-row md:flex-col gap-3 md:gap-4"
          >
            {videos.map((v) => {
              const isActive = v.id === activeId;
              return (
                <li
                  key={v.id}
                  onClick={() => setActiveId(v.id)}
                  className={`group relative aspect-video flex-1 md:flex-none cursor-pointer overflow-hidden border transition-all duration-normal ${
                    isActive
                      ? "border-accent shadow-neon-primary"
                      : "border-line hover:border-text"
                  }`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveId(v.id);
                    }
                  }}
                  aria-label={`切换到 ${v.title}`}
                >
                  {v.source === "bilibili" && v.bvid ? (
                    <iframe
                      src={`//player.bilibili.com/player.html?bvid=${v.bvid}&autoplay=0&danmaku=0`}
                      style={{
                        border: 0,
                        pointerEvents: "none",
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                      }}
                      title={v.title}
                    />
                  ) : (
                    /* 占位缩略图 */
                    <div
                      className="absolute inset-0 grid place-items-center"
                      style={{
                        background:
                          "radial-gradient(ellipse at center, #2B4A6F 0%, #0E0E0E 75%)",
                      }}
                    >
                      <div className="text-center text-bg/80">
                        <Play
                          size={20}
                          className="mx-auto mb-1 text-bg/50 group-hover:text-accent transition-colors"
                          aria-hidden
                        />
                        <p className="font-mono text-[9px] uppercase tracking-widest text-bg/60">
                          {v.id.toUpperCase()}
                        </p>
                        <p className="font-heading text-xs text-bg/80 mt-0.5">
                          Coming Soon
                        </p>
                      </div>
                    </div>
                  )}

                  {/* 标题 overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none">
                    <span className="font-mono text-[10px] uppercase tracking-overline text-bg truncate block">
                      {v.id.toUpperCase()} · {v.title}
                    </span>
                  </div>

                  {/* 选中指示 */}
                  {isActive && (
                    <div
                      aria-hidden
                      className="absolute top-2 right-2 w-2 h-2 rounded-full bg-accent shadow-neon-primary"
                    />
                  )}
                </li>
              );
            })}
          </motion.ul>
        </motion.div>
      </Container>
    </section>
  );
}

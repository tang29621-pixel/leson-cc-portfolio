"use client";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { tracks } from "@data/music";
import VinylRecord from "./VinylRecord";

/**
 * #06 喜欢的音乐（v4 · 2026-09-18 站内播放）
 *
 * v4 改：
 *   - 点击曲目：站内 iframe 播放（有 neteaseId）或跳网易云搜索（无 ID）
 *   - iframe src 跟随 activeIndex 切换
 *   - 黑胶 label 跟着 active.title / active.artist 变
 *   - 已实现 hover 高亮 + 当前行强调（v3 保留）
 */
export default function MusicSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [iframeError, setIframeError] = useState(false);
  const active = tracks[activeIndex];

  // 站内 iframe（单曲 type=2, auto=1 自动播放 — 首次需用户点击，已被 onClick 解锁）
  const inlineSrc = active.neteaseId
    ? `https://music.163.com/outchain/player?type=2&id=${active.neteaseId}&auto=1&height=110`
    : null;

  // 跳网易云搜索（外部播放）
  const neteaseSearch = (title: string, artist: string) => {
    const q = encodeURIComponent(`${title} ${artist}`);
    return `https://music.163.com/#/search/m/?s=${q}&type=1`;
  };

  // 直接跳网易云单曲（已知 neteaseId 时用）
  const neteaseSong = (id: string) => `https://music.163.com/song?id=${id}`;

  return (
    <section id="music" className="py-section rule-top">
      <Container>
        <SectionTitle
          index="06"
          eyebrow="MUSIC"
          title="喜欢的音乐"
          subtitle="工作时戴耳机，休息时放黑胶。"
        />

        <div className="grid-magazine items-center gap-y-12 md:gap-y-0">
          {/* 黑胶唱片（带唱针 + 旋转动画） */}
          <div className="col-span-12 md:col-span-5">
            <VinylRecord
              label={active.title}
              sublabel={active.artist}
              isActive={true}
            />
          </div>

          {/* 右侧：曲单 + 嵌入 */}
          <div className="col-span-12 md:col-span-7 md:pl-8">
            <div className="flex items-baseline justify-between mb-5">
              <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
                最近常听 · Recently in Rotation
              </h3>
              <span className="font-mono text-[10px] text-muted">
                {String(activeIndex + 1).padStart(2, "0")} / {String(tracks.length).padStart(2, "0")}
              </span>
            </div>

            <ol className="space-y-1 mb-8">
              {tracks.map((t, i) => {
                const isActive = i === activeIndex;
                const hasInline = !!t.neteaseId;
                return (
                  <li key={i}>
                    <button
                      type="button"
                      onClick={() => {
                        setIframeError(false);
                        setActiveIndex(i);
                      }}
                      className={[
                        "group relative w-full text-left flex items-baseline gap-4 py-2.5 pl-3 pr-3 -ml-3",
                        "border-l-2 transition-all duration-200 cursor-pointer",
                        isActive
                          ? "border-accent bg-accent/[0.04]"
                          : "border-transparent hover:border-accent/50 hover:bg-white/[0.02]",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "font-mono text-xs w-6 shrink-0 tabular-nums transition-colors",
                          isActive ? "text-accent" : "text-muted group-hover:text-accent/70",
                        ].join(" ")}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={[
                          "flex-1 font-heading text-base transition-colors",
                          isActive ? "text-text" : "text-text/85 group-hover:text-text",
                        ].join(" ")}
                      >
                        {t.title}
                      </span>
                      <span className="text-sm text-muted truncate max-w-[40%]">
                        {t.artist}
                      </span>
                      <span
                        className={[
                          "font-mono text-[10px] uppercase tracking-widest transition-opacity shrink-0",
                          isActive
                            ? "text-accent opacity-100"
                            : "opacity-0 group-hover:opacity-60",
                        ].join(" ")}
                      >
                        {hasInline ? "▶ 站内播放" : "↗ 网易云"}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>

            {/* 网易云 iframe + fallback */}
            <div className="border border-line p-1 bg-surface1/40 min-h-[112px]">
              {iframeError ? (
                <div className="p-6 text-center">
                  <p className="text-sm text-muted mb-3">
                    播放器加载失败，可能被浏览器拦截
                  </p>
                  <a
                    href={active.neteaseId ? neteaseSong(active.neteaseId) : neteaseSearch(active.title, active.artist)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-text text-text font-mono text-xs uppercase tracking-widest hover:bg-text hover:text-bg transition-colors"
                  >
                    在 网易云 打开 ↗
                  </a>
                </div>
              ) : inlineSrc ? (
                <iframe
                  key={active.neteaseId}
                  frameBorder="no"
                  style={{ border: 0, display: "block" }}
                  width="100%"
                  height={110}
                  src={inlineSrc}
                  onError={() => setIframeError(true)}
                  allow="autoplay"
                />
              ) : (
                <div className="p-6 flex flex-col items-center justify-center text-center min-h-[110px]">
                  <p className="text-sm text-text/80 mb-1">
                    <span className="font-heading">{active.title}</span>
                    <span className="text-muted"> · {active.artist}</span>
                  </p>
                  <p className="text-xs text-muted mb-3">
                    这首还没填入 neteaseId，先在网易云听
                  </p>
                  <a
                    href={neteaseSearch(active.title, active.artist)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-accent text-accent font-mono text-xs uppercase tracking-widest hover:bg-accent hover:text-bg transition-colors"
                  >
                    在 网易云 搜索 ↗
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
"use client";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { playlist, tracks } from "@data/music";

/**
 * #06 喜欢的音乐（v2 · 2026-08-02 还原内嵌 iframe）
 *
 * v2 改：移除 9 首占位 → 真实 9 首（用户截图）+ iframe 嵌单曲 Nangilima
 * v3 改：恢复内嵌 iframe（撤回 MusicPlayer 后）
 */
export default function MusicSection() {
  const [iframeError, setIframeError] = useState(false);
  const playlistSrc = `https://music.163.com/outchain/player?type=${playlist.type}&id=${playlist.neteaseId}&auto=0&height=110`;

  return (
    <section id="music" className="py-section rule-top">
      <Container>
        <SectionTitle
          index="06"
          eyebrow="MUSIC"
          title="喜欢的音乐"
          subtitle="工作时戴耳机，休息时放黑胶。"
        />

        <div className="grid-magazine items-center">
          {/* 黑胶 */}
          <div className="col-span-12 md:col-span-5">
            <div className="relative max-w-md mx-auto">
              <div className="vinyl">
                <span className="vinyl-label">
                  {playlist.currentTrack.length > 16
                    ? playlist.currentTrack.slice(0, 14) + "…"
                    : playlist.currentTrack}
                </span>
              </div>
            </div>
          </div>

          {/* 右侧：曲单 + 嵌入 */}
          <div className="col-span-12 md:col-span-7 md:pl-8">
            <h3 className="font-mono text-xs uppercase tracking-widest text-muted mb-6">
              最近常听 · Recently in Rotation
            </h3>
            <ol className="space-y-3 mb-8">
              {tracks.map((t, i) => (
                <li
                  key={i}
                  className="flex items-baseline gap-4 border-b border-line pb-3"
                >
                  <span className="font-mono text-xs text-muted w-6 shrink-0">
                    0{i + 1}
                  </span>
                  <span className="font-serif text-base text-text flex-1">
                    {t.title}
                  </span>
                  <span className="text-sm text-muted">{t.artist}</span>
                  {t.year && (
                    <span className="font-mono text-[10px] text-muted">
                      {t.year}
                    </span>
                  )}
                </li>
              ))}
            </ol>

            {/* 网易云 iframe + fallback */}
            <div className="border border-line p-1">
              {iframeError ? (
                <div className="bg-line/30 p-6 text-center">
                  <p className="text-sm text-muted mb-3">
                    播放器加载失败，可能被浏览器拦截
                  </p>
                  <a
                    href={playlist.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-text text-text font-mono text-xs uppercase tracking-widest hover:bg-text hover:text-bg transition-colors"
                  >
                    在 网易云 打开 ↗
                  </a>
                </div>
              ) : (
                <iframe
                  frameBorder="no"
                  style={{ border: 0, display: "block" }}
                  width="100%"
                  height={110}
                  src={playlistSrc}
                  onError={() => setIframeError(true)}
                />
              )}
            </div>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-muted">
              ⊕ 替换歌单：打开 data/music.ts 改 neteaseId
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

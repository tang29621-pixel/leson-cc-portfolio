"use client";
// VideoBlock · 视频块（B 站 embed / 自托管 MP4 / placeholder）
//
// 完全照搬 src/components/sections/ShowreelSection.tsx:52-72 的 iframe 写法：
//   - 协议相对 URL（本地 http 开发可用）
//   - allow="autoplay; fullscreen"
//   - poster 失败时显示 Coming Soon 占位
//
// 不重复 data/videos.ts 的 source 逻辑：Modal 直接用 type=video 块自带字段
//
// 自适应比例（aspect prop，默认 "16/9"）：
//   - 横屏（w > h，如 "16/9" / "21/9"）→ 全宽
//   - 竖屏（w < h，如 "9/16" / "2/3"）→ 居中 + 限制最大宽度，避免在 modal 里拉得过高

import { Clock } from "lucide-react";

export function VideoBlock({
  source,
  bvid,
  src,
  poster,
  title,
  desc,
  aspect,
}: {
  source: "bilibili" | "self" | "placeholder";
  bvid?: string;
  src?: string;
  poster?: string;
  title: string;
  desc?: string;
  /** 视频宽高比字符串，例如 "16/9" / "9/16" / "2/3"。默认 "16/9"。 */
  aspect?: string;
}) {
  const aspectValue = aspect || "16/9";
  const [w, h] = aspectValue.split("/").map(Number);
  const isPortrait =
    !Number.isNaN(w) && !Number.isNaN(h) && w > 0 && h > 0 && w < h;

  return (
    <div>
      {/* 标题条 */}
      <div className="flex items-center justify-between mb-3">
        <p className="font-mono text-[10px] uppercase tracking-overline text-text-3">
          // Video · {title}
        </p>
        {desc && (
          <p className="font-mono text-[10px] uppercase tracking-overline text-text-3">
            {desc}
          </p>
        )}
      </div>

      <div
        className={
          isPortrait
            // 竖屏：居中并限制最大宽度，避免在 modal 里被拉得过高
            ? "relative mx-auto w-full max-w-[260px] sm:max-w-[300px] md:max-w-[340px] bg-text overflow-hidden border border-line"
            // 横屏：占满容器宽度
            : "relative w-full bg-text overflow-hidden border border-line"
        }
        style={{ aspectRatio: aspectValue }}
      >
        {source === "bilibili" && bvid ? (
          <iframe
            src={`//player.bilibili.com/player.html?bvid=${bvid}&autoplay=0&danmaku=0&high_quality=1`}
            width="100%"
            height="100%"
            frameBorder="no"
            scrolling="no"
            allow="autoplay; fullscreen"
            allowFullScreen
            style={{ border: 0, display: "block" }}
            title={title}
          />
        ) : source === "self" && src ? (
          <video
            src={src}
            controls
            playsInline
            poster={poster}
            className="w-full h-full object-cover"
          />
        ) : (
          // placeholder
          <div
            className="w-full h-full flex flex-col items-center justify-center gap-3"
            style={{
              background:
                "radial-gradient(ellipse at center, #2B4A6F 0%, #0E0E0E 70%)",
            }}
          >
            <Clock size={32} className="text-text-3" />
            <p className="font-mono text-xs uppercase tracking-overline text-text-3">
              Coming Soon · 视频即将发布
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

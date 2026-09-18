"use client";
// RichtextBlock · 结构化富文本（h2/h3/p/quote/ul）
// 替代 raw HTML：安全、可静态分析、不依赖 DOMPurify
//
// 颜色规则：与项目内 typography 一致
//   - h2: text-text font-display uppercase tracking-heading text-xl
//   - h3: text-text font-display uppercase tracking-heading text-base
//   - p:  text-text-2 font-body
//   - quote: text-accent font-display italic border-l-2 border-accent pl-4
//   - ul: text-text-2 font-body marker 用 accent

import type { RichTextBlock } from "@data/projects";

export function RichtextBlock({ blocks }: { blocks: RichTextBlock[] }) {
  return (
    <div className="space-y-4 md:space-y-5">
      {blocks.map((b, i) => {
        switch (b.kind) {
          case "h2":
            return (
              <h3
                key={i}
                className="font-display text-xl md:text-2xl uppercase tracking-heading text-text leading-tight"
              >
                {b.text}
              </h3>
            );
          case "h3":
            return (
              <h4
                key={i}
                className="font-display text-base uppercase tracking-heading text-text leading-snug"
              >
                {b.text}
              </h4>
            );
          case "p":
            return (
              <p
                key={i}
                className="text-sm md:text-base text-text-2 leading-relaxed font-body"
              >
                {b.text}
              </p>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="border-l-2 border-accent pl-4 my-4 font-display italic text-base md:text-lg text-text leading-relaxed"
              >
                {b.text}
                {b.cite && (
                  <span className="block mt-1 font-mono text-[10px] uppercase tracking-overline text-text-3 not-italic">
                    — {b.cite}
                  </span>
                )}
              </blockquote>
            );
          case "ul":
            return (
              <ul key={i} className="space-y-1.5 text-sm md:text-base text-text-2">
                {b.items.map((item, j) => (
                  <li key={j} className="flex gap-3 leading-relaxed">
                    <span className="text-accent shrink-0 mt-0.5">▸</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
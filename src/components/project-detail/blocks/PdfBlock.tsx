"use client";
// PdfBlock · PDF 文档嵌入（浏览器原生 PDF viewer + #toolbar=0 隐藏工具栏）
//
// 设计选择：
//   - iframe + #toolbar=0：零依赖，浏览器原生渲染
//   - 提供下载 fallback：iframe 在某些环境加载失败（PDF.js 缺失 / 路径 404）也能拿到
//   - 默认高度 600px，移动端 75vh，更贴近真实阅读体验

import { Download } from "lucide-react";

export function PdfBlock({
  src,
  title,
  height = 600,
}: {
  src: string;
  title: string;
  height?: number;
}) {
  return (
    <div>
      {/* 标题条 + 下载按钮 */}
      <div className="flex items-center justify-between mb-3 gap-4">
        <p className="font-mono text-[10px] uppercase tracking-overline text-text-3 truncate">
          // Document · {title}
        </p>
        <a
          href={src}
          download
          className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-overline text-text-3 hover:text-accent transition-colors shrink-0"
        >
          <Download size={12} />
          Download PDF
        </a>
      </div>

      {/* PDF iframe */}
      <div
        className="relative w-full border border-line bg-surface1 overflow-hidden"
        style={{ height: `${height}px` }}
      >
        <iframe
          src={`${src}#toolbar=0&navpanes=0`}
          title={title}
          className="absolute inset-0 w-full h-full"
          style={{ border: 0 }}
        />
      </div>
    </div>
  );
}
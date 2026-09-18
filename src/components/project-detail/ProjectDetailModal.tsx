"use client";
/**
 * ProjectDetailModal · 项目详情全屏 Modal（v4 · 2026-08-04 新增）
 *
 * 行为（仿 ContactModal）：
 *   - 任何位置调用 openProject(id) → 弹出本 modal
 *   - 按 ESC 关 / 点 backdrop 关 / 点 × 关
 *   - 打开时锁 body 滚动 + URL 同步 ?p=p5
 *   - 用户直接访问 /works?p=p5 → 自动打开
 *
 * 数据来源：data/projects.ts 中每个 Project 的 content?: ProjectContentBlock[]
 * 视频优先用 data/videos.ts 反查（source 字段自带 bvid 与 desc）
 *
 * 渲染策略：
 *   - header：脉冲点 + overline + 项目 ID + close ×
 *   - title block：项目大标 + 副标 + meta
 *   - body：内容块按顺序 dispatch
 *   - footer：键盘提示 + 工具栏
 */

import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowUp, ExternalLink, Cloud, FolderOpen, Link2, ArrowUpRight } from "lucide-react";
import { projects, categoryLabels, type ProjectContentBlock, type ExternalLink as ExtLink } from "@data/projects";
import { PROJECT_OPEN_EVENT } from "./openProject";
import { RichtextBlock } from "./blocks/RichtextBlock";
import { ImagesBlock } from "./blocks/ImagesBlock";
import { VideoBlock } from "./blocks/VideoBlock";
import { PdfBlock } from "./blocks/PdfBlock";

export default function ProjectDetailModal() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  // 监听全局事件：任意位置 openProject(id) 即可打开
  useEffect(() => {
    const onOpen = (e: Event) => {
      const id = (e as CustomEvent<{ id: string }>).detail?.id;
      if (id) setActiveId(id);
    };
    window.addEventListener(PROJECT_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(PROJECT_OPEN_EVENT, onOpen);
  }, []);

  // 进入页面若 URL 已带 ?p=p5 → 自动打开（首次挂载时检查一次）
  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("p");
    if (fromUrl && projects.some((p) => p.id === fromUrl)) {
      setActiveId(fromUrl);
    }
  }, []);

  // 打开时锁 body 滚动 + ESC 关闭 + URL 同步（用 history.replaceState 避免触发 Next router re-render）
  useEffect(() => {
    if (!activeId) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // URL 同步：用 replaceState 不污染 history，也不触发 Next router
    const url = new URL(window.location.href);
    if (url.searchParams.get("p") !== activeId) {
      url.searchParams.set("p", activeId);
      window.history.replaceState({}, "", url.toString());
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId]);

  // 关闭：清 activeId + 移除 URL query
  const close = () => {
    setActiveId(null);
    const url = new URL(window.location.href);
    if (url.searchParams.has("p")) {
      url.searchParams.delete("p");
      window.history.replaceState({}, "", url.toString());
    }
  };

  // 滚到内容顶部
  const scrollToTop = () => {
    bodyRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const project = activeId
    ? projects.find((p) => p.id === activeId)
    : null;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={close}
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 md:p-6"
          aria-modal="true"
          role="dialog"
          aria-labelledby="project-modal-title"
        >
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl max-h-[94vh] bg-bg border border-line shadow-neon-primary flex flex-col"
          >
            {/* ===== Header ===== */}
            <header className="flex items-center justify-between gap-4 px-5 md:px-8 py-4 border-b border-line shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shrink-0" />
                <p
                  id="project-modal-title"
                  className="font-mono text-[10px] uppercase tracking-[0.32em] text-accent truncate"
                >
                  // Project · {project.id.toUpperCase()} · {project.year}
                </p>
                <span className="hidden md:inline font-mono text-[10px] uppercase tracking-overline text-text-3 truncate">
                  {categoryLabels[project.category]}
                </span>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="关闭项目详情"
                className="inline-flex items-center justify-center w-9 h-9 border border-line text-text-3 hover:text-accent hover:border-accent transition-colors shrink-0"
              >
                <X size={14} />
              </button>
            </header>

            {/* ===== Title Block ===== */}
            <div className="px-5 md:px-8 pt-6 md:pt-8 pb-4 md:pb-6 border-b border-line shrink-0">
              <h2 className="font-display text-2xl md:text-4xl lg:text-5xl uppercase text-text leading-tight tracking-heading">
                {project.title}
              </h2>
              {project.subtitle && (
                <p className="mt-2 text-sm md:text-base text-text-3 font-heading">
                  {project.subtitle}
                </p>
              )}
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10px] uppercase tracking-overline text-text-3">
                <span>{project.role}</span>
                <span className="text-line">·</span>
                <span>{project.type}</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] uppercase tracking-overline text-text-3 border border-line px-2 py-0.5"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* 外部链接（百度网盘 / Google Drive / 官网等） */}
              {project.externalLinks && project.externalLinks.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.externalLinks.map((link, i) => (
                    <ExternalLinkChip key={i} link={link} />
                  ))}
                </div>
              )}
            </div>

            {/* ===== Body ===== */}
            <div
              ref={bodyRef}
              className="flex-1 overflow-y-auto px-5 md:px-8 py-8 md:py-10"
            >
              {project.content && project.content.length > 0 ? (
                <div className="space-y-10 md:space-y-14">
                  {project.content.map((block, i) => (
                    <BlockRenderer key={i} block={block} />
                  ))}
                </div>
              ) : (
                // 空内容兜底
                <div className="py-12 text-center">
                  <p className="font-mono text-xs uppercase tracking-overline text-text-3 mb-3">
                    // Coming Soon
                  </p>
                  <p className="text-text-2 font-heading">
                    该作品详情正在整理中。
                  </p>
                  <p className="mt-1 text-sm text-text-3">
                    预计近期补充更多过程图、规格说明与视频成片。
                  </p>
                </div>
              )}
            </div>

            {/* ===== Footer ===== */}
            <footer className="px-5 md:px-8 py-3 border-t border-line flex items-center justify-between gap-4 shrink-0">
              <span className="font-mono text-[10px] uppercase tracking-overline text-text-3 hidden md:inline">
                按 ESC 关闭 · 点击外部关闭
              </span>
              <div className="flex items-center gap-3 ml-auto">
                <button
                  type="button"
                  onClick={scrollToTop}
                  className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-overline text-text-3 hover:text-accent transition-colors"
                  aria-label="回到顶部"
                >
                  <ArrowUp size={12} />
                  Top
                </button>
                <span className="text-line">·</span>
                <span className="font-mono text-[10px] uppercase tracking-overline text-text-3">
                  {project.tools.join(" / ")}
                </span>
                <a
                  href={`mailto:?subject=${encodeURIComponent(
                    `作品集 · ${project.title}`,
                  )}`}
                  className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-overline text-text-3 hover:text-accent transition-colors"
                  aria-label="分享"
                >
                  <ExternalLink size={12} />
                </a>
              </div>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ===== Block Dispatcher =====
function BlockRenderer({ block }: { block: ProjectContentBlock }) {
  switch (block.type) {
    case "richtext":
      return <RichtextBlock blocks={block.blocks} />;
    case "images":
      return <ImagesBlock items={block.items} layout={block.layout} />;
    case "video":
      return (
        <VideoBlock
          source={block.source}
          bvid={block.bvid}
          src={block.src}
          poster={block.poster}
          title={block.title}
          desc={block.desc}
          aspect={block.aspect}
        />
      );
    case "pdf":
      return <PdfBlock src={block.src} title={block.title} height={block.height} />;
    default:
      return null;
  }
}

// ===== External Link Chip =====
// url 为 "TODO" / 空字符串 / 非 http(s) 时自动隐藏，等用户替换真实链接后才会显示
// 带 pwd 时：紧挨 chip 显示一个提取码小 chip + 点击复制到剪贴板
function ExternalLinkChip({ link }: { link: ExtLink }) {
  const [copied, setCopied] = useState(false);

  if (!link.url || link.url === "TODO") return null;
  if (!/^https?:\/\//.test(link.url)) return null;

  const Icon =
    link.kind === "baidu"
      ? Cloud
      : link.kind === "drive"
      ? FolderOpen
      : Link2;

  const copyPwd = async () => {
    if (!link.pwd) return;
    try {
      await navigator.clipboard.writeText(link.pwd!);
    } catch {
      // fallback：临时 textarea + execCommand
      const ta = document.createElement("textarea");
      ta.value = link.pwd!;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch {
        /* swallow */
      }
      document.body.removeChild(ta);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <>
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-line text-text-2 hover:border-accent hover:text-accent transition-colors font-mono text-[10px] uppercase tracking-overline"
      >
        <Icon size={12} />
        {link.label}
        <ArrowUpRight size={10} className="opacity-70" />
      </a>

      {/* 提取码 chip（独立 · 点击复制） */}
      {link.pwd && (
        <button
          type="button"
          onClick={copyPwd}
          aria-label={`复制提取码 ${link.pwd}`}
          title="点击复制提取码"
          className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 border transition-colors font-mono text-[10px] uppercase tracking-overline ${
            copied
              ? "border-emerald-500 text-emerald-400"
              : "border-line text-text-3 hover:border-accent hover:text-accent"
          }`}
        >
          <span>pwd</span>
          <span className="text-accent">{link.pwd}</span>
          {copied ? (
            <span className="text-emerald-400">✓</span>
          ) : (
            <span className="opacity-60">⧉</span>
          )}
        </button>
      )}
    </>
  );
}
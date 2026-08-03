"use client";
/**
 * ContactModal · 联系方式弹窗（v2 · 2026-08-04 改成自管 + 全局事件）
 *
 * 行为：
 *   - 任何位置点击触发按钮 → 弹出本 modal
 *   - 按 ESC 关 / 点 backdrop 关 / 点 × 关
 *   - 打开时锁住 body 滚动
 *   - 微信支持「一键复制 handle」
 *
 * 用法：
 *   import { openContact } from "@/components/contact/ContactModal";
 *   <button onClick={openContact}>Contact</button>
 *
 * 数据来源：
 *   - profile.email + profile.social（data/profile.ts）
 *   - public/images/profile/wechat-qrcode.jpg
 */

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  Mail,
  Github,
  Globe,
  Video,
  MessageCircle,
  ArrowUpRight,
  X,
  Copy,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { profile } from "@data/profile";

// 全局事件名（供 window 直接 dispatch 用）
export const CONTACT_OPEN_EVENT = "contact:open";

// 便捷函数：从任意位置以编程方式打开 modal
export function openContact() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(CONTACT_OPEN_EVENT));
  }
}

const ICON_BY_LABEL: Record<string, typeof Mail> = {
  Email: Mail,
  GitHub: Github,
  小红书: Globe,
  Bilibili: Video,
  微信: MessageCircle,
};

export function ContactModal() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // 监听全局事件：任意位置触发即可打开
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(CONTACT_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(CONTACT_OPEN_EVENT, onOpen);
  }, []);

  // 打开时锁滚动 + ESC 关闭
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      setCopied(false);
    };
  }, [open]);

  // 找出微信条目（handle-only，不走外链）
  const wechat = profile.social.find((s) => s.label === "微信");
  const wechatHandle = wechat?.handle ?? "";
  // 其余所有走外链：用 type predicate 强制 narrow href: string
  type LinkSocial = { label: string; href: string; handle?: string };
  const linkable = profile.social.filter(
    (s): s is LinkSocial => s.label !== "微信" && typeof s.href === "string",
  );

  // 复制 handle
  const copyHandle = async () => {
    if (!wechatHandle) return;
    try {
      await navigator.clipboard.writeText(wechatHandle);
    } catch {
      // fallback：临时 textarea + execCommand
      const ta = document.createElement("textarea");
      ta.value = wechatHandle;
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
    <AnimatePresence>
      {open && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
          aria-modal="true"
          role="dialog"
          aria-labelledby="contact-modal-title"
        >
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl bg-bg border border-line shadow-neon-primary"
          >
            {/* Header */}
            <header className="flex items-center justify-between px-6 md:px-8 py-4 border-b border-line">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <p
                  id="contact-modal-title"
                  className="font-mono text-[10px] uppercase tracking-[0.32em] text-accent"
                >
                  Get in touch · 联系方式
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="关闭联系方式"
                className="inline-flex items-center justify-center w-9 h-9 border border-line text-text-3 hover:text-accent hover:border-accent transition-colors"
              >
                <X size={14} />
              </button>
            </header>

            {/* Body */}
            <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-0">
              {/* 左：微信二维码 */}
              <div className="px-6 md:px-8 py-6 md:py-8 border-b md:border-b-0 md:border-r border-line flex flex-col items-center md:items-start">
                <p className="font-mono text-[10px] uppercase tracking-overline text-text-3 mb-3">
                  // WeChat · 微信
                </p>
                <div className="relative w-[220px] h-[220px] md:w-[228px] md:h-[228px] bg-white p-3 border border-line">
                  <Image
                    src="/images/profile/wechat-qrcode.jpg"
                    alt="陈声渏微信二维码"
                    fill
                    sizes="228px"
                    className="object-contain"
                  />
                </div>
                <div className="mt-4 w-full">
                  <p className="font-mono text-[10px] uppercase tracking-overline text-text-3 mb-1">
                    Handle
                  </p>
                  <div className="flex items-center justify-between gap-3 border border-line px-3 py-2">
                    <span className="font-mono text-sm text-text truncate">
                      {wechatHandle || "—"}
                    </span>
                    <button
                      type="button"
                      onClick={copyHandle}
                      disabled={!wechatHandle || copied}
                      className={cn(
                        "inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-overline px-2 py-1 border transition-colors",
                        copied
                          ? "border-emerald-500 text-emerald-400"
                          : "border-line text-text-3 hover:text-accent hover:border-accent disabled:opacity-60",
                      )}
                    >
                      {copied ? (
                        <>
                          <Check size={12} />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy size={12} />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                  <p className="mt-2 text-xs text-text-3 font-heading leading-relaxed">
                    扫一扫添加，或复制 handle 粘贴到搜索框
                  </p>
                </div>
              </div>

              {/* 右：链接列表 */}
              <div className="px-6 md:px-8 py-6 md:py-8">
                <p className="font-mono text-[10px] uppercase tracking-overline text-text-3 mb-4">
                  // Channels · 渠道
                </p>
                <ul className="divide-y divide-line border-y border-line">
                  {linkable.map((item) => {
                    const Icon = ICON_BY_LABEL[item.label] ?? Globe;
                    const isMail = item.label === "Email";
                    return (
                      <li key={item.label}>
                        <a
                          href={item.href}
                          target={isMail ? undefined : "_blank"}
                          rel={isMail ? undefined : "noopener noreferrer"}
                          className="group flex items-center justify-between gap-4 py-3 hover:text-accent transition-colors"
                        >
                          <span className="flex items-center gap-3 min-w-0">
                            <span className="inline-flex items-center justify-center w-8 h-8 border border-line text-text-3 group-hover:border-accent group-hover:text-accent transition-colors">
                              <Icon size={14} />
                            </span>
                            <span className="flex flex-col min-w-0">
                              <span className="font-mono text-[10px] uppercase tracking-overline text-text-3">
                                {item.label}
                              </span>
                              <span className="font-heading text-sm text-text truncate group-hover:text-accent">
                                {isMail
                                  ? profile.email
                                  : item.href.replace(/^https?:\/\//, "").replace(/^mailto:/, "")}
                              </span>
                            </span>
                          </span>
                          <ArrowUpRight
                            size={16}
                            className="shrink-0 text-text-3 group-hover:text-accent transition-colors"
                          />
                        </a>
                      </li>
                    );
                  })}
                </ul>

                <p className="mt-4 font-mono text-[10px] uppercase tracking-overline text-text-3">
                  Available for freelance · collaboration · internship
                </p>
              </div>
            </div>

            {/* Footer hint */}
            <footer className="px-6 md:px-8 py-3 border-t border-line flex items-center justify-between gap-4">
              <span className="font-mono text-[10px] uppercase tracking-overline text-text-3">
                按 ESC 关闭 · 点击外部关闭
              </span>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-overline text-text-3 hover:text-accent transition-colors"
              >
                <Mail size={12} />
                Quick Mail
              </a>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ContactModal;

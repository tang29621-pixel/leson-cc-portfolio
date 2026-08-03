"use client";
import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Square, RotateCcw } from "lucide-react";
import { useChat } from "@/components/chat/useChat";
import { cn } from "@/lib/utils";

export default function ChatPanel({ onClose }: { onClose: () => void }) {
  const { messages, streaming, error, send, stop, reset } = useChat();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // 自动滚到底
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  // Esc 关闭
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleSubmit = () => {
    const v = inputRef.current?.value.trim();
    if (!v || streaming) return;
    send(v);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-24 right-6 md:right-10 z-50 w-[min(380px,calc(100vw-3rem))] h-[min(560px,calc(100vh-8rem))] bg-bg border border-line shadow-2xl flex flex-col"
    >
      {/* 头部 */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-line">
        <div>
          <h3 className="font-serif text-base text-text">Leson-cc 的 AI 替身</h3>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
            Ask me anything about my work
          </p>
        </div>
        <div className="flex items-center gap-1">
          {messages.length > 0 && (
            <button
              onClick={reset}
              disabled={streaming}
              className="p-2 text-muted hover:text-text disabled:opacity-30"
              aria-label="Reset"
            >
              <RotateCcw size={14} />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-2 text-muted hover:text-text"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>
      </header>

      {/* 消息列表 */}
      <div ref={listRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scroll-hide">
        {messages.length === 0 && (
          <div className="h-full grid place-items-center text-center px-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-muted mb-2">
                你好，我是 Leson-cc 的 AI
              </p>
              <p className="text-sm text-muted max-w-xs">
                可以问我关于作品、工具链、合作方式、学习路径的任何问题。
              </p>
            </div>
          </div>
        )}

        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "max-w-[85%] text-sm leading-relaxed",
                m.role === "user"
                  ? "ml-auto bg-text text-bg px-3 py-2"
                  : "bg-line/30 text-text px-3 py-2",
              )}
            >
              {m.content || (m.role === "assistant" && streaming ? "▍" : "")}
            </motion.div>
          ))}
        </AnimatePresence>

        {error && (
          <div className="text-xs text-red-600 bg-red-50 px-3 py-2 rounded">
            {error}
          </div>
        )}
      </div>

      {/* 输入区 */}
      <div className="border-t border-line p-3">
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            rows={1}
            placeholder="说点什么…"
            disabled={streaming}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            className="flex-1 resize-none bg-transparent text-sm text-text placeholder:text-muted outline-none max-h-24 disabled:opacity-50"
          />
          {streaming ? (
            <button
              onClick={stop}
              className="grid place-items-center w-9 h-9 bg-text text-bg"
              aria-label="Stop"
            >
              <Square size={12} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="grid place-items-center w-9 h-9 bg-accent text-bg hover:bg-text transition-colors"
              aria-label="Send"
            >
              <Send size={14} />
            </button>
          )}
        </div>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-muted">
          Enter 发送 · Shift+Enter 换行 · Esc 关闭
        </p>
      </div>
    </motion.div>
  );
}

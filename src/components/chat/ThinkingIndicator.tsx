"use client";
import { cn } from "@/lib/utils";

// AI 思考中动画（assistant 气泡 + content 为空 + streaming 时显示）
// 设计：THINKING mono 小标签 + 3 个错开节奏的呼吸点（accent 色）
// 风格对齐：编辑式极简 + mono uppercase + tracking-widest
export default function ThinkingIndicator({ className }: { className?: string }) {
  return (
    <div
      className={cn("inline-flex items-center gap-2.5", className)}
      role="status"
      aria-live="polite"
      aria-label="AI is thinking"
    >
      <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
        Thinking
      </span>
      <span className="inline-flex gap-1" aria-hidden="true">
        <span
          className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"
          style={{ animationDelay: "0ms", animationDuration: "1.2s" }}
        />
        <span
          className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"
          style={{ animationDelay: "200ms", animationDuration: "1.2s" }}
        />
        <span
          className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"
          style={{ animationDelay: "400ms", animationDuration: "1.2s" }}
        />
      </span>
    </div>
  );
}

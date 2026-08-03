"use client";
// 背景微粒（reactbits 风格 · 星点 twinkle）
//
// 设计：
//   - 22 个粉色微粒，位置/大小/延迟/周期随机
//   - twinkle：opacity + scale 慢呼吸（5-12s 周期）
//   - 整层 pointer-events:none + z-index:1 沉到内容下
//   - 极低 opacity（0.15-0.4），不抢戏
//   - mix-blend-mode: screen 让深背景发光
//
// 性能：
//   - 22 个 div + CSS keyframes，浏览器 GPU 合成
//   - mount 时一次性生成位置（用 seed 让 SSR/CSR 一致）
//   - 0 监听器，0 重渲染

import { useMemo } from "react";

// 简单 LCG 伪随机（避免 SSR/CSR 不一致警告）
function seededRandom(seed: number) {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

type Particle = {
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
  maxOpacity: number;
};

export default function FloatingParticles({ count = 22 }: { count?: number }) {
  const particles = useMemo<Particle[]>(() => {
    const rand = seededRandom(42); // 固定 seed → SSR/CSR 一致
    return Array.from({ length: count }, () => ({
      left: rand() * 100,
      top: rand() * 100,
      size: 1 + rand() * 2, // 1-3 px
      delay: rand() * 8,
      duration: 5 + rand() * 7, // 5-12s
      maxOpacity: 0.15 + rand() * 0.25, // 0.15-0.4
    }));
  }, [count]);

  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none z-[1] overflow-hidden"
    >
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-accent mix-blend-screen"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animation: `twinkle ${p.duration}s ${p.delay}s infinite ease-in-out`,
            // 0 时完全透明，maxOpacity 透过 keyframes 设
            ["--max-opacity" as string]: p.maxOpacity,
          }}
        />
      ))}
    </div>
  );
}

"use client";
// 文本乱码效果（reactbits TextScramble 风格）
//
// 行为：
//   - 默认显示原文
//   - onMouseEnter：字符随机乱码 → 逐步还原为原文
//   - 还原过程保留空格不乱码
//   - onMouseLeave 不重置（保留当前显示）
//
// 性能：
//   - 每个 hover 触发 1 个 30ms setInterval，约 (text.length × 30ms) 后结束
//   - 字符集 ~40 个，随机抽样
//   - 卸载时清理 interval

import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#01░▒▓";

type Props = {
  text: string;
  className?: string;
  as?: ElementType;
  children?: ReactNode;
};

export default function TextScramble({ text, className, as }: Props) {
  const Tag = (as ?? "span") as ElementType;
  const [display, setDisplay] = useState(text);
  const intervalRef = useRef<number | null>(null);
  const frameRef = useRef(0);

  const scramble = () => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
    }
    frameRef.current = 0;

    intervalRef.current = window.setInterval(() => {
      const revealed = Math.floor(frameRef.current);
      const next = text
        .split("")
        .map((char, i) => {
          if (i < revealed) return text[i];
          if (char === " " || char === " ") return " ";
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");
      setDisplay(next);
      frameRef.current += 1 / 2; // 还原速度：每 60ms 解锁 1 个字符
      if (revealed >= text.length) {
        setDisplay(text);
        if (intervalRef.current !== null) {
          window.clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }
    }, 30);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <Tag
      className={className}
      onMouseEnter={scramble}
      onFocus={scramble}
      tabIndex={0}
    >
      {display}
    </Tag>
  );
}

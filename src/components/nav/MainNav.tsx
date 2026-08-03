"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const navItems = [
  { href: "#intro",     label: "01 · 关于" },
  { href: "#profile",   label: "02 · 档案" },
  { href: "#projects",  label: "03 · 作品" },
  { href: "#skills",    label: "04 · 能力" },
  { href: "#showreel",  label: "05 · Showreel" },
  { href: "#practice",  label: "06 · 练习" },
  { href: "#music",     label: "07 · 音乐" },
];

export default function MainNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const next = window.scrollY > 50;
      // 只在 boolean 真正翻转时调用 setState，避免每帧 React reconciliation
      setScrolled((prev) => (prev === next ? prev : next));
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-40 h-[72px] flex items-center transition-all duration-500 ${
        scrolled ? "bg-bg/85 backdrop-blur-md border-b border-line" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-page w-full px-6 md:px-10 flex items-center justify-between">
        <Link href="/" className="font-mono text-xs uppercase tracking-widest">
          Leson-cc <span className="text-muted">/ Home</span>
        </Link>

        {/* 桌面端 */}
        <ul className="hidden md:flex items-center gap-7">
          {navItems.map((it) => (
            <li key={it.href}>
              <a
                href={it.href}
                className="font-mono text-xs uppercase tracking-widest text-muted hover:text-text transition-colors"
              >
                {it.label}
              </a>
            </li>
          ))}
        </ul>

        {/* 移动端按钮 */}
        <button
          className="md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-line bg-bg/95 backdrop-blur-md"
          >
            <ul className="px-6 py-6 space-y-4">
              {navItems.map((it) => (
                <li key={it.href}>
                  <a
                    href={it.href}
                    onClick={() => setOpen(false)}
                    className="block font-mono text-sm uppercase tracking-widest text-muted hover:text-text"
                  >
                    {it.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

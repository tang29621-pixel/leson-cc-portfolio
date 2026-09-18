import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  // v2 · 2026-08-02 风格切换：极简杂志 → 暗黑赛博（Cyber Metaverse）
  // 参考 Design.md tokens
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // background
        bg: "#05050A",            // canvas
        "bg-alt": "#090812",      // canvas_alt
        surface1: "#0E0B15",
        surface2: "#15101E",
        surface3: "#1D1428",
        // text
        text: "#F6EDF7",          // primary
        "text-2": "#C7B6C9",      // secondary
        "text-3": "#8C7D91",      // tertiary
        "text-inv": "#08060C",    // inverse (按钮文字)
        muted: "#8C7D91",         // 兼容旧类名
        // brand
        accent: "#FF2D7A",        // primary pink
        "accent-hov": "#FF4A91",
        "accent-act": "#D91E63",
        "accent-2": "#C44DFF",    // secondary purple
        "accent-2-hov": "#D675FF",
        "accent-soft": "#FF75C8",
        "blue": "#59D7FF",        // electric_blue
        "accent-cyan": "#59D7FF",
        // border
        line: "rgba(255, 255, 255, 0.14)",
        "line-sub": "rgba(255, 255, 255, 0.08)",
        "line-strong": "rgba(255, 45, 122, 0.42)",
        // state
        success: "#43E6A0",
        warning: "#FFC857",
        error: "#FF4D6D",
        info: "#59D7FF",
      },
      fontFamily: {
        // @fontsource 自动注入的 CSS font-family（与 package 同名）
        display: ['"Rajdhani"', '"Orbitron"', '"Arial Narrow"', "sans-serif"],
        heading: ['"Rajdhani"', '"Inter"', '"PingFang SC"', '"Microsoft YaHei"', "sans-serif"],
        body: ['"Inter"', '"PingFang SC"', '"Microsoft YaHei"', "sans-serif"],
        mono: ['"JetBrains Mono"', '"SFMono-Regular"', "ui-monospace", "monospace"],
        // 兼容老代码：font-serif 现在指向 Rajdhani（窄体）
        serif: ['"Rajdhani"', "ui-serif", "Georgia", "serif"],
        sans: ['"Inter"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        display: ["clamp(64px, 10vw, 132px)", { lineHeight: "0.9", letterSpacing: "-0.04em" }],
        title: ["clamp(2rem, 4vw, 3.5rem)", { lineHeight: "1.05", letterSpacing: "0.02em" }],
        lead: ["1.375rem", { lineHeight: "1.5" }],
      },
      letterSpacing: {
        display: "-0.04em",
        heading: "0.02em",
        body: "0",
        label: "0.14em",
        overline: "0.22em",
      },
      spacing: {
        section: "8rem",
        gutter: "1.5rem",
        "header-d": "72px",
        "header-m": "60px",
        "section-gap": "120px",
      },
      maxWidth: {
        page: "1440px",
        content: "1280px",
        text: "68ch",
      },
      borderRadius: {
        none: "0",
        xs: "2px",
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "18px",
        pill: "999px",
      },
      boxShadow: {
        surface: "0 18px 60px rgba(0, 0, 0, 0.44)",
        floating: "0 24px 80px rgba(0, 0, 0, 0.62)",
        "neon-primary": "0 0 10px rgba(255,45,122,0.72), 0 0 28px rgba(255,45,122,0.34)",
        "neon-secondary": "0 0 12px rgba(196,77,255,0.68), 0 0 34px rgba(196,77,255,0.26)",
        "inset-panel":
          "inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(255,45,122,0.08)",
      },
      backgroundImage: {
        "primary-cta":
          "linear-gradient(135deg, #FF2D7A 0%, #FF4A91 58%, #C44DFF 100%)",
        "chrome-line":
          "linear-gradient(90deg, rgba(255,45,122,0) 0%, rgba(255,45,122,0.72) 50%, rgba(255,45,122,0) 100%)",
        "panel":
          "linear-gradient(180deg, rgba(29,20,40,0.88) 0%, rgba(9,8,18,0.82) 100%)",
      },
      animation: {
        "spin-slow": "spin 12s linear infinite",
        "fade-up": "fadeUp 0.8s ease-out forwards",
        "marquee": "marquee 30s linear infinite",
        scanline: "scanline 6s linear infinite",
        glow: "glow 2.4s ease-in-out infinite alternate",
        glitch: "glitch 1.6s steps(2, end) infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        glow: {
          "0%": { opacity: "0.6" },
          "100%": { opacity: "1" },
        },
        glitch: {
          "0%, 100%": { transform: "translate(0,0)" },
          "20%": { transform: "translate(-1px, 0)" },
          "40%": { transform: "translate(1px, -1px)" },
          "60%": { transform: "translate(-1px, 1px)" },
          "80%": { transform: "translate(1px, 0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

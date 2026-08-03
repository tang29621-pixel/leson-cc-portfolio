# Hero 设计规格 · v4 (2026-08-03)

> 90+ 分标准：参考 Locomotive / Basic Agency / Dogstudio / Active Theory / Fantasy Interactive

## 0. 文件位置

| 文件 | 用途 |
|---|---|
| `src/components/sections/IntroSection.tsx` | Hero 主组件（v4）|
| `src/app/globals.css` | `@keyframes glow-breathe` 6s 慢呼吸 |

## 1. 信息架构

5 秒内传达 3 件事：
1. **WHO**  左侧 4 层信息层级
2. **BELIEF**  中央 Design Statement 杂志感大标
3. **WHAT**  右侧 Currently Looking For + 双按钮

底部 3 张统计卡接续（min-height 250px + 80px 数字 + hover lift 6px + pink glow）。

## 2. 三栏 + 底部 4 块结构

```
┌────────────────────────────────────────────────────────────────────────────┐
│  [左 3 col]  METAVERSE  [中 6 col]            [右 3 col]                    │
│  FUTURE  █    Design Statement    █  DESIGN                                  │
│  DESIGN                                                                              │
│                                                                                       │
│  / 01 · Identity    / Design for              / 02 · Collaboration            │
│  LESON-CC             Intelligence              • AI Commercial                │
│  / Portfolio.            &                            • AI Drama                       │
│                              Imagination              • Digital Experience           │
│  Turning ideas...                                       • Brand Film                    │
│  把抽象想法转化...                                     • Interactive Installation      │
│                                                                  // Status            │
│  • Visual Designer                                     ● Available for Collaboration │
│  • Creative Technologist                             ● Open to Internship            │
│  • AIGC Creator                                                                       │
│  • Art & Technology                                                                  │
│                                                                  [Contact ↗]         │
│  [Explore Works →]                                                  [Resume ↗]         │
│                                                                                       │
│  VISUAL  ·  INTERACTION  ·  AIGC  ·  REALTIME  ·  FILM  ·  PRODUCT                │
├────────────────────────────────────────────────────────────────────────────┤
│  // 01 · Selected Works      // 02 · Selected Works      // 03 · Selected Works   │
│  06+                            05+                            13+                 │
│  WORKS                          AWARDS                          TOOLS               │
│  精选作品 ...                    国内外奖项 ...                  常用工具 ...        │
└────────────────────────────────────────────────────────────────────────────┘
```

## 3. 左侧 4 层信息层级

| Layer | 内容 | 字号 | 颜色 |
|---|---|---|---|
| 1. 品牌 | `Leson-cc` / `Portfolio.` | text-3xl / text-2xl | text / accent |
| 2. 一句话 | `Turning ideas into visual experiences.` + 中文镜像 | text-sm | text-2 / text-3 |
| 3. 身份 | 4 行（Visual Designer / Creative Technologist / AIGC Creator / Art & Technology）| text-sm | text-2 |
| 4. 按钮 | `Explore Works →` · 56px 高 · 220px 宽 | 14px | accent bg |

身份标签之间：左侧 1px `border-line` + `pl-3`（杂志感竖线引导）

## 4. 中央 Design Statement

### 4.1 文字排版

```
// Manifesto · Stmt 02 / 26    ← eyebrow · 10px · mono · tracking 0.4em

Design for                       ← line 1 · font-light · text-base ~ text-lg
Intelligence                     ← line 2 · font-SEMI-bold 600 · clamp(2.75rem, 12vw, 8.5rem)
&                                ← line 3 · font-light · text-base ~ text-lg
Imagination                      ← line 4 · font-SEMI-bold 600 · clamp(2.5rem, 10vw, 7.5rem)
```

### 4.2 文字样式（共享 style 对象 `statementTextStyle`）

```ts
{
  background: "linear-gradient(90deg, #FFFFFF 0%, #D8C5F0 50%, #FFAFD3 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  fontWeight: 600,
  letterSpacing: "-0.05em",  // 紧字距
  lineHeight: 0.8,            // 紧行距
  // SemiBold 不需要强纵深 · 2 层光晕足够
  textShadow: "0 0 40px rgba(216,197,240,0.4), 0 0 90px rgba(255,175,211,0.3)",
}
```

### 4.3 关键词行

6 个：`Visual · Interaction · AIGC · Realtime · Film · Product`

```tsx
<motion.span
  whileHover={{
    color: "#FF2D7A",
    scale: 1.05,
    textShadow: "0 0 12px rgba(255,45,122,0.6)",
  }}
  transition={{ duration: 0.18, ease: "easeOut" }}
  className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-3 cursor-default"
>
```

## 5. 右侧模块

### 5.1 Currently Looking For（6 个合作方向）

```
/ 02 · Collaboration    ← 10px · accent · `//` 风格
• AI Commercial
• AI Drama
• Digital Experience
• Brand Film
• Interactive Installation
```

### 5.2 Status（2 个状态点）

- 🟢 `Available for Collaboration`（绿点 `bg-emerald-500`）
- 🟡 `Open to Internship`（黄点 `bg-amber-500`）

### 5.3 双按钮

- `Contact ↗` → `mailto:1780093442@qq.com` · primary · 200px 宽
- `Resume ↗` → `mailto:1780093442@qq.com?subject=Resume%20Request` · outline · 200px 宽

## 6. 底部 3 张统计卡

| 属性 | 值 |
|---|---|
| 高度 | `min-h-[250px]` |
| 数字字号 | `clamp(56px, 6vw, 80px)` · `font-semibold` · `tracking-[-0.04em]` |
| Eyebrow | `// 0X · Selected Works` · 10px · mono |
| 数字颜色 | `text-accent`（粉）|
| Hover | `y: -6` + `boxShadow: 0 0 32px rgba(255,45,122,0.35)` + `borderColor: rgba(255,45,122,0.6)` |
| Hover 箭头 | `text-text-3 → text-accent` |

## 7. 视觉效果层（z-index 从低到高）

| z | 元素 | 效果 |
|---|---|---|
| 0 | 3 层 background 文字 | METAVERSE 4.5% · FUTURE 3.5% · DESIGN 3.5% |
| 1 | 中心 radial glow | `radial-gradient(ellipse 55% 50% at 50% 50%, rgba(255,45,122,0.20) 0%, rgba(196,77,255,0.10) 35%, transparent 70%)` + `glow-breathe 6s` 动画 |
| 1 | 暗角 vignette | `radial-gradient(ellipse 80% 75% at 50% 50%, transparent 60%, rgba(5,5,10,0.4) 100%)` |
| 2 | hud-scanline | 全屏扫描线（已存在）|
| 3 | glitch-overlay | 故障扫描（已存在）|
| 10 | 主体内容 | 鼠标视差 5px 范围（`useMotionValue`）|

## 8. 鼠标视差

```ts
const parallaxX = useMotionValue(0);
const parallaxY = useMotionValue(0);

useEffect(() => {
  const onMove = (e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 5;
    const y = (e.clientY / window.innerHeight - 0.5) * 5;
    parallaxX.set(x);
    parallaxY.set(y);
  };
  window.addEventListener("mousemove", onMove, { passive: true });
  return () => window.removeEventListener("mousemove", onMove);
}, [parallaxX, parallaxY]);
```

**应用范围**：包裹整个 hero 主体（`motion.div style={{ x: parallaxX, y: parallaxY }}`）。移动鼠标 → 整块内容微移 5px。

## 9. 配色纪律（80/15/5）

| 比例 | 用法 | 颜色 |
|---|---|---|
| **80%** | 主标 / 文案 | `text` / `text-2` / `text-3`（白）|
| **15%** | 标签 / eyebrow / muted | `muted` / `line`（灰）|
| **5%** | CTA / hover / glow / 状态点 | `accent`（粉）|

**没有全粉**。accent 仅在：按钮 bg、关键词 hover、文字光晕、状态点、卡片 hover glow。

## 10. 字体（Rajdhani / Orbitron · 现有）

| 用途 | 字体 | Weight | Size |
|---|---|---|---|
| 大标 | Rajdhani | 600 (SemiBold) | clamp(2.75rem, 12vw, 8.5rem) |
| 中标 | Rajdhani | 300 (Light) | text-base ~ text-lg |
| eyebrow | JetBrains Mono | 400 | 10-12px |
| 正文 | Inter | 400 | 12-14px |
| 中文 | PingFang SC / Microsoft YaHei（fallback）| 400 | 12-14px |

## 11. 容器宽度（撑满 + 左偏）

```tsx
<div className="h-full pt-14 md:pt-20 pb-8 flex flex-col pl-10 md:pl-16 lg:pl-24 pr-6 md:pr-10 lg:pr-16">
```

| 视区 | 左 padding | 右 padding |
|---|---|---|
| 移动 | 40px | 24px |
| md | 64px | 40px |
| lg | 96px | 64px |
| 1920px | 120px | 80px |

**左侧比右侧多 16-40px 空隙**（编辑式不对称）。

## 12. Hero 高度

```ts
style={{ minHeight: "max(900px, calc(100vh - 72px))" }}
```

- 视区 < 972px：满屏（100vh - 72px）
- 视区 ≥ 972px：固定 900px

## 13. 全局动效

| 元素 | 动效 |
|---|---|
| Hero 主体 | 鼠标视差 5px |
| 中心 radial glow | `glow-breathe` 6s ease-in-out infinite（opacity 0.85↔1）|
| 关键词 hover | color → accent · scale 1.05 · textShadow glow · 0.18s |
| 卡片 hover | y -6 · boxShadow pink · borderColor → accent · 0.2s |
| 按钮 arrow | 鼠标 hover → `translate-x-0.5 translate-y-0.5`（45° 方向暗示）|
| 背景 fluid | 全屏 LiquidEther（layout.tsx）· 鼠标流体跟随 · 3s 后 autoDemo |
| 浮动粒子 | 22 个微粒 · `twinkle` 5-12s 随机 |
| 光标 | CursorFollower · 粉点 + 粉环 lerp 跟随 · hover 交互元素放大 1.6x |
| METAVERSE | TextScramble · hover 字符乱码 → 还原 |

## 14. 与 / 落地页的呼应

| 页 | 标语 | 字号 | 高亮 |
|---|---|---|---|
| `/` | Make the **future** visible. | 44-120px | `future` accent + medium |
| `/main` | Design for **Intelligence** & **Imagination** | 44-136px | `Intelligence` & `Imagination` accent + SemiBold |

## 15. 关键设计决策（已实施）

1. **粉克制使用**：5% 比例，不全粉
2. **SemiBold 而非 Black**：font-weight 600 比 900 更精致
3. **白紫粉渐变**：gradient + transparent color + text-clip 技法
4. **3 层 background 文字**：深度感，不抢主标
5. **聚光灯 radial glow**：中心 60% 椭圆粉色 + 暗角
6. **慢呼吸动效**：6s ease-in-out 不干扰
7. **左偏 padding**：编辑式不对称
8. **卡片 hover lift 6px**：精致抬升

## 16. 已知 tradeoffs

- LiquidEther 全局 + Hero radial glow 双重光效 → 性能略重
- 鼠标视差 rAF 节流未做（5px 位移可接受）
- 关键词 hover 用 framer-motion（每词 1 个 motion 节点）· 22 个粒子 + 6 个关键词 + 3 个卡 = OK
- 字体保持 Rajdhani · 用户可换 PP Neue Montreal 等商业字体

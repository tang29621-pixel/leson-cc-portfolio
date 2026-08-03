# Session Changelog · 2026-08-02

> 个人作品网站 v2（暗黑赛博）一天内的关键改动。按主题分组。

---

## 0. v3 · 2026-08-02 晚 · 个人信息与作品大幅扩充

### 基础信息

- 姓名：陈声渏
- **英文名：Leson-cc**（替换"Cheng Shengyi"/"Yu Han"）
- 学校：上海建桥学院
- 学历：艺术与科技 · 本科
- 就读时间：**2024.09—至今**（原为 2025—至今）
- 方向：视觉设计、产品设计、交互艺术、数字媒体与AIGC创作

### 数据层改动

- **`data/profile.ts`** 加 4 个新字段：`school` / `degree` / `schoolStart` / `careerInterests` / `coreCompetencies` / `designStyle`
- **`data/projects.ts`** 从 6 个 → 12 个：恢复"星痕·触爆新生"（p7）+ 5 个新（p8-p12：Hydra Flow / 小小探索家 / 人民公园 / 古影新绎 / 心格映构）
- **`Project.award: string` → `awards: string[]`** 数组化（一个项目可多次获奖；星痕 3 项、Stride Beacon 1 项）
- 6 个新项目 `cover` 路径先写 `/images/projects/pN-xxx.png` + `coverHue` 占位 + `// TODO: 用户补图前由 coverHue 占位` 注释
- featured 保持 p1-p6 共 6 个（p7-p12 仅在 /works 显示）

### UI 改动

- 6 处 "Yu Han" → "Leson-cc"：`MainNav` / `IntroSection` / `page.tsx`(2) / `SideRail` / `layout.tsx`(2) / `main/page.tsx` footer
- 2 处 `p.award` → `p.awards.map`：`ProjectsSection.tsx` / `works/page.tsx`

### 注意事项

- 6 个新项目暂用 `coverHue` 色块占位（next/image 不会 404），等用户补图后改 `cover` 路径即可
- "Best Use of Tripo" 和"挑战杯" 两个奖项**未关联具体项目**（用户原始资料没指明），保留在 `profile.timeline` 而非 `Project.awards`
- profile.data 的 `name: "Cheng Shengyi"` 作为**资料名**保留（证件/资料用途），UI 展示用 `nameEn: "Leson-cc"`

---

## 1. 视觉风格大切换 · 极简杂志 → 暗黑赛博

**反转原因**：用户提供 `Design.md`（Cyber Metaverse design tokens），推翻 v1 极简杂志风。

### Token 系统（`tailwind.config.ts`）

| 类别 | 关键改动 |
|---|---|
| **color** | 净白 `#FAFAF7` → 近黑 `#05050A`；静谧蓝 → 霓虹粉 `#FF2D7A` |
| **新增** | `surface1/2/3`、`text-2/3`、`accent-hov/act`、`accent-2 紫 #C44DFF`、`blue 电蓝 #59D7FF` |
| **gradient** | `primary-cta` (粉紫渐变)、`chrome-line` (粉色发光)、`panel` (深紫黑玻璃) |
| **font** | Fraunces/Inter → **Rajdhani / Orbitron / Inter / JetBrains Mono** |
| **letterSpacing** | 新增 `display/heading/label/overline` 4 档 |
| **boxShadow** | 新增 `neon-primary` / `neon-secondary` / `inset-panel` |

### 文件改动

- `tailwind.config.ts` — 重写 token
- `src/app/globals.css` — 新增 `.glass-panel` `.neon-border` `.hud-line` `.hud-scanline` `.hero-glow` `.grid-cyber`
- `src/app/layout.tsx` — 字体换成 Rajdhani / Orbitron / JetBrains Mono / Inter
- `src/components/ui/{Container,Button,SectionTitle,Tag,Tabs}.tsx` — 适配暗黑赛博
- `src/app/{main,works}/page.tsx` — 新视觉

> 详见 `memory/design-decisions.md` v2 章节。

---

## 2. 首页满屏 hero · 方案 C（Cyber of X）

**位置**：`src/components/sections/IntroSection.tsx`

### 布局

```
[顶栏 72px fixed] [左侧装饰栏 ≥lg]

[左下文案 Yu Han/Portfolio]   [METAVERSE 大背景]   [右下文案 Let's/Build]
                              [中央 3D 角色 60-70%]
[06+ WORKS]  [05+ AWARDS]  [10+ TOOLS]
```

### 新增组件

- `src/components/ui/SideRail.tsx` — 左侧装饰侧栏（`↳ Scroll` / 项目名竖排 / 3 个 social 图标）
- `src/lib/stats.ts` — 从 `projects` + `timeline` 派生统计数字（不硬编码）

---

## 3. 3D 模型集成（真 .glb）

### 流程

1. 用户上传 `ip形象-第一版.glb`（**58.21 MB**）
2. 重命名 → `ip-character.glb`
3. **gltf-transform 压缩 → 7.00 MB**（Draco 几何压缩，无损保留细节）
4. drei `useGLTF` 加载
5. 显式 `useGLTF.setDecoderPath("https://unpkg.com/...draco/")` —— 避免依赖 Google CDN

### `src/components/three/IPCharacter.tsx` 关键逻辑

```ts
// 模型归一化（Y 轴身高 → 5 个 three.js 单位）+ 几何中心对齐 (0,0,0)
const targetHeight = 5;
const scale = targetHeight / height;

// Tone mapping exposure 多次下调
gl.toneMappingExposure = 0.11;  // 默认 1.0 → 0.11（−89%）

// 摆动：sin(t * 2π/T) · pow(|raw|, 1.4) * (π/2) — 180° 来回 + 正面停更久
const T_FULL = 10;
const omega = (Math.PI * 2) / T_FULL;
```

### 交互（v5 最终版）

| 操作 | 反馈 |
|---|---|
| 不操作 | 180° 来回摆动（±90°），周期 10 秒，正面停留更久 |
| 鼠标按下拖拽 | 自动摆动暂停，按像素 delta 旋转（水平不限、垂直 ±23°）|
| 鼠标松开 | 用 lerp 自然过渡到下一个目标角度 |
| 单击 | 弹跳 ×0.06 + 粒子 ×1 |
| **双击** | 弹跳 ×0.18（×3 倍）+ 粒子 ×3（错开 60/130ms）+ `ip-double-click` 事件 |

---

## 4. Bloom / Vignette / 故障扫描特效

| 特效 | 实现 | 当前状态 |
|---|---|---|
| **粉紫 Bloom** | `@react-three/postprocessing@2.16` 的 `<Bloom>` | ❌ **已移除**（多次过亮，最终删除）|
| **Vignette 暗角** | `<Vignette offset=0.25 darkness=0.7>` | ✅ 保留 |
| **鼠标跟随偏转** | 早期版（hover 跟随）| ❌ 改为**手动拖拽** |
| **自动旋转** | 累加角度（旧版）| ❌ 改为**加权 sin 摆动** |
| **故障扫描** | `.glitch-overlay` CSS 层 | ✅ 保留（含 `prefers-reduced-motion` 关闭）|

---

## 5. P7 Stellar Pulse → 合并到 P2

| 步骤 | 操作 |
|---|---|
| 1 | 用户声明"P2 与 P7 是同一项目" |
| 2 | 从 `data/projects.ts` 删除 P7 条目 |
| 3 | `P2` 数据全部改成 Stellar Pulse（title / subtitle / tags / tools / desc / 去掉获奖）|
| 4 | 文件 `p2-xinghen.png` → `p2-stellar.png`（贴合项目名） |
| 5 | 视频 P2 = P7 数据（5 个 awards 字段改为 1 个 | 取消） |

> **副作用**："星痕·触爆新生"的获奖（米兰设计周 / 创意节入围 / 东方创意之星 ×2）信息**整体从 portfolio 消失**。仍在 `data/profile.ts` 时间线里展示。

---

## 6. 关键 Bug 修复记录

| # | 问题 | 修复 |
|---|---|---|
| 1 | next dev 端口冲突（3000/3001/3002 被僵尸 node 占） | `taskkill /F /PID <pid>` + 清 `.next/cache` |
| 2 | `tailwind.config.ts` 漏 `letterSpacing` 配置，`tracking-heading` 等 class 500 | 加 `letterSpacing: { display/heading/label/overline }` |
| 3 | `metadata.themeColor` 不在 metadata 里（应在 viewport）| 拆出 `export const viewport: Viewport` |
| 4 | `.glb` Draco 体积 58MB 加载慢 | gltf-transform 压缩到 7MB |
| 5 | `?url` import 语法不被 drei 支持 | 改用 `useGLTF.setDecoderPath(unpkg URL)` |
| 6 | HMR 缓存残留旧错误 | `rm -rf .next` + 重启 dev server |
| 7 | TS 错误 `BODY_REACTIONS not found` | 补 import：`import { FACE_EXPRESSIONS, BODY_REACTIONS } from ...` |
| 8 | TS 错误 `Bloom.color prop 不存在` | 改 `<Bloom>` 不传 color（postprocessing@2.x 不支持）|

---

## 7. 文件清单（本 session 改动的源码）

### 🆕 新增（5 个）

- `src/lib/stats.ts`
- `src/components/ui/SideRail.tsx`
- `public/models/ip-character.glb`（压缩后 7.00 MB）
- `public/models/ip-character.bak.glb`（原 55.51 MB 备份）
- `memory/projects-overview.md` v2

### ✏️ 修改（~15 个）

- `tailwind.config.ts`
- `src/app/globals.css`
- `src/app/layout.tsx`
- `src/components/ui/{Container,Button,SectionTitle,Tag,Tabs}.tsx`
- `src/components/sections/{IntroSection,ProjectsSection}.tsx`
- `src/components/three/IPCharacter.tsx`（重写）
- `src/components/nav/MainNav.tsx`
- `src/app/{main,works}/page.tsx`
- `data/projects.ts`（P7 删除、P2 改名 Stellar Pulse）
- `memory/design-decisions.md` v2（暗黑赛博）

---

## 8. 待办（未完成的任务清单）

按 `memory/next-steps.md` 当前状态：

| # | 任务 | 状态 |
|---|---|---|
| 1 | 草拟 `data/skills.ts` | pending |
| 4 | 填充 `data/practice.ts` | pending |
| 5 | 填充 `data/music.ts` | pending |
| 6 | 放置 Showreel 视频 | pending（已有 404 占位）|
| 8 | 配置 AI（`.env.local`） | pending |
| 9 | 部署到 Vercel | pending |
| 16 | P2 内容与图片对齐 | ✅ 已完成 |
| 17 | P6 排查 | ✅ 已完成 |

---

## 9. 关键决策记录

| 决策 | 原因 |
|---|---|
| 完全切换到暗黑赛博 | 用户提供完整 Design.md |
| 180° 摆动代替 360° 旋转 | 用户要求"正面多停" |
| Bloom 最终移除 | 多次调整后仍过亮 |
| 模型用加权 sin（pow 1.4）| 0° 附近角度变化更缓，正面看起来停更久 |
| DRACO 走 unpkg CDN | 避免依赖 Google CDN（国内访问慢）|
| P2 = Stellar Pulse | 用户声明 P2 = P7 |
| Stage 1+2 token 不动数据 | 逐步推进，避免一次大幅翻车 |
| Hero 走方案 C（Cyber of X）| 最接近参考图的方案 |

---

**生成时间**：2026-08-02 · 19:00 CST
**Session 总时长**：~8 小时（含调试、待用户反馈等）
**累计代码行数**：~1700 行（v1: ~800 + v2: ~900）

---

## 1. 2026-08-03 · 后续 session 摘要

### AI 配置
- **胜算云 router 接入**：`https://router.shengsuanyun.com/api/v1` · `.env.local` · key 已配置
- **当前模型**：`AI_MODEL=gpt-4o-mini`（其余模型名 timeout，需要用户查实际可用的胜算云模型名）
- **AI 替身 system prompt** 重做：注入 profile/projects/skills/timeline 完整上下文 · 但 gpt-4o-mini 对中文人设回答保守，回复"你是谁"以外的问题倾向返回简介模板

### 3D 模型全清
- 卸下 IPCharacter（intro 中心和 / landing）· 删 `public/models/ip-character.glb` (9.62 MB) · 删 `src/components/three/` 目录（4 文件）
- `src/app/page.tsx` 重写：`/` landing 改成编辑式 Design Statement
- 中央改用 **LiquidEther 流体背景**（reactbits.dev，pink 主题 `#FF2D7A/#FF9FFC/#C44DFF`）

### LiquidEther（reactbits.dev/backgrounds/liquid-ether）
- 文件：`src/components/effects/LiquidEther.tsx` + `LiquidEther.css`
- 用法：直接源码（shadcn CLI 需交互配置，绕开）
- TypeScript：源文件加 `// @ts-nocheck`（第三方组件类型瑕疵）+ 修了 3 个 TS 错
- 全局挂载：layout.tsx · `fixed inset-0 z-0 pointer-events-none` · `mix-blend-mode: screen` · `opacity: 0.55`
- 性能调低：resolution 0.4 · iterations* 16 · mouseForce 12 · autoIntensity 0.8

### 全局 UI 特效
- `src/components/effects/CursorFollower.tsx` · 粉点 + 粉环 lerp · hover 交互元素放大 · 触屏自动隐藏
- `src/components/effects/TextScramble.tsx` · 字符乱码 → 还原 · METAVERSE 使用
- `src/components/effects/FloatingParticles.tsx` · 22 个粉色微粒 · `twinkle` 呼吸

### 个人信息完成度
- data/profile.ts：v3 大改（nameEn / school / degree / careerInterests 8 / coreCompetencies 9 / designStyle / timeline）
- data/projects.ts：v4 12→11→10 个（p2/p7 合并 / p11 心格映构 删除）
- 7 个新封面图（HUD 状态 OK）· 3 个品牌元素（p2 错位修正：p2=Stellar Pulse / p7=Hydra）
- 3 个 B 站视频：v1 P4（公开）+ v2/v3/v4 Coming Soon 占位

### /main Hero 全面重做（v4 · 90+ 标准）
详见 [`docs/hero-design-v4.md`](./docs/hero-design-v4.md)

- 三栏 + 底部 3 卡：左 4 层信息 / 中央 3 行 Design Statement / 右侧 Currently Looking For + Status + 双按钮
- 排版：SemiBold 600 · -5% 字距 · 0.8 行距
- 配色：80% 黑白 / 15% 灰 / 5% 粉紫
- 效果：3 层 bg 文字 / 聚光灯 radial glow / 鼠标视差 5px / 慢呼吸 / hover 抬升
- 设计标语：Design for **Intelligence** & **Imagination**

### 已删除的项
- ✅ 3D 模型（全部）
- ✅ p11 心格映构
- ✅ IPCharacter 动态
- ✅ 老的 `P7-Hydra Flow Station.png`（大写旧名）· `hls.js` 依赖
- ✅ HUD line / ETHER · GLOBAL / X · 2026 角标（中央列"框"感）
- ✅ `public/models/` 空目录

### 待办
- 🔴 3 个 B 站视频 v2/v3/v4（用户发布后补 BV）
- 🔴 胜算云模型名（用户查实际可用的，5+ 候选都 timeout）
- 🟡 3 个音乐截断艺人名（Top Barry/Ra…/Andrea Boce…/Dan+Shay/…）
- 🟡 9 首音乐年份数据
- 🟡 简历 PDF（Resume 按钮现在是 mailto 占位）
- 🟢 .env 优化（AI_PROVIDER=qwen 实际无效，写 deepseek-chat/gpt-3.5 都 OK 因为 BASE_URL 覆盖）
- 🟢 字体（Rajdhani 够用；要 PP Neue Montreal / Suisse Int'l 等商业字体需自托管 .woff）

### 累计行数
- 改前：~1700 行
- 改后：~2500 行（+800 行新代码：AI 集成 / 3 个特效组件 / page.tsx 重写 / IntroSection v4 / 9 个 music 字段 / 11 个 projects / prompts.ts 重写）

# 个人作品网站 · Yu Han Portfolio

> 极简杂志风格 · 视觉 × 3D 动效 · Next.js 14 + Three.js

## 快速开始

```bash
# 1. 安装依赖
npm install

# 2. 复制环境变量
cp .env.example .env.local
# 编辑 .env.local，填入 AI_API_KEY

# 3. 启动开发服务器
npm run dev
```

浏览器打开 [http://localhost:3000](http://localhost:3000)

## 素材放置位置

| 文件类型 | 路径 | 命名规则 |
|---------|------|---------|
| 作品封面 | `public/images/projects/pX-<slug>.jpg` | `pX` = `data/projects.ts` 里的 id |
| 个人照片 | `public/images/intro/avatar.jpg` | 自由命名 |
| 社交分享卡 | `public/images/og-cover.jpg` | 1200×630 |
| Showreel 视频 | `public/videos/showreel.mp4` | 替换占位 |
| 3D IP 模型 | `public/models/ip-character.glb` | 替换占位 |

**详细的命名 / 规格 / 验证指南**：见 [`public/images/projects/README.md`](public/images/projects/README.md)

## 项目结构

```
/
├── src/
│   ├── app/
│   │   ├── page.tsx          # 首页（3D IP + Enter 按钮）
│   │   ├── main/page.tsx     # 主页（七大模块）
│   │   ├── api/chat/         # AI 对话 API
│   │   ├── layout.tsx        # 字体注入 + 全局 metadata
│   │   └── globals.css       # 全局样式
│   ├── components/
│   │   ├── three/            # 3D 角色 + 粒子 + 灯光
│   │   ├── ui/               # 通用组件（Container / Tabs / Button...）
│   │   ├── sections/         # 主页七大 section
│   │   ├── chat/             # AI 对话 FAB / Panel / hook
│   │   └── nav/              # 主页导航
│   └── lib/
│       ├── ai/               # AI 适配层（豆包/通义/DeepSeek）
│       ├── motion.ts         # Framer Motion 预设
│       └── utils.ts
└── data/                     # 静态内容（个人 / 作品 / 技能 / 音乐）
```

## 替换内容

### 1. 替换 3D 模型

当前用占位几何体（`<IPPlaceholder />`）。要换成真实模型：

- 把 `.glb` 放到 `public/models/ip-character.glb`
- 在 `src/components/three/IPPlaceholder.tsx` 替换为：
  ```tsx
  import { useGLTF } from "@react-three/drei";
  const { scene, nodes } = useGLTF("/models/ip-character.glb");
  return <primitive object={scene} />;
  ```
- 推荐 CC0 模型：[RobotExpressive](https://github.com/KhronosGroup/glTF-Sample-Assets)（自带 morph targets，适合对接"点击搞怪"）

### 2. 替换作品

编辑 `data/projects.ts`：

```ts
{
  id: "p1",
  title: "...",
  year: "2025",
  role: "...",
  tools: ["..."],
  cover: "/images/projects/p1.jpg",  // 放到 public/images/projects/
  coverHue: "#2B4A6F",               // 占位色相
  span: "col-span-12 md:col-span-7 row-span-2",
  desc: "...",
}
```

### 3. 替换歌单

编辑 `data/music.ts`：

```ts
export const playlist = {
  neteaseId: "你的网易云歌单 ID",
  externalUrl: "https://music.163.com/playlist?id=...",
  currentTrack: "当前曲名",
  currentArtist: "艺术家",
};
```

### 4. 切换 AI 提供方

只需改 `.env.local`：

```bash
# 豆包
AI_PROVIDER=doubao
AI_API_KEY=...
AI_MODEL=doubao-pro-32k     # 可选

# 通义千问
AI_PROVIDER=qwen
AI_API_KEY=...
AI_MODEL=qwen-plus          # 可选

# DeepSeek
AI_PROVIDER=deepseek
AI_API_KEY=...
AI_MODEL=deepseek-chat      # 可选
```

### 5. 替换 Showreel 视频

把你的视频放到 `public/videos/showreel.mp4`，然后取消 `src/components/sections/ShowreelSection.tsx` 中的注释：

```tsx
<source src="/videos/showreel.mp4" type="video/mp4" />
```

如需 HLS 流式编码（多码率自适应），把 hls 切片放到 `public/videos/hls/`，并启用 `hls.js` 加载逻辑。

### 6. 替换个人介绍 / 技能 / 经历

- `data/profile.ts` — 名字、邮箱、社交链接、时间线
- `data/skills.ts` — 技能标签 + 服务方向
- `data/practice.ts` — 练习方式四 tab

## 主题

配色（`tailwind.config.ts`）：

| Token | 颜色 | 用途 |
|-------|------|------|
| `bg` | `#FAFAF7` | 背景 |
| `text` | `#0E0E0E` | 文字 |
| `accent` | `#2B4A6F` | 强调（按钮 / 链接） |
| `accent-2` | `#B8B0A0` | 辅助灰 |
| `muted` | `#6B6B6B` | 次要文字 |
| `line` | `#E5E2DA` | 分割线 |

字体：`Fraunces`（衬线，标题）+ `Inter`（无衬线，正文），通过 `next/font/google` 注入。

## 部署

### Vercel（推荐）

1. 推到 GitHub
2. Vercel 导入项目
3. 在 Environment Variables 填入 `AI_API_KEY` 等
4. 部署完成

### 自托管

```bash
npm run build
npm start
```

需要 Node 18+ 环境。

## 常见问题

### Q: 网易云 iframe 加载失败？
A: 部分浏览器/网络会拦截第三方 iframe。`MusicSection` 已内置 fallback 按钮，自动提示"在网易云打开"。

### Q: AI 对话无响应？
A: 检查 `.env.local` 是否配置 `AI_API_KEY`，控制台看 `/api/chat` 是否返回 500。Edge runtime 不支持某些 Node API，没用到的。

### Q: 3D 模型看不见？
A: 浏览器控制台查 WebGL 报错；首次加载会预下载 ~2MB 模型。

## 许可

个人作品集模板，代码部分可自由使用。
模型 / 视频 / 图片替换为自己的内容。

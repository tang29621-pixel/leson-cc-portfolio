# 作品素材放置指南

> 这个目录用来存放所有作品的图片 / 视频 / 模型文件。
> 命名严格按下面规则，否则代码找不到。

---

## 📁 目录结构

```
public/
├── images/
│   ├── projects/      ← 你在这里（作品封面 / 详情图 / 视频缩略图）
│   ├── intro/         ← 个人介绍模块用的图（头像 / 生活照 / 工作照）
│   ├── posts/         ← 博客 / 写作配图（未来扩展用）
│   └── og-cover.jpg   ← 社交分享卡片（Open Graph，1200×630）
│
├── videos/
│   └── showreel.mp4   ← 主页 Showreel 视频（替换占位）
│
└── models/
    └── ip-character.glb  ← 3D IP 形象（替换占位）
```

---

## 🏷️ 命名约定（**严格按这个**）

文件名 = `data/projects.ts` 里的 `id` + `cover` 字段。

| ID | 文件名 | 用途 |
|----|--------|------|
| p1 | `p1-cherry.jpg` | Cherry Studio UI 宣传片 |
| p2 | `p2-xinghen.jpg` | 星痕 · 触爆新生 |
| p3 | `p3-stride.jpg` | 智能运动地砖系统 |
| p4 | `p4-rebuild.jpg` | REBUILD THE CITY |
| p5 | `p5-tengchuang.jpg` | 腾创智控品牌视觉 |
| p6 | `p6-plastic.jpg` | 塑侵 · 共生 |
| p7 | `p7-stellar.jpg` | Stellar Pulse |

**注意**：后缀可以是 `.jpg` / `.png` / `.webp` / `.avif` 任一。
如果你的封面是 `p1-cherry.png`，告诉我我帮你改 `data/projects.ts`。

---

## 📐 规格建议

### 作品封面（`/images/projects/pX-*.jpg`）

| 项目 | 类型 | 推荐尺寸 | 比例 |
|------|------|----------|------|
| 主页卡片（6 个） | 封面 | 1600×1200px | 4:3 |
| /works 列表（7 个） | 封面 | 1600×900px | 16:9 |
| 通用兜底 | 封面 | 2400×1500px | 8:5 |

**格式优先级**：WebP > AVIF > JPEG（越小越好）
**单张大小**：建议 ≤ 500KB（首页加载性能）

### 个人介绍（`/images/intro/`）

| 文件名 | 用途 | 推荐尺寸 |
|--------|------|----------|
| `avatar.jpg` | 头像（可选用） | 600×600（方形） |
| `portrait.jpg` | 个人照片 / 工作照 | 1200×1500（竖向） |

### Showreel 视频（`/videos/showreel.mp4`）

| 项 | 建议 |
|----|------|
| 编码 | H.264 |
| 分辨率 | 1920×1080 |
| 帧率 | 24 / 30 fps |
| 大小 | ≤ 30MB（如果超过，做 HLS 切片） |
| 时长 | 30s - 90s |

### OG 分享卡（`/images/og-cover.jpg`）

- 尺寸：**1200×630**（Twitter / LinkedIn / 微信通用）
- 内容：你的名字 + 角色 + 一个代表作的缩略图
- 大小：≤ 200KB

### 3D 模型（`/models/ip-character.glb`）

- 格式：**`.glb`**（单文件二进制）
- 大小：≤ 5MB
- 推荐带 morph targets（支持点击表情变化）

---

## ✨ 进阶：每个作品可以放多个文件

如果某个作品需要展示多张图（详情页 / 滑块），可以加后缀：

```
public/images/projects/
├── p1-cherry.jpg                    ← 主封面（hover 用）
├── p1-cherry-01.jpg                 ← 详情图 1（功能梳理）
├── p1-cherry-02.jpg                 ← 详情图 2（界面动态）
├── p1-cherry-03.jpg                 ← 详情图 3（最终视频帧）
└── p1-cherry-thumb.jpg              ← 列表缩略图
```

如果你想加，告诉我，我会扩展 `data/projects.ts` 的 `gallery` 字段。

---

## 🛠️ 怎么给到文件

### 方式 A：直接拖到 Windows 文件夹
打开这个目录：
```
E:\Claude Code-文件\0801-尝试\public\images\projects\
```
把 `p1-cherry.jpg` 等文件直接拖进去。

### 方式 B：告诉我你以后要加
- 直接贴图给我（base64 或链接）
- 或者文件已经在 `E:\Claude Code-文件\0801-尝试` 下的某个位置，告诉我路径

### 方式 C：暂时不放
现在所有卡片**用占位色块显示**（每个作品有一个独特的 `coverHue`），等你准备好了再补图。

---

## 🎯 当前推荐顺序

1. **现在就放**：6 个精选作品的主封面（`p1` ~ `p6`）
2. **每隔几天放**：Showreel 视频 / 个人介绍照片
3. **最后再考虑**：Stellar Pulse 封面（`p7`）和其他细节图

---

## ❓ 验证文件是否生效

每次你丢图后，刷新 http://localhost:3000/main 的"精选作品"模块：
- 浏览器开发者工具 → Network 标签，找 `p1-cherry.jpg`
- 如果返回 200，表示加载成功
- 如果 404，说明文件名不对

需要我把每张图的具体尺寸 / 比例 / 风格建议都列出来吗？比如 6 个作品各推荐什么构图？

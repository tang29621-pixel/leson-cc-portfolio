# 部署到腾讯云 EdgeOne Pages

> 国内访问专用镜像,与 Vercel 部署**完全独立、互不影响**。
> 源码 **0 改动**,只在腾讯云控制台点几下。

---

## 为什么选 EdgeOne Pages

- ✅ Next.js 原生支持,直接识别框架
- ✅ `/api/chat` 用了 `runtime: "edge"`,EdgeOne Pages 本身就跑在 edge 函数上,延迟最低
- ✅ 免费额度对个人作品站绰绰有余
- ✅ **免备案**(境外节点)
- ✅ 国内访问速度比 Vercel 快很多
- ✅ 推代码自动部署(GitHub 集成)

---

## 一次性准备工作

| 准备项 | 说明 |
|---|---|
| 腾讯云账号 | console.cloud.tencent.com 注册 |
| 实名认证 | 控制台 → 账号中心 → 实名认证,通常几分钟通过 |
| GitHub 仓库 | `tang29621-pixel/leson-cc-portfolio` 已经是 public,EdgeOne 可直接访问 |

---

## 部署步骤

### 1. 进入 EdgeOne Pages 控制台

打开: https://console.cloud.tencent.com/edgeone/pages

### 2. 创建项目

1. 点 **"创建项目"**
2. 选择 **"导入 Git 仓库"**
3. 授权 GitHub (首次需要 OAuth 授权)
4. 选仓库 `leson-cc-portfolio`
5. 分支选 `main`

### 3. 构建设置 ⚠️ 关键

| 配置项 | 值 |
|---|---|
| 项目名称 | 自定义,如 `portfolio-cn` |
| 框架预设 | **Next.js** |
| 构建命令 | `next build` |
| 安装命令 | `npm install` |
| Node 版本 | **20.x** |
| 输出目录 | **留空**(EdgeOne 自动识别) |
| 区域 | 选离你近的(华南/华东都行) |

### 4. 环境变量

在项目设置 → 环境变量,新增以下 5 个 (从 `.env.local` 里复制,**不要泄露 key**):

```
AI_PROVIDER     = qwen
AI_API_KEY      = <你的胜算云 API key>
AI_BASE_URL     = <胜算云 router URL>
AI_MODEL        = <你的模型名,如 deepseek-chat>
NEXT_PUBLIC_SITE_URL = https://<待分配的 edgeone.app 域名>
```

> `NEXT_PUBLIC_SITE_URL` 可以先空着,部署完拿到域名后再回来填,或者填 Vercel 那个域名也行,只影响 SEO/og:url,不影响功能。

### 5. 部署

点 **"开始部署"** → 等待 2~4 分钟 → 控制台会出现 `https://<xxx>.edgeone.app`

### 6. 回到环境变量

把 `NEXT_PUBLIC_SITE_URL` 改成刚拿到的 `https://<xxx>.edgeone.app` → 触发一次重新部署。

---

## 验证清单 ✅

部署完成后,按顺序检查:

- [ ] 打开 `https://<xxx>.edgeone.app`,首屏和 Vercel 一模一样
- [ ] 滚动动效 (LiquidEther / FloatingParticles / CursorFollower) 正常
- [ ] 切换 Hero 卡片 / Works 列表 / 项目详情 Modal 正常
- [ ] 点 **AI 聊天按钮**,发条消息,**确认有流式回复** ← 这步最重要,验 API 通
- [ ] 打开浏览器 DevTools → Network,看 `/api/chat` 状态是 200
- [ ] 在国内不同网络 (4G / WiFi / 公司网) 各打开一次

---

## 后续更新代码

推代码到 `main` 分支 → EdgeOne Pages 自动触发部署。

```bash
git add .
git commit -m "..."
git push origin main
```

EdgeOne Pages 控制台会显示新的 build 进度。

> 如果你想让国内版**比 Vercel 慢一步**(比如先在 Vercel 验证再发国内),
> 可以给 EdgeOne Pages 配一个**专门的分支** (如 `release-cn`),在腾讯云控制台切到这个分支即可。

---

## 常见问题

### ❌ Build 失败:Node 版本不兼容
→ 控制台 → 项目设置 → Node 版本改成 **20.x**

### ❌ Build 失败:内存不足
→ 极少发生,Next 14 build 占用约 1-1.5 GB,EdgeOne 默认够用。
→ 如果真出,在项目设置 → 构建机器 → 升配(可能要付费)。

### ❌ 页面 404
→ 检查路由:本站只有 `/`、`/main`、`/works`,其它路径会走 `_not-found`。

### ❌ AI 聊天没响应
→ 检查环境变量是否全部填了,**特别是 `AI_API_KEY`**
→ EdgeOne Pages 控制台 → 函数日志 查看报错

### ❌ 图片加载慢 / 加载不出来
→ `next/image` 的 remotePatterns 配置允许所有 `https://**`,理论上都过。
→ 如果某张图挂了,看看是不是用了 Vercel 的 blob 存储(本站没用)。

---

## 不要做的事 ⚠️

- ❌ **不要改 `next.config.mjs`** — 当前配置对 EdgeOne Pages 已经最优
- ❌ **不要把 `.env.local` 提交到 GitHub**
- ❌ **不要在 Vercel 上删除项目** — 国内外是两套独立部署

---

## 卸载 / 删除

如果哪天不想用了:
EdgeOne Pages 控制台 → 选项目 → 设置 → 底部 **"删除项目"**。
不影响 Vercel 部署。
# 部署到腾讯云 EdgeOne Pages

> 国内访问专用镜像,与 Vercel 部署**完全独立、互不影响**。
> 源码 **0 改动**,只在腾讯云控制台点几下。

## 当前线上状态（2026-10-21）

| 项目 | 值 |
|---|---|
| 正式域名 | **https://lesoncici.cn**（已备案） |
| 加速区域 | 全球可用区（含中国大陆） |
| 备案 | ✅ 已通过（腾讯云备案，`lesoncici.cn`） |
| 海外线路 | Vercel `leson-cc-portfolio.vercel.app`（同仓库自动部署） |
| AI 接口 | 胜算云 router，`/api/chat` 走 Node 运行时 |

---

## 为什么选 EdgeOne Pages

- ✅ Next.js 原生支持,直接识别框架
- ✅ 免费额度对个人作品站绰绰有余
- ✅ 国内访问速度比 Vercel 快很多（大陆节点）
- ✅ 推代码自动部署(GitHub 集成)
- ⚠️ **需要备案**:本项目加速区域是「全球可用区（含中国大陆）」,自定义域名**必须完成工信部备案**。
  只有「全球可用区（不含中国大陆）」才免备案,但该区域会**主动屏蔽大陆 IP（返回 401）**,对国内镜像场景没有意义。

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
NEXT_PUBLIC_SITE_URL = https://lesoncici.cn
```

> `NEXT_PUBLIC_SITE_URL` 只影响 SEO / og:url / metadataBase,不影响功能。
> 改完环境变量**必须触发一次新部署**才会生效。

### 5. 部署

点 **"开始部署"** → 等待 2~4 分钟 → 控制台的项目域名形如 `https://<xxx>.edgeone.cool`

> ⚠️ 含中国大陆区域的项目,**项目域名/部署域名必须用带 `eo_token` 的预览链接访问,有效期仅 3 小时**（过期返回 401）。
> 要长期公开访问,必须绑定自定义域名 —— 见下一步。

### 6. 绑定自定义域名 `lesoncici.cn`（备案通过后）★ 关键

1. EdgeOne Pages 控制台 → 项目 → **域名管理 / 自定义域名** → 添加 `lesoncici.cn`
   （如果提示"域名未备案",说明备案还没生效,回到腾讯云备案控制台确认下证）
2. 平台会给出一条 **CNAME 记录值**,复制下来
3. 腾讯云 **DNSPod 控制台**（console.cloud.tencent.com/cns）→ `lesoncici.cn` → 添加/修改记录:

   | 字段 | 值 |
   |---|---|
   | 主机记录 | `@` |
   | 记录类型 | `CNAME` |
   | 记录值 | 上一步 EdgeOne 给的 CNAME |
   | TTL | 600 |

   建议再加一条主机记录 `www` 的同值记录,让 `www.lesoncici.cn` 也能访问。
4. 等 5~30 分钟解析生效 → EdgeOne 自动签发 HTTPS 证书 → `https://lesoncici.cn` 可访问

> 若 DNSPod 提示"@ 不允许 CNAME",改用 EdgeOne 控制台提供的替代方案（通常是让你用 CNAME 接入或改用 A 记录指向它给的 IP）。

---

## 验证清单 ✅

部署完成后,按顺序检查:

- [ ] 打开 `https://lesoncici.cn`,首屏和 Vercel 一模一样
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
→ **第一步:先看报错是什么。** 聊天面板会直接显示错误文字,三种典型情况:

| 报错文字 | 原因 | 解决 |
|---|---|---|
| `HTTP 500: {"error":"AI_API_KEY 未配置..."}` | EdgeOne 控制台环境变量没填/没生效 | 项目设置 → 环境变量补齐 5 个 → **重新部署**(改环境变量必须触发一次新部署才生效) |
| `HTTP 500: {"error":"401/403 ..."}` | API key 无效或胜算云余额不足 | 本地 `curl` 验证 key,或换 key |
| 面板一直转圈、无报错也无回复 | SSE 流被 CDN 缓冲,或函数运行时报错 | EdgeOne 控制台 → 函数日志 查看报错 |

→ 已做的代码兼容(2026-09-19):
- 移除了 `route.ts` 里的 `runtime = "edge"` 声明 —— EdgeOne 函数环境与 Vercel Edge Runtime 实现不同,显式声明可能导致函数执行异常
- 移除了 SSE 响应里的 `Connection: keep-alive` 头 —— hop-by-hop 头在 HTTP/2 下非法,过 CDN 可能被拒绝

→ 仍不行时,浏览器 DevTools → Network → 点 `/api/chat` 请求,把 **状态码 + Response 内容** 贴出来进一步定位。

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
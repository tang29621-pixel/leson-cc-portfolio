// 视频 / Showreel 数据（v1 · 2026-08-02）
//
// 消费方契约（ShowreelSection.tsx）：
//   - 4 个视频：v1 主位（左侧大窗口），v2/v3/v4 缩略图（右侧 3 个）
//   - Video.source:
//     · "bilibili"  → 用 B 站 embed iframe（bvid 必填）
//     · "self"      → 自托管 MP4（src 必填，路径在 /public 下）
//     · "placeholder" → 显示 "Coming Soon" 状态（v2/v3/v4 暂用）
//   - 点击缩略图切换主位（无需路由）
//
// v1-v3 数据：用户提供 B 站视频
//   v1: https://www.bilibili.com/video/BV1qH7p6MEMK → REBUILD THE CITY (p4)
//   v2: https://www.bilibili.com/video/BV1qiMD6FEEf → Hydra Flow Station (p7)
//   v3: https://www.bilibili.com/video/BV1fCMo62Ewn → Stellar Pulse / 星际脉冲 (p2)
// v4：1 个未公开视频占位，等用户发布后补 bvid

export type VideoSource = "bilibili" | "self" | "placeholder";

export type Video = {
  id: string;              // "v1" ~ "v4"
  title: string;
  subtitle?: string;       // 副标题（如 B 站原标题的 ": 副标题"）
  year?: string;
  type?: string;           // "AIGC Film" / "UI Motion" / "Real-time" 等
  projectId?: string;      // 关联到 data/projects.ts 的 p1-p11
  source: VideoSource;
  bvid?: string;           // for source: "bilibili"
  src?: string;            // for source: "self" — 路径在 /public 下
  poster?: string;         // 封面图（占位态可空）
  desc?: string;           // 一句话描述（可选）
};

export const videos: Video[] = [
  {
    id: "v1",
    title: "REBUILD THE CITY",
    subtitle: "重启城市秩序",                  // 来自 B 站原标题
    year: "2026",
    type: "AIGC Concept Film",
    projectId: "p4",
    source: "bilibili",
    bvid: "BV1qH7p6MEMK",
    desc: "未来城市灾难救援 · AIGC 概念短片",
  },
  {
    id: "v2",
    title: "HYDRA FLOW STATION",
    subtitle: "智能运动恢复补水站",
    year: "2026",
    type: "Product Film",
    projectId: "p7",
    source: "bilibili",
    bvid: "BV1qiMD6FEEf",
    desc: "Hydrate Smarter, Recover Better · 智能运动恢复补水站产品视频",
  },
  {
    id: "v3",
    title: "Stellar Pulse",
    subtitle: "星际脉冲",
    year: "2024",
    type: "Real-time Visual · 实时视觉",
    projectId: "p2",
    source: "bilibili",
    bvid: "BV1fCMo62Ewn",
    desc: "围绕速度与光线的实时视觉装置完整视频版",
  },
  {
    id: "v4",
    title: "Coming Soon",
    source: "placeholder",
    // TODO: 用户发布后补 bvid / projectId
  },
];

// Profile 板块数据（v1 · 2026-08-03）
//
// 消费方契约（ProfileSection.tsx）：
//   - 左侧：人物照片
//   - 右侧：姓名（中英）、身份、tagline、介绍、location / status
//   - 下方：Education、Experience、Core Competencies、Currently Exploring
//
// 数据来源：data/profile.ts（profile / timeline）
// 这里重新组织成 ProfileSection 友好的结构，未来 profile.ts 改字段时不破坏组件。

import { profile } from "./profile";

export type ProfileEducation = {
  period: string;
  school: string;
  degree: string;
  focus: string[];
};

export type ProfileExperience = {
  period: string;
  company: string;
  role: string;
  scope: string[];
};

export const profileEducation: ProfileEducation[] = [
  {
    period: "2024.09 — NOW",
    school: "上海建桥学院",
    degree: "艺术与科技 · 本科",
    focus: ["视觉设计", "产品创新", "交互媒体", "AIGC", "实时三维"],
  },
];

export const profileExperience: ProfileExperience[] = [
  {
    period: "2026 — NOW",
    company: "飞书深诺",
    role: "设计实习生",
    scope: [
      "Baseball Clash 移动游戏平面投放物料",
      "傲风电竞椅 广告口播视频制作",
      "DinoAI AI 广告口播视频制作",
    ],
  },
  {
    period: "2026",
    company: "Cherry Studio",
    role: "设计实习生",
    scope: [
      "智能模型集合软件 UI 宣传片画面设计",
      "功能演示 · 动态包装 · 视频制作",
    ],
  },
];

export const coreCompetencies: string[] = profile.coreCompetencies;

// "Currently Exploring"：从 careerInterests 派生 + 一句工作方向
export const currentlyExploring: string[] = [
  "AI 影像",
  "智能产品",
  "交互体验",
  "数字内容",
];

export const profileMeta = {
  nameZh: profile.nameZh,
  nameEn: profile.nameEn,
  role: profile.role,
  tagline: profile.tagline,
  taglineEn: profile.taglineEn,
  intro: profile.intro,
  location: profile.location,
  status: ["Available for Collaboration", "Open to Internship"],
  email: profile.email,
  resumeHref: "/documents/resume/resume.pdf",
  portfolioHref: "/documents/portfolio/portfolio.pdf",
  contactHref: "mailto:1780093442@qq.com",
  photo: {
    src: "/images/profile/portrait.jpg", // 已合成暗色背景版
    alt: `${profile.nameZh} 个人照片`,
    placeholder: false,
  },
};

// 从现有数据派生 hero 统计数字
// 让卡片显示真实数字，而不是硬编码

import { projects } from "@data/projects";
import { timeline } from "@data/profile";

export type HeroStat = {
  label: string; // WORKS / AWARDS / TOOLS
  labelZh: string; // 作品 / 获奖 / 工具
  value: string; // 06+ / 05+ / 10+
  caption: string; // 1 句描述
};

// 1. 精选作品数
const worksCount = projects.filter((p) => p.featured).length;

// 2. 获奖数（timeline 中 kind === award）
const awardsCount = timeline.filter((t) => t.kind === "award").length;

// 3. 工具数（projects.tools 去重）
const toolsSet = new Set<string>();
projects.forEach((p) => p.tools.forEach((t) => toolsSet.add(t)));
const toolsCount = toolsSet.size;

const pad = (n: number) => String(n).padStart(2, "0");

export const heroStats: HeroStat[] = [
  {
    label: "WORKS",
    labelZh: "作品",
    value: `${pad(worksCount)}+`,
    caption: "精选作品 · 涵盖视觉 / 影像 / 产品 / 交互 / 数字艺术。",
  },
  {
    label: "AWARDS",
    labelZh: "获奖",
    value: `${pad(awardsCount)}+`,
    caption: "国内外奖项 · 米兰设计周 / 中国大学生创意节 / 东方创意之星。",
  },
  {
    label: "TOOLS",
    labelZh: "工具",
    value: `${pad(toolsCount)}+`,
    caption: "常用工具 · AE / Figma / UE5 / TouchDesigner / Midjourney。",
  },
];

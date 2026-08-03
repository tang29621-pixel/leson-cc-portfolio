// 能力栈与服务方向（v1 · 2026-08-02 草拟）
//
// 设计依据：
//   - profile.ts：当前在做的 4 个方向（视觉 / 智能产品 / 交互艺术 / 数字影像）
//   - projects.ts：6 个精选作品实际用到的工具
//   - profile-basics.md：持续探索 AIGC / TouchDesigner / UE5
//
// 消费方契约（由 SkillsSection.tsx 强制）：
//   - 4 个 category：design / 3d / code / tool（中文标签硬编码在组件内）
//   - 3 个 level：expert / advanced / intermediate（影响字号）
//   - services 期望 4 条（按 0{i+1} 编号）
//   - 渲染样式：word cloud（按 level 控字号）+ 编号清单
//
// 后续调整建议：
//   - UE5 标 intermediate 是保守估值，如果已经有 demo 作品可升 advanced
//   - 若新增工具，请在对应 category 下追加，并标注最接近的真实熟练度
//   - services 顺序 = 用户在 profile.intro 提到的顺序，可微调

export type SkillLevel = "expert" | "advanced" | "intermediate";

export type SkillCategory = "design" | "3d" | "code" | "tool";

export type Skill = {
  name: string;
  level: SkillLevel;
  category: SkillCategory;
};

// 顺序约定：同 category 内 expert → advanced → intermediate；
// 不同 category 之间按"主业 → 副业"排列：design → 3d → code → tool。
export const skills: Skill[] = [
  // —— 设计 / Design ——
  { name: "Figma",          level: "expert",      category: "design" },
  { name: "After Effects",  level: "expert",      category: "design" },
  { name: "Illustrator",    level: "expert",      category: "design" },
  { name: "Photoshop",      level: "advanced",    category: "design" },
  { name: "Premiere Pro",   level: "advanced",    category: "design" },
  { name: "DaVinci Resolve",level: "advanced",    category: "design" },
  { name: "Midjourney",     level: "expert",      category: "design" }, // AIGC 出图
  { name: "Runway",         level: "advanced",    category: "design" }, // AIGC 视频

  // —— 三维 / 3D ——
  { name: "Blender",        level: "advanced",    category: "3d" },
  { name: "Three.js",       level: "advanced",    category: "3d" },     // R3F + 真实模型
  { name: "Keyshot",        level: "advanced",    category: "3d" },
  { name: "Unreal Engine 5",level: "intermediate",category: "3d" },     // 探索中

  // —— 代码 / Code ——
  { name: "React / Next.js",level: "advanced",    category: "code" },    // 本作品站
  { name: "TypeScript",     level: "advanced",    category: "code" },
  { name: "GLSL / Shaders", level: "intermediate",category: "code" },   // TD/Three.js 着色
  { name: "HTML / CSS",     level: "advanced",    category: "code" },
  { name: "Tailwind CSS",   level: "advanced",    category: "code" },

  // —— 工具 / Tool ——
  { name: "TouchDesigner",  level: "advanced",    category: "tool" },    // P6 装置 + 原 P2
  { name: "Notion",         level: "expert",      category: "tool" },
];

export type Service = {
  title: string;
  desc: string;
  bullets: string[];
};

// 4 项服务方向 = profile.intro 提到的实践方向
// 顺序：视觉 → 智能产品 → 数字影像 → 交互艺术（与作品量级一致）
export const services: Service[] = [
  {
    title: "视觉 / 品牌设计",
    desc: "为新品牌或品牌焕新提供完整的视觉语言与系统化物料。",
    bullets: ["Logo & VI", "字体与配色", "品牌物料", "设计规范"],
  },
  {
    title: "智能产品 / 交互",
    desc: "面向智能硬件与数字产品的产品造型、交互流程与原型落地。",
    bullets: ["产品造型", "交互流程", "动效原型", "场景可视化"],
  },
  {
    title: "数字影像 / AIGC",
    desc: "从概念短片、品牌片头到 AIGC 工作流，按需提供端到端视觉产出。",
    bullets: ["概念短片", "AIGC 制作流", "动态包装", "调色剪辑"],
  },
  {
    title: "交互艺术 / 实时视觉",
    desc: "基于 TouchDesigner 与 Three.js 的实时视觉与互动装置。",
    bullets: ["实时视觉", "互动装置", "Shader 实验", "Web 沉浸页"],
  },
];

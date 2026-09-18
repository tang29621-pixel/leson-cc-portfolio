// 个人介绍与经历数据（v3 · 2026-08-02 大改：加 4 个新字段 + 改名 + 时间修正）
//
// 字段结构：
//   - nameZh / nameEn        姓名的中英文
//   - role / roleZh          一句话身份
//   - school / degree        学校 + 学历
//   - schoolStart            就读时间起点（"YYYY.MM"）
//   - tagline / taglineEn    一句话自我描述（中英）
//   - intro[]                3 段自我介绍（按"定位 → 风格 → 期待"展开）
//   - designStyle            一句话设计风格
//   - careerInterests[]      8 个职业兴趣方向
//   - coreCompetencies[]     9 项核心能力
//   - email / social[]       联系方式

export type SocialLink = {
  label: string;
  href?: string; // 邮箱 / 站内链接 / 第三方平台
  handle?: string; // 微信 / 用户名（如 @xxx），用于复制或显示
};
//   - email / location / social

export const profile = {
  nameZh: "陈声渏",
  nameEn: "Leson-cc",
  // 资料名（对外可忽略；UI 展示用 nameEn = Leson-cc）
  name: "Cheng Shengyi",
  role: "Visual · Product · Interaction & Digital Art Creator",
  roleZh: "视觉设计师、产品设计师、交互与数字艺术创作者",

  // 教育
  school: "上海建桥学院",
  degree: "艺术与科技 · 本科",
  schoolStart: "2024.09",
  // location 保留（与 school 不冲突 —— city 是"现在在哪"，school 是"在哪读书"）
  location: "上海 / 中国",

  // 一句话
  tagline: "把抽象想法转化为可感知的视觉与体验。",
  taglineEn: "Turning abstract ideas into tangible visuals and experiences.",

  // 3 段自我介绍（v3：合并"风格"与"职业兴趣"信息，呼应核心能力）
  intro: [
    "我是一名艺术与科技方向的设计创作者，主要在视觉设计、智能产品、交互艺术与数字影像之间展开实践，擅长将创意概念转化为完整的视觉、动态与交互体验。",
    "我的设计风格偏向编辑式极简与数字未来主义，重视网格、留白、信息层级与空间秩序，同时通过 AIGC、三维场景、动态影像与交互技术增强叙事与情绪表达。",
    "目前持续探索 AIGC、TouchDesigner 与 Unreal Engine 5 在视觉叙事和交互体验中的应用。期待参与 AI 短剧 / 广告影像 / UI 动态 / 创新产品 / 交互体验 / 数字内容 等方向的项目。",
  ],

  // 设计风格（一句话）
  designStyle: "编辑式极简 × 数字未来主义 × 视觉叙事",

  // 8 个职业兴趣方向
  careerInterests: [
    "AI 漫剧",
    "AI 短剧",
    "广告创意",
    "品牌影像",
    "产品宣传片",
    "UI 动态宣传",
    "AIGC 视觉内容",
    "三维场景与实时影像",
  ],

  // 9 项核心能力
  coreCompetencies: [
    "视觉风格设计",
    "品牌视觉与版式设计",
    "UI 界面动态展示",
    "分镜与镜头设计",
    "AIGC 图像及视频生成",
    "Unreal Engine 5 实时场景",
    "TouchDesigner 交互视觉",
    "动态包装与后期剪辑",
    "产品设计与交互流程表达",
  ],

  // 联系方式
  email: "1780093442@qq.com",
  social: ([
    { label: "Email",    href: "mailto:1780093442@qq.com" },
    { label: "小红书",    href: "https://www.xiaohongshu.com/user/profile/cys_red" },
    { label: "Bilibili", href: "https://space.bilibili.com/378961305" },
    { label: "GitHub",   href: "https://github.com/tang29621" },
    { label: "微信",      handle: "cys5mao" },
  ] as SocialLink[]),
};

export type TimelineKind = "now" | "work" | "edu" | "talk" | "award";

export type TimelineItem = {
  year: string;
  kind: TimelineKind;
  title: string;
  detail?: string;
};

// 经历时间线（v3：学校时间修正为 2024.09—至今）
export const timeline: TimelineItem[] = [
  {
    year: "2026",
    kind: "now",
    title: "跨媒介设计与个人作品集实践",
    detail: "持续探索视觉设计、智能产品、交互艺术、AIGC 影像与实时三维表达。",
  },
  {
    year: "2026至今",
    kind: "work",
    title: "设计实习生｜飞书深诺",
    detail: "参与 Baseball Clash 平面投放物料、傲风电竞椅广告口播视频、DinoAI AI 广告口播视频等多个项目的视觉与视频制作。",
  },
  {
    year: "2026",
    kind: "work",
    title: "设计实习生｜Cherry Studio",
    detail: "参与智能模型集合软件的视觉宣传工作，主要负责软件 UI 界面宣传片的画面设计、功能演示、动态包装与视频制作。",
  },
  {
    year: "2026",
    kind: "award",
    title: "东方创意之星创新设计大赛｜两项上海赛区铜奖",
    detail: "《智能运动地砖系统》与《星痕·触爆新生》获得高教赛道上海赛区铜奖。",
  },
  {
    year: "2026",
    kind: "award",
    title: "米兰设计周｜上海赛区三等奖",
    detail: "团队作品《星痕·触爆新生》获得非命题赛场视频类三等奖。",
  },
  {
    year: "2026",
    kind: "award",
    title: "中国大学生创意节｜入围奖",
    detail: "团队作品《星痕·触爆新生》入围第七届中国大学生创意节创意交互设计组。",
  },
  {
    year: "2026",
    kind: "award",
    title: "Best Use of Tripo Award",
    detail: "Bit to Atom 3D Model Designing Challenge · 三维模型设计专项奖。",
  },
  {
    year: "2026",
    kind: "award",
    title: "「挑战杯」｜上海市级奖项",
    detail: "参与创新创业项目设计与视觉呈现，并获得『挑战杯』上海市级奖项。",
  },
  {
    year: "2024.09—至今",
    kind: "edu",
    title: "艺术与科技方向｜上海建桥学院",
    detail: "本科在读 · 学习视觉设计、产品创新、交互媒体、实时三维与 AIGC 辅助创作。",
  },
];

export const kindsLabel: Record<TimelineKind, string> = {
  now: "在做的事",
  work: "工作",
  edu: "教育",
  talk: "讲 / 写",
  award: "获奖",
};

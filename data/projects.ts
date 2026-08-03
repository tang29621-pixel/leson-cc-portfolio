// 作品（v3 · 2026-08-02 重做：6 → 12 个 + award 字段数组化）
//
// 4 个分类（用于 /works 页筛选）：
//   motion-aigc          → Motion & AIGC
//   visual-branding      → Visual & Branding
//   product-interaction  → Product & Interaction
//   digital-art          → Digital Art
//
// featured = true：进入 /main 首页杂志拼贴（v3 保留 p1-p6 共 6 个；p7-p12 仅在 /works 出现）
// awards 字段：v3 改为 string[]（一个项目可能多次获奖）

export type ProjectCategory =
  | "motion-aigc"
  | "visual-branding"
  | "product-interaction"
  | "digital-art";

export const categoryLabels: Record<ProjectCategory, string> = {
  "motion-aigc": "Motion & AIGC",
  "visual-branding": "Visual & Branding",
  "product-interaction": "Product & Interaction",
  "digital-art": "Digital Art",
};

export const categoryLabelsZh: Record<ProjectCategory, string> = {
  "motion-aigc": "动态影像 / AIGC",
  "visual-branding": "视觉 / 品牌",
  "product-interaction": "产品 / 交互",
  "digital-art": "数字艺术",
};

export type Project = {
  id: string;
  title: string;
  subtitle?: string;
  year: string;
  role: string;
  type: string;             // 自由分类描述
  category: ProjectCategory;
  tags: string[];
  tools: string[];
  cover: string;            // 封面图路径（TODO 标记的为占位，等用户补图）
  coverHue: string;         // 占位色相（cover 不存在时显示此色块）
  span: string;             // 主页网格跨度
  desc: string;             // 一句介绍
  highlights?: string[];    // 重点展示
  awards?: string[];        // v3：多获奖支持
  featured?: boolean;       // 是否精选（只显示在 /main）
};

export const projects: Project[] = [
  {
    id: "p1",
    title: "Cherry Studio 软件 UI 宣传片",
    subtitle: "智能模型集合软件的 UI 影像呈现",
    year: "2026",
    role: "实习 · UI Motion / 视觉设计",
    type: "商业实践 / UI 动态影像",
    category: "motion-aigc",
    tags: ["UI Motion", "Product Video", "Visual Design", "Internship"],
    tools: ["After Effects", "Figma", "Premiere"],
    cover: "/images/projects/p1-cherry.png",
    coverHue: "#2B4A6F",
    span: "col-span-12 md:col-span-7 row-span-2",
    desc: "为智能模型集合软件制作 UI 界面宣传片，通过功能流程梳理、界面动效与视觉包装，将复杂的软件功能转化为清晰、有节奏的产品传播内容。",
    highlights: [
      "软件功能与宣传目标拆解",
      "UI 操作流程梳理",
      "画面排版与镜头设计",
      "UI 界面动态演示",
      "转场、字幕和动态包装",
      "最终宣传片片段",
    ],
    featured: true,
  },
  {
    id: "p2",
    title: "Stellar Pulse",
    subtitle: "实时视觉 / 数字艺术",
    year: "2024",
    role: "实时视觉艺术家",
    type: "数字艺术 / 实时视觉",
    category: "digital-art",
    tags: ["Real-time", "TouchDesigner", "Digital Art"],
    tools: ["TouchDesigner", "GLSL"],
    cover: "/images/projects/p2-stellar.png",
    coverHue: "#1A1A1A",
    span: "col-span-12 md:col-span-5 row-span-2",
    desc: "围绕速度与光线的实时视觉装置，通过粒子与流体生成探索数字画面的运动节奏。",
    highlights: [
      "速度与光线的实时生成",
      "粒子系统与流体运动",
      "沉浸式数字视觉体验",
      "TouchDesigner 程序化着色",
    ],
    featured: true,
  },
  {
    id: "p3",
    title: "智能运动地砖系统",
    subtitle: "Stride Beacon · 面向社区夜跑场景",
    year: "2026",
    role: "产品 / 交互设计",
    type: "产品设计 / 交互体验 / 物联网",
    category: "product-interaction",
    tags: ["Product Design", "Interaction", "IoT", "Award"],
    tools: ["Figma", "Blender", "Keyshot"],
    cover: "/images/projects/p3-stride.png",
    coverHue: "#6B6B6B",
    span: "col-span-12 md:col-span-8",
    desc: "面向社区夜跑场景设计的智慧运动系统，通过动能发电、路径导航、互动打卡与安全预警，将公共地砖转化为可感知、可响应的运动节点。",
    highlights: [
      "夜跑场景与用户痛点",
      "动能发电逻辑",
      "路线导航与安全预警",
      "地砖与穿戴设备的交互流程",
      "产品造型与结构",
      "最终使用场景",
    ],
    awards: ["东方创意之星上海赛区铜奖 · 第七届"],
    featured: true,
  },
  {
    id: "p4",
    title: "REBUILD THE CITY",
    subtitle: "未来城市灾难救援 · AIGC 概念短片",
    year: "2026",
    role: "概念 / 美术 / 剪辑",
    type: "AIGC 概念短片 / 广告式影像",
    category: "motion-aigc",
    tags: ["Concept Film", "AIGC", "Art Direction", "Storyboarding"],
    tools: ["Midjourney", "Runway", "After Effects", "DaVinci"],
    cover: "/images/projects/p4-rebuild.jpg",
    coverHue: "#D4B5A0",
    span: "col-span-12 md:col-span-4",
    desc: "一部围绕未来城市灾难救援展开的 AIGC 概念短片，通过机器人、消防员与城市重建的叙事，探索科技在人类危机中的角色与情感价值。",
    highlights: [
      "创意概念与世界观",
      "电影分镜设计",
      "情绪节奏与音乐设计",
      "AIGC 场景生成",
      "灾难压迫 → 紧张救援 → 希望重生",
      "品牌化结尾表达",
    ],
    featured: true,
  },
  {
    id: "p5",
    title: "腾创智控品牌视觉系统",
    subtitle: "海上火箭发射移动平台 · Branding",
    year: "2026",
    role: "品牌设计师",
    type: "品牌视觉 / 标志设计 / 视觉系统",
    category: "visual-branding",
    tags: ["Brand Identity", "Logo Design", "Visual System", "Aerospace"],
    tools: ["Illustrator", "Figma", "Photoshop"],
    cover: "/images/projects/p5-tengchuang.jpg",
    coverHue: "#2B4A6F",
    span: "col-span-12 md:col-span-5",
    desc: "为海上火箭发射移动平台企业建立品牌视觉识别系统，将火箭轨迹、海上平台与字母结构融合，形成兼具航天工业感与未来科技感的品牌形象。",
    highlights: [
      "品牌背景与行业特征",
      "Logo 概念推导（T / C / 火箭轨迹 / 海浪）",
      "标准色与字体",
      "品牌辅助图形",
      "名片、工牌、设备、宣传物料应用",
    ],
    featured: true,
  },
  {
    id: "p6",
    title: "塑侵 · 共生",
    subtitle: "TouchDesigner 交互装置 · 塑料污染与生态",
    year: "2024",
    role: "交互艺术家 / 编程",
    type: "TouchDesigner 交互艺术 / 数字装置",
    category: "digital-art",
    tags: ["Interactive Art", "TouchDesigner", "Installation", "Ecology"],
    tools: ["TouchDesigner", "Kinect", "Blender"],
    cover: "/images/projects/p6-plastic.png",
    coverHue: "#FAFAF7",
    span: "col-span-12 md:col-span-7",
    desc: "以塑料污染与生态共生为主题，通过人体靠近和手势触发实时视觉变化，让观众的行为成为数字叙事的一部分。",
    highlights: [
      "无人时呈现鱼模型",
      "人体靠近后动态图形出现",
      "挥动双手触发影像",
      "讨论塑料污染与生态关系",
    ],
    featured: true,
  },
  // ====== v3 末尾新增：p7-p11 五个新项目（v4 顺延：原 p7 星痕已合并到 p2 = Stellar Pulse）
  //   顺延映射：原 p8 Hydra → p7 / 原 p9 望远镜 → p8 / 原 p10 人民公园 → p9 /
  //             原 p11 古影新绎 → p10 / 原 p12 心格映构 → p11
  //   均 featured=false，仅在 /works 出现
  // ====== v4 调整：P2 + P7 是同一项目（用户 2026-08-02 再次确认），合为 p2 = Stellar Pulse，删原 p7
  {
    id: "p7",
    title: "Hydra Flow Station",
    subtitle: "智能运动恢复补水站",
    year: "2026",
    role: "产品设计",
    type: "产品设计 / 工业设计 / 智能硬件",
    category: "product-interaction",
    tags: ["Product Design", "Industrial Design", "Wellness Tech"],
    tools: ["Figma", "Blender", "Keyshot"],
    cover: "/images/projects/p7-hydra.png",
    coverHue: "#59D7FF",
    span: "col-span-12 md:col-span-4",
    desc: "Hydrate Smarter, Recover Better.\n智能补水，科学恢复，让每一次运动都更有价值",
    highlights: [
      "运动恢复场景与用户痛点",
      "智能补水流程",
      "产品造型与结构",
      "最终使用场景",
    ],
  },
  {
    id: "p8",
    title: "智能输液触觉联动系统",
    subtitle: "面向儿童输液场景的智能医疗辅助产品",
    year: "2026",
    role: "产品 / 交互设计",
    type: "产品设计 / 智能医疗 / 儿童关怀",
    category: "product-interaction",
    tags: [
      "Product Design",
      "Medical Device",
      "Children Care",
      "IoT",
      "Tactile HCI",
    ],
    tools: ["Figma", "Blender", "Keyshot"],
    cover: "/images/projects/p8-infusion.png",
    coverHue: "#A8C8E0",
    span: "col-span-12 md:col-span-4",
    desc: "面向儿童输液场景的智能医疗辅助产品。云朵造型监控终端 + 儿童触觉提醒贴片 + 手机端联动，实时识别输液进度，异常时温和触觉反馈，缓解患儿紧张，让家属与医护人员少跑几趟。",
    highlights: [
      "云朵造型智能监控终端",
      "儿童触觉提醒贴片（亲和动物形象）",
      "手机端实时联动",
      "实时识别输液进度与滴速",
      "异常时温和触觉反馈",
      "柔和圆润造型 + 低饱和医疗配色",
    ],
  },
  {
    id: "p9",
    title: "人民公园公共文化 IP 设计",
    subtitle: "公共文化 IP / 上海",
    year: "2025",
    role: "品牌设计师",
    type: "品牌视觉 / IP 设计 / 公共文化",
    category: "visual-branding",
    tags: ["Brand Identity", "IP Design", "Public Culture"],
    tools: ["Illustrator", "Figma", "Photoshop"],
    cover: "/images/projects/p9-park.png",
    coverHue: "#FF75C8",
    span: "col-span-12 md:col-span-4",
    desc: "为上海人民公园设计公共文化 IP 体系：「沪园森语天团」植物拟人 IP 系列（杉小挺 / 竹小韧 / 藤小蔓 / 窝小攀）+ 「海棠国风双娃」国风角色（杉小卫 / 棠小雅）。",
    highlights: [
      "在地文化调研",
      "IP 形象与延展（6 个角色）",
      "视觉语言与配色",
      "应用场景与物料",
    ],
  },
  {
    id: "p10",
    title: "古影新绎非遗文化视觉设计",
    subtitle: "色彩重述古典爱情篇 · 皮影新绎",
    year: "2025",
    role: "视觉设计师",
    type: "视觉设计 / 文化焕新 / 非遗",
    category: "visual-branding",
    tags: [
      "Visual Design",
      "Cultural Heritage",
      "Shadow Play",
      "Folk Art",
      "Branding",
    ],
    tools: ["Illustrator", "Photoshop", "Figma"],
    cover: "/images/projects/p10-heritage-v2.png",
    coverHue: "#C44DFF",
    span: "col-span-12 md:col-span-4",
    desc: "皮影艺术 × 现代设计美学的视觉焕新。「古影新绎」以色彩重述古典爱情故事，将传统皮影造型与现代表达结合，探索非遗在当代视觉语境下的活态传承。",
    highlights: [
      "皮影艺术元素提取",
      "色彩重述古典叙事",
      "现代视觉语言转化",
      "非遗活态传承",
    ],
  },
];

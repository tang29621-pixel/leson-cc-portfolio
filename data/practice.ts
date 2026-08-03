// 练习方式 · 四个维度（v2 · 2026-08-03）
//
// 消费方契约（PracticeSection.tsx）：
//   - 4 个 tab 固定 key：resources / process / habits / workflow
//   - 每 tab 6 条 PracticeItem（与 component 中 0{i+1} 编号对应）
//   - PracticeItem 字段：title / kind / note / link?
//
// v2：
//   - 学习资源保持原内容
//   - 创作过程 / 日常习惯 / 工作流由用户提供的 12 阶段 Personal Workflow 重写
//   - 覆盖产品定义、UX、视觉、AI 协同、开发、动效、测试与作品包装

export type PracticeKind = "resources" | "process" | "habits" | "workflow";

export type PracticeItem = {
  title: string;
  kind: string;          // e.g. "播客", "课程", "工作流"
  note: string;
  link?: string;
};

export type PracticeTab = {
  key: PracticeKind;
  label: string;
  intro: string;
  items: PracticeItem[];
};

export const practiceTabs: PracticeTab[] = [
  {
    key: "resources",
    label: "学习资源",
    intro: "AIGC 时代我更倾向从'生产链路'反推技法，而不是只追工具教程。",
    items: [
      { title: "Three.js Journey",      kind: "课程",   note: "Bruno Simon 的 three.js 教程，PBR / 着色器 / 后处理都讲透了", link: "https://threejs-journey.com" },
      { title: "TouchDesigner 官方 wiki", kind: "文档", note: "查节点参数最权威", link: "https://docs.derivative.ca" },
      { title: "Motion Design School",  kind: "课程",   note: "AE 表达式与动态设计的体系化内容" },
      { title: "B站影视飓风频道",        kind: "频道",   note: "AIGC 影像工作流 + 行业视角", link: "https://space.bilibili.com/946974" },
      { title: "Patrik Hübner",         kind: "作者",   note: "实时视觉 / TouchDesigner 实验" },
      { title: "Are.na",                kind: "工具",   note: "AIGC 作品与灵感收集，替代 Pinterest 的更克制选择", link: "https://are.na" },
    ],
  },
  {
    key: "process",
    label: "创作过程",
    intro: "从问题定义到作品发布，我用一套完整流程连接产品思考、视觉设计、技术实现与内容表达。",
    items: [
      { title: "理解问题",             kind: "Discover",  note: "明确项目背景、目标用户、使用场景、核心痛点与商业目标" },
      { title: "研究与判断",           kind: "Research",  note: "从国内外产品、AI 产品和优秀案例中比较功能、交互、视觉与技术方案" },
      { title: "定义最小产品",         kind: "MVP",       note: "确认必须解决的问题，保留核心功能，主动去掉非必要模块" },
      { title: "搭建体验结构",         kind: "IA / Flow", note: "通过 Site Map 与 User Flow 梳理页面关系、任务路径和关键操作节点" },
      { title: "从线框到视觉",         kind: "UI Design", note: "先验证布局和功能，再建立组件、变量、响应式规则与高保真视觉" },
      { title: "实现、测试与发布",     kind: "Ship",      note: "完成 AI 协同开发、动效与内容制作，经过测试优化后包装为 Case Study" },
    ],
  },
  {
    key: "habits",
    label: "日常习惯",
    intro: "好的结果不是从画面开始，而是来自一系列稳定、可重复的判断习惯。",
    items: [
      { title: "先问为什么",           kind: "思考", note: "开始设计前先确认项目为什么存在，以及真正需要解决什么问题" },
      { title: "先研究再表达",         kind: "研究", note: "用竞品和行业案例建立判断依据，不只依赖个人审美" },
      { title: "优先做减法",           kind: "产品", note: "先完成最关键的 MVP，再判断哪些功能值得进入下一阶段" },
      { title: "先结构后颜色",         kind: "设计", note: "先完成 IA、流程和低保真线框，再进入视觉与动效设计" },
      { title: "设计与开发并行",       kind: "协同", note: "在 Figma 和代码之间持续验证，而不是设计全部结束后才考虑实现" },
      { title: "持续测试与复盘",       kind: "迭代", note: "检查 Bug、动画、交互、性能和移动端体验，并记录项目反思" },
    ],
  },
  {
    key: "workflow",
    label: "工作流",
    intro: "根据项目类型组合产品、设计、AI、开发、三维与影像工具，而不是被单一软件限制。",
    items: [
      { title: "产品定义",             kind: "Product",  note: "Project Brief → Competitive Analysis → MVP" },
      { title: "体验设计",             kind: "UX",       note: "Site Map → User Flow → Wireframe → Prototype" },
      { title: "视觉系统",             kind: "Figma",    note: "Design System、Component、Auto Layout、Variables、Responsive" },
      { title: "AI 协同",              kind: "AI",       note: "ChatGPT、Claude Code、Cursor、Figma MCP，用于 PRD、流程、代码、文案与迭代" },
      { title: "开发与交互",           kind: "Develop",  note: "Next.js、Tailwind、Shadcn、Supabase、Three.js，以及 TouchDesigner、Arduino、OSC" },
      { title: "内容与包装",           kind: "Delivery", note: "AE、PR、达芬奇、UE5 与生成式视频工具，最终形成视频、Case Study 和作品集" },
    ],
  },
];

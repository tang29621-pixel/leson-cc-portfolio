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

// ===== 详情页内容块类型（v4 · 2026-08-04 新增） =====
//
// 消费方契约（src/components/project-detail/ProjectDetailModal.tsx）：
//   - richtext：结构化段落 + 标题 + 列表 + 引用
//   - images：图集（grid / masonry），点击放大用原生 <dialog>
//   - video：bvid（B站） / src（MP4）二选一，复用 data/videos.ts 的 source 模式
//   - pdf：iframe 嵌入，PDF 不存在时显示下载 fallback
//
// 设计意图：每个项目 content[] 可自由组合，呈现方式按作品类型最优选

export type RichTextBlock =
  | { kind: "h2" | "h3"; text: string }
  | { kind: "p"; text: string }
  | { kind: "quote"; text: string; cite?: string }
  | { kind: "ul"; items: string[] };

export type ProjectContentBlock =
  | { type: "richtext"; blocks: RichTextBlock[] }
  | {
      type: "images";
      items: { src: string; alt: string; caption?: string }[];
      layout?: "grid" | "masonry" | "single";
    }
  | {
      type: "video";
      source: "bilibili" | "self" | "placeholder";
      bvid?: string;
      src?: string;
      poster?: string;
      title: string;
      desc?: string;
      aspect?: string; // "16/9"（默认）/ "9/16" / "2/3" 等；竖屏会自动居中并限制宽度
    }
  | { type: "pdf"; src: string; title: string; height?: number };

// 外部链接（百度网盘 / Google Drive / 官网等），渲染在 Modal title block
// url 为 "TODO" 或空字符串时，UI 端会跳过该条不渲染
export type ExternalLink = {
  label: string;          // "百度网盘 · 源文件" / "项目官网" 等
  url: string;            // 完整 URL；占位用 "TODO"
  kind?: "baidu" | "drive" | "site" | "other";  // 用于图标选择
  pwd?: string;           // 提取码（百度网盘用），chip 会显示 "提取码: xxxx"
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
  coverAspect?: string;     // v6：封面宽高比（默认 "16/9"），竖版封面用 "2/3" / "9/16" / "4/5"
  span: string;             // 主页网格跨度
  desc: string;             // 一句介绍
  highlights?: string[];    // 重点展示
  awards?: string[];        // v3：多获奖支持
  featured?: boolean;       // 是否精选（只显示在 /main）
  content?: ProjectContentBlock[]; // v4：详情 Modal 内容块
  externalLinks?: ExternalLink[];  // v5：项目相关外部链接（百度网盘等）
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
    content: [
      {
        type: "video",
        source: "bilibili",
        bvid: "BV1tHMC64EME",
        title: "Cherry Studio V2.0 · 官方发布",
        desc: "UI Motion / Product Film · 2026",
      },
      {
        type: "richtext",
        blocks: [
          { kind: "h2", text: "项目背景" },
          {
            kind: "p",
            text:
              "为智能模型集合软件 Cherry Studio 制作 UI 界面宣传片。目标是把复杂功能（多模型切换 / 对话流 / 插件生态）讲清楚，让用户 30 秒内理解产品价值。",
          },
          { kind: "h3", text: "我的角色" },
          {
            kind: "ul",
            items: [
              "功能流程梳理与脚本分镜",
              "界面动效与转场设计",
              "后期剪辑 / 字幕 / 动态包装",
            ],
          },
        ],
      },
      {
        type: "images",
        items: [
          {
            src: "/images/projects/p1/提出需求.png",
            alt: "Cherry Studio · 提出需求",
            caption: "提出需求 · 自然语言驱动任务",
          },
          {
            src: "/images/projects/p1/视觉生成.png",
            alt: "Cherry Studio · 视觉生成",
            caption: "视觉生成 · AI 出图与多模型调度",
          },
          {
            src: "/images/projects/p1/知识库.png",
            alt: "Cherry Studio · 知识库",
            caption: "知识库 · 结构化管理与召回",
          },
          {
            src: "/images/projects/p1/品牌收束.png",
            alt: "Cherry Studio · 品牌收束",
            caption: "品牌收束 · 视觉一致性管控",
          },
        ],
        layout: "grid",
      },
    ],
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
    content: [
      {
        type: "video",
        source: "bilibili",
        bvid: "BV1fCMo62Ewn",
        title: "Stellar Pulse · 完整版",
        desc: "实时视觉 / 2024",
      },
      {
        type: "richtext",
        blocks: [
          { kind: "h2", text: "创作手记" },
          {
            kind: "p",
            text:
              "一个由用户行为驱动的实时星云粒子系统。",
          },
          {
            kind: "p",
            text:
              "粒子的运动、聚散与光线状态会随着用户输入实时变化，并结合音频数据生成持续演化的视觉形态。",
          },
          {
            kind: "quote",
            text:
              "不是把视频播放出来，而是让画面在那一刻被生成。",
            cite: "创作札记",
          },
        ],
      },
    ],
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
    content: [
      {
        type: "richtext",
        blocks: [
          { kind: "h2", text: "问题" },
          {
            kind: "p",
            text:
              "社区夜跑场景下，跑者对路线、节奏、安全感的需求都被普通地砖忽视。Stride Beacon 把动能发电、LED 路径引导、安全预警与打卡激励，整合进可替换的公共地砖单元。",
          },
          { kind: "h3", text: "系统构成" },
          {
            kind: "ul",
            items: [
              "动能发电模块（每一步都在供电）",
              "LED 路径引导（动态方向 + 速度提示）",
              "穿戴设备联动（心率 / 步频反馈）",
              "夜间安全预警（接近侦测 + 慢速区域）",
            ],
          },
        ],
      },
      {
        type: "images",
        items: [
          {
            src: "/images/projects/p3/render-01.jpg",
            alt: "Stride Beacon 主海报",
            caption: "主海报 · Hero Poster",
          },
        ],
        layout: "single",
      },
      {
        type: "images",
        items: [
          {
            src: "/images/projects/p3/render-02.jpg",
            alt: "Stride Beacon 设计展板",
            caption: "设计展板 · Exhibition Board",
          },
          {
            src: "/images/projects/p3/render-03.jpg",
            alt: "Stride Beacon 设计调研与构思",
            caption: "设计调研与构思 · Research & Concept",
          },
        ],
        layout: "grid",
      },
      {
        type: "pdf",
        src: "/documents/projects/p3/spec.pdf",
        title: "Stridge Beacon · 技术规格说明书",
        height: 620,
      },
      {
        type: "video",
        source: "bilibili",
        bvid: "BV1Mgep6eEeT",
        title: "Stride Beacon · 面向社区夜跑场景",
        desc: "智能运动地砖系统 · 产品演示",
        // aspect 默认 16:9 横屏
      },
    ],
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
    externalLinks: [
      {
        label: "百度网盘 · 源文件",
        url: "https://pan.baidu.com/s/1kao-f7sjS5vV7Ge3QXrEig",
        kind: "baidu",
        pwd: "CICI",
      },
    ],
    content: [
      {
        type: "video",
        source: "bilibili",
        bvid: "BV1qH7p6MEMK",
        title: "REBUILD THE CITY · 完整短片",
        desc: "AIGC Concept Film / 2026",
      },
      {
        type: "richtext",
        blocks: [
          { kind: "h2", text: "概念" },
          {
            kind: "p",
            text:
              "在「未来城市灾难救援」的世界观里，机器人、消防员与城市重建不再是科幻标签，而是具体的人。短片从压迫到紧张再到希望，让科技的角色回归到对人的回应。",
          },
          { kind: "h2", text: "情绪节奏" },
          {
            kind: "ul",
            items: [
              "0:00 — 城市废墟空镜（压抑）",
              "0:30 — 警报与救援集结（紧张）",
              "1:30 — 关键救援行动（紧迫）",
              "2:30 — 城市重启 / 阳光回来（希望）",
            ],
          },
        ],
      },
      {
        type: "images",
        items: [
          {
            src: "/images/projects/p4/分镜图.png",
            alt: "分镜图",
            caption: "分镜图",
          },
          {
            src: "/images/projects/p4/城市废墟空镜.jpg",
            alt: "城市废墟空镜",
            caption: "城市废墟空镜",
          },
          {
            src: "/images/projects/p4/工厂废墟空镜.jpg",
            alt: "工厂废墟空镜",
            caption: "工厂废墟空镜",
          },
        ],
        layout: "masonry",
      },
    ],
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
    content: [
      // 1️⃣ 主海报（视觉门面）
      {
        type: "images",
        items: [
          {
            src: "/images/projects/p5/page-01.jpg",
            alt: "腾创智控品牌视觉规范手册封面",
            caption: "主视觉 · 品牌规范手册封面",
          },
        ],
        layout: "single",
      },

      // 2️⃣ 标志定稿及释义（Logo 概念）
      {
        type: "richtext",
        blocks: [
          { kind: "h2", text: "标志定稿及释义" },
          {
            kind: "p",
            text:
              "该标志以腾创智控首字母「T」与「C」为设计基础，巧妙融合火箭、轨道、海浪与箭头等元素，构建出简洁而富有力量感的品牌符号。",
          },
          {
            kind: "p",
            text:
              "其中，火箭与上升箭头象征突破创新与持续发展；轨道元素体现精准控制与航天科技属性；海浪造型则代表企业立足海洋工程、探索深空未来的发展方向。",
          },
          {
            kind: "quote",
            text: "从海洋走向太空。",
            cite: "腾创智控品牌愿景",
          },
        ],
      },
      {
        type: "images",
        items: [
          {
            src: "/images/projects/p5/page-02.jpg",
            alt: "标志定稿及释义",
            caption: "标志定稿及释义",
          },
        ],
        layout: "single",
      },

      // 3️⃣ 标志墨稿及反白稿
      {
        type: "richtext",
        blocks: [
          { kind: "h2", text: "标志墨稿及反白稿" },
          {
            kind: "p",
            text:
              "为了适应品牌宣发需求，制定墨稿及反白稿，保证标识在外的形象中体现一致性。适用范围主要应用于需要标识墨稿与反白稿的印刷范围内，使用时必须严格按照规范进行。",
          },
        ],
      },
      {
        type: "images",
        items: [
          {
            src: "/images/projects/p5/page-03.jpg",
            alt: "标志墨稿及反白稿",
            caption: "标志墨稿及反白稿 · 白底 / 黑底 / 灰底 / 蓝底",
          },
        ],
        layout: "single",
      },

      // 4️⃣ 图形标准制图
      {
        type: "richtext",
        blocks: [
          { kind: "h2", text: "图形标准制图" },
          {
            kind: "p",
            text:
              "为保持对外形象的高度统一，标志图形在各种环境和材质应用的过程中，采用标准制图方式规范其造型比例、结构、空间距离等位置关系。",
          },
          {
            kind: "p",
            text:
              "本页旨在告知企业形象的使用者认识此标志图形的正确形态，并且为避免错误的使用，不建议进行重绘。",
          },
        ],
      },
      {
        type: "images",
        items: [
          {
            src: "/images/projects/p5/page-04.jpg",
            alt: "图形标准制图",
            caption: "图形标准制图 · 14A × 8A 比例",
          },
        ],
        layout: "single",
      },

      // 5️⃣ 中英文标准字规范
      {
        type: "richtext",
        blocks: [
          { kind: "h2", text: "中英文标准字规范" },
          {
            kind: "p",
            text:
              "为保持对外形象的高度统一，标准字在各种环境和材质应用的过程中，采用标准制图方式规范其造型比例、结构、空间距离等位置关系。本页旨在企业形象的使用者认识此标准字的正确形态，并且为避免错误的使用，不建议进行重绘。",
          },
        ],
      },
      {
        type: "images",
        items: [
          {
            src: "/images/projects/p5/page-05.jpg",
            alt: "中英文标准字规范",
            caption: "中英文标准字规范 · 网格制图",
          },
        ],
        layout: "single",
      },

      // 6️⃣ 横版标志网格制图
      {
        type: "images",
        items: [
          {
            src: "/images/projects/p5/page-06.jpg",
            alt: "横版标志网格制图",
            caption: "横版标志网格制图 · 42A × 15A 比例",
          },
        ],
        layout: "single",
      },

      // 7️⃣ 标准色色阶
      {
        type: "richtext",
        blocks: [
          { kind: "h2", text: "标准色色阶" },
          {
            kind: "p",
            text:
              "标准色是为增加公司视觉识别性而将特定的颜色作为制定用色，是企业形象的基本设计元素之一。标准色对强化企业形象至关重要。",
          },
          {
            kind: "p",
            text:
              "标准色广泛应用于各种传播系统，包括办公文具、广告、多媒体、办公环境、流动性应用、附带品等。",
          },
          {
            kind: "ul",
            items: [
              "腾创蓝 #0F3382 · R:15 G:51 B:130 · C:100 M:91 Y:16 K:0",
              "80% / 60% / 40% / 20% 四档灰阶明度",
            ],
          },
        ],
      },
      {
        type: "images",
        items: [
          {
            src: "/images/projects/p5/page-07.jpg",
            alt: "腾创蓝标准色色阶",
            caption: "腾创蓝 #0F3382 · 色阶应用",
          },
        ],
        layout: "single",
      },

      // 8️⃣ 不同背景色上应用
      {
        type: "richtext",
        blocks: [
          { kind: "h2", text: "标志在不同背景色上应用" },
          {
            kind: "p",
            text:
              "为使企业形象统一，保证标志在有颜色的背景上始终清晰可见。标志应用在不同背景图片上。标志在彩色背景中呈现反白形式使用，在淡色或黑色调上呈现标准形式使用。",
          },
        ],
      },
      {
        type: "images",
        items: [
          {
            src: "/images/projects/p5/page-08.jpg",
            alt: "标志在不同背景色上应用",
            caption: "标志在不同背景色上应用 · 5 种背景适配",
          },
        ],
        layout: "single",
      },

      // 9️⃣ 标志错误使用规范
      {
        type: "richtext",
        blocks: [
          { kind: "h2", text: "标志错误使用规范" },
          {
            kind: "p",
            text:
              "为保持企业标志的完整形态以及对外形象的高度统一，在使用企业标志时应避免如图所示的各种不规范使用样式。",
          },
          {
            kind: "ul",
            items: [
              "禁止变形标志",
              "禁止标识描边",
              "禁止倾斜标志",
              "禁止增加其他元素",
              "禁止模糊标志",
              "禁止在复杂背景上使用",
            ],
          },
        ],
      },
      {
        type: "images",
        items: [
          {
            src: "/images/projects/p5/page-10.jpg",
            alt: "标志错误使用规范",
            caption: "标志错误使用规范 · 6 种禁止情形",
          },
        ],
        layout: "single",
      },

      // 🔟 标志背景明度使用规范
      {
        type: "richtext",
        blocks: [
          { kind: "h2", text: "标志背景明度使用规范" },
          {
            kind: "p",
            text:
              "标志在应用过程中，要注意和标志应用环境的对比关系，确保标志图形的鲜明突出，使受众容易辨认，达到最佳形象传达效果。本页是标志背景明度的应用规范，非特殊情况不得随意改变。",
          },
        ],
      },
      {
        type: "images",
        items: [
          {
            src: "/images/projects/p5/page-11.jpg",
            alt: "标志背景明度使用规范",
            caption: "标志背景明度使用规范 · 10%-100% 对比测试",
          },
        ],
        layout: "single",
      },

      // 🏢 品牌应用与延展（来自 PPT 实拍）
      {
        type: "richtext",
        blocks: [
          { kind: "h2", text: "品牌应用与延展" },
          {
            kind: "p",
            text:
              "完成基础系统后，品牌延展到企业办公环境的视觉落地：建筑外观识别、名片实物制作与配色方案应用。Logo 在不同载体与配色版本下保持高度一致的识别度。",
          },
        ],
      },
      // 建筑外观（最具视觉冲击）
      {
        type: "images",
        items: [
          {
            src: "/images/projects/p5/app-building.jpg",
            alt: "腾创智控办公楼外观实拍",
            caption: "办公楼外观 · 楼顶 Logo 标识实景",
          },
        ],
        layout: "single",
      },
      // 名片实拍集（4 种配色版本）
      {
        type: "images",
        items: [
          {
            src: "/images/projects/p5/app-card-classic.jpg",
            alt: "名片实拍 · 经典黑底款",
            caption: "名片 · 经典黑底款",
          },
          {
            src: "/images/projects/p5/app-card-gradient.jpg",
            alt: "名片实拍 · 紫粉渐变款",
            caption: "名片 · 紫粉渐变款",
          },
          {
            src: "/images/projects/p5/app-card-techblue.jpg",
            alt: "名片实拍 · 科技蓝款",
            caption: "名片 · 科技蓝款",
          },
          {
            src: "/images/projects/p5/app-card-greenblue.jpg",
            alt: "名片实拍 · 青柠绿款",
            caption: "名片 · 青柠绿款",
          },
        ],
        layout: "masonry",
      },

      // 📄 完整 PDF 品牌手册下载
      {
        type: "pdf",
        src: "/documents/projects/p5/brand-manual.pdf",
        title: "腾创智控 · 品牌使用手册 v1.0（完整 12 页）",
        height: 720,
      },
    ],
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
    content: [
      {
        type: "video",
        source: "self",
        src: "/videos/projects/p6-susheng.mp4",
        poster: "/images/projects/p6/scene-01.png",
        title: "塑侵 · 共生",
        desc: "现场装置录制 · TouchDesigner × Kinect 实时交互",
      },
      {
        type: "richtext",
        blocks: [
          { kind: "h2", text: "叙事" },
          {
            kind: "p",
            text:
              "装置默认呈现鱼群模型；当有人靠近时，模型开始被塑料质感的图形「入侵」，挥动双手则触发更激烈的影像变化。观众的每一次互动，都被翻译成关于塑料污染与生态共生的数字叙事。",
          },
          { kind: "h3", text: "技术" },
          {
            kind: "ul",
            items: [
              "Kinect 捕捉人体姿态",
              "TouchDesigner 实时合成",
              "Blender 预制鱼群模型",
            ],
          },
        ],
      },
      {
        type: "images",
        items: [
          {
            src: "/images/projects/p6/scene-01.png",
            alt: "无人时画面",
            caption: "无人时 · 鱼群模型",
          },
          {
            src: "/images/projects/p6/scene-02.png",
            alt: "有人靠近",
            caption: "靠近 · 图形入侵开始",
          },
          {
            src: "/images/projects/p6/scene-03.png",
            alt: "手势触发",
            caption: "挥动双手 · 高潮画面",
          },
        ],
        layout: "grid",
      },
    ],
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
    content: [
      {
        type: "richtext",
        blocks: [
          { kind: "h2", text: "定位" },
          {
            kind: "p",
            text:
              "面向运动恢复场景的智能补水站。Hydrate Smarter, Recover Better. 用户扫码或人脸识别进入，按当日训练量推荐补水方案，机器自动调配电解质浓度、温度与速度。",
          },
          { kind: "h3", text: "硬件系统" },
          {
            kind: "ul",
            items: [
              "多组分电解质仓（钠 / 钾 / 镁 / 钙）",
              "温度控制（4°C · 12°C · 25°C 三档）",
              "出水量自动调节（200 / 400 / 600 ml）",
              "触屏 + 人脸识别双交互",
            ],
          },
        ],
      },
      {
        type: "images",
        items: [
          {
            src: "/images/projects/p7/横版.png",
            alt: "Hydra 整机渲染 · 横版",
            caption: "整机渲染 · 横版",
          },
          {
            src: "/images/projects/p7/x3-展板-改字的大小.png",
            alt: "Hydra x3 展板",
            caption: "x3 展板 · 改字版",
          },
        ],
        layout: "grid",
      },
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
    content: [
      {
        type: "richtext",
        blocks: [
          { kind: "h2", text: "问题" },
          {
            kind: "p",
            text:
              "儿童输液时常因长时间保持姿势、滴速异常、家属与护士往返检查而焦虑。本系统用云朵造型的智能监控终端 + 儿童贴片 + 手机联动，把焦虑翻译成温和的触觉反馈与可读的进度。",
          },
          { kind: "h3", text: "系统构成" },
          {
            kind: "ul",
            items: [
              "云朵监控终端（实时识别滴速 / 进度 / 余量）",
              "儿童触觉贴片（异常时温和震动 + 节奏）",
              "手机端（家长实时同步 + 护士工作站汇总）",
            ],
          },
        ],
      },
      {
        type: "images",
        items: [
          {
            src: "/images/projects/p8/x4.png",
            alt: "智能输液触觉联动系统 · 系统总览",
            caption: "系统总览",
          },
        ],
        layout: "grid",
      },
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
    externalLinks: [
      {
        label: "百度网盘 · IP 设计完整作品集",
        url: "https://pan.baidu.com/s/11tpQ4QSYzkpJweg_xdY7Og",
        kind: "baidu",
        pwd: "CICI",
      },
    ],
    content: [
      {
        type: "richtext",
        blocks: [
          { kind: "h2", text: "项目" },
          {
            kind: "p",
            text:
              "为上海人民公园设计公共文化 IP 体系，包含「沪园森语天团」植物拟人 IP 系列（杉小挺 / 竹小韧 / 藤小蔓 / 窝小攀）与「海棠国风双娃」（杉小卫 / 棠小雅），覆盖线下物料、地图导视、季节限定活动。",
          },
          { kind: "h3", text: "设计要点" },
          {
            kind: "ul",
            items: [
              "在地调研 · 公园文化与上海街区语境",
              "6 个角色 · 性格 / 配色 / 标志物差异",
              "延展物料 · 帆布袋 / 徽章 / 插画地图",
            ],
          },
        ],
      },
      {
        type: "pdf",
        src: "/documents/projects/p9/ip-design.pdf",
        title: "人民公园 IP 设计 · 完整作品集",
        height: 720,
      },
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
    content: [
      {
        type: "richtext",
        blocks: [
          { kind: "h2", text: "方法" },
          {
            kind: "p",
            text:
              "「古影新绎」用色彩重述古典爱情故事，把传统皮影的造型、纹样与现代表达结合。保留皮影侧影轮廓与镂空逻辑，更换色彩体系与构图节奏，让非遗在当代视觉语境里能被读懂、被传播。",
          },
          { kind: "h3", text: "过程" },
          {
            kind: "ul",
            items: [
              "皮影元素提取 · 造型 / 纹样 / 工艺",
              "色彩重述 · 古典叙事 → 现代视觉",
              "物料延展 · 海报 / 包装 / 数字媒介",
            ],
          },
        ],
      },
      {
        type: "images",
        items: [
          {
            src: "/images/projects/p10/皮影主展板.webp",
            alt: "古影新绎 · 主展板",
            caption: "主展板",
          },
          {
            src: "/images/projects/p10/皮影海报1.webp",
            alt: "古影新绎 · 海报 1",
            caption: "皮影海报 · 1",
          },
          {
            src: "/images/projects/p10/皮影海报2.webp",
            alt: "古影新绎 · 海报 2",
            caption: "皮影海报 · 2",
          },
          {
            src: "/images/projects/p10/皮影海报3.webp",
            alt: "古影新绎 · 海报 3",
            caption: "皮影海报 · 3",
          },
        ],
        layout: "masonry",
      },
    ],
  },
  // ====== 飞书深诺 · 设计实习（v4 · 2026-09 新增 p11–p13） ======
  {
    id: "p11",
    title: "Baseball Clash 平面画面生成",
    subtitle: "体育竞技手游 · 投放物料与运营 KV",
    year: "2026",
    role: "实习 · 平面设计 / 视觉",
    type: "商业项目 / 游戏视觉 / 平面投放",
    category: "visual-branding",
    tags: ["Graphic Design", "Game Art", "Ad Creative", "Internship"],
    tools: ["Photoshop", "Figma", "Illustrator"],
    cover: "/images/projects/p11-baseball.png",
    coverHue: "#B91C1C",
    span: "col-span-12 md:col-span-6",
    desc: "为 Baseball Clash 移动端体育竞技游戏制作平面投放画面与营销视觉资产，覆盖商店页素材、社交媒体投放与活动 KV 设计。",
    highlights: [
      "游戏视觉风格探索与延展",
      "商店页 / 落地页 / 投放 banner 设计",
      "活动 KV 与运营素材批量产出",
      "视觉规范制定与复用",
    ],
    externalLinks: [],
    content: [
      {
        type: "richtext",
        blocks: [
          { kind: "h2", text: "项目背景" },
          {
            kind: "p",
            text:
              "Baseball Clash 是一款面向全球市场的体育竞技手游。运营阶段需要持续输出高质量的商店页素材、社交投放 banner 与活动 KV，强调竞技氛围、英雄角色与赛季氛围的统一感。",
          },
          { kind: "h3", text: "我的工作" },
          {
            kind: "ul",
            items: [
              "承接 brief 后拆解视觉关键词（赛事感 / 角色代入 / 节奏冲击）",
              "草图与情绪板 → 配色与版式规范",
              "KV / banner / 商店页套图批量产出",
              "对接投放数据反馈迭代视觉方向",
            ],
          },
        ],
      },
      {
        type: "images",
        items: [
          {
            src: "/images/projects/p11/游戏人物-ai生成宣传图 (1).png",
            alt: "游戏人物-AI生成宣传图",
            caption: "游戏人物-AI生成宣传图",
          },
          {
            src: "/images/projects/p11/游戏人物-ai生成宣传图 (2).png",
            alt: "游戏人物-AI生成宣传图",
            caption: "游戏人物-AI生成宣传图",
          },
          {
            src: "/images/projects/p11/游戏人物-ai生成宣传图 (3).png",
            alt: "游戏人物-AI生成宣传图",
            caption: "游戏人物-AI生成宣传图",
          },
          {
            src: "/images/projects/p11/游戏人物-ai生成宣传图 (4).png",
            alt: "游戏人物-AI生成宣传图",
            caption: "游戏人物-AI生成宣传图",
          },
          {
            src: "/images/projects/p11/游戏人物-ai生成宣传图 (5).png",
            alt: "游戏人物-AI生成宣传图",
            caption: "游戏人物-AI生成宣传图",
          },
          {
            src: "/images/projects/p11/游戏人物-ai生成宣传图 (6).png",
            alt: "游戏人物-AI生成宣传图",
            caption: "游戏人物-AI生成宣传图",
          },
          {
            src: "/images/projects/p11/游戏人物-ai生成宣传图 (7).png",
            alt: "游戏人物-AI生成宣传图",
            caption: "游戏人物-AI生成宣传图",
          },
          {
            src: "/images/projects/p11/游戏人物-ai生成宣传图 (8).png",
            alt: "游戏人物-AI生成宣传图",
            caption: "游戏人物-AI生成宣传图",
          },
        ],
        layout: "masonry",
      },
    ],
  },
  {
    id: "p12",
    title: "傲风电竞椅 · 广告口播制作",
    subtitle: "Aodian · 电竞外设品牌广告视频",
    year: "2026",
    role: "实习 · 广告视频制作 / 后期",
    type: "商业项目 / 广告口播 / 视频制作",
    category: "motion-aigc",
    tags: ["Ad Film", "Voiceover", "Commercial", "Internship"],
    tools: ["After Effects", "Premiere", "DaVinci Resolve"],
    cover: "/images/projects/p12-aodian.png",
    coverHue: "#0F0F0F",
    span: "col-span-12 md:col-span-6",
    desc: "为傲风电竞椅品牌制作广告口播视频。负责脚本分镜、镜头剪辑、动态包装与后期调色，配合口播演员完成最终成片。",
    highlights: [
      "广告脚本与分镜设计",
      "镜头剪辑与节奏把控",
      "动态包装与字幕设计",
      "调色与后期合成",
    ],
    externalLinks: [
      {
        label: "百度网盘 · 成片 & 工程文件",
        url: "https://pan.baidu.com/s/1Xl9aosD_b_ULYr5c4_DTQQ",
        kind: "baidu",
        pwd: "CICI",
      },
    ],
    content: [
      {
        type: "video",
        source: "self",
        src: "/videos/projects/p12-aodian.mp4",
        title: "傲风电竞椅 · 广告口播成片",
        desc: "Ad Film / 2026",
      },
      {
        type: "richtext",
        blocks: [
          { kind: "h2", text: "项目过程" },
          {
            kind: "p",
            text:
              "客户希望 60 秒内讲清傲风电竞椅的 3 个核心卖点：人体工学、RGB 灯效、电竞级耐用。脚本从「选手专注 → 产品特写 → 沉浸体验」三段式切入，配合口播节奏剪辑。",
          },
          { kind: "h3", text: "后期工作流" },
          {
            kind: "ul",
            items: [
              "调色 · 冷色调主调 + 暖色皮肤 + 高饱和 RGB",
              "字幕 · mono 字体 + 关键卖点高亮",
              "包装 · 粒子 / 光线 / 速度线 三层叠加",
              "交付 · 横版主投 + 9:16 竖版二次裁剪",
            ],
          },
        ],
      },
      {
        type: "images",
        items: [
          {
            src: "/images/projects/p12/storyboard-01.jpg",
            alt: "分镜 01",
            caption: "Storyboard · 选手专注",
          },
          {
            src: "/images/projects/p12/storyboard-02.png",
            alt: "分镜 02",
            caption: "Storyboard · 产品特写",
          },
          {
            src: "/images/projects/p12/storyboard-03.jpg",
            alt: "分镜 03",
            caption: "Storyboard · 沉浸体验",
          },
        ],
        layout: "grid",
      },
    ],
  },
  {
    id: "p13",
    title: "DinoAI · AI 广告口播视频",
    subtitle: "AI 工作流驱动的广告视频生产",
    year: "2026",
    role: "实习 · AIGC 视频 / 广告制作",
    type: "商业项目 / AI 广告 / AIGC 视频",
    category: "motion-aigc",
    tags: [
      "AIGC",
      "AI Film",
      "Commercial Video",
      "Prompt Engineering",
      "Internship",
    ],
    tools: ["Midjourney", "Runway", "After Effects", "DaVinci Resolve"],
    cover: "/images/projects/p13-poster.png",
    coverAspect: "2/3",
    coverHue: "#7C3AED",
    span: "col-span-12 md:col-span-6",
    desc: "使用 AIGC 工具链（Midjourney 出图 + Runway 出视频 + AE 后期合成）完成 DinoAI 品牌的广告口播视频，提升广告素材的生产效率与视觉多样性。",
    highlights: [
      "AIGC 图像与视频生成",
      "多版本迭代与提示词工程",
      "后期合成与节奏剪辑",
      "与传统拍摄素材融合",
    ],
    externalLinks: [
      // TODO: 替换为实际百度网盘链接
      { label: "百度网盘 · 成片 & Prompt 工程", url: "TODO", kind: "baidu" },
    ],
    content: [
      {
        type: "video",
        source: "self",
        src: "/videos/projects/p13-dinoai.mp4",
        title: "DinoAI · AI 广告口播成片",
        desc: "AIGC Ad Film / 2026",
        aspect: "9/16",
      },
      {
        type: "richtext",
        blocks: [
          { kind: "h2", text: "AIGC 工作流" },
          {
            kind: "p",
            text:
              "从需求拆解到上线迭代，全流程 9 个阶段环环相扣，每个阶段都直接产出可评审的物料，避免一次性集成才发现问题。",
          },
          { kind: "h3", text: "九步流水线" },
          {
            kind: "ul",
            items: [
              "01 · 需求分析：拆解品牌诉求、目标人群与投放场景，明确转化指标",
              "02 · 创意定位：敲定视觉调性、情绪曲线与核心记忆点",
              "03 · 脚本与分镜：撰写口播文案，绘制每个镜头的画面构图与运镜",
              "04 · 提示词设计：设计生成视频的提示词，对齐分镜的画面控制，制作可执行的 prompt",
              "05 · AI 素材生成：IMAGE NANOBANANA / MJ 出关键帧 → Runway 出视频片段，批量筛选",
              "06 · 剪辑合成：使用剪映以及 AE 按脚本拼接节奏、剪接与转场",
              "07 · 配音与音效：录制 / 合成口播（MiniMax），铺设背景音乐与音效层",
              "08 · 品牌包装：AE 叠加字幕、品牌色板与 logo 露出",
              "09 · 审核迭代：内部评审 → 修改 → 上线投放，持续优化下一版",
            ],
          },
          {
            kind: "quote",
            text: "AIGC 不是替代设计，而是把概念验证的速度拉到分钟级。",
            cite: "实习札记",
          },
        ],
      },
      {
        type: "images",
        items: [
          {
            // TODO: 替换为实际海报文件路径（竖版，2:3 或 9:16 都行）
            src: "/images/projects/p13/poster.png",
            alt: "DinoAI 配套海报",
            caption: "DinoAI · 配套竖版海报（1080×1920 适合 9:16）",
          },
        ],
        layout: "single",
      },
    ],
  },
];

// 音乐 · 最近常听（v2 · 2026-08-02 真实数据）
//
// 消费方契约（MusicSection.tsx）：
//   - playlist.type + playlist.neteaseId → 网易云 iframe URL
//     · type=0：歌单；type=1：单曲
//   - playlist.currentTrack → 黑胶中心标签（≤16 字符，超出截断加 …）
//   - playlist.currentArtist → 黑胶副标（备用）
//   - playlist.externalUrl → iframe 加载失败时的兜底跳转
//   - tracks → 右侧 5-10 首最近常听列表
//
// v2 改：
//   - 8 首占位 → 9 首真实（用户 2026-08-02 提供截图）
//   - 黑胶首推 = Nangilima（Smith & Thell）
//   - iframe 改为单曲嵌入（type=2）
// v3 改（2026-08-02 验证后）：
//   - neteaseId 通过 163 API 验证：1400175732 是 Thomas Vee 的 "10000 Hours"，不是 Nangilima
//   - 正确 ID 是 1813007393
//   - 3 个被截断的艺人名已通过 API 补全（Top Barry, Rapeter / Andrea Bocelli / Thomas Vee）

export type Track = {
  title: string;
  artist: string;
  year?: string;
};

// 网易云媒体 ID + 嵌入类型
//   type: 0 = 歌单 (playlist) | 1 = 专辑 (album) | 2 = 单曲 (track)
// v3：neteaseId 已通过 API 验证 = 1813007393（Nangilima · Smith & Thell）
export const playlist = {
  type: 2 as 0 | 1 | 2,
  neteaseId: "1813007393", // Nangilima - Smith & Thell (API 验证 2026-08-02)
  // 兜底跳转（iframe 失败时显示）
  externalUrl: "https://music.163.com/song?id=1813007393",
  // 当前展示的推荐曲（用作黑胶中心标签）
  currentTrack: "Nangilima",
  currentArtist: "Smith & Thell",
};

export const tracks: Track[] = [
  { title: "Nangilima",            artist: "Smith & Thell" },
  { title: "Today My Life Begins", artist: "Bruno Mars" },
  { title: "In Between The Lines", artist: "Tyrone Wells" },
  { title: "10000 Hours",          artist: "Thomas Vee" },
  { title: "DD backseat",          artist: "Top Barry, Rapeter" },
  { title: "DNA (More Than A Game)", artist: "Andrea Bocelli" },
  { title: "Pasta",                artist: "New Rules" },
  { title: "10,000 Hours",         artist: "Thomas Vee" }, // 同 10000 Hours：API 确认 ID 1400175732 是 Thomas Vee 版
  { title: "阿司匹林",              artist: "王以太" },
];

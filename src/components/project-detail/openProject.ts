// 项目详情 Modal 触发器（仿 ContactModal 的 openContact()）
//
// 用法：
//   import { openProject } from "@/components/project-detail/openProject";
//   <button onClick={() => openProject("p5")}>打开项目详情</button>
//
// 监听方（ProjectDetailModal）订阅 window 的 project:open CustomEvent，
// 从 event.detail.id 读出项目 id，再去 data/projects.ts 查对象。

export const PROJECT_OPEN_EVENT = "project:open";

export function openProject(id: string) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent(PROJECT_OPEN_EVENT, { detail: { id } }),
    );
  }
}
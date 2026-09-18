import MainNav from "@/components/nav/MainNav";
import IntroSection from "@/components/sections/IntroSection";
import ProfileSection from "@/components/sections/ProfileSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ShowreelSection from "@/components/sections/ShowreelSection";
import PracticeSection from "@/components/sections/PracticeSection";
import MusicSection from "@/components/sections/MusicSection";
import ChatFAB from "@/components/chat/ChatFAB";
import ProjectDetailModal from "@/components/project-detail/ProjectDetailModal";

export default function MainPage() {
  return (
    <main className="bg-bg text-text font-body relative">
      <MainNav />

      <IntroSection />
      <ProfileSection />
      <ProjectsSection />
      <SkillsSection />
      <ShowreelSection />
      <PracticeSection />
      <MusicSection />

      {/* Footer */}
      <footer className="relative pt-16 pb-12 rule-top">
        <div aria-hidden className="absolute top-0 inset-x-0 hud-line" />
        <div className="mx-auto max-w-content px-6 md:px-10 lg:px-16">
          <div className="grid-magazine">
            <div className="col-span-12 md:col-span-6">
              <span className="block font-mono text-xs uppercase tracking-overline text-accent mb-2">
                © 2026
              </span>
              <p className="font-display text-2xl uppercase text-text tracking-heading">
                Leson-cc · Portfolio
              </p>
            </div>
            <div className="col-span-12 md:col-span-6 md:text-right mt-6 md:mt-0">
              <p className="font-mono text-xs uppercase tracking-overline text-text-3">
                Built with Next.js · Three.js · Love
              </p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-overline text-text-3">
                Cyber edition · v2 · 2026-08
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* 全局浮动 AI 对话 */}
      <ChatFAB />
      {/* 项目详情 Modal（监听 project:open 事件 · 任何项目卡都触发） */}
      <ProjectDetailModal />
    </main>
  );
}

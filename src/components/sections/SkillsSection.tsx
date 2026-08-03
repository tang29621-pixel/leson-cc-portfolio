"use client";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { skills, services } from "@data/skills";
import { fadeUp, stagger, viewport } from "@/lib/motion";

const sizeByLevel: Record<string, string> = {
  expert: "text-3xl md:text-4xl",
  advanced: "text-xl md:text-2xl",
  intermediate: "text-base md:text-lg",
};

const categoryLabel: Record<string, string> = {
  design: "视觉",
  "3d": "3D",
  code: "代码",
  tool: "工具",
};

export default function SkillsSection() {
  return (
    <section id="skills" className="py-section rule-top">
      <Container>
        <SectionTitle
          index="03"
          eyebrow="CAPABILITIES"
          title="能力与服务方向"
          subtitle="从品牌到动效，从 3D 到落地页。"
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="grid-magazine"
        >
          {/* 技能云 */}
          <motion.div variants={fadeUp} className="col-span-12 md:col-span-7">
            <h3 className="font-mono text-xs uppercase tracking-widest text-muted mb-6">
              工具栈 · Tool Stack
            </h3>
            <div className="flex flex-wrap items-baseline gap-x-5 gap-y-3 leading-tight">
              {skills.map((s) => (
                <span
                  key={s.name}
                  className={`font-serif ${sizeByLevel[s.level]} text-text hover:text-accent transition-colors cursor-default`}
                  title={`${s.name} · ${s.level}`}
                >
                  {s.name}
                </span>
              ))}
            </div>
            <div className="mt-6 flex gap-4 text-xs font-mono text-muted">
              {Object.entries(categoryLabel).map(([k, v]) => (
                <span key={k} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  {v}
                </span>
              ))}
            </div>
          </motion.div>

          {/* 服务方向 */}
          <motion.div variants={fadeUp} className="col-span-12 md:col-span-5 md:pl-8">
            <h3 className="font-mono text-xs uppercase tracking-widest text-muted mb-6">
              服务方向 · Services
            </h3>
            <ul className="space-y-6">
              {services.map((s, i) => (
                <li key={s.title} className="border-t border-line pt-4">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-xs text-muted w-6 shrink-0">
                      0{i + 1}
                    </span>
                    <div>
                      <h4 className="font-serif text-xl text-text">{s.title}</h4>
                      <p className="text-sm text-muted mt-1">{s.desc}</p>
                      <ul className="mt-2 flex flex-wrap gap-2">
                        {s.bullets.map((b) => (
                          <li
                            key={b}
                            className="font-mono text-[10px] uppercase tracking-widest text-muted border border-line px-2 py-0.5"
                          >
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

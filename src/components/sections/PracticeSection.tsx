"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Tabs } from "@/components/ui/Tabs";
import { practiceTabs, type PracticeKind } from "@data/practice";

export default function PracticeSection() {
  const [active, setActive] = useState<PracticeKind>("resources");
  const current = practiceTabs.find((t) => t.key === active)!;

  return (
    <section id="practice" className="py-section rule-top">
      <Container>
        <SectionTitle
          index="05"
          eyebrow="PRACTICE"
          title="练习方式"
          subtitle="资源 / 过程 / 习惯 / 工作流。"
        />

        <Tabs
          tabs={practiceTabs.map((t) => ({ key: t.key, label: t.label }))}
          active={active}
          onChange={setActive}
        />

        <div className="mt-8">
          <p className="text-base text-muted mb-8 max-w-text">{current.intro}</p>

          <AnimatePresence mode="wait">
            <motion.ul
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {current.items.map((it, i) => (
                <li
                  key={i}
                  className="border border-line p-5 hover:border-text transition-colors"
                >
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
                      {it.kind}
                    </span>
                    <span className="font-mono text-[10px] text-muted">
                      0{i + 1}
                    </span>
                  </div>
                  <h4 className="font-serif text-xl text-text">
                    {it.link ? (
                      <a href={it.link} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                        {it.title} ↗
                      </a>
                    ) : (
                      it.title
                    )}
                  </h4>
                  <p className="text-sm text-muted mt-1">{it.note}</p>
                </li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}

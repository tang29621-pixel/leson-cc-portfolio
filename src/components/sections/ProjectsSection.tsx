"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { projects } from "@data/projects";
import { fadeUp, stagger, viewport } from "@/lib/motion";
import { openProject } from "@/components/project-detail/openProject";

export default function ProjectsSection() {
  const featured = projects.filter((p) => p.featured);

  return (
    <section id="projects" className="py-section relative overflow-hidden">
      {/* 顶部 HUD 线 */}
      <div aria-hidden className="absolute top-0 inset-x-0 hud-line" />

      <Container>
        <SectionTitle
          index="02"
          eyebrow="SELECTED WORKS"
          title="精选作品"
          subtitle="近 2 年的一些商业与个人项目。"
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="grid grid-cols-12 gap-6 md:gap-8 auto-rows-[260px]"
        >
          {featured.map((p, i) => (
            <motion.article
              key={p.id}
              variants={fadeUp}
              role="button"
              tabIndex={0}
              onClick={() => openProject(p.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openProject(p.id);
                }
              }}
              aria-label={`查看 ${p.title} 项目详情`}
              className={`group relative overflow-hidden border border-line bg-surface1 ${p.span} cursor-pointer hover:border-accent hover:shadow-neon-primary focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg transition-all duration-normal`}
            >
              {/* 封面图（coverHue 作为加载占位色） */}
              <Image
                src={p.cover}
                alt={p.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={70}
                priority={i === 0}
                loading={i === 0 ? "eager" : "lazy"}
                className="object-cover opacity-90 group-hover:opacity-50 transition-opacity duration-normal"
                style={{ backgroundColor: p.coverHue }}
              />
              {/* 顶部渐变（提升文字可读性） */}
              <div className="absolute inset-0 bg-gradient-to-b from-bg/40 via-transparent to-bg/90 pointer-events-none" />

              {/* 文字角标 */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none">
                <span className="font-mono text-xs uppercase tracking-overline text-text">
                  {p.year} · {p.id.toUpperCase()}
                </span>
                <span className="font-mono text-xs uppercase tracking-overline text-text">
                  {p.tags.slice(0, 2).join(" / ")}
                </span>
              </div>

              {/* hover 元信息 */}
              <div className="absolute inset-0 flex flex-col justify-between p-6 bg-bg/85 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-normal">
                <div className="flex items-start justify-between">
                  <span className="font-mono text-xs uppercase tracking-overline text-text-3">
                    {p.year} · {p.role}
                  </span>
                  <ArrowUpRight size={16} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-display text-2xl md:text-3xl text-text leading-tight uppercase">
                    {p.title}
                  </h3>
                  {p.subtitle && (
                    <p className="text-sm text-text-3 mt-1 font-heading">{p.subtitle}</p>
                  )}
                  <p className="mt-3 text-sm text-text-2 max-w-md leading-relaxed whitespace-pre-line">{p.desc}</p>
                  {p.highlights && p.highlights.length > 0 && (
                    <ul className="mt-3 space-y-1 text-xs text-text-3 max-w-md">
                      {p.highlights.slice(0, 4).map((h, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-accent">·</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {p.awards && p.awards.length > 0 && (
                    <ul className="mt-2 space-y-0.5">
                      {p.awards.map((a) => (
                        <li
                          key={a}
                          className="font-mono text-[10px] uppercase tracking-overline text-accent"
                        >
                          ✦ {a}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.tools.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] uppercase tracking-overline text-text-3 border border-line px-2 py-0.5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 md:mt-16 flex justify-center"
        >
          <Link
            href="/works"
            className="group inline-flex items-center gap-3 border border-accent bg-primary-cta px-8 py-4 font-heading text-xs uppercase tracking-label text-text-inv transition-all duration-normal hover:shadow-neon-primary hover:-translate-y-0.5"
          >
            <span>View All Works</span>
            <span className="opacity-70">·</span>
            <span>查看全部作品</span>
            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}

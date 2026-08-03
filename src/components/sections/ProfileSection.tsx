"use client";
/**
 * #02 Profile · 个人档案（v1 · 2026-08-03 新增）
 *
 * 方案一：编辑式个人档案
 *   - 左侧 5 col：个人照片（4:5 竖版 + 状态标签）
 *   - 右侧 7 col：姓名（中英）、身份、tagline、介绍、location / status + Resume / Contact 按钮
 *   - 下方三段：Education / Experience / Core Competencies
 *
 * 设计纪律：
 *   - 不使用主观能力百分比
 *   - 80% 黑白文字 + 15% 灰边框 + 5% 粉色 accent
 *   - 沿用 grid-magazine 12 栏栅格、rule-top 分割、SectionTitle 风格
 *   - 照片缺失时显示占位（提示用户提供图片）
 */

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, FileText } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Tag } from "@/components/ui/Tag";
import { openContact } from "@/components/contact/ContactModal";
import { fadeUp, stagger, viewport } from "@/lib/motion";
import {
  profileMeta,
  profileEducation,
  profileExperience,
  coreCompetencies,
  currentlyExploring,
} from "@data/profile-section";

export default function ProfileSection() {

  return (
    <section id="profile" className="py-section relative overflow-hidden">
      <div aria-hidden className="absolute top-0 inset-x-0 hud-line" />

      <Container>
        <SectionTitle
          index="02"
          eyebrow="PERSONAL ARCHIVE · 2026"
          title="个人档案"
          subtitle="个人照片 · 背景 · 学习与项目经历。"
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="grid grid-cols-12 gap-6 md:gap-10"
        >
          {/* ===== 左：个人照片 ===== */}
          <motion.div variants={fadeUp} className="col-span-12 md:col-span-5">
            <div className="relative aspect-[4/5] border border-line bg-surface1 overflow-hidden">
              {profileMeta.photo.placeholder ? (
                <PlaceholderPortrait />
              ) : (
                <Image
                  src={profileMeta.photo.src}
                  alt={profileMeta.photo.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  quality={85}
                  className="object-cover"
                />
              )}

              {/* 状态点（左上） */}
              <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-overline bg-bg/70 backdrop-blur px-2 py-1 text-text-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                <span>Available</span>
              </div>

              {/* 照片角标（右下） */}
              <div className="absolute bottom-3 right-3 z-10 font-mono text-[10px] uppercase tracking-overline text-text-2 bg-bg/70 backdrop-blur px-2 py-1">
                ID · LESON-CC_2026
              </div>
            </div>

            {/* 联系方式按钮组（移动端放在照片下方） */}
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href={profileMeta.resumeHref}
                download
                className="inline-flex items-center justify-center gap-2 h-12 px-5 font-heading uppercase tracking-label text-sm border border-line bg-transparent text-text hover:border-accent hover:text-accent hover:shadow-neon-primary transition-all"
              >
                <FileText size={14} />
                Resume
                <ArrowUpRight size={14} />
              </Link>
              <Link
                href={profileMeta.portfolioHref}
                download
                className="inline-flex items-center justify-center gap-2 h-12 px-5 font-heading uppercase tracking-label text-sm border border-line bg-transparent text-text hover:border-accent hover:text-accent hover:shadow-neon-primary transition-all"
              >
                <FileText size={14} />
                Portfolio
                <ArrowUpRight size={14} />
              </Link>
              <button
                type="button"
                onClick={openContact}
                className="inline-flex items-center justify-center gap-2 h-12 px-5 font-heading uppercase tracking-label text-sm bg-primary-cta text-text-inv shadow-neon-primary hover:translate-x-[2px] hover:-translate-y-[2px] hover:brightness-110 transition-all"
              >
                <Mail size={14} />
                Contact
                <ArrowUpRight size={14} />
              </button>
            </div>
          </motion.div>

          {/* ===== 右：个人介绍 ===== */}
          <motion.div variants={fadeUp} className="col-span-12 md:col-span-7 flex flex-col">
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted">
              / 01 · Identity
            </p>

            <h3 className="mt-2 font-display uppercase text-text">
              <span className="block text-title leading-[1.05]">
                {profileMeta.nameEn}
              </span>
              <span className="block font-serif text-2xl md:text-3xl text-text-2 mt-1">
                {profileMeta.nameZh}
              </span>
            </h3>

            <p className="mt-3 font-mono text-[10px] uppercase tracking-overline text-accent">
              {profileMeta.role}
            </p>

            <p className="mt-5 font-heading text-lg text-text leading-relaxed">
              {profileMeta.tagline}
            </p>
            <p className="mt-1 text-sm text-text-3 font-heading">
              {profileMeta.taglineEn}
            </p>

            <div className="mt-5 space-y-3 text-sm text-text-2 leading-relaxed max-w-text">
              {profileMeta.intro.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>

            {/* Location / Status */}
            <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-line pt-4 max-w-md">
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-overline text-text-3">
                  Location
                </dt>
                <dd className="mt-1 text-sm text-text">{profileMeta.location}</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-overline text-text-3">
                  Status
                </dt>
                <dd className="mt-1 space-y-1">
                  {profileMeta.status.map((s) => (
                    <p
                      key={s}
                      className="text-sm text-text flex items-center gap-1.5"
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full inline-block ${
                          s.includes("Internship") ? "bg-amber-500" : "bg-emerald-500"
                        }`}
                      />
                      {s}
                    </p>
                  ))}
                </dd>
              </div>
            </dl>
          </motion.div>

          {/* ===== 下方三段：Education / Experience / Core Competencies ===== */}
          <motion.div
            variants={fadeUp}
            className="col-span-12 mt-2 grid grid-cols-12 gap-6 md:gap-10"
          >
            {/* Education */}
            <div className="col-span-12 md:col-span-6 border-t border-line pt-6">
              <p className="font-mono text-[10px] uppercase tracking-overline text-accent mb-4">
                // Education
              </p>
              {profileEducation.map((e) => (
                <div key={e.school}>
                  <p className="font-mono text-xs text-text-3">{e.period}</p>
                  <h4 className="mt-1 font-display text-xl uppercase text-text">
                    {e.school}
                  </h4>
                  <p className="text-sm text-text-2">{e.degree}</p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {e.focus.map((f) => (
                      <Tag key={f}>{f}</Tag>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Experience */}
            <div className="col-span-12 md:col-span-6 border-t border-line pt-6">
              <p className="font-mono text-[10px] uppercase tracking-overline text-accent mb-4">
                // Experience
              </p>
              {profileExperience.map((x) => (
                <div key={x.company}>
                  <p className="font-mono text-xs text-text-3">{x.period}</p>
                  <h4 className="mt-1 font-display text-xl uppercase text-text">
                    {x.company}
                  </h4>
                  <p className="text-sm text-text-2">{x.role}</p>
                  <ul className="mt-3 space-y-1 text-sm text-text-2 max-w-md">
                    {x.scope.map((s) => (
                      <li key={s} className="flex gap-2">
                        <span className="text-accent">·</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Core Competencies */}
            <div className="col-span-12 border-t border-line pt-6">
              <p className="font-mono text-[10px] uppercase tracking-overline text-accent mb-4">
                // Core Competencies
              </p>
              <ul className="flex flex-wrap gap-2">
                {coreCompetencies.map((c) => (
                  <li key={c}>
                    <Tag>{c}</Tag>
                  </li>
                ))}
              </ul>
            </div>

            {/* Currently Exploring + CTA */}
            <div className="col-span-12 border-t border-line pt-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-overline text-accent mb-3">
                  // Currently Exploring
                </p>
                <p className="font-heading text-base text-text">
                  {currentlyExploring.join(" · ")}
                </p>
              </div>
              <Link
                href="#projects"
                className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-overline text-text-3 hover:text-accent transition-colors"
              >
                View Selected Works <ArrowUpRight size={12} />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

/**
 * 占位肖像：当用户还没补图时显示一个带骨架与提示的占位，
 * 避免页面因为 404 出现破图，也提醒用户该位置需要替换为真实照片。
 */
function PlaceholderPortrait() {
  return (
    <div
      className="absolute inset-0 grid place-items-center"
      style={{
        background:
          "radial-gradient(ellipse at center, #1D1428 0%, #0E0B15 60%, #05050A 100%)",
      }}
    >
      <div className="text-center px-6">
        <p className="font-mono text-[10px] uppercase tracking-overline text-text-3 mb-2">
          [ Portrait Placeholder ]
        </p>
        <p className="font-serif text-2xl text-text leading-snug">
          Add personal photo
        </p>
        <p className="mt-2 text-xs text-muted">
          建议 4:5 竖版，放到{" "}
          <code className="text-accent">public/images/profile/portrait.jpg</code>
        </p>
      </div>
    </div>
  );
}

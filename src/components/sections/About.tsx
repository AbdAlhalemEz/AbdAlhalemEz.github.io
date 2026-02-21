"use client";

import { aboutText, education, certifications, volunteerWork } from "@/data/portfolio";
import SectionHeading from "@/components/SectionHeading";
import SectionWrapper from "@/components/SectionWrapper";
import { FiAward, FiHeart, FiBookOpen } from "react-icons/fi";

export default function About() {
  return (
    <section id="about" className="relative py-24 px-4 bg-grid bg-fixed opacity-100 overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-accent/3 rounded-full blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-5xl relative">
        <SectionWrapper>
          <SectionHeading id="about-heading" title="About Me" subtitle="Who I am and what I do" />
        </SectionWrapper>

        {/* Bio */}
        <SectionWrapper delay={0.15}>
          <div className="glass-card terminal-window max-w-3xl mx-auto shadow-2xl">
            <div className="terminal-header">
              <div className="dot dot-red" />
              <div className="dot dot-yellow" />
              <div className="dot dot-green" />
              <span className="ml-2 text-[10px] font-mono text-muted uppercase tracking-widest">readme.md — bio</span>
            </div>
            <div className="p-4 sm:p-6 space-y-4 text-xs sm:text-base leading-relaxed font-mono">
              {aboutText.map((p, i) => (
                <p key={i} className="text-muted"><span className="text-accent-game">{"# "}</span>{p}</p>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* Education + Certs + Volunteer — card grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 font-mono">
          {/* Education */}
          <SectionWrapper delay={0.2}>
            <div className="glass-card terminal-window h-full">
              <div className="terminal-header !bg-accent/5 !border-b-accent/10">
                <FiBookOpen className="text-accent h-4 w-4" />
                <span className="ml-2 text-[10px] font-bold text-accent uppercase tracking-widest">education.log</span>
              </div>
              <div className="p-5 space-y-6">
                {education.map((e, i) => (
                  <div key={i} className="relative pl-4 border-l border-accent/20">
                    <p className="font-bold text-foreground text-xs">{e.degree}</p>
                    <p className="text-[10px] text-muted mt-1 leading-tight">
                      @{e.school}
                    </p>
                    <p className="text-[10px] text-accent/60 mt-0.5 tracking-tighter">[{e.period}]</p>
                  </div>
                ))}
              </div>
            </div>
          </SectionWrapper>

          {/* Certifications */}
          <SectionWrapper delay={0.3}>
            <div className="glass-card terminal-window h-full">
              <div className="terminal-header !bg-accent-game/5 !border-b-accent-game/10">
                <FiAward className="text-accent-game h-4 w-4" />
                <span className="ml-2 text-[10px] font-bold text-accent-game uppercase tracking-widest">certs.sys</span>
              </div>
              <div className="p-5 space-y-3">
                {certifications.map((c, i) => (
                  <div key={i} className="flex gap-2 text-[11px] text-muted leading-tight group">
                    <span className="text-accent-game shrink-0">√</span>
                    <span className="group-hover:text-accent-game transition-colors">{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </SectionWrapper>

          {/* Volunteer */}
          <SectionWrapper delay={0.4}>
            <div className="glass-card terminal-window h-full">
              <div className="terminal-header !bg-pink-400/5 !border-b-pink-400/10">
                <FiHeart className="text-pink-400 h-4 w-4" />
                <span className="ml-2 text-[10px] font-bold text-pink-400 uppercase tracking-widest">volunteer.init</span>
              </div>
              <div className="p-5 space-y-5">
                {volunteerWork.slice(0, 2).map((v, i) => (
                  <div key={i} className="group">
                    <p className="font-bold text-foreground text-[11px] group-hover:text-pink-400 transition-colors uppercase tracking-tight">{v.role}</p>
                    <p className="text-[10px] text-muted/60 mt-0.5 italic">{v.org}</p>
                    <p className="mt-1 text-[10px] text-muted/80 leading-normal border-t border-muted/5 pt-1.5">{v.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </SectionWrapper>
        </div>

        {/* Quick facts bar */}
        <SectionWrapper delay={0.5}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-mono">
            {[
              { label: "IP", value: "819.923.8819" },
              { label: "LOC", value: "YOW/GAT" },
              { label: "CITIZEN", value: "CA_TRUE" },
              { label: "SECURITY", value: "LEVEL_SECRET" },
              { label: "LANG", value: "['EN', 'AR']" },
            ].map((fact, i) => (
              <span
                key={i}
                className="flex items-center gap-1.5 rounded bg-accent/5 px-3 py-1 text-[10px] text-muted border border-accent/10 hover:border-accent/30 hover:text-accent transition-all cursor-default"
              >
                <span className="text-accent/60 font-bold">{fact.label}:</span> {fact.value}
              </span>
            ))}
          </div>
        </SectionWrapper>
      </div>
    </section>
  );
}

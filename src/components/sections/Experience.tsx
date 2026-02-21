"use client";

import { useEffect, useState } from "react";
import { experience } from "@/data/portfolio";
import SectionHeading from "@/components/SectionHeading";
import SectionWrapper from "@/components/SectionWrapper";
import { FiGitCommit } from "react-icons/fi";

function CommitSHA() {
  const [sha, setSha] = useState("000000");

  useEffect(() => {
    // Generate a stable-looking SHA client-side to avoid hydration mismatch
    setSha(Math.random().toString(16).substring(2, 8));
  }, []);

  return <span>{sha}</span>;
}

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 px-4 bg-dot opacity-100 overflow-hidden">
      <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-accent/3 rounded-full blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-4xl relative">
        <SectionWrapper>
          <SectionHeading
            id="experience-heading"
            title="Experience"
            subtitle="Professional journey across IT support, QA, and development"
          />
        </SectionWrapper>

        {/* Timeline */}
        <div className="relative ml-2 sm:ml-6 border-l-2 border-dashed border-accent/20 pl-6 sm:pl-10 space-y-10">
          {experience.map((exp, i) => (
            <SectionWrapper key={i} delay={i * 0.12}>
              <div className="relative group">
                {/* Git-like dot */}
                <div className="absolute -left-[2.35rem] sm:-left-[3.45rem] top-1 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-card border border-accent/30 text-accent group-hover:bg-accent/10 group-hover:scale-110 transition-all duration-300">
                  <FiGitCommit className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>

                <div className="terminal-window shadow-xl transition-all duration-300 group-hover:border-accent group-hover:shadow-accent/5">
                  <div className="terminal-header flex justify-between items-center">
                    <div className="flex gap-1.5 items-center">
                      <div className="dot dot-red" />
                      <div className="dot dot-yellow" />
                      <div className="dot dot-green" />
                      <span className="ml-2 text-[9px] sm:text-[10px] font-mono text-muted uppercase tracking-widest truncate max-w-[120px] sm:max-w-none">
                        {exp.company.replace(/\s+/g, '_').toLowerCase()}.git
                      </span>
                    </div>
                    <span className="text-[9px] font-mono text-muted/60 hidden md:block uppercase">SHA: <CommitSHA /></span>
                  </div>

                  <div className="p-4 sm:p-6 font-mono">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 border-b border-muted/10 pb-4 mb-4">
                      <div>
                        <h3 className="text-sm sm:text-base font-bold text-foreground">
                          <span className="text-accent underline decoration-accent/20">git</span> commit: {exp.role}
                        </h3>
                        <p className="text-[10px] sm:text-xs text-accent-game mt-1 font-bold">--origin {exp.company}</p>
                      </div>
                      <div className="sm:text-right text-[9px] sm:text-[10px] text-muted shrink-0 space-y-0.5">
                        <p className="font-bold opacity-75">[{exp.period}]</p>
                        <p className="flex items-center gap-1 sm:justify-end opacity-75">
                          <span className="text-accent/50 underline decoration-accent/10">NODE:</span> {exp.location}
                        </p>
                      </div>
                    </div>

                    <ul className="space-y-3">
                      {exp.bullets.map((b, bi) => (
                        <li key={bi} className="flex gap-2.5 text-[11px] sm:text-[13px] text-muted/90 leading-relaxed group/item">
                          <span className="text-accent shrink-0 font-bold">$</span>
                          <span className="group-hover/item:text-foreground transition-colors">{b}</span>
                        </li>
                      ))}
                      <li className="flex gap-3 text-[11px] text-accent font-bold opacity-0 group-hover:opacity-100 transition-opacity animate-pulse">
                        <span>$</span>
                        <span className="typed-cursor !w-2" />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </SectionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef, useEffect, useState } from "react";
import { skillGroups } from "@/data/portfolio";
import SectionHeading from "@/components/SectionHeading";
import SectionWrapper from "@/components/SectionWrapper";

function SkillBar({ name, level }: { name: string; level: number }) {
  const barRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (barRef.current) observer.observe(barRef.current);
    return () => observer.disconnect();
  }, []);

  // Responsive slot counts
  const [slots, setSlots] = useState(20);

  useEffect(() => {
    const updateSlots = () => {
      setSlots(window.innerWidth < 400 ? 12 : 20);
    };

    // Defer the initial calculation to move it out of the render cycle
    const timeout = setTimeout(updateSlots, 0);

    window.addEventListener("resize", updateSlots);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", updateSlots);
    };
  }, []);

  const totalSlots = slots;
  const filledSlots = Math.round((level / 100) * totalSlots);

  return (
    <div ref={barRef} className="group font-mono">
      <div className="mb-2 flex items-center justify-between text-xs sm:text-sm">
        <span className="text-foreground font-bold tracking-tight">
          <span className="text-accent underline decoration-accent/20 underline-offset-4">task</span> {name}
        </span>
        <span className="text-accent/60 text-[10px] font-bold">
          {level}%
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-muted text-[10px] sm:text-xs tracking-tighter shrink-0 flex gap-[1px] sm:gap-[2px]">
          [
          {Array.from({ length: totalSlots }).map((_, i) => (
            <span
              key={i}
              className={`w-[5px] sm:w-[6px] h-3 rounded-[1px] transition-all duration-700 ${visible && i < filledSlots
                ? "bg-accent shadow-[0_0_8px_rgba(56,189,248,0.4)]"
                : "bg-muted/10"
                }`}
              style={{ transitionDelay: visible ? `${i * 30}ms` : '0ms' }}
            />
          ))}
          ]
        </span>
        <span className={`text-[9px] font-bold tracking-tighter transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          {visible ? (level === 100 ? 'SUCCESS' : 'DONE') : 'PENDING'}
        </span>
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 px-4 bg-grid bg-fixed overflow-hidden">
      <div className="absolute inset-0 dot-grid-bg opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent-game/3 rounded-full blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-6xl relative">
        <SectionWrapper>
          <SectionHeading
            id="skills-heading"
            title="Skills & Technologies"
            subtitle="Current tech stack and proficiency metrics"
          />
        </SectionWrapper>

        <div className="grid gap-6 sm:grid-cols-2">
          {skillGroups.map((group, gi) => (
            <SectionWrapper key={group.category} delay={gi * 0.1}>
              <div className="terminal-window shadow-xl transition-all duration-300 hover:shadow-accent-game/5">
                <div className="terminal-header flex items-center gap-2">
                  <div className="dot dot-red" />
                  <div className="dot dot-yellow" />
                  <div className="dot dot-green" />
                  <span className="ml-2 text-[10px] font-mono text-muted uppercase tracking-widest flex items-center gap-2">
                    <span className="text-lg">{group.icon}</span>
                    {group.category.toLowerCase().replace(/\s+/g, '_')}.conf
                  </span>
                </div>
                <div className="p-6 space-y-5">
                  {group.skills.map((s) => (
                    <SkillBar key={s.name} name={s.name} level={s.level} />
                  ))}
                </div>
                <div className="bg-muted/5 p-2 px-6 border-t border-muted/10 font-mono text-[9px] text-muted/60 overflow-hidden whitespace-nowrap">
                  system: loading dependencies... scanning ports... 200 OK
                </div>
              </div>
            </SectionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}

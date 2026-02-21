"use client";

import { useState, useEffect } from "react";
import { personalInfo } from "@/data/portfolio";
import { FiLinkedin, FiGithub, FiMail, FiHeart, FiArrowUp, FiTerminal } from "react-icons/fi";

export default function Footer() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const year = mounted ? new Date().getFullYear() : "2024";
  const dateStr = mounted ? new Date().toLocaleDateString() : "PENDING";

  return (
    <footer className="relative border-t border-muted/5 px-4 py-12 bg-secondary/50" suppressHydrationWarning>
      {/* Gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 text-center">
        {/* Back to top */}
        <button
          onClick={scrollToTop}
          className="group flex flex-col items-center gap-2 text-muted hover:text-accent transition-all animate-bounce"
          aria-label="Back to top"
        >
          <span className="rounded-lg border border-muted/15 p-2 group-hover:border-accent/30 group-hover:bg-accent/5 transition-all duration-300 shadow-lg">
            <FiArrowUp className="h-4 w-4" />
          </span>
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase opacity-60 group-hover:opacity-100 transition-opacity">GOTO_TOP</span>
        </button>

        {/* Console-like social box */}
        <div className="flex items-center gap-4 terminal-window !rounded-full px-6 py-2 bg-card/80 shadow-xl border-accent/10">
          <FiTerminal className="text-accent h-4 w-4" />
          <div className="h-4 w-px bg-muted/20 mx-2" />
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted hover:text-accent transition-all hover:scale-125"
          >
            <FiLinkedin className="h-4 w-4" />
          </a>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-muted hover:text-accent transition-all hover:scale-125"
          >
            <FiGithub className="h-4 w-4" />
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            aria-label="Email"
            className="text-muted hover:text-accent transition-all hover:scale-125"
          >
            <FiMail className="h-4 w-4" />
          </a>
        </div>

        <div className="space-y-3 font-mono">
          <p className="text-[10px] text-muted tracking-widest uppercase font-bold">
            &copy; {year} {personalInfo.name.replace(/\s+/g, '_').toUpperCase()}
          </p>
          <div className="flex items-center justify-center gap-2 text-[9px] text-muted/40 uppercase tracking-tighter">
            <span>Built_with</span>
            <FiHeart className="h-2 w-2 text-pink-500 animate-pulse" />
            <span>NextJS.v16 + TailwindCSS.v4</span>
          </div>
          <div className="text-[8px] text-muted/20 italic">
            -- last_deployed: {dateStr} --
          </div>
        </div>
      </div>
    </footer>
  );
}

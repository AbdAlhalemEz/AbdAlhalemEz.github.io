"use client";

import { useEffect, useState, useRef } from "react";
import { personalInfo, stats } from "@/data/portfolio";
import { FiDownload, FiMail, FiChevronDown, FiGithub, FiLinkedin, FiTerminal } from "react-icons/fi";
import { motion } from "framer-motion";

function TypeWriter({ texts, speed = 80 }: { texts: string[]; speed?: number }) {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    const current = texts[textIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && charIndex < current.length) {
      timeout = setTimeout(() => {
        setDisplayText(current.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, speed);
    } else if (!isDeleting && charIndex === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayText(current.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      }, speed / 2);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % texts.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, texts, speed]);

  return (
    <span className="font-mono">
      {displayText}
      <span className="typed-cursor" />
    </span>
  );
}

function CountUp({ target, duration = 2000 }: { target: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  const numericValue = parseInt(target.replace(/\D/g, ""));
  const suffix = target.replace(/\d/g, "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * numericValue));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [numericValue, duration, target]);

  return (
    <span ref={ref} className="font-mono">
      {count}
      {suffix}
    </span>
  );
}

export default function Hero() {
  const roles = [
    "IT Support Technician",
    "Software Developer",
    "QA Analyst",
    "Indie Game Developer",
  ];

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-16 bg-dot opacity-100"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="text-[10px] font-mono font-medium text-emerald-400 uppercase tracking-widest">
            STATUS: Ready to Deploy
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl font-extrabold leading-tight sm:text-5xl lg:text-7xl px-2"
        >
          <span className="text-foreground">dev init </span>
          <span className="gradient-text">{personalInfo.name.split(" ")[0]}</span>
        </motion.h1>

        {/* Typewriter role */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-4 text-lg sm:text-2xl lg:text-3xl font-semibold text-foreground/80 h-10 flex items-center justify-center gap-2 sm:gap-3"
        >
          <FiTerminal className="text-accent h-5 w-5 sm:h-6 sm:w-6" />
          <TypeWriter texts={roles} />
        </motion.div>

        {/* Terminal Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 mx-auto w-full max-w-2xl terminal-window text-left shadow-2xl overflow-hidden"
        >
          <div className="terminal-header">
            <div className="dot dot-red" />
            <div className="dot dot-yellow" />
            <div className="dot dot-green" />
            <span className="ml-2 text-[9px] sm:text-[10px] font-mono text-muted uppercase tracking-wider">bash — profile.sh</span>
          </div>
          <div className="p-4 sm:p-6 font-mono text-xs sm:text-base leading-relaxed overflow-hidden">
            <div className="flex gap-2 sm:gap-3">
              <span className="text-accent-game shrink-0">➜</span>
              <p className="text-muted italic flex-1">
                {personalInfo.tagline}
              </p>
            </div>
            <div className="mt-4 flex gap-2 sm:gap-3">
              <span className="text-accent-game shrink-0">➜</span>
              <div className="flex flex-wrap gap-x-3 gap-y-2">
                <span className="text-accent underline underline-offset-4 text-[10px] sm:text-sm">#bilingual</span>
                <span className="text-accent underline underline-offset-4 text-[10px] sm:text-sm">#cs_honours</span>
                <span className="text-accent underline underline-offset-4 text-[10px] sm:text-sm">#qa_expert</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-3 px-4"
        >
          <a
            href={personalInfo.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shine inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-game px-8 py-3.5 text-sm font-semibold text-white dark:text-[#050816] shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:scale-105 transition-all duration-300"
          >
            <FiDownload className="h-4 w-4" /> CAT RESUME.PDF
          </a>
          <a
            href="#contact"
            className="font-mono inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-accent/20 bg-accent/5 px-8 py-3.5 text-sm font-semibold text-accent hover:bg-accent/10 hover:border-accent/40 transition-all duration-300"
          >
            ./contact_me.sh
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 max-w-3xl mx-auto px-2"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="glass-card rounded-xl p-3 sm:p-4 text-center group"
            >
              <p className="text-xl sm:text-3xl font-bold gradient-text">
                <CountUp target={stat.value} duration={2000 + i * 300} />
              </p>
              <p className="mt-1 text-[8px] sm:text-[10px] font-mono text-muted uppercase tracking-tighter group-hover:text-accent transition-colors">
                {stat.label.replace(" ", "_")}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-14 flex justify-center"
        >
          <a
            href="#about"
            aria-label="Scroll to About section"
            className="group flex flex-col items-center gap-2 text-muted/50 hover:text-accent transition-colors"
          >
            <span className="text-[10px] font-mono font-medium tracking-widest uppercase">GOTO(ABOUT)</span>
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <FiChevronDown className="h-5 w-5" />
            </motion.span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

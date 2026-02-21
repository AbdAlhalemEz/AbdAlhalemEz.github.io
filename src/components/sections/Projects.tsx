"use client";

import { useState } from "react";
import { projects, type Project } from "@/data/portfolio";
import SectionHeading from "@/components/SectionHeading";
import SectionWrapper from "@/components/SectionWrapper";
import { FiExternalLink, FiGithub, FiFolder, FiFileText, FiCpu, FiMonitor, FiSmartphone, FiPlay } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

function Badge({ label }: { label: string }) {
  return (
    <span className="inline-block rounded border border-muted/10 bg-muted/5 px-2 py-0.5 text-[9px] font-mono font-bold text-muted uppercase group-hover:border-accent group-hover:text-accent transition-colors">
      {label}
    </span>
  );
}

function TypeIcon({ type }: { type: Project["type"] }) {
  const icons: Record<string, any> = {
    "IT Tool": <FiCpu className="text-emerald-400" />,
    "Web App": <FiMonitor className="text-blue-400" />,
    Game: <FiPlay className="text-purple-400" />,
    "Educational Game": <FiPlay className="text-pink-400" />,
    "Mobile App": <FiSmartphone className="text-orange-400" />,
  };
  return icons[type] || <FiFileText />;
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <article className="terminal-window h-full flex flex-col group transition-all duration-300 hover:shadow-2xl hover:shadow-accent/5">
        <div className="terminal-header flex justify-between items-center group-hover:!bg-accent/5 transition-colors">
          <div className="flex items-center gap-2">
            <FiFolder className="text-accent h-3 w-3" />
            <span className="text-[10px] font-mono text-muted group-hover:text-foreground">
              {project.title.toLowerCase().replace(/\s+/g, '_')}.exe
            </span>
          </div>
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full border border-muted/30" />
            <div className="w-2 h-2 rounded-full border border-muted/30" />
          </div>
        </div>

        <div className="p-6 flex flex-col flex-1 font-mono">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TypeIcon type={project.type} />
              <span className="text-[10px] font-bold text-muted/60 uppercase tracking-widest">{project.type}</span>
            </div>
          </div>

          <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors">
            {project.title}
          </h3>

          <div className="mt-4 flex-1 text-[12px] text-muted leading-relaxed space-y-2">
            <p className="opacity-80">{"/* Description */"}</p>
            <p className="text-foreground/90">{project.description}</p>
          </div>

          {/* Highlight snippet */}
          <div className="mt-4 p-3 rounded bg-muted/5 border-l-2 border-accent-game font-mono">
            <p className="text-[10px] text-accent-game uppercase font-bold tracking-widest mb-1">{"// key_feature"}</p>
            <p className="text-[11px] font-medium text-foreground italic">{project.highlight}</p>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <Badge key={t} label={t} />
              ))}
            </div>

            <div className="flex gap-3 pt-4 border-t border-muted/5">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[10px] font-bold text-accent hover:underline uppercase tracking-widest"
                >
                  <FiExternalLink /> open.url
                </a>
              )}
              {project.sourceUrl && (
                <a
                  href={project.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[10px] font-bold text-muted hover:text-foreground uppercase tracking-widest"
                >
                  <FiGithub /> cat.repo
                </a>
              )}
            </div>
          </div>
        </div>
      </article>
    </motion.div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<"all" | "software" | "games">("all");

  const filtered =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  const tabs = [
    { key: "all" as const, label: "all_projects.dir" },
    { key: "software" as const, label: "software_web.sh" },
    { key: "games" as const, label: "games.exe" },
  ];

  return (
    <section id="projects" className="relative py-24 px-4 bg-dot overflow-hidden">
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-accent-game/3 rounded-full blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-6xl relative">
        <SectionWrapper>
          <SectionHeading
            id="projects-heading"
            title="Projects"
            subtitle="Deployment history and experimental modules"
          />
        </SectionWrapper>

        {/* Filter tabs */}
        <SectionWrapper delay={0.1}>
          <div className="mb-10 flex items-center justify-center font-mono">
            <div className="inline-flex rounded-xl border border-muted/10 bg-card p-1 shadow-lg">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key)}
                  className={`relative rounded-lg px-4 py-2 text-[10px] sm:text-xs font-bold transition-all duration-300 ${filter === tab.key
                    ? "text-accent"
                    : "text-muted hover:text-foreground"
                    }`}
                >
                  {filter === tab.key && (
                    <motion.span
                      layoutId="projectFilter"
                      className="absolute inset-0 rounded-lg bg-accent/5 border border-accent/20"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* Project grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <ProjectCard key={p.title} project={p} index={i} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

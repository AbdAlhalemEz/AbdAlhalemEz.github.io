"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { navLinks, personalInfo } from "@/data/portfolio";
import { FiMenu, FiX, FiDownload } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      // Detect active section
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled
        ? "glass shadow-lg shadow-black/20"
        : "bg-transparent"
        }`}
      role="navigation"
      aria-label="Main navigation"
      suppressHydrationWarning
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="#hero"
          className="group relative"
          aria-label="Go to top"
        >
          <div className="flex items-center text-lg sm:text-xl font-bold tracking-tight">
            <span className="gradient-text">&lt;AE</span>
            <span className="text-accent-game"> /</span>
            <span className="gradient-text">&gt;</span>
          </div>
          <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-accent to-accent-game transition-all duration-300 group-hover:w-full" />
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => {
            const isActive = activeSection === l.href.replace("#", "");
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300 ${isActive
                    ? "text-accent"
                    : "text-muted hover:text-foreground"
                    }`}
                >
                  {l.label}
                  {isActive && (
                    <motion.span
                      layoutId="navIndicator"
                      className="absolute inset-0 -z-10 rounded-lg bg-accent/10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
          <li className="ml-2 flex items-center gap-2">
            <ThemeToggle />
            <a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-accent to-accent-game px-4 py-2 text-sm font-semibold text-white dark:text-[#050816] shadow-lg shadow-accent/20 hover:shadow-accent/40 transition-all duration-300 hover:scale-105"
            >
              <FiDownload className="h-4 w-4" />
              Resume
            </a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            className="relative z-50 rounded-lg p-2 text-muted hover:text-accent transition-colors"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden z-40"
              onClick={() => setOpen(false)}
            />
            {/* Menu */}
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-72 z-50 glass md:hidden flex flex-col"
              style={{ borderLeft: "1px solid rgba(56, 189, 248, 0.1)" }}
            >
              <div className="p-6 pt-20">
                <ul className="flex flex-col gap-2">
                  {navLinks.map((l, i) => (
                    <motion.li
                      key={l.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i }}
                    >
                      <Link
                        href={l.href}
                        className={`block rounded-xl px-4 py-3 text-base font-medium transition-all ${activeSection === l.href.replace("#", "")
                          ? "text-accent bg-accent/10"
                          : "text-muted hover:text-foreground hover:bg-white/5"
                          }`}
                        onClick={() => setOpen(false)}
                      >
                        {l.label}
                      </Link>
                    </motion.li>
                  ))}
                  <motion.li
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * navLinks.length }}
                    className="mt-4"
                  >
                    <a
                      href={personalInfo.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-game px-4 py-3 text-sm font-semibold text-white dark:text-[#050816]"
                    >
                      <FiDownload className="h-4 w-4" />
                      Download Resume
                    </a>
                  </motion.li>
                </ul>
              </div>

              {/* Bottom branding */}
              <div className="mt-auto p-6 text-center">
                <p className="text-xs text-muted/40 font-mono">
                  &copy; {mounted ? new Date().getFullYear() : "2024"} {personalInfo.name}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}

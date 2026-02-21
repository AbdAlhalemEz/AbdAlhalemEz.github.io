"use client";

import { useState, FormEvent } from "react";
import { personalInfo, contactConfig } from "@/data/portfolio";
import SectionHeading from "@/components/SectionHeading";
import SectionWrapper from "@/components/SectionWrapper";
import {
  FiMail,
  FiLinkedin,
  FiGithub,
  FiSend,
  FiCheckCircle,
  FiPhone,
  FiMapPin,
  FiCode,
} from "react-icons/fi";
import { motion } from "framer-motion";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (contactConfig.formspreeId) {
      try {
        const response = await fetch(`https://formspree.io/f/${contactConfig.formspreeId}`, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          setSubmitted(true);
        } else {
          const result = await response.json();
          setError(result.error || "Execution failed. Please check your connectivity.");
        }
      } catch (err) {
        setError("Network error. Please try again or use the mailto link.");
      }
    } else {
      // Fallback to mailto
      const name = data.name as string;
      const email = data.email as string;
      const message = data.message as string;
      const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
      window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;

      // Simulate success for mailto
      await new Promise((r) => setTimeout(r, 800));
      setSubmitted(true);
    }

    setLoading(false);
  };

  const contactInfo = [
    {
      icon: <FiMail className="h-4 w-4" />,
      label: "smtp",
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
    },
    {
      icon: <FiPhone className="h-4 w-4" />,
      label: "tel",
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone}`,
    },
    {
      icon: <FiMapPin className="h-4 w-4" />,
      label: "loc",
      value: personalInfo.location,
      href: "#",
    },
  ];

  return (
    <section id="contact" className="relative py-24 px-4 bg-dot overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-5xl relative">
        <SectionWrapper>
          <SectionHeading
            id="contact-heading"
            title="System.Contact"
            subtitle="Send a request to my inbox — I'll get back to you ASAP"
          />
        </SectionWrapper>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Info Side */}
          <SectionWrapper delay={0.15} className="lg:col-span-2">
            <div className="space-y-6">
              <div className="terminal-window shadow-xl">
                <div className="terminal-header">
                  <div className="dot dot-red" />
                  <div className="dot dot-yellow" />
                  <div className="dot dot-green" />
                  <span className="ml-2 text-[10px] font-mono text-muted uppercase tracking-widest">env — contact_info</span>
                </div>
                <div className="p-4 space-y-3">
                  {contactInfo.map((info, i) => (
                    <a
                      key={i}
                      href={info.href}
                      className="flex items-center gap-4 group transition-all"
                    >
                      <span className="font-mono text-accent text-xs shrink-0 w-10">{info.label}:</span>
                      <span className="font-mono text-xs sm:text-sm text-foreground truncate group-hover:text-accent group-hover:underline underline-offset-4">
                        {info.value}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Social links */}
              <div className="flex items-center gap-2">
                {[
                  { icon: <FiLinkedin />, href: personalInfo.linkedin },
                  { icon: <FiGithub />, href: personalInfo.github },
                  { icon: <FiMail />, href: `mailto:${personalInfo.email}` },
                ].map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl border border-muted/10 bg-card hover:border-accent/40 hover:text-accent transition-all duration-300 hover:scale-110"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>

              {/* Status Log */}
              <div className="glass-card p-5 border-dashed border-muted/30">
                <h4 className="text-[10px] font-mono font-bold text-muted mb-3 flex items-center gap-2 uppercase tracking-widest">
                  <FiCode className="text-accent" /> console.log(highlights)
                </h4>
                <div className="space-y-2 font-mono text-[11px] text-muted">
                  <p className="flex items-center gap-2">
                    <span className="text-accent-game">info</span> status: Available
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-accent">info</span> location: NCR_GATEWAY
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-pink-400">info</span> roles: [SUPPORT, DEV, QA]
                  </p>
                </div>
              </div>
            </div>
          </SectionWrapper>

          {/* Form Side */}
          <SectionWrapper delay={0.25} className="lg:col-span-3">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex h-full flex-col items-center justify-center glass-card rounded-2xl p-10 text-center terminal-window"
              >
                <div className="mb-4 rounded-full bg-emerald-500/10 p-4 animate-pulse">
                  <FiCheckCircle className="h-10 w-10 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-foreground font-mono">SUCCESS: Request Received</h3>
                <p className="mt-2 text-sm text-muted max-w-sm font-mono leading-relaxed">
                  Payload delivered successfully. I&apos;ll process your request and respond via SMTP shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-xs text-accent hover:underline font-mono uppercase tracking-widest"
                >
                  ./restart_handshake.sh
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="glass-card rounded-2xl p-6 sm:p-8 space-y-5 shadow-2xl relative"
              >
                <div className="absolute top-4 right-6 opacity-10 pointer-events-none hidden sm:block">
                  <FiCode size={120} />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="block text-[10px] font-mono font-bold text-muted uppercase tracking-widest ml-1">
                      var user_name =
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder='"Your Name"'
                      className="w-full rounded-xl border border-muted/15 bg-secondary/50 px-4 py-3 text-sm font-mono text-foreground focus:border-accent focus:ring-1 focus:ring-accent/40 transition-all outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="email" className="block text-[10px] font-mono font-bold text-muted uppercase tracking-widest ml-1">
                      var user_email =
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder='"you@relay.io"'
                      className="w-full rounded-xl border border-muted/15 bg-secondary/50 px-4 py-3 text-sm font-mono text-foreground focus:border-accent focus:ring-1 focus:ring-accent/40 transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="subject" className="block text-[10px] font-mono font-bold text-muted uppercase tracking-widest ml-1">
                    var subject =
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    placeholder='"Project Inquiry"'
                    className="w-full rounded-xl border border-muted/15 bg-secondary/50 px-4 py-3 text-sm font-mono text-foreground focus:border-accent focus:ring-1 focus:ring-accent/40 transition-all outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message" className="block text-[10px] font-mono font-bold text-muted uppercase tracking-widest ml-1">
                    var buffer_payload =
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="`Write your message here...`"
                    className="w-full rounded-xl border border-muted/15 bg-secondary/50 px-4 py-3 text-sm font-mono text-foreground focus:border-accent focus:ring-1 focus:ring-accent/40 transition-all outline-none resize-none"
                  />
                </div>

                {error && (
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-mono">
                    ERROR: {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-shine inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-game px-6 py-4 text-sm font-bold text-white dark:text-[#050816] shadow-lg hover:scale-[1.02] transition-all disabled:opacity-60 font-mono uppercase tracking-widest"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      EXECUTING...
                    </span>
                  ) : (
                    <>
                      <FiSend className="h-4 w-4" /> push --force
                    </>
                  )}
                </button>
              </form>
            )}
          </SectionWrapper>
        </div>
      </div>
    </section>
  );
}

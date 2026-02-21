// ─── Portfolio Data ───────────────────────────────────────────────
// Central data source for all portfolio content.

export const personalInfo = {
  name: "Abed Alhalim Ezz Aldin",
  title: "IT Support Technician & Software Developer",
  subtitle: "QA Analyst · Indie Game Developer",
  location: "Ottawa / Gatineau, Canada",
  phone: "(819) 923-8819",
  email: "Abd95alhalem@gmail.com",
  linkedin: "https://www.linkedin.com/in/abed-alhalim-ezz-aldin",
  github: "https://github.com/abd95alhalem",
  resumeUrl: "/resume.pdf",
  tagline:
    "Reliable IT professional with an Honours BSc in Computer Science, 5+ years across QA, full-stack development, and IT support—plus a passion for building indie games.",
};

export const contactConfig = {
  // Get your free ID at https://formspree.io/ (Example: "xoqrqvwa")
  // If empty, it will fall back to mailto:
  formspreeId: "",
};

export const aboutText = [
  "I'm an IT professional with an Honours BSc in Computer Science and over five years of hands-on experience spanning software QA, full-stack web and mobile development, and front-line IT support. I thrive on diagnosing complex hardware and software issues, streamlining workflows, and delivering solutions that keep teams productive.",
  "Beyond the help desk, I'm a published indie game developer with 10+ apps on Google Play and the web—blending technical problem-solving with creative UX and game-design thinking. I'm bilingual in English and Arabic, a Canadian citizen eligible for Secret Clearance, and qualified for the Federal IT-01 talent pool in the NCR.",
  "I'm open to remote, hybrid, or on-site roles in IT support, QA, or junior development across Ottawa/Gatineau and beyond.",
];

export interface Skill {
  name: string;
  level: number; // 0–100
}

export interface SkillGroup {
  category: string;
  icon: string;
  skills: Skill[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: "IT Support & Tools",
    icon: "🖥️",
    skills: [
      { name: "Windows 10 / 11", level: 95 },
      { name: "Hardware Troubleshooting", level: 90 },
      { name: "Networking & TCP/IP", level: 80 },
      { name: "Active Directory (basic)", level: 70 },
      { name: "Office 365", level: 90 },
      { name: "Ticketing Systems", level: 85 },
      { name: "Remote Support", level: 90 },
      { name: "Azure DevOps", level: 75 },
      { name: "Documentation", level: 85 },
    ],
  },
  {
    category: "QA & Testing",
    icon: "🧪",
    skills: [
      { name: "Manual Testing", level: 90 },
      { name: "Test Cases & Plans", level: 85 },
      { name: "Selenium (Java)", level: 70 },
      { name: "Regression & UAT", level: 80 },
      { name: "JIRA", level: 80 },
      { name: "Agile / Scrum", level: 85 },
      { name: "SDLC", level: 80 },
    ],
  },
  {
    category: "Web Development",
    icon: "🌐",
    skills: [
      { name: "JavaScript", level: 90 },
      { name: "TypeScript", level: 75 },
      { name: "React", level: 85 },
      { name: "Tailwind CSS", level: 90 },
      { name: "HTML5 & CSS3", level: 95 },
      { name: "REST APIs / JSON", level: 80 },
      { name: "Git / GitHub", level: 85 },
      { name: "Firebase", level: 80 },
      { name: "Vite / Capacitor", level: 75 },
      { name: "SQL / MySQL", level: 70 },
    ],
  },
  {
    category: "Mobile, Game Dev & More",
    icon: "🎮",
    skills: [
      { name: "Android Studio / Kotlin", level: 75 },
      { name: "Java", level: 80 },
      { name: "Python", level: 70 },
      { name: "C++ / C#", level: 65 },
      { name: "Unity", level: 60 },
      { name: "Vanilla JS Game Engine", level: 85 },
      { name: "PWA Development", level: 80 },
      { name: "Postman", level: 75 },
    ],
  },
];

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
}

export const experience: ExperienceItem[] = [
  {
    role: "QA Analyst / IT Support",
    company: "Great River Financial Services Inc",
    location: "Gatineau, QC",
    period: "Jan 2024 – Aug 2024",
    bullets: [
      "Delivered tier 1–2 support to 50+ users with high first-contact resolution; diagnosed hardware, peripheral, and network issues.",
      "Produced and maintained test plans, cases, and defect reports; collaborated with developers in daily stand-ups for bug triage and regression.",
      "Executed 100+ manual test cases per sprint across web and mobile apps, documenting defects in Azure DevOps.",
      "Reduced average ticket resolution time by improving documentation and knowledge-base articles.",
    ],
  },
  {
    role: "Independent Game Developer / Software Engineer",
    company: "Self-Employed",
    location: "Gatineau, QC",
    period: "2020 – Present",
    bullets: [
      "Built and published a diverse portfolio of 10+ web and mobile apps using React, TypeScript, Firebase, and Capacitor.",
      "Developed 'Crisscross', an Arabic Crossword PWA/Android game with real-time multiplayer, social features, and Google Play integration.",
      "Engineered 'Neo Blocks', a high-performance block-matching engine using Vanilla JS and HTML5 Canvas, featuring competitive multiplier mechanics.",
      "Released 'MedManager' Android app for health tracking; optimized UX for educational toddler suites used by thousands of users.",
    ],
  },
  {
    role: "IT Support / Junior QA",
    company: "Compumania Foundation",
    location: "Lebanon",
    period: "2016 – 2019",
    bullets: [
      "Supported 300+ users with hardware, software, and network troubleshooting; performed diagnostics and preventive maintenance.",
      "Assisted the QA team executing manual tests and logging defects for web and desktop applications.",
      "Helped set up surveillance and internet infrastructure for the facility.",
    ],
  },
  {
    role: "Web Development Intern",
    company: "Maps Organization",
    location: "Lebanon",
    period: "Summer 2018",
    bullets: [
      "Completed 185 hours of web development and QA work, building responsive pages with HTML/CSS/JavaScript/PHP.",
      "Performed cross-browser and mobile compatibility testing on internal tools.",
    ],
  },
];

export interface Project {
  title: string;
  type: "IT Tool" | "Web App" | "Game" | "Educational Game" | "Mobile App";
  description: string;
  tech: string[];
  highlight: string;
  liveUrl?: string;
  sourceUrl?: string;
  category: "software" | "games";
}

export const projects: Project[] = [
  {
    title: "MedManager",
    type: "Mobile App",
    description:
      "Medication tracking and reminder app published on Google Play. Features local notifications, scheduling, and an intuitive health-focused UI.",
    tech: ["Kotlin", "Android Studio", "SQLite"],
    highlight: "Health tracking with 500+ organic installs",
    sourceUrl: "https://github.com/abd95alhalem/MedManager",
    category: "software",
  },
  {
    title: "Portfolio Website",
    type: "Web App",
    description:
      "This very portfolio—built with Next.js, TypeScript, Tailwind CSS, and optimized for professional IT/Support roles.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    highlight: "High-performance PWA with IT-themed UI",
    sourceUrl: "https://github.com/abd95alhalem/portfolio",
    category: "software",
  },
  {
    title: "Crisscross",
    type: "Game",
    description:
      "A feature-rich Arabic crossword puzzle game with real-time multiplayer, daily challenges, and custom puzzle creation. Built as a PWA with a native Android application.",
    tech: ["React", "TypeScript", "Firebase", "Capacitor", "TailwindCSS"],
    highlight: "Full RTL support & Real-time multiplayer chat",
    liveUrl: "https://play.google.com/store/apps/details?id=com.crisscross.arabic",
    sourceUrl: "https://github.com/AbdAlhalemEz/Crisscross",
    category: "games",
  },
  {
    title: "Neo Blocks",
    type: "Game",
    description:
      "Competitive block-matching game featuring team multiplayer (2v2/3v3), survival modes, and a tiered ranking system. Engineered for high performance using Vanilla JS.",
    tech: ["Vanilla JS", "HTML5 Canvas", "CSS3", "WebSockets"],
    highlight: "Advanced 2v2 combat logic & Junk systems",
    liveUrl: "https://abd95alhalem.github.io/neoblock",
    sourceUrl: "https://github.com/abd95alhalem/neoblock",
    category: "games",
  },
  {
    title: "Toddler Mini-Games Suite",
    type: "Educational Game",
    description:
      "Educational app for toddlers featuring math, alphabet, and memory mini-games. Includes a reward system and kid-friendly touch-optimized interfaces.",
    tech: ["JavaScript", "HTML5 Canvas", "CSS3"],
    highlight: "6 specialized learning modules for children",
    sourceUrl: "https://github.com/abd95alhalem",
    category: "games",
  },
];

export interface Education {
  degree: string;
  school: string;
  location: string;
  period: string;
}

export const education: Education[] = [
  {
    degree: "BSc (Honours) Computer Science",
    school: "Lakehead University",
    location: "Thunder Bay, ON",
    period: "2019 – 2023",
  },
  {
    degree: "IT Studies (transferred)",
    school: "Lebanese International University",
    location: "Lebanon",
    period: "2016 – 2019",
  },
];

export const certifications = [
  "Cisco IT Essentials — Networking and Hardware Fundamentals",
  "Cisco CCNA1 Routing & Switching — Introduction to Networks",
  "CPR & First Aid Certification (Adult-Child-Infant) — Current",
  "SPARK Training — Stress Management & Economic Empowerment",
];

export const volunteerWork = [
  {
    role: "Founder & Organizer",
    org: "University Students Association, Lebanon",
    period: "2017 – 2020",
    description:
      "Founded initiative providing university access to 5,000+ refugee students; coordinated with international NGOs and universities.",
  },
  {
    role: "President",
    org: "Spark Students Union, Lebanese International University",
    period: "2017 – 2019",
    description:
      "Led student government representing 2,000+ students; coordinated events and liaised with university administration.",
  },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const stats = [
  { label: "Years Experience", value: "5+" },
  { label: "Published Apps", value: "10+" },
  { label: "Users Supported", value: "350+" },
  { label: "Test Cases/Sprint", value: "100+" },
];

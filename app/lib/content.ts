// =============================================================================
// content.ts — Single source of truth for all portfolio copy and data.
// Edit this file to update text, links, projects, experience, and skills.
// Every sentence, number, date and link must come from the master profile.
// Never invent data — use a TODO marker for anything missing.
// =============================================================================

export const person = {
  name: "Darshita Singh",
  role: "Full-Stack Developer",
  roleAlt: "Software Engineer & UI Designer",
  tagline: "Building meaningful digital experiences through code, creativity, and curiosity.",
  location: "Jaipur, Rajasthan, India",
  availability: "Open to opportunities",
  email: "darshitasingh.it26@gmail.com",
  phone: "+91 63500 61556",
  github: "https://github.com/darshita27",
  linkedin: "https://linkedin.com/in/darshita-singh",
  portfolio: "https://darshita-singh-portfolio1.vercel.app",
  resumePdf: "/Darshita_Singh_Resume_Updated.pdf",
  portrait: "/images/portrait.jpg",
  portraitAlt: "Darshita Singh — Full-Stack Developer, in a black blazer and white shirt",

  // Quick-facts strip under the hero
  quickFacts: [
    { label: "Experience", value: "3 internships" },
    { label: "Stack", value: "MERN · Django · AI" },
    { label: "CGPA", value: "8.72 / 10" },
    { label: "Location", value: "Jaipur, India" },
  ],
} as const;

// =============================================================================
// About — Chapter 02
// =============================================================================
export const about = {
  // Scroll-scrubbed paragraph (shown word by word)
  story: `I'm a B.Tech Information Technology graduate from Jaipur who builds things end-to-end. 
I enjoy turning ideas into functional digital products — the kind that work correctly, 
feel good to use, and solve a real problem. My stack centres on React, Node.js, and 
Python, and I keep pushing it toward AI-powered workflows and intelligent interfaces. 
I've shipped a full-stack resort booking platform, a job-aggregation engine with 
client-side AI resume scoring, and a mental-wellness app with a bilingual chatbot — 
all from scratch, all in production. What drives me is the gap between "this works" 
and "this is good": I want both.`,

  // Large italic serif quote
  philosophy: {
    text: "Think creatively. Build intelligently. Grow continuously. Create something meaningful.",
    attribution: "Darshita Singh",
  },
} as const;

// =============================================================================
// Skills — Chapter 03 (desk objects map to skill groups)
// =============================================================================
export const skillGroups = [
  {
    id: "languages",
    label: "Languages",
    deskObject: "keyboard", // which SVG object to hover
    skills: ["JavaScript", "TypeScript", "C++", "C", "SQL"],
  },
  {
    id: "frontend",
    label: "Frontend",
    deskObject: "monitor-left",
    skills: [
      "React.js",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Responsive Design",
      "Component Architecture",
      "Performance Optimisation",
      "UI Implementation",
    ],
  },
  {
    id: "backend",
    label: "Backend",
    deskObject: "monitor-right",
    skills: [
      "Node.js",
      "Express.js",
      "Django REST Framework",
      "RESTful API Design",
      "CRUD Operations",
      "API Integration",
      "Server-Side Development",
    ],
  },
  {
    id: "data",
    label: "Databases",
    deskObject: "notebook",
    skills: [
      "MongoDB",
      "MongoDB Atlas",
      "PostgreSQL",
      "Database Schema Design",
      "SQL",
      "Local Storage",
    ],
  },
  {
    id: "auth",
    label: "Auth & Security",
    deskObject: "mug",
    skills: [
      "JWT Authentication",
      "Session-Based Auth",
      "Role-Based Access Control",
      "Permission Models",
    ],
  },
  {
    id: "ai",
    label: "AI & Automation",
    deskObject: "lamp",
    skills: [
      "AI Agent Workflows",
      "Intent Classification",
      "AI-Powered Business Workflows",
      "Intelligent Automation",
      "Anthropic Claude API",
      "Structured JSON Output",
      "Generative AI Integration",
    ],
  },
  {
    id: "tools",
    label: "Tools & Platforms",
    deskObject: "plant",
    skills: [
      "Git & GitHub",
      "Visual Studio Code",
      "Vercel",
      "Netlify",
      "Render",
      "Cloudinary",
    ],
  },
] as const;

// =============================================================================
// Projects — Chapter 04
// =============================================================================
export const projects = [
  {
    id: "vrinda-valley",
    index: "01",
    title: "Vrinda Valley Resort",
    category: "Full-Stack Web Development",
    problem:
      "A luxury resort in Jaipur needed a complete online presence — from a public booking site to a back-office dashboard — with zero existing digital infrastructure.",
    approach:
      "Built end-to-end: responsive public site, booking workflow, admin dashboard, photo and content management, and a rule-based chatbot using intent classification and a multi-step state machine — no external AI API.",
    outcome:
      "Full production platform with optimised image delivery and a content payload reduced from ~5 MB to 11 KB.",
    metric: { value: "5 MB → 11 KB", label: "content payload" },
    stack: ["React 19", "TypeScript", "Tailwind CSS", "Node.js", "Express 5", "MongoDB Atlas", "Cloudinary", "Netlify", "Render"],
    liveUrl: "https://www.vrindavalleyresort.com/",
    githubUrl: "", // TODO: add GitHub URL if public
    highlights: [
      "Admin dashboard with booking, room-inventory, photo, review, and blog management",
      "Rule-based booking chatbot with intent classification — no external AI API",
      "Server-side session authentication",
      "Content payload optimised from ~5 MB to 11 KB",
    ],
  },
  {
    id: "devjobsboard",
    index: "02",
    title: "DevJobsBoard",
    category: "Full-Stack + AI-Assisted Resume Processing",
    problem:
      "Developers waste time hunting job listings across platforms and don't know if their resume will pass ATS filters before applying.",
    approach:
      "Built a full-stack job aggregation platform with multi-filter search, JWT auth, and an ATS resume-tailoring engine. The key design decision: all PDF/DOCX parsing and resume scoring runs client-side so documents never leave the browser.",
    outcome:
      "A privacy-first job platform combining live job discovery with AI-powered resume feedback.",
    metric: { value: "100%", label: "client-side resume parsing — no data leaves the browser" },
    stack: ["React 19", "TypeScript", "Vite", "Django REST Framework", "Anthropic Claude API", "Render"],
    liveUrl: "https://devjobsboard-web.onrender.com/",
    githubUrl: "", // TODO: add GitHub URL if public
    highlights: [
      "Multi-filter job search with automatically paginated job fetching",
      "ATS resume-tailoring engine with keyword extraction and coverage scoring",
      "Client-side PDF and DOCX parsing — documents never leave the browser",
      "JWT authentication with resume snapshot management",
    ],
  },
  {
    id: "manova",
    index: "03",
    title: "Manova Mental Wellness",
    category: "Frontend Engineering & Digital Wellness",
    problem:
      "A licensed psychologist and CBT practitioner needed a professional website with appointment booking and self-help tools that respected user privacy.",
    approach:
      "Built a responsive React site with an animated four-step booking interface, browser-based wellness tools (mood journal, PHQ-9 check-in, guided breathing), dual-email delivery with mailto fallback, and a bilingual English/Hindi crisis-detection chatbot.",
    outcome:
      "A fully accessible wellness platform with no server-side user data storage for the self-help tools.",
    metric: { value: "Bilingual", label: "English + Hindi crisis-detection chatbot" },
    stack: ["React 19", "TypeScript", "Vite", "Framer Motion", "EmailJS"],
    liveUrl: "", // TODO: add live URL
    githubUrl: "", // TODO: add GitHub URL if public
    highlights: [
      "Four-step animated appointment booking with dual-email delivery",
      "Browser-based mood journal, PHQ-9 check-in, guided breathing",
      "Bilingual English and Hindi crisis-detection chatbot",
      "Fully accessible with WCAG AA compliance",
    ],
  },
] as const;

// =============================================================================
// Experience — Chapter 05
// =============================================================================
export const experience = [
  {
    id: "zyoris",
    index: "01",
    company: "Zyoris Technology",
    role: "Full-Stack Developer Intern",
    period: "Aug – Nov 2026",
    type: "Internship",
    domain: "AI-Powered CRM Platform",
    summary:
      "Worked on an enterprise CRM platform orchestrated by 12 autonomous AI agents. Built the Customer 360 shell, communication timeline, and health dashboard UIs from scratch.",
    highlight: "12-agent AI workflow system",
    tech: ["React.js", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "pracverse",
    index: "02",
    company: "Pracverse Pvt. Ltd.",
    role: "AI & Next Gen Technology Associate",
    period: "Aug – Nov 2026",
    type: "Internship",
    domain: "Technology Education & AI Outreach",
    summary:
      "Introduced students to AI, drone technology, and programming through live sessions in partner schools. Collaborated with the founding team on pilot initiatives.",
    highlight: "STEM + AI education",
    tech: [],
  },
  {
    id: "regex",
    index: "03",
    company: "REGEX Software Pvt. Ltd.",
    role: "MERN Stack Developer Intern",
    period: "Jul – Sep 2024",
    type: "Internship",
    domain: "Full-Stack Web Development",
    summary:
      "Built responsive React interfaces with TypeScript and integrated REST APIs. Focused on component architecture, code splitting, and Core Web Vitals improvements.",
    highlight: "Frontend performance & MERN",
    tech: ["React.js", "TypeScript", "Node.js", "Tailwind CSS"],
  },
] as const;

// =============================================================================
// Education
// =============================================================================
export const education = [
  {
    degree: "Bachelor of Technology — Information Technology",
    institution: "Jaipur Engineering College and Research Centre (JECRC Foundation)",
    period: "2022 – 2026",
    cgpa: "8.72 / 10",
  },
  {
    degree: "Class XII — RBSE",
    institution: "Mayur Public Senior Secondary School",
    period: "2021",
    score: "95.82%",
  },
  {
    degree: "Class X — CBSE",
    institution: "Central Public Senior Secondary School",
    period: "2019",
    score: "90.82%",
  },
] as const;

// =============================================================================
// Contact — Chapter 06
// =============================================================================
export const contact = {
  steps: [
    { num: "01", label: "Write",   detail: "Tell me a little about the role or what you're building. A few lines is plenty." },
    { num: "02", label: "I reply", detail: "I'll write back personally, usually within a day." },
    { num: "03", label: "We talk", detail: "A short chat to see if I can be useful. Questions about my projects are welcome." },
  ],
  emailDisplay: "darshitasingh.it26@gmail.com",
} as const;

// =============================================================================
// SEO / metadata
// =============================================================================
export const meta = {
  siteUrl: "https://darshita-singh-portfolio1.vercel.app",
  title: "Darshita Singh — Full-Stack Developer & Software Engineer",
  description:
    "Portfolio of Darshita Singh, a B.Tech IT graduate and Full-Stack Developer based in Jaipur, India. Specialises in React, Node.js, Django REST Framework, and AI-powered web applications.",
  ogImage: "/og-image.png", // TODO: generate 1200×630 OG image
  themeColor: "#07080A",
  locale: "en_IN",
  twitterHandle: "", // TODO: add if available
} as const;

// =============================================================================
// Chapters manifest (drives clock + chapter counter in nav)
// =============================================================================
export const chapters = [
  { num: "01", slug: "hero",       label: "2:47 AM",   time: "02:47" },
  { num: "02", slug: "about",      label: "Obsession", time: "03:30" },
  { num: "03", slug: "skills",     label: "The Desk",  time: "04:15" },
  { num: "04", slug: "projects",   label: "The Build", time: "05:00" },
  { num: "05", slug: "experience", label: "The Room",  time: "06:00" },
  { num: "06", slug: "contact",    label: "Morning",   time: "07:00" },
] as const;

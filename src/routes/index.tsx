import { createFileRoute } from "@tanstack/react-router";

import { InteractiveHero } from "@/components/interactive-hero";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bhanu Gunda — Web Developer" },
      {
        name: "description",
        content:
          "Interactive portfolio of Bhanu Gunda, a React.js and Supabase web developer building dashboards, role-based platforms and clean UIs.",
      },
      { property: "og:title", content: "Bhanu Gunda — Web Developer" },
      {
        property: "og:description",
        content:
          "Interactive portfolio of Bhanu Gunda, a React.js and Supabase web developer building dashboards, role-based platforms and clean UIs.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const EXPERIENCE = {
  role: "Software Developer — React.js & Supabase",
  company: "Syncall Technology Solutions",
  period: "June 2025 – Present",
  highlights: [
    "Developed and maintained responsive web applications with React.js, following reusable component and modern UI design principles.",
    "Integrated Supabase for authentication, database management and secure CRUD operations.",
    "Built dashboards and data-driven interfaces with efficient state management using React Hooks.",
    "Collaborated with cross-functional teams to ship features, fix bugs and optimize application performance.",
  ],
};

const PROJECTS = [
  {
    title: "Lavin labs",
    tag: "Laboratory & Quality Management",
    points: [
      "Comprehensive Laboratory and Quality Management System covering sample management, testing workflows, and equipment calibration.",
      "Role-based authentication managing quality audits, HR records, attendance, invoicing, and supplier management.",
      "Automated PDF report generation, scheduled email notifications, and secure REST APIs built with React, TypeScript, and Supabase.",
    ],
  },
  {
    title: "Booklet (Rental Management System)",
    tag: "Rental Property Management",
    points: [
      "Modern Rental Property Management application streamlining property administration, unit listings, and tenant management.",
      "Automated rent collection tracking, expense categorization, owner payouts, and real-time financial reporting.",
      "Responsive dashboard UI with secure database management and CRUD operations powered by React.js and Supabase.",
    ],
  },
  {
    title: "Lenseption Lane",
    tag: "Photography & Studio Platform",
    points: [
      "Designed and developed a responsive photography platform featuring high-resolution portfolio galleries.",
      "Online studio booking system with real-time slot scheduling, inquiry management, and automated booking workflows.",
      "Clean, user-centric interface built with React.js and Supabase for seamless customer interactions.",
    ],
  },
  {
    title: "Little Champs",
    tag: "Legacy Website Modernization",
    points: [
      "Modernized a legacy static HTML website by completely rebuilding it into a modular React.js architecture.",
      "Engineered reusable components and optimized project structure while strictly retaining the original design aesthetic.",
      "Improved performance, maintainability, and code organization with modern front-end best practices.",
    ],
  },
  {
    title: "Real Estate Application",
    tag: "Role-based property management",
    points: [
      "Multi-role platform with secure RBAC authentication for Admins, Agents and Users.",
      "Structured property listing, search, filtering and inquiry tracking.",
      "Admin-controlled communication and offline deal workflow with restricted access and secure APIs.",
    ],
  },
  {
    title: "HR / Management System",
    tag: "People operations platform",
    points: [
      "Employee records, attendance, salary slips, Form-16 and dashboards.",
      "Role-based access, CRUD operations and real-time data updates.",
      "Responsive UI with a modular component structure for scalability.",
    ],
  },
  {
    title: "Invoice Management System",
    tag: "Billing for a software company",
    points: [
      "Manages clients, products, services and invoices end to end.",
      "Dashboard UI with structured CRUD operations.",
      "Clean UI design with a focus on reusability and efficient data handling.",
    ],
  },
];

const PERSONAL_PROJECTS = [
  { name: "E-Commerce Website", stack: "Java · HTML · CSS · Bootstrap · MySQL" },
  { name: "Apartment Connect", stack: "Spring Boot · MySQL · Thymeleaf" },
  { name: "To-Do List", stack: "React JS" },
  { name: "Weather App", stack: "React JS" },
  { name: "Food Recipe App", stack: "React JS" },
];

const SKILLS: { group: string; items: string[] }[] = [
  {
    group: "Frontend",
    items: ["React JS", "HTML", "CSS", "Bootstrap", "jQuery", "Responsive UI"],
  },
  {
    group: "Backend",
    items: ["Core Java", "Adv. Java (JDBC, Servlets, JSP)", "Spring Boot", "RESTful APIs", "Microservices"],
  },
  {
    group: "Databases",
    items: ["MySQL", "Oracle (SQL & PL/SQL)", "MongoDB", "Supabase"],
  },
  {
    group: "Tools & Cloud",
    items: ["Git", "VS Code", "Eclipse", "Maven", "Postman", "AWS"],
  },
];

const EDUCATION = [
  {
    school: "Kamala Institute of Technology and Science",
    program: "B.Tech — Electronics and Communication Engineering (ECE)",
    year: "2023",
    result: "CGPA 6.76",
  },
  {
    school: "Sri Vikas Junior College",
    program: "Intermediate — MPC",
    year: "2019",
    result: "75.5%",
  },
  {
    school: "Rishi High School",
    program: "SSC",
    year: "2017",
    result: "CGPA 8.3",
  },
];

const CERTIFICATIONS = [
  "Full-Stack Web Development — Udemy",
  "Java Programming — Oracle",
  "React.js Bootcamp — LetsUpgrade",
  "Azure Fundamentals Cloud Skill Challenge — Microsoft",
  "SQL and Relational Databases 101 — IBM",
  "Basics of Python — Uni Athena",
  "Excel — Great Learning",
  "MS Office — SETWIN",
];

const ACADEMIC_PROJECTS =
  "Major project: enhancing underwater images quickly for real-time use. Mini project: greenhouse monitoring and controlling system.";

function SectionHeading({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-10">
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">{kicker}</p>
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
        {title}
      </h2>
    </div>
  );
}

function Index() {
  return (
    <main className="bg-background">
      <InteractiveHero />

      {/* About */}
      <section id="about" className="mx-auto w-full max-w-6xl px-6 py-20 md:px-10">
        <SectionHeading kicker="About" title="React developer who ships" />
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr]">
          <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              I'm a software developer at {EXPERIENCE.company}, building responsive React
              applications backed by Supabase — from role-based real estate platforms to HR and
              invoicing systems.
            </p>
            <p>
              I care about reusable components, clean state management and interfaces that stay
              fast as the product grows.
            </p>
            <p className="text-sm">{ACADEMIC_PROJECTS}</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <p className="font-display text-lg font-semibold text-foreground">{EXPERIENCE.role}</p>
            <p className="mt-1 text-sm font-medium text-primary">{EXPERIENCE.company}</p>
            <p className="mt-0.5 text-xs uppercase tracking-widest text-muted-foreground">
              {EXPERIENCE.period}
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
              {EXPERIENCE.highlights.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="w-full px-6 py-20 md:px-10" style={{ background: "var(--muted)" }}>
        <div className="mx-auto w-full max-w-6xl">
          <SectionHeading kicker="Work" title="Projects I've built" />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((project) => (
              <article
                key={project.title}
                className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card transition-transform hover:-translate-y-1"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                  {project.tag}
                </p>
                <h3 className="mt-3 font-display text-xl font-semibold text-foreground">
                  {project.title}
                </h3>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  {project.points.map((point) => (
                    <li key={point} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold text-foreground">Personal projects</h3>
            <div className="mt-4 flex flex-wrap gap-3">
              {PERSONAL_PROJECTS.map((project) => (
                <div
                  key={project.name}
                  className="rounded-full border border-border bg-card px-5 py-2.5 text-sm shadow-card"
                >
                  <span className="font-semibold text-foreground">{project.name}</span>
                  <span className="ml-2 text-muted-foreground">· {project.stack}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="mx-auto w-full max-w-6xl px-6 py-20 md:px-10">
        <SectionHeading kicker="Skills" title="What I work with" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SKILLS.map((skill) => (
            <div key={skill.group} className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <h3 className="font-display text-base font-semibold text-foreground">{skill.group}</h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {skill.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section id="education" className="w-full px-6 py-20 md:px-10" style={{ background: "var(--muted)" }}>
        <div className="mx-auto w-full max-w-6xl">
          <SectionHeading kicker="Education" title="Where I studied" />
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
            {EDUCATION.map((entry, index) => (
              <div
                key={entry.school}
                className={`flex flex-col gap-1 p-6 md:flex-row md:items-center md:justify-between ${
                  index > 0 ? "border-t border-border" : ""
                }`}
              >
                <div>
                  <p className="font-display text-base font-semibold text-foreground">{entry.school}</p>
                  <p className="text-sm text-muted-foreground">{entry.program}</p>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-muted-foreground">{entry.year}</span>
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                    {entry.result}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <h3 className="font-display text-base font-semibold text-foreground">Certifications</h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {CERTIFICATIONS.map((cert) => (
                  <li key={cert} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <h3 className="font-display text-base font-semibold text-foreground">Strengths</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Good communication", "Diligent", "Self-initiating", "Quick to adapt"].map((strength) => (
                  <span
                    key={strength}
                    className="rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground"
                  >
                    {strength}
                  </span>
                ))}
              </div>
              <h3 className="mt-8 font-display text-base font-semibold text-foreground">Beyond work</h3>
              <p className="mt-3 text-sm text-muted-foreground">Playing sudoku · Listening to music</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto w-full max-w-6xl px-6 py-20 md:px-10">
        <SectionHeading kicker="Contact" title="Let's work together" />
        <div className="grid gap-6 md:grid-cols-2">
          <a
            href="mailto:gundabhanu10@gmail.com"
            className="rounded-2xl border border-border bg-card p-6 shadow-card transition-transform hover:-translate-y-1"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Email</p>
            <p className="mt-3 font-display text-lg font-semibold text-foreground">
              gundabhanu10@gmail.com
            </p>
          </a>
          <a
            href="tel:+919701606826"
            className="rounded-2xl border border-border bg-card p-6 shadow-card transition-transform hover:-translate-y-1"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Phone</p>
            <p className="mt-3 font-display text-lg font-semibold text-foreground">9701606826</p>
          </a>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">LinkedIn</p>
            <p className="mt-3 text-sm text-muted-foreground">Find me on LinkedIn — Bhanu Gunda</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">GitHub</p>
            <p className="mt-3 text-sm text-muted-foreground">My repositories are on GitHub — Bhanu Gunda</p>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Bhanu Gunda · Built with React
        </p>
      </footer>
    </main>
  );
}

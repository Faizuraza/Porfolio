import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";

// Projects section — animated, filterable grid with cards
// Matches the dark aesthetic used in HomeHero & About

const projectsSeed = [
  {
    id: "food-delivery",
    title: "Food Delivery App",
    description:
      "Full‑stack MERN app with auth, order flow, and payments. Focus on clean UI, API design, and deployment.",
    image: "/assets/images/Screenshot 2025-11-06 154236.png",
    stack: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
    live: "https://food-delivery-appfrontend.onrender.com",
    github: "#", // add repo link
    highlights: ["JWT Auth", "Stripe Checkout", "Responsive UI"],
    tags: ["fullstack", "mern", "featured"],
    year: 2024,
  },
  {
    id: "Notes App",
    title: "Notes App Cloud Application",
    description:
      "Full-Stack app Developed and deployed a production-ready SaaS note-taking application featuring markdown support, real-time synchronization,",
    //  and advanced organization capabilities. Built with React and TypeScript frontend on Vercel, Node.js/Express REST API on Render, and MySQL database on Railway. Implemented Firebase authentication, soft-delete trash system, tag-based filtering, and syntax-highlighted code blocks. Architected scalable multi-tier cloud infrastructure with CI/CD pipeline and 99.9% uptime monitoring. Upcoming features: Email notifications, note sharing & real-time collaboration, Stripe payment integration, custom templates, analytics dashboard, and social features.",
    image: "/assets/images/Screenshot 2025-11-28 222659.png",
    stack: ["React", "TypeScript", "Node.js", "MySQL"],
    live: "https://notes-app-sigma-opal.vercel.app/",
    github: "#",
    highlights: ["Admin CMS", "Auth", "Video Library"],
    tags: ["fullstack", "mern", "featured"],
    year: 2024,
  },
  // {
  //   id: "portfolio",
  //   title: "Developer Portfolio",
  //   description:
  //     "Personal portfolio built with React + Tailwind + Framer Motion. Clean design, animations, and responsive layout.",
  //   image: "/assets/project3.png",
  //   stack: ["React", "Tailwind", "Framer Motion"],
  //   live: "#",
  //   github: "#",
  //   highlights: ["Dark UI", "Animations", "Responsive"],
  //   tags: ["frontend", "react"],
  //   year: 2025,
  // },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Projects() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("all");

  const allTags = useMemo(() => ["all", "featured", "mern", "fullstack", "frontend", "react"], []);

  const filtered = useMemo(() => {
    return projectsSeed.filter((p) => {
      const matchesTag = activeTag === "all" || p.tags.includes(activeTag);
      const q = query.trim().toLowerCase();
      const matchesQ =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.stack.join(" ").toLowerCase().includes(q);
      return matchesTag && matchesQ;
    });
  }, [activeTag, query]);

  return (
    <section id="projects" className="relative bg-slate-950 text-slate-100">
      {/* subtle gradient blobs */}
      <motion.div
        className="pointer-events-none absolute -top-16 left-10 w-72 h-72 bg-sky-600/20 rounded-full blur-3xl"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 0.6, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2 }}
      />

      <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-28">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Projects
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-3 text-slate-300 max-w-2xl">
            Selected work that showcases my skills across the MERN stack, UI engineering, and performance.
          </motion.p>

          {/* Controls */}
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`rounded-full px-3 py-1 text-sm border transition ${activeTag === tag
                      ? "bg-sky-500 text-slate-900 border-sky-500"
                      : "border-slate-700 text-slate-200 hover:bg-slate-800/60"
                    }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="ml-auto w-full sm:w-auto">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects..."
                className="w-full sm:w-64 rounded-xl bg-slate-900 border border-slate-700 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {filtered.map((p, idx) => (
            <motion.article
              key={p.id}
              variants={fadeUp}
              className="group rounded-2xl border border-slate-700 bg-slate-900/50 overflow-hidden shadow hover:shadow-sky-900/20 hover:border-slate-600 transition"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={p.image}
                  alt={`${p.title} screenshot`}
                  className="h-full w-full object-cover group-hover:scale-[1.03] transition"
                />
                {p.highlights?.length > 0 && (
                  <div className="absolute top-2 left-2 flex flex-wrap gap-2">
                    {p.highlights.slice(0, 2).map((h) => (
                      <span key={h} className="rounded-full bg-slate-950/70 backdrop-blur px-2 py-0.5 text-[10px] border border-slate-700">
                        {h}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-5">
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-slate-300 line-clamp-3">{p.description}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span key={s} className="text-[11px] rounded-full border border-slate-700 px-2 py-0.5 text-slate-300">
                      {s}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex items-center gap-3">
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-3 py-1.5 text-sm text-slate-900 font-medium shadow"
                    >
                      Live Demo
                    </a>
                  )}
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-slate-600 px-3 py-1.5 text-sm text-slate-200 hover:bg-slate-800/40"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* CTA */}
        <div className="mt-12 flex justify-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-slate-800 border border-slate-700 px-5 py-2 text-slate-200 hover:bg-slate-700/60"
          >
            Have a project in mind? Contact me
          </a>
        </div>
      </div>
    </section>
  );
}

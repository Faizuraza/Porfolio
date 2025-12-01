import React from "react";
import { motion, useAnimation, useInView } from "framer-motion";

// About section for Faizraza Sayyed — matches HomeHero styling
// Usage: <About /> somewhere below the hero. Ensure Tailwind + framer-motion are installed.

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const staggerWrap = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

export default function About() {
  return (
    <section id="about" className="relative bg-slate-900 text-slate-100">
      {/* soft animated blobs in background */}
      <motion.div
        className="pointer-events-none absolute -top-16 right-10 w-72 h-72 bg-sky-600/20 rounded-full blur-3xl"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 0.6, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2 }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-0 left-[-3rem] w-64 h-64 bg-purple-600/20 rounded-full blur-3xl"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 0.5, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2 }}
      />

      <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-28">
        <motion.div
          variants={staggerWrap}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-10"
        >
          {/* Left column: Intro card */}
          <motion.div variants={fadeUp} className="lg:col-span-1">
            <div className="rounded-2xl border border-slate-700 bg-slate-800/50 p-6 shadow-xl backdrop-blur">
              <h2 className="text-3xl font-extrabold tracking-tight">About Me</h2>
              <p className="mt-4 text-slate-300">
                I’m a <span className="text-sky-300 font-semibold">MERN Stack Developer</span> who loves building
                responsive, performant web apps with clean, accessible UI and robust backends. I focus on
                DX, code quality, and shipping features that matter.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-slate-300">
                <li className="flex items-start gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-sky-400"/>React, Node.js, Express, MongoDB</li>
                <li className="flex items-start gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-sky-400"/>Tailwind CSS, Framer Motion, Git</li>
                <li className="flex items-start gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-sky-400"/>APIs, Auth, and production-ready UIs</li>
              </ul>
            </div>
          </motion.div>

          {/* Right columns: Highlights + Timeline */}
          <motion.div variants={fadeUp} className="lg:col-span-2 space-y-10">
            {/* Highlights */}
            <div className="grid sm:grid-cols-2 gap-6">
              {[{
                title: "Frontend Excellence",
                text: "React + Tailwind to craft accessible, responsive interfaces with smooth UX.",
              },{
                title: "Backend Ready",
                text: "Node.js/Express APIs, MongoDB schemas, auth & integrations.",
              },{
                title: "Clean Architecture",
                text: "Reusable components, state management, and Git-driven workflows.",
              },{
                title: "Performance Focus",
                text: "Code-splitting, lazy-loading, and Lighthouse-friendly builds.",
              }].map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  className="rounded-2xl border border-slate-700 bg-slate-800/40 p-5 hover:bg-slate-800/60 transition shadow"
                >
                  <h3 className="text-lg font-semibold text-slate-100">{item.title}</h3>
                  <p className="mt-2 text-slate-300 text-sm">{item.text}</p>
                </motion.div>
              ))}
            </div>

            {/* Experience & Education Timeline */}
            <div className="rounded-2xl border border-slate-700 bg-slate-800/40 p-6 shadow">
              <h3 className="text-xl font-bold">Experience & Education</h3>
              <ol className="mt-6 relative border-s border-slate-700/60">
                {/* Internship */}
                <li className="pl-6 py-4 relative">
                  <span className="absolute left-[-6px] top-6 h-3 w-3 rounded-full bg-sky-400" />
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-semibold">Front-End Developer Intern — Kartik EngiTech Services Private Limited</p>
                    <span className="text-xs text-slate-400">2024</span>
                  </div>
                  <p className="mt-1 text-sm text-slate-300">Built real-world apps (Job-quick,Searchkro,Trello,), converted Figma to React, and migrated a project to Next.js; API integrations and debugging with DevTools.</p>
                </li>

                {/* BE */}
                <li className="pl-6 py-4 relative">
                  <span className="absolute left-[-6px] top-6 h-3 w-3 rounded-full bg-sky-400" />
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-semibold">B.E. in Computer Technology — RTM Nagpur University</p>
                    <span className="text-xs text-slate-400">2019 — 2023</span>
                  </div>
                  <p className="mt-1 text-sm text-slate-300">Core CS fundamentals and modern web dev foundations.</p>
                </li>

                {/* HSC */}
                <li className="pl-6 py-4 relative">
                  <span className="absolute left-[-6px] top-6 h-3 w-3 rounded-full bg-sky-400" />
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-semibold">Higher Secondary Certificate — Shree Shivaji College</p>
                    <span className="text-xs text-slate-400">2017 — 2019</span>
                  </div>
                  <p className="mt-1 text-sm text-slate-300">Mathematics & science focus.</p>
                </li>
              </ol>
            </div>

            {/* CTA Row */}
            <div className="flex flex-wrap items-center gap-4">
              <motion.a
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-5 py-2 text-slate-900 font-medium shadow"
              >
                Explore Projects
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-slate-600 px-5 py-2 text-slate-200 hover:bg-slate-700/40"
              >
                Contact Me
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

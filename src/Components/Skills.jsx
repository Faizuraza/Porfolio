import React from "react";
import { motion } from "framer-motion";

// Skills — Aurora cards, icon-first, NO ring animation
// Put PNG icons in public/assets/icons/*.png (adjust paths below if needed)

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const groups = [
  {
    title: "Frontend",
    items: [
      { label: "JavaScript", icon: "/assets/icons/javascript.1ccd6ef9bb1f9c84ef00.png", level: 90 },
      { label: "React", icon: "/assets/icons/react.0cf951a69d8e58f83f9d.png", level: 88 },
      { label: "HTML5", icon: "/assets/icons/html.2ba4fabc69a89a8f71e6.png", level: 92 },
      { label: "CSS3", icon: "/assets/icons/css.69a82c2d9e45c933a9cb.png", level: 88 },
      { label: "Tailwind", icon: "/assets/icons/tailwind.e47ac876b8d4d0bba47a.png", level: 84 },
    ],
  },
  {
    title: "Backend",
    items: [
      { label: "Node.js", icon: "/assets/icons/node.952a9ea986dcfa5229ad.png", level: 82 },
      //   { label: "Express", icon: "/assets/icons/express.png", level: 80 },
      { label: "REST APIs", icon: "/assets/icons/FastAPI.png", level: 82 },
      { label: "Auth / JWT", icon: "/assets/icons/icons8-json-web-token-48.png", level: 76 },
    ],
  },
  {
    title: "Databases",
    items: [
      { label: "MongoDB", icon: "/assets/icons/mongo.2a1528ddc31d4ce8518d.png", level: 80 },
      { label: "Firebase", icon: "/assets/icons/firebase.png", level: 72 },
    ],
  },
  {
    title: "Tools",
    items: [
      //   { label: "Git", icon: "/assets/icons/git.png", level: 82 },
      { label: "GitHub", icon: "/assets/icons/GitHub.png", level: 82 },
      { label: "Postman", icon: "/assets/icons/postman.png", level: 76 },
      { label: "Vercel", icon: "/assets/icons/vercel.png", level: 70 },
      { label: "VS Code", icon: "/assets/icons/Visual Studio Code (VS Code).png", level: 86 },
    ],
  },
];

function AuroraCard({ children }) {
  return (
    <div className="relative rounded-2xl p-[1px] bg-gradient-to-br from-sky-500/20 via-violet-500/20 to-fuchsia-500/20">
      <div className="relative rounded-2xl bg-slate-900/70 backdrop-blur-xl border border-slate-800/80 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] overflow-hidden">
        {/* subtle shine on hover */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent translate-x-[-100%] group-hover:translate-x-[120%] transition-transform duration-700" />
        {children}
      </div>
    </div>
  );
}

function SkillCard({ s }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6, rotate: -0.2 }}
      className="group"
    >
      <AuroraCard>
        <div className="p-4">
          <div className="flex items-center gap-4">
            <img
              src={s.icon}
              alt={s.label}
              className="h-16 w-16 object-contain rounded-xl ring-1 ring-slate-700 bg-slate-800/60 p-1"
              loading="lazy"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold text-slate-100 leading-tight truncate">
                  {s.label}
                </p>

                {/* gradient percent pill (no ring) */}
                <span className="shrink-0 text-[11px] px-2 py-1 rounded-full bg-gradient-to-r from-sky-500 to-violet-500 text-slate-900 font-semibold">
                  {s.level}%
                </span>
              </div>

              {/* slim progress bar */}
              <div className="mt-3 h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                <motion.div
                  className="h-full bg-sky-500"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${s.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>

              <p className="mt-2 text-xs text-slate-400">Proficiency</p>
            </div>
          </div>
        </div>
      </AuroraCard>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative bg-slate-950 text-slate-100">
      {/* background glow */}
      <motion.div
        className="pointer-events-none absolute -top-24 right-10 w-80 h-80 bg-sky-600/20 rounded-full blur-3xl"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 0.6, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2 }}
      />

      <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-28">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="text-3xl md:text-4xl font-extrabold tracking-tight"
        >
          Skills
        </motion.h2>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mt-3 text-slate-300 max-w-2xl"
        >
          Icon-first cards with a clean progress bar and gradient percentage pill.
        </motion.p>

        {groups.map((g) => (
          <div key={g.title} className="mt-10">
            <motion.h3
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="text-lg font-semibold text-slate-200 mb-4"
            >
              {g.title}
            </motion.h3>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              {g.items.map((s) => (
                <SkillCard key={s.label} s={s} />
              ))}
            </motion.div>
          </div>
        ))}

        {/* muted icon marquee */}
        <div className="mt-12 overflow-hidden opacity-90">
          <motion.div
            className="flex items-center gap-8 will-change-transform"
            initial={{ x: 0 }}
            animate={{ x: [0, -500, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          >
            {groups
              .flatMap((g) => g.items)
              .slice(0, 10)
              .map((s, i) => (
                <img
                  key={`${s.label}-${i}`}
                  src={s.icon}
                  alt={s.label}
                  className="h-10 w-10 object-contain opacity-80"
                  loading="lazy"
                  title={s.label}
                />
              ))}
            {groups
              .flatMap((g) => g.items)
              .slice(0, 10)
              .map((s, i) => (
                <img
                  key={`dup-${s.label}-${i}`}
                  src={s.icon}
                  alt={s.label}
                  className="h-10 w-10 object-contain opacity-80"
                  loading="lazy"
                  title={s.label}
                />
              ))}
          </motion.div>
        </div>

        {/* <p className="mt-6 text-xs text-slate-400">
          * Icons from your PNG set. Levels are self-assessed for quick context.
        </p> */}
      </div>
    </section>
  );
}

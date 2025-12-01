import React from "react";
import { motion } from "framer-motion";
import Navbar from "../Layout/Navbar";

// Animated Hero / Home section for Faizraza Sayyed's portfolio
export default function HomeHero() {
  return (
    <>
      <Navbar />
      <header className="relative bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-800 text-white overflow-hidden">
      {/* Animated background or gradient blobs */}
      <motion.div
        className="absolute top-0 left-0 w-72 h-72 bg-sky-600/30 rounded-full blur-3xl"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.5, scale: 1.2, x: 50, y: 30 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: 'mirror' }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-72 h-72 bg-purple-600/30 rounded-full blur-3xl"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.5, scale: 1.2, x: -50, y: -30 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: 'mirror' }}
      />

      <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-32 flex flex-col-reverse md:flex-row items-center gap-10">
        {/* Left: text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="w-full md:w-2/3"
        >
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-sm text-sky-300 font-medium"
          >
            Hi, I’m
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="mt-2 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight"
          >
            Faizraza Sayyed
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="block text-sky-300 text-2xl sm:text-3xl md:text-3xl font-semibold"
            >
              MERN Stack Developer
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-6 text-slate-300 max-w-2xl text-lg"
          >
            Building scalable web apps with <strong>React</strong>, <strong>Node.js</strong>, and <strong>MongoDB</strong> — focused on performance, accessible UIs and clean, maintainable code.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap gap-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
          >
            {["Download Resume", "View Projects", "Contact Me"].map((btn, i) => (
              <motion.a
                key={btn}
                href={
                  btn === "Download Resume"
                    ? "/assets/RenderCV_sb2nov_Theme__3_.pdf"
                    : btn === "View Projects"
                    ? "#projects"
                    : "#contact"
                }
                type="application/pdf"
                download={btn === "Download Resume"}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 font-medium transition transform hover:scale-[1.05] shadow-md ${
                  btn === "View Projects"
                    ? "bg-sky-500 text-slate-900"
                    : btn === "Download Resume"
                    ? "bg-sky-400/20 border border-sky-400 text-sky-300 hover:bg-sky-400/30"
                    : "border border-slate-600 text-slate-200 hover:bg-slate-700/40"
                }`}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              >
                {btn}
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-6 text-sm text-slate-400"
          >
            <span className="font-semibold text-slate-200">Location:</span> Nagpur, MH ·
            <a
              href="https://www.linkedin.com/in/faizraza-sayyed"
              target="_blank"
              rel="noreferrer"
              className="text-sky-300 ml-2 underline"
            >
              LinkedIn
            </a>
          </motion.div>
        </motion.div>

        {/* Right: animated avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="w-full md:w-1/3 flex justify-center md:justify-end"
        >
          <motion.div
            whileHover={{ scale: 1.05, rotate: 2 }}
            className="relative w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600 shadow-xl flex items-center justify-center"
          >
            <motion.img
              src="/assets/bfe00df6-7aa9-4ba3-a0d5-64c16e7d24c7.png"
              alt="Faizraza Sayyed avatar"
              className="object-cover w-80 h-80"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />

            <motion.div
              className="absolute -bottom-3 left-3 bg-sky-500 text-slate-900 px-3 py-1 rounded-full text-xs font-semibold shadow-lg"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              MERN
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative wave */}
      <svg viewBox="0 0 1440 60" className="w-full block" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d="M0 0h1440v20c-220 30-440 30-720 0C660 10 440 10 220 20H0V0z" fill="rgba(15,23,42,0.95)" />
      </svg>
    </header>
    </>
  );
}

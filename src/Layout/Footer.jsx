import React from "react";
import { motion } from "framer-motion";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-900 text-slate-300 border-t border-slate-800 py-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4"
      >
        {/* Branding */}
        <p className="text-sm text-slate-400 text-center md:text-left">
          © {year} <span className="font-semibold text-sky-400">Faizraza Sayyed</span>. All Rights Reserved.
        </p>

        {/* Social links */}
        <div className="flex items-center gap-5 text-xl">
          <a
            href="https://www.linkedin.com/in/faizraza"
            target="_blank"
            rel="noreferrer"
            className="hover:text-sky-400 transition"
            aria-label="LinkedIn"
          >
            <i className="fa-brands fa-linkedin"></i>
          </a>
          <a
            href="https://github.com/yourgithuburl"
            target="_blank"
            rel="noreferrer"
            className="hover:text-sky-400 transition"
            aria-label="GitHub"
          >
            <i className="fa-brands fa-github"></i>
          </a>
          <a
            href="mailto:faizuraza007@gmail.com"
            className="hover:text-sky-400 transition"
            aria-label="Email"
          >
            <i className="fa-solid fa-envelope"></i>
          </a>
        </div>
      </motion.div>
    </footer>
  );
}

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Sticky Navbar with smooth scroll + active section highlight (scrollspy)
// Sections expected: #home (header), #about, #projects, #contact
// Tailwind required. Place <Navbar /> at the top of App.jsx

const LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);

  // Smooth scroll handler
  const handleNav = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    // account for sticky nav height
    const yOffset = -200; // adjust if your navbar height changes
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  // Scroll spy using IntersectionObserver
  useEffect(() => {
    const opts = { root: null, rootMargin: "-50% 0px -50% 0px", threshold: 0 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    }, opts);

    LINKS.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Shadow on scroll
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      ref={navRef}
      className={`sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 bg-slate-900/80 transition-shadow ${
        scrolled ? "shadow-lg shadow-slate-950/40" : ""
      }`}
      id="nav"
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <a href="#home" onClick={handleNav("home")} className="font-extrabold tracking-tight text-slate-100">
          Faizraza<span className="text-sky-400">.</span>
        </a>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-1 relative">
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={handleNav(link.id)}
              className={`px-3 py-2 rounded-full text-sm transition-colors ${
                active === link.id
                  ? "text-slate-900 bg-sky-400 font-semibold"
                  : "text-slate-200 hover:bg-slate-800/60"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl border border-slate-700 text-slate-200"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            {open ? (
              <path d="M18.3 5.71 12 12l6.3 6.29-1.42 1.42L9.17 12l7.71-7.71z" />
            ) : (
              <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-slate-800"
          >
            <ul className="px-4 py-3 space-y-2">
              {LINKS.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={handleNav(l.id)}
                    className={`block w-full px-3 py-2 rounded-xl text-slate-200 ${
                      active === l.id ? "bg-sky-500 text-slate-900 font-semibold" : "hover:bg-slate-800/60"
                    }`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

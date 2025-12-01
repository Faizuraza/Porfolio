import React, { useCallback, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser"; // npm i @emailjs/browser

// Minimal toast helper (no external UI lib)
function Toast({ open, type = "success", message, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 pointer-events-none flex items-start justify-center p-4 z-[100]">
      <div className={`pointer-events-auto mt-4 rounded-xl border px-4 py-3 shadow-lg ${
        type === "success"
          ? "bg-emerald-500/10 border-emerald-500 text-emerald-300"
          : "bg-rose-500/10 border-rose-500 text-rose-300"
      }`}
      >
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold">{type === "success" ? "Sent" : "Error"}</span>
          <span className="text-sm opacity-90">{message}</span>
          <button onClick={onClose} className="ml-2 text-xs underline opacity-80 hover:opacity-100">Close</button>
        </div>
      </div>
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Contact() {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ open: false, type: "success", message: "" });

  const closeToast = useCallback(() => setToast((t) => ({ ...t, open: false })), []);

  const [values, setValues] = useState({ name: "", email: "", message: "", company: "" }); // company = honeypot
  const [errors, setErrors] = useState({});

  const validate = useCallback(() => {
    const e = {};
    if (!values.name.trim()) e.name = "Name is required";
    if (!values.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) e.email = "Enter a valid email";
    if (!values.message.trim()) e.message = "Please write a message";
    // Honeypot check
    if (values.company) e.company = "Spam detected";
    setErrors(e);
    return Object.keys(e).length === 0;
  }, [values]);

  const onChange = (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      // Replace with your EmailJS IDs (or use import.meta.env.VITE_* env vars)
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID";
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID";
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY";

      const result = await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: values.name,
          from_email: values.email,
          message: values.message,
          // Additional fields you can map in your EmailJS template:
          // subject: `Portfolio inquiry from ${values.name}`
        },
        { publicKey }
      );

      setToast({ open: true, type: "success", message: "Thanks! Your message has been sent." });
      setValues({ name: "", email: "", message: "", company: "" });
    } catch (err) {
      console.error(err);
      setToast({ open: true, type: "error", message: "Could not send message. Please try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative bg-slate-950 text-slate-100">
      <motion.div
        className="pointer-events-none absolute -top-16 left-10 w-72 h-72 bg-sky-600/20 rounded-full blur-3xl"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 0.6, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2 }}
      />

      <div className="relative max-w-4xl mx-auto px-6 py-20 md:py-28">
        <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }} className="text-3xl md:text-4xl font-extrabold tracking-tight">
          Contact
        </motion.h2>
        <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }} className="mt-3 text-slate-300 max-w-2xl">
          I’m open to freelance work, internships, or full‑time roles. Send me a message and I’ll get back to you.
        </motion.p>

        <motion.form
          ref={formRef}
          onSubmit={onSubmit}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/50 p-6 shadow backdrop-blur"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="name" className="text-sm text-slate-300">Name</label>
              <input
                id="name"
                name="name"
                value={values.name}
                onChange={onChange}
                placeholder="Your name"
                className={`mt-1 w-full rounded-xl bg-slate-950 border px-4 py-2 text-sm outline-none focus:ring-2 ${
                  errors.name ? "border-rose-500 focus:ring-rose-500" : "border-slate-700 focus:ring-sky-500"
                }`}
              />
              {errors.name && <p className="mt-1 text-xs text-rose-400">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="email" className="text-sm text-slate-300">Email</label>
              <input
                id="email"
                name="email"
                value={values.email}
                onChange={onChange}
                placeholder="you@example.com"
                className={`mt-1 w-full rounded-xl bg-slate-950 border px-4 py-2 text-sm outline-none focus:ring-2 ${
                  errors.email ? "border-rose-500 focus:ring-rose-500" : "border-slate-700 focus:ring-sky-500"
                }`}
              />
              {errors.email && <p className="mt-1 text-xs text-rose-400">{errors.email}</p>}
            </div>
          </div>

          <div className="mt-5">
            <label htmlFor="message" className="text-sm text-slate-300">Message</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={values.message}
              onChange={onChange}
              placeholder="Tell me a bit about your project or role..."
              className={`mt-1 w-full rounded-xl bg-slate-950 border px-4 py-2 text-sm outline-none focus:ring-2 ${
                errors.message ? "border-rose-500 focus:ring-rose-500" : "border-slate-700 focus:ring-sky-500"
              }`}
            />
            {errors.message && <p className="mt-1 text-xs text-rose-400">{errors.message}</p>}
          </div>

          {/* Honeypot field (hidden from users) */}
          <input
            type="text"
            name="company"
            value={values.company}
            onChange={onChange}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          <div className="mt-6 flex items-center gap-4">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-5 py-2 text-slate-900 font-medium shadow disabled:opacity-60"
            >
              {loading ? (
                <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 10 10h-2A8 8 0 1 1 12 4V2z"/></svg>
              ) : null}
              {loading ? "Sending..." : "Send Message"}
            </button>
            <a
              href="mailto:faizuraza007@gmail.com"
              className="inline-flex items-center gap-2 rounded-full border border-slate-600 px-5 py-2 text-slate-200 hover:bg-slate-800/40"
            >
              Or email directly
            </a>
          </div>

          <p className="mt-4 text-xs text-slate-400">
            This form uses EmailJS. Your email won’t be shared.
          </p>
        </motion.form>
      </div>
      <Toast open={toast.open} type={toast.type} message={toast.message} onClose={closeToast} />
    </section>
  );
}

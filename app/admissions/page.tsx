"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import toast from "react-hot-toast";
import Link from "next/link";
import {
  CheckCircle2, ArrowRight, Phone, Mail, MapPin,
  BookOpen, GraduationCap, Clock, FileText,
} from "lucide-react";

/* ─── Data ─────────────────────────────────────────────────── */

const programs = [
  {
    wing: "Vedantha Co-School",
    icon: BookOpen,
    color: "from-academy-navy to-blue-900",
    badgeClass: "badge-navy",
    classes: [
      { name: "LKG & UKG",             detail: "Play-way & activity-based early learning" },
      { name: "Class 1 – 5 (Primary)",  detail: "Telugu/English medium, strong foundations" },
      { name: "Class 6 – 8 (Middle)",   detail: "Subject specialisation, co-curricular focus" },
      { name: "Class 9 – 10 (SSC)",     detail: "Board exam preparation with mock tests" },
    ],
  },
  {
    wing: "Vedantha Junior College",
    icon: GraduationCap,
    color: "from-academy-gold to-amber-500",
    badgeClass: "badge-gold",
    classes: [
      { name: "MPC (Maths·Physics·Chemistry)",         detail: "IIT-JEE / JEE Mains / EAPCET coaching" },
      { name: "BiPC (Biology·Physics·Chemistry)",      detail: "NEET / EAPCET Medical coaching" },
      { name: "CEC (Commerce·Economics·Civics)",       detail: "CA Foundation / Commerce stream" },
      { name: "MEC (Maths·Economics·Commerce)",        detail: "Economics & Business stream" },
    ],
  },
];

const steps = [
  { n: "01", title: "Submit Enquiry",      desc: "Fill our online form or visit the campus on Church Street, Parvathipuram." },
  { n: "02", title: "Document Check",      desc: "Submit required documents at the admissions office for verification." },
  { n: "03", title: "Interaction / Test",  desc: "Brief interaction with faculty (and placement test for Class 3 and above)." },
  { n: "04", title: "Enrolment & Fee",     desc: "Complete fee payment and receive your admission letter — you're a Vedantian!" },
];

const documents = [
  "Birth Certificate (original + photocopy)",
  "Previous class Mark Sheet / TC",
  "Transfer Certificate from last school",
  "4 passport-size photographs",
  "Aadhaar of student & parent",
  "Caste Certificate (if applicable)",
  "Address Proof (Aadhaar / Ration Card)",
  "Inter Hall Ticket (for Junior College)",
];

const CLASS_OPTIONS = [
  "LKG", "UKG",
  "Class 1","Class 2","Class 3","Class 4","Class 5",
  "Class 6","Class 7","Class 8","Class 9","Class 10",
  "Inter 1st Year — MPC","Inter 1st Year — BiPC",
  "Inter 1st Year — CEC","Inter 1st Year — MEC",
  "Inter 2nd Year — MPC","Inter 2nd Year — BiPC",
  "Inter 2nd Year — CEC","Inter 2nd Year — MEC",
];

/* ─── Page ──────────────────────────────────────────────────── */

export default function AdmissionsPage() {
  const supabase = createClient();

  const [form, setForm] = useState({
    student_name: "", parent_name: "", phone: "",
    email: "", applying_for: "", current_school: "", message: "",
  });
  const [loading,   setLoading]   = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.student_name || !form.parent_name || !form.phone) {
      toast.error("Please fill all required fields.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("admissions_enquiries").insert([form]);
    setLoading(false);
    if (error) { toast.error("Submission failed. Please try again or call us."); return; }
    toast.success("Enquiry submitted! We will contact you within 24 hours.");
    setSubmitted(true);
  }

  return (
    <>
      {/* ── Hero ── */}
      <div className="page-hero">
        <div className="page-hero-inner pt-6">
          <div className="badge badge-gold mb-6 text-sm px-4 py-2">Admissions 2025–26</div>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Join the Vedantha Family
          </h1>
          <p className="text-blue-200 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Admissions open for LKG through Intermediate. Limited seats — apply early to secure
            your child's place in Parvathipuram's premier institution.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <a
              href="tel:8919406296"
              className="flex items-center gap-2 bg-academy-gold hover:bg-yellow-500 text-white font-bold px-7 py-3.5 rounded-xl transition-all hover:-translate-y-0.5"
            >
              <Phone className="w-5 h-5" /> Call: 89194 06296
            </a>
            <a
              href="#enquiry-form"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-7 py-3.5 rounded-xl border border-white/30 transition-all"
            >
              <FileText className="w-5 h-5" /> Online Enquiry Form
            </a>
          </div>
        </div>
      </div>

      {/* ── Programs Offered ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-title">Programs We Offer</h2>
            <p className="section-subtitle mt-4 max-w-2xl mx-auto">
              Choose from our comprehensive range of programs — from Early Childhood to IIT-NEET
              Intermediate coaching, all under one roof.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {programs.map(({ wing, icon: Icon, color, classes }) => (
              <div key={wing} className="card overflow-hidden">
                <div className={`bg-gradient-to-br ${color} p-6 text-white`}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-heading text-xl font-bold">{wing}</h3>
                  </div>
                  <p className="text-white/70 text-xs">Vedantha Academy, Parvathipuram</p>
                </div>
                <div className="p-6 space-y-4">
                  {classes.map(({ name, detail }) => (
                    <div key={name} className="flex items-start gap-3 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                      <CheckCircle2 className="w-5 h-5 text-academy-gold shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-academy-navy text-sm">{name}</div>
                        <div className="text-gray-500 text-xs mt-0.5">{detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Key highlights */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: "🏆", title: "IIT / NEET Coaching",   desc: "Integrated coaching from Day 1 for JEE Mains, Advanced, and NEET" },
              { icon: "👨‍🏫", title: "30+ Expert Faculty",    desc: "IIT-trained senior lecturers with decades of teaching experience" },
              { icon: "📚", title: "Daily Practice Tests",   desc: "Rigorous daily assessments modelled on board and competitive exams" },
              { icon: "💰", title: "Affordable Fees",        desc: "World-class education at a fraction of corporate college costs" },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="card p-5 text-center hover:-translate-y-1 transition-transform">
                <div className="text-3xl mb-3">{icon}</div>
                <h4 className="font-heading font-bold text-academy-navy text-base mb-1">{title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Admission Process ── */}
      <section className="py-20 bg-academy-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-title">How to Apply</h2>
            <p className="section-subtitle mt-4">Simple, transparent, four-step process.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={s.n} className="relative card p-7 hover:-translate-y-1 transition-transform">
                <div className="font-heading text-6xl font-bold text-academy-gold/15 mb-3 leading-none">{s.n}</div>
                <h3 className="font-heading font-bold text-academy-navy text-lg mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                {i < steps.length - 1 && (
                  <ArrowRight className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 text-academy-gold hidden lg:block z-10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Documents + Enquiry Form ── */}
      <section id="enquiry-form" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">

            {/* Left: Documents + Contact */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h3 className="font-heading text-2xl font-bold text-academy-navy mb-6 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-academy-gold" /> Required Documents
                </h3>
                <div className="space-y-3">
                  {documents.map((d) => (
                    <div key={d} className="flex items-start gap-3 p-3.5 bg-academy-warm rounded-xl border border-academy-gold/10">
                      <CheckCircle2 className="w-4 h-4 text-academy-gold shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact box */}
              <div className="bg-academy-navy rounded-2xl p-6 text-white">
                <h4 className="font-heading font-bold text-lg mb-4 text-academy-gold">Admissions Office</h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-academy-gold shrink-0 mt-0.5" />
                    <p className="text-blue-200 text-sm leading-relaxed">
                      Church Street, Parvathipuram – 535501<br />
                      Parvathipuram Manyam, Andhra Pradesh
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-academy-gold shrink-0" />
                    <div className="text-sm space-y-0.5">
                      <a href="tel:8919406296" className="block text-blue-200 hover:text-white transition-colors font-medium">89194 06296</a>
                      <a href="tel:9505533067" className="block text-blue-200 hover:text-white transition-colors">95055 33067</a>
                      <a href="tel:8498813113" className="block text-blue-200 hover:text-white transition-colors">84988 13113</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-academy-gold shrink-0" />
                    <a href="mailto:vedanthajuniorcollege@gmail.com"
                      className="text-blue-200 hover:text-white text-sm transition-colors">
                      vedanthajuniorcollege@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-academy-gold shrink-0" />
                    <p className="text-blue-200 text-sm">Mon – Sat: 9:00 AM – 4:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-3">
              <h3 className="font-heading text-2xl font-bold text-academy-navy mb-6">
                Online Enquiry Form
              </h3>

              {submitted ? (
                <div className="card p-12 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="font-heading font-bold text-xl text-academy-navy mb-2">
                    Enquiry Received! 🎉
                  </h4>
                  <p className="text-gray-500 text-sm max-w-sm mx-auto leading-relaxed">
                    Thank you for your interest in Vedantha Academy. Our admissions team will
                    contact you within 24 hours. You can also call us directly at{" "}
                    <a href="tel:8919406296" className="text-academy-gold font-semibold">89194 06296</a>.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="card p-7 space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="label">Student Name *</label>
                      <input className="input" required placeholder="Full name of student"
                        value={form.student_name} onChange={set("student_name")} />
                    </div>
                    <div>
                      <label className="label">Parent / Guardian Name *</label>
                      <input className="input" required placeholder="Father / Mother name"
                        value={form.parent_name} onChange={set("parent_name")} />
                    </div>
                    <div>
                      <label className="label">Phone Number *</label>
                      <input className="input" type="tel" required placeholder="10-digit mobile"
                        value={form.phone} onChange={set("phone")} />
                    </div>
                    <div>
                      <label className="label">Email Address</label>
                      <input className="input" type="email" placeholder="Optional"
                        value={form.email} onChange={set("email")} />
                    </div>
                    <div>
                      <label className="label">Applying for *</label>
                      <select className="input" required value={form.applying_for} onChange={set("applying_for")}>
                        <option value="">— Select class / stream —</option>
                        {CLASS_OPTIONS.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="label">Current School / College</label>
                      <input className="input" placeholder="Previous institution name"
                        value={form.current_school} onChange={set("current_school")} />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="label">Message / Special Requirements</label>
                      <textarea className="input resize-none" rows={3}
                        placeholder="Any questions, requirements, or additional information…"
                        value={form.message} onChange={set("message")} />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full justify-center py-4 text-base disabled:opacity-60"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        Submitting…
                      </span>
                    ) : (
                      "Submit Enquiry →"
                    )}
                  </button>

                  <p className="text-center text-gray-400 text-xs">
                    Or call us directly:{" "}
                    <a href="tel:8919406296" className="text-academy-gold font-semibold hover:underline">89194 06296</a>
                    {" "}·{" "}
                    <a href="tel:9505533067" className="text-academy-gold font-semibold hover:underline">95055 33067</a>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Note ── */}
      <section className="py-10 bg-academy-warm border-t border-academy-gold/10">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm leading-relaxed">
            <strong className="text-academy-navy">Note:</strong> Detailed fee structure will be shared during the personal interaction at the
            admissions office. Vedantha Academy is committed to making quality education accessible
            — scholarship support is available for deserving students.
          </p>
        </div>
      </section>
    </>
  );
}
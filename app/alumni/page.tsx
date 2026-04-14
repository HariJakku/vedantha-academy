"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import toast from "react-hot-toast";
import { Star, Users, Send } from "lucide-react";

const ALUMNI_DATA = [
  { name: "Suresh Babu Kotha",   passed_year: 2018, current_position: "Software Engineer", organization: "TCS, Hyderabad",    testimonial: "Vedantha Academy gave me the foundation to compete at a national level. The teachers here genuinely care about each student's growth." },
  { name: "Meena Kumari Pallapu",passed_year: 2019, current_position: "MBBS Student",      organization: "AIIMS, Delhi",      testimonial: "The dedication of faculty at Vedantha is unmatched. I owe my success in NEET entirely to this institution and its teachers." },
  { name: "Raj Kiran Voora",     passed_year: 2020, current_position: "B.Tech CSE",         organization: "IIT Bombay",        testimonial: "Vedantha shaped my thinking and discipline. The environment pushes you to excel, and the results speak for themselves." },
  { name: "Ananya Devi Rao",     passed_year: 2021, current_position: "CA Finalist",        organization: "ICAI",              testimonial: "The strong foundation in Mathematics and Commerce at Vedantha made my CA journey much smoother." },
];

export default function AlumniPage() {
  const supabase = createClient();
  const [form, setForm] = useState({
    name: "", passed_year: "", current_position: "", organization: "",
    achievement: "", testimonial: "", email: "",
  });
  const [saving, setSaving] = useState(false);
  const [done,   setDone]   = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.passed_year) { toast.error("Name and year are required."); return; }
    setSaving(true);
    const { error } = await supabase.from("alumni").insert([{
      ...form,
      passed_year: parseInt(form.passed_year),
      is_approved: false,
    }]);
    setSaving(false);
    if (error) { toast.error("Submission failed."); return; }
    toast.success("Profile submitted for approval!");
    setDone(true);
  }

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-inner pt-6">
          <div className="badge badge-gold mb-6 text-sm px-4 py-2">
            <Users className="w-4 h-4 inline mr-1" /> Our Alumni
          </div>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mb-6">
            Alumni Network
          </h1>
          <p className="text-blue-200 text-xl max-w-2xl mx-auto">
            Our graduates are making their mark across India and the world.
            Join the Vedantha alumni family.
          </p>
        </div>
      </div>

      {/* Testimonials grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-title">Voices of Our Alumni</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {ALUMNI_DATA.map((a, i) => (
              <div key={i} className="card p-6 hover:-translate-y-1 transition-transform duration-300 relative">
                <div className="flex mb-3">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} className="w-3.5 h-3.5 fill-academy-gold text-academy-gold" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm italic leading-relaxed mb-5">"{a.testimonial}"</p>
                <div className="border-t border-gray-100 pt-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-academy-navy flex items-center justify-center shrink-0">
                    <span className="text-white text-sm font-bold">{a.name[0]}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-academy-navy text-sm">{a.name}</div>
                    <div className="text-gray-400 text-xs">{a.current_position}</div>
                    <div className="text-academy-gold text-xs font-semibold">{a.organization}</div>
                    <div className="text-gray-300 text-xs">Batch {a.passed_year}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Register form */}
          <div className="max-w-2xl mx-auto">
            <div className="card p-8">
              <h3 className="font-heading text-2xl font-bold text-academy-navy mb-2 flex items-center gap-2">
                <Send className="w-5 h-5 text-academy-gold" /> Register as Alumni
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                Are you a Vedantha graduate? Share your story and inspire the next generation.
              </p>
              {done ? (
                <div className="text-center py-10">
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-7 h-7 text-green-600 fill-current" />
                  </div>
                  <h4 className="font-heading font-bold text-xl text-academy-navy mb-2">Profile Submitted!</h4>
                  <p className="text-gray-500 text-sm">Your alumni profile will be reviewed and published shortly. Thank you!</p>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="label">Full Name *</label>
                      <input className="input" required value={form.name}
                        onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} placeholder="Your full name" />
                    </div>
                    <div>
                      <label className="label">Year of Passing *</label>
                      <input className="input" type="number" required min={1999} max={2024}
                        value={form.passed_year}
                        onChange={(e) => setForm((p) => ({ ...p, passed_year: e.target.value }))} placeholder="e.g. 2020" />
                    </div>
                    <div>
                      <label className="label">Current Position</label>
                      <input className="input" value={form.current_position}
                        onChange={(e) => setForm((p) => ({ ...p, current_position: e.target.value }))} placeholder="e.g. Software Engineer" />
                    </div>
                    <div>
                      <label className="label">Organization / College</label>
                      <input className="input" value={form.organization}
                        onChange={(e) => setForm((p) => ({ ...p, organization: e.target.value }))} placeholder="e.g. IIT Madras" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="label">Achievement / Highlight</label>
                      <input className="input" value={form.achievement}
                        onChange={(e) => setForm((p) => ({ ...p, achievement: e.target.value }))} placeholder="e.g. AIR 500 in JEE Advanced" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="label">Your Message for Current Students</label>
                      <textarea className="input resize-none" rows={3} value={form.testimonial}
                        onChange={(e) => setForm((p) => ({ ...p, testimonial: e.target.value }))} placeholder="Share your experience and words of inspiration…" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="label">Email (for verification)</label>
                      <input className="input" type="email" value={form.email}
                        onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} placeholder="your@email.com" />
                    </div>
                  </div>
                  <button type="submit" disabled={saving} className="btn-primary w-full justify-center py-3.5 disabled:opacity-60">
                    {saving ? "Submitting…" : "Submit My Alumni Profile"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
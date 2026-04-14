"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [sent, setSent]   = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // In production: send to a Supabase table or email service
    toast.success("Message sent! We'll get back to you within 24 hours.");
    setSent(true);
  }

  const contacts = [
    { icon: MapPin, label: "Address",   value: "Vedantha Academy, Main Road, Parvathipuram,\nVizianagaram District, Andhra Pradesh – 535501" },
    { icon: Phone,  label: "Phone",     value: "+91 80190 00000\n+91 98765 43210" },
    { icon: Mail,   label: "Email",     value: "info@vedanthaacademy.in\nadmissions@vedanthaacademy.in" },
    { icon: Clock,  label: "Office Hours", value: "Mon – Sat: 9:00 AM – 5:00 PM\nSunday: Closed" },
  ];

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-inner pt-6">
          <div className="badge badge-gold mb-6 text-sm px-4 py-2">Get in Touch</div>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mb-6">Contact Us</h1>
          <p className="text-blue-200 text-xl max-w-2xl mx-auto">
            We&apos;re here to help. Reach out for admissions, academic queries, or any information.
          </p>
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">

            {/* Contact info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="section-title mb-4">We&apos;d Love to<br />Hear from You</h2>
                <p className="text-gray-600 leading-relaxed">
                  Whether you&apos;re a parent enquiring about admissions, a student needing guidance,
                  or an alumnus wanting to reconnect — we welcome you.
                </p>
              </div>

              {contacts.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-academy-navy flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-academy-gold" />
                  </div>
                  <div>
                    <div className="font-semibold text-academy-navy text-sm mb-1">{label}</div>
                    <div className="text-gray-600 text-sm whitespace-pre-line">{value}</div>
                  </div>
                </div>
              ))}

              {/* Map */}
              <div className="rounded-2xl overflow-hidden border border-gray-200 h-52 bg-gray-100 flex items-center justify-center">
                <a
                  href="https://maps.google.com/?q=Parvathipuram+Andhra+Pradesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4" /> Open in Google Maps
                </a>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="card p-8">
                <h3 className="font-heading text-2xl font-bold text-academy-navy mb-6">Send a Message</h3>
                {sent ? (
                  <div className="text-center py-14">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="font-heading font-bold text-xl text-academy-navy mb-2">Message Received!</h4>
                    <p className="text-gray-500 text-sm">Our team will respond within 24 hours. Thank you for reaching out.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="label">Your Name *</label>
                        <input className="input" required value={form.name}
                          onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} placeholder="Full name" />
                      </div>
                      <div>
                        <label className="label">Email *</label>
                        <input className="input" type="email" required value={form.email}
                          onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} placeholder="your@email.com" />
                      </div>
                      <div>
                        <label className="label">Phone</label>
                        <input className="input" type="tel" value={form.phone}
                          onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} placeholder="+91 98765 43210" />
                      </div>
                      <div>
                        <label className="label">Subject</label>
                        <select className="input" value={form.subject}
                          onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))}>
                          <option value="">Select a topic</option>
                          <option>Admissions Enquiry</option>
                          <option>Fee Structure</option>
                          <option>Academic Information</option>
                          <option>Transport</option>
                          <option>Alumni</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div className="sm:col-span-2">
                        <label className="label">Message *</label>
                        <textarea className="input resize-none" rows={5} required value={form.message}
                          onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                          placeholder="Write your message here…" />
                      </div>
                    </div>
                    <button type="submit" className="btn-primary w-full justify-center py-3.5 text-base">
                      <Send className="w-5 h-5" /> Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
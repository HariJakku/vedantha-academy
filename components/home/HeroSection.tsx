"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowRight, BookOpen, GraduationCap } from "lucide-react";

const slides = [
  {
    tag:     "IIT-NEET Academy · Parvathipuram",
    heading: "Believe in Vedantha,\nShape Your Future",
    sub:     "Quality education from LKG through Intermediate — affordable, rigorous, and right here in Parvathipuram.",
    cta:     "Apply for Admission",
    href:    "/admissions",
  },
  {
    tag:     "16+ Vedantians in IIT & NIT",
    heading: "Where Parvathipuram\nMeets Excellence",
    sub:     "2000+ students served, 280+ in top EAPCET colleges, IIT-trained faculty — results that speak for themselves.",
    cta:     "View Results",
    href:    "/results",
  },
  {
    tag:     "LKG to Intermediate · One Campus",
    heading: "Complete Education,\nOne Trusted Family",
    sub:     "From a child's first day of school to cracking JEE and NEET — everything under one roof.",
    cta:     "Explore Programs",
    href:    "/admissions",
  },
];

const stats = [
  { n: "16+",   l: "IIT & NIT" },
  { n: "280+",  l: "EAPCET Colleges" },
  { n: "2000+", l: "Students Served" },
  { n: "30+",   l: "Expert Faculty" },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
      setAnimKey((k) => k + 1);
    }, 5500);
    return () => clearInterval(t);
  }, []);

  const slide = slides[current];

  return (
    <section className="relative min-h-[calc(100vh-6.5rem)] flex flex-col justify-center overflow-hidden bg-academy-navy">

      {/* ── Subtle background texture ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-academy-gold/[0.08] rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 py-20 text-center w-full">

        {/* ── Identity Block ── */}
        <div className="mb-12">
          {/* Academy name */}
          <p className="font-heading text-3xl sm:text-4xl font-bold text-white mb-5 tracking-tight">
            Vedantha Academy
          </p>

          {/* Wings */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 mb-4">
            <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-white/70 border border-white/15 px-4 py-1.5 rounded-full">
              <BookOpen className="w-3.5 h-3.5 text-academy-gold" />
              Vedantha Co-School
            </span>
            <span className="hidden sm:block text-white/20 text-xs">|</span>
            <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-white/70 border border-white/15 px-4 py-1.5 rounded-full">
              <GraduationCap className="w-3.5 h-3.5 text-academy-gold" />
              Vedantha Junior College
            </span>
          </div>

          {/* Registration line */}
          <p className="text-white/35 text-[11px] tracking-wide">
            Church Street, Parvathipuram – 535501
            <span className="mx-2 opacity-50">·</span>
            R.C. No. ESE51-13021/45/2021-C
            <span className="mx-2 opacity-50">·</span>
            College Code: 03073
          </p>

          {/* Divider */}
          <div className="mt-8 h-px w-16 bg-academy-gold/30 mx-auto" />
        </div>

        {/* ── Slide Content ── */}
        <div key={animKey} className="animate-fade-in-up">
          {/* Tag */}
          <p className="text-academy-gold/80 text-[12px] font-semibold tracking-widest uppercase mb-5">
            {slide.tag}
          </p>

          {/* Headline */}
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.1] mb-6 whitespace-pre-line">
            {slide.heading}
          </h1>

          {/* Sub */}
          <p className="text-white/55 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-10">
            {slide.sub}
          </p>

          {/* CTA */}
          <Link
            href={slide.href}
            className="inline-flex items-center gap-2 bg-academy-gold hover:bg-yellow-500 text-white font-semibold text-sm px-7 py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-academy-gold/30"
          >
            {slide.cta}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* ── Slide dots ── */}
        <div className="flex items-center justify-center gap-1.5 mt-12">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrent(i); setAnimKey((k) => k + 1); }}
              className={`rounded-full transition-all duration-300 ${
                i === current ? "w-6 h-1.5 bg-academy-gold" : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-4 gap-3 mt-16 pt-8 border-t border-white/[0.08]">
          {stats.map(({ n, l }) => (
            <div key={l} className="text-center">
              <div className="font-heading text-xl sm:text-2xl font-bold text-white">{n}</div>
              <div className="text-white/35 text-[11px] mt-0.5 font-medium leading-tight">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Wave ── */}
      <div className="absolute bottom-0 inset-x-0 pointer-events-none">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
          <path
            d="M0 60L60 52C120 44 240 28 360 24C480 20 600 28 720 32C840 36 960 36 1080 32C1200 28 1320 20 1380 16L1440 12V60H0Z"
            fill="#fdfaf4"
          />
        </svg>
      </div>
    </section>
  );
}
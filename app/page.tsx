"use client";
export const dynamic = "force-dynamic";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import ChiefMentorMessage from "@/components/home/CheifMentorMessage";
import Link from "next/link";
import {
  GraduationCap, BookOpen, Award, Users,
  ArrowRight, CheckCircle2, Phone,
  Star, Zap, Shield,
} from "lucide-react";

const programs = [
  {
    icon: BookOpen,
    title: "Co-School (LKG – 10)",
    desc: "Strong academic foundation with discipline and conceptual clarity from early childhood through SSC board exams.",
    color: "bg-blue-50 border-blue-100",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    href: "/admissions",
  },
  {
    icon: GraduationCap,
    title: "Intermediate — MPC / BiPC",
    desc: "Focused IIT-JEE, NEET & EAPCET preparation with IIT-trained expert faculty and daily practice sessions.",
    color: "bg-yellow-50 border-yellow-100",
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
    href: "/admissions",
  },
  {
    icon: Award,
    title: "CEC / MEC Streams",
    desc: "Commerce and Economics streams with CA Foundation coaching and professional pathway guidance.",
    color: "bg-emerald-50 border-emerald-100",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    href: "/admissions",
  },
];

const whyChoose = [
  {
    icon: Users,
    title: "30+ Expert Faculty",
    desc: "IIT-trained senior lecturers with decades of experience, mentoring every student personally.",
  },
  {
    icon: Award,
    title: "Proven Track Record",
    desc: "16+ students in IIT & NIT, 280+ in top EAPCET colleges — results that speak for themselves.",
  },
  {
    icon: Zap,
    title: "Daily Practice Tests",
    desc: "Rigorous daily assessments modelled on board and competitive exam patterns for consistent excellence.",
  },
  {
    icon: Shield,
    title: "Safe & Inclusive Campus",
    desc: "CCTV-secured, RO water, medical room, transport — everything a student needs under one roof.",
  },
  {
    icon: Star,
    title: "Affordable Fees",
    desc: "World-class education at a fraction of corporate college costs. Scholarships available for deserving students.",
  },
  {
    icon: CheckCircle2,
    title: "Complete Education",
    desc: "Seamless journey from LKG through Intermediate — no need to switch institutions as your child grows.",
  },
];

export default function HomePage() {
  return (
    <main className="bg-academy-cream text-gray-900 overflow-x-hidden">

      {/* ── Hero ── */}
      <HeroSection />

      {/* ── About (Premium 2-Col) ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

          {/* Text */}
          <div>
            <div className="inline-flex items-center gap-2 bg-academy-gold/10 text-academy-gold px-4 py-1.5 rounded-full text-sm font-bold mb-5">
              About Vedantha Academy
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-academy-navy mb-6 leading-tight">
              A Trusted Path from School to IIT & NEET
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Vedantha Academy, Parvathipuram, provides a complete academic journey from LKG to
              Intermediate. With expert faculty, disciplined learning, and results that speak for
              themselves — we help every student achieve their highest potential.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Founded by <span className="font-semibold text-academy-navy">Dr. Penta Apparao</span>, a
              Ph.D. physicist with 30+ years of experience, Vedantha stands as Parvathipuram's premier
              IIT-NEET Academy — bringing city-quality education to every family, at affordable cost.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-academy-navy text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-900 transition-all duration-200 hover:-translate-y-0.5 text-sm"
              >
                Our Story <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/admissions"
                className="inline-flex items-center gap-2 bg-academy-gold text-white font-semibold px-6 py-3 rounded-xl hover:bg-yellow-600 transition-all duration-200 hover:-translate-y-0.5 text-sm"
              >
                Apply Now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Stats Glass Card */}
          <div className="bg-academy-navy rounded-3xl p-8 shadow-xl relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-academy-gold/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-blue-500/10 rounded-full blur-3xl" />
            <p className="text-academy-gold text-xs font-bold uppercase tracking-widest mb-6 relative z-10">Our Track Record</p>
            <div className="grid grid-cols-2 gap-5 relative z-10">
              {[
                { n: "16+",   l: "IIT & NIT Seats",      sub: "Vedantians" },
                { n: "280+",  l: "Top EAPCET Colleges",   sub: "Placed Students" },
                { n: "2000+", l: "Students Served",       sub: "Both Wings" },
                { n: "30+",   l: "Expert Faculty",        sub: "& Staff" },
              ].map((item) => (
                <div key={item.l} className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center hover:bg-white/10 transition-colors duration-200">
                  <div className="font-heading text-3xl font-bold text-academy-gold">{item.n}</div>
                  <div className="text-white text-sm font-semibold mt-1">{item.l}</div>
                  <div className="text-blue-300 text-xs mt-0.5">{item.sub}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-5 border-t border-white/10 relative z-10">
              <p className="text-academy-gold font-heading text-sm font-bold italic text-center">
                "Believe in Vedantha: To Shape Up the Future Torch Bearers"
              </p>
              <p className="text-blue-300 text-xs text-center mt-1">— Dr. Penta Apparao, Chief Mentor</p>
            </div>
          </div>

        </div>
      </section>

      {/* ── Stats Section (animated counters) ── */}
      <StatsSection />

      {/* ── Programs ── */}
      <section className="py-24 px-6 bg-academy-warm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-academy-gold/10 text-academy-gold px-4 py-1.5 rounded-full text-sm font-bold mb-4">
              Programs We Offer
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-academy-navy leading-tight">
              From LKG to Intermediate —<br className="hidden sm:block" /> Everything Under One Roof
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-7">
            {programs.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className={`group card border ${item.color} p-8 hover:-translate-y-2 transition-all duration-300 block`}
              >
                <div className={`w-13 h-13 ${item.iconBg} rounded-2xl flex items-center justify-center mb-6 w-14 h-14 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className={`w-7 h-7 ${item.iconColor}`} />
                </div>
                <h3 className="font-heading text-xl font-bold text-academy-navy mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">
                  {item.desc}
                </p>
                <span className="inline-flex items-center gap-1.5 text-academy-gold text-sm font-semibold group-hover:gap-3 transition-all duration-200">
                  Learn More <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-academy-gold/10 text-academy-gold px-4 py-1.5 rounded-full text-sm font-bold mb-4">
              Why Vedantha Academy
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-academy-navy leading-tight">
              Six Reasons Families Choose Us
            </h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto text-base">
              More than a school — a community committed to every student's success.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChoose.map((item, i) => (
              <div
                key={item.title}
                className="group p-7 rounded-2xl border border-gray-100 bg-white hover:border-academy-gold/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="w-12 h-12 bg-academy-navy/5 rounded-xl flex items-center justify-center mb-4 group-hover:bg-academy-gold/10 transition-colors duration-300">
                  <item.icon className="w-6 h-6 text-academy-navy group-hover:text-academy-gold transition-colors duration-300" />
                </div>
                <h3 className="font-heading font-bold text-academy-navy text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Chief Mentor & Director Messages ── */}
      <ChiefMentorMessage />

      {/* ── CTA Banner ── */}
      <section className="py-20 px-6 bg-academy-warm">
        <div className="max-w-4xl mx-auto">
          <div className="bg-academy-navy rounded-3xl p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-academy-gold/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-academy-gold/20 border border-academy-gold/40 text-academy-gold px-5 py-2 rounded-full text-sm font-bold mb-6">
                🎓 Admissions Open 2025–26
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                Ready to Join the Vedantha Family?
              </h2>
              <p className="text-blue-200 text-base md:text-lg mb-8 max-w-xl mx-auto leading-relaxed">
                Admissions open for all classes — LKG to Intermediate (MPC / BiPC / CEC / MEC).
                Limited seats. Apply early to secure your child's future.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/admissions"
                  className="inline-flex items-center justify-center gap-2 bg-academy-gold hover:bg-yellow-500 text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-academy-gold/30 text-base"
                >
                  Apply Now <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="tel:8919406296"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-xl border border-white/30 transition-all duration-200 text-base"
                >
                  <Phone className="w-5 h-5" /> 89194 06296
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
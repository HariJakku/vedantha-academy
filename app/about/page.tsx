import type { Metadata } from "next";
import Link from "next/link";
import {
  CheckCircle2, Target, Eye, Heart,
  Quote, ArrowRight, GraduationCap, BookOpen,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Vedantha Academy, Parvathipuram — housing Vedantha Co-School (LKG–Class 10) and Vedantha Junior College (IIT-NEET Academy). Learn about Dr. Penta Apparao, Shri Lakshmunaidu Sristu, our vision and track record.",
};

/* ─── Data ─────────────────────────────────────────────────── */

const trackRecord = [
  { n: "16+",   l: "Vedantians in IIT & NIT",      color: "text-blue-400" },
  { n: "2",     l: "Vedantians in NEET",            color: "text-green-400" },
  { n: "280+",  l: "In Top EAPCET Colleges",        color: "text-purple-400" },
  { n: "2000+", l: "Students Served — Both Wings",  color: "text-academy-gold" },
];

const values = [
  {
    icon: Eye,
    title: "Vision",
    desc: "To be a center of academic excellence empowering students with knowledge, skills, and values — fostering innovation, creativity, and leadership from LKG through Intermediate.",
    bg: "bg-blue-50",
    accent: "text-blue-600",
  },
  {
    icon: Target,
    title: "Mission",
    desc: "To provide a dynamic, inclusive learning environment that promotes intellectual growth and ethical values — from strong primary foundations to IIT/NEET competitive success.",
    bg: "bg-yellow-50",
    accent: "text-yellow-600",
  },
  {
    icon: Heart,
    title: "Values",
    desc: "Discipline, dedication, and determination. Every student — whether in Class 1 or Intermediate 2nd Year — is treated as a future leader deserving world-class education.",
    bg: "bg-rose-50",
    accent: "text-rose-600",
  },
  {
    icon: CheckCircle2,
    title: "Commitment",
    desc: "Affordable, high-quality education for students of Parvathipuram Manyam — giving every child the same competitive edge as any premium institution in Visakhapatnam or Hyderabad.",
    bg: "bg-emerald-50",
    accent: "text-emerald-600",
  },
];

const milestones = [
  { year: "2020", event: "Penta Sobha Sri Memorial Educational Society founded by Dr. Penta Apparao — a vision born from personal experience to democratise quality education in Parvathipuram." },
  { year: "2021", event: "Vedantha Junior College formally inaugurated on Church Street, Parvathipuram. College Code: 03073. First batch of MPC & BiPC Intermediate students enrolled." },
  { year: "2022", event: "Vedantha Co-School wing launched — LKG through Class 10 — on the same campus. First board batch produced outstanding SSC results." },
  { year: "2023", event: "16+ students secured IIT & NIT seats. 2 students in NEET. 280+ students placed in top EAPCET institutions across Andhra Pradesh." },
  { year: "2024", event: "2000+ students served across both wings. 30+ faculty. New smart classrooms, labs and digital infrastructure inaugurated." },
  { year: "2025", event: "Admissions open for all classes LKG – Intermediate. Expanding IIT/NEET programs with new study centres and hostel facilities." },
];

const infrastructure = [
  "Smart Classrooms with Digital Boards",
  "Physics, Chemistry & Biology Labs",
  "Computer Lab — 50+ Systems",
  "Library & E-Library Access",
  "IIT-NEET Dedicated Study Hall",
  "Indoor & Outdoor Sports Facilities",
  "CCTV Surveillance — 24 × 7",
  "RO Drinking Water on Campus",
  "Canteen with Nutritious Meals",
  "Student Transport Facility",
  "Medical Room & First Aid",
  "Parent–Teacher Conference Hall",
];

/* ─── Page ──────────────────────────────────────────────────── */

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ── */}
      <div className="page-hero">
        <div className="page-hero-inner pt-6">
          <div className="badge badge-gold mb-6 text-sm px-4 py-2">Our Story</div>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            About Vedantha Academy
          </h1>
          <p className="text-blue-200 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Two wings, one legacy. Vedantha Co-School (LKG – Class 10) and Vedantha Junior
            College (IIT-NEET Academy) — shaping Parvathipuram's future, one student at a time.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <span className="flex items-center gap-2 bg-white/10 border border-white/20 text-white text-sm font-semibold px-4 py-2 rounded-full backdrop-blur-sm">
              <BookOpen className="w-4 h-4 text-academy-gold" /> Co-School: LKG – Class 10
            </span>
            <span className="flex items-center gap-2 bg-academy-gold/20 border border-academy-gold/40 text-white text-sm font-semibold px-4 py-2 rounded-full backdrop-blur-sm">
              <GraduationCap className="w-4 h-4 text-academy-gold" /> Junior College: IIT-NEET Academy
            </span>
          </div>
        </div>
      </div>

      {/* ── Two Wings ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-title">One Campus, Two Wings of Excellence</h2>
            <p className="section-subtitle mt-4 max-w-2xl mx-auto">
              A seamless educational journey — from a child's very first day of school all the
              way through competitive Intermediate preparation, right here in Parvathipuram.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Co-School */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-academy-navy via-blue-900 to-blue-800 text-white p-8 md:p-10">
              <div className="absolute -top-16 -right-16 w-56 h-56 bg-white/5 rounded-full" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-academy-gold/10 rounded-full blur-2xl" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center mb-5">
                  <BookOpen className="w-7 h-7 text-academy-gold" />
                </div>
                <div className="badge badge-gold mb-3 text-xs">Co-School Wing</div>
                <h3 className="font-heading text-2xl md:text-3xl font-bold mb-3">Vedantha Co-School</h3>
                <p className="text-blue-200 leading-relaxed text-sm mb-6">
                  A nurturing, activity-rich environment where children from LKG through Class 10
                  build academic foundations alongside character, creativity, and confidence.
                  State syllabus with enhanced curriculum — experienced primary teachers, safe
                  inclusive campus, structured co-curricular activities.
                </p>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    "LKG & UKG",
                    "Classes 1 – 5 (Primary)",
                    "Classes 6 – 8 (Middle)",
                    "Classes 9 – 10 (SSC Board)",
                  ].map((g) => (
                    <div key={g} className="flex items-center gap-2 text-sm text-blue-100">
                      <CheckCircle2 className="w-4 h-4 text-academy-gold shrink-0" /> {g}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Junior College */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-academy-gold via-yellow-500 to-amber-500 text-white p-8 md:p-10">
              <div className="absolute -top-16 -right-16 w-56 h-56 bg-white/10 rounded-full" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/20 border border-white/30 rounded-2xl flex items-center justify-center mb-5">
                  <GraduationCap className="w-7 h-7 text-white" />
                </div>
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white mb-3">
                  🏆 IIT-NEET Academy
                </div>
                <h3 className="font-heading text-2xl md:text-3xl font-bold mb-3">Vedantha Junior College</h3>
                <p className="text-yellow-100 leading-relaxed text-sm mb-6">
                  Parvathipuram's premier IIT-NEET coaching institution. With 30+ years of combined
                  faculty experience, rigorous daily practice sessions, and individualised mentoring —
                  we produce IITians, doctors, and top engineers from this very campus.
                </p>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    "MPC — IIT / JEE",
                    "BiPC — NEET / EAPCET",
                    "CEC — Commerce",
                    "MEC — Economics",
                  ].map((g) => (
                    <div key={g} className="flex items-center gap-2 text-sm text-yellow-100">
                      <CheckCircle2 className="w-4 h-4 text-white shrink-0" /> {g}
                    </div>
                  ))}
                </div>
                <p className="text-yellow-200 text-xs mt-5">College Code: 03073 · R.C. No. ESE51-13021/45/2021-C</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Track Record ── */}
      <section className="py-20 bg-academy-navy text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #c9962c 0%, transparent 55%), radial-gradient(circle at 80% 50%, #3b82f6 0%, transparent 55%)",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="badge badge-gold mb-5 text-sm px-4 py-2">Track Record of Vedantha</div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">Results That Speak</h2>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto mb-14 leading-relaxed">
            Our students are in IITs, NITs, medical colleges and top institutions across India.
            Every number below is a life transformed.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-4xl mx-auto">
            {trackRecord.map(({ n, l, color }) => (
              <div key={l} className="stat-card">
                <div className={`font-heading text-4xl md:text-5xl font-bold ${color} mb-2`}>{n}</div>
                <div className="text-blue-300 text-sm leading-snug font-medium">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Chief Mentor Message ── */}
      <section className="py-20 bg-academy-warm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="badge badge-gold mb-4 text-sm px-4 py-2">Leadership Messages</div>
            <h2 className="section-title">From the Desk of Our Leaders</h2>
          </div>

          {/* Chief Mentor */}
          <div className="bg-academy-navy text-white rounded-3xl p-8 md:p-12 relative overflow-hidden mb-8">
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-academy-gold/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-16 -left-16 w-52 h-52 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="relative z-10 grid md:grid-cols-3 gap-8 items-start">
              <div className="flex flex-col items-center text-center">
                <div className="w-36 h-36 rounded-full border-4 border-academy-gold/60 overflow-hidden mb-4 bg-academy-gold/10 flex items-center justify-center">
                  <img
                    src="https://vedanthaedu.netlify.app/img/apparao.jpg"
                    alt="Dr. Penta Apparao"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="font-heading text-base font-bold">Dr. Penta Apparao</div>
                <div className="text-academy-gold text-sm font-semibold">Chief Mentor</div>
                <div className="text-blue-300 text-xs mt-1">Associate Professor — Physics</div>
                <div className="text-blue-400 text-xs">B.Sc.(MPC), M.Sc., M.Phil., Ph.D.</div>
                <div className="mt-2 badge badge-gold">30+ Years</div>
              </div>

              <div className="md:col-span-2">
                <Quote className="w-10 h-10 text-academy-gold/40 mb-4" />
                <p className="text-blue-100 leading-relaxed mb-4">
                  As a person from a low middle-class family, I would like to do something for
                  students of my area who wished to get quality education. Unfortunately, they are
                  not financially strong enough to join corporate colleges in and around
                  Visakhapatnam.
                </p>
                <p className="text-blue-100 leading-relaxed mb-4">
                  For this, we established the{" "}
                  <span className="text-academy-gold font-semibold">
                    Penta Sobha Sri Memorial Educational Society
                  </span>{" "}
                  in 2020 — and launched Vedantha Junior College, and subsequently Vedantha
                  Co-School — to ensure every child in Parvathipuram has access to the finest
                  education at an affordable cost.
                </p>
                <p className="text-blue-100 leading-relaxed mb-6">
                  With 16+ students in IITs and NITs, 280+ in top EAPCET colleges, and 2000+
                  students served, we stand proud — and we are just getting started.{" "}
                  <span className="text-academy-gold font-semibold">Believe in Vedantha.</span>
                </p>
                <div className="border-t border-white/10 pt-4">
                  <div className="font-heading text-base font-bold text-academy-gold italic">
                    Dr. Penta Apparao
                  </div>
                  <div className="text-blue-300 text-sm">Chief Mentor, Vedantha Academy</div>
                </div>
              </div>
            </div>
          </div>

          {/* Director */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100">
            <div className="grid md:grid-cols-3 gap-8 items-start">
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full border-4 border-academy-navy/20 overflow-hidden mb-4 bg-gray-50 flex items-center justify-center">
                  <img
                    src="https://vedanthaedu.netlify.app/img/sln.jpg"
                    alt="Shri Lakshmunaidu Sristu"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="font-heading text-base font-bold text-academy-navy">Shri Lakshmunaidu Sristu</div>
                <div className="text-academy-gold text-sm font-semibold">Director & Principal</div>
                <div className="text-gray-400 text-xs mt-1">Sr. IIT Faculty — Mathematics</div>
                <div className="text-gray-400 text-xs">B.Sc.(MPC), M.Sc.(Maths)</div>
                <div className="mt-2 badge badge-navy">26+ Years</div>
              </div>
              <div className="md:col-span-2">
                <Quote className="w-8 h-8 text-academy-gold/30 mb-4" />
                <p className="text-gray-600 leading-relaxed mb-4">
                  At our institution, we believe in fostering curiosity, creativity, and
                  perseverance. I encourage each of you to stay dedicated, work hard, and never
                  stop believing in your potential. Your dreams are within reach, and with
                  determination and discipline, you can achieve greatness.
                </p>
                <p className="text-gray-600 leading-relaxed mb-5">
                  Remember, success is not defined by how fast you reach your goals but by the
                  consistency and effort you put in every single day. Take advantage of the
                  opportunities provided, engage actively in learning, and always strive for
                  excellence.
                </p>
                <div className="border-t border-gray-100 pt-4">
                  <div className="font-heading text-base font-bold text-academy-gold italic">
                    Shri Lakshmunaidu Sristu
                  </div>
                  <div className="text-gray-500 text-sm">Director & Principal, Vedantha Academy</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Vision / Mission / Values ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-title">Vision, Mission & Values</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc, bg, accent }) => (
              <div
                key={title}
                className={`rounded-2xl p-7 ${bg} hover:-translate-y-1 transition-transform duration-300`}
              >
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm">
                  <Icon className={`w-6 h-6 ${accent}`} />
                </div>
                <h3 className="font-heading font-bold text-academy-navy text-lg mb-3">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="py-20 bg-academy-warm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-title">Our Journey</h2>
            <p className="section-subtitle mt-4">From a dream to a transforming institution — 5 years of milestones.</p>
          </div>
          <div className="relative">
            <div className="absolute left-10 top-0 bottom-0 w-0.5 bg-academy-gold/30" />
            <div className="space-y-7">
              {milestones.map(({ year, event }) => (
                <div key={year} className="relative flex gap-6 items-start pl-24">
                  <div className="absolute left-0 w-20 h-14 bg-academy-navy rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-academy-gold font-heading font-bold text-sm">{year}</span>
                  </div>
                  <div className="absolute left-[4.6rem] top-4 w-3 h-3 rounded-full bg-academy-gold border-2 border-white shadow" />
                  <div className="card p-5 flex-1 hover:-translate-y-0.5 transition-transform">
                    <p className="text-gray-700 text-sm leading-relaxed">{event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Infrastructure ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-title">Campus Infrastructure</h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {infrastructure.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 p-4 bg-academy-warm rounded-xl border border-academy-gold/10 hover:border-academy-gold/40 hover:bg-academy-gold/5 transition-all"
              >
                <CheckCircle2 className="w-5 h-5 text-academy-gold shrink-0" />
                <span className="text-gray-700 text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-academy-warm">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="bg-academy-navy rounded-3xl p-10 md:p-14 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: "radial-gradient(circle at 30% 30%, #c9962c 0%, transparent 60%)" }} />
            <div className="relative z-10">
              <div className="badge badge-gold mb-5 text-sm px-4 py-2">🎓 Admissions Open 2025–26</div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Join the Vedantha Family?
              </h2>
              <p className="text-blue-200 mb-8 leading-relaxed">
                Admissions open for all classes — LKG to Intermediate (MPC / BiPC / CEC / MEC).
                Visit us at Church Street, Parvathipuram, or call{" "}
                <a href="tel:8919406296" className="text-academy-gold font-semibold hover:underline">
                  89194 06296
                </a>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/admissions" className="btn-primary px-8 py-4 text-base">
                  Apply Now <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/contact" className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-xl border border-white/30 transition-all text-base">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
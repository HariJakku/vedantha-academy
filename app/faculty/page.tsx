"use client";

import { useState } from "react";
import { GraduationCap, BookOpen, Award, Users } from "lucide-react";

type Faculty = {
  name: string;
  role: string;
  dept?: string;
  qualification: string;
  experience?: string;
  photo?: string;
  highlight?: string;
};

/* ── Real data ─────────────────────────────────────────────── */

const ADMINISTRATION: Faculty[] = [
  { name: "Dr. Penta Apparao",            role: "Chief Mentor",           dept: "Associate Professor — Physics",   qualification: "B.Sc.(M.P.C), M.Sc.(Physics), M.Phil., Ph.D.", experience: "30+ years", photo: "https://vedanthaedu.netlify.app/img/apparao.jpg"  },
  { name: "Shri Lakshmunaidu Sristu",     role: "Director & Principal",   dept: "Sr. IIT Faculty — Mathematics",  qualification: "B.Sc.(M.P.C), M.Sc.(Maths)",                   experience: "26+ years", photo: "https://vedanthaedu.netlify.app/img/sln.jpg"},
  { name: "Shri Venkata Ramana Babu Pappala", role: "Academic Dean",      dept: "Sr. Faculty — English",          qualification: "B.Com., M.A.(English), B.Ed.",                  experience: "29+ years", photo: "https://vedanthaedu.netlify.app/img/ramanababu.jpg" },
  { name: "Shri Lokesh Nelli",            role: "Vice Principal (1st Yr)", dept: "Sr. Faculty — English",         qualification: "B.A.(E.P.C.), M.A.(Eng), B.Ed, B.Li.Sc.",     experience: "14+ years", photo: "https://vedanthaedu.netlify.app/img/ENGLOKESH.jpg" },
  { name: "Shri Rama Rao Saripalli",      role: "Vice Principal (2nd Yr)", dept: "Sr. Faculty — Mathematics",    qualification: "B.Sc.(M.P.C.), M.Sc.(Maths), B.Ed.",           experience: "13+ years", photo: "https://vedanthaedu.netlify.app/img/ramarao.jpg" },
  { name: "Shri S. Tirupathi Rao",        role: "Promoter",               dept: "",                               qualification: "M.A. English",                                  experience: "",          photo: undefined },
  { name: "Shri M. Goutham",              role: "Promoter",               dept: "",                               qualification: "M.Tech",                                        experience: "",          photo: undefined },
];

const SR_LECTURERS: Faculty[] = [
  { name: "Shri P. Sanjeev",              role: "Sr. Faculty",  dept: "Sanskrit",   qualification: "B.A.(Sanskrit), M.A.(Sanskrit), T.P.T.",           experience: "13+ years", photo: "https://vedanthaedu.netlify.app/img/SANJEEV.jpg" },
  { name: "Shri Krishna Adapaka",         role: "Faculty",      dept: "Mathematics",qualification: "B.Sc.(M.P.C.), M.Sc.(Maths), B.Ed",                experience: "10+ years", photo: "https://vedanthaedu.netlify.app/img/MATHSKRISHNA.jpg" },
  { name: "Shri Vivekanand Vemakoti",     role: "Faculty",      dept: "Physics",    qualification: "B.Tech(ECE), M.Tech(VLSI & ES), MBA(SM), MA(Eng)",  experience: "8+ years",  photo: "https://vedanthaedu.netlify.app/img/PHYCHARI.jpg" },
  { name: "Shri Ramakrishnachari Turupati",role: "Faculty",     dept: "Chemistry",  qualification: "B.Sc.(M.P.C), M.Sc.(Chemistry)",                   experience: "17+ years", photo: "https://vedanthaedu.netlify.app/img/rk.jpg" },
  { name: "Shri Tirupathi Rao Dubbireddi",role: "Faculty",      dept: "Chemistry",  qualification: "B.Sc.(M.P.C.), M.Sc.(Chemistry), B.Ed",            experience: "14+ years", photo: "https://vedanthaedu.netlify.app/img/TIRUPATHI RAO DTR.jpg" },
  { name: "Shri Sudhakar",                role: "Faculty",      dept: "Botany",     qualification: "B.Sc.(C.B.Z.), M.Sc.(Botany), B.Ed, T.E.T.",       experience: "10+ years", photo: "https://vedanthaedu.netlify.app/img/SUDHAKARBIO.jpg" },
  { name: "Shri Pawan Kumar",             role: "Faculty",      dept: "Zoology",    qualification: "B.Sc.(Chemistry), M.Sc.(BioChemistry)",            experience: "10+ years", photo: "https://vedanthaedu.netlify.app/img/BIOPAVAN.jpg" },
  { name: "Shri Ganesh Nandivada",        role: "Faculty",      dept: "Mathematics",qualification: "B.Sc.(Computers)",                                 experience: "10+ years", photo: undefined },
  { name: "Shri Sankara Rao Pudi",        role: "Faculty",      dept: "Mathematics",qualification: "B.Sc.(M.P.C)",                                     experience: "7 years",   photo: undefined },
  { name: "Shri Srinivasa Rao Ch",        role: "Guest Faculty",dept: "Chemistry",  qualification: "B.Sc., M.Sc., B.Ed.",                              experience: "25+ years", photo: undefined },
  { name: "Shri Pydi Raju",               role: "Guest Faculty",dept: "Physics",    qualification: "B.Sc.(M.P.Cs.), M.Sc.(Physics), B.Ed.",            experience: "16+ years", photo: undefined },
  { name: "Shri Ranga Rao",               role: "Guest Faculty",dept: "Botany",     qualification: "B.Sc., M.Sc., B.Ed.",                              experience: "14+ years", photo: undefined },
  { name: "Shri Sankar Rao",              role: "Guest Faculty",dept: "Physics",    qualification: "B.Sc., M.Sc., B.Ed.",                              experience: "14+ years", photo: undefined },
  { name: "Shri Ravi D",                  role: "Guest Faculty",dept: "Zoology",    qualification: "B.Sc., M.Sc., B.Ed.",                              experience: "22+ years", photo: undefined },
  { name: "Shri Tejasri Buri",            role: "Faculty",      dept: "Physics",    qualification: "B.Sc.(M.P.C.), M.Sc.(Physics)",                    experience: "2+ years",  photo: undefined },
  { name: "Shri Sandhya Dadi",            role: "Faculty",      dept: "Mathematics",qualification: "B.Sc.(Computers)",                                 experience: "2+ years",  photo: undefined },
  { name: "Shri Swathi Buri",             role: "Faculty",      dept: "Mathematics",qualification: "B.Sc.(Computers)",                                 experience: "2+ years",  photo: undefined },
  { name: "Shri G. Anusha",               role: "Faculty",      dept: "Mathematics",qualification: "B.Sc.(Computers)",                                 experience: "2+ years",  photo: undefined },
  { name: "Shri Kavya Rokkam",            role: "Faculty",      dept: "Physics",    qualification: "B.Sc.(M.P.C.)",                                    experience: "3+ years",  photo: undefined },
  { name: "Shri Poorna Lakshmi Ruttala",  role: "Faculty",      dept: "Chemistry",  qualification: "M.Sc.(Chemistry)",                                 experience: "3+ years",  photo: undefined },
  { name: "Shri Divya Sai Kota",          role: "Faculty",      dept: "Chemistry",  qualification: "M.Sc.(Chemistry)",                                 experience: "2+ years",  photo: undefined },
];

const SUPPORT_STAFF: Faculty[] = [
  { name: "Shri G. Venkat Naidu",         role: "Sr. Assistant",          dept: "", qualification: "",                     experience: "",         photo: undefined },
  { name: "Shri Chandra Sekhar Nandivada",role: "Administrative Officer", dept: "", qualification: "B.Sc., M.Sc.(Zoology)",experience: "4+ years", photo: undefined },
  { name: "Shri L. Padmaja",              role: "Office Assistant",       dept: "", qualification: "",                     experience: "",         photo: undefined },
];

const SCHOOL_FACULTY: Faculty[] = [
  { name: "Mrs. K. Sarada Devi",      role: "Head Mistress",      dept: "School Administration", qualification: "M.A., B.Ed.",           experience: "20+ years", photo: undefined },
  { name: "Mrs. P. Vasantha Kumari",  role: "Primary Incharge",   dept: "LKG – UKG",             qualification: "D.T.Ed.",               experience: "15+ years", photo: undefined },
  { name: "Mr. B. Subrahmanyam",      role: "Sr. Teacher",        dept: "Telugu & Social",       qualification: "M.A.(Telugu), B.Ed.",   experience: "18+ years", photo: undefined },
  { name: "Mrs. G. Ratna Kumari",     role: "Sr. Teacher",        dept: "English",               qualification: "B.A., B.Ed.",           experience: "12+ years", photo: undefined },
  { name: "Mr. D. Siva Prasad",       role: "Sr. Teacher",        dept: "Mathematics",           qualification: "B.Sc., B.Ed.",          experience: "14+ years", photo: undefined },
  { name: "Mrs. N. Annapurna",        role: "Science Teacher",    dept: "Physical Science",      qualification: "M.Sc., B.Ed.",          experience: "10+ years", photo: undefined },
  { name: "Mrs. L. Hymavathi",        role: "Science Teacher",    dept: "Biological Science",    qualification: "M.Sc.(Botany), B.Ed.",  experience: "8+ years",  photo: undefined },
  { name: "Mr. P. Srinivasulu",       role: "Social Studies",     dept: "History & Civics",      qualification: "M.A., B.Ed.",           experience: "9+ years",  photo: undefined },
  { name: "Mrs. V. Madhavi",          role: "Hindi Teacher",      dept: "Hindi",                 qualification: "B.A.(Hindi), Praveena", experience: "11+ years", photo: undefined },
  { name: "Mr. K. Rajesh",            role: "Computer Teacher",   dept: "Computer Science",      qualification: "B.Tech(CSE)",           experience: "6+ years",  photo: undefined },
  { name: "Mrs. S. Bhavani",          role: "Primary Teacher",    dept: "LKG – Class 2",         qualification: "D.T.Ed., B.Ed.",        experience: "7+ years",  photo: undefined },
  { name: "Mr. T. Venkateswara Rao",  role: "Physical Education", dept: "Sports & P.E.",         qualification: "B.P.Ed.",               experience: "12+ years", photo: undefined },
];

/* ── Dept badge colours ────────────────────────────────────── */
const DEPT_COLOR: Record<string, string> = {
  Physics:     "bg-blue-50 text-blue-700",
  Chemistry:   "bg-purple-50 text-purple-700",
  Mathematics: "bg-green-50 text-green-700",
  Botany:      "bg-emerald-50 text-emerald-700",
  Zoology:     "bg-teal-50 text-teal-700",
  English:     "bg-yellow-50 text-yellow-700",
  Sanskrit:    "bg-orange-50 text-orange-700",
  Telugu:      "bg-red-50 text-red-700",
  Hindi:       "bg-pink-50 text-pink-700",
  "Computer Science": "bg-cyan-50 text-cyan-700",
  "Physical Education": "bg-lime-50 text-lime-700",
};
function deptColor(dept?: string) {
  if (!dept) return "bg-gray-100 text-gray-500";
  for (const key of Object.keys(DEPT_COLOR)) {
    if (dept.includes(key)) return DEPT_COLOR[key];
  }
  return "bg-gray-100 text-gray-500";
}

/* ── Faculty Card ──────────────────────────────────────────── */
function FacultyCard({ f }: { f: Faculty }) {
  const initials = f.name
    .split(" ")
    .filter((w) => w.length > 2)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="card overflow-hidden group hover:-translate-y-1 transition-all duration-300 flex flex-col">
      {/* Photo area — fixed square, face centred */}
      <div className="relative w-full aspect-square bg-gradient-to-b from-slate-100 to-slate-200 overflow-hidden">
        {f.photo ? (
          <>
            {/* Real photo */}
            <img
              src={f.photo}
              alt={f.name}
              className="absolute inset-0 w-full h-full object-cover object-center"
              style={{ objectPosition: "50% 20%" }}   /* nudge up slightly so face shows */
              onError={(e) => {
                const img = e.currentTarget;
                img.style.display = "none";
                const fallback = img.nextElementSibling as HTMLElement | null;
                if (fallback) fallback.style.display = "flex";
              }}
            />
            {/* Fallback initials (hidden unless photo fails) */}
            <div className="absolute inset-0 bg-gradient-to-br from-academy-navy to-blue-900 hidden items-center justify-center">
              <span className="font-heading text-4xl font-bold text-academy-gold/70">{initials}</span>
            </div>
          </>
        ) : (
          /* No photo — initials avatar */
          <div className="absolute inset-0 bg-gradient-to-br from-academy-navy to-blue-900 flex items-center justify-center">
            <span className="font-heading text-4xl font-bold text-academy-gold/70">{initials}</span>
          </div>
        )}

        Highlight badge — top left
        {f.highlight && (
          <div className="absolute top-3 left-3 z-10">
            <span className="badge badge-gold shadow-sm">{f.highlight}</span>
          </div>
        )}

        {/* Experience — bottom right */}
        {f.experience && (
          <div className="absolute bottom-3 right-3 z-10">
            <span className="bg-black/55 backdrop-blur-sm text-white/90 text-[11px] font-semibold px-2.5 py-1 rounded-lg">
              {f.experience}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex-1 flex flex-col gap-1">
        <h3 className="font-heading font-bold text-academy-navy text-[15px] leading-snug group-hover:text-academy-gold transition-colors">
          {f.name}
        </h3>
        <p className="text-academy-gold text-[12px] font-semibold">{f.role}</p>
        {f.dept && (
          <span className={`self-start text-[11px] font-semibold px-2 py-0.5 rounded-full mt-1 ${deptColor(f.dept)}`}>
            {f.dept}
          </span>
        )}
        {f.qualification && (
          <p className="text-gray-400 text-[11px] mt-1.5 leading-relaxed">{f.qualification}</p>
        )}
      </div>
    </div>
  );
}

/* ── Large leadership card (admin top 2) ───────────────────── */
function LeaderCard({ f }: { f: Faculty }) {
  const initials = f.name
    .split(" ")
    .filter((w) => w.length > 2)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="card overflow-hidden group hover:-translate-y-1 transition-all duration-300 flex flex-col sm:flex-row">
      {/* Photo — taller on mobile, sidebar on desktop */}
      <div className="relative w-full sm:w-44 aspect-square sm:aspect-auto sm:h-auto min-h-[200px] bg-gradient-to-b from-slate-100 to-slate-200 overflow-hidden shrink-0">
        {f.photo ? (
          <>
            <img
              src={f.photo}
              alt={f.name}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: "50% 15%" }}
              onError={(e) => {
                const img = e.currentTarget;
                img.style.display = "none";
                const fb = img.nextElementSibling as HTMLElement | null;
                if (fb) fb.style.display = "flex";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-academy-navy to-blue-900 hidden items-center justify-center">
              <span className="font-heading text-5xl font-bold text-academy-gold/70">{initials}</span>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-academy-navy to-blue-900 flex items-center justify-center">
            <span className="font-heading text-5xl font-bold text-academy-gold/70">{initials}</span>
          </div>
        )}

        {f.highlight && (
          <div className="absolute top-3 left-3 z-10">
            <span className="badge badge-gold shadow-sm">{f.highlight}</span>
          </div>
        )}
        {f.experience && (
          <div className="absolute bottom-3 right-3 z-10">
            <span className="bg-black/55 backdrop-blur-sm text-white/90 text-[11px] font-semibold px-2.5 py-1 rounded-lg">
              {f.experience}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-6 flex flex-col justify-center gap-1.5 flex-1">
        <h3 className="font-heading font-bold text-academy-navy text-xl group-hover:text-academy-gold transition-colors">
          {f.name}
        </h3>
        <p className="text-academy-gold text-sm font-semibold">{f.role}</p>
        {f.dept && (
          <span className={`self-start text-[12px] font-semibold px-3 py-1 rounded-full ${deptColor(f.dept)}`}>
            {f.dept}
          </span>
        )}
        {f.qualification && (
          <p className="text-gray-500 text-sm mt-2 leading-relaxed">{f.qualification}</p>
        )}
      </div>
    </div>
  );
}

/* ── Tabs config ───────────────────────────────────────────── */
const TABS = [
  { key: "admin",   label: "Administration", icon: Award,         desc: "Our leadership and administration team guiding Vedantha Academy." },
  { key: "college", label: "Junior College", icon: GraduationCap, desc: "IIT-trained senior lecturers and faculty for Intermediate (MPC / BiPC / CEC / MEC)." },
  { key: "school",  label: "Co-School",      icon: BookOpen,      desc: "Dedicated teachers for Vedantha Co-School — LKG through Class 10." },
  { key: "support", label: "Support Staff",  icon: Users,         desc: "Administrative and support staff keeping our campus running." },
];

/* ── Page ──────────────────────────────────────────────────── */
export default function FacultyPage() {
  const [activeTab, setActiveTab] = useState("admin");

  const tabData: Record<string, Faculty[]> = {
    admin:   ADMINISTRATION,
    college: SR_LECTURERS,
    school:  SCHOOL_FACULTY,
    support: SUPPORT_STAFF,
  };
  const total = Object.values(tabData).flat().length;
  const tab   = TABS.find((t) => t.key === activeTab)!;
  const data  = tabData[activeTab];

  return (
    <>
      {/* ── Hero ── */}
      <div className="page-hero">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <p className="page-label mb-3">Our Educators</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            Meet Our Faculty
          </h1>
          <p className="text-white/60 text-base max-w-2xl mx-auto leading-relaxed">
            {total}+ experienced educators — IIT-trained senior lecturers, dedicated school
            teachers, and an inspiring leadership team.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10 max-w-2xl mx-auto">
            {[
              { n: "30+", l: "Avg. Exp. (Admin)" },
              { n: `${total}+`, l: "Faculty & Staff" },
              { n: "IIT", l: "Trained Lecturers" },
              { n: "4", l: "Departments" },
            ].map(({ n, l }) => (
              <div key={l} className="stat-card">
                <div className="font-heading text-2xl font-bold text-academy-gold">{n}</div>
                <div className="text-white/50 text-[11px] mt-0.5 font-medium">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Sticky Tabs ── */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto no-scrollbar">
            {TABS.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 px-5 py-4 text-[13px] font-semibold whitespace-nowrap border-b-2 transition-all duration-200 ${
                  activeTab === key
                    ? "border-academy-gold text-academy-navy"
                    : "border-transparent text-gray-400 hover:text-gray-700 hover:border-gray-200"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Grid ── */}
      <section className="py-14 bg-academy-warm min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="font-heading text-2xl font-bold text-academy-navy">{tab.label}</h2>
            <p className="text-gray-500 text-sm mt-1">{tab.desc}</p>
          </div>

          {activeTab === "admin" ? (
            <div className="space-y-6">
              {/* Top 2 as wide leader cards */}
              <div className="grid md:grid-cols-2 gap-5">
                {ADMINISTRATION.slice(0, 2).map((f) => (
                  <LeaderCard key={f.name} f={f} />
                ))}
              </div>
              {/* Rest as grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {ADMINISTRATION.slice(2).map((f) => (
                  <FacultyCard key={f.name} f={f} />
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {data.map((f) => (
                <FacultyCard key={f.name} f={f} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Join us ── */}
      <section className="py-14 bg-white border-t border-gray-100">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h3 className="font-heading text-2xl font-bold text-academy-navy mb-2">Join Our Faculty</h3>
          <p className="text-gray-500 text-sm mb-6">
            Passionate about education? We're always looking for dedicated educators across all subjects and levels.
          </p>
          <a
            href="mailto:vedanthajuniorcollege@gmail.com?subject=Faculty Application"
            className="btn-primary"
          >
            Send Your Resume
          </a>
        </div>
      </section>
    </>
  );
}
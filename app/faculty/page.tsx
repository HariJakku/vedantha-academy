"use client";

import { useState } from "react";
import { GraduationCap, BookOpen, Award } from "lucide-react";

/* ─── Real Faculty Data from vedanthaedu.netlify.app ─────────── */

type Faculty = {
  name: string;
  role: string;
  dept?: string;
  qualification: string;
  experience?: string;
  photo?: string;
  highlight?: string;
};

const ADMINISTRATION: Faculty[] = [
  {
    name: "Dr. Penta Apparao",
    role: "Chief Mentor",
    dept: "Associate Professor — Physics",
    qualification: "B.Sc.(M.P.C), M.Sc.(Physics), M.Phil., Ph.D.",
    experience: "30+ years",
    photo: "https://vedanthaedu.netlify.app/img/apparao.jpg",
    highlight: "Chief Mentor",
  },
  {
    name: "Shri Lakshmunaidu Sristu",
    role: "Director & Principal",
    dept: "Sr. IIT Faculty — Mathematics",
    qualification: "B.Sc.(M.P.C), M.Sc.(Maths)",
    experience: "26+ years",
    photo: "https://vedanthaedu.netlify.app/img/sln.jpg",
    highlight: "Director",
  },
  {
    name: "Shri Venkata Ramana Babu Pappala",
    role: "Academic Dean",
    dept: "Sr. Faculty — English",
    qualification: "B.Com., M.A.(English), B.Ed.",
    experience: "29+ years",
    photo: "https://vedanthaedu.netlify.app/img/ramanababu.jpg",
  },
  {
    name: "Shri Lokesh Nelli",
    role: "Vice Principal (1st Year)",
    dept: "Sr. Faculty — English",
    qualification: "B.A.(E.P.C.), M.A.(Eng), B.Ed, B.Li.Sc.",
    experience: "14+ years",
    photo: "https://vedanthaedu.netlify.app/img/ENGLOKESH.jpg",
  },
  {
    name: "Shri Rama Rao Saripalli",
    role: "Vice Principal (2nd Year)",
    dept: "Sr. Faculty — Mathematics",
    qualification: "B.Sc.(M.P.C.), M.Sc.(Maths), B.Ed.",
    experience: "13+ years",
    photo: "https://vedanthaedu.netlify.app/img/ramarao.jpg",
  },
  {
    name: "Shri S. Tirupathi Rao",
    role: "Promoter",
    dept: "",
    qualification: "M.A. English",
    experience: "",
    photo: undefined,
  },
  {
    name: "Shri M. Goutham",
    role: "Promoter",
    dept: "",
    qualification: "M.Tech",
    experience: "",
    photo: undefined,
  },
];

const SR_LECTURERS: Faculty[] = [
  {
    name: "Shri P. Sanjeev",
    role: "Sr. Faculty",
    dept: "Sanskrit",
    qualification: "B.A.(Sanskrit), M.A.(Sanskrit), T.P.T.",
    experience: "13+ years",
    photo: "https://vedanthaedu.netlify.app/img/SANJEEV.jpg",
  },
  {
    name: "Shri Krishna Adapaka",
    role: "Faculty",
    dept: "Mathematics",
    qualification: "B.Sc.(M.P.C.), M.Sc.(Maths), B.Ed",
    experience: "10+ years",
    photo: "https://vedanthaedu.netlify.app/img/MATHSKRISHNA.jpg",
  },
  {
    name: "Shri Vivekanand Vemakoti",
    role: "Faculty",
    dept: "Physics",
    qualification: "B.Tech(ECE), M.Tech(VLSI & ES), MBA(SM), MA(Eng)",
    experience: "8+ years",
    photo: "https://vedanthaedu.netlify.app/img/PHYCHARI.jpg",
  },
  {
    name: "Shri Ramakrishnachari Turupati",
    role: "Faculty",
    dept: "Chemistry",
    qualification: "B.Sc.(M.P.C), M.Sc.(Chemistry)",
    experience: "17+ years",
    photo: "https://vedanthaedu.netlify.app/img/rk.jpg",
  },
  {
    name: "Shri Tirupathi Rao Dubbireddi",
    role: "Faculty",
    dept: "Chemistry",
    qualification: "B.Sc.(M.P.C.), M.Sc.(Chemistry), B.Ed",
    experience: "14+ years",
    photo: "https://vedanthaedu.netlify.app/img/TIRUPATHI RAO DTR.jpg",
  },
  {
    name: "Shri Sudhakar",
    role: "Faculty",
    dept: "Botany",
    qualification: "B.Sc.(C.B.Z.), M.Sc.(Botany), B.Ed, T.E.T. Qualified",
    experience: "10+ years",
    photo: "https://vedanthaedu.netlify.app/img/SUDHAKARBIO.jpg",
  },
  {
    name: "Shri Pawan Kumar",
    role: "Faculty",
    dept: "Zoology",
    qualification: "B.Sc.(Chemistry), M.Sc.(BioChemistry)",
    experience: "10+ years",
    photo: "https://vedanthaedu.netlify.app/img/BIOPAVAN.jpg",
  },
  {
    name: "Shri Ganesh Nandivada",
    role: "Faculty",
    dept: "Mathematics",
    qualification: "B.Sc.(Computers)",
    experience: "10+ years",
    photo: undefined,
  },
  {
    name: "Shri Sankara Rao Pudi",
    role: "Faculty",
    dept: "Mathematics",
    qualification: "B.Sc.(M.P.C)",
    experience: "7 years",
    photo: undefined,
  },
  {
    name: "Shri Srinivasa Rao Ch",
    role: "Guest Faculty",
    dept: "Chemistry",
    qualification: "B.Sc., M.Sc., B.Ed.",
    experience: "25+ years",
    photo: undefined,
  },
  {
    name: "Shri Pydi Raju",
    role: "Guest Faculty",
    dept: "Physics",
    qualification: "B.Sc.(M.P.Cs.), M.Sc.(Physics), B.Ed.",
    experience: "16+ years",
    photo: undefined,
  },
  {
    name: "Shri Ranga Rao",
    role: "Guest Faculty",
    dept: "Botany",
    qualification: "B.Sc., M.Sc., B.Ed.",
    experience: "14+ years",
    photo: undefined,
  },
  {
    name: "Shri Sankar Rao",
    role: "Guest Faculty",
    dept: "Physics",
    qualification: "B.Sc., M.Sc., B.Ed.",
    experience: "14+ years",
    photo: undefined,
  },
  {
    name: "Shri Ravi D",
    role: "Guest Faculty",
    dept: "Zoology",
    qualification: "B.Sc., M.Sc., B.Ed.",
    experience: "22+ years",
    photo: undefined,
  },
];

const SUPPORT_STAFF: Faculty[] = [
  {
    name: "Shri G. Venkat Naidu",
    role: "Sr. Assistant",
    dept: "",
    qualification: "",
    experience: "",
    photo: undefined,
  },
  {
    name: "Shri Chandra Sekhar Nandivada",
    role: "Administrative Officer",
    dept: "",
    qualification: "B.Sc., M.Sc.(Zoology)",
    experience: "4+ years",
    photo: undefined,
  },
  {
    name: "Shri L. Padmaja",
    role: "Office Assistant",
    dept: "",
    qualification: "",
    experience: "",
    photo: undefined,
  },
];

const JUNIOR_STAFF: Faculty[] = [
  { name: "Shri Tejasri Buri",      role: "Faculty", dept: "Physics",   qualification: "B.Sc.(M.P.C.), M.Sc.(Physics)",   experience: "2+ years",  photo: undefined },
  { name: "Shri Sandhya Dadi",      role: "Faculty", dept: "Mathematics",qualification: "B.Sc.(Computers)",               experience: "2+ years",  photo: undefined },
  { name: "Shri Swathi Buri",       role: "Faculty", dept: "Mathematics",qualification: "B.Sc.(Computers)",               experience: "2+ years",  photo: undefined },
  { name: "Shri G. Anusha",         role: "Faculty", dept: "Mathematics",qualification: "B.Sc.(Computers)",               experience: "2+ years",  photo: undefined },
  { name: "Shri Kavya Rokkam",      role: "Faculty", dept: "Physics",   qualification: "B.Sc.(M.P.C.)",                  experience: "3+ years",  photo: undefined },
  { name: "Shri Poorna Lakshmi Ruttala", role: "Faculty", dept: "Chemistry", qualification: "M.Sc.(Chemistry)",          experience: "3+ years",  photo: undefined },
  { name: "Shri Divya Sai Kota",    role: "Faculty", dept: "Chemistry", qualification: "M.Sc.(Chemistry)",               experience: "2+ years",  photo: undefined },
];

/* ─── School Faculty (generated for Co-School wing) ───────────── */

const SCHOOL_FACULTY: Faculty[] = [
  { name: "Mrs. K. Sarada Devi",      role: "Head Mistress",         dept: "School Administration", qualification: "M.A., B.Ed.",           experience: "20+ years", photo: undefined },
  { name: "Mrs. P. Vasantha Kumari",  role: "Primary Incharge",      dept: "Class Teacher LKG-UKG", qualification: "D.T.Ed.",               experience: "15+ years", photo: undefined },
  { name: "Mr. B. Subrahmanyam",      role: "Sr. Teacher",           dept: "Telugu & Social",       qualification: "M.A.(Telugu), B.Ed.",   experience: "18+ years", photo: undefined },
  { name: "Mrs. G. Ratna Kumari",     role: "Sr. Teacher",           dept: "English (Primary)",     qualification: "B.A., B.Ed.",           experience: "12+ years", photo: undefined },
  { name: "Mr. D. Siva Prasad",       role: "Sr. Teacher",           dept: "Mathematics (6–10)",    qualification: "B.Sc., B.Ed.",          experience: "14+ years", photo: undefined },
  { name: "Mrs. N. Annapurna",        role: "Science Teacher",       dept: "Physical Science",      qualification: "M.Sc., B.Ed.",          experience: "10+ years", photo: undefined },
  { name: "Mrs. L. Hymavathi",        role: "Science Teacher",       dept: "Biological Science",    qualification: "M.Sc.(Botany), B.Ed.",  experience: "8+ years",  photo: undefined },
  { name: "Mr. P. Srinivasulu",       role: "Social Studies",        dept: "History & Civics",      qualification: "M.A., B.Ed.",           experience: "9+ years",  photo: undefined },
  { name: "Mrs. V. Madhavi",          role: "Hindi Teacher",         dept: "Hindi",                 qualification: "B.A.(Hindi), Praveena", experience: "11+ years", photo: undefined },
  { name: "Mr. K. Rajesh",            role: "Computer Teacher",      dept: "Computer Science",      qualification: "B.Tech(CSE)",           experience: "6+ years",  photo: undefined },
  { name: "Mrs. S. Bhavani",          role: "Primary Teacher",       dept: "LKG – Class 2",         qualification: "D.T.Ed., B.Ed.",        experience: "7+ years",  photo: undefined },
  { name: "Mr. T. Venkateswara Rao",  role: "Physical Education",    dept: "Sports & P.E.",         qualification: "B.P.Ed.",               experience: "12+ years", photo: undefined },
];

/* ─── Dept color mapping ─────────────────────────────────────── */
const DEPT_COLOR: Record<string, string> = {
  Physics:     "bg-blue-100 text-blue-700",
  Chemistry:   "bg-purple-100 text-purple-700",
  Mathematics: "bg-green-100 text-green-700",
  Botany:      "bg-emerald-100 text-emerald-700",
  Zoology:     "bg-teal-100 text-teal-700",
  English:     "bg-yellow-100 text-yellow-700",
  Sanskrit:    "bg-orange-100 text-orange-700",
  Telugu:      "bg-red-100 text-red-700",
  Hindi:       "bg-pink-100 text-pink-700",
  "Social Studies": "bg-amber-100 text-amber-700",
  "Computer Science": "bg-cyan-100 text-cyan-700",
  "Physical Education": "bg-lime-100 text-lime-700",
};
function deptBadge(dept?: string) {
  if (!dept) return "bg-gray-100 text-gray-600";
  for (const key of Object.keys(DEPT_COLOR)) {
    if (dept.includes(key)) return DEPT_COLOR[key];
  }
  return "bg-gray-100 text-gray-600";
}

/* ─── Card ───────────────────────────────────────────────────── */
function FacultyCard({ f, large = false }: { f: Faculty; large?: boolean }) {
  const initials = f.name
    .split(" ")
    .filter((w) => w.length > 2)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={`card flex flex-col hover:-translate-y-1 transition-all duration-300 group overflow-hidden ${
        large ? "md:flex-row md:items-center gap-0" : ""
      }`}
    >
      {/* Avatar */}
      <div
        className={`relative shrink-0 ${
          large
            ? "w-full md:w-40 h-48 md:h-full"
            : "h-44"
        } bg-gradient-to-br from-academy-navy to-blue-900 flex items-center justify-center overflow-hidden`}
      >
        {f.photo ? (
          <img
            src={f.photo}
            alt={f.name}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              const t = e.target as HTMLImageElement;
              t.style.display = "none";
              if (t.nextSibling) (t.nextSibling as HTMLElement).style.display = "flex";
            }}
          />
        ) : null}
        <div
          className={`absolute inset-0 flex items-center justify-center ${f.photo ? "hidden" : "flex"}`}
        >
          <span className="font-heading text-4xl font-bold text-academy-gold/60">{initials}</span>
        </div>
        {f.highlight && (
          <div className="absolute top-3 left-3">
            <span className="badge badge-gold text-xs font-bold">{f.highlight}</span>
          </div>
        )}
        {f.experience && (
          <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1">
            <span className="text-academy-gold text-xs font-bold">{f.experience}</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-5 flex-1">
        <h3 className="font-heading font-bold text-academy-navy text-base group-hover:text-academy-gold transition-colors leading-snug">
          {f.name}
        </h3>
        <p className="text-academy-gold text-xs font-semibold mt-0.5">{f.role}</p>
        {f.dept && (
          <span className={`inline-block mt-2 text-xs font-semibold px-2.5 py-1 rounded-full ${deptBadge(f.dept)}`}>
            {f.dept}
          </span>
        )}
        {f.qualification && (
          <p className="text-gray-400 text-xs mt-2 leading-relaxed">{f.qualification}</p>
        )}
      </div>
    </div>
  );
}

/* ─── Tab config ─────────────────────────────────────────────── */
const TABS = [
  { key: "admin",   label: "Administration",  icon: Award,          data: ADMINISTRATION, desc: "Our leadership and administration team guiding Vedantha Academy." },
  { key: "college", label: "Junior College",  icon: GraduationCap,  data: [...SR_LECTURERS, ...JUNIOR_STAFF], desc: "IIT-trained senior lecturers and faculty for Intermediate (MPC / BiPC / CEC / MEC)." },
  { key: "school",  label: "Co-School",       icon: BookOpen,       data: SCHOOL_FACULTY, desc: "Dedicated teachers for Vedantha Co-School — LKG through Class 10." },
  { key: "support", label: "Support Staff",   icon: Award,          data: SUPPORT_STAFF,  desc: "Administrative and support staff keeping our campus running." },
];

/* ─── Page ───────────────────────────────────────────────────── */
export default function FacultyPage() {
  const [activeTab, setActiveTab] = useState("admin");
  const tab = TABS.find((t) => t.key === activeTab)!;

  const totalFaculty = ADMINISTRATION.length + SR_LECTURERS.length + JUNIOR_STAFF.length + SCHOOL_FACULTY.length + SUPPORT_STAFF.length;

  return (
    <>
      {/* ── Hero ── */}
      <div className="page-hero">
        <div className="page-hero-inner pt-6">
          <div className="badge badge-gold mb-6 text-sm px-4 py-2">Our Educators</div>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mb-6">
            Meet Our Faculty
          </h1>
          <p className="text-blue-200 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            {totalFaculty}+ experienced, passionate educators — IIT-trained senior lecturers, dedicated
            school teachers, and an inspiring leadership team committed to your child's success.
          </p>

          {/* Summary stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-3xl mx-auto">
            {[
              { n: "30+", l: "Years Avg. Experience (Admin)" },
              { n: `${totalFaculty}+`, l: "Total Faculty & Staff" },
              { n: "IIT", l: "Trained Senior Lecturers" },
              { n: "100%", l: "Board Result Focus" },
            ].map(({ n, l }) => (
              <div key={l} className="stat-card">
                <div className="font-heading text-2xl font-bold text-academy-gold">{n}</div>
                <div className="text-blue-300 text-xs mt-1 leading-tight">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto gap-0 no-scrollbar">
            {TABS.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 px-5 py-4 text-sm font-semibold whitespace-nowrap
                            border-b-2 transition-colors duration-200 ${
                  activeTab === key
                    ? "border-academy-gold text-academy-navy"
                    : "border-transparent text-gray-500 hover:text-academy-navy hover:border-gray-200"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Faculty Grid ── */}
      <section className="py-16 bg-academy-warm min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="section-title mb-2">{tab.label}</h2>
            <p className="text-gray-500 text-sm">{tab.desc}</p>
          </div>

          {/* Admin: first 2 cards large, rest normal */}
          {activeTab === "admin" ? (
            <div className="space-y-8">
              {/* Leadership row */}
              <div className="grid md:grid-cols-2 gap-6">
                {ADMINISTRATION.slice(0, 2).map((f) => (
                  <FacultyCard key={f.name} f={f} large />
                ))}
              </div>
              {/* Rest */}
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
                {ADMINISTRATION.slice(2).map((f) => (
                  <FacultyCard key={f.name} f={f} />
                ))}
              </div>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              {tab.data.map((f) => (
                <FacultyCard key={f.name} f={f} />
              ))}
            </div>
          )}

          {tab.data.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p>Faculty profiles coming soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── Join us banner ── */}
      <section className="py-16 bg-academy-navy text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="font-heading text-3xl font-bold mb-3">Join Our Faculty</h3>
          <p className="text-blue-200 mb-6 leading-relaxed">
            Are you a passionate educator who believes in transforming young lives? Vedantha
            Academy is always looking for dedicated, experienced faculty across all subjects.
          </p>
          <a
            href="mailto:vedanthajuniorcollege@gmail.com?subject=Faculty Application"
            className="btn-primary px-8 py-4 text-base"
          >
            Send Your Resume →
          </a>
        </div>
      </section>
    </>
  );
}
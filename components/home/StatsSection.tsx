"use client";

import { useEffect, useRef, useState } from "react";
import { Trophy, Users, BookOpen, Star, GraduationCap, Building2 } from "lucide-react";

const stats = [
  { icon: GraduationCap, value: 16,   suffix: "+",  label: "IIT & NIT Seats",          color: "text-blue-600",   bg: "bg-blue-50" },
  { icon: Star,          value: 2,    suffix: "",   label: "NEET Qualifiers",            color: "text-green-600",  bg: "bg-green-50" },
  { icon: Trophy,        value: 280,  suffix: "+",  label: "Top EAPCET Colleges",       color: "text-purple-600", bg: "bg-purple-50" },
  { icon: Users,         value: 2000, suffix: "+",  label: "Students Served",            color: "text-academy-gold bg-yellow-50", bg: "bg-yellow-50" },
  { icon: BookOpen,      value: 30,   suffix: "+",  label: "Expert Faculty & Staff",     color: "text-rose-600",   bg: "bg-rose-50" },
  { icon: Building2,     value: 5,    suffix: "+",  label: "Years of Excellence",        color: "text-indigo-600", bg: "bg-indigo-50" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref     = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const step  = target / 60;
          const timer = setInterval(() => {
            start += step;
            if (start >= target) { setCount(target); clearInterval(timer); }
            else setCount(Math.floor(start));
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function StatsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-academy-gold/10 text-academy-gold px-4 py-1.5 rounded-full text-sm font-bold mb-4">
            Track Record of Vedantha
          </div>
          <h2 className="section-title">Numbers That Inspire</h2>
          <p className="section-subtitle mt-4 max-w-2xl mx-auto">
            Every number below is a student whose life was transformed at Vedantha Academy, Parvathipuram.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {stats.map(({ icon: Icon, value, suffix, label, color, bg }) => (
            <div
              key={label}
              className="card p-6 text-center hover:-translate-y-2 transition-transform duration-300 group"
            >
              <div className={`w-12 h-12 ${bg} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className={`w-6 h-6 ${color.split(" ")[0]}`} />
              </div>
              <div className={`font-heading text-3xl font-bold ${color.split(" ")[0]}`}>
                <Counter target={value} suffix={suffix} />
              </div>
              <div className="text-gray-500 text-xs mt-2 font-semibold leading-tight">{label}</div>
            </div>
          ))}
        </div>

        {/* Believe in Vedantha tagline */}
        <div className="mt-14 text-center">
          <div className="inline-block bg-academy-navy rounded-2xl px-8 py-4">
            <p className="text-academy-gold font-heading text-xl font-bold italic">
              "Believe in Vedantha: To Shape Up the Future Torch Bearers"
            </p>
            <p className="text-blue-300 text-sm mt-1">— Dr. Penta Apparao, Chief Mentor</p>
          </div>
        </div>
      </div>
    </section>
  );
}
import { Bell } from "lucide-react";

const HEADLINES = [
  "🎓 Admissions Open 2025–26 — LKG to Intermediate (MPC / BiPC / CEC / MEC)",
  "📞 Call: 89194 06296 / 95055 33067 for enquiries",
  "🏆 16+ Students in IIT & NIT | 280+ in Top EAPCET Colleges",
  "📅 New Batch Starting Soon — Register Early to Secure Your Seat",
];

export default function MarqueeBanner() {
  return (
    <div className="bg-academy-gold text-white text-sm font-semibold overflow-hidden whitespace-nowrap">
      <div className="flex items-center">
        {/* Static label */}
        <div className="flex items-center gap-2 bg-academy-navy px-4 py-2 shrink-0 z-10">
          <Bell className="w-4 h-4 text-academy-gold" />
          <span className="text-academy-gold text-xs font-bold tracking-wide uppercase">News</span>
        </div>
        {/* Scrolling text */}
        <div className="overflow-hidden flex-1">
          <div className="inline-flex animate-marquee">
            {[...HEADLINES, ...HEADLINES].map((h, i) => (
              <span key={i} className="px-8 py-2 inline-block">
                {h}
                <span className="mx-6 opacity-50">|</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
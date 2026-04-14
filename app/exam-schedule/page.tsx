import { createClient } from "@/lib/supabase/server";
import { formatDate, formatTime, CLASS_SECTIONS } from "@/lib/utils";
import { BookOpen, Clock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Exam Schedule" };

export default async function ExamSchedulePage() {
  const supabase = await createClient();
  const { data: schedules } = await supabase
    .from("exam_schedules")
    .select("*, subjects(name, code)")
    .eq("is_published", true)
    .order("exam_date", { ascending: true });

  // Group by exam_name
  const grouped: Record<string, any[]> = {};
  schedules?.forEach((s) => {
    const key = s.exam_name;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(s);
  });

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-inner pt-6">
          <div className="badge badge-gold mb-6 text-sm px-4 py-2">
            <BookOpen className="w-4 h-4 inline mr-1" /> Examination Timetable
          </div>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mb-6">
            Exam Schedule
          </h1>
          <p className="text-blue-200 text-xl max-w-2xl mx-auto">
            Complete timetable for all upcoming examinations — school and junior college.
          </p>
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {Object.keys(grouped).length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <Clock className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="font-semibold">Exam schedule will be published soon.</p>
              <p className="text-sm mt-2">Please check back closer to the examination dates.</p>
            </div>
          ) : (
            <div className="space-y-10">
              {Object.entries(grouped).map(([examName, items]) => (
                <div key={examName} className="card overflow-hidden">
                  <div className="px-6 py-4 bg-academy-navy text-white flex items-center justify-between">
                    <div>
                      <h2 className="font-heading text-xl font-bold">{examName}</h2>
                      <p className="text-blue-300 text-sm">
                        {items[0].exam_type} &nbsp;·&nbsp;
                        {formatDate(items[0].exam_date)} —{" "}
                        {formatDate(items[items.length - 1].exam_date)}
                      </p>
                    </div>
                    <span className="badge badge-gold">{items.length} papers</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className="table-th">Date</th>
                          <th className="table-th">Day</th>
                          <th className="table-th">Subject</th>
                          <th className="table-th">Class</th>
                          <th className="table-th">Time</th>
                          <th className="table-th">Duration</th>
                          <th className="table-th">Max Marks</th>
                          <th className="table-th">Room</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((s: any) => {
                          const date = new Date(s.exam_date);
                          const dayName = date.toLocaleDateString("en-IN", { weekday: "long" });
                          const start  = new Date(`1970-01-01T${s.start_time}`);
                          const end    = new Date(`1970-01-01T${s.end_time}`);
                          const durMin = Math.round((end.getTime() - start.getTime()) / 60000);
                          const durHr  = Math.floor(durMin / 60);
                          const durRem = durMin % 60;

                          return (
                            <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                              <td className="table-td font-semibold text-academy-navy">
                                {formatDate(s.exam_date)}
                              </td>
                              <td className="table-td text-gray-500">{dayName}</td>
                              <td className="table-td font-semibold">
                                {s.subjects?.name ?? "—"}
                                {s.subjects?.code && (
                                  <span className="text-gray-400 text-xs ml-1">({s.subjects.code})</span>
                                )}
                              </td>
                              <td className="table-td">
                                {s.class_section ? (
                                  <span className="badge badge-navy">{s.class_section}</span>
                                ) : (
                                  <span className="text-gray-400 text-xs">All Classes</span>
                                )}
                              </td>
                              <td className="table-td">
                                <div className="flex items-center gap-1.5 text-sm">
                                  <Clock className="w-3.5 h-3.5 text-academy-gold" />
                                  {formatTime(s.start_time)} – {formatTime(s.end_time)}
                                </div>
                              </td>
                              <td className="table-td text-gray-500">
                                {durHr > 0 ? `${durHr}h ` : ""}{durRem > 0 ? `${durRem}m` : ""}
                              </td>
                              <td className="table-td font-bold text-academy-navy">{s.max_marks}</td>
                              <td className="table-td text-gray-500">{s.room ?? "—"}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-10 card p-6 bg-academy-warm border border-academy-gold/20">
            <h3 className="font-heading font-bold text-academy-navy mb-3">📌 Important Instructions</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex gap-2"><span className="text-academy-gold font-bold">•</span>Students must carry their Hall Ticket / ID card to every examination.</li>
              <li className="flex gap-2"><span className="text-academy-gold font-bold">•</span>Report to the exam hall at least 15 minutes before the scheduled time.</li>
              <li className="flex gap-2"><span className="text-academy-gold font-bold">•</span>Mobile phones and electronic devices are strictly prohibited inside exam halls.</li>
              <li className="flex gap-2"><span className="text-academy-gold font-bold">•</span>Bring your own stationery (pens, pencils, geometry box, etc.).</li>
              <li className="flex gap-2"><span className="text-academy-gold font-bold">•</span>For any clarifications, contact the exam cell at the school office.</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
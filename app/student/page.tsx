import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getGrade, getGradeColor, formatDate } from "@/lib/utils";
import {
  BookOpen, BarChart2, Calendar, Bell, User, TrendingUp, Award,
} from "lucide-react";

export default async function StudentDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "student") redirect("/login");

  // Fetch marks
  const { data: marks } = await supabase
    .from("marks")
    .select("*, subjects(name, code, max_marks)")
    .eq("student_id", user.id)
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  // Fetch announcements
  const { data: announcements } = await supabase
    .from("announcements")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false })
    .limit(5);

  // Fetch timetable
  const { data: timetable } = await supabase
    .from("timetables")
    .select("*, subjects(name), profiles(full_name)")
    .eq("class_section", profile.class_section)
    .order("day_of_week")
    .order("period_number");

  // Stats
  const totalMarks   = marks?.reduce((s, m) => s + Number(m.marks_obtained), 0) ?? 0;
  const totalMax     = marks?.reduce((s, m) => s + Number(m.max_marks), 0) ?? 0;
  const overallPct   = totalMax > 0 ? Math.round((totalMarks / totalMax) * 100) : 0;
  const overallGrade = getGrade(totalMarks, totalMax);

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-academy-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-academy-gold/20 border-2 border-academy-gold/50
                            flex items-center justify-center text-2xl font-heading font-bold text-academy-gold">
              {profile.full_name[0]}
            </div>
            <div>
              <h1 className="font-heading text-2xl font-bold">
                Welcome, {profile.full_name.split(" ")[0]}!
              </h1>
              <p className="text-blue-200 text-sm mt-1">
                Class: {profile.class_section} &nbsp;·&nbsp;
                Roll No: {profile.roll_number ?? "N/A"}
              </p>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            {[
              { label: "Overall %",    value: `${overallPct}%`,      icon: TrendingUp },
              { label: "Grade",        value: overallGrade,           icon: Award },
              { label: "Subjects",     value: marks?.length ?? 0,     icon: BookOpen },
              { label: "Announcements",value: announcements?.length ?? 0, icon: Bell },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="stat-card">
                <Icon className="w-5 h-5 text-academy-gold mx-auto mb-2" />
                <div className="font-heading text-2xl font-bold text-white">{value}</div>
                <div className="text-blue-300 text-xs mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Marks Table */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
                <BarChart2 className="w-5 h-5 text-academy-gold" />
                <h2 className="font-heading font-bold text-academy-navy text-lg">My Marks</h2>
              </div>
              {!marks || marks.length === 0 ? (
                <div className="p-10 text-center text-gray-400">
                  <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  <p>No marks published yet. Check back after exams.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="table-th">Subject</th>
                        <th className="table-th">Exam</th>
                        <th className="table-th">Marks</th>
                        <th className="table-th">Max</th>
                        <th className="table-th">%</th>
                        <th className="table-th">Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {marks.map((m: any) => {
                        const pct   = Math.round((m.marks_obtained / m.max_marks) * 100);
                        const grade = getGrade(m.marks_obtained, m.max_marks);
                        return (
                          <tr key={m.id} className="hover:bg-gray-50 transition-colors">
                            <td className="table-td font-semibold">{m.subjects?.name}</td>
                            <td className="table-td">
                              <span className="badge badge-navy">{m.exam_type}</span>
                            </td>
                            <td className="table-td font-bold text-academy-navy">{m.marks_obtained}</td>
                            <td className="table-td text-gray-400">{m.max_marks}</td>
                            <td className="table-td">
                              <div className="flex items-center gap-2">
                                <div className="flex-1 bg-gray-100 rounded-full h-1.5 max-w-16">
                                  <div
                                    className="h-1.5 rounded-full bg-academy-gold"
                                    style={{ width: `${pct}%` }}
                                  />
                                </div>
                                <span className="text-xs font-semibold">{pct}%</span>
                              </div>
                            </td>
                            <td className="table-td">
                              <span className={`font-bold text-sm ${getGradeColor(grade)}`}>
                                {grade}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Timetable */}
            {timetable && timetable.length > 0 && (
              <div className="card overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-academy-gold" />
                  <h2 className="font-heading font-bold text-academy-navy text-lg">
                    My Timetable — Class {profile.class_section}
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr>
                        <th className="table-th">Day</th>
                        {Array.from({ length: 8 }, (_, i) => (
                          <th key={i} className="table-th">P{i + 1}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {days.map((day, dayIdx) => {
                        const dayPeriods = timetable.filter(
                          (t: any) => t.day_of_week === dayIdx + 1
                        );
                        return (
                          <tr key={day} className="hover:bg-gray-50">
                            <td className="table-td font-bold text-academy-navy">{day}</td>
                            {Array.from({ length: 8 }, (_, pIdx) => {
                              const period = dayPeriods.find(
                                (p: any) => p.period_number === pIdx + 1
                              );
                              return (
                                <td key={pIdx} className="table-td">
                                  {period ? (
                                    <div className="bg-blue-50 rounded px-1.5 py-1 text-center">
                                      <div className="font-semibold text-academy-navy">
                                        {(period as any).subjects?.name}
                                      </div>
                                    </div>
                                  ) : (
                                    <span className="text-gray-200">—</span>
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile */}
            <div className="card p-6">
              <div className="flex items-center gap-3 mb-4">
                <User className="w-5 h-5 text-academy-gold" />
                <h3 className="font-heading font-bold text-academy-navy">My Profile</h3>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Name",         value: profile.full_name },
                  { label: "Class",        value: profile.class_section },
                  { label: "Roll No.",     value: profile.roll_number ?? "—" },
                  { label: "Adm. Year",    value: profile.admission_year ?? "—" },
                  { label: "Parent",       value: profile.parent_name ?? "—" },
                  { label: "Phone",        value: profile.parent_phone ?? "—" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between text-sm border-b border-gray-50 pb-2">
                    <span className="text-gray-500 font-medium">{label}</span>
                    <span className="text-gray-800 font-semibold text-right">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Announcements */}
            <div className="card p-6">
              <div className="flex items-center gap-3 mb-4">
                <Bell className="w-5 h-5 text-academy-gold" />
                <h3 className="font-heading font-bold text-academy-navy">Notices</h3>
              </div>
              <div className="space-y-3">
                {announcements && announcements.length > 0 ? (
                  announcements.map((a: any) => (
                    <div key={a.id} className="border-l-2 border-academy-gold pl-3">
                      <p className="text-sm font-semibold text-gray-800 line-clamp-2">{a.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{formatDate(a.created_at)}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm">No notices at the moment.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
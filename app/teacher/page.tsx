"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { getGrade, getGradeColor, EXAM_TYPES, CLASS_SECTIONS } from "@/lib/utils";
import {
  Users, BookOpen, Edit3, Save, X, CheckCircle, BarChart2,
  LogOut, ChevronDown,
} from "lucide-react";

export default function TeacherDashboard() {
  const supabase = createClient();
  const router   = useRouter();

  const [profile,   setProfile]   = useState<any>(null);
  const [students,  setStudents]  = useState<any[]>([]);
  const [subjects,  setSubjects]  = useState<any[]>([]);
  const [marks,     setMarks]     = useState<any[]>([]);
  const [loading,   setLoading]   = useState(true);

  // Filter state
  const [selClass,   setSelClass]   = useState("");
  const [selSubject, setSelSubject] = useState("");
  const [selExam,    setSelExam]    = useState("Unit Test 1");

  // Edit state
  const [editing,    setEditing]    = useState<Record<string, string>>({});
  const [saving,     setSaving]     = useState(false);

  useEffect(() => {
    init();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function init() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/login"); return; }

    const { data: p } = await supabase.from("profiles").select("*").eq("id", user.id).single();
    if (!p || (p.role !== "teacher" && p.role !== "admin")) { router.push("/login"); return; }
    setProfile(p);

    const { data: subs } = await supabase.from("subjects").select("*").order("name");
    setSubjects(subs ?? []);
    setLoading(false);
  }

  useEffect(() => {
    if (selClass && selSubject) fetchStudentsAndMarks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selClass, selSubject, selExam]);

  async function fetchStudentsAndMarks() {
    const { data: studs } = await supabase
      .from("profiles")
      .select("id, full_name, roll_number, class_section")
      .eq("role", "student")
      .eq("class_section", selClass)
      .order("roll_number");
    setStudents(studs ?? []);

    const ids = (studs ?? []).map((s: any) => s.id);
    if (ids.length > 0) {
      const { data: m } = await supabase
        .from("marks")
        .select("*")
        .in("student_id", ids)
        .eq("subject_id", selSubject)
        .eq("exam_type", selExam);
      setMarks(m ?? []);
    } else {
      setMarks([]);
    }
    setEditing({});
  }

  function getStudentMark(studentId: string) {
    return marks.find((m) => m.student_id === studentId);
  }

  async function saveMarks() {
    if (!selSubject || !selExam || !selClass) {
      toast.error("Please select class, subject and exam type.");
      return;
    }
    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();

    const upserts = Object.entries(editing)
      .filter(([, v]) => v !== "")
      .map(([studentId, marksVal]) => ({
        student_id:    studentId,
        subject_id:    selSubject,
        exam_type:     selExam,
        marks_obtained: parseFloat(marksVal),
        max_marks:     100,
        teacher_id:    user?.id,
        academic_year: "2024-25",
        is_published:  false,
      }));

    if (upserts.length === 0) { toast.error("No marks to save."); setSaving(false); return; }

    const { error } = await supabase
      .from("marks")
      .upsert(upserts, { onConflict: "student_id,subject_id,exam_type,academic_year" });

    if (error) { toast.error("Failed to save: " + error.message); }
    else {
      toast.success(`Saved marks for ${upserts.length} students!`);
      setEditing({});
      fetchStudentsAndMarks();
    }
    setSaving(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 rounded-full border-4 border-academy-gold border-t-transparent animate-spin mx-auto mb-4" />
        <p className="text-gray-500">Loading dashboard…</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-academy-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row
                        items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-bold">Teacher Dashboard</h1>
            <p className="text-blue-200 text-sm mt-1">
              Welcome, {profile?.full_name} — {profile?.designation ?? "Teacher"}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Filters */}
        <div className="card p-6 mb-8">
          <h2 className="font-heading font-bold text-academy-navy text-lg mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-academy-gold" /> Select Class · Subject · Exam
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="label">Class Section</label>
              <select className="input" value={selClass} onChange={(e) => setSelClass(e.target.value)}>
                <option value="">— Select Class —</option>
                {CLASS_SECTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Subject</label>
              <select className="input" value={selSubject} onChange={(e) => setSelSubject(e.target.value)}>
                <option value="">— Select Subject —</option>
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>{s.name} ({s.code})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Exam Type</label>
              <select className="input" value={selExam} onChange={(e) => setSelExam(e.target.value)}>
                {EXAM_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Marks Entry Table */}
        {students.length > 0 ? (
          <div className="card overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-academy-gold" />
                <h2 className="font-heading font-bold text-academy-navy text-lg">
                  Marks Entry — {students.length} Students
                </h2>
              </div>
              <button
                onClick={saveMarks}
                disabled={saving || Object.keys(editing).length === 0}
                className="btn-primary py-2 text-sm disabled:opacity-50"
              >
                {saving ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg> Saving…
                  </span>
                ) : (
                  <span className="flex items-center gap-2"><Save className="w-4 h-4" /> Save Marks</span>
                )}
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="table-th w-8">#</th>
                    <th className="table-th">Roll No.</th>
                    <th className="table-th">Student Name</th>
                    <th className="table-th">Existing Marks</th>
                    <th className="table-th w-40">Enter Marks (/100)</th>
                    <th className="table-th">Grade</th>
                    <th className="table-th">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student: any, idx: number) => {
                    const existing = getStudentMark(student.id);
                    const editVal  = editing[student.id] ?? "";
                    const dispMark = editVal !== ""
                      ? parseFloat(editVal)
                      : existing?.marks_obtained;
                    const grade    = dispMark !== undefined ? getGrade(dispMark) : null;

                    return (
                      <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                        <td className="table-td text-gray-400">{idx + 1}</td>
                        <td className="table-td font-mono font-semibold text-academy-navy">
                          {student.roll_number ?? "—"}
                        </td>
                        <td className="table-td font-semibold">{student.full_name}</td>
                        <td className="table-td">
                          {existing ? (
                            <span className="font-bold text-academy-navy">
                              {existing.marks_obtained} / {existing.max_marks}
                            </span>
                          ) : (
                            <span className="text-gray-300">Not entered</span>
                          )}
                        </td>
                        <td className="table-td">
                          <input
                            type="number"
                            min={0}
                            max={100}
                            className="input py-1.5 text-center w-full"
                            placeholder={existing?.marks_obtained ?? "0–100"}
                            value={editVal}
                            onChange={(e) =>
                              setEditing((prev) => ({
                                ...prev,
                                [student.id]: e.target.value,
                              }))
                            }
                          />
                        </td>
                        <td className="table-td">
                          {grade && (
                            <span className={`font-bold text-sm ${getGradeColor(grade)}`}>
                              {grade}
                            </span>
                          )}
                        </td>
                        <td className="table-td">
                          {existing?.is_published ? (
                            <span className="badge badge-green flex items-center gap-1 w-fit">
                              <CheckCircle className="w-3 h-3" /> Published
                            </span>
                          ) : existing ? (
                            <span className="badge badge-gold">Saved</span>
                          ) : (
                            <span className="badge badge-gray">Pending</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
              <p className="text-xs text-gray-400">
                💡 Enter marks and click <strong>Save Marks</strong>. Admin can publish them to make them visible to students.
                Editing a value will update the existing record.
              </p>
            </div>
          </div>
        ) : selClass && selSubject ? (
          <div className="card p-12 text-center text-gray-400">
            <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No students found in Class {selClass}.</p>
            <p className="text-sm mt-1">Students need to be enrolled by the admin first.</p>
          </div>
        ) : (
          <div className="card p-12 text-center text-gray-400">
            <BarChart2 className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-semibold">Select a class, subject, and exam type above to begin entering marks.</p>
          </div>
        )}
      </div>
    </div>
  );
}
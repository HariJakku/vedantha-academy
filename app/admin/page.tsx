"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { formatDate, CLASS_SECTIONS, EXAM_TYPES } from "@/lib/utils";
import {
  Users, BookOpen, Bell, Trophy, Calendar, Settings,
  Plus, Eye, EyeOff, Trash2, LogOut, BarChart2,
  GraduationCap, UserCheck, AlertCircle,
} from "lucide-react";

type Tab = "overview" | "students" | "teachers" | "marks" | "announcements" | "enquiries";

export default function AdminDashboard() {
  const supabase = createClient();
  const router   = useRouter();

  const [profile,       setProfile]       = useState<any>(null);
  const [activeTab,     setActiveTab]     = useState<Tab>("overview");
  const [loading,       setLoading]       = useState(true);
  const [stats,         setStats]         = useState<any>({});
  const [students,      setStudents]      = useState<any[]>([]);
  const [teachers,      setTeachers]      = useState<any[]>([]);
  const [marks,         setMarks]         = useState<any[]>([]);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [enquiries,     setEnquiries]     = useState<any[]>([]);

  // New announcement form
  const [newAnn, setNewAnn] = useState({ title: "", content: "", type: "General", is_pinned: false });
  const [savingAnn, setSavingAnn] = useState(false);

  useEffect(() => { init(); }, []);// eslint-disable-line

  async function init() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/login"); return; }

    const { data: p } = await supabase.from("profiles").select("*").eq("id", user.id).single();
    if (!p || p.role !== "admin") { router.push("/login"); return; }
    setProfile(p);

    await loadAll();
    setLoading(false);
  }

  async function loadAll() {
    const [
      { count: studentCount },
      { count: teacherCount },
      { count: markCount },
      { count: enquiryCount },
      { data: studs },
      { data: teach },
      { data: mks },
      { data: anns },
      { data: enqs },
    ] = await Promise.all([
      supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "student"),
      supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "teacher"),
      supabase.from("marks").select("*", { count: "exact", head: true }),
      supabase.from("admissions_enquiries").select("*", { count: "exact", head: true }).eq("status", "new"),
      supabase.from("profiles").select("*").eq("role", "student").order("full_name").limit(50),
      supabase.from("profiles").select("*").eq("role", "teacher").order("full_name"),
      supabase.from("marks").select("*, profiles(full_name,roll_number), subjects(name)").order("created_at", { ascending: false }).limit(30),
      supabase.from("announcements").select("*").order("created_at", { ascending: false }),
      supabase.from("admissions_enquiries").select("*").order("created_at", { ascending: false }),
    ]);

    setStats({ students: studentCount, teachers: teacherCount, marks: markCount, newEnquiries: enquiryCount });
    setStudents(studs ?? []);
    setTeachers(teach ?? []);
    setMarks(mks ?? []);
    setAnnouncements(anns ?? []);
    setEnquiries(enqs ?? []);
  }

  async function togglePublishMark(id: string, current: boolean) {
    await supabase.from("marks").update({ is_published: !current }).eq("id", id);
    toast.success(`Mark ${!current ? "published" : "unpublished"}`);
    setMarks((prev) => prev.map((m) => m.id === id ? { ...m, is_published: !current } : m));
  }

  async function deleteMark(id: string) {
    if (!confirm("Delete this mark entry?")) return;
    await supabase.from("marks").delete().eq("id", id);
    toast.success("Deleted.");
    setMarks((prev) => prev.filter((m) => m.id !== id));
  }

  async function togglePublishAnnouncement(id: string, current: boolean) {
    await supabase.from("announcements").update({ is_published: !current }).eq("id", id);
    toast.success(`Announcement ${!current ? "published" : "unpublished"}`);
    setAnnouncements((prev) => prev.map((a) => a.id === id ? { ...a, is_published: !current } : a));
  }

  async function deleteAnnouncement(id: string) {
    if (!confirm("Delete this announcement?")) return;
    await supabase.from("announcements").delete().eq("id", id);
    toast.success("Deleted.");
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
  }

  async function saveAnnouncement() {
    if (!newAnn.title || !newAnn.content) { toast.error("Title and content are required."); return; }
    setSavingAnn(true);
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase.from("announcements").insert([{
      ...newAnn,
      is_published: true,
      published_by: user?.id,
    }]);
    if (error) toast.error("Failed: " + error.message);
    else {
      toast.success("Announcement posted!");
      setNewAnn({ title: "", content: "", type: "General", is_pinned: false });
      loadAll();
    }
    setSavingAnn(false);
  }

  async function updateEnquiryStatus(id: string, status: string) {
    await supabase.from("admissions_enquiries").update({ status }).eq("id", id);
    toast.success("Status updated.");
    setEnquiries((prev) => prev.map((e) => e.id === id ? { ...e, status } : e));
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  const tabs: { key: Tab; label: string; icon: any }[] = [
    { key: "overview",      label: "Overview",      icon: BarChart2 },
    { key: "students",      label: "Students",      icon: Users },
    { key: "teachers",      label: "Teachers",      icon: UserCheck },
    { key: "marks",         label: "Marks",         icon: Trophy },
    { key: "announcements", label: "Notices",       icon: Bell },
    { key: "enquiries",     label: "Enquiries",     icon: AlertCircle },
  ];

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 rounded-full border-4 border-academy-gold border-t-transparent animate-spin mx-auto mb-4" />
        <p className="text-gray-500">Loading admin panel…</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-academy-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Settings className="w-5 h-5 text-academy-gold" />
              <h1 className="font-heading text-xl font-bold">Admin Dashboard</h1>
            </div>
            <p className="text-blue-200 text-sm">Welcome, {profile?.full_name}</p>
          </div>
          <button onClick={handleLogout}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl text-sm font-semibold transition-colors">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto pb-0">
            {tabs.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold whitespace-nowrap
                            border-b-2 transition-colors ${
                  activeTab === key
                    ? "border-academy-gold text-white bg-white/5"
                    : "border-transparent text-blue-300 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="w-4 h-4" /> {label}
                {key === "enquiries" && stats.newEnquiries > 0 && (
                  <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                    {stats.newEnquiries}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── OVERVIEW ── */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "Total Students",   value: stats.students ?? 0,      icon: Users,       color: "bg-blue-500" },
                { label: "Teachers & Staff", value: stats.teachers ?? 0,      icon: UserCheck,   color: "bg-emerald-500" },
                { label: "Mark Entries",     value: stats.marks ?? 0,         icon: Trophy,      color: "bg-purple-500" },
                { label: "New Enquiries",    value: stats.newEnquiries ?? 0,  icon: AlertCircle, color: "bg-red-500" },
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="card p-6 text-center">
                  <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center mx-auto mb-3`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="font-heading text-3xl font-bold text-academy-navy">{value}</div>
                  <div className="text-gray-500 text-sm mt-1">{label}</div>
                </div>
              ))}
            </div>

            <div className="card p-6">
              <h3 className="font-heading font-bold text-academy-navy text-lg mb-4">Quick Actions</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                <button onClick={() => setActiveTab("announcements")} className="btn-primary justify-center">
                  <Bell className="w-4 h-4" /> Post Announcement
                </button>
                <button onClick={() => setActiveTab("marks")} className="btn-outline justify-center">
                  <Trophy className="w-4 h-4" /> Manage Marks
                </button>
                <button onClick={() => setActiveTab("enquiries")} className="btn-ghost justify-center border border-gray-200">
                  <AlertCircle className="w-4 h-4" /> View Enquiries
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── STUDENTS ── */}
        {activeTab === "students" && (
          <div className="card overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
              <Users className="w-5 h-5 text-academy-gold" />
              <h2 className="font-heading font-bold text-academy-navy text-lg">
                All Students ({students.length})
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="table-th">Name</th>
                    <th className="table-th">Roll No.</th>
                    <th className="table-th">Class</th>
                    <th className="table-th">Parent</th>
                    <th className="table-th">Phone</th>
                    <th className="table-th">Adm. Year</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((s: any) => (
                    <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                      <td className="table-td font-semibold">{s.full_name}</td>
                      <td className="table-td font-mono">{s.roll_number ?? "—"}</td>
                      <td className="table-td"><span className="badge badge-navy">{s.class_section}</span></td>
                      <td className="table-td">{s.parent_name ?? "—"}</td>
                      <td className="table-td">{s.parent_phone ?? "—"}</td>
                      <td className="table-td">{s.admission_year ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="px-6 py-3 text-xs text-gray-400 bg-gray-50 border-t border-gray-100">
              To add students, use the Supabase dashboard → profiles table → Insert row (role: student).
            </p>
          </div>
        )}

        {/* ── TEACHERS ── */}
        {activeTab === "teachers" && (
          <div className="card overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
              <UserCheck className="w-5 h-5 text-academy-gold" />
              <h2 className="font-heading font-bold text-academy-navy text-lg">
                Teachers & Staff ({teachers.length})
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="table-th">Name</th>
                    <th className="table-th">Employee ID</th>
                    <th className="table-th">Designation</th>
                    <th className="table-th">Qualification</th>
                    <th className="table-th">Exp. (yrs)</th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.map((t: any) => (
                    <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                      <td className="table-td font-semibold">{t.full_name}</td>
                      <td className="table-td font-mono">{t.employee_id ?? "—"}</td>
                      <td className="table-td">{t.designation ?? "—"}</td>
                      <td className="table-td">{t.qualification ?? "—"}</td>
                      <td className="table-td">{t.experience_years ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── MARKS ── */}
        {activeTab === "marks" && (
          <div className="card overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
              <Trophy className="w-5 h-5 text-academy-gold" />
              <h2 className="font-heading font-bold text-academy-navy text-lg">
                All Marks ({marks.length} recent)
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="table-th">Student</th>
                    <th className="table-th">Roll No.</th>
                    <th className="table-th">Subject</th>
                    <th className="table-th">Exam</th>
                    <th className="table-th">Marks</th>
                    <th className="table-th">Published</th>
                    <th className="table-th">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {marks.map((m: any) => (
                    <tr key={m.id} className="hover:bg-gray-50 transition-colors">
                      <td className="table-td font-semibold">{m.profiles?.full_name}</td>
                      <td className="table-td font-mono">{m.profiles?.roll_number ?? "—"}</td>
                      <td className="table-td">{m.subjects?.name}</td>
                      <td className="table-td"><span className="badge badge-navy">{m.exam_type}</span></td>
                      <td className="table-td font-bold text-academy-navy">
                        {m.marks_obtained} / {m.max_marks}
                      </td>
                      <td className="table-td">
                        {m.is_published
                          ? <span className="badge badge-green">Published</span>
                          : <span className="badge badge-gray">Draft</span>
                        }
                      </td>
                      <td className="table-td">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => togglePublishMark(m.id, m.is_published)}
                            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-500 hover:text-academy-navy"
                            title={m.is_published ? "Unpublish" : "Publish"}
                          >
                            {m.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                          <button
                            onClick={() => deleteMark(m.id)}
                            className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-gray-400 hover:text-red-600"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── ANNOUNCEMENTS ── */}
        {activeTab === "announcements" && (
          <div className="space-y-6">
            {/* Create form */}
            <div className="card p-6">
              <h3 className="font-heading font-bold text-academy-navy text-lg mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5 text-academy-gold" /> Post New Announcement
              </h3>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div className="sm:col-span-2">
                  <label className="label">Title *</label>
                  <input className="input" placeholder="Announcement title"
                    value={newAnn.title} onChange={(e) => setNewAnn((p) => ({ ...p, title: e.target.value }))} />
                </div>
                <div className="sm:col-span-2">
                  <label className="label">Content *</label>
                  <textarea className="input resize-none" rows={3} placeholder="Announcement details…"
                    value={newAnn.content} onChange={(e) => setNewAnn((p) => ({ ...p, content: e.target.value }))} />
                </div>
                <div>
                  <label className="label">Type</label>
                  <select className="input" value={newAnn.type} onChange={(e) => setNewAnn((p) => ({ ...p, type: e.target.value }))}>
                    {["General","Academic","Event","Holiday","Urgent"].map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-3 mt-6">
                  <input type="checkbox" id="pinned" className="w-4 h-4 accent-academy-gold"
                    checked={newAnn.is_pinned} onChange={(e) => setNewAnn((p) => ({ ...p, is_pinned: e.target.checked }))} />
                  <label htmlFor="pinned" className="text-sm font-semibold text-gray-700">Pin this announcement</label>
                </div>
              </div>
              <button onClick={saveAnnouncement} disabled={savingAnn} className="btn-primary disabled:opacity-60">
                {savingAnn ? "Posting…" : "Post Announcement"}
              </button>
            </div>

            {/* List */}
            <div className="card overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="font-heading font-bold text-academy-navy text-lg">
                  All Announcements ({announcements.length})
                </h3>
              </div>
              <div className="divide-y divide-gray-50">
                {announcements.map((a: any) => (
                  <div key={a.id} className="px-6 py-4 flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {a.is_pinned && <span className="badge badge-gold">📌 Pinned</span>}
                        <span className={`badge ${a.type === "Urgent" ? "badge-red" : "badge-navy"}`}>{a.type}</span>
                        {!a.is_published && <span className="badge badge-gray">Draft</span>}
                      </div>
                      <p className="font-semibold text-gray-800">{a.title}</p>
                      <p className="text-gray-500 text-sm mt-0.5 line-clamp-2">{a.content}</p>
                      <p className="text-gray-400 text-xs mt-1">{formatDate(a.created_at)}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button onClick={() => togglePublishAnnouncement(a.id, a.is_published)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-academy-navy transition-colors"
                        title={a.is_published ? "Unpublish" : "Publish"}>
                        {a.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button onClick={() => deleteAnnouncement(a.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors"
                        title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── ENQUIRIES ── */}
        {activeTab === "enquiries" && (
          <div className="card overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-academy-gold" />
              <h2 className="font-heading font-bold text-academy-navy text-lg">
                Admissions Enquiries ({enquiries.length})
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="table-th">Student</th>
                    <th className="table-th">Parent</th>
                    <th className="table-th">Phone</th>
                    <th className="table-th">Class</th>
                    <th className="table-th">Date</th>
                    <th className="table-th">Status</th>
                    <th className="table-th">Update</th>
                  </tr>
                </thead>
                <tbody>
                  {enquiries.map((e: any) => (
                    <tr key={e.id} className="hover:bg-gray-50 transition-colors">
                      <td className="table-td font-semibold">{e.student_name}</td>
                      <td className="table-td">{e.parent_name}</td>
                      <td className="table-td font-mono">{e.phone}</td>
                      <td className="table-td">
                        <span className="badge badge-navy">{e.applying_for ?? "—"}</span>
                      </td>
                      <td className="table-td text-gray-400 text-xs">{formatDate(e.created_at)}</td>
                      <td className="table-td">
                        <span className={`badge ${
                          e.status === "new"       ? "badge-gold" :
                          e.status === "contacted" ? "badge-navy" :
                          e.status === "enrolled"  ? "badge-green" :
                          "badge-red"
                        }`}>{e.status}</span>
                      </td>
                      <td className="table-td">
                        <select
                          className="text-xs border border-gray-200 rounded-lg px-2 py-1 focus:outline-none"
                          value={e.status}
                          onChange={(ev) => updateEnquiryStatus(e.id, ev.target.value)}
                        >
                          {["new","contacted","enrolled","rejected"].map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
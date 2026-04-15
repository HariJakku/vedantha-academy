"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { formatDate } from "@/lib/utils";
import {
  Users, Bell, Trophy, Settings, Plus, Eye, EyeOff,
  Trash2, LogOut, BarChart2, UserCheck, AlertCircle,
  CheckCircle, XCircle, Clock, ShieldCheck,
} from "lucide-react";

type Tab = "overview" | "pending" | "students" | "teachers" | "marks" | "announcements" | "enquiries";

export default function AdminDashboard() {
  const supabase = createClient();
  const router   = useRouter();

  const [profile,       setProfile]       = useState<any>(null);
  const [activeTab,     setActiveTab]     = useState<Tab>("overview");
  const [loading,       setLoading]       = useState(true);
  const [stats,         setStats]         = useState<any>({});
  const [pending,       setPending]       = useState<any[]>([]);
  const [students,      setStudents]      = useState<any[]>([]);
  const [teachers,      setTeachers]      = useState<any[]>([]);
  const [marks,         setMarks]         = useState<any[]>([]);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [enquiries,     setEnquiries]     = useState<any[]>([]);

  const [newAnn,    setNewAnn]    = useState({ title: "", content: "", type: "General", is_pinned: false });
  const [savingAnn, setSavingAnn] = useState(false);

  useEffect(() => { init(); }, []); // eslint-disable-line

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
      { data: pendingData },
      { data: studs },
      { data: teach },
      { data: mks },
      { data: anns },
      { data: enqs },
    ] = await Promise.all([
      supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "student").eq("is_active", true),
      supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "teacher").eq("is_active", true),
      supabase.from("marks").select("*", { count: "exact", head: true }),
      supabase.from("admissions_enquiries").select("*", { count: "exact", head: true }).eq("status", "new"),
      // Pending = is_active false, role student or teacher
      supabase.from("profiles").select("*").eq("is_active", false).in("role", ["student", "teacher"]).order("created_at", { ascending: false }),
      supabase.from("profiles").select("*").eq("role", "student").eq("is_active", true).order("full_name").limit(100),
      supabase.from("profiles").select("*").eq("role", "teacher").eq("is_active", true).order("full_name"),
      supabase.from("marks").select("*, profiles(full_name,roll_number), subjects(name)").order("created_at", { ascending: false }).limit(50),
      supabase.from("announcements").select("*").order("created_at", { ascending: false }),
      supabase.from("admissions_enquiries").select("*").order("created_at", { ascending: false }),
    ]);

    setStats({
      students:    studentCount ?? 0,
      teachers:    teacherCount ?? 0,
      marks:       markCount    ?? 0,
      newEnquiries:enquiryCount ?? 0,
      pending:     pendingData?.length ?? 0,
    });
    setPending(pendingData     ?? []);
    setStudents(studs          ?? []);
    setTeachers(teach          ?? []);
    setMarks(mks               ?? []);
    setAnnouncements(anns      ?? []);
    setEnquiries(enqs          ?? []);
  }

  /* ── Approve / Reject registration ─────────────────────── */
  async function approveUser(id: string) {
    const { error } = await supabase
      .from("profiles")
      .update({ is_active: true })
      .eq("id", id);
    if (error) { toast.error("Failed: " + error.message); return; }
    toast.success("Account approved! User can now log in.");
    setPending((prev) => prev.filter((p) => p.id !== id));
    setStats((s: any) => ({ ...s, pending: s.pending - 1 }));
  }

  async function rejectUser(id: string) {
    if (!confirm("Reject and delete this registration request?")) return;
    // Delete auth user via profile cascade
    await supabase.from("profiles").delete().eq("id", id);
    toast.success("Registration rejected and removed.");
    setPending((prev) => prev.filter((p) => p.id !== id));
    setStats((s: any) => ({ ...s, pending: s.pending - 1 }));
  }

  /* ── Marks ──────────────────────────────────────────────── */
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

  /* ── Announcements ──────────────────────────────────────── */
  async function toggleAnn(id: string, current: boolean) {
    await supabase.from("announcements").update({ is_published: !current }).eq("id", id);
    setAnnouncements((prev) => prev.map((a) => a.id === id ? { ...a, is_published: !current } : a));
    toast.success(`Announcement ${!current ? "published" : "unpublished"}`);
  }
  async function deleteAnn(id: string) {
    if (!confirm("Delete this announcement?")) return;
    await supabase.from("announcements").delete().eq("id", id);
    toast.success("Deleted.");
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
  }
  async function saveAnn() {
    if (!newAnn.title || !newAnn.content) { toast.error("Title and content required."); return; }
    setSavingAnn(true);
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase.from("announcements").insert([{
      ...newAnn, is_published: true, published_by: user?.id,
    }]);
    if (error) toast.error("Failed: " + error.message);
    else { toast.success("Posted!"); setNewAnn({ title: "", content: "", type: "General", is_pinned: false }); loadAll(); }
    setSavingAnn(false);
  }

  /* ── Enquiries ──────────────────────────────────────────── */
  async function updateEnquiry(id: string, status: string) {
    await supabase.from("admissions_enquiries").update({ status }).eq("id", id);
    toast.success("Status updated.");
    setEnquiries((prev) => prev.map((e) => e.id === id ? { ...e, status } : e));
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  /* ── Tabs ───────────────────────────────────────────────── */
  const TABS: { key: Tab; label: string; icon: any; badge?: number }[] = [
    { key: "overview",      label: "Overview",      icon: BarChart2 },
    { key: "pending",       label: "Pending",       icon: Clock,       badge: stats.pending },
    { key: "students",      label: "Students",      icon: Users },
    { key: "teachers",      label: "Teachers",      icon: UserCheck },
    { key: "marks",         label: "Marks",         icon: Trophy },
    { key: "announcements", label: "Notices",       icon: Bell },
    { key: "enquiries",     label: "Enquiries",     icon: AlertCircle, badge: stats.newEnquiries },
  ];

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-12 h-12 rounded-full border-4 border-academy-gold border-t-transparent animate-spin mx-auto mb-4" />
        <p className="text-gray-500 text-sm">Loading admin panel…</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <div className="bg-academy-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-academy-gold/20 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-academy-gold" />
            </div>
            <div>
              <h1 className="font-heading font-bold text-lg leading-tight">Admin Dashboard</h1>
              <p className="text-blue-300 text-xs">{profile?.full_name}</p>
            </div>
          </div>
          <button onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-blue-300 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/10">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto no-scrollbar gap-0">
            {TABS.map(({ key, label, icon: Icon, badge }) => (
              <button key={key} onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 px-4 py-3.5 text-[13px] font-semibold whitespace-nowrap border-b-2 transition-all ${
                  activeTab === key
                    ? "border-academy-gold text-white"
                    : "border-transparent text-blue-300 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
                {badge != null && badge > 0 && (
                  <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center leading-none">
                    {badge}
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
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { label: "Active Students",  value: stats.students,    icon: Users,       color: "bg-blue-500" },
                { label: "Active Teachers",  value: stats.teachers,    icon: UserCheck,   color: "bg-emerald-500" },
                { label: "Mark Entries",     value: stats.marks,       icon: Trophy,      color: "bg-purple-500" },
                { label: "Pending Approvals",value: stats.pending,     icon: Clock,       color: "bg-yellow-500" },
                { label: "New Enquiries",    value: stats.newEnquiries,icon: AlertCircle, color: "bg-red-500" },
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="card p-5 text-center hover:-translate-y-0.5 transition-transform">
                  <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="font-heading text-2xl font-bold text-academy-navy">{value}</div>
                  <div className="text-gray-500 text-xs mt-0.5 font-medium leading-tight">{label}</div>
                </div>
              ))}
            </div>

            <div className="card p-6">
              <h3 className="font-heading font-bold text-academy-navy text-base mb-4">Quick Actions</h3>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => setActiveTab("pending")} className="btn-primary text-sm">
                  <Clock className="w-4 h-4" /> Review Pending ({stats.pending})
                </button>
                <button onClick={() => setActiveTab("announcements")} className="btn-outline text-sm">
                  <Bell className="w-4 h-4" /> Post Announcement
                </button>
                <button onClick={() => setActiveTab("marks")} className="btn-ghost border border-gray-200 text-sm">
                  <Trophy className="w-4 h-4" /> Manage Marks
                </button>
                <button onClick={() => setActiveTab("enquiries")} className="btn-ghost border border-gray-200 text-sm">
                  <AlertCircle className="w-4 h-4" /> Admissions Enquiries
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── PENDING REGISTRATIONS ── */}
        {activeTab === "pending" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h2 className="font-heading font-bold text-academy-navy text-xl">Pending Registrations</h2>
                <p className="text-gray-500 text-sm mt-0.5">
                  Review and approve or reject new account requests.
                </p>
              </div>
              <span className="badge badge-gold text-sm px-3 py-1.5">{pending.length} pending</span>
            </div>

            {pending.length === 0 ? (
              <div className="card p-16 text-center">
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                <h3 className="font-heading font-bold text-lg text-gray-700">All clear!</h3>
                <p className="text-gray-400 text-sm mt-1">No pending registrations at this time.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {pending.map((p: any) => (
                  <div key={p.id} className="card p-5 space-y-3 hover:-translate-y-0.5 transition-transform">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-academy-navy flex items-center justify-center shrink-0">
                          <span className="text-academy-gold font-heading font-bold text-base">
                            {p.full_name?.[0] ?? "?"}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold text-academy-navy text-sm">{p.full_name}</div>
                          <div className="text-gray-400 text-xs">{p.email}</div>
                        </div>
                      </div>
                      <span className={`badge shrink-0 ${p.role === "teacher" ? "badge-navy" : "badge-green"}`}>
                        {p.role}
                      </span>
                    </div>

                    {/* Details */}
                    <div className="space-y-1 text-xs text-gray-500 border-t border-gray-50 pt-3">
                      {p.phone && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Phone</span>
                          <span className="font-medium text-gray-700">{p.phone}</span>
                        </div>
                      )}
                      {p.class_section && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Class</span>
                          <span className="font-medium text-gray-700">{p.class_section}</span>
                        </div>
                      )}
                      {p.roll_number && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Roll No.</span>
                          <span className="font-medium text-gray-700">{p.roll_number}</span>
                        </div>
                      )}
                      {p.parent_name && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Parent</span>
                          <span className="font-medium text-gray-700">{p.parent_name}</span>
                        </div>
                      )}
                      {p.parent_phone && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Parent Ph.</span>
                          <span className="font-medium text-gray-700">{p.parent_phone}</span>
                        </div>
                      )}
                      {p.designation && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Designation</span>
                          <span className="font-medium text-gray-700">{p.designation}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-400">Requested</span>
                        <span className="font-medium text-gray-600">{formatDate(p.created_at)}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={() => approveUser(p.id)}
                        className="flex items-center justify-center gap-1.5 py-2 text-[13px] font-semibold bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
                      >
                        <CheckCircle className="w-4 h-4" /> Approve
                      </button>
                      <button
                        onClick={() => rejectUser(p.id)}
                        className="flex items-center justify-center gap-1.5 py-2 text-[13px] font-semibold bg-red-50 text-red-600 rounded-xl hover:bg-red-100 border border-red-200 transition-colors"
                      >
                        <XCircle className="w-4 h-4" /> Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── STUDENTS ── */}
        {activeTab === "students" && (
          <div className="card overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-3">
              <Users className="w-5 h-5 text-academy-gold" />
              <h2 className="font-heading font-bold text-academy-navy text-lg">
                Active Students ({students.length})
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
                    <th className="table-th">Year</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((s: any) => (
                    <tr key={s.id} className="table-tr-hover">
                      <td className="table-td font-semibold text-academy-navy">{s.full_name}</td>
                      <td className="table-td font-mono text-sm">{s.roll_number ?? "—"}</td>
                      <td className="table-td"><span className="badge badge-navy">{s.class_section ?? "—"}</span></td>
                      <td className="table-td">{s.parent_name ?? "—"}</td>
                      <td className="table-td">{s.parent_phone ?? "—"}</td>
                      <td className="table-td text-gray-400">{s.admission_year ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── TEACHERS ── */}
        {activeTab === "teachers" && (
          <div className="card overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-3">
              <UserCheck className="w-5 h-5 text-academy-gold" />
              <h2 className="font-heading font-bold text-academy-navy text-lg">
                Active Teachers ({teachers.length})
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
                    <th className="table-th">Experience</th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.map((t: any) => (
                    <tr key={t.id} className="table-tr-hover">
                      <td className="table-td font-semibold text-academy-navy">{t.full_name}</td>
                      <td className="table-td font-mono text-sm">{t.employee_id ?? "—"}</td>
                      <td className="table-td">{t.designation ?? "—"}</td>
                      <td className="table-td text-gray-500 text-xs">{t.qualification ?? "—"}</td>
                      <td className="table-td">{t.experience_years ? `${t.experience_years} yrs` : "—"}</td>
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
            <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-3">
              <Trophy className="w-5 h-5 text-academy-gold" />
              <h2 className="font-heading font-bold text-academy-navy text-lg">
                Marks Management ({marks.length} entries)
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="table-th">Student</th>
                    <th className="table-th">Subject</th>
                    <th className="table-th">Exam</th>
                    <th className="table-th">Marks</th>
                    <th className="table-th">Status</th>
                    <th className="table-th">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {marks.map((m: any) => (
                    <tr key={m.id} className="table-tr-hover">
                      <td className="table-td font-semibold text-academy-navy">
                        {m.profiles?.full_name}
                        {m.profiles?.roll_number && (
                          <span className="text-gray-400 text-xs ml-1">({m.profiles.roll_number})</span>
                        )}
                      </td>
                      <td className="table-td">{m.subjects?.name ?? "—"}</td>
                      <td className="table-td"><span className="badge badge-navy">{m.exam_type}</span></td>
                      <td className="table-td font-bold text-academy-navy">{m.marks_obtained}/{m.max_marks}</td>
                      <td className="table-td">
                        {m.is_published
                          ? <span className="badge badge-green">Published</span>
                          : <span className="badge badge-gray">Draft</span>}
                      </td>
                      <td className="table-td">
                        <div className="flex items-center gap-1.5">
                          <button onClick={() => togglePublishMark(m.id, m.is_published)}
                            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-academy-navy transition-colors"
                            title={m.is_published ? "Unpublish" : "Publish"}>
                            {m.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                          <button onClick={() => deleteMark(m.id)}
                            className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors">
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
            {/* Post form */}
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
                  <textarea className="input resize-none" rows={3} placeholder="Details…"
                    value={newAnn.content} onChange={(e) => setNewAnn((p) => ({ ...p, content: e.target.value }))} />
                </div>
                <div>
                  <label className="label">Type</label>
                  <select className="input" value={newAnn.type}
                    onChange={(e) => setNewAnn((p) => ({ ...p, type: e.target.value }))}>
                    {["General","Academic","Event","Holiday","Urgent"].map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-3 mt-6">
                  <input type="checkbox" id="pinned" className="w-4 h-4 accent-academy-gold"
                    checked={newAnn.is_pinned}
                    onChange={(e) => setNewAnn((p) => ({ ...p, is_pinned: e.target.checked }))} />
                  <label htmlFor="pinned" className="text-sm font-semibold text-gray-700">Pin this notice</label>
                </div>
              </div>
              <button onClick={saveAnn} disabled={savingAnn} className="btn-primary disabled:opacity-60">
                {savingAnn ? "Posting…" : "Post Announcement"}
              </button>
            </div>

            {/* List */}
            <div className="card overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-50">
                <h3 className="font-heading font-bold text-academy-navy text-base">
                  All Announcements ({announcements.length})
                </h3>
              </div>
              <div className="divide-y divide-gray-50">
                {announcements.map((a: any) => (
                  <div key={a.id} className="px-6 py-4 flex items-start justify-between gap-4 hover:bg-gray-50/50 transition-colors">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center flex-wrap gap-2 mb-1">
                        {a.is_pinned && <span className="badge badge-gold">📌 Pinned</span>}
                        <span className={`badge ${a.type === "Urgent" ? "badge-red" : "badge-navy"}`}>{a.type}</span>
                        {!a.is_published && <span className="badge badge-gray">Draft</span>}
                      </div>
                      <p className="font-semibold text-gray-800 text-sm">{a.title}</p>
                      <p className="text-gray-400 text-xs mt-0.5 line-clamp-2">{a.content}</p>
                      <p className="text-gray-300 text-[11px] mt-1">{formatDate(a.created_at)}</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button onClick={() => toggleAnn(a.id, a.is_published)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-academy-navy transition-colors"
                        title={a.is_published ? "Unpublish" : "Publish"}>
                        {a.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button onClick={() => deleteAnn(a.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors">
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
            <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-3">
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
                    <tr key={e.id} className="table-tr-hover">
                      <td className="table-td font-semibold text-academy-navy">{e.student_name}</td>
                      <td className="table-td">{e.parent_name}</td>
                      <td className="table-td font-mono text-sm">{e.phone}</td>
                      <td className="table-td"><span className="badge badge-navy">{e.applying_for ?? "—"}</span></td>
                      <td className="table-td text-gray-400 text-xs">{formatDate(e.created_at)}</td>
                      <td className="table-td">
                        <span className={`badge ${
                          e.status === "new"       ? "badge-gold" :
                          e.status === "contacted" ? "badge-navy" :
                          e.status === "enrolled"  ? "badge-green" : "badge-red"
                        }`}>{e.status}</span>
                      </td>
                      <td className="table-td">
                        <select
                          className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-academy-gold"
                          value={e.status}
                          onChange={(ev) => updateEnquiry(e.id, ev.target.value)}
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
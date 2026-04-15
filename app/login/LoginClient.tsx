"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import toast from "react-hot-toast";
import Link from "next/link";
import { GraduationCap, Eye, EyeOff, LogIn, UserPlus, Clock } from "lucide-react";
import { CLASS_SECTIONS } from "@/lib/utils";

type Tab  = "login" | "register";
type Role = "student" | "teacher";

/* ── Wrap in Suspense because useSearchParams needs it ────── */
export default function LoginPage() {
  return (
    <Suspense>
      <LoginPageInner />
    </Suspense>
  );
}

function LoginPageInner() {
  const [tab, setTab] = useState<Tab>("login");

  return (
    <div className="min-h-screen bg-academy-warm flex items-center justify-center px-4 py-24">
      <div className="w-full max-w-md">

        {/* Brand */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex flex-col items-center gap-2 group">
            <div className="w-14 h-14 rounded-2xl bg-academy-navy flex items-center justify-center
                            group-hover:bg-academy-gold transition-colors duration-300">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="font-heading font-bold text-lg text-academy-navy">Vedantha Academy</div>
              <div className="text-gray-400 text-xs mt-0.5">Student · Teacher · Admin Portal</div>
            </div>
          </Link>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-gray-100 rounded-xl p-1 mb-5">
          {(["login", "register"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold
                          rounded-lg transition-all duration-200 capitalize ${
                tab === t
                  ? "bg-white text-academy-navy shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {t === "login"
                ? <><LogIn className="w-4 h-4" /> Sign In</>
                : <><UserPlus className="w-4 h-4" /> Register</>
              }
            </button>
          ))}
        </div>

        {tab === "login" ? <LoginForm /> : <RegisterForm />}

        <p className="text-center text-gray-400 text-xs mt-6">
          <Link href="/" className="hover:text-academy-navy transition-colors">
            ← Back to Website
          </Link>
        </p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   LOGIN FORM
══════════════════════════════════════════════════════════════ */
function LoginForm() {
  const [email,    setEmail]   = useState("");
  const [pwd,      setPwd]     = useState("");
  const [showPwd,  setShowPwd] = useState(false);
  const [loading,  setLoading] = useState(false);

  const router   = useRouter();
  const params   = useSearchParams();
  const supabase = createClient();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !pwd) { toast.error("Enter your email and password."); return; }
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: pwd,
    });

    if (error) {
      // Map common Supabase errors to friendly messages
      const msg =
        error.message.includes("Invalid login")
          ? "Incorrect email or password."
          : error.message.includes("Email not confirmed")
          ? "Please confirm your email first."
          : error.message;
      toast.error(msg);
      setLoading(false);
      return;
    }

    // Get profile to check is_active and role
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setLoading(false); return; }

    const { data: profile, error: profileErr } = await supabase
      .from("profiles")
      .select("role, is_active, full_name")
      .eq("id", user.id)
      .single();

    if (profileErr || !profile) {
      await supabase.auth.signOut();
      toast.error("Account not found. Please register or contact the admin.");
      setLoading(false);
      return;
    }

    if (!profile.is_active) {
      await supabase.auth.signOut();
      toast.error(
        "Your account is pending admin approval. Please wait or contact the office.",
        { duration: 5000 }
      );
      setLoading(false);
      return;
    }

    toast.success(`Welcome back, ${profile.full_name?.split(" ")[0] ?? ""}!`);

    const redirectTo = params.get("redirectTo");
    const dest =
      redirectTo ??
      (profile.role === "admin"   ? "/admin"
     : profile.role === "teacher" ? "/teacher"
     : "/student");

    router.push(dest);
    router.refresh();
    setLoading(false);
  }

  return (
    <form onSubmit={handleLogin} className="card p-7 space-y-5">
      <h2 className="font-heading text-xl font-bold text-academy-navy">Sign In</h2>

      <div>
        <label className="label">Email Address</label>
        <input
          type="email"
          className="input"
          required
          autoComplete="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label className="label">Password</label>
        <div className="relative">
          <input
            type={showPwd ? "text" : "password"}
            className="input pr-11"
            required
            autoComplete="current-password"
            placeholder="Your password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPwd(!showPwd)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
          >
            {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full py-3 disabled:opacity-60"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Signing in…
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <LogIn className="w-4 h-4" /> Sign In
          </span>
        )}
      </button>

      {/* Role guide */}
      <div className="pt-1 border-t border-gray-100 grid grid-cols-3 gap-2">
        {[
          { r: "Student", h: "View marks & notices" },
          { r: "Teacher", h: "Assign marks" },
          { r: "Admin",   h: "Full access" },
        ].map(({ r, h }) => (
          <div key={r} className="bg-gray-50 rounded-xl p-2.5 text-center">
            <div className="text-academy-navy font-semibold text-[11px]">{r}</div>
            <div className="text-gray-400 text-[10px] mt-0.5 leading-tight">{h}</div>
          </div>
        ))}
      </div>
    </form>
  );
}

/* ══════════════════════════════════════════════════════════════
   REGISTER FORM
══════════════════════════════════════════════════════════════ */
function RegisterForm() {
  const [role,       setRole]       = useState<Role>("student");
  const [fullName,   setFullName]   = useState("");
  const [email,      setEmail]      = useState("");
  const [phone,      setPhone]      = useState("");
  const [pwd,        setPwd]        = useState("");
  const [showPwd,    setShowPwd]    = useState(false);
  const [loading,    setLoading]    = useState(false);
  const [done,       setDone]       = useState(false);

  // Student extra
  const [classSec,   setClassSec]   = useState("");
  const [rollNo,     setRollNo]     = useState("");
  const [parentName, setParentName] = useState("");
  const [parentPh,   setParentPh]   = useState("");

  // Teacher extra
  const [empId,      setEmpId]      = useState("");
  const [designation,setDesig]      = useState("");

  const supabase = createClient();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (!fullName.trim()) { toast.error("Enter your full name."); return; }
    if (!email.trim())    { toast.error("Enter your email address."); return; }
    if (pwd.length < 6)   { toast.error("Password must be at least 6 characters."); return; }

    setLoading(true);

    /* ── 1. Create Supabase auth user ─────────────────────── */
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password: pwd,
      options: {
        data: {
          full_name: fullName.trim(),
          role,
        },
        // Don't redirect — we handle everything here
        emailRedirectTo: undefined,
      },
    });

    if (error) {
      const msg =
        error.message.includes("already registered")
          ? "This email is already registered. Try signing in."
          : error.message;
      toast.error(msg);
      setLoading(false);
      return;
    }

    const userId = data.user?.id;
    if (!userId) {
      toast.error("Registration failed. Please try again.");
      setLoading(false);
      return;
    }

    /*
     * ── 2. Upsert extra profile fields ──────────────────────
     * The trigger already created a minimal profile row.
     * We upsert to add the extra data without conflicting.
     * is_active stays FALSE (the trigger sets it).
     */
    const extra: Record<string, any> = {
      id:        userId,
      email:     email.trim(),
      full_name: fullName.trim(),
      phone:     phone.trim() || null,
      role,
      is_active: false,
    };

    if (role === "student") {
      extra.class_section  = classSec   || null;
      extra.roll_number    = rollNo     || null;
      extra.parent_name    = parentName || null;
      extra.parent_phone   = parentPh   || null;
      extra.admission_year = new Date().getFullYear();
    }
    if (role === "teacher") {
      extra.employee_id = empId      || null;
      extra.designation = designation || null;
    }

    const { error: upsertErr } = await supabase
      .from("profiles")
      .upsert([extra], { onConflict: "id" });

    if (upsertErr) {
      // Non-fatal: trigger already saved basic row, admin can still approve
      console.warn("Profile upsert note:", upsertErr.message);
    }

    /* ── 3. Sign out — they must wait for admin approval ──── */
    await supabase.auth.signOut();

    setDone(true);
    setLoading(false);
  }

  if (done) {
    return (
      <div className="card p-8 text-center space-y-4">
        <div className="w-16 h-16 bg-yellow-50 border-2 border-yellow-200 rounded-full
                        flex items-center justify-center mx-auto">
          <Clock className="w-8 h-8 text-yellow-600" />
        </div>
        <h3 className="font-heading font-bold text-xl text-academy-navy">
          Registration Submitted!
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
          Your request has been sent to the admin for review. You'll be able to log in
          once your account is approved.
        </p>
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 text-left space-y-1">
          <p className="text-blue-800 text-xs font-semibold">Contact for faster approval:</p>
          <a href="tel:8919406296" className="block text-blue-700 text-sm font-bold hover:underline">
            📞 89194 06296
          </a>
          <a href="tel:9505533067" className="block text-blue-700 text-sm font-bold hover:underline">
            📞 95055 33067
          </a>
          <p className="text-blue-600 text-xs mt-1">
            Church Street, Parvathipuram – 535501
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleRegister} className="card p-7 space-y-4">
      <div>
        <h2 className="font-heading text-xl font-bold text-academy-navy">Request Registration</h2>
        <p className="text-gray-400 text-xs mt-1">
          Admin will review and approve your account before you can sign in.
        </p>
      </div>

      {/* Role picker */}
      <div>
        <label className="label">I am a *</label>
        <div className="grid grid-cols-2 gap-3">
          {(["student", "teacher"] as Role[]).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={`py-2.5 rounded-xl border-2 text-sm font-semibold capitalize transition-all ${
                role === r
                  ? "border-academy-gold bg-yellow-50 text-academy-navy"
                  : "border-gray-200 text-gray-500 hover:border-gray-300"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Common */}
      <div>
        <label className="label">Full Name *</label>
        <input className="input" required placeholder="Your full name"
          value={fullName} onChange={(e) => setFullName(e.target.value)} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2">
          <label className="label">Email *</label>
          <input type="email" className="input" required placeholder="your@email.com"
            value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label className="label">Phone</label>
          <input type="tel" className="input" placeholder="Mobile number"
            value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div>
          <label className="label">Password *</label>
          <div className="relative">
            <input type={showPwd ? "text" : "password"} className="input pr-10"
              required placeholder="Min. 6 chars"
              value={pwd} onChange={(e) => setPwd(e.target.value)} />
            <button type="button" onClick={() => setShowPwd(!showPwd)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 p-0.5">
              {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Student fields */}
      {role === "student" && (
        <div className="space-y-3 pt-2 border-t border-gray-100">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Student Details</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Class / Stream</label>
              <select className="input" value={classSec}
                onChange={(e) => setClassSec(e.target.value)}>
                <option value="">— Select —</option>
                {CLASS_SECTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Roll No. (if known)</label>
              <input className="input" placeholder="Optional"
                value={rollNo} onChange={(e) => setRollNo(e.target.value)} />
            </div>
            <div>
              <label className="label">Parent Name</label>
              <input className="input" placeholder="Father / Mother"
                value={parentName} onChange={(e) => setParentName(e.target.value)} />
            </div>
            <div>
              <label className="label">Parent Phone</label>
              <input type="tel" className="input" placeholder="Parent mobile"
                value={parentPh} onChange={(e) => setParentPh(e.target.value)} />
            </div>
          </div>
        </div>
      )}

      {/* Teacher fields */}
      {role === "teacher" && (
        <div className="space-y-3 pt-2 border-t border-gray-100">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Teacher Details</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Employee ID</label>
              <input className="input" placeholder="If assigned"
                value={empId} onChange={(e) => setEmpId(e.target.value)} />
            </div>
            <div>
              <label className="label">Designation</label>
              <input className="input" placeholder="e.g. Sr. Lecturer"
                value={designation} onChange={(e) => setDesig(e.target.value)} />
            </div>
          </div>
        </div>
      )}

      <button type="submit" disabled={loading}
        className="btn-primary w-full py-3 disabled:opacity-60">
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Submitting…
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <UserPlus className="w-4 h-4" /> Submit Registration Request
          </span>
        )}
      </button>
    </form>
  );
}
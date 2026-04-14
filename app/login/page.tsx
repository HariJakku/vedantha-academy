"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import toast from "react-hot-toast";
import Link from "next/link";
import { GraduationCap, Eye, EyeOff, LogIn } from "lucide-react";

export default function LoginPage() {
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPwd,  setShowPwd]  = useState(false);
  const [loading,  setLoading]  = useState(false);

  const router      = useRouter();
  const params      = useSearchParams();
  const redirectTo  = params.get("redirectTo");
  const supabase    = createClient();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) { toast.error("Please enter email and password."); return; }
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    // fetch role
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      toast.success("Logged in successfully!");
      const dest = redirectTo
        ?? (profile?.role === "admin"   ? "/admin"
          : profile?.role === "teacher" ? "/teacher"
          : "/student");
      router.push(dest);
      router.refresh();
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-academy-warm flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl
                          bg-academy-navy mb-4">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-academy-navy">Vedantha Academy</h1>
          <p className="text-gray-500 text-sm mt-1">Portal Login — Student · Teacher · Admin</p>
        </div>

        {/* Card */}
        <div className="card p-8">
          <h2 className="font-heading text-xl font-bold text-academy-navy mb-6 text-center">
            Sign In to Your Portal
          </h2>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="label">Email Address</label>
              <input
                type="email"
                className="input"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <div>
              <label className="label">Password</label>
              <div className="relative">
                <input
                  type={showPwd ? "text" : "password"}
                  className="input pr-12"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPwd ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-3.5 text-base disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  Signing in…
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <LogIn className="w-5 h-5" /> Sign In
                </span>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <p className="text-gray-500 text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/contact" className="text-academy-gold font-semibold hover:underline">
                Contact the admin office
              </Link>
            </p>
          </div>
        </div>

        {/* Info boxes */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          {[
            { role: "Student", hint: "View marks, timetable, attendance" },
            { role: "Teacher", hint: "Assign marks, manage classes" },
            { role: "Admin",   hint: "Full access to all data" },
          ].map(({ role, hint }) => (
            <div key={role} className="card p-3 text-center">
              <div className="font-semibold text-academy-navy text-xs">{role}</div>
              <div className="text-gray-400 text-xs mt-0.5 leading-tight">{hint}</div>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-400 text-xs mt-6">
          <Link href="/" className="hover:text-academy-navy transition-colors">
            ← Back to Website
          </Link>
        </p>
      </div>
    </div>
  );
}
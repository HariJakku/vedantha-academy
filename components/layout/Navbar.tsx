"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import {
  Menu, X, ChevronDown, GraduationCap,
  LogIn, LogOut, LayoutDashboard,
  User, BookOpen, Bell,
} from "lucide-react";

const navLinks = [
  { label: "Home",       href: "/" },
  { label: "About",      href: "/about" },
  {
    label: "Academics",
    children: [
      { label: "Faculty",       href: "/faculty",       icon: User },
      { label: "Exam Schedule", href: "/exam-schedule", icon: BookOpen },
      { label: "Results",       href: "/results",       icon: GraduationCap },
    ],
  },
  { label: "Admissions", href: "/admissions" },
  {
    label: "Campus",
    children: [
      { label: "Events",         href: "/events",         icon: Bell },
      { label: "Announcements",  href: "/announcements",  icon: Bell },
      { label: "Alumni",         href: "/alumni",         icon: User },
    ],
  },
  { label: "Gallery",      href: "/gallery" },
  { label: "Contact",    href: "/contact" },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdown,  setDropdown]  = useState<string | null>(null);
  const [user,      setUser]      = useState<any>(null);
  const [profile,   setProfile]   = useState<any>(null);

  const pathname = usePathname();
  const router   = useRouter();
  const supabase = createClient();

  // Only the home page has a dark hero — everywhere else is a light background
  const isHome = pathname === "/";
  // Navbar is "on dark" when: we're on home AND haven't scrolled yet
  const onDark = isHome && !scrolled;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) loadProfile(session.user.id);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
      if (session?.user) loadProfile(session.user.id);
      else setProfile(null);
    });
    return () => subscription.unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadProfile(id: string) {
    const { data } = await supabase
      .from("profiles")
      .select("full_name, role")
      .eq("id", id)
      .single();
    setProfile(data);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  function dashboardHref() {
    if (profile?.role === "admin")   return "/admin";
    if (profile?.role === "teacher") return "/teacher";
    return "/student";
  }

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          onDark
            ? "bg-academy-navy/95 backdrop-blur-sm border-b border-white/10"
            : "bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* ── Logo ── */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300",
                onDark ? "bg-white/15 group-hover:bg-academy-gold" : "bg-academy-navy group-hover:bg-academy-gold"
              )}>
                <GraduationCap className="w-4.5 h-4.5 text-white w-[18px] h-[18px]" />
              </div>
              <span className={cn(
                "font-heading font-bold text-[15px] tracking-tight transition-colors duration-300",
                onDark ? "text-white" : "text-academy-navy"
              )}>
                Vedantha Academy
              </span>
            </Link>

            {/* ── Desktop Nav ── */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((item) =>
                item.children ? (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setDropdown(item.label)}
                    onMouseLeave={() => setDropdown(null)}
                  >
                    <button className={cn(
                      "flex items-center gap-1 px-3 py-2 rounded-lg text-[13px] font-semibold transition-colors duration-200",
                      onDark
                        ? "text-white/80 hover:text-white hover:bg-white/10"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    )}>
                      {item.label}
                      <ChevronDown className={cn(
                        "w-3.5 h-3.5 transition-transform duration-200",
                        dropdown === item.label && "rotate-180"
                      )} />
                    </button>

                    {dropdown === item.label && (
                      <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-xl shadow-lg border border-gray-100/80 py-1.5 z-50">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="flex items-center gap-2.5 px-4 py-2 text-[13px] text-gray-700 hover:bg-gray-50 hover:text-academy-navy transition-colors"
                          >
                            <child.icon className="w-3.5 h-3.5 text-academy-gold" />
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href!}
                    className={cn(
                      "px-3 py-2 rounded-lg text-[13px] font-semibold transition-colors duration-200",
                      onDark
                        ? "text-white/80 hover:text-white hover:bg-white/10"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                      pathname === item.href && (onDark ? "text-white" : "text-academy-navy")
                    )}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>

            {/* ── Desktop CTA ── */}
            <div className="hidden lg:flex items-center gap-2">
              {user && profile ? (
                <>
                  <Link
                    href={dashboardHref()}
                    className={cn(
                      "flex items-center gap-1.5 text-[13px] font-semibold px-3 py-2 rounded-lg transition-colors",
                      onDark
                        ? "text-white/80 hover:text-white hover:bg-white/10"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    )}
                  >
                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 text-[13px] font-semibold px-3 py-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className={cn(
                      "flex items-center gap-1.5 text-[13px] font-semibold px-3 py-2 rounded-lg transition-colors",
                      onDark
                        ? "text-white/80 hover:text-white hover:bg-white/10"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    )}
                  >
                    <LogIn className="w-4 h-4" /> Login
                  </Link>
                  <Link
                    href="/admissions"
                    className="text-[13px] font-bold px-4 py-2 rounded-lg bg-academy-gold text-white hover:bg-yellow-600 transition-colors"
                  >
                    Apply Now
                  </Link>
                </>
              )}
            </div>

            {/* ── Mobile Hamburger ── */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={cn(
                "lg:hidden p-2 rounded-lg transition-colors",
                onDark ? "text-white hover:bg-white/10" : "text-gray-700 hover:bg-gray-100"
              )}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Menu ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setMobileOpen(false)}>
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
        </div>
      )}
      <div className={cn(
        "fixed top-0 right-0 bottom-0 z-40 w-72 bg-white shadow-2xl transform transition-transform duration-300 lg:hidden",
        mobileOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex items-center justify-between px-5 h-16 border-b border-gray-100">
          <span className="font-heading font-bold text-academy-navy text-sm">Vedantha Academy</span>
          <button onClick={() => setMobileOpen(false)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto h-[calc(100%-4rem)] px-3 py-4 space-y-0.5">
          {navLinks.map((item) =>
            item.children ? (
              <div key={item.label}>
                <p className="px-3 pt-4 pb-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  {item.label}
                </p>
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2.5 text-[13px] text-gray-700 rounded-lg hover:bg-gray-50 hover:text-academy-navy transition-colors"
                  >
                    <child.icon className="w-3.5 h-3.5 text-academy-gold" />
                    {child.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href!}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "block px-3 py-2.5 text-[13px] font-semibold rounded-lg transition-colors",
                  pathname === item.href
                    ? "bg-academy-navy/5 text-academy-navy"
                    : "text-gray-700 hover:bg-gray-50"
                )}
              >
                {item.label}
              </Link>
            )
          )}

          <div className="pt-4 mt-2 border-t border-gray-100 space-y-2">
            {user ? (
              <>
                <Link href={dashboardHref()} onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 text-[13px] font-semibold text-academy-navy rounded-lg hover:bg-blue-50">
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </Link>
                <button onClick={handleLogout}
                  className="flex w-full items-center gap-2 px-3 py-2.5 text-[13px] font-semibold text-red-500 rounded-lg hover:bg-red-50">
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 text-[13px] font-semibold text-gray-700 rounded-lg hover:bg-gray-50">
                  <LogIn className="w-4 h-4" /> Login to Portal
                </Link>
                <Link href="/admissions" onClick={() => setMobileOpen(false)}
                  className="block text-center py-2.5 text-[13px] font-bold bg-academy-gold text-white rounded-xl hover:bg-yellow-600 transition-colors">
                  Apply for Admission
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
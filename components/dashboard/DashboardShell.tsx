"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui";
import {
  GraduationCap, LogOut, Menu, X, ChevronRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string | number;
}

interface DashboardShellProps {
  navItems: NavItem[];
  role: "student" | "teacher" | "admin";
  userName: string;
  userSub?: string;
  children: React.ReactNode;
}

const roleColor = {
  student: "bg-blue-600",
  teacher: "bg-emerald-600",
  admin:   "bg-academy-gold",
};

const roleLabel = {
  student: "Student Portal",
  teacher: "Teacher Portal",
  admin:   "Admin Panel",
};

export default function DashboardShell({
  navItems,
  role,
  userName,
  userSub,
  children,
}: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router   = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  const Sidebar = () => (
    <div className="flex flex-col h-full bg-academy-navy text-white">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/10">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-academy-gold flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-heading font-bold text-sm leading-tight">Vedantha Academy</div>
            <div className="text-blue-300 text-xs">{roleLabel[role]}</div>
          </div>
        </Link>
      </div>

      {/* Role badge */}
      <div className="px-5 py-3 border-b border-white/10">
        <span className={cn("text-xs font-bold px-2.5 py-1 rounded-full text-white", roleColor[role])}>
          {role.toUpperCase()}
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ label, href, icon: Icon, badge }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 group",
                active
                  ? "bg-academy-gold text-white shadow-lg shadow-academy-gold/20"
                  : "text-blue-200 hover:bg-white/10 hover:text-white"
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="flex-1">{label}</span>
              {badge !== undefined && (
                <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
                  {badge}
                </span>
              )}
              {active && <ChevronRight className="w-3.5 h-3.5 opacity-60" />}
            </Link>
          );
        })}
      </nav>

      {/* User + Logout */}
      <div className="px-5 py-4 border-t border-white/10 space-y-3">
        <div className="flex items-center gap-3">
          <Avatar name={userName} size={36} />
          <div className="min-w-0">
            <div className="text-white text-sm font-semibold truncate">{userName}</div>
            {userSub && <div className="text-blue-300 text-xs truncate">{userSub}</div>}
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition-colors w-full px-1"
        >
          <LogOut className="w-4 h-4" /> Sign out
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-white/10">
        <Sidebar />
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 flex flex-col lg:hidden transition-transform duration-300",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <Sidebar />
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar (mobile) */}
        <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-academy-navy text-white shrink-0">
          <button onClick={() => setSidebarOpen(true)} className="p-1.5 rounded-lg hover:bg-white/10">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-academy-gold" />
            <span className="font-heading font-bold text-sm">Vedantha Academy</span>
          </div>
          <Avatar name={userName} size={32} />
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
/* ============================================================
   components/ui/index.tsx
   Reusable UI primitives for Vedantha Academy
   Import: import { Button, Card, Badge, Spinner, ... } from "@/components/ui"
   ============================================================ */

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";

/* ── Button ─────────────────────────────────────────────────── */
type Variant = "primary" | "outline" | "ghost" | "danger";
type Size    = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  children: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary: "bg-academy-gold text-white hover:bg-yellow-600 hover:shadow-lg hover:-translate-y-0.5 active:scale-95",
  outline: "border-2 border-academy-navy text-academy-navy hover:bg-academy-navy hover:text-white hover:-translate-y-0.5 active:scale-95",
  ghost:   "text-academy-navy hover:bg-academy-navy/10 active:scale-95",
  danger:  "bg-red-600 text-white hover:bg-red-700 hover:shadow-lg active:scale-95",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-3 py-1.5 text-xs rounded-lg",
  md: "px-5 py-2.5 text-sm rounded-xl",
  lg: "px-8 py-4 text-base rounded-xl",
};

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  className,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
}

/* ── Card ────────────────────────────────────────────────────── */
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  glass?: boolean;
  hover?: boolean;
}

export function Card({ children, glass, hover, className, ...props }: CardProps) {
  return (
    <div
      {...props}
      className={cn(
        "rounded-2xl border",
        glass
          ? "bg-white/80 backdrop-blur-md border-white/60 shadow-xl"
          : "bg-white border-gray-100 shadow-sm",
        hover && "hover:shadow-md hover:-translate-y-0.5 transition-all duration-300",
        className
      )}
    >
      {children}
    </div>
  );
}

/* ── Badge ───────────────────────────────────────────────────── */
type BadgeVariant = "gold" | "navy" | "green" | "red" | "gray" | "purple";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: ReactNode;
}

const badgeVariants: Record<BadgeVariant, string> = {
  gold:   "bg-yellow-100 text-yellow-800",
  navy:   "bg-blue-100 text-blue-800",
  green:  "bg-green-100 text-green-800",
  red:    "bg-red-100 text-red-800",
  gray:   "bg-gray-100 text-gray-700",
  purple: "bg-purple-100 text-purple-800",
};

export function Badge({ variant = "navy", children, className, ...props }: BadgeProps) {
  return (
    <span
      {...props}
      className={cn(
        "inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold",
        badgeVariants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

/* ── Spinner ─────────────────────────────────────────────────── */
export function Spinner({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg
      className={cn("animate-spin text-academy-gold", className)}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
    </svg>
  );
}

/* ── FullPageLoader ──────────────────────────────────────────── */
export function FullPageLoader({ text = "Loading…" }: { text?: string }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50">
      <div className="w-14 h-14 rounded-full border-4 border-academy-gold border-t-transparent animate-spin" />
      <p className="text-gray-500 font-medium text-sm">{text}</p>
    </div>
  );
}

/* ── Empty State ─────────────────────────────────────────────── */
interface EmptyProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function Empty({ icon, title, description, action }: EmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-4">
      {icon && (
        <div className="text-gray-200 mb-4 [&>*]:w-14 [&>*]:h-14">{icon}</div>
      )}
      <h3 className="font-heading font-bold text-gray-500 text-lg">{title}</h3>
      {description && (
        <p className="text-gray-400 text-sm mt-2 max-w-xs leading-relaxed">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

/* ── Input ───────────────────────────────────────────────────── */
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className, id, ...props }: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-semibold text-gray-700 mb-1.5">
          {label}
        </label>
      )}
      <input
        id={inputId}
        {...props}
        className={cn(
          "w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white",
          "focus:outline-none focus:ring-2 focus:ring-academy-gold/40 focus:border-academy-gold",
          "transition-colors placeholder:text-gray-400",
          error && "border-red-400 focus:ring-red-200 focus:border-red-400",
          className
        )}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

/* ── Select ──────────────────────────────────────────────────── */
import type { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
}

export function Select({ label, error, className, id, children, ...props }: SelectProps) {
  const selectId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={selectId} className="block text-sm font-semibold text-gray-700 mb-1.5">
          {label}
        </label>
      )}
      <select
        id={selectId}
        {...props}
        className={cn(
          "w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white",
          "focus:outline-none focus:ring-2 focus:ring-academy-gold/40 focus:border-academy-gold",
          "transition-colors",
          error && "border-red-400",
          className
        )}
      >
        {children}
      </select>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

/* ── Table helpers ───────────────────────────────────────────── */
export function Table({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className="overflow-x-auto">
      <table className={cn("w-full", className)}>{children}</table>
    </div>
  );
}

export function Th({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <th className={cn("table-th", className)}>{children}</th>
  );
}

export function Td({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <td className={cn("table-td", className)}>{children}</td>
  );
}

/* ── Stat Card ───────────────────────────────────────────────── */
interface StatCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  subtext?: string;
  trend?: "up" | "down" | "neutral";
  color?: string;
}

export function StatCard({ label, value, icon, subtext, color = "text-academy-gold" }: StatCardProps) {
  return (
    <div className="card p-6 hover:-translate-y-0.5 transition-transform">
      {icon && (
        <div className="mb-3 [&>*]:w-5 [&>*]:h-5 text-gray-400">{icon}</div>
      )}
      <div className={cn("font-heading text-3xl font-bold", color)}>{value}</div>
      <div className="text-gray-600 text-sm font-semibold mt-1">{label}</div>
      {subtext && <div className="text-gray-400 text-xs mt-0.5">{subtext}</div>}
    </div>
  );
}

/* ── Avatar ──────────────────────────────────────────────────── */
export function Avatar({ name, src, size = 40 }: { name: string; src?: string; size?: number }) {
  const initials = name
    .split(" ")
    .filter((w) => w.length > 1)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      style={{ width: size, height: size }}
      className="rounded-full bg-academy-navy border-2 border-academy-gold/30 flex items-center justify-center overflow-hidden shrink-0"
    >
      {src ? (
        <img src={src} alt={name} className="w-full h-full object-cover" />
      ) : (
        <span className="text-white font-heading font-bold" style={{ fontSize: size * 0.35 }}>
          {initials}
        </span>
      )}
    </div>
  );
}

/* ── Progress Bar ────────────────────────────────────────────── */
export function ProgressBar({ value, max = 100, color = "bg-academy-gold" }: { value: number; max?: number; color?: string }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-gray-100 rounded-full h-2">
        <div
          className={cn("h-2 rounded-full transition-all duration-500", color)}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs font-semibold text-gray-600 w-9 text-right">{pct}%</span>
    </div>
  );
}

/* ── Section Header ──────────────────────────────────────────── */
export function SectionHeader({
  badge,
  title,
  subtitle,
  center = true,
}: {
  badge?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={cn("mb-12", center && "text-center")}>
      {badge && (
        <div className="inline-flex items-center gap-2 bg-academy-gold/10 text-academy-gold px-4 py-1.5 rounded-full text-sm font-bold mb-4">
          {badge}
        </div>
      )}
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle mt-4 max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  );
}
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

export function formatTime(time: string) {
  const [h, m] = time.split(':');
  const hr = parseInt(h);
  return `${hr > 12 ? hr - 12 : hr}:${m} ${hr >= 12 ? 'PM' : 'AM'}`;
}

export function getGrade(marks: number, max: number = 100): string {
  const pct = (marks / max) * 100;
  if (pct >= 90) return 'A+';
  if (pct >= 80) return 'A';
  if (pct >= 70) return 'B+';
  if (pct >= 60) return 'B';
  if (pct >= 50) return 'C';
  if (pct >= 35) return 'D';
  return 'F';
}

export function getGradeColor(grade: string): string {
  const map: Record<string, string> = {
    'A+': 'text-emerald-600',
    'A':  'text-green-600',
    'B+': 'text-blue-600',
    'B':  'text-blue-500',
    'C':  'text-yellow-600',
    'D':  'text-orange-500',
    'F':  'text-red-600',
  };
  return map[grade] || 'text-gray-600';
}

export const CLASS_SECTIONS = [
  'LKG', 'UKG',
  '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
  'Inter-1MPC', 'Inter-1BiPC', 'Inter-1CEC', 'Inter-1MEC',
  'Inter-2MPC', 'Inter-2BiPC', 'Inter-2CEC', 'Inter-2MEC',
];

export const EXAM_TYPES = [
  'Unit Test 1', 'Unit Test 2', 'Mid Term', 'Pre-Final', 'Final', 'Board',
];
import { getGrade, getGradeColor } from "@/lib/utils";
import { ProgressBar, Badge } from "@/components/ui";
import { BookOpen } from "lucide-react";

interface Mark {
  id: string;
  marks_obtained: number;
  max_marks: number;
  exam_type: string;
  is_published: boolean;
  academic_year?: string;
  remarks?: string;
  subjects?: { name: string; code: string } | null;
}

interface MarksTableProps {
  marks: Mark[];
  showStudent?: boolean;
  studentName?: string;
  showActions?: boolean;
  onTogglePublish?: (id: string, current: boolean) => void;
  onDelete?: (id: string) => void;
}

export default function MarksTable({
  marks,
  showActions,
  onTogglePublish,
  onDelete,
}: MarksTableProps) {
  if (!marks || marks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-300">
        <BookOpen className="w-12 h-12 mb-3" />
        <p className="text-gray-500 font-medium">No marks available yet.</p>
        <p className="text-gray-400 text-sm mt-1">Marks will appear here after exams are evaluated and published.</p>
      </div>
    );
  }

  // Summary
  const total    = marks.reduce((s, m) => s + Number(m.marks_obtained), 0);
  const totalMax = marks.reduce((s, m) => s + Number(m.max_marks), 0);
  const overall  = totalMax > 0 ? Math.round((total / totalMax) * 100) : 0;
  const grade    = getGrade(total, totalMax);

  return (
    <div>
      {/* Summary bar */}
      <div className="flex flex-wrap gap-4 p-4 bg-academy-warm rounded-xl mb-4 border border-academy-gold/10">
        <div className="text-center px-4">
          <div className={`font-heading text-2xl font-bold ${getGradeColor(grade)}`}>{grade}</div>
          <div className="text-gray-500 text-xs">Overall Grade</div>
        </div>
        <div className="text-center px-4">
          <div className="font-heading text-2xl font-bold text-academy-navy">{overall}%</div>
          <div className="text-gray-500 text-xs">Percentage</div>
        </div>
        <div className="text-center px-4">
          <div className="font-heading text-2xl font-bold text-academy-navy">{total}/{totalMax}</div>
          <div className="text-gray-500 text-xs">Total Marks</div>
        </div>
        <div className="text-center px-4">
          <div className="font-heading text-2xl font-bold text-academy-navy">{marks.length}</div>
          <div className="text-gray-500 text-xs">Subjects</div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="table-th">Subject</th>
              <th className="table-th">Exam Type</th>
              <th className="table-th">Marks</th>
              <th className="table-th">Max</th>
              <th className="table-th">Progress</th>
              <th className="table-th">Grade</th>
              {showActions && <th className="table-th">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {marks.map((m) => {
              const pct   = Math.round((Number(m.marks_obtained) / Number(m.max_marks)) * 100);
              const grade = getGrade(Number(m.marks_obtained), Number(m.max_marks));
              const barColor =
                pct >= 80 ? "bg-green-500" :
                pct >= 60 ? "bg-blue-500" :
                pct >= 35 ? "bg-yellow-500" :
                "bg-red-500";

              return (
                <tr key={m.id} className="hover:bg-gray-50 transition-colors">
                  <td className="table-td">
                    <div className="font-semibold text-academy-navy">{m.subjects?.name ?? "—"}</div>
                    {m.subjects?.code && (
                      <div className="text-gray-400 text-xs">{m.subjects.code}</div>
                    )}
                  </td>
                  <td className="table-td">
                    <Badge variant="navy">{m.exam_type}</Badge>
                  </td>
                  <td className="table-td font-bold text-lg text-academy-navy">
                    {m.marks_obtained}
                  </td>
                  <td className="table-td text-gray-400">{m.max_marks}</td>
                  <td className="table-td w-40">
                    <ProgressBar value={Number(m.marks_obtained)} max={Number(m.max_marks)} color={barColor} />
                  </td>
                  <td className="table-td">
                    <span className={`font-heading font-bold text-lg ${getGradeColor(grade)}`}>
                      {grade}
                    </span>
                  </td>
                  {showActions && (
                    <td className="table-td">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onTogglePublish?.(m.id, m.is_published)}
                          className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors ${
                            m.is_published
                              ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                              : "bg-green-100 text-green-700 hover:bg-green-200"
                          }`}
                        >
                          {m.is_published ? "Unpublish" : "Publish"}
                        </button>
                        <button
                          onClick={() => onDelete?.(m.id)}
                          className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {marks.some((m) => m.remarks) && (
        <div className="mt-3 space-y-1">
          {marks.filter((m) => m.remarks).map((m) => (
            <p key={m.id} className="text-xs text-gray-400">
              <span className="font-semibold text-gray-600">{m.subjects?.name}:</span> {m.remarks}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
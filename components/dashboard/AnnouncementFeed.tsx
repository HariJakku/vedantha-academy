import { formatDate } from "@/lib/utils";
import { Bell, Pin, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui";

interface Announcement {
  id: string;
  title: string;
  content: string;
  type: string;
  is_pinned: boolean;
  created_at: string;
  valid_until?: string;
  attachment_url?: string;
}

const typeVariant: Record<string, "gold" | "navy" | "green" | "red" | "gray"> = {
  General:  "navy",
  Academic: "green",
  Event:    "gold",
  Holiday:  "gray",
  Urgent:   "red",
};

const borderColor: Record<string, string> = {
  General:  "border-blue-400",
  Academic: "border-green-400",
  Event:    "border-yellow-400",
  Holiday:  "border-gray-400",
  Urgent:   "border-red-500",
};

export default function AnnouncementFeed({
  announcements,
  compact = false,
  maxItems,
}: {
  announcements: Announcement[];
  compact?: boolean;
  maxItems?: number;
}) {
  const list = maxItems ? announcements.slice(0, maxItems) : announcements;

  if (!list.length) {
    return (
      <div className="flex flex-col items-center py-10 text-gray-300">
        <Bell className="w-10 h-10 mb-2" />
        <p className="text-gray-500 text-sm">No announcements at the moment.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {list.map((a) => (
        <div
          key={a.id}
          className={`pl-4 border-l-4 rounded-r-xl bg-white border border-gray-50 shadow-sm
                      hover:shadow-md transition-shadow ${borderColor[a.type] ?? "border-gray-300"}`}
        >
          <div className={`py-3 pr-4 ${compact ? "" : "py-4 pr-5"}`}>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              {a.is_pinned && (
                <Badge variant="gold" className="gap-1">
                  <Pin className="w-3 h-3" /> Pinned
                </Badge>
              )}
              <Badge variant={typeVariant[a.type] ?? "gray"}>{a.type}</Badge>
              {a.valid_until && (
                <span className="text-orange-500 text-xs font-semibold">
                  Until {formatDate(a.valid_until)}
                </span>
              )}
            </div>

            <h4 className={`font-semibold text-gray-800 ${compact ? "text-sm" : "text-base"}`}>
              {a.title}
            </h4>

            {!compact && (
              <p className="text-gray-500 text-sm mt-1 leading-relaxed line-clamp-3">
                {a.content}
              </p>
            )}

            <div className="flex items-center justify-between mt-2">
              <span className="text-gray-400 text-xs">{formatDate(a.created_at)}</span>
              {a.attachment_url && (
                <a
                  href={a.attachment_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-academy-gold hover:underline font-semibold"
                >
                  Attachment <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
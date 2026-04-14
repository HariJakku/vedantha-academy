import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";
import { Bell, Pin } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Announcements" };

const typeColor: Record<string, string> = {
  General:  "badge-navy",
  Academic: "badge-green",
  Event:    "badge-gold",
  Holiday:  "badge-gray",
  Urgent:   "badge-red",
};

export default async function AnnouncementsPage() {
  const supabase = await createClient();
  const { data: announcements } = await supabase
    .from("announcements")
    .select("*")
    .eq("is_published", true)
    .order("is_pinned", { ascending: false })
    .order("created_at", { ascending: false });

  const pinned  = announcements?.filter((a) => a.is_pinned) ?? [];
  const regular = announcements?.filter((a) => !a.is_pinned) ?? [];

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-inner pt-6">
          <div className="badge badge-gold mb-6 text-sm px-4 py-2">
            <Bell className="w-4 h-4 inline mr-1" /> Official Notices
          </div>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mb-6">
            Announcements
          </h1>
          <p className="text-blue-200 text-xl max-w-2xl mx-auto">
            Important notices, circulars, and updates from Vedantha Academy.
          </p>
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Pinned */}
          {pinned.length > 0 && (
            <div className="mb-10">
              <h2 className="font-heading text-xl font-bold text-academy-navy mb-4 flex items-center gap-2">
                <Pin className="w-5 h-5 text-academy-gold" /> Pinned Notices
              </h2>
              <div className="space-y-4">
                {pinned.map((a: any) => (
                  <AnnouncementCard key={a.id} a={a} />
                ))}
              </div>
            </div>
          )}

          {/* Regular */}
          <div>
            <h2 className="font-heading text-xl font-bold text-academy-navy mb-4">All Notices</h2>
            {regular.length > 0 ? (
              <div className="space-y-4">
                {regular.map((a: any) => (
                  <AnnouncementCard key={a.id} a={a} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-gray-400">
                <Bell className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p>No announcements yet. Check back soon.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function AnnouncementCard({ a }: { a: any }) {
  return (
    <div className={`card p-6 border-l-4 ${
      a.type === "Urgent" ? "border-red-500" :
      a.type === "Event"  ? "border-yellow-500" :
      a.type === "Holiday"? "border-gray-400" :
      "border-academy-navy"
    }`}>
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex flex-wrap gap-2 mb-2">
            {a.is_pinned && (
              <span className="badge badge-gold flex items-center gap-1">
                <Pin className="w-3 h-3" /> Pinned
              </span>
            )}
            <span className={`badge ${typeColor[a.type] ?? "badge-gray"}`}>{a.type}</span>
          </div>
          <h3 className="font-heading font-bold text-academy-navy text-lg mb-2">{a.title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{a.content}</p>
          {a.valid_until && (
            <p className="text-orange-500 text-xs mt-2 font-semibold">
              Valid until: {formatDate(a.valid_until)}
            </p>
          )}
        </div>
        <div className="text-right shrink-0">
          <p className="text-gray-400 text-xs">{formatDate(a.created_at)}</p>
        </div>
      </div>
    </div>
  );
}
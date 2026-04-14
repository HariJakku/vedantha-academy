import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";
import { Calendar, MapPin } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Events" };

export default async function EventsPage() {
  const supabase = await createClient();
  const { data: events } = await supabase
    .from("events")
    .select("*")
    .eq("is_published", true)
    .order("event_date", { ascending: false });

  const upcoming  = events?.filter((e) => e.status === "upcoming")  ?? [];
  const ongoing   = events?.filter((e) => e.status === "ongoing")   ?? [];
  const completed = events?.filter((e) => e.status === "completed") ?? [];

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-inner pt-6">
          <div className="badge badge-gold mb-6 text-sm px-4 py-2">
            <Calendar className="w-4 h-4 inline mr-1" /> Campus Life
          </div>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mb-6">
            Events & Activities
          </h1>
          <p className="text-blue-200 text-xl max-w-2xl mx-auto">
            From sports days to cultural programs — life at Vedantha Academy is vibrant and full.
          </p>
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {upcoming.length > 0 && (
            <EventGroup title="Upcoming Events" events={upcoming} accent="bg-yellow-500" />
          )}
          {ongoing.length > 0 && (
            <EventGroup title="Ongoing Events" events={ongoing} accent="bg-green-500" />
          )}
          {completed.length > 0 && (
            <EventGroup title="Past Events" events={completed} accent="bg-gray-400" />
          )}

          {(!events || events.length === 0) && (
            <div className="text-center py-20 text-gray-400">
              <Calendar className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p>No events to display yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function EventGroup({ title, events, accent }: { title: string; events: any[]; accent: string }) {
  return (
    <div className="mb-14">
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-3 h-3 rounded-full ${accent}`} />
        <h2 className="font-heading text-2xl font-bold text-academy-navy">{title}</h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((ev: any) => (
          <div key={ev.id} className="card overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
            <div className="h-48 bg-gradient-to-br from-academy-navy to-blue-800 relative">
              <div className="absolute top-3 left-3">
                <span className={`badge ${
                  ev.status === "upcoming"  ? "badge-gold" :
                  ev.status === "ongoing"   ? "badge-green" :
                  "badge-gray"
                }`}>{ev.status}</span>
              </div>
              <div className="absolute bottom-4 left-4 text-white">
                <div className="font-heading text-4xl font-bold leading-none">
                  {new Date(ev.event_date).getDate()}
                </div>
                <div className="text-blue-200 text-sm font-semibold uppercase">
                  {new Date(ev.event_date).toLocaleString("en-IN", { month: "long", year: "numeric" })}
                </div>
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-heading font-bold text-academy-navy text-lg mb-2 group-hover:text-academy-gold transition-colors">
                {ev.title}
              </h3>
              {ev.description && (
                <p className="text-gray-500 text-sm leading-relaxed mb-3 line-clamp-3">{ev.description}</p>
              )}
              {ev.venue && (
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <MapPin className="w-3.5 h-3.5" /> {ev.venue}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
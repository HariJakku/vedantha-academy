import { createClient } from "@/lib/supabase/server";
import { Trophy, Star, Award } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Results" };

export default async function ResultsPage() {
  const supabase = await createClient();
  const { data: results } = await supabase
    .from("published_results")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-inner pt-6">
          <div className="badge badge-gold mb-6 text-sm px-4 py-2">
            <Trophy className="w-4 h-4 inline mr-1" /> Academic Results
          </div>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mb-6">
            Outstanding Results
          </h1>
          <p className="text-blue-200 text-xl max-w-3xl mx-auto">
            Celebrating excellence — our students&apos; board exam achievements, toppers, and milestones.
          </p>
        </div>
      </div>

      {/* Overview stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              { n: "98.5%", l: "Class 10 Pass Rate 2023–24" },
              { n: "95.2%", l: "Intermediate Pass Rate 2023–24" },
              { n: "45+",   l: "Distinctions in 2023–24" },
              { n: "3",     l: "District Rank Holders" },
            ].map(({ n, l }) => (
              <div key={l} className="card p-6 text-center hover:-translate-y-1 transition-transform">
                <div className="font-heading text-4xl font-bold text-academy-gold mb-2">{n}</div>
                <div className="text-gray-600 text-sm font-medium">{l}</div>
              </div>
            ))}
          </div>

          {/* Result cards */}
          {results && results.length > 0 ? (
            <div className="space-y-8">
              {results.map((result) => {
                const toppers = Array.isArray(result.toppers)
                  ? result.toppers
                  : result.toppers
                  ? JSON.parse(result.toppers)
                  : [];

                return (
                  <div key={result.id} className="card p-8">
                    <div className="flex flex-col md:flex-row md:items-start gap-6">
                      <div className="flex-1">
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="badge badge-navy">{result.year}</span>
                          {result.class_section && (
                            <span className="badge badge-gold">{result.class_section}</span>
                          )}
                          {result.exam_type && (
                            <span className="badge badge-gray">{result.exam_type}</span>
                          )}
                        </div>
                        <h3 className="font-heading text-2xl font-bold text-academy-navy mb-2">
                          {result.title}
                        </h3>
                        <div className="flex flex-wrap gap-6 mt-4">
                          {result.pass_percentage && (
                            <div>
                              <div className="font-heading text-3xl font-bold text-emerald-600">
                                {result.pass_percentage}%
                              </div>
                              <div className="text-gray-500 text-sm">Pass Rate</div>
                            </div>
                          )}
                          {result.distinctions && (
                            <div>
                              <div className="font-heading text-3xl font-bold text-purple-600">
                                {result.distinctions}
                              </div>
                              <div className="text-gray-500 text-sm">Distinctions</div>
                            </div>
                          )}
                          {result.firsts && (
                            <div>
                              <div className="font-heading text-3xl font-bold text-blue-600">
                                {result.firsts}
                              </div>
                              <div className="text-gray-500 text-sm">First Classes</div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Toppers */}
                      {toppers.length > 0 && (
                        <div className="md:w-72 shrink-0">
                          <div className="bg-academy-warm rounded-2xl p-5 border border-academy-gold/20">
                            <h4 className="font-heading font-bold text-academy-navy text-base mb-4 flex items-center gap-2">
                              <Star className="w-4 h-4 text-academy-gold fill-current" /> Top Scorers
                            </h4>
                            <div className="space-y-3">
                              {toppers.slice(0, 5).map((t: any, i: number) => (
                                <div key={i} className="flex items-center gap-3">
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                                    i === 0 ? "bg-yellow-400 text-yellow-900" :
                                    i === 1 ? "bg-gray-300 text-gray-700" :
                                    i === 2 ? "bg-amber-600 text-white" :
                                    "bg-gray-100 text-gray-600"
                                  }`}>
                                    {i + 1}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="font-semibold text-sm text-gray-800 truncate">{t.name}</div>
                                  </div>
                                  <div className="font-heading font-bold text-academy-gold shrink-0">{t.marks}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-400">
              <Trophy className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p>Results will be published after board examinations.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
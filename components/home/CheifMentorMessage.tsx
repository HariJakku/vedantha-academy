import { Quote } from "lucide-react";

export default function ChiefMentorMessage() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-academy-gold/10 text-academy-gold px-4 py-1.5 rounded-full text-sm font-bold mb-4">
            Leadership Messages
          </div>
          <h2 className="section-title">From the Desk of Our Leaders</h2>
        </div>

        <div className="space-y-8">
          {/* Chief Mentor */}
          <div className="relative bg-gradient-to-br from-academy-navy to-blue-900 rounded-3xl p-8 md:p-12 text-white overflow-hidden">
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-academy-gold/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-14 -left-14 w-52 h-52 bg-blue-500/10 rounded-full blur-3xl" />

            <div className="relative z-10 grid md:grid-cols-3 gap-8 items-start">
              <div className="flex flex-col items-center text-center">
                <div className="w-36 h-36 rounded-full border-4 border-academy-gold/60 overflow-hidden mb-4 bg-academy-gold/10">
                  <img
                    src="https://vedanthaedu.netlify.app/img/apparao.jpg"
                    alt="Dr. Penta Apparao"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="font-heading text-lg font-bold">Dr. Penta Apparao</div>
                <div className="text-academy-gold text-sm font-semibold">Chief Mentor</div>
                <div className="text-blue-300 text-xs mt-1">Associate Professor — Physics</div>
                <div className="text-blue-400 text-xs">B.Sc.(MPC), M.Sc., M.Phil., Ph.D.</div>
                <div className="mt-3 bg-academy-gold/20 border border-academy-gold/40 px-3 py-1 rounded-full text-academy-gold text-xs font-bold">
                  30+ Years Experience
                </div>
              </div>

              <div className="md:col-span-2">
                <Quote className="w-10 h-10 text-academy-gold/40 mb-4" />
                <h3 className="font-heading text-xl font-bold text-academy-gold mb-4">Chief Mentor's Message</h3>
                <p className="text-blue-100 leading-relaxed mb-4">
                  As a person from a low middle-class family, I would like to do something for
                  students of my area who wished to get quality education. Unfortunately, they
                  are not financially strong enough to join corporate colleges in and around
                  Visakhapatnam.
                </p>
                <p className="text-blue-100 leading-relaxed mb-5">
                  For this, we established the{" "}
                  <span className="text-academy-gold font-semibold">Penta Sobha Sri Memorial Educational Society</span>{" "}
                  in 2020 — and launched Vedantha Junior College and subsequently Vedantha Co-School
                  — to ensure every child in Parvathipuram has the same opportunity as any student
                  in a top urban college.
                </p>
                <div className="border-t border-white/10 pt-4">
                  <div className="font-heading text-base font-bold text-academy-gold italic">Dr. Penta Apparao</div>
                  <div className="text-blue-300 text-sm">Chief Mentor, Vedantha Academy · Parvathipuram</div>
                </div>
              </div>
            </div>
          </div>

          {/* Director */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100">
            <div className="grid md:grid-cols-3 gap-8 items-start">
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full border-4 border-academy-navy/20 overflow-hidden mb-4 bg-gray-100">
                  <img
                    src="https://vedanthaedu.netlify.app/img/sln.jpg"
                    alt="Shri Lakshmunaidu Sristu"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="font-heading text-lg font-bold text-academy-navy">Shri Lakshmunaidu Sristu</div>
                <div className="text-academy-gold text-sm font-semibold">Director & Principal</div>
                <div className="text-gray-400 text-xs mt-1">Sr. IIT Faculty — Mathematics</div>
                <div className="text-gray-400 text-xs">B.Sc.(MPC), M.Sc.(Maths)</div>
                <div className="mt-3 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full text-blue-700 text-xs font-bold">
                  26+ Years Experience
                </div>
              </div>

              <div className="md:col-span-2">
                <Quote className="w-8 h-8 text-academy-gold/30 mb-4" />
                <h3 className="font-heading text-xl font-bold text-academy-navy mb-4">Director's Message</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  At our institution, we believe in fostering curiosity, creativity, and
                  perseverance. I encourage each of you to stay dedicated, work hard, and
                  never stop believing in your potential. Your dreams are within reach, and
                  with determination and discipline, you can achieve greatness.
                </p>
                <p className="text-gray-600 leading-relaxed mb-5">
                  Remember, success is not defined by how fast you reach your goals but by
                  the consistency and effort you put in every single day. Take advantage of
                  the opportunities provided, engage actively in learning, and always strive
                  for excellence.
                </p>
                <div className="border-t border-gray-100 pt-4">
                  <div className="font-heading text-base font-bold text-academy-gold italic">Shri Lakshmunaidu Sristu</div>
                  <div className="text-gray-500 text-sm">Director & Principal, Vedantha Academy</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
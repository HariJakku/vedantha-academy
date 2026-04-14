"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";

const CATEGORIES = [
  {
    key: "all",
    label: "All Photos",
  },
  {
    key: "college",
    label: "🏫 College",
  },
  {
    key: "culturals",
    label: "🎭 Culturals",
  },
  {
    key: "felicitations",
    label: "🏆 Felicitations",
  },
  {
    key: "campus",
    label: "🏛️ Campus",
  },
];

const PHOTOS = [
  // Campus
  { src: "/gallery/va1.jpg",   category: "campus",        caption: "Vedantha Academy Campus" },
  { src: "/gallery/va2.jpg",   category: "campus",        caption: "Vedantha Academy Campus" },
  { src: "/gallery/va3.jpg",   category: "campus",        caption: "Vedantha Academy Campus" },
  // College
  { src: "/gallery/vcol1.jpg", category: "college",       caption: "College Life" },
  { src: "/gallery/vcol2.jpg", category: "college",       caption: "College Life" },
  { src: "/gallery/vcol3.jpg", category: "college",       caption: "College Life" },
  { src: "/gallery/vcol4.jpg", category: "college",       caption: "College Life" },
  { src: "/gallery/vcol5.jpg", category: "college",       caption: "College Life" },
  // Culturals
  { src: "/gallery/vcul1.jpg", category: "culturals",     caption: "Cultural Events" },
  { src: "/gallery/vcul2.jpg", category: "culturals",     caption: "Cultural Events" },
  { src: "/gallery/vcul3.jpg", category: "culturals",     caption: "Cultural Events" },
  { src: "/gallery/vcul4.jpg", category: "culturals",     caption: "Cultural Events" },
  { src: "/gallery/IMG-20250226-WA0022.jpg", category: "culturals", caption: "Cultural Events" },
  // Felicitations
  { src: "/gallery/vf1.jpg",   category: "felicitations", caption: "Felicitation Ceremony" },
  { src: "/gallery/vf2.jpg",   category: "felicitations", caption: "Felicitation Ceremony" },
  { src: "/gallery/vf3.jpg",   category: "felicitations", caption: "Felicitation Ceremony" },
  { src: "/gallery/vf4.jpg",   category: "felicitations", caption: "Felicitation Ceremony" },
  { src: "/gallery/vf5.jpg",   category: "felicitations", caption: "Felicitation Ceremony" },
  { src: "/gallery/vf6.jpg",   category: "felicitations", caption: "Felicitation Ceremony" },
  { src: "/gallery/vf7.jpg",   category: "felicitations", caption: "Felicitation Ceremony" },
  { src: "/gallery/vf8.jpg",   category: "felicitations", caption: "Felicitation Ceremony" },
  { src: "/gallery/vf9.jpg",   category: "felicitations", caption: "Felicitation Ceremony" },
];

export default function GalleryPage() {
  const [active, setActive]   = useState("all");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered = active === "all"
    ? PHOTOS
    : PHOTOS.filter((p) => p.category === active);

  return (
    <>
      {/* Hero */}
      <div className="page-hero">
        <div className="page-hero-inner pt-6">
          <div className="badge badge-gold mb-6 text-sm px-4 py-2">Photo Gallery</div>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mb-6">
            Life at Vedantha
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Moments from our campus — cultural events, felicitations, college life, and more.
          </p>
        </div>
      </div>

      <section className="py-16 bg-academy-warm min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {CATEGORIES.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  active === key
                    ? "bg-academy-navy text-white shadow-lg scale-105"
                    : "bg-white text-gray-600 hover:bg-academy-gold/10 hover:text-academy-navy border border-gray-200"
                }`}
              >
                {label}
                <span className="ml-2 text-xs opacity-60">
                  {key === "all" ? PHOTOS.length : PHOTOS.filter((p) => p.category === key).length}
                </span>
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
            {filtered.map((photo, i) => (
              <div
                key={i}
                className="break-inside-avoid relative group cursor-pointer rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                onClick={() => setLightbox(photo.src)}
              >
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-academy-navy/0 group-hover:bg-academy-navy/40 transition-all duration-300 flex items-center justify-center">
                  <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-xs font-medium">{photo.caption}</p>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <p>No photos in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-white bg-white/20 hover:bg-white/40 rounded-full p-2 transition-colors"
            onClick={() => setLightbox(null)}
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={lightbox}
            alt="Gallery"
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
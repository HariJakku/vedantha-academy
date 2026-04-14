import Link from 'next/link';
import {
  GraduationCap,
  Phone,
  Mail,
  MapPin,
  ArrowRight
} from 'lucide-react';

import { FaFacebook, FaYoutube, FaInstagram } from 'react-icons/fa';

const quickLinks = [
  { label: 'About Academy', href: '/about' },
  { label: 'Admissions', href: '/admissions' },
  { label: 'Faculty', href: '/faculty' },
  { label: 'Results', href: '/results' },
  { label: 'Events', href: '/events' },
  { label: 'Announcements', href: '/announcements' },
  { label: 'Alumni', href: '/alumni' },
  { label: 'Contact', href: '/contact' },
];

const portals = [
  { label: 'Student Portal', href: '/student' },
  { label: 'Teacher Portal', href: '/teacher' },
  { label: 'Admin Portal', href: '/admin' },
  { label: 'Exam Schedule', href: '/exam-schedule' },
];

export default function Footer() {
  return (
    <footer className="bg-academy-navy text-white">
      {/* Top Band */}
      <div className="bg-academy-gold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white font-semibold text-sm">
            🎓 Admissions Open 2025–26 — Apply Now for LKG to Intermediate!
          </p>
          <Link
            href="/admissions"
            className="flex items-center gap-2 bg-white text-academy-gold font-bold px-5 py-2 rounded-lg text-sm hover:bg-yellow-50 transition-colors shrink-0"
          >
            Apply Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl bg-academy-gold/20 border border-academy-gold/40 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-academy-gold" />
              </div>
              <div>
                <div className="font-heading font-bold text-lg">Vedantha Academy</div>
                <div className="text-blue-300 text-xs">Parvathipuram</div>
              </div>
            </div>

            <p className="text-blue-200 text-sm mb-6">
              Empowering young minds with quality education from LKG to Intermediate.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3">
              {[
                { icon: FaFacebook, label: 'Facebook' },
                { icon: FaYoutube, label: 'YouTube' },
                { icon: FaInstagram, label: 'Instagram' },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/10 hover:bg-academy-gold transition"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-5 text-academy-gold">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="flex items-center gap-2 text-blue-200 hover:text-white text-sm">
                    <ArrowRight className="w-3 h-3 text-academy-gold" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Portals */}
          <div>
            <h3 className="font-bold text-lg mb-5 text-academy-gold">Portals</h3>
            <ul className="space-y-2">
              {portals.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="flex items-center gap-2 text-blue-200 hover:text-white text-sm">
                    <ArrowRight className="w-3 h-3 text-academy-gold" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-5 text-academy-gold">Contact</h3>
            <div className="space-y-3 text-sm text-blue-200">
              <p className="flex gap-2">
                <MapPin className="w-4 h-4 text-academy-gold" />
                Parvathipuram, AP
              </p>
              <p className="flex gap-2">
                <Phone className="w-4 h-4 text-academy-gold" />
                +91 98765 43210
              </p>
              <p className="flex gap-2">
                <Mail className="w-4 h-4 text-academy-gold" />
                info@vedanthaacademy.in
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10 py-4 text-center text-xs text-blue-300">
        © {new Date().getFullYear()} Vedantha Academy. All rights reserved.
      </div>
    </footer>
  );
}
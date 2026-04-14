import type { Metadata } from 'next';
import { Playfair_Display, Nunito, JetBrains_Mono } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MarqueeBanner from '@/components/layout/Marquee';
import './globals.css';


const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Vedantha Academy — Parvathipuram',
    template: '%s | Vedantha Academy',
  },
  description:
    'Vedantha Academy, Parvathipuram — A premier co-educational institution offering excellence from LKG to 10th and Intermediate (Junior College). Nurturing minds, building futures.',
  keywords: [
    'Vedantha Academy', 'Parvathipuram', 'School', 'Junior College',
    'Intermediate', 'LKG to 10th', 'Best school Parvathipuram', 'CBSE',
  ],
  authors: [{ name: 'Vedantha Academy' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    title: 'Vedantha Academy — Parvathipuram',
    description: 'Excellence in Education from LKG to Intermediate',
    siteName: 'Vedantha Academy',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${nunito.variable} ${jetbrains.variable}`}>
      <body className="font-body bg-academy-cream text-gray-900 antialiased">
        <Toaster
          position="top-right"
          toastOptions={{
            style: { fontFamily: 'var(--font-nunito)', borderRadius: '10px' },
          }}
        />
        <Navbar />
        {/* Spacer for fixed navbar height */}
        <div className="h-16" />
        <MarqueeBanner />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
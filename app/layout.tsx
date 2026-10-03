import type { Metadata } from 'next';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import CustomCursor from '@/components/CustomCursor';
import SignalThread from '@/components/SignalThread';

export const metadata: Metadata = {
  metadataBase: new URL('https://dhruvupadhyay.com'),
  title: 'Dhruv Upadhyay — Full-Stack & Native Mobile Engineer',
  description:
    'Awwwards-calibre portfolio of Dhruv Upadhyay (github.com/dhrux2). Full-stack and native mobile engineer crafting offline-first runtimes, zero-knowledge cryptographic utilities, and tactile editorial web systems.',
  keywords: [
    'Dhruv Upadhyay',
    'Full-Stack Engineer',
    'Native Mobile Engineer',
    'React Native',
    'Next.js',
    'GSAP',
    'TypeScript',
    'Web Crypto',
    'Calumi',
    'Vaultsmith',
    'ZeroCode',
  ],
  authors: [{ name: 'Dhruv Upadhyay', url: 'https://github.com/dhrux2' }],
  openGraph: {
    title: 'Dhruv Upadhyay — Full-Stack & Native Mobile Engineer',
    description:
      'High-performance offline-first mobile runtimes, cryptographic utilities, and editorial web experiences.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Dhruv Upadhyay Portfolio',
    images: [
      {
        url: '/logo/logo.png',
        width: 800,
        height: 800,
        alt: 'Dhruv Upadhyay Monogram',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dhruv Upadhyay — Full-Stack & Native Mobile Engineer',
    description:
      'High-performance offline-first mobile runtimes, cryptographic utilities, and editorial web experiences.',
    images: ['/logo/logo.png'],
  },
  icons: {
    icon: '/logo/logo.png',
    apple: '/logo/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative bg-parchment text-obsidian min-h-screen selection:bg-copper selection:text-white">
        <div className="noise-overlay" aria-hidden="true" />
        <CustomCursor />
        <SmoothScroll>
          <SignalThread />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

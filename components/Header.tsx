'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-6 py-4 md:px-12 md:py-6 flex items-center justify-between backdrop-blur-md bg-parchment/80 border-b border-obsidian/5 transition-all">
      {/* Brand Monogram & Name */}
      <Link
        href="/"
        className="flex items-center gap-3 group"
        data-cursor-text="HOME"
      >
        <div className="relative w-9 h-9 rounded-full overflow-hidden border border-obsidian/20 shadow-sm bg-obsidian transition-transform group-hover:scale-105">
          <Image
            src="/logo/logo.png"
            alt="Dhruv Upadhyay"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="flex flex-col">
          <span className="font-nohemi font-bold text-sm tracking-tight text-obsidian group-hover:text-copper transition-colors">
            Dhruv Upadhyay
          </span>
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate">
            Full-Stack &amp; Mobile
          </span>
        </div>
      </Link>

      {/* Center Status: Availability */}
      <div className="hidden lg:flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-obsidian/10 bg-parchment-light/70 text-xs text-obsidian/80">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="font-mono text-[11px] tracking-wide text-obsidian/75">
          Available for Q2/Q3 2026 Engineering Engagements
        </span>
      </div>

      {/* Navigation Links & Action */}
      <div className="flex items-center gap-8">
        <nav className="hidden md:flex items-center gap-6 text-xs font-mono tracking-wider uppercase text-obsidian/70">
          <button
            onClick={scrollTo('work')}
            className="hover:text-copper transition-colors"
          >
            Work
          </button>
          <button
            onClick={scrollTo('philosophy')}
            className="hover:text-copper transition-colors"
          >
            Principles
          </button>
          <button
            onClick={scrollTo('stack')}
            className="hover:text-copper transition-colors"
          >
            Stack
          </button>
          <button
            onClick={scrollTo('contact')}
            className="hover:text-copper transition-colors"
          >
            Contact
          </button>
        </nav>

        <button
          onClick={scrollTo('contact')}
          className="relative inline-flex items-center justify-center px-4 py-2 text-xs font-mono uppercase tracking-wider text-parchment-light bg-obsidian rounded-full overflow-hidden transition-all duration-300 hover:bg-copper hover:shadow-lg active:scale-95"
          data-cursor-text="CHAT"
        >
          <span>Initiate Contact</span>
        </button>
      </div>
    </header>
  );
}

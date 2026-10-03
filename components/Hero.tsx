'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowDownRight, Github } from 'lucide-react';

gsap.registerPlugin(useGSAP);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero-meta-item', {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        delay: 0.2,
      })
        .from(
          '.hero-title-line',
          {
            y: 60,
            opacity: 0,
            stagger: 0.15,
            duration: 1.1,
          },
          '-=0.5'
        )
        .from(
          '.hero-subtext',
          {
            y: 25,
            opacity: 0,
            duration: 0.9,
          },
          '-=0.6'
        )
        .from(
          actionsRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
          },
          '-=0.5'
        );
    },
    { scope: containerRef }
  );

  const scrollToWork = (e: React.MouseEvent) => {
    e.preventDefault();
    const elem = document.getElementById('work');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] pt-36 pb-20 px-6 md:px-12 flex flex-col justify-between max-w-7xl mx-auto z-10"
    >
      {/* Top Metadata Bar */}
      <div
        ref={metaRef}
        className="flex flex-wrap items-center justify-between gap-4 border-b border-obsidian/10 pb-6 text-xs font-mono uppercase tracking-wider text-slate"
      >
        <div className="hero-meta-item flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-copper"></span>
          <span>New Delhi, India</span>
        </div>
        <div className="hero-meta-item">
          <span>Full-Stack &amp; Native Mobile</span>
        </div>
        <div className="hero-meta-item">
          <span>Production Portfolio 2024 — 2026</span>
        </div>
      </div>

      {/* Main Massive Headline */}
      <div className="my-auto py-12 md:py-16">
        <h1
          ref={headlineRef}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-nohemi font-bold tracking-tight text-obsidian leading-[1.08] max-w-5xl"
        >
          <span className="hero-title-line block">Engineering systems</span>
          <span className="hero-title-line block">
            with <span className="italic-serif text-copper">architectural rigor</span>
          </span>
          <span className="hero-title-line block">
            and tactile nuance.
          </span>
        </h1>

        <p className="hero-subtext mt-8 text-base md:text-xl text-obsidian/75 max-w-2xl font-normal leading-relaxed">
          I craft offline-first native mobile architectures, high-performance web systems, and
          cryptographic utilities where mathematical correctness meets world-class interaction design.
        </p>
      </div>

      {/* Bottom Actions & Quick Spec */}
      <div
        ref={actionsRef}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-8 border-t border-obsidian/10"
      >
        <div className="flex items-center gap-4">
          <button
            onClick={scrollToWork}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-obsidian text-parchment-light font-mono text-xs uppercase tracking-wider hover:bg-copper hover:shadow-xl transition-all duration-300 group"
            data-cursor-text="DISCOVER"
          >
            <span>Explore Curated Projects</span>
            <ArrowDownRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
          </button>

          <a
            href="https://github.com/dhrux2"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-obsidian/20 text-obsidian font-mono text-xs uppercase tracking-wider hover:border-copper hover:text-copper transition-all duration-300"
            data-cursor-text="GITHUB"
          >
            <Github className="w-4 h-4" />
            <span>GitHub Profile</span>
          </a>
        </div>

        <div className="flex items-center gap-8 text-xs font-mono text-slate">
          <div>
            <span className="block font-bold text-obsidian text-sm">3+ Ships</span>
            <span>Flagship Products</span>
          </div>
          <div className="w-[1px] h-8 bg-obsidian/10"></div>
          <div>
            <span className="block font-bold text-obsidian text-sm">&lt; 16ms</span>
            <span>Motion Target</span>
          </div>
          <div className="w-[1px] h-8 bg-obsidian/10"></div>
          <div>
            <span className="block font-bold text-obsidian text-sm">Zero</span>
            <span>Runtime Memory Leaks</span>
          </div>
        </div>
      </div>
    </section>
  );
}

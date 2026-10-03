'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface StackCategory {
  title: string;
  items: { name: string; detail: string }[];
}

const categories: StackCategory[] = [
  {
    title: '01 · Languages',
    items: [
      { name: 'TypeScript', detail: 'Strict Typings & Generics' },
      { name: 'JavaScript', detail: 'ESNext / V8 Runtime' },
      { name: 'Dart', detail: 'Sound Null Safety' },
      { name: 'Kotlin', detail: 'Android Native Primitives' },
    ],
  },
  {
    title: '02 · Web Systems',
    items: [
      { name: 'React & Next.js', detail: 'App Router / SSR & RSC' },
      { name: 'Tailwind CSS', detail: 'Utility Token Systems' },
      { name: 'Zustand', detail: 'Hydration & Global Store' },
      { name: 'Web Crypto API', detail: 'Client Cryptographic Primitives' },
    ],
  },
  {
    title: '03 · Native Mobile',
    items: [
      { name: 'React Native', detail: 'Architecture 0.86 & TurboModules' },
      { name: 'Expo SDK', detail: 'SDK 57 Runtime & Native Configs' },
      { name: 'Flutter', detail: 'Cross-Platform Canvas Runtimes' },
      { name: 'Reanimated 4', detail: 'UI-Thread Gesture Choreography' },
    ],
  },
  {
    title: '04 · Motion & Backend',
    items: [
      { name: 'GSAP & ScrollTrigger', detail: 'Awwwards Motion Physics' },
      { name: 'Lenis', detail: 'Kinetic Momentum Scrolling' },
      { name: 'SQLite & Prisma', detail: 'Edge & Embedded Persistence' },
      { name: 'Stripe & Supabase', detail: 'Server-Authoritative Sessions' },
    ],
  },
];

export default function TechStack() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from('.stack-category-card', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.85,
        ease: 'power3.out',
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="stack"
      ref={containerRef}
      className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto z-10"
    >
      <div className="mb-16">
        <span className="font-mono text-xs uppercase tracking-widest text-copper block mb-3">
          Technical Competencies
        </span>
        <h2 className="text-3xl sm:text-5xl font-nohemi font-bold text-obsidian tracking-tight">
          Languages, runtimes, and <span className="italic-serif">creative tooling.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.title}
            className="stack-category-card p-6 rounded-2xl bg-parchment-light/80 border border-obsidian/10 hover:border-copper/40 transition-all duration-300 hover:shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="font-mono text-xs font-semibold text-copper tracking-wider uppercase mb-6 pb-3 border-b border-obsidian/10">
                {cat.title}
              </div>

              <ul className="flex flex-col gap-4">
                {cat.items.map((item) => (
                  <li key={item.name} className="flex flex-col">
                    <span className="font-nohemi font-bold text-sm text-obsidian">
                      {item.name}
                    </span>
                    <span className="font-mono text-[11px] text-slate">
                      {item.detail}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-obsidian/5 flex items-center justify-between text-[10px] font-mono text-slate">
              <span>Verified Experience</span>
              <span className="w-1.5 h-1.5 rounded-full bg-copper/60"></span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

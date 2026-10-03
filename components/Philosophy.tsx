'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Cpu, Zap, Compass } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from('.philosophy-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.9,
        ease: 'power3.out',
      });
    },
    { scope: sectionRef }
  );

  const tenets = [
    {
      index: '01 · Substrate Independence',
      title: 'Resilient Across Runtimes',
      icon: Cpu,
      description:
        'Software built to transcend ephemeral environments—from React Native and Expo threads to edge-rendered Next.js and client-side cryptographic primitives.',
    },
    {
      index: '02 · Zero-Latency Intuition',
      title: '60fps Tactile Feedback',
      icon: Zap,
      description:
        'Optimistic updates, zero layout shift (CLS 0.00), and fluid spring physics. When an interface reacts at the frequency of human thought, software becomes an extension of mind.',
    },
    {
      index: '03 · Aesthetic Rigor',
      title: 'Form as Code Integrity',
      icon: Compass,
      description:
        'Visual beauty is not an afterthought; it is evidence of engineering hygiene. Strict typographic hierarchies, calibrated contrast, and intentional white space elevate utilities into artefacts.',
    },
  ];

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto z-10"
    >
      <div className="mb-16">
        <span className="font-mono text-xs uppercase tracking-widest text-copper block mb-3">
          Engineering Tenets
        </span>
        <h2 className="text-3xl sm:text-5xl font-nohemi font-bold text-obsidian tracking-tight max-w-2xl">
          Principles that guide every <span className="italic-serif">line &amp; pixel.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tenets.map((t) => {
          const Icon = t.icon;
          return (
            <div
              key={t.index}
              className="philosophy-card p-8 rounded-2xl bg-parchment-light/80 border border-obsidian/10 hover:border-copper/40 transition-all duration-300 hover:shadow-lg group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono text-xs tracking-wider text-slate uppercase">
                    {t.index}
                  </span>
                  <div className="w-9 h-9 rounded-full bg-parchment border border-obsidian/10 flex items-center justify-center text-obsidian group-hover:text-copper group-hover:scale-110 transition-all">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-xl font-nohemi font-bold text-obsidian mb-4 group-hover:text-copper transition-colors">
                  {t.title}
                </h3>
                <p className="text-sm text-obsidian/75 leading-relaxed font-normal">
                  {t.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-obsidian/5 flex items-center gap-2 text-[11px] font-mono text-slate">
                <span className="w-1.5 h-1.5 rounded-full bg-sage"></span>
                <span>Production Standard</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

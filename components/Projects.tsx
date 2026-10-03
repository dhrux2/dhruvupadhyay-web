'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ExternalLink, Github, ArrowRight, ShieldCheck, Smartphone, ShoppingBag } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Project {
  id: string;
  year: string;
  category: string;
  title: string;
  tagline: string;
  stack: string[];
  image: string;
  isMobileFrame?: boolean;
  liveUrl?: string;
  repoUrl?: string;
  statusBadge?: string;
  icon: any;
}

const projects: Project[] = [
  {
    id: 'calumi',
    year: '2026',
    category: 'Mobile Engineering & Computer Vision',
    title: 'Calumi',
    tagline:
      'Offline-first AI calorie & macro tracker specifically engineered for regional Indian cuisine with on-device SQLite storage and computer vision portion estimation.',
    stack: ['Expo SDK 57', 'React Native 0.86', 'Reanimated 4', 'SQLite', 'TypeScript', 'Supabase'],
    image: '/projects-screenshots/calumi/calumi-showcase-01-dashboard.jpeg',
    isMobileFrame: true,
    statusBadge: 'Private Beta',
    icon: Smartphone,
  },
  {
    id: 'vaultsmith',
    year: '2026',
    category: 'Cryptographic Utility & Web Engineering',
    title: 'Vaultsmith',
    tagline:
      'Honest password & passphrase generator with exact inclusion-exclusion entropy math and zero-knowledge execution in Web Crypto API.',
    stack: ['Next.js', 'TypeScript Strict', 'Web Crypto API', 'Tailwind CSS', 'Framer Motion'],
    image: '/projects-screenshots/vaultsmith/vaultsmith-showcase-01-forge-password-light.png',
    liveUrl: 'https://vaultsmith.vercel.app',
    repoUrl: 'https://github.com/dhrux2/vaultsmith',
    icon: ShieldCheck,
  },
  {
    id: 'zerocode',
    year: '2026',
    category: 'Full-Stack E-Commerce & Creative Engineering',
    title: 'ZeroCode',
    tagline:
      'High-fashion luxury e-commerce platform engineered with bespoke CSS Grid systems, zero layout shifts, and server-authoritative Stripe checkout.',
    stack: ['Next.js 14', 'TypeScript Strict', 'Zustand', 'Prisma', 'Stripe', 'GSAP'],
    image: '/projects-screenshots/zerocode/zerocode-showcase-01-hero.png',
    liveUrl: 'https://fullstack-ecommerce-zerocode.vercel.app',
    repoUrl: 'https://github.com/dhrux2/fullstack-ecommerce-zerocode',
    icon: ShoppingBag,
  },
];

export default function Projects() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const projectItems = gsap.utils.toArray<HTMLElement>('.project-showcase-item');

      projectItems.forEach((item) => {
        const media = item.querySelector('.project-media-inner');
        const content = item.querySelector('.project-content-inner');

        gsap.from(content, {
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
        });

        if (media) {
          gsap.from(media, {
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
            scale: 0.95,
            opacity: 0,
            duration: 1.1,
            ease: 'power3.out',
          });

          // Parallax effect on image container
          gsap.to(media, {
            scrollTrigger: {
              trigger: item,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            },
            y: -30,
            ease: 'none',
          });
        }
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="work"
      ref={containerRef}
      className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto z-10"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20 border-b border-obsidian/10 pb-10">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-copper block mb-3">
            Selected Works
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-nohemi font-bold text-obsidian tracking-tight">
            Flagship Engineering <span className="italic-serif">&amp; Systems</span>
          </h2>
        </div>
        <div className="text-xs font-mono text-slate uppercase tracking-wider">
          <span>01 — 03 · Selected Deployments</span>
        </div>
      </div>

      {/* Projects Stack */}
      <div className="flex flex-col gap-24 md:gap-36">
        {projects.map((proj, idx) => {
          const Icon = proj.icon;
          return (
            <article
              key={proj.id}
              className="project-showcase-item grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
              data-cursor-text={proj.id.toUpperCase()}
            >
              {/* Project Metadata & Content */}
              <div className="project-content-inner lg:col-span-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-copper/10 text-copper font-mono text-xs font-semibold">
                      {proj.year}
                    </span>
                    <span className="text-xs font-mono tracking-wider text-slate uppercase">
                      {proj.category}
                    </span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-nohemi font-bold text-obsidian mb-5 flex items-center gap-3">
                    <span>{proj.title}</span>
                    <Icon className="w-6 h-6 text-copper/60" />
                  </h3>

                  <p className="text-base text-obsidian/80 leading-relaxed font-normal mb-8">
                    {proj.tagline}
                  </p>

                  {/* Stack Badges */}
                  <div className="flex flex-wrap gap-2 mb-10">
                    {proj.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-mono rounded-md bg-parchment-light border border-obsidian/10 text-obsidian/80"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Links / Actions */}
                <div className="flex items-center gap-4 pt-4 border-t border-obsidian/10">
                  {proj.statusBadge ? (
                    <span className="px-4 py-2 rounded-full border border-obsidian/15 text-xs font-mono text-slate">
                      {proj.statusBadge}
                    </span>
                  ) : null}

                  {proj.liveUrl ? (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-obsidian text-parchment-light font-mono text-xs uppercase tracking-wider hover:bg-copper hover:shadow-lg transition-all"
                      data-cursor-text="VISIT"
                    >
                      <span>Live App</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : null}

                  {proj.repoUrl ? (
                    <a
                      href={proj.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-obsidian/20 text-obsidian font-mono text-xs uppercase tracking-wider hover:border-copper hover:text-copper transition-all"
                      data-cursor-text="CODE"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Source Code</span>
                    </a>
                  ) : null}
                </div>
              </div>

              {/* Project Media Mockup Frame */}
              <div className="project-media-inner lg:col-span-7 relative">
                <div
                  className={`relative rounded-2xl overflow-hidden shadow-2xl border border-obsidian/15 bg-obsidian/5 group transition-transform duration-500 hover:scale-[1.01] ${
                    proj.isMobileFrame ? 'max-w-md mx-auto aspect-[9/16] p-3 bg-obsidian/90' : 'aspect-[16/10]'
                  }`}
                >
                  <div className="relative w-full h-full rounded-xl overflow-hidden bg-parchment-light">
                    <Image
                      src={proj.image}
                      alt={`${proj.title} Interface Showcase`}
                      fill
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

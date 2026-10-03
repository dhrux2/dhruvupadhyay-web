'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Copy, Check, ArrowUpRight, Clock } from 'lucide-react';

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const [istTime, setIstTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setIstTime(new Intl.DateTimeFormat('en-GB', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText('dhruvupadhyay1001@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="contact"
      className="relative bg-obsidian text-parchment-light pt-24 pb-12 px-6 md:px-12 mt-20 border-t border-obsidian-border"
    >
      <div className="max-w-7xl mx-auto">
        {/* Brand & Lead */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20 pb-16 border-b border-obsidian-border">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/20 bg-black">
                <Image
                  src="/logo/logo.png"
                  alt="Dhruv Upadhyay"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-nohemi font-bold text-base text-white">
                  Dhruv Upadhyay
                </span>
                <span className="font-mono text-xs text-slate-muted">
                  Full-Stack &amp; Native Mobile Engineer
                </span>
              </div>
            </div>

            <div className="font-mono text-xs uppercase tracking-widest text-copper mb-4">
              Direct Collaboration
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-nohemi font-bold tracking-tight text-white max-w-3xl leading-[1.05]">
              Let’s engineer something <span className="italic-serif text-copper">extraordinary.</span>
            </h2>
          </div>

          {/* Copy Email Card */}
          <div className="flex flex-col gap-4">
            <button
              onClick={copyEmail}
              className="group flex items-center justify-between gap-6 px-6 py-4 rounded-xl bg-obsidian-card border border-obsidian-border hover:border-copper transition-all duration-300 shadow-xl"
              data-cursor-text="COPY"
            >
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-muted">
                  Click to Copy Primary Email
                </span>
                <span className="font-mono text-sm sm:text-base text-white font-semibold group-hover:text-copper transition-colors">
                  dhruvupadhyay1001@gmail.com
                </span>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/80 group-hover:bg-copper group-hover:text-white transition-all">
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </div>
            </button>
            {copied && (
              <span className="font-mono text-xs text-emerald-400 text-center animate-fade-in">
                Email copied to clipboard!
              </span>
            )}
          </div>
        </div>

        {/* Footer Meta Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-10 border-b border-obsidian-border text-xs font-mono">
          <div>
            <span className="text-slate-muted block mb-2 uppercase tracking-wider">
              Local Coordinates
            </span>
            <span className="text-white font-semibold">New Delhi, India</span>
          </div>

          <div>
            <span className="text-slate-muted block mb-2 uppercase tracking-wider">
              Current Time (IST)
            </span>
            <div className="flex items-center gap-2 text-white font-semibold">
              <Clock className="w-3.5 h-3.5 text-copper" />
              <span>{istTime || 'Loading IST...'}</span>
            </div>
          </div>

          <div>
            <span className="text-slate-muted block mb-2 uppercase tracking-wider">
              Engineering Focus
            </span>
            <span className="text-white font-semibold">Native Mobile, Web Systems &amp; Crypto</span>
          </div>

          <div>
            <span className="text-slate-muted block mb-2 uppercase tracking-wider">
              Network Links
            </span>
            <div className="flex flex-col gap-2">
              <a
                href="https://github.com/dhrux2"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-copper transition-colors inline-flex items-center gap-1"
                data-cursor-text="VISIT"
              >
                <span>GitHub Profile</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
              <a
                href="https://vaultsmith.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-copper transition-colors inline-flex items-center gap-1"
                data-cursor-text="VISIT"
              >
                <span>Vaultsmith App</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
              <a
                href="https://fullstack-ecommerce-zerocode.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-copper transition-colors inline-flex items-center gap-1"
                data-cursor-text="VISIT"
              >
                <span>ZeroCode App</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-[11px] font-mono text-slate-muted">
          <div>
            © 2026 Dhruv Upadhyay. Engineered with Next.js, GSAP &amp; Lenis.
          </div>
          <button
            onClick={scrollToTop}
            className="hover:text-copper transition-colors uppercase tracking-wider"
          >
            Back to Top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}

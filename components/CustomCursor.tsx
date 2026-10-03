'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [hasPointer, setHasPointer] = useState(false);

  useEffect(() => {
    // Only enable on pointer/fine devices (desktops/laptops with mouse/trackpad)
    if (!window.matchMedia('(pointer: fine)').matches) return;
    setHasPointer(true);

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let prevX = mouseX;
    let prevY = mouseY;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.to(dot, {
        x: mouseX,
        y: mouseY,
        duration: 0.08,
        ease: 'power2.out',
      });
    };

    const updateRing = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;

      const vx = ringX - prevX;
      const vy = ringY - prevY;
      const speed = Math.sqrt(vx * vx + vy * vy);
      const angle = Math.atan2(vy, vx) * (180 / Math.PI);
      const stretch = Math.min(speed * 0.025, 0.45);

      gsap.set(ring, {
        x: ringX,
        y: ringY,
        scaleX: 1 + stretch,
        scaleY: 1 - stretch * 0.5,
        rotation: angle,
      });

      prevX = ringX;
      prevY = ringY;
    };

    gsap.ticker.add(updateRing);
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Handle interactive hover targets
    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-cursor-text], a, button');
      if (target) {
        const text = target.getAttribute('data-cursor-text');
        if (text) {
          label.textContent = text;
          gsap.to(label, { opacity: 1, scale: 1, duration: 0.25, ease: 'power2.out' });
          gsap.to(ring, {
            width: 80,
            height: 80,
            backgroundColor: 'rgba(200, 109, 81, 0.95)',
            borderColor: 'transparent',
            duration: 0.3,
            ease: 'power3.out',
          });
          gsap.to(dot, { opacity: 0, duration: 0.2 });
        } else {
          gsap.to(ring, {
            scale: 1.6,
            borderColor: 'rgba(200, 109, 81, 0.8)',
            backgroundColor: 'rgba(200, 109, 81, 0.08)',
            duration: 0.25,
          });
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-cursor-text], a, button');
      if (target) {
        gsap.to(label, { opacity: 0, scale: 0.5, duration: 0.2 });
        gsap.to(ring, {
          width: 36,
          height: 36,
          scale: 1,
          scaleX: 1,
          scaleY: 1,
          backgroundColor: 'transparent',
          borderColor: 'rgba(14, 18, 25, 0.35)',
          duration: 0.3,
          ease: 'power3.out',
        });
        gsap.to(dot, { opacity: 1, duration: 0.2 });
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      gsap.ticker.remove(updateRing);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  if (!hasPointer) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-copper z-[1000] will-change-transform"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 -ml-[18px] -mt-[18px] w-9 h-9 rounded-full border border-obsidian/30 z-[999] flex items-center justify-center will-change-transform transition-colors"
      >
        <span
          ref={labelRef}
          className="text-[10px] font-mono font-bold tracking-widest text-white uppercase opacity-0 scale-50 pointer-events-none select-none"
        />
      </div>
    </>
  );
}

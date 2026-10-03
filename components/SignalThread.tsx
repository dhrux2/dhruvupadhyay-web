'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SignalThread() {
  const pathRef = useRef<SVGPathElement>(null);
  const glowRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    const glow = glowRef.current;
    const svg = svgRef.current;
    if (!path || !glow || !svg) return;

    const updatePath = () => {
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      );
      const w = window.innerWidth;
      
      svg.setAttribute('height', `${docHeight}`);
      svg.setAttribute('viewBox', `0 0 ${w} ${docHeight}`);

      // Generate continuous fluid cubic Bezier curve spanning the full page height
      const mid = w / 2;
      const d = `
        M ${mid} 120
        C ${mid + 140} ${docHeight * 0.15}, ${mid - 200} ${docHeight * 0.3}, ${mid} ${docHeight * 0.45}
        C ${mid + 240} ${docHeight * 0.6}, ${mid - 160} ${docHeight * 0.75}, ${mid} ${docHeight - 150}
      `;
      path.setAttribute('d', d);
      glow.setAttribute('d', d);

      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
      glow.style.strokeDasharray = `${length}`;
      glow.style.strokeDashoffset = `${length}`;

      return length;
    };

    const len = updatePath();

    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.2,
      onUpdate: (self) => {
        const offset = len * (1 - self.progress);
        if (path) path.style.strokeDashoffset = `${offset}`;
        if (glow) glow.style.strokeDashoffset = `${offset}`;
      },
    });

    const handleResize = () => {
      updatePath();
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      trigger.kill();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full pointer-events-none z-[1] overflow-hidden opacity-60">
      <svg
        ref={svgRef}
        className="w-full will-change-transform"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          ref={glowRef}
          stroke="#C86D51"
          strokeWidth="6"
          strokeOpacity="0.15"
          strokeLinecap="round"
          filter="blur(4px)"
        />
        <path
          ref={pathRef}
          stroke="#C86D51"
          strokeWidth="1.5"
          strokeOpacity="0.45"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

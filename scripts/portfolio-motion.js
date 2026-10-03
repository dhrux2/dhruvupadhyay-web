/**
 * DHRUV UPADHYAY — PORTFOLIO SIGNATURE MOTION ENGINE
 * Architecture: Lenis Smooth Scroll + GSAP ScrollTrigger + Signal Thread Physics + Fluid Magnetic Cursor
 */

(function () {
  'use strict';

  // Wait for DOM
  window.addEventListener('DOMContentLoaded', initPortfolioEngine);

  function initPortfolioEngine() {
    initLenisScroll();
    initCustomCursor();
    initSignalThread();
    initThemeChoreography();
    initHeroAnimations();
    initWorkCardTransitions();
    initInteractiveUtilities();
  }

  /* -------------------------------------------------------------
   * 1. LENIS SMOOTH SCROLL INTEGRATION
   * ------------------------------------------------------------- */
  let lenisInstance = null;

  function initLenisScroll() {
    if (typeof Lenis === 'undefined') {
      console.warn('Lenis not detected on window. Falling back to native scrolling.');
      return;
    }

    lenisInstance = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      
      // Update ScrollTrigger on every Lenis scroll tick
      lenisInstance.on('scroll', ScrollTrigger.update);

      // Hook Lenis into GSAP Ticker
      gsap.ticker.add((time) => {
        lenisInstance.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);
    } else {
      function raf(time) {
        lenisInstance.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }
  }

  /* -------------------------------------------------------------
   * 2. FLUID MAGNETIC CURSOR WITH VELOCITY DISTORTION
   * ------------------------------------------------------------- */
  function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const badge = document.querySelector('.custom-cursor-badge');
    if (!cursor) return;

    let mouseX = -100;
    let mouseY = -100;
    let cursorX = -100;
    let cursorY = -100;
    let prevX = 0;
    let prevY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function renderCursor() {
      // Linear interpolation
      cursorX += (mouseX - cursorX) * 0.18;
      cursorY += (mouseY - cursorY) * 0.18;

      // Calculate instantaneous velocity for organic stretch
      const vx = mouseX - prevX;
      const vy = mouseY - prevY;
      const speed = Math.sqrt(vx * vx + vy * vy);
      const angle = Math.atan2(vy, vx) * (180 / Math.PI);
      const stretch = Math.min(speed * 0.015, 0.45);

      prevX = mouseX;
      prevY = mouseY;

      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%) rotate(${angle}deg) scale(${1 + stretch}, ${1 - stretch * 0.5})`;

      requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    // Hover Target States
    const hoverTargets = document.querySelectorAll('a, button, [data-cursor], .project-item, .philosophy-card');
    hoverTargets.forEach((target) => {
      target.addEventListener('mouseenter', () => {
        cursor.classList.add('is-hovering');
        const customText = target.getAttribute('data-cursor-text') || 'EXPLORE';
        if (badge) badge.textContent = customText;
      });

      target.addEventListener('mouseleave', () => {
        cursor.classList.remove('is-hovering');
        if (badge) badge.textContent = '';
      });
    });
  }

  /* -------------------------------------------------------------
   * 3. THE SIGNAL THREAD (DYNAMIC SVG SPLINE & PHYSICS)
   * ------------------------------------------------------------- */
  function initSignalThread() {
    const threadPath = document.querySelector('.signal-thread-path');
    if (!threadPath) return;

    const waypoints = [
      { x: 0.15, y: 0.12 },
      { x: 0.85, y: 0.35 },
      { x: 0.25, y: 0.55 },
      { x: 0.78, y: 0.75 },
      { x: 0.50, y: 0.95 },
    ];

    function updateThreadSpline() {
      const w = window.innerWidth;
      const h = window.innerHeight;

      const pts = waypoints.map((p) => ({
        x: p.x * w,
        y: p.y * h,
      }));

      // Generate cubic Bézier spline string
      let d = `M ${pts[0].x} ${pts[0].y}`;
      for (let i = 0; i < pts.length - 1; i++) {
        const cp1x = pts[i].x + (pts[i + 1].x - pts[i].x) * 0.5;
        const cp1y = pts[i].y;
        const cp2x = pts[i].x + (pts[i + 1].x - pts[i].x) * 0.5;
        const cp2y = pts[i + 1].y;
        d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${pts[i + 1].x} ${pts[i + 1].y}`;
      }

      threadPath.setAttribute('d', d);
    }

    updateThreadSpline();
    window.addEventListener('resize', updateThreadSpline);

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      const pathLength = threadPath.getTotalLength ? threadPath.getTotalLength() : 2500;
      threadPath.style.strokeDasharray = `${pathLength}`;
      threadPath.style.strokeDashoffset = `${pathLength}`;

      gsap.to(threadPath, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
        },
      });
    }
  }

  /* -------------------------------------------------------------
   * 4. SCROLL-DRIVEN ALTERNATING THEME CHOREOGRAPHY
   * ------------------------------------------------------------- */
  function initThemeChoreography() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const sectionsWithThemes = [
      { selector: '.section-hero', theme: 'light' },
      { selector: '.section-philosophy', theme: 'light' },
      { selector: '.section-work', theme: 'dark' },
      { selector: '.section-stack', theme: 'light' },
      { selector: '.section-footer', theme: 'dark' },
    ];

    sectionsWithThemes.forEach(({ selector, theme }) => {
      const section = document.querySelector(selector);
      if (!section) return;

      ScrollTrigger.create({
        trigger: section,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => applyTheme(theme),
        onEnterBack: () => applyTheme(theme),
      });
    });

    function applyTheme(theme) {
      if (theme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
      } else {
        document.body.removeAttribute('data-theme');
      }
    }
  }

  /* -------------------------------------------------------------
   * 5. HERO ENTRANCE CHOREOGRAPHY
   * ------------------------------------------------------------- */
  function initHeroAnimations() {
    if (typeof gsap === 'undefined') return;

    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.4 } });

    tl.from('.hero-meta-strip', {
      opacity: 0,
      y: -20,
      duration: 1.0,
      delay: 0.2,
    })
      .from(
        '.hero-headline span',
        {
          opacity: 0,
          y: 70,
          stagger: 0.12,
          duration: 1.6,
        },
        '-=0.7'
      )
      .from(
        '.hero-bio-lead',
        {
          opacity: 0,
          y: 30,
          duration: 1.2,
        },
        '-=1.1'
      )
      .from(
        '.substrate-capsule',
        {
          opacity: 0,
          y: 20,
          stagger: 0.08,
          duration: 1.0,
        },
        '-=1.0'
      );
  }

  /* -------------------------------------------------------------
   * 6. WORK CARD DECK ANIMATION WITH DEPTH SKEW
   * ------------------------------------------------------------- */
  function initWorkCardTransitions() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const projectItems = gsap.utils.toArray('.project-item');

    projectItems.forEach((item, index) => {
      gsap.from(item, {
        opacity: 0.2,
        y: 80,
        scale: 0.96,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          end: 'top 45%',
          scrub: 0.8,
        },
      });
    });
  }

  /* -------------------------------------------------------------
   * 7. INTERACTIVE UTILITIES (CLICK-TO-COPY & IST CLOCK)
   * ------------------------------------------------------------- */
  function initInteractiveUtilities() {
    // Copy email with feedback
    const emailPill = document.querySelector('.email-copy-pill');
    if (emailPill) {
      emailPill.addEventListener('click', () => {
        const email = 'dhruv@dhruvupadhyay.com';
        navigator.clipboard.writeText(email).then(() => {
          const indicator = emailPill.querySelector('.copy-indicator');
          if (indicator) {
            const originalText = indicator.textContent;
            indicator.textContent = 'COPIED TO CLIPBOARD';
            indicator.style.backgroundColor = 'rgba(46, 204, 113, 0.25)';
            indicator.style.color = '#2ECC71';

            setTimeout(() => {
              indicator.textContent = originalText;
              indicator.style.backgroundColor = '';
              indicator.style.color = '';
            }, 2500);
          }
        });
      });
    }

    // Live Clock (IST)
    const clockEl = document.querySelector('[data-live-clock]');
    if (clockEl) {
      function updateClock() {
        const now = new Date();
        const istTime = now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        });
        clockEl.textContent = `IST ${istTime} (GMT+5:30)`;
      }
      updateClock();
      setInterval(updateClock, 1000);
    }
  }
})();

// ── useScrollSequence ──────────────────────────────────────────────────────────
// GSAP ScrollTrigger pin + scrub timeline for the 5-act hero scroll sequence.
// Uses @gsap/react's useGSAP for proper context cleanup on unmount.
//
// Total timeline duration: 10 units (arbitrary, mapped to scroll progress).
//
// Act 1 — 0.0 → 1.5   fire line draws left-to-right
// Act 2 — 1.4 → 3.0   ghost CUBICO wordmark erupts from the line
// Act 3 — 2.8 → 5.5   full-viewport image wipes in via clip-path; Ken Burns
// Act 4 — 5.2 → 8.2   ghost word fades; per-char headline enters
// Act 5 — 7.8 → 10.0  dark overlay, stats bar, right panel, eyebrow all land

import type { RefObject } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

export function useScrollSequence(containerRef: RefObject<HTMLElement>) {
  useGSAP(
    () => {
      // ── Reduced motion: skip animation, show complete hero ─────────────────
      const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;

      if (prefersReduced) {
        gsap.set(['.act1-line', '.act2-word', '.hero-eyebrow'], {
          opacity: 1,
          scaleX: 1,
          scaleY: 1,
          x: 0,
          y: 0,
        });
        gsap.set('.act3-image', { clipPath: 'inset(0% 0 0% 0)' });
        gsap.set('.act3-image-inner', { scale: 1 });
        gsap.set('.act5-stats', { y: '0%' });
        gsap.set(['.act5-right', '.hero-overlay'], { opacity: 1, x: 0 });
        gsap.set('.act4-headline-line', { opacity: 1, y: 0 });
        // Count up all stats immediately
        gsap.utils.toArray<HTMLElement>('.stat-count').forEach((el) => {
          const target = Number(el.dataset.target ?? 0);
          el.textContent = String(target);
        });
        return;
      }

      // ── Set initial states before first paint (useGSAP ~ useLayoutEffect) ──
      gsap.set('.act1-line', { scaleX: 0 });
      gsap.set('.act2-word', { scaleY: 0 });
      gsap.set('.act3-image', { clipPath: 'inset(48% 0 48% 0)' });
      gsap.set('.act3-image-inner', { scale: 1.15 });
      gsap.set('.act4-headline-line', { opacity: 0 });
      gsap.set('.hero-overlay', { opacity: 0 });
      gsap.set('.act5-stats', { y: '100%' });
      gsap.set('.act5-right', { x: 60, opacity: 0 });
      gsap.set('.hero-eyebrow', { x: -30, opacity: 0 });

      // ── Master timeline (paused — scrubbed by ScrollTrigger) ───────────────
      const tl = gsap.timeline({ paused: true });

      // ACT 1 — Fire line draws left-to-right (0 → 1.5)
      tl.fromTo(
        '.act1-line',
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, ease: 'none', duration: 1.5 },
        0,
      );

      // ACT 2 — Ghost wordmark erupts from the line (1.4 → 3.0)
      tl.fromTo(
        '.act2-word',
        { scaleY: 0, transformOrigin: 'center center' },
        { scaleY: 1, ease: 'power3.out', duration: 1.6 },
        1.4,
      );

      // ACT 3 — Clip-path image wipe + Ken Burns (2.8 → 5.5)
      tl.fromTo(
        '.act3-image',
        { clipPath: 'inset(48% 0 48% 0)' },
        { clipPath: 'inset(0% 0 0% 0)', ease: 'power2.inOut', duration: 2.7 },
        2.8,
      );
      tl.fromTo(
        '.act3-image-inner',
        { scale: 1.15 },
        { scale: 1.0, ease: 'none', duration: 2.7 },
        2.8,
      );
      // Ghost word transitions to mix-blend overlay on the image
      tl.to('.act2-word', { opacity: 0.35, duration: 1.0 }, 3.2);

      // ACT 4 — Ghost word exits; per-character headline enters (5.2 → 8.2)
      tl.to('.act2-word', { opacity: 0, duration: 0.6 }, 5.0);

      // SplitText — one instance per line for staggered line entry
      const lineEls = gsap.utils.toArray<HTMLElement>('.act4-headline-line');
      lineEls.forEach((el, i) => {
        // Clear any previous split before applying (handles HMR / resize)
        const split = new SplitText(el, { type: 'chars' });
        tl.from(
          split.chars,
          {
            y: 80,
            opacity: 0,
            stagger: { each: 0.025, from: 'start' },
            ease: 'power3.out',
            duration: 0.9,
          },
          5.4 + i * 0.52,
        );
      });

      // ACT 5 — Full reveal (7.8 → 10.0)
      // Dim overlay settles over image
      tl.fromTo(
        '.hero-overlay',
        { opacity: 0 },
        { opacity: 1, ease: 'power1.inOut', duration: 1.2 },
        7.8,
      );
      // Stats bar rises from bottom
      tl.fromTo(
        '.act5-stats',
        { y: '100%' },
        { y: '0%', ease: 'power3.out', duration: 1.0 },
        7.8,
      );
      // Right content slides in from right
      tl.fromTo(
        '.act5-right',
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, ease: 'power3.out', duration: 1.0 },
        8.0,
      );
      // Eyebrow slides in from left
      tl.fromTo(
        '.hero-eyebrow',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, ease: 'power3.out', duration: 0.8 },
        8.2,
      );

      // Stat counters count up via proxy (scrub-safe)
      gsap.utils.toArray<HTMLElement>('.stat-count').forEach((el) => {
        const target = Number(el.dataset.target ?? 0);
        const proxy = { n: 0 };
        tl.to(
          proxy,
          {
            n: target,
            snap: { n: 1 },
            ease: 'power2.out',
            duration: 1.4,
            onUpdate() {
              el.textContent = String(proxy.n);
            },
          },
          8.2,
        );
      });

      // ── ScrollTrigger: pin + scrub ─────────────────────────────────────────
      ScrollTrigger.create({
        trigger: '.hero-outer',
        start: 'top top',
        end: 'bottom bottom',
        pin: '.hero-pin',
        animation: tl,
        scrub: 1.2,
      });

      // GSAP ScrollTrigger nav: transparent → glass on first scroll
      gsap.to('nav', {
        backgroundColor: 'rgba(5,5,5,0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid #1d1d1d',
        duration: 0.4,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: 'body',
          start: '12px top',
          toggleActions: 'play none none reverse',
        },
      });

      // Refresh after fonts complete loading (fixes SplitText char widths)
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });

      // Re-split on resize so character positions stay correct
      const resizeObserver = new ResizeObserver(() => {
        ScrollTrigger.refresh();
      });
      if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
      }

      return () => {
        resizeObserver.disconnect();
      };
    },
    { scope: containerRef },
  );
}

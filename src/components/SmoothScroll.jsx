import Lenis from 'lenis';
import { useEffect } from 'react';

function SmoothScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return undefined;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    const lenis = new Lenis({
      duration: isMobile ? 0.78 : 1.12,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothTouch: true,
      smoothWheel: true,
      syncTouch: isMobile,
      touchMultiplier: isMobile ? 0.9 : 1,
      wheelMultiplier: isMobile ? 0.72 : 0.88,
    });

    let frameId;
    const raf = (time) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    };

    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);

  return null;
}

export default SmoothScroll;

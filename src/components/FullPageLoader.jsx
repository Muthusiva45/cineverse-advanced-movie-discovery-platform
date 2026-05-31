import gsap from 'gsap';
import { useEffect, useRef } from 'react';

function FullPageLoader({ onComplete }) {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete,
      });

      timeline
        .fromTo('.loader-panel', { yPercent: 100 }, { yPercent: 0, duration: 0.7, stagger: 0.08 })
        .fromTo(
          '.loader-logo span',
          { autoAlpha: 0, y: 42, rotateX: -75, filter: 'blur(12px)' },
          { autoAlpha: 1, y: 0, rotateX: 0, filter: 'blur(0px)', duration: 0.8, stagger: 0.045 },
          '-=0.35',
        )
        .fromTo('.loader-line', { scaleX: 0 }, { scaleX: 1, duration: 1.1, transformOrigin: 'left center' }, '-=0.45')
        .fromTo('.loader-meta', { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.55 }, '-=0.55')
        .to('.loader-logo span', { y: -28, autoAlpha: 0, duration: 0.42, stagger: 0.025, ease: 'power2.in' }, '+=0.45')
        .to('.loader-meta', { autoAlpha: 0, y: -10, duration: 0.3 }, '<')
        .to('.loader-panel', { yPercent: -100, duration: 0.72, stagger: 0.07, ease: 'power4.inOut' }, '-=0.05')
        .to(ref.current, { autoAlpha: 0, duration: 0.18 }, '-=0.2');
    }, ref);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[120] overflow-hidden bg-cinema-black text-white"
      ref={ref}
      role="status"
      aria-label="Loading CineVerse"
    >
      <div className="absolute inset-0 grid grid-cols-4">
        {[0, 1, 2, 3].map((panel) => (
          <div className="loader-panel bg-cinema-black" key={panel}>
            <div className="h-full w-full border-r border-white/10 bg-[radial-gradient(circle_at_50%_20%,rgba(229,9,20,0.22),transparent_24rem)]" />
          </div>
        ))}
      </div>
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <p className="loader-meta mb-5 text-xs font-bold uppercase tracking-[0.42em] text-cinema-muted">
          Premium discovery interface
        </p>
        <h1 className="loader-logo text-5xl font-black tracking-tight sm:text-7xl md:text-8xl">
          {'CineVerse'.split('').map((letter, index) => (
            <span className="inline-block origin-bottom" key={`${letter}-${index}`}>
              {letter}
            </span>
          ))}
        </h1>
        <div className="mt-8 h-1 w-full max-w-sm overflow-hidden rounded-full bg-white/10">
          <div className="loader-line h-full w-full rounded-full bg-cinema-red shadow-glow" />
        </div>
        <p className="loader-meta mt-5 text-sm font-semibold text-zinc-300">
          Loading films, favorites, and your local library
        </p>
      </div>
    </div>
  );
}

export default FullPageLoader;

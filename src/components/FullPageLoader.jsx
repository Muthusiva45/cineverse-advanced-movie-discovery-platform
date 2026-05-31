import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';

function FullPageLoader({ onComplete }) {
  const ref = useRef(null);
  const counterRef = useRef({ value: 0 });
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: 'power4.out' },
        onComplete,
      });

      timeline
        .set('.preloader-shell', { clipPath: 'inset(0% 0% 0% 0%)' })
        .fromTo('.preloader-logo', { autoAlpha: 0, y: 34, filter: 'blur(18px)' }, { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.9 })
        .fromTo('.preloader-copy', { autoAlpha: 0, y: 20, filter: 'blur(12px)' }, { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.7 }, '-=0.5')
        .to(
          counterRef.current,
          {
            value: 100,
            duration: 1.65,
            ease: 'power2.inOut',
            onUpdate: () => setPercent(Math.round(counterRef.current.value)),
          },
          '-=0.35',
        )
        .fromTo('.preloader-line', { scaleX: 0 }, { scaleX: 1, duration: 1.65, ease: 'power2.inOut', transformOrigin: 'left center' }, '<')
        .to('.preloader-content', { y: -34, autoAlpha: 0, filter: 'blur(14px)', duration: 0.55, ease: 'power3.inOut' }, '+=0.28')
        .to('.preloader-shell', { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.85, ease: 'power4.inOut' }, '-=0.15')
        .to(ref.current, { autoAlpha: 0, duration: 0.1 }, '-=0.1');
    }, ref);

    return () => {
      document.body.style.overflow = previousOverflow;
      ctx.revert();
    };
  }, [onComplete]);

  return (
    <div
      aria-label="Preparing cinematic experience"
      className="on-media fixed inset-0 z-[120] h-screen w-screen overflow-hidden bg-[#050505] text-white"
      ref={ref}
      role="status"
      style={{ height: '100dvh', minHeight: '100svh', width: '100vw' }}
    >
      <div className="preloader-shell absolute inset-0 flex h-screen w-screen items-center justify-center bg-[#050505] px-6" style={{ height: '100dvh', minHeight: '100svh', width: '100vw' }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_32%,rgba(229,9,20,0.22),transparent_26rem),linear-gradient(135deg,rgba(255,255,255,0.06),transparent_32%)]" />
        <div className="preloader-content relative z-10 w-full max-w-3xl text-center">
          <p className="preloader-copy mb-5 text-xs font-bold uppercase tracking-[0.42em] text-cinema-muted">
            Preparing cinematic experience...
          </p>
          <h1 className="preloader-logo text-[clamp(3rem,12vw,8rem)] font-black leading-none tracking-tight">
            Cine<span className="text-cinema-red">Verse</span>
          </h1>
          <div className="mx-auto mt-9 flex max-w-xl items-center gap-4">
            <div className="h-px flex-1 overflow-hidden bg-white/15">
              <div className="preloader-line h-full w-full bg-cinema-red shadow-glow" />
            </div>
            <span className="min-w-16 text-right text-2xl font-black tabular-nums text-white">
              {percent}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FullPageLoader;

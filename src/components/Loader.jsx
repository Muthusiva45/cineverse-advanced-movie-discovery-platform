import gsap from 'gsap';
import { useEffect, useRef } from 'react';

function Loader({ label = 'Loading cinematic picks...' }) {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.loader-ring', {
        rotate: 360,
        duration: 1.8,
        ease: 'none',
        repeat: -1,
        transformOrigin: '50% 50%',
      });
      gsap.to('.loader-dot', {
        scale: 1.35,
        opacity: 0.35,
        duration: 0.72,
        ease: 'power2.inOut',
        stagger: { each: 0.12, yoyo: true, repeat: -1 },
      });
      gsap.fromTo(
        '.loader-copy',
        { autoAlpha: 0, y: 10 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <div className="flex min-h-[16rem] flex-col items-center justify-center gap-5 text-cinema-muted" ref={ref}>
      <div className="relative grid h-20 w-20 place-items-center">
        <div className="loader-ring absolute inset-0 rounded-full border border-white/10 border-t-cinema-red shadow-glow" />
        <div className="absolute inset-2 rounded-full border border-cinema-red/20" />
        <div className="grid grid-cols-3 gap-1">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((dot) => (
            <span
              className={`loader-dot h-2 w-2 rounded-full ${dot === 4 ? 'bg-cinema-red' : 'bg-white/45'}`}
              key={dot}
            />
          ))}
        </div>
      </div>
      <p className="loader-copy text-sm font-bold uppercase tracking-[0.24em]">{label}</p>
    </div>
  );
}

export default Loader;

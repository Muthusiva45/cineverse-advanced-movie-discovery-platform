import gsap from 'gsap';
import { useEffect, useRef } from 'react';

function GsapText({ as: Tag = 'span', children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const words = String(children).split(' ');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gsap-word',
        { autoAlpha: 0, y: 28, rotateX: -72, filter: 'blur(10px)' },
        {
          autoAlpha: 1,
          y: 0,
          rotateX: 0,
          filter: 'blur(0px)',
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.055,
          delay,
        },
      );
    }, ref);

    return () => ctx.revert();
  }, [children, delay]);

  return (
    <Tag className={className} ref={ref}>
      {words.map((word, index) => (
        <span className="gsap-word inline-block origin-bottom will-change-transform" key={`${word}-${index}`}>
          {word}
          {index < words.length - 1 ? '\u00a0' : ''}
        </span>
      ))}
    </Tag>
  );
}

export default GsapText;

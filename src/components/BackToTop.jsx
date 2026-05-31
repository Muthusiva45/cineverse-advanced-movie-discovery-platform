import { useEffect, useState } from 'react';
import { FiArrowUp } from 'react-icons/fi';

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > 700);
    update();
    window.addEventListener('scroll', update);
    return () => window.removeEventListener('scroll', update);
  }, []);

  if (!visible) return null;

  return (
    <button
      aria-label="Back to top"
      className="magnetic-button fixed bottom-24 right-4 z-40 grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-cinema-red text-white shadow-glow md:bottom-6 md:right-6"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      type="button"
    >
      <FiArrowUp />
    </button>
  );
}

export default BackToTop;

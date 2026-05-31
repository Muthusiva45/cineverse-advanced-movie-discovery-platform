import { motion, useScroll, useTransform } from 'framer-motion';

function ParallaxGlow() {
  const { scrollYProgress } = useScroll();
  const yOne = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const yTwo = useTransform(scrollYProgress, [0, 1], ['0%', '-22%']);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <motion.div
        className="scroll-glow absolute -left-24 top-24 h-80 w-80 rounded-full bg-cinema-red/20 blur-3xl will-change-transform md:h-[34rem] md:w-[34rem]"
        style={{ y: yOne }}
      />
      <motion.div
        className="scroll-glow absolute -right-28 top-[38%] h-72 w-72 rounded-full bg-white/8 blur-3xl will-change-transform md:h-[30rem] md:w-[30rem]"
        style={{ y: yTwo }}
      />
    </div>
  );
}

export default ParallaxGlow;

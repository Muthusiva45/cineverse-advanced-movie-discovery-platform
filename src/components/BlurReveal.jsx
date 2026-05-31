import { motion } from 'framer-motion';

export const blurReveal = {
  hidden: {
    opacity: 0,
    y: 80,
    filter: 'blur(16px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const blurStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.075,
      delayChildren: 0.05,
    },
  },
};

function BlurReveal({ as = 'div', children, className = '', amount = 0.2, delay = 0 }) {
  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      variants={{
        hidden: blurReveal.hidden,
        visible: {
          ...blurReveal.visible,
          transition: {
            ...blurReveal.visible.transition,
            delay,
          },
        },
      }}
      viewport={{ once: true, amount }}
      whileInView="visible"
    >
      {children}
    </MotionTag>
  );
}

export default BlurReveal;

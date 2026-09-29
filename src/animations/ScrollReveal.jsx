import { motion as Motion, useReducedMotion } from 'framer-motion';
import { useMotionSettings } from './useMotionSettings.js';

function ScrollReveal({ children, className = '', delay = 0 }) {
  const prefersReducedMotion = useReducedMotion();
  const { durationScale } = useMotionSettings();

  return (
    <Motion.div
      className={`${className} motion-reveal`}
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 34, filter: 'blur(14px)' }}
      whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
      transition={{
        duration: 0.74 * durationScale,
        delay: delay * durationScale,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </Motion.div>
  );
}

export default ScrollReveal;

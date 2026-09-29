import { motion as Motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

function ParallaxLayer({ children, className = '', speed = 80, opacity = true }) {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, speed]);
  const layerOpacity = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [1, 1, 0.72, 0.5]);

  return (
    <Motion.div
      className={`${className} will-change-transform`}
      style={prefersReducedMotion ? undefined : { y, opacity: opacity ? layerOpacity : 1 }}
    >
      {children}
    </Motion.div>
  );
}

export default ParallaxLayer;

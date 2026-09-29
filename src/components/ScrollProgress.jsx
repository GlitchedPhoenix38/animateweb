import { motion as Motion, useScroll, useSpring } from 'framer-motion';

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  return (
    <div
      aria-hidden="true"
      className="fixed right-4 top-1/2 z-40 hidden h-40 w-px -translate-y-1/2 overflow-hidden rounded-full bg-white/10 lg:block"
    >
      <Motion.div
        className="h-full origin-top rounded-full bg-gradient-to-b from-atlas-cyan via-atlas-blue to-atlas-violet"
        style={{ scaleY }}
      />
    </div>
  );
}

export default ScrollProgress;

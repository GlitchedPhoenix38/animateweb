import { motion as Motion, useReducedMotion } from 'framer-motion';
import { useMotionSettings } from './useMotionSettings.js';

function TextReveal({ as = 'span', text, className = '', delay = 0 }) {
  const prefersReducedMotion = useReducedMotion();
  const { durationScale } = useMotionSettings();
  const Component = Motion[as] ?? Motion.span;
  const words = text.split(' ');

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
      variants={{
        visible: {
          transition: {
            staggerChildren: prefersReducedMotion ? 0 : 0.045 * durationScale,
            delayChildren: delay * durationScale,
          },
        },
      }}
      aria-label={text}
    >
      {words.map((word, index) => (
        <span className="inline-block overflow-hidden align-bottom" aria-hidden="true" key={`${word}-${index}`}>
          <Motion.span
            className="inline-block pr-[0.25em]"
            variants={{
              hidden: prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 0, y: '100%', filter: 'blur(8px)' },
              visible: { opacity: 1, y: '0%', filter: 'blur(0px)' },
            }}
            transition={{ duration: 0.68 * durationScale, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
          </Motion.span>
        </span>
      ))}
    </Component>
  );
}

export default TextReveal;

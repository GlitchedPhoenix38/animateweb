import { useRef } from 'react';
import {
  motion as Motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { TextReveal } from '../animations';

const storyLines = [
  'Motion is not decoration.',
  'It is the moment an interface starts to breathe.',
  'A pause before clarity.',
  'A signal that something understands you.',
];

function StorySection() {
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const textY = useTransform(scrollYProgress, [0.1, 0.85], [40, -40]);
  const lineScale = useTransform(scrollYProgress, [0.2, 0.78], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-screen overflow-hidden bg-atlas-black px-5 py-28 text-atlas-text sm:px-8 lg:px-10"
    >
      <div className="mx-auto flex min-h-[calc(100vh-14rem)] max-w-7xl flex-col justify-center">
        <div className="mb-12 grid gap-5 lg:grid-cols-[12rem_1fr] lg:items-center">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-atlas-cyan">
            The Feeling
          </p>
          <div className="relative h-px overflow-hidden rounded-full bg-white/10">
            <Motion.div
              className="h-full origin-left bg-gradient-to-r from-atlas-cyan via-atlas-blue to-atlas-violet"
              style={prefersReducedMotion ? undefined : { scaleX: lineScale }}
            />
          </div>
        </div>

        <Motion.div
          className="max-w-6xl will-change-transform"
          style={prefersReducedMotion ? undefined : { y: textY }}
        >
          {storyLines.map((line, index) => (
            <TextReveal
              key={line}
              as={index === 0 ? 'h2' : 'p'}
              delay={index * 0.1}
              className={[
                'block font-sans font-semibold leading-[0.96] tracking-tight',
                index === 0
                  ? 'text-[clamp(3rem,8vw,7rem)] text-atlas-text'
                  : 'mt-5 max-w-5xl text-[clamp(1.8rem,5vw,5rem)] text-atlas-muted',
              ].join(' ')}
              text={line}
            />
          ))}
        </Motion.div>

        <p className="mt-14 max-w-xl text-sm leading-7 text-atlas-dim sm:text-base">
          The best motion disappears into confidence. It gives every state a
          pulse, every transition a reason, and every interaction a quiet sense
          of intention.
        </p>
      </div>
    </section>
  );
}

export default StorySection;

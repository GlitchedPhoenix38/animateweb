import { useMemo, useRef } from 'react';
import {
  motion as Motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { ScrollReveal, TextReveal } from '../animations';
import AnimationPreview from '../components/AnimationPreview.jsx';
import { galleryItems } from '../data/galleryItems.js';

function HorizontalTimeline() {
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const timelineItems = useMemo(() => galleryItems.slice(0, 5), []);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0.08, 0.92], ['0%', '-72%']);
  const progressScale = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="relative min-h-[320vh] bg-atlas-black text-atlas-text"
    >
      <div className="sticky top-0 flex min-h-screen items-center overflow-hidden px-5 py-24 sm:px-8 lg:px-10">
        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <ScrollReveal className="mb-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-atlas-cyan">
                Timeline
              </p>
              <TextReveal
                as="h2"
                className="mt-4 font-sans text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl"
                text="A sequence you can feel."
              />
            </div>
            <div className="lg:justify-self-end">
              <p className="max-w-2xl text-sm leading-7 text-atlas-muted">
                Scroll vertically to move through a horizontal motion timeline.
                Each stop reveals a different animation system in sequence.
              </p>
              <div className="mt-4 h-px overflow-hidden rounded-full bg-white/10">
                <Motion.div
                  className="h-full origin-left bg-gradient-to-r from-atlas-cyan via-atlas-blue to-atlas-violet"
                  style={prefersReducedMotion ? undefined : { scaleX: progressScale }}
                />
              </div>
            </div>
          </ScrollReveal>

          <div className="relative hidden h-[31rem] overflow-visible lg:block">
            <Motion.div
              className="flex w-max gap-5 will-change-transform"
              style={prefersReducedMotion ? undefined : { x }}
            >
              {timelineItems.map((item, index) => (
                <Motion.article
                  key={item.id}
                  data-cursor="interactive"
                  className="group relative h-[28rem] w-[32rem] shrink-0 overflow-hidden rounded-xl border border-white/10 bg-atlas-surface p-4"
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                >
                  <div className="relative h-56 overflow-hidden rounded-lg border border-white/10 bg-[#050712]">
                    <AnimationPreview item={item} />
                  </div>
                  <div className="relative mt-5">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-atlas-cyan">
                        Step {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="font-sans text-xl font-semibold">{item.title}</h3>
                    <p className="mt-2 max-w-md text-sm leading-6 text-atlas-muted">
                      {item.description}
                    </p>
                  </div>
                </Motion.article>
              ))}
            </Motion.div>
          </div>

          <div className="flex snap-x gap-4 overflow-x-auto pb-4 lg:hidden">
            {timelineItems.map((item, index) => (
              <article
                key={item.id}
                className="min-w-[82vw] snap-center rounded-xl border border-white/10 bg-atlas-surface p-4"
              >
                <div className="h-56 overflow-hidden rounded-lg border border-white/10 bg-[#050712]">
                  <AnimationPreview item={item} />
                </div>
                <p className="mt-4 font-mono text-[0.68rem] uppercase tracking-[0.24em] text-atlas-cyan">
                  Step {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-2 font-sans text-xl font-semibold">{item.title}</h3>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HorizontalTimeline;

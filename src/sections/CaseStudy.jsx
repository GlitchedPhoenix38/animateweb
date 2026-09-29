import { useState } from 'react';
import { motion as Motion, useReducedMotion } from 'framer-motion';
import { ScrollReveal, TextReveal } from '../animations';

function ComparisonPanel({ mode, type }) {
  const prefersReducedMotion = useReducedMotion();
  const isAfter = mode === 'after';
  const isBeforePanel = type === 'before';

  return (
    <div className="relative min-h-[28rem] overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#050712] p-5">
      <div className="mb-7 flex items-center justify-between">
        <span className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-atlas-dim">
          {isBeforePanel ? 'Before' : 'After'}
        </span>
        <span
          className={[
            'rounded-full border px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.18em]',
            isBeforePanel
              ? 'border-white/10 text-atlas-dim'
              : 'border-atlas-cyan/30 text-atlas-cyan',
          ].join(' ')}
        >
          {isBeforePanel ? 'Fragmented' : 'Sequenced'}
        </span>
      </div>

      <div className="relative h-80">
        <Motion.div
          className="absolute left-0 top-0 h-24 w-full rounded-3xl border border-white/10 bg-white/[0.06]"
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  opacity: isAfter ? 1 : 0.52,
                  y: isBeforePanel ? 0 : isAfter ? 0 : 18,
                  scale: isAfter && !isBeforePanel ? 1 : 0.96,
                }
          }
          transition={{ duration: isBeforePanel ? 0.18 : 0.72, ease: [0.16, 1, 0.3, 1] }}
        />
        <Motion.div
          className={[
            'absolute top-28 rounded-3xl border bg-white/[0.06]',
            isBeforePanel ? 'left-0 h-28 w-[46%] border-white/10' : 'left-0 h-36 w-[58%] border-atlas-cyan/25',
          ].join(' ')}
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  x: isBeforePanel ? [0, 8, -4, 0] : isAfter ? 0 : 24,
                  opacity: isBeforePanel ? 0.58 : 1,
                }
          }
          transition={{ duration: isBeforePanel ? 0.35 : 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
        />
        <Motion.div
          className={[
            'absolute rounded-3xl border bg-white/[0.06]',
            isBeforePanel ? 'right-0 top-28 h-28 w-[46%] border-white/10' : 'right-0 top-36 h-28 w-[36%] border-atlas-blue/25',
          ].join(' ')}
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  y: isBeforePanel ? [0, -7, 5, 0] : isAfter ? 0 : -20,
                  opacity: isBeforePanel ? 0.5 : 0.9,
                }
          }
          transition={{ duration: isBeforePanel ? 0.32 : 0.86, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
        />
        <Motion.div
          className="absolute bottom-0 left-0 right-0 h-14 origin-left rounded-full bg-gradient-to-r from-atlas-cyan via-atlas-blue to-atlas-violet"
          initial={false}
          animate={{ scaleX: isBeforePanel ? 0.36 : isAfter ? 1 : 0.62, opacity: isBeforePanel ? 0.34 : 0.82 }}
          transition={{ duration: isBeforePanel ? 0.2 : 0.92, ease: [0.16, 1, 0.3, 1], delay: 0.24 }}
        />
      </div>
    </div>
  );
}

function CaseStudy() {
  const [mode, setMode] = useState('after');

  return (
    <section className="relative isolate overflow-hidden bg-atlas-black px-5 py-24 text-atlas-text sm:px-8 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-atlas-cyan">
              Case Study
            </p>
            <TextReveal
              as="h2"
              className="mt-4 font-sans text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl"
              text="From motion noise to motion clarity."
            />
          </div>

          <div className="flex w-full max-w-sm rounded-lg border border-white/10 bg-atlas-surface p-1">
            {['before', 'after'].map((option) => {
              const isActive = mode === option;

              return (
                <Motion.button
                  key={option}
                  type="button"
                  onClick={() => setMode(option)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  className={[
                    'relative h-10 flex-1 cursor-pointer rounded-md font-sans text-sm capitalize transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-atlas-cyan',
                    isActive ? 'text-atlas-black' : 'text-atlas-muted hover:text-atlas-text',
                  ].join(' ')}
                >
                  {isActive ? (
                    <Motion.span
                      layoutId="case-toggle"
                      className="absolute inset-0 rounded-md bg-atlas-cyan"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  ) : null}
                  <span className="relative z-10">{option}</span>
                </Motion.button>
              );
            })}
          </div>
        </ScrollReveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          <ScrollReveal>
            <ComparisonPanel mode={mode} type="before" />
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <ComparisonPanel mode={mode} type="after" />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export default CaseStudy;

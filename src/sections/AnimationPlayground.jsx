import { useMemo, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { motion as Motion, useReducedMotion } from 'framer-motion';
import { ScrollReveal, TextReveal } from '../animations';

function mapEasing(value) {
  const tension = value / 100;
  const controlY = 1 + tension * 0.42;
  return [0.16, controlY, 0.3, 1];
}

function AnimationPlayground() {
  const prefersReducedMotion = useReducedMotion();
  const [speed, setSpeed] = useState(1);
  const [easing, setEasing] = useState(42);
  const [replayKey, setReplayKey] = useState(0);

  const duration = useMemo(() => 1.8 / speed, [speed]);
  const ease = useMemo(() => mapEasing(easing), [easing]);
  const easingLabel = easing < 30 ? 'Precise' : easing < 70 ? 'Soft' : 'Elastic';

  return (
    <section
      id="playground"
      className="relative isolate overflow-hidden bg-atlas-black px-5 py-24 text-atlas-text sm:px-8 lg:px-10 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <ScrollReveal className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-atlas-cyan">
              Playground
            </p>
            <TextReveal
              as="h2"
              className="mt-4 font-sans text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl"
              text="Tune motion until it feels right."
            />
          </div>
          <p className="max-w-2xl text-sm leading-7 text-atlas-muted lg:justify-self-end">
            Adjust speed and easing in real time. The preview updates instantly
            so timing, rhythm, and responsiveness can be felt directly.
          </p>
        </ScrollReveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <ScrollReveal>
            <div className="relative min-h-[34rem] overflow-hidden rounded-xl border border-white/10 bg-atlas-surface p-5">
              <div className="relative h-[30rem] overflow-hidden rounded-lg border border-white/10 bg-[#050712]">
                <div className="absolute left-6 right-6 top-6 flex items-center justify-between">
                  <span className="font-mono text-[0.66rem] uppercase tracking-[0.22em] text-atlas-dim">
                    Live Preview
                  </span>
                  <span className="rounded-lg border border-white/10 px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-atlas-cyan">
                    {speed.toFixed(1)}x / {easingLabel}
                  </span>
                </div>

                <Motion.div
                  key={replayKey}
                  className="absolute left-10 top-28 h-28 w-44 rounded-xl border border-atlas-cyan/35 bg-atlas-cyan/15 will-change-transform"
                  animate={
                    prefersReducedMotion
                      ? { opacity: 1 }
                      : { x: [0, 240, 110], y: [0, 58, 178], rotate: [0, 8, -4] }
                  }
                  transition={{ duration, ease, times: [0, 0.62, 1] }}
                />
                <Motion.div
                  key={`orb-${replayKey}`}
                  className="absolute right-16 top-24 size-32 rounded-full border border-atlas-violet/35 bg-atlas-violet/15 will-change-transform"
                  animate={prefersReducedMotion ? { opacity: 1 } : { scale: [0.82, 1.18, 1], opacity: [0.45, 1, 0.7] }}
                  transition={{ duration: duration * 0.9, ease, delay: 0.08 }}
                />
                <Motion.div
                  key={`rail-${replayKey}`}
                  className="absolute bottom-20 left-10 right-10 h-2 origin-left rounded-full bg-gradient-to-r from-atlas-cyan via-atlas-blue to-atlas-violet will-change-transform"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: duration * 0.92, ease, delay: 0.16 }}
                />
                <div className="absolute bottom-8 left-10 right-10 grid grid-cols-3 gap-3">
                  {[0, 1, 2].map((item) => (
                    <Motion.div
                      key={`${replayKey}-${item}`}
                      className="h-14 rounded-xl border border-white/10 bg-white/[0.06] will-change-transform"
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: duration * 0.42, ease, delay: 0.22 + item * 0.08 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <div className="rounded-xl border border-white/10 bg-atlas-surface p-5">
              <div className="mb-7 flex items-start justify-between gap-5">
                <div>
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-atlas-cyan">
                    Controls
                  </p>
                  <h3 className="mt-2 font-sans text-xl font-semibold">
                    Motion response lab
                  </h3>
                </div>
                <button
                  type="button"
                  aria-label="Replay animation"
                  onClick={() => setReplayKey((key) => key + 1)}
                  className="inline-flex size-9 cursor-pointer items-center justify-center rounded-lg border border-white/15 bg-white/[0.06] text-atlas-muted transition-colors hover:border-white/30 hover:text-atlas-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-atlas-cyan"
                >
                  <RotateCcw aria-hidden="true" className="size-4" />
                </button>
              </div>

              <div className="space-y-6">
                <label className="block">
                  <span className="mb-2 flex items-center justify-between font-mono text-[0.68rem] uppercase tracking-[0.2em] text-atlas-dim">
                    Speed
                    <span className="text-atlas-cyan">{speed.toFixed(1)}x</span>
                  </span>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={speed}
                    onChange={(event) => setSpeed(Number(event.target.value))}
                    className="motion-slider w-full cursor-pointer"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 flex items-center justify-between font-mono text-[0.68rem] uppercase tracking-[0.2em] text-atlas-dim">
                    Easing
                    <span className="text-atlas-cyan">{easingLabel}</span>
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={easing}
                    onChange={(event) => setEasing(Number(event.target.value))}
                    className="motion-slider w-full cursor-pointer"
                  />
                </label>
              </div>

              <div className="mt-6 rounded-xl border border-white/10 bg-black/25 p-4">
                <div className="grid grid-cols-2 gap-3 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-atlas-dim">
                  <span>Duration</span>
                  <span className="text-right text-atlas-text">{duration.toFixed(2)}s</span>
                  <span>Curve</span>
                  <span className="text-right text-atlas-text">
                    [{ease.map((value) => value.toFixed(2)).join(', ')}]
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export default AnimationPlayground;

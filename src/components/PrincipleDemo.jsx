import { memo } from 'react';
import { motion as Motion, useReducedMotion } from 'framer-motion';
import { useMotionSettings } from '../animations/useMotionSettings.js';

const accentClass = {
  blue: 'from-atlas-blue to-atlas-cyan',
  violet: 'from-atlas-violet to-atlas-blue',
  cyan: 'from-atlas-cyan to-atlas-violet',
};

function FocusDemo({ accent }) {
  const prefersReducedMotion = useReducedMotion();
  const { durationScale } = useMotionSettings();

  return (
    <div className="relative h-full overflow-hidden rounded-xl border border-white/10 bg-black/20 p-5">
      <Motion.div
        className={`absolute left-5 top-5 h-16 w-28 rounded-xl bg-gradient-to-br ${accentClass[accent]} opacity-25 will-change-transform`}
        animate={prefersReducedMotion ? undefined : { x: [0, 126, 126, 0], y: [0, 0, 72, 72] }}
        transition={{ duration: 4.2 * durationScale, repeat: Infinity, ease: [0.16, 1, 0.3, 1] }}
      />
      <div className="grid h-full grid-cols-2 gap-4">
        {[0, 1, 2, 3].map((item) => (
          <div key={item} className="rounded-xl border border-white/10 bg-white/[0.045]" />
        ))}
      </div>
    </div>
  );
}

function SpringDemo({ accent }) {
  const prefersReducedMotion = useReducedMotion();
  const { durationScale } = useMotionSettings();

  return (
    <div className="flex h-full items-center justify-center rounded-xl border border-white/10 bg-black/20">
      <Motion.div
        className={`size-20 rounded-xl bg-gradient-to-br ${accentClass[accent]} will-change-transform`}
        animate={prefersReducedMotion ? undefined : { x: [-72, 72, -72], rotate: [-8, 8, -8] }}
        transition={{
          duration: 2.8 * durationScale,
          repeat: Infinity,
          ease: [0.16, 1, 0.3, 1],
        }}
      />
    </div>
  );
}

function StaggerDemo({ accent }) {
  const prefersReducedMotion = useReducedMotion();
  const { durationScale } = useMotionSettings();

  return (
    <div className="flex h-full items-center justify-center rounded-xl border border-white/10 bg-black/20">
      <div className="grid grid-cols-4 gap-3">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((item) => (
          <Motion.div
            key={item}
            className={`size-11 rounded-lg bg-gradient-to-br ${accentClass[accent]} opacity-20 will-change-transform`}
            animate={prefersReducedMotion ? undefined : { opacity: [0.18, 0.78, 0.18], y: [10, 0, 10] }}
            transition={{
              duration: 2.2 * durationScale,
              repeat: Infinity,
              delay: item * 0.08 * durationScale,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </div>
  );
}

function PerformanceDemo({ accent }) {
  const prefersReducedMotion = useReducedMotion();
  const { durationScale } = useMotionSettings();

  return (
    <div className="relative h-full overflow-hidden rounded-xl border border-white/10 bg-black/20 p-5">
      <div className="absolute inset-x-5 top-1/2 h-px bg-white/10" />
      <Motion.div
        className={`absolute left-5 top-1/2 size-14 -translate-y-1/2 rounded-full bg-gradient-to-br ${accentClass[accent]} will-change-transform`}
        animate={prefersReducedMotion ? undefined : { x: [0, 214, 0] }}
        transition={{ duration: 2.4 * durationScale, repeat: Infinity, ease: [0.16, 1, 0.3, 1] }}
      />
      <div className="absolute bottom-5 left-5 right-5 flex justify-between font-mono text-[0.6rem] uppercase tracking-[0.18em] text-atlas-dim">
        <span>Transform</span>
        <span>Opacity</span>
      </div>
    </div>
  );
}

const demos = {
  focus: FocusDemo,
  spring: SpringDemo,
  stagger: StaggerDemo,
  performance: PerformanceDemo,
};

function PrincipleDemo({ principle }) {
  const Demo = demos[principle.demo] ?? FocusDemo;

  return <Demo accent={principle.accent} />;
}

export default memo(PrincipleDemo);

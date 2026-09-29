import { memo } from 'react';
import { motion as Motion, useReducedMotion } from 'framer-motion';
import { useMotionSettings } from '../animations/useMotionSettings.js';

const accentClass = {
  blue: 'from-atlas-blue to-atlas-cyan',
  violet: 'from-atlas-violet to-atlas-blue',
  cyan: 'from-atlas-cyan to-atlas-violet',
};

const cascadeCells = [0, 1, 2, 3, 4, 5];

function MagneticConfirmPreview({ accent = 'blue', large = false }) {
  const prefersReducedMotion = useReducedMotion();
  const { durationScale } = useMotionSettings();
  return (
    <div className="flex h-full items-center justify-center">
      <Motion.div
        className={[
          'relative flex items-center gap-3 rounded-lg border border-white/15 bg-white/[0.07] will-change-transform',
          large ? 'px-8 py-5' : 'px-5 py-3',
        ].join(' ')}
        whileHover={prefersReducedMotion ? undefined : { scale: 1.05, y: -4 }}
        animate={prefersReducedMotion ? undefined : { y: [0, -4, 0] }}
        transition={{ duration: 3.2 * durationScale, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className={`size-3 rounded-full bg-gradient-to-r ${accentClass[accent]}`} />
        <span className={large ? 'text-base font-semibold' : 'text-sm font-semibold'}>Confirm Motion</span>
      </Motion.div>
    </div>
  );
}

function LiquidTogglePreview({ accent = 'violet', large = false }) {
  const prefersReducedMotion = useReducedMotion();
  const { durationScale } = useMotionSettings();
  return (
    <div className="flex h-full items-center justify-center">
      <div className={[
        'relative rounded-lg border border-white/15 bg-white/[0.07] p-1',
        large ? 'h-20 w-40' : 'h-14 w-28',
      ].join(' ')}>
        <Motion.div
          className={`h-full aspect-square rounded-full bg-gradient-to-br ${accentClass[accent]} will-change-transform`}
          animate={prefersReducedMotion ? undefined : { x: large ? [0, 80, 0] : [0, 56, 0] }}
          transition={{ duration: 3 * durationScale, repeat: Infinity, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}


function OrbitalLoaderPreview({ accent = 'cyan', large = false }) {
  const prefersReducedMotion = useReducedMotion();
  const { durationScale } = useMotionSettings();
  const size = large ? 'size-48' : 'size-32';
  return (
    <div className="flex h-full items-center justify-center">
      <Motion.div
        className={`relative ${size} rounded-full border border-white/10 will-change-transform`}
        animate={prefersReducedMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 4 * durationScale, repeat: Infinity, ease: 'linear' }}
      >
        <span className={`absolute left-1/2 top-0 size-4 -translate-x-1/2 rounded-full bg-gradient-to-r ${accentClass[accent]}`} />
        <span className="absolute inset-5 rounded-full border border-dashed border-white/12" />
        <Motion.span
          className="absolute inset-1/2 size-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 will-change-transform"
          animate={prefersReducedMotion ? undefined : { scale: [1, 1.35, 1] }}
          transition={{ duration: 1.8 * durationScale, repeat: Infinity, ease: 'easeInOut' }}
        />
      </Motion.div>
    </div>
  );
}

function ScanLoaderPreview({ accent = 'blue', large = false }) {
  const prefersReducedMotion = useReducedMotion();
  const { durationScale } = useMotionSettings();
  return (
    <div className="flex h-full items-center justify-center px-8">
      <div className="relative w-full max-w-sm overflow-hidden rounded-xl border border-white/12 bg-white/[0.06] p-5">
        <Motion.span
          className={`absolute inset-y-0 w-24 bg-gradient-to-r ${accentClass[accent]} opacity-35 blur-xl will-change-transform`}
          animate={prefersReducedMotion ? undefined : { x: ['-60%', large ? '440%' : '360%'] }}
          transition={{ duration: 1.9 * durationScale, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="relative space-y-4">
          <div className="h-3 w-2/3 rounded-full bg-white/18" />
          <div className="h-3 w-full rounded-full bg-white/10" />
          <div className="h-3 w-4/5 rounded-full bg-white/10" />
        </div>
      </div>
    </div>
  );
}


function GlassRoutePreview({ accent = 'violet', large = false }) {
  const prefersReducedMotion = useReducedMotion();
  const { durationScale } = useMotionSettings();
  return (
    <div className="flex h-full items-center justify-center">
      <Motion.div
        className={[
          'rounded-xl border border-white/14 bg-white/[0.08] p-4',
          large ? 'h-56 w-80' : 'h-36 w-56',
        ].join(' ')}
        animate={prefersReducedMotion ? undefined : { opacity: [0.72, 1, 0.72], y: [10, 0, 10] }}
        transition={{ duration: 3.4 * durationScale, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className={`mb-4 h-14 rounded-xl bg-gradient-to-r ${accentClass[accent]} opacity-35`} />
        <div className="space-y-3">
          <div className="h-2.5 w-2/3 rounded-full bg-white/18" />
          <div className="h-2.5 w-full rounded-full bg-white/10" />
          <div className="h-2.5 w-4/5 rounded-full bg-white/10" />
        </div>
      </Motion.div>
    </div>
  );
}

function StaggerCascadePreview({ accent = 'cyan', large = false }) {
  const prefersReducedMotion = useReducedMotion();
  const { durationScale } = useMotionSettings();
  return (
    <div className="flex h-full items-center justify-center">
      <Motion.div
        className={large ? 'grid grid-cols-3 gap-4' : 'grid grid-cols-3 gap-3'}
        animate="visible" initial="hidden"
        variants={{ visible: { transition: { staggerChildren: 0.12, repeat: Infinity } } }}
      >
        {cascadeCells.map((cell) => (
          <Motion.div
            key={cell}
            className={['rounded-xl border border-white/12 bg-white/[0.07] will-change-transform', large ? 'size-24' : 'size-16'].join(' ')}
            variants={{ hidden: { opacity: 0.35, y: 14 }, visible: { opacity: 1, y: 0 } }}
            animate={prefersReducedMotion ? undefined : { opacity: [0.45, 1, 0.45], y: [12, 0, 12] }}
            transition={{ duration: 2.4 * durationScale, repeat: Infinity, delay: cell * 0.12 * durationScale, ease: 'easeInOut' }}
          >
            <div className={`h-full rounded-xl bg-gradient-to-br ${accentClass[accent]} opacity-10`} />
          </Motion.div>
        ))}
      </Motion.div>
    </div>
  );
}

const previews = {
  'magnetic-confirm': MagneticConfirmPreview,
  'liquid-toggle': LiquidTogglePreview,
  'orbital-loader': OrbitalLoaderPreview,
  'scan-loader': ScanLoaderPreview,
  'glass-route': GlassRoutePreview,
  'stagger-cascade': StaggerCascadePreview,
};

function AnimationPreview({ item, large = false }) {
  const Preview = previews[item.id] ?? MagneticConfirmPreview;

  return <Preview accent={item.accent} large={large} />;
}

export default memo(AnimationPreview);

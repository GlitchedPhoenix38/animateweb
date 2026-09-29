import { useRef } from 'react';
import {
  motion as Motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { ScrollReveal, TextReveal } from '../animations';

const layers = [
  { label: 'Background', depth: '01', className: 'left-[6%] top-[18%] h-36 w-64', color: 'bg-atlas-violet/12' },
  { label: 'Interface', depth: '02', className: 'right-[8%] top-[28%] h-52 w-80', color: 'bg-atlas-blue/14' },
  { label: 'Focus', depth: '03', className: 'left-[24%] bottom-[12%] h-44 w-72', color: 'bg-atlas-cyan/14' },
];

function AdvancedMotion() {
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const layerY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const lineScale = useTransform(scrollYProgress, [0.18, 0.78], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-atlas-black px-5 py-24 text-atlas-text sm:px-8 lg:px-10 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <ScrollReveal className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-atlas-cyan">
              Advanced Motion
            </p>
            <TextReveal
              as="h2"
              className="mt-4 font-sans text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl"
              text="Depth that moves with intention."
            />
          </div>
          <p className="max-w-2xl text-sm leading-7 text-atlas-muted lg:justify-self-end">
            Separate depth layers with restrained perspective and scroll-linked
            movement to create immersion without stealing control.
          </p>
        </ScrollReveal>

        <ScrollReveal className="mt-14">
          <div className="relative min-h-[36rem] overflow-hidden rounded-xl border border-white/10 bg-atlas-surface p-5">
            <Motion.div
              className="absolute left-8 right-8 top-8 h-px origin-left bg-gradient-to-r from-atlas-cyan via-atlas-blue to-atlas-violet"
              style={prefersReducedMotion ? undefined : { scaleX: lineScale }}
            />

            <div className="absolute inset-5 overflow-hidden rounded-lg border border-white/10 bg-[#050712]">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:72px_72px] opacity-55" />

              {layers.map((layer) => (
                <Motion.div
                  key={layer.label}
                  className={[
                    'absolute rounded-xl border border-white/12 p-5 will-change-transform',
                    layer.className,
                    layer.color,
                  ].join(' ')}
                  style={prefersReducedMotion ? undefined : { y: layerY }}
                  data-cursor="interactive"
                >
                  <p className="font-mono text-[0.64rem] uppercase tracking-[0.22em] text-atlas-cyan">
                    Layer {layer.depth}
                  </p>
                  <h3 className="mt-2 font-sans text-lg font-semibold">{layer.label}</h3>
                  <div className="mt-6 space-y-2">
                    <span className="block h-2 rounded-full bg-white/18" />
                    <span className="block h-2 w-2/3 rounded-full bg-white/10" />
                  </div>
                </Motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default AdvancedMotion;

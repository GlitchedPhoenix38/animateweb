import { memo } from 'react';
import { motion as Motion } from 'framer-motion';
import PrincipleDemo from './PrincipleDemo.jsx';

function PrincipleCard({ principle }) {
  return (
    <Motion.article
      layout
      data-cursor="interactive"
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 26, mass: 0.48 }}
      className="group relative overflow-hidden rounded-xl border border-white/10 bg-atlas-surface p-5 transition-[border-color,background] duration-300 will-change-transform hover:border-atlas-cyan/30 hover:bg-white/[0.04]"
    >
      <div className="h-56">
        <PrincipleDemo principle={principle} />
      </div>
      <div className="mt-5">
        <div className="mb-3 flex items-center justify-between gap-4">
          <span className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-atlas-cyan">
            {principle.index}
          </span>
          <span className="h-px flex-1 bg-white/10" />
        </div>
        <h3 className="font-sans text-xl font-semibold text-atlas-text">
          {principle.title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-atlas-muted">{principle.description}</p>
      </div>
    </Motion.article>
  );
}

export default memo(PrincipleCard);

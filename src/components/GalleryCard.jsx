import { memo } from 'react';
import { motion as Motion } from 'framer-motion';
import AnimationPreview from './AnimationPreview.jsx';

function GalleryCard({ item, onSelect }) {
  return (
    <Motion.button
      type="button" layout
      onClick={() => onSelect(item)}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25, mass: 0.48 }}
      data-cursor="interactive"
      className="group relative cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-atlas-surface p-3 text-left outline-none transition-[border-color,background] duration-300 ease-out will-change-transform hover:border-atlas-blue/40 hover:bg-white/[0.04] focus-visible:border-atlas-cyan focus-visible:ring-2 focus-visible:ring-atlas-cyan/70"
    >
      <div className="overflow-hidden rounded-lg border border-white/10 bg-[#050712]">
        <div className="h-56"><AnimationPreview item={item} /></div>
      </div>
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between gap-4">
          <p className="font-mono text-[0.66rem] uppercase tracking-[0.22em] text-atlas-cyan">{item.eyebrow}</p>
        </div>
        <h3 className="font-sans text-lg font-semibold text-atlas-text">{item.title}</h3>
        <p className="mt-2 text-sm leading-6 text-atlas-muted">{item.description}</p>
      </div>
    </Motion.button>
  );
}

export default memo(GalleryCard);

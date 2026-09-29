import { X } from 'lucide-react';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import AnimationPreview from './AnimationPreview.jsx';
import CodeDisplayPanel from './CodeDisplayPanel.jsx';

function AnimationModal({ item, onClose }) {
  return (
    <AnimatePresence>
      {item ? (
        <Motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          role="dialog" aria-modal="true" aria-labelledby="animation-modal-title"
        >
          <Motion.button type="button" className="absolute inset-0 cursor-default bg-black/80" aria-label="Close modal" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <Motion.div
            className="relative z-10 grid max-h-[88vh] w-full max-w-4xl overflow-hidden rounded-xl border border-white/15 bg-atlas-panel md:grid-cols-[1.05fr_0.95fr]"
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.97 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative min-h-[360px] border-b border-white/10 bg-[#050712] md:border-b-0 md:border-r">
              <AnimationPreview item={item} large />
            </div>
            <div className="flex min-h-0 flex-col">
              <div className="flex items-start justify-between gap-6 border-b border-white/10 p-5">
                <div>
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-atlas-cyan">{item.eyebrow}</p>
                  <h2 id="animation-modal-title" className="mt-2 font-sans text-xl font-semibold">{item.title}</h2>
                  <p className="mt-2 max-w-md text-sm leading-6 text-atlas-muted">{item.description}</p>
                </div>
                <button type="button" aria-label="Close modal" onClick={onClose} className="inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-atlas-muted transition-colors hover:text-atlas-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-atlas-cyan">
                  <X aria-hidden="true" className="size-4" />
                </button>
              </div>
              <div className="min-h-0 overflow-auto p-5">
                <CodeDisplayPanel item={item} />
              </div>
            </div>
          </Motion.div>
        </Motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default AnimationModal;

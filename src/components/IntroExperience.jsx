import { useEffect, useState } from 'react';
import { AnimatePresence, motion as Motion, useReducedMotion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1];

function IntroExperience({ onComplete }) {
  const prefersReducedMotion = useReducedMotion();
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const exitDelay = prefersReducedMotion ? 900 : 2200;
    const completeDelay = prefersReducedMotion ? 1200 : 2800;
    const exitTimer = window.setTimeout(() => setIsExiting(true), exitDelay);
    const completeTimer = window.setTimeout(onComplete, completeDelay);
    return () => { window.clearTimeout(exitTimer); window.clearTimeout(completeTimer); };
  }, [onComplete, prefersReducedMotion]);

  return (
    <AnimatePresence>
      {!isExiting ? (
        <Motion.div
          className="fixed inset-0 z-[80] overflow-hidden bg-atlas-black text-atlas-text"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.18 : 0.5, ease }}
        >
          <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
            <div className="flex flex-col items-center text-center">
              <Motion.svg viewBox="0 0 96 96" className="size-12"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: prefersReducedMotion ? 0.2 : 0.6, ease, delay: 0.2 }}>
                <defs>
                  <linearGradient id="introMark" x1="12" x2="84" y1="14" y2="82">
                    <stop stopColor="#5CD6E8" />
                    <stop offset="0.55" stopColor="#5B9DF5" />
                    <stop offset="1" stopColor="#9575E8" />
                  </linearGradient>
                </defs>
                <path d="M18 62C34 24 57 24 76 40" fill="none" stroke="url(#introMark)" strokeWidth="8" strokeLinecap="round" />
                <path d="M61 27 80 39 61 52z" fill="url(#introMark)" />
                <circle cx="18" cy="62" r="6" fill="#5CD6E8" />
              </Motion.svg>
              <Motion.p className="mt-6 font-mono text-[0.68rem] uppercase tracking-[0.32em] text-atlas-cyan"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: prefersReducedMotion ? 0.2 : 0.5, ease, delay: 0.5 }}>
                Loading Motion System
              </Motion.p>
              <Motion.h1 className="mt-3 font-sans text-4xl font-semibold leading-none sm:text-5xl"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: prefersReducedMotion ? 0.2 : 0.6, ease, delay: 0.7 }}>
                Motion Atlas
              </Motion.h1>
              <Motion.div className="mt-8 h-px w-48 overflow-hidden rounded-full bg-white/10"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: prefersReducedMotion ? 0.2 : 0.4, delay: 1 }}>
                <Motion.div className="h-full rounded-full bg-gradient-to-r from-atlas-cyan via-atlas-blue to-atlas-violet"
                  initial={{ x: '-100%' }} animate={{ x: '0%' }}
                  transition={{ duration: prefersReducedMotion ? 0.3 : 1, ease, delay: 1.1 }} />
              </Motion.div>
            </div>
          </div>
        </Motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default IntroExperience;

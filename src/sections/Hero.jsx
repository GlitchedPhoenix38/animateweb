import { motion as Motion } from 'framer-motion';
import { TextReveal } from '../animations';
import MagneticButton from '../components/MagneticButton.jsx';

const heroWords = ['Motion', 'Atlas'];

function Hero() {

  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-atlas-black text-atlas-text">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(91,157,245,0.06),transparent_40%,transparent_70%,rgba(3,4,10,0.95))]" />

      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center justify-center px-5 py-24 sm:px-8 lg:px-10">
        <div className="flex max-w-3xl flex-col items-center text-center">
          <div className="inline-flex items-center gap-3 rounded-lg border border-white/10 bg-atlas-surface px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.24em] text-atlas-cyan">
            <span className="size-1.5 rounded-full bg-atlas-cyan" />
            Cinematic Interface Systems
          </div>

          <Motion.h1
            className="mt-6 max-w-5xl overflow-hidden font-sans text-[clamp(3.6rem,10vw,8rem)] font-semibold leading-[0.88] tracking-tight"
            aria-label="Motion Atlas"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            {heroWords.map((word) => (
              <span key={word} className="block">
                {word}
              </span>
            ))}
          </Motion.h1>

          <TextReveal
            as="p"
            delay={0.4}
            className="mt-6 max-w-xl text-base leading-7 text-atlas-muted"
            text="A premium showcase for kinetic interfaces and motion systems built with purpose."
          />

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <MagneticButton href="#showcase">Explore Showcase</MagneticButton>
            <MagneticButton href="#principles" variant="secondary">
              Motion Principles
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;

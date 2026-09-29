import { motion as Motion } from 'framer-motion';
import { ScrollReveal, TextReveal } from '../animations';
import PrincipleCard from '../components/PrincipleCard.jsx';
import { motionPrinciples } from '../data/motionPrinciples.js';

function MotionPrinciples() {
  return (
    <section
      id="principles"
      className="relative isolate overflow-hidden bg-atlas-black px-5 py-24 text-atlas-text sm:px-8 lg:px-10 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <ScrollReveal className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-atlas-cyan">
              Motion Principles
            </p>
            <TextReveal
              as="h2"
              className="mt-4 font-sans text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl"
              text="The rules behind the feeling."
            />
          </div>
          <p className="max-w-2xl text-sm leading-7 text-atlas-muted lg:justify-self-end">
            Motion Atlas treats animation as interface logic. Each principle
            below includes a live demonstration so the rule can be felt, not
            just read.
          </p>
        </ScrollReveal>

        <Motion.div layout className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {motionPrinciples.map((principle, index) => (
            <ScrollReveal key={principle.id} delay={index * 0.045}>
              <PrincipleCard principle={principle} />
            </ScrollReveal>
          ))}
        </Motion.div>
      </div>
    </section>
  );
}

export default MotionPrinciples;

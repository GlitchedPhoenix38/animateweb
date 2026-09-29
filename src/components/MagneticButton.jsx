import { ArrowUpRight } from 'lucide-react';
import { motion as Motion } from 'framer-motion';

function MagneticButton({ children, href = '#', variant = 'primary' }) {
  const isPrimary = variant === 'primary';

  return (
    <Motion.a
      href={href}
      data-cursor="interactive"
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.02 }}
      className={[
        'group relative inline-flex h-11 cursor-pointer items-center justify-center rounded-lg px-5 font-sans text-sm font-semibold transition-[border-color,background] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-atlas-cyan',
        isPrimary
          ? 'border border-atlas-blue/50 bg-atlas-blue text-[#02030a] hover:bg-atlas-blue/90'
          : 'border border-white/15 bg-white/[0.06] text-atlas-text hover:border-white/30 hover:bg-white/[0.1]',
      ].join(' ')}
    >
      <span className="flex items-center gap-2">
        {children}
        <ArrowUpRight aria-hidden="true" className="size-3.5" />
      </span>
    </Motion.a>
  );
}

export default MagneticButton;

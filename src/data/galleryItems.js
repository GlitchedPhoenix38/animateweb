export const categories = [
  { id: 'all', label: 'All' },
  { id: 'micro', label: 'Micro interactions' },
  { id: 'loaders', label: 'Loaders' },
  { id: 'transitions', label: 'Transitions' },
];

export const galleryItems = [
  {
    id: 'magnetic-confirm',
    title: 'Magnetic Confirm',
    category: 'micro',
    eyebrow: 'Micro interaction',
    description: 'A tactile CTA pattern with lift, glow, and directional feedback.',
    accent: 'blue',
    code: `const button = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.04, y: -3 },
  tap: { scale: 0.98 }
};

<motion.button
  variants={button}
  initial="rest"
  whileHover="hover"
  whileTap="tap"
  transition={{ type: 'spring', stiffness: 360, damping: 24 }}
/>`,
  },
  {
    id: 'liquid-toggle',
    title: 'Liquid Toggle',
    category: 'micro',
    eyebrow: 'Micro interaction',
    description: 'A glass toggle with morphing active state and soft light transfer.',
    accent: 'violet',
    code: `<motion.div layout className="toggle">
  <motion.span
    layout
    className="thumb"
    transition={{ type: 'spring', stiffness: 420, damping: 28 }}
  />
</motion.div>`,
  },
  {
    id: 'orbital-loader',
    title: 'Orbital Loader',
    category: 'loaders',
    eyebrow: 'Loader',
    description: 'A premium loading loop built from rotating paths and staggered glow dots.',
    accent: 'cyan',
    code: `<motion.div
  animate={{ rotate: 360 }}
  transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
>
  <motion.span animate={{ scale: [1, 1.35, 1] }} />
</motion.div>`,
  },
  {
    id: 'scan-loader',
    title: 'Scanline Resolve',
    category: 'loaders',
    eyebrow: 'Loader',
    description: 'A precise skeleton reveal with a luminous scanner and progress pulse.',
    accent: 'blue',
    code: `<motion.div className="scan">
  <motion.span
    animate={{ x: ['-30%', '130%'] }}
    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
  />
</motion.div>`,
  },
  {
    id: 'glass-route',
    title: 'Glass Route Shift',
    category: 'transitions',
    eyebrow: 'Transition',
    description: 'A page transition using blur, vertical drift, and layered glass masks.',
    accent: 'violet',
    code: `const page = {
  initial: { opacity: 0, y: 28, filter: 'blur(16px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -18, filter: 'blur(10px)' }
};

<AnimatePresence mode="wait">
  <motion.main variants={page} />
</AnimatePresence>`,
  },
  {
    id: 'stagger-cascade',
    title: 'Stagger Cascade',
    category: 'transitions',
    eyebrow: 'Transition',
    description: 'A disciplined entrance system for dense UI groups and editorial panels.',
    accent: 'cyan',
    code: `const group = {
  visible: { transition: { staggerChildren: 0.07 } }
};

const item = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 }
};`,
  },
];

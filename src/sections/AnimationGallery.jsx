import { useMemo, useState } from 'react';
import {
  AnimatePresence,
  motion as Motion,
} from 'framer-motion';
import { ScrollReveal, TextReveal } from '../animations';
import AnimationModal from '../components/AnimationModal.jsx';
import GalleryCard from '../components/GalleryCard.jsx';
import { categories, galleryItems } from '../data/galleryItems.js';

function AnimationGallery() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') {
      return galleryItems;
    }
    return galleryItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <section
      id="showcase"
      className="relative isolate overflow-hidden bg-atlas-black px-5 py-24 text-atlas-text sm:px-8 lg:px-10 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <ScrollReveal className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-atlas-cyan">
              Motion Library
            </p>
            <TextReveal
              as="h2"
              className="mt-4 font-sans text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl"
              text="Interaction patterns with visible craft."
            />
            <p className="mt-4 max-w-2xl text-sm leading-7 text-atlas-muted">
              Filter cinematic interface patterns, preview the motion directly
              on each card, then open the implementation details.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 rounded-lg border border-white/10 bg-atlas-surface p-1">
            {categories.map((category) => {
              const isActive = category.id === activeCategory;

              return (
                <Motion.button
                  key={category.id}
                  type="button"
                  onClick={() => setActiveCategory(category.id)}
                  whileHover={{ scale: 1.04, y: -1 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 28 }}
                  className={[
                    'relative cursor-pointer rounded-md px-4 py-2 font-sans text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-atlas-cyan',
                    isActive ? 'text-atlas-black' : 'text-atlas-muted hover:text-atlas-text',
                  ].join(' ')}
                >
                  {isActive ? (
                    <Motion.span
                      layoutId="category-pill"
                      className="absolute inset-0 rounded-md bg-atlas-cyan"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  ) : null}
                  <span className="relative z-10">{category.label}</span>
                </Motion.button>
              );
            })}
          </div>
        </ScrollReveal>

        <Motion.div layout className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <ScrollReveal key={item.id} delay={index * 0.035}>
                <GalleryCard item={item} onSelect={setSelectedItem} />
              </ScrollReveal>
            ))}
          </AnimatePresence>
        </Motion.div>
      </div>

      <AnimationModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </section>
  );
}

export default AnimationGallery;

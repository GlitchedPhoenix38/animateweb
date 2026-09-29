import { useCallback, useState } from 'react';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import { MotionSettingsProvider } from './animations';
import {
  AmbientCursor,
  Footer,
  IntroExperience,
  Navigation,
  ScrollProgress,
} from './components';
import {
  AdvancedMotion,
  AnimationGallery,
  AnimationPlayground,
  CaseStudy,
  Hero,
  HorizontalTimeline,
  MotionPrinciples,
  StorySection,
} from './sections';

function App() {
  const [introComplete, setIntroComplete] = useState(false);
  const handleIntroComplete = useCallback(() => setIntroComplete(true), []);

  return (
    <MotionSettingsProvider>
      <AmbientCursor />
      <AnimatePresence mode="wait">
        {!introComplete ? (
          <IntroExperience key="intro" onComplete={handleIntroComplete} />
        ) : (
          <>
            <Navigation />
            <Motion.main
              key="homepage"
              className="min-h-screen bg-atlas-black pt-14 text-atlas-text"
              initial={{ opacity: 0, y: 28, scale: 0.985, filter: 'blur(16px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -12, filter: 'blur(8px)' }}
              transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
            >
              <Hero />
              <StorySection />
              <MotionPrinciples />
              <AnimationPlayground />
              <CaseStudy />
              <AdvancedMotion />
              <HorizontalTimeline />
              <AnimationGallery />
            </Motion.main>
            <Footer />
          </>
        )}
      </AnimatePresence>
      {introComplete ? <ScrollProgress /> : null}
    </MotionSettingsProvider>
  );
}

export default App;

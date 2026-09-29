import { useEffect, useRef, useState } from 'react';
import {
  motion as Motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';

function AmbientCursor() {
  const prefersReducedMotion = useReducedMotion();
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);
  const interactiveRef = useRef(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 260, damping: 32, mass: 0.35 });
  const springY = useSpring(cursorY, { stiffness: 260, damping: 32, mass: 0.35 });

  useEffect(() => {
    const query = window.matchMedia('(pointer: fine)');
    const syncPointer = () => setIsFinePointer(query.matches);

    syncPointer();
    query.addEventListener('change', syncPointer);

    return () => query.removeEventListener('change', syncPointer);
  }, []);

  useEffect(() => {
    if (!isFinePointer || prefersReducedMotion) {
      return undefined;
    }

    const handleMove = (event) => {
      cursorX.set(event.clientX - 18);
      cursorY.set(event.clientY - 18);
      const nextInteractive = Boolean(
        event.target.closest(
          'a, button, input, textarea, select, [role="button"], [data-cursor="interactive"]',
        ),
      );

      if (interactiveRef.current !== nextInteractive) {
        interactiveRef.current = nextInteractive;
        setIsInteractive(nextInteractive);
      }
    };
    const handleDown = () => setIsPressed(true);
    const handleUp = () => setIsPressed(false);
    const handleLeave = () => {
      interactiveRef.current = false;
      setIsInteractive(false);
    };

    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerdown', handleDown);
    window.addEventListener('pointerup', handleUp);
    window.addEventListener('pointerleave', handleLeave);

    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerdown', handleDown);
      window.removeEventListener('pointerup', handleUp);
      window.removeEventListener('pointerleave', handleLeave);
    };
  }, [cursorX, cursorY, isFinePointer, prefersReducedMotion]);

  if (!isFinePointer || prefersReducedMotion) {
    return null;
  }

  return (
    <Motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[60] hidden size-9 rounded-full border mix-blend-screen will-change-transform md:block"
      style={{ x: springX, y: springY }}
      animate={{
        scale: isPressed ? 0.68 : isInteractive ? 1.85 : 1,
        borderColor: isInteractive ? 'rgba(167,139,250,0.72)' : 'rgba(103,232,249,0.45)',
        backgroundColor: isInteractive ? 'rgba(167,139,250,0.13)' : 'rgba(103,232,249,0.1)',
        boxShadow: isInteractive
          ? '0 0 48px rgba(167,139,250,0.36)'
          : '0 0 36px rgba(103,232,249,0.32)',
      }}
      transition={{ type: 'spring', stiffness: 380, damping: 24 }}
    >
      <Motion.span
        className="absolute left-1/2 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-atlas-cyan"
        animate={{ opacity: isInteractive ? 0 : 1, scale: isPressed ? 1.6 : 1 }}
      />
    </Motion.div>
  );
}

export default AmbientCursor;

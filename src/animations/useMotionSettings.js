import { useContext } from 'react';
import { MotionSettingsContext } from './motionSettingsContext.js';

export function useMotionSettings() {
  const context = useContext(MotionSettingsContext);

  if (!context) {
    throw new Error('useMotionSettings must be used inside MotionSettingsProvider');
  }

  return context;
}

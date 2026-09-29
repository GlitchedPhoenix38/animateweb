import { useMemo, useState } from 'react';
import { MotionSettingsContext } from './motionSettingsContext.js';

export function MotionSettingsProvider({ children }) {
  const [speed, setSpeed] = useState(1);

  const value = useMemo(
    () => ({
      speed,
      setSpeed,
      durationScale: 1 / speed,
    }),
    [speed],
  );

  return (
    <MotionSettingsContext.Provider value={value}>
      {children}
    </MotionSettingsContext.Provider>
  );
}

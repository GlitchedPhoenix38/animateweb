# Motion Atlas Motion Patterns

## Timing Tokens

| Token | Value | Use |
| --- | ---: | --- |
| `duration.instant` | `120ms` | tiny feedback, icon nudges |
| `duration.fast` | `180ms` | hover, press, focus |
| `duration.standard` | `280ms` | cards, buttons, chips |
| `duration.reveal` | `720ms` | section reveal, modal enter |
| `duration.cinematic` | `900ms` | hero and featured panels |

## Easing Tokens

| Token | Value | Use |
| --- | --- | --- |
| `ease.premium` | `[0.16, 1, 0.3, 1]` | default Motion Atlas ease-out |
| `ease.exit` | `[0.7, 0, 0.84, 0]` | fast exit |
| `ease.soft` | `[0.22, 1, 0.36, 1]` | calm content reveal |

## Spring Tokens

| Token | Stiffness | Damping | Use |
| --- | ---: | ---: | --- |
| `spring.cta` | `360` | `24` | magnetic buttons |
| `spring.layout` | `420` | `28` | tabs, toggles, filters |
| `spring.panel` | `240` | `30` | cards and modal panels |

## Pattern: Magnetic CTA

Use for premium buttons and high-value actions.

```jsx
const magneticCta = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.04, y: -3 },
  tap: { scale: 0.98 },
};

<motion.button
  variants={magneticCta}
  initial="rest"
  whileHover="hover"
  whileTap="tap"
  transition={{ type: 'spring', stiffness: 360, damping: 24 }}
/>
```

## Pattern: Glass Route Transition

Use for page-level transitions and large modal panels.

```jsx
const glassRoute = {
  initial: { opacity: 0, y: 28, filter: 'blur(16px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -18, filter: 'blur(10px)' },
};
```

## Pattern: Staggered Reveal

Use for gallery cards, rows, nav lists, and principle tiles.

```jsx
const revealGroup = {
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.12,
    },
  },
};

const revealItem = {
  hidden: { opacity: 0, y: 18, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
};
```

## Pattern: Premium Loader

Use continuous animation only for loading or system status.

```css
@keyframes motion-atlas-orbit {
  to {
    transform: rotate(360deg);
  }
}

.motion-orbital-loader {
  animation: motion-atlas-orbit 2.4s linear infinite;
}
```

## Reduced Motion

For reduced motion:

- remove parallax, pointer-follow, long translations, and infinite decorative motion
- keep opacity/state changes
- replace blur-heavy transitions with direct fades

```css
@media (prefers-reduced-motion: reduce) {
  .motion-reveal {
    animation: none;
    transition: opacity 120ms ease;
  }
}
```

---
name: motion-atlas-generator
description: Generate premium Motion Atlas UI animations on demand, suggest interaction and motion-design improvements, and provide copy-ready CSS, Tailwind, and Framer Motion snippets. Use when Codex is asked to create new animation patterns, improve UI motion quality, critique existing transitions or microinteractions, or turn Motion Atlas into an AI-assisted motion design tool.
---

# Motion Atlas Generator

## Core Workflow

1. Clarify the animation job from the request:
   - pattern type: micro interaction, loader, transition, scroll reveal, hover state, modal, navigation, or hero motion
   - target stack: Framer Motion, CSS, Tailwind, or all three
   - desired feel: premium, glass, cinematic, subtle, technical, fast, elastic, calm
2. Choose a motion recipe from `references/motion-patterns.md` when the request needs design guidance.
3. Generate implementation snippets:
   - Framer Motion first for React interactions.
   - CSS for portable exports.
   - Tailwind utility structure for integration into Motion Atlas components.
4. Include reduced-motion guidance for parallax, continuous loops, or large transforms.
5. Keep output developer-friendly: name tokens, show timing values, and explain where the snippet belongs.

## Generate New Animations

Use `scripts/motion_recipe.py` for fast structured recipes when a user asks for a new animation pattern or exportable JSON:

```bash
python3 skills/motion-atlas-generator/scripts/motion_recipe.py \
  --name "Glass Reveal" \
  --type transition \
  --feel premium \
  --accent blue \
  --format json
```

Use the generated recipe as a starting point, then adapt code to the actual component.

## Suggest UI Motion Improvements

When reviewing or improving a UI:

- Identify the purpose of each motion: feedback, hierarchy, continuity, delight, or system status.
- Remove motion that competes with content.
- Prefer `180-320ms` for direct interactions.
- Prefer `500-900ms` for page or section entrances.
- Use spring motion for physical UI objects; use cubic-bezier timing for fades, reveals, and route transitions.
- Respect `prefers-reduced-motion` for parallax, cursor effects, and infinite animation.

## Provide Code Snippets

For each generated animation, provide:

- `Framer Motion`: JSX or variants object.
- `CSS`: keyframes or transition class.
- `Tailwind`: class structure and where dynamic state belongs.
- `Tokens`: duration, easing, spring, stagger, transform range.

Keep snippets copy-ready. Avoid generic placeholder names like `box`; use names such as `motionCard`, `routePanel`, `magneticCta`, or `glassReveal`.

## Motion Atlas Standards

- Visual style: dark theme, glass surfaces, blue/cyan/violet glow, precise spacing, no noisy gimmicks.
- Animation style: smooth fade + slide, subtle scale, depth through blur and shadow, no aggressive bouncing.
- Accessibility: reduced-motion fallback must keep state changes understandable.
- Performance: animate transform and opacity first; use blur/filter sparingly.

## References

- Read `references/motion-patterns.md` for reusable patterns, timing values, and snippet templates.

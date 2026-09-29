# Motion Atlas Animation Exporter

Repo-local Codex plugin for Motion Atlas animation handoff.

## What It Does

- Copy animation snippets directly for Framer Motion, Tailwind, and CSS.
- Export animation recipes as JSON for product teams and design tools.
- Export CSS keyframes and utility classes for non-React implementations.
- Map easing, duration, stagger, and spring settings into design-tool tokens.

## CLI Usage

List available animations:

```bash
node plugins/motion-atlas-animation-exporter/scripts/export-animation.js list
```

Export all animations as JSON:

```bash
node plugins/motion-atlas-animation-exporter/scripts/export-animation.js export --format json --out /tmp/motion-atlas-animations.json
```

Export CSS:

```bash
node plugins/motion-atlas-animation-exporter/scripts/export-animation.js export --format css --out /tmp/motion-atlas-animations.css
```

Export a single animation:

```bash
node plugins/motion-atlas-animation-exporter/scripts/export-animation.js export magnetic-confirm --format css
```

Generate design-tool tokens:

```bash
node plugins/motion-atlas-animation-exporter/scripts/design-tool-adapter.js --tool figma
```

## Developer Notes

Animation definitions live in `assets/animations.json`. Keep each animation recipe portable:

- `framer` for React/Framer Motion implementation.
- `css` for keyframes or transition classes.
- `tokens` for design-tool timing, easing, and spring handoff.


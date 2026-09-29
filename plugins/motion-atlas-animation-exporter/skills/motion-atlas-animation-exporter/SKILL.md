---
name: motion-atlas-animation-exporter
description: Copy and export Motion Atlas animation recipes as Framer Motion, CSS, JSON, and design-tool motion tokens.
---

# Motion Atlas Animation Exporter

Use this skill when a user wants to copy, export, or adapt Motion Atlas animations.

## Workflows

### Copy An Animation

1. Read `assets/animations.json`.
2. Match the requested animation by `id`, `name`, or `category`.
3. Return the requested implementation format:
   - `framer`
   - `css`
   - `json`
4. Keep snippets copy-ready and include dependency assumptions.

### Export As JSON Or CSS

Use the bundled script:

```bash
node plugins/motion-atlas-animation-exporter/scripts/export-animation.js export --format json
node plugins/motion-atlas-animation-exporter/scripts/export-animation.js export --format css
```

For a single animation:

```bash
node plugins/motion-atlas-animation-exporter/scripts/export-animation.js export magnetic-confirm --format css
```

### Integrate With Design Tools

Use `scripts/design-tool-adapter.js` to emit tool-oriented motion tokens:

```bash
node plugins/motion-atlas-animation-exporter/scripts/design-tool-adapter.js --tool figma
node plugins/motion-atlas-animation-exporter/scripts/design-tool-adapter.js --tool framer
```

## Quality Rules

- Preserve reduced-motion guidance when adapting animation snippets.
- Prefer named tokens over magic numbers.
- Include duration, easing, and spring values in every exported recipe.
- Keep CSS exports framework-agnostic.

#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const pluginRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const registryPath = resolve(pluginRoot, 'assets/animations.json');
const registry = JSON.parse(readFileSync(registryPath, 'utf8'));

function usage() {
  console.log(`Motion Atlas Animation Exporter

Usage:
  export-animation.js list
  export-animation.js export [animation-id] --format json|css [--out file]

Examples:
  export-animation.js list
  export-animation.js export --format json
  export-animation.js export magnetic-confirm --format css --out /tmp/magnetic.css`);
}

function getFlag(name, fallback = null) {
  const index = process.argv.indexOf(`--${name}`);
  return index === -1 ? fallback : process.argv[index + 1];
}

function selectedAnimations() {
  const id = process.argv[3]?.startsWith('--') ? null : process.argv[3];

  if (!id) {
    return registry.animations;
  }

  const animation = registry.animations.find((item) => item.id === id);
  if (!animation) {
    throw new Error(`Unknown animation: ${id}`);
  }

  return [animation];
}

function toCss(animations) {
  return animations
    .map((animation) => `/* ${animation.name}: ${animation.description} */\n${animation.css}`)
    .join('\n\n');
}

function writeOrPrint(output, outPath) {
  if (outPath) {
    writeFileSync(resolve(process.cwd(), outPath), output);
    console.log(`Exported ${outPath}`);
    return;
  }

  console.log(output);
}

const command = process.argv[2];

try {
  if (!command || command === 'help') {
    usage();
  } else if (command === 'list') {
    for (const animation of registry.animations) {
      console.log(`${animation.id}\t${animation.category}\t${animation.name}`);
    }
  } else if (command === 'export') {
    const format = getFlag('format', 'json');
    const outPath = getFlag('out');
    const animations = selectedAnimations();

    if (format === 'json') {
      writeOrPrint(JSON.stringify({ ...registry, animations }, null, 2), outPath);
    } else if (format === 'css') {
      writeOrPrint(toCss(animations), outPath);
    } else {
      throw new Error(`Unsupported format: ${format}`);
    }
  } else {
    throw new Error(`Unknown command: ${command}`);
  }
} catch (error) {
  console.error(error.message);
  process.exit(1);
}

#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const pluginRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const tokens = JSON.parse(
  readFileSync(resolve(pluginRoot, 'assets/design-tool-tokens.json'), 'utf8'),
);

const toolIndex = process.argv.indexOf('--tool');
const tool = toolIndex === -1 ? 'generic' : process.argv[toolIndex + 1];

function toFigma(tokenSet) {
  return {
    name: tokenSet.name,
    target: 'figma-variables',
    collections: [
      {
        name: 'Motion',
        modes: ['Default'],
        variables: Object.entries(tokenSet.tokens).map(([name, token]) => ({
          name,
          type: token.type,
          valuesByMode: {
            Default: token.value,
          },
        })),
      },
    ],
  };
}

function toFramer(tokenSet) {
  return {
    name: tokenSet.name,
    target: 'framer-motion',
    transitionPresets: {
      premium: {
        ease: tokenSet.tokens['ease.premium'].value,
        duration: tokenSet.tokens['duration.standard'].value / 1000,
      },
      route: {
        ease: tokenSet.tokens['ease.premium'].value,
        duration: tokenSet.tokens['duration.slow'].value / 1000,
      },
      ctaSpring: tokenSet.tokens['spring.cta'].value,
    },
  };
}

const output =
  tool === 'figma' ? toFigma(tokens) : tool === 'framer' ? toFramer(tokens) : tokens;

console.log(JSON.stringify(output, null, 2));

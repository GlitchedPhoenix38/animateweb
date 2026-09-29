import { Check, Copy } from 'lucide-react';
import { useMemo, useState } from 'react';
import { motion as Motion } from 'framer-motion';

const tabs = [
  { id: 'css', label: 'CSS' },
  { id: 'tailwind', label: 'Tailwind' },
  { id: 'framer', label: 'Framer Motion' },
];

const accentHex = {
  blue: '#6EA8FF',
  violet: '#A78BFA',
  cyan: '#67E8F9',
};

function getSnippets(item) {
  const accent = accentHex[item.accent] ?? accentHex.blue;

  return {
    css: `.motion-card {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(22px) saturate(140%);
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.38);
  transition: transform 280ms cubic-bezier(.16, 1, .3, 1),
    border-color 280ms ease,
    box-shadow 280ms ease;
}

.motion-card:hover {
  transform: translateY(-8px) scale(1.015);
  border-color: ${accent};
  box-shadow: 0 0 44px color-mix(in srgb, ${accent} 32%, transparent);
}`,
    tailwind: `<button
  className="
    group relative overflow-hidden rounded-[1.75rem]
    border border-white/10 bg-white/[0.055]
    p-3 text-left shadow-glass backdrop-blur-glass
    transition-colors duration-300
    hover:border-atlas-${item.accent}/55
    focus-visible:outline focus-visible:outline-2
    focus-visible:outline-atlas-cyan
  "
>
  <div className="rounded-[1.25rem] border border-white/10 bg-[#050712]">
    <AnimationPreview item={item} />
  </div>
</button>`,
    framer: item.code,
  };
}

function tokenize(code) {
  const escaped = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  return escaped
    .replace(/(\/\*[\s\S]*?\*\/|\/\/.*)/g, '<span class="text-atlas-dim">$1</span>')
    .replace(/(`[^`]*`|'[^']*'|"[^"]*")/g, '<span class="text-atlas-gold">$1</span>')
    .replace(
      /\b(const|let|return|function|className|animate|transition|variants|initial|whileHover|whileTap|exit|mode|duration|repeat|ease|stiffness|damping)\b/g,
      '<span class="text-atlas-cyan">$1</span>',
    )
    .replace(/\b(\d+\.?\d*|Infinity)\b/g, '<span class="text-atlas-violet">$1</span>')
    .replace(
      /([.#]?[a-zA-Z-]+)(?=\s*:)/g,
      '<span class="text-atlas-blue">$1</span>',
    );
}

async function copyToClipboard(value) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textarea = document.createElement('textarea');
  textarea.value = value;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

function CodeDisplayPanel({ item }) {
  const [activeTab, setActiveTab] = useState('framer');
  const [copiedTab, setCopiedTab] = useState(null);
  const snippets = useMemo(() => getSnippets(item), [item]);
  const activeCode = snippets[activeTab];
  const highlightedCode = useMemo(() => tokenize(activeCode), [activeCode]);

  const handleCopy = async () => {
    await copyToClipboard(activeCode);
    setCopiedTab(activeTab);
    window.setTimeout(() => setCopiedTab(null), 1400);
  };

  return (
    <div className="rounded-lg border border-white/10 bg-black/30">
      <div className="flex flex-col gap-3 border-b border-white/10 p-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-1 rounded-lg border border-white/10 bg-white/[0.045] p-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <Motion.button
                type="button"
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 420, damping: 28 }}
                className={[
                  'relative cursor-pointer rounded-md px-3 py-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-atlas-cyan',
                  isActive ? 'text-atlas-black' : 'text-atlas-muted hover:text-atlas-text',
                ].join(' ')}
              >
                {isActive ? (
                  <Motion.span
                    layoutId={`code-tab-${item.id}`}
                    className="absolute inset-0 rounded-md bg-atlas-cyan"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  />
                ) : null}
                <span className="relative z-10">{tab.label}</span>
              </Motion.button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/[0.06] px-4 font-sans text-sm text-atlas-muted transition-colors hover:border-white/30 hover:text-atlas-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-atlas-cyan"
        >
          {copiedTab === activeTab ? (
            <Check aria-hidden="true" className="size-3.5 text-atlas-cyan" />
          ) : (
            <Copy aria-hidden="true" className="size-3.5" />
          )}
          {copiedTab === activeTab ? 'Copied' : 'Copy'}
        </button>
      </div>

      <pre className="max-h-[24rem] overflow-auto p-5 text-sm leading-7">
        <code
          className="font-mono text-atlas-muted"
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </pre>
    </div>
  );
}

export default CodeDisplayPanel;

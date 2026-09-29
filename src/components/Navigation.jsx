import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '#showcase', label: 'Showcase' },
  { href: '#principles', label: 'Principles' },
  { href: '#playground', label: 'Playground' },
  { href: '#timeline', label: 'Timeline' },
];

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-atlas-black/90 backdrop-blur-lg">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <a href="#" className="text-sm font-semibold tracking-tight text-atlas-text">
          Motion Atlas
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-atlas-muted transition-colors hover:text-atlas-text"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex size-9 items-center justify-center rounded-lg text-atlas-muted transition-colors hover:text-atlas-text md:hidden"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {isOpen && (
        <nav className="border-t border-white/10 bg-atlas-black px-5 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="py-2 text-sm text-atlas-muted transition-colors hover:text-atlas-text"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

export default Navigation;

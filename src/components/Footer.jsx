const footerLinks = [
  {
    heading: 'Explore',
    links: [
      { href: '#showcase', label: 'Showcase' },
      { href: '#principles', label: 'Principles' },
      { href: '#playground', label: 'Playground' },
      { href: '#timeline', label: 'Timeline' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { href: '#', label: 'Documentation' },
      { href: '#', label: 'API Reference' },
      { href: '#', label: 'Guides' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { href: '#', label: 'About' },
      { href: '#', label: 'Blog' },
      { href: '#', label: 'Contact' },
    ],
  },
];

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-atlas-black px-5 py-12 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="text-sm font-semibold tracking-tight text-atlas-text">
              Motion Atlas
            </span>
            <p className="mt-3 max-w-xs text-sm leading-6 text-atlas-muted">
              A premium showcase for kinetic interfaces and motion systems built with purpose.
            </p>
          </div>
          {footerLinks.map((group) => (
            <div key={group.heading}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-atlas-dim">
                {group.heading}
              </p>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-atlas-muted transition-colors hover:text-atlas-text"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="text-xs text-atlas-dim">
            &copy; {new Date().getFullYear()} Motion Atlas. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

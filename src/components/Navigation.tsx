import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Visão', href: '#visao' },
  { label: 'Atuação', href: '#atuacao' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Sobre', href: '#about' },
  { label: 'Contato', href: '#contact' },
] as const;

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-precise ${scrolled ? 'border-b border-surface-line bg-surface/80 backdrop-blur-xl' : 'border-b border-transparent bg-transparent'}`}>
      <nav className="container-editorial flex h-16 items-center justify-between lg:h-18">
        <a href="#top" className="group flex items-center gap-2.5" aria-label="PAIVA — início">
          <span className="relative flex h-2 w-2 items-center justify-center">
            <span className="absolute h-2 w-2 rounded-full bg-accent" />
            <span className="absolute h-2 w-2 rounded-full bg-accent animate-pulse-soft" />
          </span>
          <span className="font-sans text-[13px] font-semibold tracking-[0.08em] text-ink">PAIVA</span>
        </a>

        <div className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="group relative text-[13px] font-medium text-ink-muted transition-colors duration-300 hover:text-ink">
              {link.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-ink transition-all duration-300 ease-precise group-hover:w-full" />
            </a>
          ))}
          <a href="#contact" className="border border-surface-line px-4 py-2 text-[12px] font-medium tracking-wide text-ink-soft transition-all duration-300 ease-precise hover:border-ink-faint hover:text-ink">
            Conectar
          </a>
        </div>

        <button onClick={() => setMenuOpen((v) => !v)} className="flex h-9 w-9 items-center justify-center text-ink-soft md:hidden" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen}>
          {menuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
        </button>
      </nav>

      <div className={`overflow-hidden border-t border-surface-line bg-surface/95 backdrop-blur-xl transition-all duration-500 ease-precise md:hidden ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="container-editorial flex flex-col gap-1 py-6">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="border-b border-surface-line-soft py-3 text-sm font-medium text-ink-soft transition-colors hover:text-ink">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}

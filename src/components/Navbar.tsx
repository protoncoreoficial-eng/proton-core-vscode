import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Início', href: '#hero' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Diferenciais', href: '#diferenciais' },
  { label: 'Contato', href: '#contato' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-navy-950/90 backdrop-blur-lg border-b border-navy-700/50 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <button
          onClick={() => handleNav('#hero')}
          className="flex items-center gap-2.5 text-white"
          aria-label="Próton Core início"
        >
          <img src="/logo.png" alt="Próton Core" className="h-16 w-auto object-contain" />
        </button>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNav(link.href)}
                className="text-sm font-medium text-navy-100 transition-colors duration-300 hover:text-accent-400"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={() => handleNav('#contato')}
          className="hidden rounded-full bg-accent-500 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-600 hover:shadow-lg hover:shadow-accent-500/30 md:block"
        >
          Fale Conosco
        </button>

        <button
          className="text-white md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden transition-all duration-400 md:hidden ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="mx-6 mt-4 flex flex-col gap-1 rounded-2xl border border-navy-700/50 bg-navy-900/95 p-4 backdrop-blur-lg">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNav(link.href)}
                className="w-full rounded-lg px-4 py-3 text-left text-sm font-medium text-navy-100 transition-colors hover:bg-navy-800 hover:text-accent-400"
              >
                {link.label}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => handleNav('#contato')}
              className="mt-2 w-full rounded-lg bg-accent-500 px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-accent-600"
            >
              Fale Conosco
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
import { Atom } from 'lucide-react';

const footerLinks = [
  { label: 'Início', href: '#hero' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Diferenciais', href: '#diferenciais' },
  { label: 'Contato', href: '#contato' },
];

const serviceLinks = [
  'P&D',
  'Consultoria Técnica',
  'Desenvolvimento de Produtos',
  'Soluções Industriais',
  'Assuntos Regulatórios',
  'Tratamento de Água',
  'Controle de Qualidade',
];

export default function Footer() {
  const handleNav = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-navy-700/50 bg-navy-950">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-500/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-500/20 ring-1 ring-accent-500/40">
                <Atom className="h-5 w-5 text-accent-400" />
              </span>
              <span className="font-heading text-lg font-semibold tracking-tight">
                Próton<span className="text-accent-400">Core</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-navy-200">
              Ciência que Conecta. Empresa incubada na Universidade Federal de
              Uberlândia, transformando pesquisa em soluções.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-white">
              Navegação
            </h4>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNav(link.href)}
                    className="text-sm text-navy-200 transition-colors hover:text-accent-400"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-white">
              Serviços
            </h4>
            <ul className="mt-4 space-y-2.5">
              {serviceLinks.map((service) => (
                <li key={service}>
                  <button
                    onClick={() => handleNav('#servicos')}
                    className="text-sm text-navy-200 transition-colors hover:text-accent-400"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-white">
              Contato
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-navy-200">
              <li>contato@protoncore.com.br</li>
              <li>Uberlândia — MG, Brasil</li>
              <li>Incubadora UFU</li>
            </ul>
            <a
              href="#contato"
              onClick={(e) => {
                e.preventDefault();
                handleNav('#contato');
              }}
              className="mt-5 inline-flex rounded-full bg-accent-500/15 px-5 py-2.5 text-sm font-medium text-accent-300 ring-1 ring-accent-500/30 transition-colors hover:bg-accent-500/25"
            >
              Enviar mensagem
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-navy-700/40 pt-8 sm:flex-row">
          <p className="text-xs text-navy-300">
            © {new Date().getFullYear()} Próton Core — Ciência que Conecta. Todos os direitos reservados.
          </p>
          <p className="text-xs text-navy-300">
            Empresa incubada na Universidade Federal de Uberlândia (UFU)
          </p>
        </div>
      </div>
    </footer>
  );
}
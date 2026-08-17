import { ArrowRight, Sparkles } from 'lucide-react';

const HERO_IMAGE = 'https://images.pexels.com/photos/38032287/pexels-photo-38032287.png?auto=compress&cs=tinysrgb&w=1600';

export default function Hero() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt=""
          className="h-full w-full object-cover opacity-25"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-950/85 to-navy-900/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/60" />
      </div>

      {/* Decorative orbs */}
      <div className="absolute top-1/4 right-10 h-72 w-72 rounded-full bg-accent-500/10 blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 left-10 h-56 w-56 rounded-full bg-navy-500/15 blur-3xl animate-pulse-slow" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-20">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent-500/30 bg-accent-500/10 px-4 py-2 text-sm font-medium text-accent-300">
            <Sparkles className="h-4 w-4" />
            Incubada na Universidade Federal de Uberlândia
          </div>

          <h1 className="font-heading text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Ciência que{' '}
            <span className="relative">
              <span className="bg-gradient-to-r from-accent-400 to-accent-600 bg-clip-text text-transparent">
                Conecta
              </span>
              <span className="absolute -bottom-1 left-0 h-1 w-full rounded-full bg-gradient-to-r from-accent-400 to-accent-600 opacity-60" />
            </span>
            <br />
            transformando ideias em soluções
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-100">
            A Próton Core conecta pesquisa científica e mercado para desenvolver
            produtos, processos e soluções industriais inovadoras — com rigor
            técnico e compromisso com a qualidade.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button
              onClick={() => scrollTo('#servicos')}
              className="group inline-flex items-center gap-2 rounded-full bg-accent-500 px-7 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:bg-accent-600 hover:shadow-xl hover:shadow-accent-500/30"
            >
              Conhecer Serviços
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => scrollTo('#contato')}
              className="rounded-full border border-navy-600 bg-navy-800/50 px-7 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-accent-500/50 hover:bg-navy-800"
            >
              Solicitar Orçamento
            </button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { value: '7+', label: 'Serviços Especializados' },
              { value: 'UFU', label: 'Incubadora Universitária' },
              { value: 'P&D', label: 'Pesquisa & Desenvolvimento' },
              { value: '100%', label: 'Foco em Qualidade' },
            ].map((stat) => (
              <div key={stat.label} className="border-l-2 border-accent-500/40 pl-4">
                <div className="font-heading text-2xl font-bold text-white">{stat.value}</div>
                <div className="mt-1 text-xs text-navy-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
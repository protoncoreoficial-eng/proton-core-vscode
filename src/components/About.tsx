import { GraduationCap, Target, Lightbulb, ShieldCheck } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const ABOUT_IMAGE = 'https://images.pexels.com/photos/8540819/pexels-photo-8540819.jpeg?auto=compress&cs=tinysrgb&w=1000';

const pillars = [
  { icon: Target, title: 'Missão', text: 'Conectar conhecimento científico ao mercado, entregando soluções tecnológicas com excelência.' },
  { icon: Lightbulb, title: 'Visão', text: 'Ser referência em inovação e desenvolvimento tecnológico, reconhecida pela qualidade e impacto.' },
  { icon: ShieldCheck, title: 'Valores', text: 'Integridade, rigor científico, sustentabilidade e compromisso com resultados.' },
];

export default function About() {
  const { ref, inView } = useInView();

  return (
    <section id="sobre" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div
          ref={ref}
          className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-16 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Image side */}
          <div className="relative order-2 lg:order-1">
            <div className="relative overflow-hidden rounded-3xl">
              <img
                src={ABOUT_IMAGE}
                alt="Laboratório de pesquisa científica"
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent" />
            </div>

            {/* UFU badge */}
            <div className="absolute -bottom-6 -right-4 flex items-center gap-3 rounded-2xl border border-navy-600/50 bg-navy-900/95 p-5 shadow-2xl backdrop-blur-lg sm:-right-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-500/20 ring-1 ring-accent-500/40">
                <GraduationCap className="h-6 w-6 text-accent-400" />
              </span>
              <div>
                <div className="font-heading text-sm font-semibold text-white">Incubada na UFU</div>
                <div className="text-xs text-navy-200">Universidade Federal de Uberlândia</div>
              </div>
            </div>

            {/* Decorative ring */}
            <div className="absolute -left-8 -top-8 -z-10 h-32 w-32 rounded-full border border-accent-500/20" />
          </div>

          {/* Text side */}
          <div className="order-1 lg:order-2">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-400">
              Sobre Nós
            </span>
            <h2 className="mt-3 font-heading text-3xl font-bold leading-tight text-white sm:text-4xl">
              Onde a ciência encontra o mercado
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-navy-100">
              A Próton Core nasce da convicção de que o conhecimento acadêmico pode
              e deve gerar impacto real. Como empresa incubada na Universidade
              Federal de Uberlândia (UFU), unimos o rigor da pesquisa científica
              à agilidade do desenvolvimento empresarial.
            </p>
            <p className="mt-4 text-base leading-relaxed text-navy-200">
              Trabalhamos na fronteira entre academia e indústria, oferecendo
              soluções tecnológicas que vão desde a pesquisa aplicada até a
              regulamentação e o controle de qualidade — sempre com foco em
              resultados tangíveis para nossos clientes.
            </p>

            <div className="mt-8 space-y-4">
              {pillars.map((p, i) => (
                <div
                  key={p.title}
                  className={`flex gap-4 rounded-2xl border border-navy-700/40 bg-navy-900/40 p-5 transition-all duration-500 hover:border-accent-500/30 hover:bg-navy-800/40 ${
                    inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                  }`}
                  style={{ transitionDelay: `${300 + i * 150}ms` }}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-500/15 ring-1 ring-accent-500/30">
                    <p.icon className="h-5 w-5 text-accent-400" />
                  </span>
                  <div>
                    <h3 className="font-heading text-base font-semibold text-white">{p.title}</h3>
                    <p className="mt-1 text-sm text-navy-200">{p.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
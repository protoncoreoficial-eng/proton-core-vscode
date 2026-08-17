import { Award, Users, Zap, Recycle, Clock, HeartHandshake } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const differentials = [
  {
    icon: Award,
    title: 'Excelência Técnica',
    text: 'Equipe com base científica sólida, formada por pesquisadores e especialistas com vivência acadêmica e industrial.',
  },
  {
    icon: Zap,
    title: 'Inovação Aplicada',
    text: 'Transformamos conhecimento de ponta em soluções práticas e viáveis, com foco em resultados mensuráveis.',
  },
  {
    icon: Users,
    title: 'Atendimento Personalizado',
    text: 'Cada projeto é único. Trabalhamos lado a lado com o cliente para entender necessidades e entregar sob medida.',
  },
  {
    icon: Recycle,
    title: 'Sustentabilidade',
    text: 'Compromisso com práticas responsáveis e soluções que respeitam o meio ambiente e os recursos naturais.',
  },
  {
    icon: Clock,
    title: 'Agilidade',
    text: 'Unimos rigor acadêmico à dinâmica empresarial para entregar projetos no prazo, sem perder a qualidade.',
  },
  {
    icon: HeartHandshake,
    title: 'Parceria de Longo Prazo',
    text: 'Não somos apenas fornecedores — somos parceiros estratégicos no desenvolvimento e crescimento do seu negócio.',
  },
];

export default function Differentials() {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section id="diferenciais" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className={`mx-auto max-w-2xl text-center transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-400">
            Diferenciais
          </span>
          <h2 className="mt-3 font-heading text-3xl font-bold text-white sm:text-4xl">
            Por que escolher a Próton Core
          </h2>
          <p className="mt-4 text-lg text-navy-200">
            O que nos diferencia é a combinação única de conhecimento acadêmico,
            visão empresarial e compromisso com cada projeto.
          </p>
        </div>

        <div ref={ref} className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {differentials.map((d, i) => (
            <div
              key={d.title}
              className={`flex gap-5 rounded-2xl border border-navy-700/40 bg-gradient-to-br from-navy-900/60 to-navy-950/60 p-6 transition-all duration-500 hover:border-accent-500/30 hover:from-navy-800/60 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-500/15 ring-1 ring-accent-500/25 transition-all duration-300 group-hover:bg-accent-500/25">
                <d.icon className="h-6 w-6 text-accent-400" />
              </span>
              <div>
                <h3 className="font-heading text-base font-semibold text-white">{d.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-navy-200">{d.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
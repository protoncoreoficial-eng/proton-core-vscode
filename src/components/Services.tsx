import {
  FlaskConical,
  ClipboardCheck,
  Package,
  Factory,
  ScrollText,
  Droplets,
  Gauge,
  ShoppingCart,
} from "lucide-react";
import { useInView } from "../hooks/useInView";

interface ServicesProps {
  onOpenEcommerce?: () => void;
}

const services = [
  {
    id: "ecommerce",
    icon: ShoppingCart,
    title: "E-Commerce",
    description:
      "Plataformas de vendas online modernas, seguras e integradas para o seu negócio.",
  },
  {
    id: "pdi",
    icon: FlaskConical,
    title: "P&DI - Pesquisa, Desenvolvimento e Inovação.",
    description:
      "Desenvolvimento de novas tecnologias, produtos e processos com base científica. Da ideação ao protótipo funcional.",
  },
  {
    id: "consultoria",
    icon: ClipboardCheck,
    title: "Consultoria Técnica",
    description:
      "Assessoria especializada em projetos científicos e industriais, com análises técnicas, diagnósticos e recomendações.",
  },
  {
    id: "produtos",
    icon: Package,
    title: "Desenvolvimento de Produtos",
    description:
      "Do conceito ao produto final: design, formulação, prototipagem e validação para levar sua ideia ao mercado.",
  },
  {
    id: "industria",
    icon: Factory,
    title: "Soluções Industriais",
    description:
      "Otimização de processos produtivos, automação e tecnologias aplicadas para aumentar eficiência e reduzir custos.",
  },
  {
    id: "regulatorio",
    icon: ScrollText,
    title: "Assuntos Regulatórios",
    description:
      "Suporte completo em conformidade normativa, registros, documentação técnica e adequação às exigências regulatórias.",
  },
  {
    id: "agua",
    icon: Droplets,
    title: "Tratamento de Água Industrial",
    description:
      "Projetos e soluções para tratamento e gestão de recursos hídricos, com foco em sustentabilidade e eficiência.",
  },
  {
    id: "qualidade",
    icon: Gauge,
    title: "Garantia de Qualidade",
    description:
      "Implementação e gestão de sistemas de qualidade, ensaios, análises laboratoriais e garantia de conformidade.",
  },
];

export default function Services({ onOpenEcommerce }: ServicesProps) {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section id="servicos" className="relative py-24 lg:py-32">
      {/* Background accent */}
      <div className="absolute inset-x-0 top-1/2 -z-10 h-96 -translate-y-1/2 bg-gradient-to-b from-accent-500/5 to-transparent" />

      <div className="mx-auto max-w-7xl px-6">
        <div
          className={`mx-auto max-w-2xl text-center transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-400">
            Nossos Serviços
          </span>
          <h2 className="mt-3 font-heading text-3xl font-bold text-white sm:text-4xl">
            Soluções completas em ciência e tecnologia
          </h2>
          <p className="mt-4 text-lg text-navy-200">
            Oito áreas de atuação que cobrem todo o ciclo de inovação — da
            pesquisa ao produto, do laboratório à indústria.
          </p>
        </div>

        <div
          ref={ref}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service, i) => {
            const isEcommerce = service.id === "ecommerce";

            return (
              <article
                key={service.title}
                onClick={isEcommerce ? onOpenEcommerce : undefined}
                className={`group relative overflow-hidden rounded-2xl border border-navy-700/40 bg-navy-900/50 p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-accent-500/40 hover:bg-navy-800/50 hover:shadow-2xl hover:shadow-accent-500/10 ${
                  isEcommerce ? "cursor-pointer" : ""
                } ${
                  inView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Hover glow */}
                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-accent-500/0 blur-2xl transition-all duration-500 group-hover:bg-accent-500/15" />

                <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-500/20 to-navy-700/40 ring-1 ring-accent-500/30 transition-all duration-500 group-hover:from-accent-500/30 group-hover:ring-accent-500/50">
                  <service.icon className="h-7 w-7 text-accent-400 transition-transform duration-500 group-hover:scale-110" />
                </span>

                <h3 className="relative mt-5 font-heading text-lg font-semibold text-white">
                  {service.title}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-navy-200">
                  {service.description}
                </p>

                <span className="relative mt-5 block h-px w-0 bg-gradient-to-r from-accent-500 to-transparent transition-all duration-500 group-hover:w-full" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

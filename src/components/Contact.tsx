import { useState, type FormEvent } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { supabase } from '../lib/supabase';

type Status = 'idle' | 'loading' | 'success' | 'error';

const WHATSAPP_NUMBER = '5500000000000'; // Replace with actual WhatsApp number

export default function Contact() {
  const { ref, inView } = useInView();
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const formElement = e.currentTarget;
    const formData = new FormData(formElement);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    };

    try {
      // 1. Envia os dados para o Supabase (Banco de Dados)
      const { error: supabaseError } = await supabase
        .from('contact_submissions')
        .insert([data]);

      if (supabaseError) {
        console.error('Erro no Supabase:', supabaseError);
      }

      // 2. Envia os dados para o Formspree (E-mail)
      const formspreeResponse = await fetch('https://formspree.io/f/mppawldp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // Se o Formspree responder com sucesso, considera o envio bem-sucedido
      if (formspreeResponse.ok) {
        setStatus('success');
        formElement.reset();
      } else {
        setStatus('error');
        setErrorMsg('Não foi possível enviar sua mensagem agora. Tente novamente ou fale conosco pelo WhatsApp.');
      }
    } catch (err) {
      console.error('Erro ao processar o formulário:', err);
      setStatus('error');
      setErrorMsg('Erro de conexão ao enviar a mensagem. Verifique sua internet.');
    }
  };

  return (
    <section id="contato" className="relative py-24 lg:py-32">
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-navy-600/50 to-transparent" />

      <div className="mx-auto max-w-7xl px-6">
        <div
          ref={ref}
          className={`grid gap-12 lg:grid-cols-2 lg:gap-16 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Info side */}
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-400">
              Contato
            </span>
            <h2 className="mt-3 font-heading text-3xl font-bold text-white sm:text-4xl">
              Vamos conversar sobre seu projeto
            </h2>
            <p className="mt-5 text-lg text-navy-200">
              Conte-nos sobre sua necessidade. Nosso time responde com
              agilidade e está pronto para ajudar a transformar sua ideia em
              solução.
            </p>

            <div className="mt-10 space-y-5">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-navy-700/40 bg-navy-900/50 p-5 transition-all duration-300 hover:border-success-500/40 hover:bg-navy-800/50"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-success-500/20 ring-1 ring-success-500/40">
                  <svg className="h-6 w-6 text-success-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                </span>
                <div>
                  <div className="font-heading text-base font-semibold text-white">WhatsApp</div>
                  <div className="text-sm text-navy-200">Converse diretamente com nosso time</div>
                </div>
              </a>

              <div className="flex items-center gap-4 rounded-2xl border border-navy-700/40 bg-navy-900/50 p-5">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-500/20 ring-1 ring-accent-500/40">
                  <svg className="h-6 w-6 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <div>
                  <div className="font-heading text-base font-semibold text-white">E-mail</div>
                  <div className="text-sm text-navy-200">protoncore.oficial@gmail.com</div>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-navy-700/40 bg-navy-900/50 p-5">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-500/20 ring-1 ring-accent-500/40">
                  <svg className="h-6 w-6 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
                <div>
                  <div className="font-heading text-base font-semibold text-white">Uberlândia, MG</div>
                  <div className="text-sm text-navy-200">Incubadora da Universidade Federal de Uberlândia</div>
                </div>
              </div>
            </div>
          </div>

          {/* Form side */}
          <div className="rounded-3xl border border-navy-700/50 bg-navy-900/60 p-6 backdrop-blur-sm sm:p-8">
            {status === 'success' ? (
              <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-success-500/20 ring-1 ring-success-500/40">
                  <CheckCircle2 className="h-8 w-8 text-success-500" />
                </span>
                <h3 className="mt-5 font-heading text-xl font-semibold text-white">
                  Mensagem enviada!
                </h3>
                <p className="mt-2 text-sm text-navy-200">
                  Obrigado pelo contato. Nossa equipe responderá em breve.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-6 rounded-full border border-navy-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-accent-500/50 hover:bg-navy-800"
                >
                  Enviar nova mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-navy-100">
                      Nome *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Seu nome completo"
                      className="w-full rounded-xl border border-navy-700/60 bg-navy-950/60 px-4 py-3 text-sm text-white placeholder:text-navy-300/60 transition-colors focus:border-accent-500/50 focus:outline-none focus:ring-2 focus:ring-accent-500/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="mb-2 block text-sm font-medium text-navy-100">
                      Telefone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="(00) 00000-0000"
                      className="w-full rounded-xl border border-navy-700/60 bg-navy-950/60 px-4 py-3 text-sm text-white placeholder:text-navy-300/60 transition-colors focus:border-accent-500/50 focus:outline-none focus:ring-2 focus:ring-accent-500/20"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-navy-100">
                    E-mail *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="seu@email.com"
                    className="w-full rounded-xl border border-navy-700/60 bg-navy-950/60 px-4 py-3 text-sm text-white placeholder:text-navy-300/60 transition-colors focus:border-accent-500/50 focus:outline-none focus:ring-2 focus:ring-accent-500/20"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="mb-2 block text-sm font-medium text-navy-100">
                    Assunto *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    defaultValue=""
                    className="w-full rounded-xl border border-navy-700/60 bg-navy-950/60 px-4 py-3 text-sm text-white transition-colors focus:border-accent-500/50 focus:outline-none focus:ring-2 focus:ring-accent-500/20"
                  >
                    <option value="" disabled>Selecione um serviço</option>
                    <option>P&D — Pesquisa & Desenvolvimento</option>
                    <option>Consultoria Técnica</option>
                    <option>Desenvolvimento de Produtos</option>
                    <option>Soluções Industriais</option>
                    <option>Assuntos Regulatórios</option>
                    <option>Tratamento de Água</option>
                    <option>Controle de Qualidade</option>
                    <option>Outro</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-navy-100">
                    Mensagem *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Descreva sua necessidade ou projeto..."
                    className="w-full resize-none rounded-xl border border-navy-700/60 bg-navy-950/60 px-4 py-3 text-sm text-white placeholder:text-navy-300/60 transition-colors focus:border-accent-500/50 focus:outline-none focus:ring-2 focus:ring-accent-500/20"
                  />
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent-500 px-6 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:bg-accent-600 hover:shadow-lg hover:shadow-accent-500/30 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar Mensagem
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
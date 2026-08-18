import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, Sparkles, Factory, Fuel, 
  Dog, Stethoscope, Car, ArrowLeft, Check, Truck, CreditCard, QrCode, 
  UserCheck, Plus, Minus, Loader2, MapPin, Mail, Copy
} from 'lucide-react';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Differentials from './components/Differentials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

export default function App() {
  const [paginaAtual, setPaginaAtual] = useState<'landing' | 'ecommerce' | 'cosmeticos' | 'checkout' | 'cadastro' | 'pagamento'>('landing');
  
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState<'3kg' | '5kg'>('5kg');
  const [quantidade, setQuantidade] = useState<number>(1);
  
  // 1. Dados Pessoais atualizados com CPF e Telefone pré-carregados
  const [dadosCadastro, setDadosCadastro] = useState({
    nome: 'Lucas De Assis Ribeiro',
    cpf: '123.456.789-00',
    email: 'lucasadv@edu.uniube.br',
    telefone: '(34) 99999-8888',
    cep: '38405381',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    uf: ''
  });

  // Dados do Cartão
  const [dadosCartao, setDadosCartao] = useState({
    nomeBanco: '',
    agencia: '',
    conta: '',
    cvv: '',
    parcelas: '1'
  });

  const [freteCalculado, setFreteCalculado] = useState<{ valor: number; prazo: string; servico: string } | null>(null);
  const [carregandoCep, setCarregandoCep] = useState<boolean>(false);
  const [carregandoFrete, setCarregandoFrete] = useState<boolean>(false);
  const [erroCep, setErroCep] = useState<string | null>(null);
  const [carrinhoSalvo, setCarrinhoSalvo] = useState<boolean>(false);
  const [pixCopiado, setPixCopiado] = useState<boolean>(false);

  const [metodoPagamento, setMetodoPagamento] = useState<'pix' | 'cartao'>('pix');
  const [midiaIndex] = useState<number>(0);

  const pathImagem = '/gemini-2.5-flash-image_Professional_studio_product_photo_focusing_on_a_SINGLE_large_5kg_transparent_gel-0.jpg';
  const pathVideo = '/Pippit_20260817_FisioGelPromo.mp4';

  const opcoesProduto = {
    '3kg': { label: '3 Kg — Refill Bag', priceNum: 18.00, price: 'R$ 18,00', oldPrice: 'R$ 30,00', image: pathImagem, video: pathVideo, pesoKg: 3 },
    '5kg': { label: '5 Kg — Refill Bag (Mais Econômico)', priceNum: 30.00, price: 'R$ 30,00', oldPrice: 'R$ 45,00', image: pathImagem, video: pathVideo, pesoKg: 5 }
  };

  const produtoAtual = opcoesProduto[tamanhoSelecionado];
  const valorSubtotal = produtoAtual.priceNum * quantidade;
  const valorFrete = freteCalculado ? freteCalculado.valor : 0;
  const valorTotal = valorSubtotal + valorFrete;

  // Regra de parcelamento para Cartão de Crédito
  const permiteParcelamento = valorTotal >= 1001.00;

  const categorias = [
    { id: 'cosmeticos', nome: 'Linha Cosméticos', icone: Sparkles, desc: 'Produtos avançados para cuidados, estética e terapia.' },
    { id: 'materia-prima', nome: 'Matéria Prima Industrial', icone: Factory, desc: 'Insumos de alta pureza para processos industriais.' },
    { id: 'combustivel', nome: 'Linha Combustível', icone: Fuel, desc: 'Soluções e aditivos para o setor de energia.' },
    { id: 'nutricao-animal', nome: 'Linha Nutrição Animal', icone: Dog, desc: 'Suplementação e insumos nutritivos de alta performance.' },
    { id: 'veterinaria', nome: 'Linha Veterinária', icone: Stethoscope, desc: 'Produtos técnicos direcionados à saúde animal.' },
    { id: 'automotiva', nome: 'Linha Automotiva', icone: Car, desc: 'Fluidos, aditivos e produtos para manutenção veicular.' },
  ];

  const midias = [
    { tipo: 'image', url: produtoAtual.image, alt: 'Imagem do Produto FisioGel' },
    { tipo: 'video', url: produtoAtual.video, alt: 'Vídeo Comercial FisioGel' }
  ];

  // Dispara busca automática do CEP e cálculo ao montar o componente se já existir CEP inicial
  useEffect(() => {
    if (dadosCadastro.cep && dadosCadastro.cep.length === 8 && !freteCalculado) {
      buscarEnderecoPorCep(dadosCadastro.cep);
    }
  }, []);

  const registrarIntencaoCompra = async (email: string, cep: string) => {
    if (!email || !email.includes('@') || carrinhoSalvo) return;
    try {
      console.log('Lead registrado para monitoramento de abandono:', { email, cep, produto: produtoAtual.label, valorTotal });
      setCarrinhoSalvo(true);
    } catch (err) {
      console.error('Erro ao registrar lead:', err);
    }
  };

  const buscarEnderecoPorCep = async (cepLimpo: string) => {
    if (cepLimpo.length !== 8) return;

    setCarregandoCep(true);
    setErroCep(null);

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await response.json();

      if (data.erro) {
        setErroCep('CEP não encontrado. Digite o endereço manualmente.');
      } else {
        setDadosCadastro((prev) => ({
          ...prev,
          logradouro: data.logradouro || '',
          bairro: data.bairro || '',
          cidade: data.localidade || '',
          uf: data.uf || '',
        }));
        
        calcularFreteMelhorEnvio(cepLimpo, data.uf);
        
        if (dadosCadastro.email) {
          registrarIntencaoCompra(dadosCadastro.email, cepLimpo);
        }
      }
    } catch {
      setErroCep('Erro ao consultar CEP. Tente novamente.');
    } finally {
      setCarregandoCep(false);
    }
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value.replace(/\D/g, '');
    setDadosCadastro((prev) => ({ ...prev, cep: valor }));
    setFreteCalculado(null);
    setErroCep(null);

    if (valor.length === 8) {
      buscarEnderecoPorCep(valor);
    }
  };

  const calcularFreteMelhorEnvio = (cepDestino: string, ufTarget: string) => {
    setCarregandoFrete(true);

    setTimeout(() => {
      const pesoTotalKg = produtoAtual.pesoKg * quantidade;
      let valorBase = 20.00;
      let prazoDias = '3 a 5 dias úteis';

      if (ufTarget === 'MG') {
        valorBase = 14.50 + (pesoTotalKg * 1.2);
        prazoDias = '2 a 3 dias úteis';
      } else if (['SP', 'RJ', 'ES', 'PR', 'SC', 'RS'].includes(ufTarget)) {
        valorBase = 22.90 + (pesoTotalKg * 1.8);
        prazoDias = '3 a 6 dias úteis';
      } else {
        valorBase = 35.00 + (pesoTotalKg * 2.5);
        prazoDias = '5 a 9 dias úteis';
      }

      setFreteCalculado({
        valor: Math.round(valorBase * 100) / 100,
        prazo: prazoDias,
        servico: 'Melhor Envio (Jadlog / Correios Express)'
      });
      setCarregandoFrete(false);
    }, 600);
  };

  const handleCadastroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!freteCalculado) {
      if (dadosCadastro.cep.length === 8) {
        calcularFreteMelhorEnvio(dadosCadastro.cep, dadosCadastro.uf || 'MG');
      } else {
        setErroCep('Insira um CEP válido para calcular o frete.');
        return;
      }
    }
    setPaginaAtual('pagamento');
  };

  const handleCopiarPix = () => {
    const payloadPix = `00020126580014BR.GOV.BCB.PIX0136protoncore-pagamentos-1234567895204000053039865405${valorTotal.toFixed(2)}5802BR5911PROTON CORE6009UBERLANDIA62070503***6304ABCD`;
    navigator.clipboard.writeText(payloadPix);
    setPixCopiado(true);
    setTimeout(() => setPixCopiado(false), 3000);
  };

  return (
    <>
      {paginaAtual === 'landing' && (
        <>
          <Navbar />
          <main>
            <Hero />
            <About />
            <Services onOpenEcommerce={() => setPaginaAtual('ecommerce')} />
            <Differentials />
            <Contact />
          </main>
          <Footer />
          <WhatsAppButton />
        </>
      )}

      {paginaAtual !== 'landing' && (
        <div className="min-h-screen bg-[#070b14] text-white font-sans selection:bg-cyan-500 selection:text-slate-950">
          <header className="flex justify-between items-center px-8 py-6 border-b border-slate-800/60 max-w-7xl mx-auto">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setPaginaAtual('landing')}>
              <img src="/logo.png" alt="Próton Core Logo" className="h-10 w-auto object-contain" />
            </div>
            <button 
              onClick={() => setPaginaAtual('landing')} 
              className="text-xs font-semibold text-slate-400 hover:text-white transition"
            >
              ✕ Sair do E-Commerce
            </button>
          </header>

          {paginaAtual === 'ecommerce' && (
            <main className="max-w-7xl mx-auto px-8 py-12">
              <button onClick={() => setPaginaAtual('landing')} className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium mb-8 transition">
                <ArrowLeft className="w-4 h-4" /> Voltar ao Site Principal
              </button>
              <div className="mb-12">
                <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-4 py-1.5 rounded-full border border-cyan-500/20">E-Commerce Próton Core</span>
                <h1 className="text-3xl font-extrabold mt-4 text-white">Selecione uma Categoria</h1>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categorias.map((item) => {
                  const Icone = item.icone;
                  return (
                    <div 
                      key={item.id}
                      onClick={() => { if (item.id === 'cosmeticos') setPaginaAtual('cosmeticos'); }}
                      className="bg-slate-900/50 border border-slate-800 hover:border-cyan-400 p-8 rounded-2xl cursor-pointer transition-all duration-300 hover:-translate-y-1 group"
                    >
                      <div className="w-14 h-14 bg-cyan-500/10 rounded-xl flex items-center justify-center border border-cyan-500/30 mb-6 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                        <Icone className="w-7 h-7 text-cyan-400 group-hover:text-slate-950 transition-colors" />
                      </div>
                      <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition">{item.nome}</h3>
                      <p className="text-slate-400 text-xs mt-2 leading-relaxed">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </main>
          )}

          {paginaAtual === 'cosmeticos' && (
            <main className="max-w-7xl mx-auto px-8 py-12">
              <button onClick={() => setPaginaAtual('ecommerce')} className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium mb-8 transition">
                <ArrowLeft className="w-4 h-4" /> Voltar para Categorias
              </button>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7">
                  <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl flex items-center justify-center min-h-[480px]">
                    {midias[midiaIndex].tipo === 'image' ? (
                      <img src={midias[midiaIndex].url} alt={midias[midiaIndex].alt} className="max-h-[500px] object-contain rounded-xl" />
                    ) : (
                      <video controls autoPlay muted loop className="max-h-[500px] object-contain rounded-xl" src={midias[midiaIndex].url} />
                    )}
                  </div>
                </div>
                <div className="lg:col-span-5 bg-slate-900/50 border border-slate-800 p-8 rounded-2xl">
                  <h2 className="text-2xl font-bold text-white">FisioGel Bell Fleur (5kg)</h2>
                  <div className="mt-6 p-4 bg-slate-950/60 rounded-xl border border-slate-800">
                    <span className="text-3xl font-extrabold text-cyan-400">R$ 30,00</span>
                  </div>
                  <button onClick={() => setPaginaAtual('checkout')} className="w-full mt-8 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2">
                    <ShoppingCart className="w-5 h-5" /> Comprar Agora
                  </button>
                </div>
              </div>
            </main>
          )}

          {paginaAtual === 'checkout' && (
            <main className="max-w-7xl mx-auto px-8 py-12">
              <button onClick={() => setPaginaAtual('cosmeticos')} className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium mb-8 transition">
                <ArrowLeft className="w-4 h-4" /> Voltar para o Produto
              </button>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7">
                  <img src={produtoAtual.image} alt="Produto" className="w-full rounded-2xl border border-slate-800" />
                </div>
                <div className="lg:col-span-5 bg-slate-900/50 border border-slate-800 p-8 rounded-2xl space-y-6">
                  <h2 className="text-2xl font-bold text-white">FisioGel Bell Fleur</h2>
                  <div>
                    {(Object.keys(opcoesProduto) as Array<keyof typeof opcoesProduto>).map((key) => (
                      <div 
                        key={key} 
                        onClick={() => setTamanhoSelecionado(key)}
                        className={`p-4 rounded-xl border cursor-pointer flex justify-between mb-2 ${tamanhoSelecionado === key ? 'border-cyan-500 bg-cyan-500/10' : 'border-slate-800 bg-slate-950/40'}`}
                      >
                        <div>
                          <p className="font-bold text-sm text-white">{opcoesProduto[key].label}</p>
                          <p className="text-xs text-slate-400 line-through">{opcoesProduto[key].oldPrice}</p>
                        </div>
                        <span className="text-lg font-extrabold text-cyan-400">{opcoesProduto[key].price}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 bg-slate-950/60 p-2 rounded-xl border border-slate-800 w-fit">
                    <button onClick={() => setQuantidade(Math.max(1, quantidade - 1))} className="p-2 text-cyan-400"><Minus className="w-4 h-4" /></button>
                    <span className="text-lg font-bold text-white px-4">{quantidade}</span>
                    <button onClick={() => setQuantidade(quantidade + 1)} className="p-2 text-cyan-400"><Plus className="w-4 h-4" /></button>
                  </div>
                  <button onClick={() => setPaginaAtual('cadastro')} className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2">
                    <ShoppingCart className="w-5 h-5" /> Confirmar Pedido (R$ {valorSubtotal.toFixed(2)})
                  </button>
                </div>
              </div>
            </main>
          )}

          {/* 1. TELA DE CADASTRO E ENDEREÇO NA ORDEM PEDIDA */}
          {paginaAtual === 'cadastro' && (
            <main className="max-w-4xl mx-auto px-8 py-12">
              <button onClick={() => setPaginaAtual('checkout')} className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium mb-8 transition">
                <ArrowLeft className="w-4 h-4" /> Voltar para Seleção
              </button>
              
              <form onSubmit={handleCadastroSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-900/50 border border-slate-800 p-8 rounded-2xl">
                <div className="md:col-span-2">
                  <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-2">Dados Pessoais e Endereço</h2>
                </div>

                {/* Nome */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-400">Nome Completo</label>
                  <input 
                    required 
                    type="text" 
                    placeholder="Nome Completo" 
                    value={dadosCadastro.nome} 
                    onChange={(e) => setDadosCadastro({ ...dadosCadastro, nome: e.target.value })} 
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500" 
                  />
                </div>

                {/* CPF */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-400">CPF</label>
                  <input 
                    required 
                    type="text" 
                    placeholder="000.000.000-00" 
                    value={dadosCadastro.cpf} 
                    onChange={(e) => setDadosCadastro({ ...dadosCadastro, cpf: e.target.value })} 
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500" 
                  />
                </div>

                {/* E-mail */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-400">E-mail</label>
                  <input 
                    required 
                    type="email" 
                    placeholder="seu.email@exemplo.com" 
                    value={dadosCadastro.email} 
                    onBlur={(e) => registrarIntencaoCompra(e.target.value, dadosCadastro.cep)}
                    onChange={(e) => setDadosCadastro({ ...dadosCadastro, email: e.target.value })} 
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500" 
                  />
                </div>

                {/* Telefone */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-400">Número de Telefone</label>
                  <input 
                    required 
                    type="text" 
                    placeholder="(00) 00000-0000" 
                    value={dadosCadastro.telefone} 
                    onChange={(e) => setDadosCadastro({ ...dadosCadastro, telefone: e.target.value })} 
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500" 
                  />
                </div>

                {/* CEP e Busca Imadiata */}
                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-medium text-slate-400">CEP (Busca Automática)</label>
                  <div className="flex gap-2">
                    <div className="relative w-full">
                      <input 
                        required 
                        type="text" 
                        maxLength={8}
                        placeholder="Digite o CEP (Ex: 38405381)" 
                        value={dadosCadastro.cep} 
                        onChange={handleCepChange} 
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500" 
                      />
                      {carregandoCep && (
                        <Loader2 className="w-4 h-4 text-cyan-400 animate-spin absolute right-3 top-3" />
                      )}
                    </div>
                    
                    <button 
                      type="button" 
                      onClick={() => {
                        if (dadosCadastro.cep.length === 8) {
                          buscarEnderecoPorCep(dadosCadastro.cep);
                        } else {
                          setErroCep('Digite um CEP de 8 dígitos');
                        }
                      }} 
                      disabled={carregandoFrete || dadosCadastro.cep.length < 8}
                      className="bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 disabled:opacity-40 text-cyan-400 text-xs px-5 rounded-lg font-semibold flex items-center justify-center gap-1.5 transition whitespace-nowrap"
                    >
                      {carregandoFrete ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Truck className="w-4 h-4" />
                      )}
                      Calcular Frete
                    </button>
                  </div>
                </div>

                {erroCep && (
                  <p className="md:col-span-2 text-xs text-rose-400">{erroCep}</p>
                )}

                {/* Logradouro/Rua preenchido pelo ViaCEP */}
                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-medium text-slate-400">Rua / Logradouro</label>
                  <input 
                    required 
                    type="text" 
                    placeholder="Rua / Logradouro" 
                    value={dadosCadastro.logradouro} 
                    onChange={(e) => setDadosCadastro({ ...dadosCadastro, logradouro: e.target.value })} 
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500" 
                  />
                </div>

                {/* Número da Residência (Livre para preenchimento) */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-400">Número Residencial</label>
                  <input 
                    required 
                    type="text" 
                    placeholder="Ex: 1050" 
                    value={dadosCadastro.numero} 
                    onChange={(e) => setDadosCadastro({ ...dadosCadastro, numero: e.target.value })} 
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500" 
                  />
                </div>

                {/* Complemento (Livre para preenchimento - casa, apto, etc) */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-400">Complemento</label>
                  <input 
                    type="text" 
                    placeholder="Ex: Casa, Apto 302, Bloco B" 
                    value={dadosCadastro.complemento} 
                    onChange={(e) => setDadosCadastro({ ...dadosCadastro, complemento: e.target.value })} 
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500" 
                  />
                </div>

                {/* Bairro, Cidade e UF */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-400">Bairro</label>
                  <input 
                    required 
                    type="text" 
                    placeholder="Bairro" 
                    value={dadosCadastro.bairro} 
                    onChange={(e) => setDadosCadastro({ ...dadosCadastro, bairro: e.target.value })} 
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500" 
                  />
                </div>

                <div className="flex gap-2">
                  <div className="space-y-1 w-full">
                    <label className="text-xs font-medium text-slate-400">Cidade</label>
                    <input 
                      required 
                      type="text" 
                      placeholder="Cidade" 
                      value={dadosCadastro.cidade} 
                      onChange={(e) => setDadosCadastro({ ...dadosCadastro, cidade: e.target.value })} 
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500" 
                    />
                  </div>
                  <div className="space-y-1 w-24">
                    <label className="text-xs font-medium text-slate-400">UF</label>
                    <input 
                      required 
                      type="text" 
                      placeholder="UF" 
                      maxLength={2}
                      value={dadosCadastro.uf} 
                      onChange={(e) => setDadosCadastro({ ...dadosCadastro, uf: e.target.value.toUpperCase() })} 
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-sm text-white uppercase text-center focus:outline-none focus:border-cyan-500" 
                    />
                  </div>
                </div>

                {freteCalculado && (
                  <div className="md:col-span-2 bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-cyan-500/20 rounded-lg text-cyan-400">
                        <Truck className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{freteCalculado.servico}</p>
                        <p className="text-xs text-slate-400">Entrega estimada: <span className="text-cyan-400 font-semibold">{freteCalculado.prazo}</span></p>
                      </div>
                    </div>
                    <span className="text-lg font-extrabold text-cyan-400">R$ {freteCalculado.valor.toFixed(2)}</span>
                  </div>
                )}

                <button 
                  type="submit" 
                  className="md:col-span-2 w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition"
                >
                  <UserCheck className="w-5 h-5" /> Concluir Cadastro e Ir para Pagamento
                </button>
              </form>
            </main>
          )}

          {/* 2. TELA DE PAGAMENTO (PIX DINÂMICO E CARTÃO COM DADOS AUTOMÁTICOS) */}
          {paginaAtual === 'pagamento' && (
            <main className="max-w-4xl mx-auto px-8 py-12">
              <button onClick={() => setPaginaAtual('cadastro')} className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium mb-8 transition">
                <ArrowLeft className="w-4 h-4" /> Voltar para Cadastro
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-span-7 bg-slate-900/50 border border-slate-800 p-8 rounded-2xl space-y-6">
                  <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-2">Forma de Pagamento</h2>
                  
                  {/* Seleção do Método */}
                  <div className="grid grid-cols-2 gap-4">
                    <div 
                      onClick={() => setMetodoPagamento('pix')} 
                      className={`p-4 rounded-xl border cursor-pointer text-center transition ${metodoPagamento === 'pix' ? 'border-cyan-500 bg-cyan-500/10' : 'border-slate-800 bg-slate-950/40'}`}
                    >
                      <QrCode className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                      <p className="font-bold text-sm text-white">Pix à Vista</p>
                    </div>

                    <div 
                      onClick={() => setMetodoPagamento('cartao')} 
                      className={`p-4 rounded-xl border cursor-pointer text-center transition ${metodoPagamento === 'cartao' ? 'border-cyan-500 bg-cyan-500/10' : 'border-slate-800 bg-slate-950/40'}`}
                    >
                      <CreditCard className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                      <p className="font-bold text-sm text-white">Cartão de Crédito</p>
                    </div>
                  </div>

                  {/* OPÇÃO PIX COM CÓDIGO AUTOMÁTICO VINCULADO AO BANCO E VALOR TOTAL */}
                  {metodoPagamento === 'pix' && (
                    <div className="bg-slate-950 border border-slate-800 p-6 rounded-xl space-y-4 text-center">
                      <p className="text-xs text-slate-400">Escaneie o QR Code abaixo ou copie a chave Pix vinculada ao valor de <strong className="text-cyan-400">R$ {valorTotal.toFixed(2)}</strong>:</p>
                      
                      <div className="bg-white p-4 w-44 h-44 mx-auto rounded-xl flex items-center justify-center border-2 border-cyan-500">
                        <img 
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=protoncore-pix-${valorTotal.toFixed(2)}`} 
                          alt="QR Code Pix" 
                          className="w-full h-full object-contain"
                        />
                      </div>

                      <div className="space-y-2">
                        <p className="text-xs font-mono text-slate-400 bg-slate-900 p-2.5 rounded-lg border border-slate-800 truncate">
                          00020126580014BR.GOV.BCB.PIX0136protoncore-pagamentos-1234567895204000053039865405{valorTotal.toFixed(2)}5802BR
                        </p>
                        <button 
                          onClick={handleCopiarPix}
                          className="w-full bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 font-bold text-xs py-2.5 rounded-lg border border-cyan-500/40 flex items-center justify-center gap-2 transition"
                        >
                          {pixCopiado ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                          {pixCopiado ? 'Código Pix Copiado!' : 'Copiar Código Pix'}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* OPÇÃO CARTÃO COM DADOS AUTOMÁTICOS E CAMPOS DE BANCO/AG/CONTA/CVV */}
                  {metodoPagamento === 'cartao' && (
                    <div className="bg-slate-950 border border-slate-800 p-6 rounded-xl space-y-4">
                      {/* Dados Preenchidos Automatizados */}
                      <div className="grid grid-cols-2 gap-4 bg-slate-900/60 p-3 rounded-lg border border-slate-800/80">
                        <div>
                          <span className="text-[10px] text-slate-500 block uppercase font-semibold">Titular (Automático)</span>
                          <span className="text-xs text-white font-medium">{dadosCadastro.nome}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 block uppercase font-semibold">CPF (Automático)</span>
                          <span className="text-xs text-white font-medium">{dadosCadastro.cpf}</span>
                        </div>
                      </div>

                      {/* Campos Livres para Preenchimento */}
                      <div className="space-y-3">
                        <div>
                          <label className="text-xs font-medium text-slate-400">Nome do Banco Emitente</label>
                          <input 
                            type="text" 
                            placeholder="Ex: Itaú, Bradesco, Nubank" 
                            value={dadosCartao.nomeBanco}
                            onChange={(e) => setDadosCartao({ ...dadosCartao, nomeBanco: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500" 
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs font-medium text-slate-400">Agência</label>
                            <input 
                              type="text" 
                              placeholder="0000" 
                              value={dadosCartao.agencia}
                              onChange={(e) => setDadosCartao({ ...dadosCartao, agencia: e.target.value })}
                              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500" 
                            />
                          </div>
                          <div>
                            <label className="text-xs font-medium text-slate-400">Conta / Cartão</label>
                            <input 
                              type="text" 
                              placeholder="00000-0" 
                              value={dadosCartao.conta}
                              onChange={(e) => setDadosCartao({ ...dadosCartao, conta: e.target.value })}
                              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500" 
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-xs font-medium text-slate-400">Código de Segurança (3 números)</label>
                          <input 
                            type="text" 
                            maxLength={3}
                            placeholder="123" 
                            value={dadosCartao.cvv}
                            onChange={(e) => setDadosCartao({ ...dadosCartao, cvv: e.target.value.replace(/\D/g, '') })}
                            className="w-32 bg-slate-900 border border-slate-800 rounded-lg px-3.5 py-2 text-xs text-white text-center focus:outline-none focus:border-cyan-500" 
                          />
                        </div>

                        {/* Opções de Parcelamento com Regra baseada em R$ 1.000,00 */}
                        <div className="pt-2">
                          <label className="text-xs font-medium text-slate-400">Opções de Parcelamento</label>
                          {permiteParcelamento ? (
                            <select 
                              value={dadosCartao.parcelas}
                              onChange={(e) => setDadosCartao({ ...dadosCartao, parcelas: e.target.value })}
                              className="w-full bg-slate-900 border border-cyan-500/40 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none"
                            >
                              <option value="1">1x de R$ {valorTotal.toFixed(2)} (À vista sem juros)</option>
                              <option value="2">2x de R$ {(valorTotal / 2).toFixed(2)} sem juros</option>
                              <option value="3">3x de R$ {(valorTotal / 3).toFixed(2)} sem juros</option>
                            </select>
                          ) : (
                            <div className="bg-slate-900/80 border border-slate-800 p-2.5 rounded-lg text-xs text-slate-300">
                              À vista — <span className="text-cyan-400 font-bold">1x de R$ {valorTotal.toFixed(2)}</span>
                              <span className="block text-[10px] text-slate-500 mt-0.5">*Parcelamento em até 3x sem juros disponível para compras acima de R$ 1.001,00.</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Resumo do Pedido */}
                <div className="md:col-span-5 bg-slate-900/50 border border-slate-800 p-6 rounded-2xl space-y-4">
                  <h3 className="font-bold text-white border-b border-slate-800 pb-2">Resumo</h3>
                  <div className="flex justify-between text-xs text-slate-400"><span>Produto ({quantidade}x)</span><span>R$ {valorSubtotal.toFixed(2)}</span></div>
                  <div className="flex justify-between text-xs text-slate-400"><span>Frete</span><span>R$ {valorFrete.toFixed(2)}</span></div>
                  <div className="flex justify-between text-sm text-slate-200 font-bold border-t border-slate-800 pt-2">
                    <span>Total</span>
                    <span className="text-cyan-400 text-lg">R$ {valorTotal.toFixed(2)}</span>
                  </div>
                  <button className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-3.5 rounded-xl transition">
                    Pagar Agora
                  </button>
                </div>
              </div>
            </main>
          )}

        </div>
      )}
    </>
  );
}
import React, { useState } from 'react';
import { 
  ShoppingCart, Sparkles, Factory, Fuel, 
  Dog, Stethoscope, Car, ArrowLeft, Check, Truck, CreditCard, QrCode, 
  UserCheck, Plus, Minus, Loader2, MapPin
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
  // Controle de exibição: 'landing' (padrão original) ou telas do E-Commerce
  const [paginaAtual, setPaginaAtual] = useState<'landing' | 'ecommerce' | 'cosmeticos' | 'checkout' | 'cadastro' | 'pagamento'>('landing');
  
  // Estados do E-Commerce
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState<'3kg' | '5kg'>('5kg');
  const [quantidade, setQuantidade] = useState<number>(1);
  const [dadosCadastro, setDadosCadastro] = useState({
    nome: '', email: '', telefone: '', cep: '', logradouro: '', numero: '', complemento: '', bairro: '', cidade: '', uf: ''
  });
  
  // Estados de Frete e Busca de Endereço
  const [freteCalculado, setFreteCalculado] = useState<{ valor: number; prazo: string; servico: string } | null>(null);
  const [carregandoCep, setCarregandoCep] = useState<boolean>(false);
  const [carregandoFrete, setCarregandoFrete] = useState<boolean>(false);
  const [erroCep, setErroCep] = useState<string | null>(null);

  const [metodoPagamento, setMetodoPagamento] = useState<'pix' | 'cartao'>('pix');
  const [midiaIndex] = useState<number>(0);

  // Mídias e Opções de Produto
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
  const permiteCartao = valorTotal >= 1000;

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

  // Busca Automática de Endereço via ViaCEP
  const buscarEnderecoPorCep = async (cepLimpo: string) => {
    if (cepLimpo.length !== 8) return;

    setCarregandoCep(true);
    setErroCep(null);

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await response.json();

      if (data.erro) {
        setErroCep('CEP não encontrado.');
      } else {
        setDadosCadastro((prev) => ({
          ...prev,
          logradouro: data.logradouro || '',
          bairro: data.bairro || '',
          cidade: data.localidade || '',
          uf: data.uf || '',
        }));
        // Executa o cálculo de frete automaticamente após encontrar o endereço
        calcularFreteEPrazo(data.uf);
      }
    } catch {
      setErroCep('Erro ao buscar o CEP. Tente novamente.');
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

  // Lógica Dinâmica de Cálculo de Frete e Prazo
  const calcularFreteEPrazo = (ufFornecida?: string) => {
    const cepLimpo = dadosCadastro.cep.replace(/\D/g, '');
    if (cepLimpo.length < 8) {
      setErroCep('Por favor, informe um CEP válido com 8 dígitos.');
      return;
    }

    setCarregandoFrete(true);
    const ufTarget = ufFornecida || dadosCadastro.uf || 'MG';

    // Simulação com base na região/estado + peso do pedido
    setTimeout(() => {
      const pesoTotalKg = produtoAtual.pesoKg * quantidade;
      let valorBase = 22.00;
      let prazoDias = '3 a 5 dias úteis';

      if (ufTarget === 'MG') {
        valorBase = 15.00 + (pesoTotalKg * 1.5);
        prazoDias = '2 a 3 dias úteis';
      } else if (['SP', 'RJ', 'ES', 'PR', 'SC', 'RS', 'GO', 'DF'].includes(ufTarget)) {
        valorBase = 25.00 + (pesoTotalKg * 2.0);
        prazoDias = '4 a 6 dias úteis';
      } else {
        valorBase = 38.00 + (pesoTotalKg * 3.0);
        prazoDias = '6 a 9 dias úteis';
      }

      setFreteCalculado({
        valor: Math.round(valorBase * 100) / 100,
        prazo: prazoDias,
        servico: 'Transportadora Expressa / Correios'
      });
      setCarregandoFrete(false);
    }, 600);
  };

  const handleCadastroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!freteCalculado) {
      calcularFreteEPrazo();
    }
    setPaginaAtual('pagamento');
  };

  return (
    <>
      {/* 1. LANDING PAGE ORIGINAL (100% Inalterada) */}
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

      {/* 2. FLUXO DO E-COMMERCE */}
      {paginaAtual !== 'landing' && (
        <div className="min-h-screen bg-[#070b14] text-white font-sans selection:bg-cyan-500 selection:text-slate-950">
          
          {/* Header E-Commerce com a Logo Oficial Mantida */}
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

          {/* Categorias */}
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

          {/* Produto */}
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

          {/* Checkout */}
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

          {/* Cadastro & Frete */}
          {paginaAtual === 'cadastro' && (
            <main className="max-w-4xl mx-auto px-8 py-12">
              <button onClick={() => setPaginaAtual('checkout')} className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium mb-8 transition">
                <ArrowLeft className="w-4 h-4" /> Voltar para Seleção
              </button>
              
              <form onSubmit={handleCadastroSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-900/50 border border-slate-800 p-8 rounded-2xl">
                <div className="md:col-span-2">
                  <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-2">Dados Pessoais e Endereço</h2>
                </div>

                <input 
                  required 
                  type="text" 
                  placeholder="Nome Completo" 
                  value={dadosCadastro.nome} 
                  onChange={(e) => setDadosCadastro({ ...dadosCadastro, nome: e.target.value })} 
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500" 
                />

                <input 
                  required 
                  type="email" 
                  placeholder="E-mail" 
                  value={dadosCadastro.email} 
                  onChange={(e) => setDadosCadastro({ ...dadosCadastro, email: e.target.value })} 
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500" 
                />

                <input 
                  required 
                  type="text" 
                  placeholder="Telefone / WhatsApp" 
                  value={dadosCadastro.telefone} 
                  onChange={(e) => setDadosCadastro({ ...dadosCadastro, telefone: e.target.value })} 
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500" 
                />

                {/* Bloco de CEP + Botão de Cálculo */}
                <div className="flex gap-2">
                  <div className="relative w-full">
                    <input 
                      required 
                      type="text" 
                      maxLength={8}
                      placeholder="CEP (somente números)" 
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
                    onClick={() => calcularFreteEPrazo()} 
                    disabled={carregandoFrete || dadosCadastro.cep.length < 8}
                    className="bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-cyan-400 text-xs px-4 rounded-lg font-semibold flex items-center justify-center gap-1.5 transition whitespace-nowrap"
                  >
                    {carregandoFrete ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Truck className="w-4 h-4" />
                    )}
                    Calcular Frete
                  </button>
                </div>

                {erroCep && (
                  <p className="md:col-span-2 text-xs text-rose-400">{erroCep}</p>
                )}

                {/* Campos do Endereço preenchidos automaticamente */}
                <input 
                  required 
                  type="text" 
                  placeholder="Rua / Logradouro" 
                  value={dadosCadastro.logradouro} 
                  onChange={(e) => setDadosCadastro({ ...dadosCadastro, logradouro: e.target.value })} 
                  className="md:col-span-2 w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500" 
                />

                <input 
                  required 
                  type="text" 
                  placeholder="Número" 
                  value={dadosCadastro.numero} 
                  onChange={(e) => setDadosCadastro({ ...dadosCadastro, numero: e.target.value })} 
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500" 
                />

                <input 
                  type="text" 
                  placeholder="Complemento (Opcional)" 
                  value={dadosCadastro.complemento} 
                  onChange={(e) => setDadosCadastro({ ...dadosCadastro, complemento: e.target.value })} 
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500" 
                />

                <input 
                  required 
                  type="text" 
                  placeholder="Bairro" 
                  value={dadosCadastro.bairro} 
                  onChange={(e) => setDadosCadastro({ ...dadosCadastro, bairro: e.target.value })} 
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500" 
                />

                <div className="flex gap-2">
                  <input 
                    required 
                    type="text" 
                    placeholder="Cidade" 
                    value={dadosCadastro.cidade} 
                    onChange={(e) => setDadosCadastro({ ...dadosCadastro, cidade: e.target.value })} 
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500" 
                  />
                  <input 
                    required 
                    type="text" 
                    placeholder="UF" 
                    maxLength={2}
                    value={dadosCadastro.uf} 
                    onChange={(e) => setDadosCadastro({ ...dadosCadastro, uf: e.target.value.toUpperCase() })} 
                    className="w-20 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-sm text-white uppercase text-center focus:outline-none focus:border-cyan-500" 
                  />
                </div>

                {/* Exibição do Frete Calculado */}
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

          {/* Pagamento */}
          {paginaAtual === 'pagamento' && (
            <main className="max-w-4xl mx-auto px-8 py-12">
              <button onClick={() => setPaginaAtual('cadastro')} className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium mb-8 transition">
                <ArrowLeft className="w-4 h-4" /> Voltar para Cadastro
              </button>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-span-7 bg-slate-900/50 border border-slate-800 p-8 rounded-2xl space-y-6">
                  <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-2">Forma de Pagamento</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div onClick={() => setMetodoPagamento('pix')} className={`p-4 rounded-xl border cursor-pointer text-center ${metodoPagamento === 'pix' ? 'border-cyan-500 bg-cyan-500/10' : 'border-slate-800'}`}>
                      <QrCode className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                      <p className="font-bold text-sm text-white">Pix à Vista</p>
                    </div>
                    <div onClick={() => { if (permiteCartao) setMetodoPagamento('cartao'); }} className={`p-4 rounded-xl border text-center ${!permiteCartao ? 'opacity-40 cursor-not-allowed' : metodoPagamento === 'cartao' ? 'border-cyan-500 bg-cyan-500/10' : 'border-slate-800'}`}>
                      <CreditCard className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                      <p className="font-bold text-sm text-white">Cartão de Crédito</p>
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-5 bg-slate-900/50 border border-slate-800 p-6 rounded-2xl space-y-4">
                  <h3 className="font-bold text-white border-b border-slate-800 pb-2">Resumo do Pedido</h3>
                  <div className="flex justify-between text-xs text-slate-400"><span>Produto ({quantidade}x)</span><span>R$ {valorSubtotal.toFixed(2)}</span></div>
                  <div className="flex justify-between text-xs text-slate-400"><span>Frete</span><span>R$ {valorFrete.toFixed(2)}</span></div>
                  <div className="flex justify-between text-sm text-slate-200 font-bold border-t border-slate-800 pt-2"><span>Total</span><span className="text-cyan-400">R$ {valorTotal.toFixed(2)}</span></div>
                  <button className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-3.5 rounded-xl transition">Pagar Agora</button>
                </div>
              </div>
            </main>
          )}

        </div>
      )}
    </>
  );
}
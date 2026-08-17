import React, { useState } from 'react'
import { 
  ShoppingCart, FlaskConical, ClipboardCheck, Sparkles, Factory, Fuel, 
  Dog, Stethoscope, Car, ArrowLeft, CheckCircle2, Play, ShieldCheck, 
  Award, Check, Truck, CreditCard, QrCode, UserCheck, Plus, Minus,
  Box, Cpu, FileText, Droplets, Gauge
} from 'lucide-react'

export default function App() {
  const [paginaAtual, setPaginaAtual] = useState<'home' | 'ecommerce' | 'cosmeticos' | 'checkout' | 'cadastro' | 'pagamento'>('home')
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState<'3kg' | '5kg'>('5kg')
  const [quantidade, setQuantidade] = useState<number>(1)
  
  // Estado do formulário de cadastro e entrega
  const [dadosCadastro, setDadosCadastro] = useState({
    nome: '',
    email: '',
    telefone: '',
    cep: '',
    logradouro: '',
    numero: '',
    bairro: '',
    cidade: '',
    uf: ''
  })

  // Estado do frete
  const [freteCalculado, setFreteCalculado] = useState<{ valor: number; prazo: string } | null>(null)

  // Estado de pagamento
  const [metodoPagamento, setMetodoPagamento] = useState<'pix' | 'cartao'>('pix')
  const [parcelas, setParcelas] = useState<number>(1)

  // Estado para o carrossel (0 = Foto, 1 = Vídeo)
  const [midiaIndex, setMidiaIndex] = useState<number>(0)

  // Caminhos das mídias
  const pathImagem = '/gemini-2.5-flash-image_Professional_studio_product_photo_focusing_on_a_SINGLE_large_5kg_transparent_gel-0.jpg'
  const pathVideo = '/Pippit_20260817_FisioGelPromo.mp4'

  const opcoesProduto = {
    '3kg': {
      label: '3 Kg — Refill Bag',
      priceNum: 18.00,
      price: 'R$ 18,00',
      oldPrice: 'R$ 30,00',
      image: pathImagem,
      video: pathVideo
    },
    '5kg': {
      label: '5 Kg — Refill Bag (Mais Econômico)',
      priceNum: 30.00,
      price: 'R$ 30,00',
      oldPrice: 'R$ 45,00',
      image: pathImagem,
      video: pathVideo
    }
  }

  const produtoAtual = opcoesProduto[tamanhoSelecionado]
  const valorSubtotal = produtoAtual.priceNum * quantidade
  const valorFrete = freteCalculado ? freteCalculado.valor : 0
  const valorTotal = valorSubtotal + valorFrete

  const permiteCartao = valorTotal >= 1000

  // Categorias do E-Commerce
  const categoriasEcommerce = [
    { id: 'cosmeticos', nome: 'Linha Cosméticos', icone: Sparkles, desc: 'Produtos avançados para cuidados, estética e terapia.' },
    { id: 'materia-prima', nome: 'Matéria Prima Industrial', icone: Factory, desc: 'Insumos de alta pureza para processos industriais.' },
    { id: 'combustivel', nome: 'Linha Combustível', icone: Fuel, desc: 'Soluções e aditivos para o setor de energia.' },
    { id: 'nutricao-animal', nome: 'Linha Nutrição Animal', icone: Dog, desc: 'Suplementação e insumos nutritivos de alta performance.' },
    { id: 'veterinaria', nome: 'Linha Veterinária', icone: Stethoscope, desc: 'Produtos técnicos direcionados à saúde animal.' },
    { id: 'automotiva', nome: 'Linha Automotiva', icone: Car, desc: 'Fluidos, aditivos e produtos para manutenção veicular.' },
  ]

  const midias = [
    { tipo: 'image', url: produtoAtual.image, alt: 'Imagem do Produto FisioGel' },
    { tipo: 'video', url: produtoAtual.video, alt: 'Vídeo Comercial FisioGel' }
  ]

  const calcularFreteEPrazo = () => {
    if (dadosCadastro.cep.length >= 8) {
      setFreteCalculado({
        valor: 25.00,
        prazo: '3 a 5 dias úteis'
      })
    }
  }

  const handleCadastroSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!freteCalculado) {
      calcularFreteEPrazo()
    }
    setPaginaAtual('pagamento')
  }

  return (
    <div className="min-h-screen bg-[#050914] text-white font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Cabeçalho Fixo do Site */}
      <header className="flex justify-between items-center px-8 py-6 border-b border-slate-800/60 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setPaginaAtual('home')}>
          <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center border border-cyan-500/30">
            <span className="text-cyan-400 font-bold text-xl">P</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-white">Próton Core</span>
        </div>

        <nav className="flex items-center gap-8 text-slate-300 text-sm">
          <button onClick={() => setPaginaAtual('home')} className="hover:text-cyan-400 transition">Início</button>
          <button onClick={() => setPaginaAtual('home')} className="hover:text-cyan-400 transition">Sobre</button>
          <button onClick={() => setPaginaAtual('home')} className="hover:text-cyan-400 transition">Serviços</button>
          <button onClick={() => setPaginaAtual('home')} className="hover:text-cyan-400 transition">Diferenciais</button>
          <button onClick={() => setPaginaAtual('home')} className="hover:text-cyan-400 transition">Contato</button>
          
          <button 
            onClick={() => setPaginaAtual('ecommerce')} 
            className="px-5 py-2 rounded-full font-medium bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition shadow-md shadow-cyan-500/20"
          >
            E-Commerce
          </button>
        </nav>
      </header>

      {/* Página Inicial - Nossos Serviços (Imagem 2) */}
      {paginaAtual === 'home' && (
        <main className="max-w-7xl mx-auto px-8 py-16">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">
              Nossos Serviços
            </span>
            <h1 className="text-4xl font-extrabold mt-4 text-white tracking-tight">
              Soluções completas em ciência e tecnologia
            </h1>
            <p className="text-slate-400 max-w-2xl mx-auto mt-4 text-sm leading-relaxed">
              Sete áreas de atuação que cobrem todo o ciclo de inovação — da pesquisa ao produto, do laboratório à indústria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card E-Commerce - Clicável */}
            <div 
              onClick={() => setPaginaAtual('ecommerce')}
              className="bg-slate-900/40 border border-slate-800 hover:border-cyan-500/50 p-8 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 group"
            >
              <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center border border-cyan-500/30 mb-6 group-hover:scale-110 transition-transform">
                <ShoppingCart className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition">E-Commerce</h3>
              <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                Plataformas de vendas online modernas, seguras e integradas para o seu negócio.
              </p>
            </div>

            <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center border border-cyan-500/30 mb-6">
                <FlaskConical className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white">P&DI - Pesquisa, Desenvolvimento e Inovação</h3>
              <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                Desenvolvimento de novas tecnologias, produtos e processos com base científica. Da ideação ao protótipo funcional.
              </p>
            </div>

            <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center border border-cyan-500/30 mb-6">
                <ClipboardCheck className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Consultoria Técnica</h3>
              <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                Assessoria especializada em projetos científicos e industriais, com análises técnicas, diagnósticos e recomendações.
              </p>
            </div>

            <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center border border-cyan-500/30 mb-6">
                <Box className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Desenvolvimento de Produtos</h3>
              <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                Do conceito ao produto final: design, formulação, prototipagem e validação para levar sua ideia ao mercado.
              </p>
            </div>

            <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center border border-cyan-500/30 mb-6">
                <Factory className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Soluções Industriais</h3>
              <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                Otimização de processos produtivos, automação e tecnologias aplicadas para aumentar eficiência e reduzir custos.
              </p>
            </div>

            <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center border border-cyan-500/30 mb-6">
                <FileText className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Assuntos Regulatórios</h3>
              <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                Suporte completo em conformidade normativa, registros, documentação técnica e adequação às exigências regulatórias.
              </p>
            </div>

            <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center border border-cyan-500/30 mb-6">
                <Droplets className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Tratamento de Água Industrial</h3>
              <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                Projetos e soluções para tratamento e gestão de recursos hídricos, com foco em sustentabilidade e eficiência.
              </p>
            </div>

            <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center border border-cyan-500/30 mb-6">
                <Gauge className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Garantia de Qualidade</h3>
              <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                Implementação e gestão de sistemas de qualidade, ensaios, análises laboratoriais e garantia de conformidade.
              </p>
            </div>
          </div>
        </main>
      )}

      {/* Página de Categorias do E-Commerce (Imagem 1) */}
      {paginaAtual === 'ecommerce' && (
        <main className="max-w-7xl mx-auto px-8 py-12">
          <button 
            onClick={() => setPaginaAtual('home')}
            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium mb-8 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar para os Serviços
          </button>

          <div className="mb-12">
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-4 py-1.5 rounded-full border border-cyan-500/20">
              E-Commerce Próton Core
            </span>
            <h1 className="text-3xl font-extrabold mt-4 text-white">Selecione uma Categoria</h1>
            <p className="text-slate-400 text-sm mt-2">Explore nosso catálogo especializado por linha de atuação.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoriasEcommerce.map((item) => {
              const Icone = item.icone
              return (
                <div 
                  key={item.id}
                  onClick={() => {
                    if (item.id === 'cosmeticos') setPaginaAtual('cosmeticos')
                  }}
                  className="bg-slate-900/50 border border-slate-800 hover:border-cyan-400 p-8 rounded-2xl cursor-pointer transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="w-14 h-14 bg-cyan-500/10 rounded-xl flex items-center justify-center border border-cyan-500/30 mb-6 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                    <Icone className="w-7 h-7 text-cyan-400 group-hover:text-slate-950 transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition">{item.nome}</h3>
                  <p className="text-slate-400 text-xs mt-2 leading-relaxed">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </main>
      )}

      {/* Página da Linha Cosméticos (Produto FisioGel) */}
      {paginaAtual === 'cosmeticos' && (
        <main className="max-w-7xl mx-auto px-8 py-12">
          <button 
            onClick={() => setPaginaAtual('ecommerce')}
            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium mb-8 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar para Categorias
          </button>

          <div className="mb-10">
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-4 py-1.5 rounded-full border border-cyan-500/20">
              Linha Cosméticos & Terapia
            </span>
            <h1 className="text-3xl font-extrabold mt-4 text-white">FisioGel Bell Fleur — 5kg</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl shadow-2xl relative flex flex-col items-center">
                <div className="w-full bg-slate-950 rounded-xl overflow-hidden border border-slate-800/80 flex items-center justify-center relative min-h-[480px] max-h-[520px]">
                  {midias[midiaIndex].tipo === 'image' ? (
                    <img 
                      src={midias[midiaIndex].url} 
                      alt={midias[midiaIndex].alt} 
                      className="max-h-[500px] w-auto object-contain rounded-xl"
                    />
                  ) : (
                    <video 
                      controls 
                      autoPlay 
                      muted 
                      loop 
                      className="max-h-[500px] w-auto object-contain rounded-xl"
                      src={midias[midiaIndex].url}
                    >
                      Seu navegador não suporta a exibição de vídeos.
                    </video>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-900/50 border border-slate-800 p-8 rounded-2xl sticky top-6">
              <h2 className="text-2xl font-bold text-white">FisioGel Bell Fleur (5kg)</h2>
              <div className="mt-6 p-4 bg-slate-950/60 rounded-xl border border-slate-800">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-cyan-400">R$ 30,00</span>
                  <span className="text-xs text-slate-500 line-through">R$ 45,00</span>
                </div>
              </div>

              <button 
                onClick={() => setPaginaAtual('checkout')}
                className="w-full mt-8 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-3.5 px-6 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 active:scale-95 cursor-pointer"
              >
                <ShoppingCart className="w-5 h-5" /> Comprar Agora
              </button>
            </div>
          </div>
        </main>
      )}

      {/* Seleção de Tamanho & Quantidade */}
      {paginaAtual === 'checkout' && (
        <main className="max-w-7xl mx-auto px-8 py-12">
          <button 
            onClick={() => setPaginaAtual('cosmeticos')}
            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium mb-8 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar para o Produto
          </button>

          <div className="mb-10">
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-4 py-1.5 rounded-full border border-cyan-500/20">
              Finalizar Pedido
            </span>
            <h1 className="text-3xl font-extrabold mt-4 text-white">Escolha o Tamanho Desejado</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center">
                <img 
                  src={produtoAtual.image} 
                  alt={`FisioGel Bell Fleur ${tamanhoSelecionado}`}
                  className="w-full h-full object-cover transition-all duration-300"
                />
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-900/50 border border-slate-800 p-8 rounded-2xl sticky top-6">
              <h2 className="text-2xl font-bold text-white">FisioGel Bell Fleur</h2>

              <div className="mt-6 space-y-3">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Tamanho & Valor Unidade:
                </label>
                
                {(Object.keys(opcoesProduto) as Array<keyof typeof opcoesProduto>).map((key) => {
                  const item = opcoesProduto[key]
                  const isSelected = tamanhoSelecionado === key

                  return (
                    <div
                      key={key}
                      onClick={() => setTamanhoSelecionado(key)}
                      className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                        isSelected
                          ? 'border-cyan-500 bg-cyan-500/10 ring-1 ring-cyan-500/30'
                          : 'border-slate-800 bg-slate-950/40 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <p className="font-bold text-sm text-white">{item.label}</p>
                        <p className="text-xs text-slate-400 mt-0.5 line-through">{item.oldPrice}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-lg font-extrabold text-cyan-400">{item.price}</span>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-6">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Quantidade de Bags:
                </label>
                <div className="flex items-center gap-4 bg-slate-950/60 p-2 rounded-xl border border-slate-800 w-fit">
                  <button 
                    onClick={() => setQuantidade(Math.max(1, quantidade - 1))}
                    className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-400 transition"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-lg font-bold text-white px-4">{quantidade}</span>
                  <button 
                    onClick={() => setQuantidade(quantidade + 1)}
                    className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-400 transition"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="mt-6 p-4 bg-slate-950/60 rounded-xl border border-slate-800">
                <p className="text-xs text-slate-400">Subtotal ({quantidade} bag{quantidade > 1 ? 's' : ''})</p>
                <span className="text-3xl font-extrabold text-cyan-400">
                  R$ {valorSubtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>

              <button 
                onClick={() => setPaginaAtual('cadastro')}
                className="w-full mt-6 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-3.5 px-6 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 active:scale-95 cursor-pointer"
              >
                <ShoppingCart className="w-5 h-5" /> Confirmar Pedido
              </button>
            </div>
          </div>
        </main>
      )}

      {/* Página de Cadastro + Endereço */}
      {paginaAtual === 'cadastro' && (
        <main className="max-w-4xl mx-auto px-8 py-12">
          <button 
            onClick={() => setPaginaAtual('checkout')}
            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium mb-8 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar para Seleção
          </button>

          <div className="mb-10">
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-4 py-1.5 rounded-full border border-cyan-500/20">
              Passo 1 de 2
            </span>
            <h1 className="text-3xl font-extrabold mt-4 text-white">Cadastro e Endereço de Entrega</h1>
          </div>

          <form onSubmit={handleCadastroSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-900/50 border border-slate-800 p-8 rounded-2xl">
            <div className="md:col-span-2">
              <h2 className="text-lg font-bold text-white mb-4 border-b border-slate-800 pb-2">Dados Pessoais</h2>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Nome Completo</label>
              <input required type="text" placeholder="Ex: João da Silva" value={dadosCadastro.nome} onChange={(e) => setDadosCadastro({ ...dadosCadastro, nome: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none" />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">E-mail</label>
              <input required type="email" placeholder="seu@email.com" value={dadosCadastro.email} onChange={(e) => setDadosCadastro({ ...dadosCadastro, email: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-slate-300 mb-1">Telefone / WhatsApp</label>
              <input required type="tel" placeholder="(00) 00000-0000" value={dadosCadastro.telefone} onChange={(e) => setDadosCadastro({ ...dadosCadastro, telefone: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none" />
            </div>

            <div className="md:col-span-2 mt-4">
              <h2 className="text-lg font-bold text-white mb-4 border-b border-slate-800 pb-2">Endereço para Cálculo de Frete</h2>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">CEP</label>
              <div className="flex gap-2">
                <input required type="text" placeholder="00000-000" value={dadosCadastro.cep} onChange={(e) => setDadosCadastro({ ...dadosCadastro, cep: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none" />
                <button type="button" onClick={calcularFreteEPrazo} className="bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs px-4 rounded-lg font-semibold transition shrink-0">Calcular Frete</button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Logradouro / Rua</label>
              <input required type="text" placeholder="Rua / Avenida" value={dadosCadastro.logradouro} onChange={(e) => setDadosCadastro({ ...dadosCadastro, logradouro: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none" />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Número</label>
              <input required type="text" placeholder="123" value={dadosCadastro.numero} onChange={(e) => setDadosCadastro({ ...dadosCadastro, numero: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none" />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Bairro</label>
              <input required type="text" placeholder="Bairro" value={dadosCadastro.bairro} onChange={(e) => setDadosCadastro({ ...dadosCadastro, bairro: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none" />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Cidade</label>
              <input required type="text" placeholder="Cidade" value={dadosCadastro.cidade} onChange={(e) => setDadosCadastro({ ...dadosCadastro, cidade: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none" />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">UF</label>
              <input required type="text" placeholder="SP, MG, RJ..." value={dadosCadastro.uf} onChange={(e) => setDadosCadastro({ ...dadosCadastro, uf: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none" />
            </div>

            {freteCalculado && (
              <div className="md:col-span-2 bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Truck className="w-6 h-6 text-cyan-400" />
                  <div>
                    <p className="text-xs text-slate-300 font-semibold">Frete Estimado</p>
                    <p className="text-xs text-slate-400 mt-0.5">Prazo de Entrega: <strong className="text-white">{freteCalculado.prazo}</strong></p>
                  </div>
                </div>
                <span className="text-lg font-bold text-cyan-400">R$ {freteCalculado.valor.toFixed(2)}</span>
              </div>
            )}

            <div className="md:col-span-2 mt-4">
              <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-4 px-6 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 active:scale-95 cursor-pointer">
                <UserCheck className="w-5 h-5" /> Concluir Cadastro e Ir para Pagamento
              </button>
            </div>
          </form>
        </main>
      )}

      {/* Página de Pagamento */}
      {paginaAtual === 'pagamento' && (
        <main className="max-w-4xl mx-auto px-8 py-12">
          <button onClick={() => setPaginaAtual('cadastro')} className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium mb-8 transition">
            <ArrowLeft className="w-4 h-4" /> Voltar para Cadastro
          </button>

          <div className="mb-10">
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-4 py-1.5 rounded-full border border-cyan-500/20">
              Passo 2 de 2
            </span>
            <h1 className="text-3xl font-extrabold mt-4 text-white">Pagamento do Pedido</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-7 bg-slate-900/50 border border-slate-800 p-8 rounded-2xl space-y-6">
              <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-2">Selecione a Forma de Pagamento</h2>

              <div className="grid grid-cols-2 gap-4">
                <div onClick={() => setMetodoPagamento('pix')} className={`p-4 rounded-xl border cursor-pointer text-center transition ${metodoPagamento === 'pix' ? 'border-cyan-500 bg-cyan-500/10' : 'border-slate-800 bg-slate-950/40 hover:border-slate-700'}`}>
                  <QrCode className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                  <p className="font-bold text-sm text-white">Pix à Vista</p>
                  <span className="text-[10px] text-slate-400">Liberado para qualquer valor</span>
                </div>

                <div onClick={() => { if (permiteCartao) setMetodoPagamento('cartao') }} className={`p-4 rounded-xl border text-center transition ${!permiteCartao ? 'border-slate-800 bg-slate-950/20 opacity-40 cursor-not-allowed' : metodoPagamento === 'cartao' ? 'border-cyan-500 bg-cyan-500/10 cursor-pointer' : 'border-slate-800 bg-slate-950/40 hover:border-slate-700 cursor-pointer'}`}>
                  <CreditCard className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                  <p className="font-bold text-sm text-white">Cartão de Crédito</p>
                  <span className="text-[10px] text-slate-400">{permiteCartao ? 'Parcelamento disponível' : 'Exclusivo acima de R$ 1.000'}</span>
                </div>
              </div>

              {metodoPagamento === 'pix' && (
                <div className="p-6 bg-slate-950/60 rounded-xl border border-slate-800 text-center space-y-3">
                  <div className="w-32 h-32 bg-white p-2 mx-auto rounded-lg flex items-center justify-center">
                    <QrCode className="w-24 h-24 text-slate-950" />
                  </div>
                  <p className="text-xs text-slate-300">O QR Code e a Chave Pix Copia e Cola serão gerados após confirmar.</p>
                </div>
              )}

              {metodoPagamento === 'cartao' && permiteCartao && (
                <div className="space-y-4 pt-2">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Número do Cartão</label>
                    <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Validade</label>
                      <input type="text" placeholder="MM/AA" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">CVV</label>
                      <input type="text" placeholder="123" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Opções de Parcelamento</label>
                    <select value={parcelas} onChange={(e) => setParcelas(Number(e.target.value))} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none">
                      <option value={1}>1x de R$ {valorTotal.toFixed(2)} (sem juros)</option>
                      <option value={2}>2x de R$ {(valorTotal / 2).toFixed(2)} (sem juros)</option>
                      <option value={3}>3x de R$ {(valorTotal / 3).toFixed(2)} (sem juros)</option>
                      <option value={6}>6x de R$ {(valorTotal / 6).toFixed(2)} (sem juros)</option>
                      <option value={10}>10x de R$ {(valorTotal / 10).toFixed(2)} (sem juros)</option>
                      <option value={12}>12x de R$ {(valorTotal / 12).toFixed(2)} (sem juros)</option>
                    </select>
                  </div>
                </div>
              )}

              <button className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-4 px-6 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 active:scale-95 cursor-pointer">
                Pagar R$ {valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </button>
            </div>

            <div className="md:col-span-5 bg-slate-900/50 border border-slate-800 p-8 rounded-2xl h-fit space-y-4">
              <h3 className="text-md font-bold text-white border-b border-slate-800 pb-2">Resumo do Pedido</h3>
              <div className="flex justify-between text-xs text-slate-300">
                <span>Produto ({quantidade}x {tamanhoSelecionado}):</span>
                <span>R$ {valorSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-300">
                <span>Frete:</span>
                <span>R$ {valorFrete.toFixed(2)}</span>
              </div>
              <div className="border-t border-slate-800 pt-3 flex justify-between items-baseline">
                <span className="text-sm font-bold text-white">Total:</span>
                <span className="text-2xl font-extrabold text-cyan-400">R$ {valorTotal.toFixed(2)}</span>
              </div>

              {!permiteCartao && (
                <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-lg text-[11px] text-amber-300 mt-4">
                  💡 Para liberar a opção de parcelamento no cartão de crédito, o valor total do pedido deve ser igual ou superior a R$ 1.000,00.
                </div>
              )}
            </div>
          </div>
        </main>
      )}
    </div>
  )
}
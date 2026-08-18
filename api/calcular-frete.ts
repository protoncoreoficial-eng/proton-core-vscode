export default async function handler(req: any, res: any) {
  // Permite apenas requisições POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { cepDestino, pesoKg, valorSubtotal } = req.body;

  if (!cepDestino) {
    return res.status(400).json({ message: 'CEP de destino é obrigatório' });
  }

  // A chave virá das variáveis de ambiente na Vercel (process.env.MELHOR_ENVIO_TOKEN)
  const MELHOR_ENVIO_TOKEN = process.env.MELHOR_ENVIO_TOKEN || 'TOKEN_TEMPORARIO';

  try {
    const response = await fetch('https://melhorenvio.com.br/api/v2/me/shipment/calculate', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MELHOR_ENVIO_TOKEN}`,
        'User-Agent': 'ProtonCore (contato@protoncore.com.br)'
      },
      body: JSON.stringify({
        from: { 
          postal_code: '38400000' // CEP de Origem Próton Core (Uberlândia/MG)
        },
        to: { 
          postal_code: cepDestino.replace(/\D/g, '') 
        },
        products: [
          {
            id: 'fisiogel',
            width: 20,
            height: 15,
            length: 20,
            weight: pesoKg || 5,
            insurance_value: valorSubtotal || 30.00,
            quantity: 1
          }
        ]
      })
    });

    const data = await response.json();

    if (Array.isArray(data)) {
      const opcoesValidas = data.filter((op: any) => !op.error && op.price);
      return res.status(200).json(opcoesValidas);
    }

    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({ message: 'Erro ao conectar com a API do Melhor Envio', error });
  }
}
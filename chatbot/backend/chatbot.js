const OpenAI = require("openai");
const empresa = require("./empresa.json");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const gerarPrompt = (pergunta) => {
  return `
Você é o atendente virtual da empresa ${empresa.nome}.
Seu papel é responder dúvidas dos clientes de forma clara e objetiva com base nessas informações:

- Horário de funcionamento: ${empresa.horario}
- Endereço: ${empresa.endereco}
- Serviços: ${empresa.servicos.join(", ")}
- Formas de pagamento: ${empresa.pagamento.join(", ")}
- Taxa de entrega: ${empresa.entrega}

Pergunta do cliente: ${pergunta}
  `;
};

async function enviarParaIA(pergunta) {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: gerarPrompt(pergunta) }],
    temperature: 0.6,
  });

  return response.choices[0].message.content;
}

module.exports = { enviarParaIA };

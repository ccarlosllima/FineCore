// 📁 index.js

const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require("@whiskeysockets/baileys");
const { Boom } = require("@hapi/boom");
const axios = require("axios");

// const db = require("db");

// ✅ Função principal para iniciar o bot"
async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("auth_info");
  const sock = makeWASocket({
  auth: state,
  browser: ["Windows", "Chrome", "120.0.0"],
});
  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect, qr } = update;
    if (qr) {
      console.log("📱 Escaneie o QR Code abaixo para conectar:");
      require('qrcode-terminal').generate(qr, {small:true})
      
    }

    if (connection === "close") {
      const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
      console.log("Conexão encerrada. Reconectando...", shouldReconnect);
      if (shouldReconnect) {
        startBot();
      }
    } else if (connection === "open") {
      console.log("🤖 Bot conectado com sucesso!");
    }
  });

  sock.ev.on("messages.upsert", async ({ messages, type }) => {
    if (type !== "notify") return;
    const msg = messages[0];
    if (!msg.message || msg.key.fromMe) return;
    const sender = msg.key.remoteJid;
    const texto = msg.message.conversation || msg.message.extendedTextMessage?.text;

    if (!texto) return;

    console.log("📩 Mensagem recebida:", texto);

    const respostaIA = await enviarParaOpenAI(texto);

    await sock.sendMessage(sender, { text: respostaIA });

    const agendamento = extrairAgendamento(respostaIA);

   /* if (agendamento) {
      salvarAgendamento(agendamento.nome, agendamento.horario, agendamento.servico);
    }
      */
  });
}

// 🔗 Integração com OpenRouter (GPT-3.5 ou outros modelos)
async function enviarParaOpenAI(textoUsuario) {
  try {
    const resposta = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions", 
      {
        model: "mistralai/mistral-7b-instruct",
        messages: [
          { role: "system", content: "Você é um atendente virtual do Carlos. Sua missão é informar se ele esta disponivel ou nao para atendimento, quado alguem mandar mensagem voce verifica o horario se for das 06:30 a 12:00 responda com bom dia, se o horario for depois de 12:00 ate as 18:00 responda com boa noite" },
          { role: "user", content: textoUsuario },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          "Authorization": `Bearer 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`,
          "HTTP-Referer": "https://seu-projeto.com",
          "Content-Type": "application/json",
        },
      }
    );

    return resposta.data.choices[0].message.content.trim();
  } catch (erro) {
    console.error("Erro ao acessar OpenRouter:", erro);
    return "Desculpe, não consegui entender. Tente novamente em instantes.";
  }
}

// 📦 Extrair nome, horário e serviço da resposta da IA
function extrairAgendamento(texto) {
  const nomeMatch = texto.match(/nome[:\s]*([A-Za-zÀ-ÿ\s]+)/i);
  const horarioMatch = texto.match(/(\d{1,2}[:h]\d{0,2})/i);
  const servicoMatch = texto.match(/(corte simples|corte com desenho|barba tradicional|barba desenhada)/i);

  if (nomeMatch && horarioMatch && servicoMatch) {
    return {
      nome: nomeMatch[1].trim(),
      horario: horarioMatch[1].replace("h", ":").trim(),
      servico: servicoMatch[1].trim(),
    };
  }
  return null;
}

// 💾 Salvar no SQLite
/*
function salvarAgendamento(nome, horario, servico) {
  db.run(
    `INSERT INTO agendamentos (nome, horario, servico) VALUES (?, ?, ?)`,
    [nome, horario, servico],
    (err) => {
      if (err) {
        console.error("Erro ao salvar no banco:", err);
      } else {
        console.log("✅ Agendamento salvo com sucesso!");
      }
    }
  );
}
*/

startBot();

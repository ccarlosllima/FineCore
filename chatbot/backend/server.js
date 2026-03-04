const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const chatbot = require('./chatbot');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/pergunta', async (req, res) => {
  const { pergunta } = req.body;

  try {
    const resposta = await chatbot.enviarParaIA(pergunta);
    res.json({ resposta });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao processar a pergunta' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

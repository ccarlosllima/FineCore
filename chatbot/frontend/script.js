async function enviarPergunta() {
    const input = document.getElementById('pergunta');
    const conversa = document.getElementById('conversa');
    const pergunta = input.value;
  
    if (!pergunta.trim()) return;
  
    // Mostrar pergunta do usuário
    conversa.innerHTML += `<div class="mensagem usuario">Você: ${pergunta}</div>`;
    input.value = '';
  
    try {
      const resposta = await fetch('http://localhost:3000/api/pergunta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pergunta })
      });
      const data = await resposta.json();
  
      // Mostrar resposta da IA
      conversa.innerHTML += `<div class="mensagem bot">Bot: ${data.resposta}</div>`;
      conversa.scrollTop = conversa.scrollHeight;
    } catch (error) {
      conversa.innerHTML += `<div class="mensagem bot">Erro ao enviar pergunta.</div>`;
      console.error(error);
    }
  }
  
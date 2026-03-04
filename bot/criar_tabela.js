const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.resolve(__dirname, "agendamentos.db");
const db = new sqlite3.Database(dbPath);

// Dados de exemplo para o agendamento
const nome = "Carlos";
const horario = "18:00";
const servico = "Corte de cabelo simples";

db.run(
  `INSERT INTO agendamentos (nome, horario, servico) VALUES (?, ?, ?)`,
  [nome, horario, servico],
  function (err) {
    if (err) {
      return console.error("Erro ao inserir agendamento:", err.message);
    }
    console.log(`✅ Agendamento inserido com sucesso! ID: ${this.lastID}`);
    db.close();
  }
);

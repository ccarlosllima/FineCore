// 📁 db.js
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.resolve(__dirname, "banco.sqlite");
const db = new sqlite3.Database(dbPath);

// Criar tabela se não existir
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS agendamentos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      horario TEXT NOT NULL,
      servico TEXT NOT NULL,
      data_agendamento DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

module.exports = db;

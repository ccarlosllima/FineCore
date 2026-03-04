const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.resolve(__dirname, "agendamentos.db");
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.all("SELECT * FROM agendamentos", (err, rows) => {
    if (err) {
      console.error("Erro ao buscar agendamentos:", err);
    } else {
      console.log("📋 Agendamentos salvos:");
      rows.forEach((row) => {
        console.log(`ID: ${row.id} | Nome: ${row.nome} | Horário: ${row.horario} | Serviço: ${row.servico} | Criado em: ${row.data_criacao}`);
      });
    }
    db.close();
  });
});

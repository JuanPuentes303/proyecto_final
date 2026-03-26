const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Manzanero23",
  database: "disfraces_db"
});

db.connect(err => {
  if (err) {
    console.error("Error conexión:", err);
  } else {
    console.log("Conectado a MySQL");
  }
});

module.exports = db;
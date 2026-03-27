const db = require("../config/db");

// OBTENER TODOS LOS DISFRACES
exports.obtenerDisfraces = (req, res) => {
  db.query("SELECT * FROM disfraces", (err, result) => {
    if (err) return res.status(500).send("Error");
    res.json(result);
  });
};

// FILTRAR DISFRACES
exports.filtrarDisfraces = (req, res) => {
  const { nombre, estado } = req.query;

  let sql = "SELECT * FROM disfraces WHERE 1=1";

  if (nombre) {
    sql += ` AND nombre LIKE '%${nombre}%'`;
  }

  if (estado) {
    sql += ` AND estado = '${estado}'`;
  }

  db.query(sql, (err, result) => {
    if (err) return res.status(500).send("Error");
    res.json(result);
  });
};
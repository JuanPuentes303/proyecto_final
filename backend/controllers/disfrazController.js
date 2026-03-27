const db = require("../config/db");

exports.obtenerDisfraces = (req, res) => {
  db.query("SELECT * FROM disfraces", (err, result) => {
    if (err) return res.status(500).send("Error");
    res.json(result);
  });
};

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

exports.crearDisfraz = (req, res) => {
  const { nombre, descripcion, precio } = req.body;

  if (!req.file) {
    return res.status(400).send("Imagen requerida");
  }

  const imagen = req.file.filename;

  const sql = `
    INSERT INTO disfraces (nombre, descripcion, precio, imagen, estado)
    VALUES (?, ?, ?, ?, 'disponible')
  `;

  db.query(sql, [nombre, descripcion, precio, imagen], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error al guardar disfraz");
    }

    res.send("Disfraz agregado correctamente");
  });
};
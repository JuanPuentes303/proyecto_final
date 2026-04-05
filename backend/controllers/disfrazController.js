const db = require("../config/db");

exports.obtenerDisfraces = (req, res) => {
  const sql = `
    SELECT d.*,
      CASE
        WHEN EXISTS (
          SELECT 1
          FROM reservas r
          WHERE r.id_disfraz = d.id
          AND CURDATE() BETWEEN r.fecha_inicio AND r.fecha_fin
        )
        THEN 'reservado'
        ELSE 'disponible'
      END AS estado_actual
    FROM disfraces d
  `;

  db.query(sql, (err, result) => {
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

  console.log("Datos recibidos:");
  console.log("Nombre:", nombre);
  console.log("Descripcion:", descripcion);
  console.log("Precio:", precio);
  console.log("Archivo:", req.file);

  if (!req.file) {
    console.log("NO SE RECIBIÓ IMAGEN"); 
    return res.status(400).send("Imagen requerida");
  }

  const imagen = req.file.filename;

  const sql = `
    INSERT INTO disfraces (nombre, descripcion, precio, imagen, estado)
    VALUES (?, ?, ?, ?, 'disponible')
  `;

  db.query(sql, [nombre, descripcion, precio, imagen], (err) => {
    if (err) {
      console.error("ERROR SQL:", err);
      return res.status(500).send("Error al guardar disfraz");
    }

    console.log("DISFRAZ GUARDADO"); 
    res.send("Disfraz agregado correctamente");
  });
};
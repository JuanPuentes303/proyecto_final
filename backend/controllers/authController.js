const db = require("../config/db");

//registro
exports.registrar = (req, res) => {
  const { nombre, correo, contraseña, rol } = req.body;

  if (!nombre || !correo || !contraseña) {
    return res.status(400).send("Datos incompletos");
  }

  const sql = `
    INSERT INTO usuarios (nombre, correo, contraseña, rol)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [nombre, correo, contraseña, rol || "cliente"], err => {
    if (err) {
      return res.status(500).send("Error al registrar");
    }

    res.send("Usuario registrado correctamente");
  });
};

//login
exports.login = (req, res) => {
  const { correo, contraseña } = req.body;

  const sql = `
    SELECT * FROM usuarios
    WHERE correo = ? AND contraseña = ?
  `;

  db.query(sql, [correo, contraseña], (err, result) => {
    if (err) return res.status(500).send("Error");

    if (result.length === 0) {
      return res.status(401).send("Credenciales inválidas");
    }

    res.json({
      mensaje: "Login exitoso",
      usuario: result[0]
    });
  });
};
const db = require("../config/db");

exports.registro = (req, res) => {
  const { nombre, correo, contraseña } = req.body;

  if (!nombre || !correo || !contraseña) {
    return res.status(400).send("Campos incompletos");
  }

  db.query(
    "SELECT * FROM usuarios WHERE correo = ?",
    [correo],
    (err, result) => {
      if (result.length > 0) {
        return res.status(400).send("Correo ya registrado");
      }

      const sql = `
        INSERT INTO usuarios (nombre, correo, contraseña, rol)
        VALUES (?, ?, ?, 'cliente')
      `;

      db.query(sql, [nombre, correo, contraseña], (err) => {
        if (err) return res.status(500).send("Error al registrar");
        res.send("Usuario registrado correctamente");
      });
    }
  );
};

exports.login = (req, res) => {
  const { correo, contraseña } = req.body;

  if (!correo || !contraseña) {
    return res.status(400).send("Campos incompletos");
  }

  const sql = `
    SELECT * FROM usuarios
    WHERE correo = ? AND contraseña = ?
  `;

  db.query(sql, [correo, contraseña], (err, result) => {
    if (err) return res.status(500).send("Error en servidor");

    if (result.length === 0) {
      return res.status(401).send("Credenciales incorrectas");
    }

    res.json({
      mensaje: "Login exitoso",
      usuario: result[0]
    });
  });
};
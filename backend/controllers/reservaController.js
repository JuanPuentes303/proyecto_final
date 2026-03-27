const db = require("../config/db");

exports.crearReserva = (req, res) => {
  const { id_usuario, id_disfraz, fecha_inicio, fecha_fin, tipo } = req.body;

  if (!id_usuario || !id_disfraz || !fecha_inicio || !fecha_fin) {
    return res.status(400).send("Datos incompletos");
}

  if (new Date(fecha_inicio) > new Date(fecha_fin)) {
    return res.send("Fechas inválidas");
}

  const sqlValidacion = `
    SELECT * FROM reservas
    WHERE id_disfraz = ?
    AND (
      fecha_inicio <= ? AND fecha_fin >= ?
    )
  `;

  db.query(sqlValidacion, [id_disfraz, fecha_fin, fecha_inicio], (err, result) => {
    if (err) return res.status(500).send("Error");

    if (result.length > 0) {
      return res.send("Disfraz no disponible en esas fechas");
    }

    const sqlInsert = `
      INSERT INTO reservas (id_usuario, id_disfraz, fecha_inicio, fecha_fin, tipo)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(sqlInsert, [id_usuario, id_disfraz, fecha_inicio, fecha_fin, tipo], (err) => {
      if (err) return res.status(500).send("Error al reservar");

      db.query(
        "UPDATE disfraces SET estado = 'reservado' WHERE id = ?",
        [id_disfraz]
      );

      res.send("Reserva realizada correctamente");
    });
  });
};


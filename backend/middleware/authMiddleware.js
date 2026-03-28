exports.esAdmin = (req, res, next) => {
  console.log("BODY EN MIDDLEWARE:", req.body);

  const rol = req.body?.rol;

  console.log("ROL RECIBIDO:", rol);

  if (rol !== "admin") {
    return res.status(403).send("No autorizado");
  }

  next();
};
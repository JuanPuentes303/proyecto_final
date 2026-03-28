exports.esAdmin = (req, res, next) => {
  const rol = req.body?.rol;

  if (rol !== "admin") {
    return res.status(403).send("No autorizado");
  }

  next();
};
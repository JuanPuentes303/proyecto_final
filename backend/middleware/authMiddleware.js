exports.esAdmin = (req, res, next) => {
  const { rol } = req.body;

  if (rol !== "admin") {
    return res.status(403).send("No autorizado");
  }

  next();
};
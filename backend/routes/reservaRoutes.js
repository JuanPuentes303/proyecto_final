const express = require("express");
const router = express.Router();
const controller = require("../controllers/reservaController");

router.post("/reservar", controller.crearReserva);

module.exports = router;
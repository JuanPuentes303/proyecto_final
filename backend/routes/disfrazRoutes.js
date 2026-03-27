const express = require("express");
const router = express.Router();
const controller = require("../controllers/disfrazController");

router.get("/disfraces", controller.obtenerDisfraces);
router.get("/disfraces/filtro", controller.filtrarDisfraces);

module.exports = router;
const express = require("express");
const router = express.Router();
const controller = require("../controllers/disfrazController");
const { esAdmin } = require("../middleware/authMiddleware");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.get("/disfraces", controller.obtenerDisfraces);
router.get("/disfraces/filtro", controller.filtrarDisfraces);

router.post(
  "/admin/disfraz",
  upload.single("imagen"),
  esAdmin,
  controller.crearDisfraz
);

module.exports = router;
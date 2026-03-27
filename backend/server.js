const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});

app.listen(3000, () => {
  console.log("Servidor en puerto 3000");
});

const db = require("./config/db");

app.get("/test-db", (req, res) => {
  db.query("SELECT 1", (err, result) => {
    if (err) return res.send("Error DB");
    res.send("Base de datos conectada");
  });
});

const authRoutes = require("./routes/authRoutes");

app.use("/", authRoutes);

const disfrazRoutes = require("./routes/disfrazRoutes");
app.use("/", disfrazRoutes);

app.use("/uploads", express.static("uploads"));

const multer = require("multer");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

const db = require("./config/db");

app.post("/admin/disfraz", upload.single("imagen"), (req, res) => {
  const { nombre, descripcion, precio } = req.body;
  const imagen = req.file.filename;

  const sql = `
    INSERT INTO disfraces (nombre, descripcion, precio, imagen, estado)
    VALUES (?, ?, ?, ?, 'disponible')
  `;

  db.query(sql, [nombre, descripcion, precio, imagen], (err) => {
    if (err) return res.status(500).send("Error");
    res.send("Disfraz agregado");
  });
});

const reservaRoutes = require("./routes/reservaRoutes");
app.use("/", reservaRoutes);
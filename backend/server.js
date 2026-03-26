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
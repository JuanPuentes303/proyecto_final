const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const disfrazRoutes = require("./routes/disfrazRoutes");
const reservaRoutes = require("./routes/reservaRoutes");

app.use("/", authRoutes);
app.use("/", disfrazRoutes);
app.use("/", reservaRoutes);

app.use("/uploads", express.static("uploads"));

app.listen(3000, () => {
  console.log("Servidor en puerto 3000");
});

app.use(express.static("../frontend"));
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Base de datos
const db = require("./models");

// Luego:
db.sequelize.sync({ alter: true })
  .then(() => console.log("DB sincronizada"))
  .catch(err => console.error("Error DB:", err));

// Rutas
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/user", require("./routes/userRoute"));
app.use("/api/product", require("./routes/productRoute"));
app.use("/api/cart", require("./routes/cartRoute"));
app.use("/api/order", require("./routes/orderRoute"));
app.use("/api/pay", require("./routes/paymentsRoute"));

// Ruta por defecto
app.get("/", (req, res) => {
  res.json({ message: "API funcionando 🚀" });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

const express = require("express");
const app = express();

const productosRoutes = require("./routes/productos");
const logger = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");

// middleware básico
app.use(express.json());

// middleware de logging
app.use(logger);

// rutas
app.use("/api/productos", productosRoutes);

// ruta raiz 
app.get("/", (req, res) => {
  res.send("API funcionando");
});

// ruta no encontrada
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// error handler
app.use(errorHandler);

// levantar servidor
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
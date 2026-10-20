// Variables de entorno (backend/.env): tiene que ir antes que todo lo demás
require("dotenv").config({ quiet: true });

const express = require("express");
const app = express();
const cors = require('cors');
const productosRoutes = require("./routes/productos");
const logger = require("./middlewares/logger");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

// CORS: solo se aceptan pedidos de los frontends listados en FRONTEND_URL
// (separados por coma). En desarrollo, React corre en http://localhost:3000
const origenesPermitidos = (process.env.FRONTEND_URL || "http://localhost:3000")
  .split(",")
  .map((url) => url.trim());

app.use(cors({ origin: origenesPermitidos }));
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

// ruta no encontrada (404) → pasa al errorHandler
app.use(notFound);

// error handler
app.use(errorHandler);

// levantar servidor (3001 para no chocar con React, que usa el 3000)
const PORT = process.env.PORT || 3001;

app.listen(PORT, (error) => {
  // En Express 5, si el puerto está ocupado el error llega a este callback
  if (error) {
    console.error(`No se pudo iniciar el servidor en el puerto ${PORT}: ${error.message}`);
    process.exit(1);
  }
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
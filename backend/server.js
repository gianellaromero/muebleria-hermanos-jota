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
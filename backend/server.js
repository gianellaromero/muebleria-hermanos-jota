const express = require("express");
const app = express();

const productosRoutes = require("./routes/productos");

// middleware básico
app.use(express.json());

// rutas
app.use("/api/productos", productosRoutes);

// levantar servidor
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
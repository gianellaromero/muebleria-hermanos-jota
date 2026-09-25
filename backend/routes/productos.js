const express = require("express");
const router = express.Router();
const PRODUCTOS = require("../data/productos");

// GET todos los productos
router.get("/", (req, res) => {
  res.json(PRODUCTOS);
});

// GET producto por id
router.get("/:id", (req, res) => {
  // Solo se aceptan enteros positivos: "3abc" o "1.9" no deben devolver un producto
  if (!/^\d+$/.test(req.params.id)) {
    return res.status(400).json({ error: "El id debe ser un número entero positivo" });
  }

  const id = Number(req.params.id);
  const producto = PRODUCTOS.find(p => p.id === id);

  if (!producto) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  res.json(producto);
});

module.exports = router;
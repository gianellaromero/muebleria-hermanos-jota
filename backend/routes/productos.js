const express = require("express");
const router = express.Router();
const PRODUCTOS = require("../data/productos");

// GET todos los productos
router.get("/", (req, res) => {
  res.json(PRODUCTOS);
});

// GET producto por id
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const producto = PRODUCTOS.find(p => p.id === id);

  if (!producto) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  res.json(producto);
});

module.exports = router;
const express = require("express");
const router = express.Router();
const { obtenerProductos, obtenerProductoPorId } = require("../controllers/productosController");

// Las rutas solo indican qué función atiende cada pedido; la lógica está en el controller
router.get("/", obtenerProductos);
router.get("/:id", obtenerProductoPorId);

module.exports = router;

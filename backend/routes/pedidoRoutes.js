const express = require("express");
const {
  crearPedido,
  misPedidos,
} = require("../controllers/pedidoController");
const verificarToken = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", verificarToken, crearPedido);
router.get("/mis-pedidos", verificarToken, misPedidos);

module.exports = router;
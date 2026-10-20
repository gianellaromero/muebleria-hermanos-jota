const PRODUCTOS = require("../data/productos");

// Crea un Error con código HTTP para que lo responda el errorHandler
function crearError(statusCode, mensaje) {
  const error = new Error(mensaje);
  error.statusCode = statusCode;
  return error;
}

// GET /api/productos
function obtenerProductos(req, res) {
  res.json(PRODUCTOS);
}

// GET /api/productos/:id
function obtenerProductoPorId(req, res, next) {
  // Solo se aceptan enteros positivos: "3abc" o "1.9" no deben devolver un producto
  if (!/^\d+$/.test(req.params.id)) {
    return next(crearError(400, "El id debe ser un número entero positivo"));
  }

  const producto = PRODUCTOS.find((p) => p.id === Number(req.params.id));

  if (!producto) {
    return next(crearError(404, "Producto no encontrado"));
  }

  res.json(producto);
}

module.exports = { obtenerProductos, obtenerProductoPorId };

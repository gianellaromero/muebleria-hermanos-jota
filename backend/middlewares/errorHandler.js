const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message);

  const status = err.statusCode || err.status || 500;

  // Mismo formato que el resto de la API: { error: "mensaje" }.
  // En errores 500 no se expone el detalle interno al cliente.
  res.status(status).json({
    error: status < 500 ? err.message : "Error interno del servidor"
  });
};

module.exports = errorHandler;

const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message);

  const status = err.statusCode || 500;

  res.status(status).json({
    error: true,
    message: err.message || "Error interno del servidor"
  });
};

module.exports = errorHandler;
// Cualquier ruta que no coincidió con las anteriores: se pasa un 404 al errorHandler
const notFound = (req, res, next) => {
  const error = new Error("Ruta no encontrada");
  error.statusCode = 404;
  next(error);
};

module.exports = notFound;

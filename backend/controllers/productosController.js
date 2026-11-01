
const Product = require("../models/Product");

//Crea un Error con código HTTP para que lo responda el errorHandler
function crearError(statusCode, mensaje) {
  const error = new Error(mensaje);
  error.statusCode = statusCode;
  return error;
}

// Junta los mensajes de cada campo inválido (los definidos en el modelo)
// en vez de devolver el texto técnico "Product validation failed: ..."
function mensajeDeValidacion(error) {
  return Object.values(error.errors)
    .map((detalle) => (detalle.name === "CastError" ? `El campo ${detalle.path} tiene un valor inválido` : detalle.message))
    .join(". ");
}

//GET /api/productos
async function obtenerProductos(req, res, next) {
  try {
    const productos = await Product.find();
    res.json(productos);
  } catch (error) {
    next(error);
  }
}

//GET /api/productos/:id
async function obtenerProductoPorId(req, res, next) {
  try {
    const producto = await Product.findById(req.params.id);

    if (!producto) {
      return next(crearError(404, "Producto no encontrado"));
    }

    res.json(producto);
  } catch (error) {
    if (error.name === "CastError") {
      return next(crearError(400, "ID de producto inválido"));
    }

    next(error);
  }
}


// POST /api/productos
async function crearProducto(req, res, next) {
  try {
    const nuevoProducto = await Product.create(req.body);

    res.status(201).json(nuevoProducto);
  } catch (error) {
    if (error.name === "ValidationError") {
      return next(crearError(400, mensajeDeValidacion(error)));
    }

    next(error);
  }
}
 
 // PUT /api/productos/:id
async function actualizarProducto(req, res, next) {
  try {
    const productoActualizado = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!productoActualizado) {
      return next(crearError(404, "Producto no encontrado"));
    }

    res.json(productoActualizado);
  } catch (error) {
    // El CastError puede venir del id de la URL o de un campo del body (ej: precio: "abc")
    if (error.name === "CastError" && error.path === "_id") {
      return next(crearError(400, "ID de producto inválido"));
    }

    if (error.name === "CastError") {
      return next(crearError(400, `El campo ${error.path} tiene un valor inválido`));
    }

    if (error.name === "ValidationError") {
      return next(crearError(400, mensajeDeValidacion(error)));
    }

    next(error);
  }
}


 // DELETE /api/productos/:id
async function eliminarProducto(req, res, next) {
  try {
    const productoEliminado = await Product.findByIdAndDelete(req.params.id);

    if (!productoEliminado) {
      return next(crearError(404, "Producto no encontrado"));
    }

    res.json({
      mensaje: "Producto eliminado correctamente",
      producto: productoEliminado
    });
  } catch (error) {
    if (error.name === "CastError") {
      return next(crearError(400, "ID de producto inválido"));
    }

    next(error);
  }
}


module.exports = { obtenerProductos, 
  obtenerProductoPorId, 
  crearProducto, 
  actualizarProducto, eliminarProducto };

const mongoose = require("mongoose");
const Pedido = require("../models/Pedido");
const Product = require("../models/Product");

const crearPedido = async (req, res, next) => {
  try {
    const { productos } = req.body;

    if (!Array.isArray(productos) || productos.length === 0) {
      return res.status(400).json({
        mensaje: "El pedido debe incluir al menos un producto",
      });
    }

    for (const item of productos) {
      if (
        !item.producto ||
        !mongoose.isValidObjectId(item.producto) ||
        !Number.isInteger(item.cantidad) ||
        item.cantidad < 1
      ) {
        return res.status(400).json({
          mensaje: "Cada producto debe tener un ID válido y una cantidad entera mayor a cero",
        });
      }
    }

    if (!req.user?._id) {
      return res.status(401).json({
        mensaje: "Debes iniciar sesión para crear un pedido",
      });
    }

    const idsProductos = productos.map((item) => item.producto);
    const productosDB = await Product.find({ _id: { $in: idsProductos } });

    if (productosDB.length !== new Set(idsProductos.map(String)).size) {
      return res.status(404).json({
        mensaje: "Uno o más productos no existen",
      });
    }

    const productosCalculados = productos.map((item) => {
      const productoDB = productosDB.find(
        (producto) => producto._id.toString() === item.producto
      );

      const subtotal = productoDB.precio * item.cantidad;

      return {
        producto: productoDB._id,
        nombre: productoDB.nombre,
        precio: productoDB.precio,
        cantidad: item.cantidad,
        subtotal,
      };
    });

    const total = productosCalculados.reduce(
      (acumulado, item) => acumulado + item.subtotal,
      0
    );

    const pedido = await Pedido.create({
      usuario: req.user._id,
      productos: productosCalculados,
      total,
    });

    return res.status(201).json(pedido);
  } catch (error) {
    next(error);
  }
};

const misPedidos = async (req, res, next) => {
  try {
    if (!req.user?._id) {
      return res.status(401).json({
        mensaje: "Debes iniciar sesión para ver tus pedidos",
      });
    }

    const pedidos = await Pedido.find({ usuario: req.user._id })
      .populate("productos.producto")
      .sort({ createdAt: -1 });

    return res.json(pedidos);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  crearPedido,
  misPedidos,
};
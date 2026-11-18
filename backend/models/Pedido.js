const mongoose = require("mongoose");

const pedidoSchema = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "El usuario es obligatorio"],
    },
    productos: [
      {
        producto: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: [true, "La referencia al producto es obligatoria"],
        },
        nombre: {
          type: String,
          required: [true, "El nombre del producto es obligatorio"],
          trim: true,
        },
        precio: {
          type: Number,
          required: [true, "El precio es obligatorio"],
          min: [0, "El precio no puede ser negativo"],
        },
        cantidad: {
          type: Number,
          required: [true, "La cantidad es obligatoria"],
          min: [1, "La cantidad debe ser al menos 1"],
          validate: {
            validator: Number.isInteger,
            message: "La cantidad debe ser un número entero",
          },
        },
        subtotal: {
          type: Number,
          required: [true, "El subtotal es obligatorio"],
          min: [0, "El subtotal no puede ser negativo"],
        },
      },
    ],
    total: {
      type: Number,
      required: [true, "El total es obligatorio"],
      min: [0, "El total no puede ser negativo"],
    },
    estado: {
      type: String,
      enum: ["pendiente", "confirmado", "enviado", "entregado", "cancelado"],
      default: "pendiente",
    },
    fecha: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Pedido", pedidoSchema);
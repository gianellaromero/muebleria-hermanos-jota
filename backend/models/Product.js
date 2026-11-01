const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  descripcion: {
    type: String,
    default: "",
    trim: true
  },
  precio: {
    type: Number,
    required: true,
    min: 0
  },
  stock: {
    type: Number,
    default: 0,
    min: 0
  },
  imagenUrl: {
    type: String,
    default: "",
    trim: true
  },
  categoria: {
    type: String,
    default: "",
    trim: true
  }
  }, {
  timestamps: true,
  // En el JSON se agrega "id" (el _id como texto), que es el que usa el front
  toJSON: { virtuals: true, versionKey: false }
});

module.exports = mongoose.model("Product", productSchema);
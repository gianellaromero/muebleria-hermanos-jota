require("dotenv").config({ quiet: true });

const conectarDB = require("../config/db");
const Product = require("../models/Product");
const productos = require("../data/productos");

async function migrarProductos() {
  await conectarDB();

  const productosMongo = productos.map((producto) => ({
    nombre: producto.nombre,
    descripcion: producto.descripcionLarga,
    precio: producto.precio,
    stock: 0,
    imagenUrl: producto.imagen,
    categoria: producto.categoria
  }));

  await Product.deleteMany({});
  await Product.insertMany(productosMongo);

  console.log(`${productosMongo.length} productos migrados correctamente`);
  process.exit(0);
}

migrarProductos().catch((error) => {
  console.error("Error durante la migración:", error);
  process.exit(1);
});
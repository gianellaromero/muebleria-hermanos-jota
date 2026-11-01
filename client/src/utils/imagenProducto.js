// Imagen que se muestra cuando un producto no tiene imagenUrl cargada
const IMAGEN_POR_DEFECTO = '/img/logo.svg';

export function imagenProducto(producto) {
  return producto.imagenUrl || IMAGEN_POR_DEFECTO;
}

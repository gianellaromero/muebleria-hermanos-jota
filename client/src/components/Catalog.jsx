import ProductList from './ProductList';

// Catálogo: título + estados de carga, error y lista vacía.
// Los productos llegan por props (los pide el hook useProductos en App).
export default function Catalog({ productos, cargando, error, onVerDetalle, onAgregarAlCarrito }) {
  let contenido;
  if (cargando) {
    contenido = <p className="cargando" role="status">Cargando productos...</p>;
  } else if (error) {
    contenido = <p className="mensaje-error" role="alert">{error}</p>;
  } else if (productos.length === 0) {
    contenido = <p className="sin-resultados">No hay productos disponibles.</p>;
  } else {
    contenido = (
      <ProductList
        productos={productos}
        onVerDetalle={onVerDetalle}
        onAgregarAlCarrito={onAgregarAlCarrito}
      />
    );
  }

  return (
    <>
      <p className="etiqueta">Nuestra colección</p>
      <h1>Catálogo de productos</h1>
      {contenido}
    </>
  );
}

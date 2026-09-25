import React, { useEffect, useState } from 'react';

export default function ProductDetail({ producto, onAgregarAlCarrito, onVolver }) {
  // Muestra el aviso "Producto añadido" durante unos segundos
  const [agregado, setAgregado] = useState(false);

  // Al abrir un producto: subir al inicio y actualizar el título de la pestaña
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `Mueblería Hermanos Jota | ${producto.nombre}`;
    return () => {
      document.title = 'Mueblería Hermanos Jota';
    };
  }, [producto]);

  // Oculta el aviso a los 2 segundos (y limpia el timer si se sale antes)
  useEffect(() => {
    if (!agregado) return;
    const timer = setTimeout(() => setAgregado(false), 2000);
    return () => clearTimeout(timer);
  }, [agregado]);

  function handleAgregar() {
    onAgregarAlCarrito(producto);
    setAgregado(true);
  }

  return (
    <>
      <button type="button" className="boton-volver" onClick={onVolver}>
        ← Volver al catálogo
      </button>

      <article className="producto-detalle">
        <img src={producto.imagen} alt={producto.alt} width="600" height="450" />

        <section>
          <p className="etiqueta">{producto.categoria}</p>
          <h1>{producto.nombre}</h1>
          <p>{producto.descripcionLarga || producto.descripcionCorta}</p>

          {producto.detallesFabricacion?.length > 0 && (
            <>
              <h2>Detalles de fabricación</h2>
              <ul>
                {producto.detallesFabricacion.map((detalle) => (
                  <li key={detalle}>{detalle}</li>
                ))}
              </ul>
            </>
          )}

          <p className="precio">
            <strong>Precio:</strong> ${producto.precio.toLocaleString('es-AR')}
          </p>

          <button className="boton" type="button" onClick={handleAgregar}>
            Añadir al Carrito
          </button>

          {agregado && (
            <p className="mensaje-exito" role="status">
              ✓ {producto.nombre} se añadió al carrito.
            </p>
          )}
        </section>
      </article>
    </>
  );
}

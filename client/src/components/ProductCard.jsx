import React, { useEffect, useState } from 'react';

export default function ProductCard({ producto, onVerDetalle, onAgregarAlCarrito }) {
  // Cambia el texto del botón a "✓ Agregado" por un momento
  const [agregado, setAgregado] = useState(false);

  useEffect(() => {
    if (!agregado) return;
    const timer = setTimeout(() => setAgregado(false), 1500);
    return () => clearTimeout(timer);
  }, [agregado]);

  function handleAgregar() {
    onAgregarAlCarrito(producto);
    setAgregado(true);
  }

  return (
    <article className="tarjeta-mueble">
      <figure>
        <button
          type="button"
          className="imagen-producto"
          onClick={() => onVerDetalle(producto)}
          aria-label={`Ver detalle de ${producto.nombre}`}
        >
          <img src={producto.imagen} alt={producto.alt} />
        </button>

        <figcaption>{producto.categoria}</figcaption>
      </figure>

      <div className="contenido-tarjeta">
        <h2>{producto.nombre}</h2>
        <p>{producto.descripcionCorta}</p>
        <p className="precio">${producto.precio.toLocaleString()}</p>
        <div className="acciones">
          <button className="boton" type="button" onClick={() => onVerDetalle(producto)}>Ver detalle</button>
          <button className="boton boton-secundario" type="button" onClick={handleAgregar}>
            {agregado ? '✓ Agregado' : 'Agregar al carrito'}
          </button>
        </div>
      </div>
    </article>
  );
}

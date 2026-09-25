import React from 'react';

export default function ProductCard({ producto, onVerDetalle }) {
  return (
    <article className="tarjeta-mueble">
      <figure>
        <img src={producto.imagen} alt={producto.alt} />
        <figcaption>{producto.categoria}</figcaption>
      </figure>
      <div className="contenido-tarjeta">
        <h2>{producto.nombre}</h2>
        <p>{producto.descripcionCorta}</p>
        <p className="precio">${producto.precio.toLocaleString()}</p>
        <button className="boton" type="button" onClick={() => onVerDetalle(producto)}>Ver detalle</button>
      </div>
    </article>
  );
}
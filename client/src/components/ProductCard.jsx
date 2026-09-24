import React from 'react';

export default function ProductCard({ producto }) {
  return (
    <article className="tarjeta-mueble">
      <figure>
        <img src={producto.imagen} alt={producto.alt} />
        <figcaption>{producto.categoria}</figcaption>
      </figure>
      <div className="contenido-tarjeta">
        <h3>{producto.nombre}</h3>
        <p>{producto.descripcionCorta}</p>
        <p className="precio">${producto.precio.toLocaleString()}</p>
        <button className="boton">Ver detalle</button>
      </div>
    </article>
  );
}
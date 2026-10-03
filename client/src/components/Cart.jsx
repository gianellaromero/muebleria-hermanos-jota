import React from 'react';

function formatearPrecio(valor) {
  return `$${valor.toLocaleString('es-AR')}`;
}

export default function Cart({ items, onSumar, onRestar, onQuitar, onVaciar, onSeguirComprando }) {
  const total = items.reduce((suma, item) => suma + item.precio * item.cantidad, 0);

  return (
    <>
      <button type="button" className="boton-volver" onClick={onSeguirComprando}>
        ← Seguir comprando
      </button>

      <p className="etiqueta">Tu selección</p>
      <h1>Carrito de compras</h1>

      {items.length === 0 ? (
        <p className="sin-resultados">Tu carrito está vacío.</p>
      ) : (
        <div className="contenido-carrito">
          {items.map((item) => (
            <article key={item.id} className="fila-carrito">
              <img src={item.imagen} alt={item.alt} />

              <div className="fila-carrito-info">
                <h2>{item.nombre}</h2>
                <p>Precio unitario: {formatearPrecio(item.precio)}</p>
                <p><strong>Subtotal:</strong> {formatearPrecio(item.precio * item.cantidad)}</p>
              </div>

              <div className="fila-carrito-acciones">
                <div className="selector-cantidad">
                  <button
                    type="button"
                    onClick={() => onRestar(item.id)}
                    aria-label={`Quitar una unidad de ${item.nombre}`}
                  >
                    −
                  </button>
                  <span aria-live="polite">{item.cantidad}</span>
                  <button
                    type="button"
                    onClick={() => onSumar(item)}
                    aria-label={`Agregar una unidad de ${item.nombre}`}
                  >
                    +
                  </button>
                </div>
                <button type="button" className="boton-quitar" onClick={() => onQuitar(item.id)}>
                  Quitar
                </button>
              </div>
            </article>
          ))}

          <div className="resumen-carrito">
            <p className="precio"><strong>Total:</strong> {formatearPrecio(total)}</p>
            <button
              type="button"
              className="boton"
              onClick={() => window.confirm('¿Querés vaciar el carrito?') && onVaciar()}
            >
              Vaciar carrito
            </button>
          </div>
        </div>
      )}
    </>
  );
}

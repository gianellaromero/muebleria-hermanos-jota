import React from 'react';

const SECCIONES = [
  { id: 'inicio', texto: 'Inicio' },
  { id: 'productos', texto: 'Productos' },
  { id: 'nosotros', texto: 'Nosotros' },
  { id: 'contacto', texto: 'Contacto' },
];

export default function Navbar({ contadorCarrito, onNavegar }) {
  // Se evita la recarga de la página (perdería el carrito) y App decide a dónde ir
  function handleClick(evento, id) {
    evento.preventDefault();
    onNavegar(id);
  }

  return (
    <header className="encabezado">
      <a href="#inicio" aria-label="Ir al inicio" onClick={(e) => handleClick(e, 'inicio')}>
        <img src="/img/logo.svg" alt="Logo de Mueblería Hermanos Jota" width="180" height="60" />
      </a>
      <nav aria-label="Navegación principal">
        <ul className="navegacion">
          {SECCIONES.map(({ id, texto }) => (
            <li key={id}>
              <a href={`#${id}`} onClick={(e) => handleClick(e, id)}>{texto}</a>
            </li>
          ))}
          <li className="nav-carrito">
            <span aria-hidden="true">🛒</span> Carrito
            <span className="contador-carrito">{contadorCarrito || 0}</span>
          </li>
        </ul>
      </nav>
    </header>
  );
}

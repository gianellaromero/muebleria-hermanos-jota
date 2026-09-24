import React from 'react';

export default function Navbar({ contadorCarrito }) {
  return (
    <header className="encabezado">
      <a href="/" aria-label="Ir al inicio">
        <img src="/Kit de imágenes/logo.svg" alt="Logo de Mueblería Hermanos Jota" width="180" height="60" />
      </a>
      <nav aria-label="Navegación principal">
        <ul className="navegacion">
          <li><a href="/">Inicio</a></li>
          <li><a href="/productos">Productos</a></li>
          <li><a href="/#nosotros">Nosotros</a></li>
          <li><a href="/contacto">Contacto</a></li>
          <li>
            <a href="/carrito">
              Carrito <span>{contadorCarrito || 0}</span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
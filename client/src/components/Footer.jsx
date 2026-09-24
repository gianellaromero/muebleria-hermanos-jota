import React from 'react';

export default function Footer() {
  return (
    <footer className="pie">
      <address>
        <p><strong>Mueblería Hermanos Jota</strong></p>
        <p>Av. Corrientes 1234, Buenos Aires</p>
        <p>Tel: <a href="tel:+541112345678">(011) 1234-5678</a></p>
        <p>Email: <a href="mailto:contacto@hermanosjota.com.ar">contacto@hermanosjota.com.ar</a></p>
      </address>
      <p>
        <small>&copy; 2026 Mueblería Hermanos Jota. Todos los derechos reservados.</small>
      </p>
    </footer>
  );
}
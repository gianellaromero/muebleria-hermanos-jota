import { NavLink } from 'react-router-dom';

export default function Navbar({ contadorCarrito = 0 }) {
  const claseActiva = ({ isActive }) => (isActive ? 'activo' : '');

  return (
    <header className="encabezado">
      <NavLink to="/" aria-label="Ir al inicio" className={claseActiva}>
        <img src="/img/logo.svg" alt="Logo de Mueblería Hermanos Jota" width="180" height="60" />
      </NavLink>
      
      <nav aria-label="Navegación principal">
        <ul className="navegacion">
          <li>
            <NavLink to="/" className={claseActiva}>Inicio</NavLink>
          </li>
          <li>
            <NavLink to="/productos" className={claseActiva}>Productos</NavLink>
          </li>
          <li>
            <NavLink to="/contacto" className={claseActiva}>Contacto</NavLink>
          </li>
          <li>
            <NavLink to="/admin/crear-producto" className={claseActiva}>Nuevo producto</NavLink>
          </li>
          <li>
            <NavLink to="/carrito" className={claseActiva} style={{ display: 'inline-flex', alignItems: 'center', gap: '.35rem' }}>
              <span aria-hidden="true"></span> Carrito
              <span className="contador-carrito">{contadorCarrito}</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

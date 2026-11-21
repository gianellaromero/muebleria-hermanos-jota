import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function formatearFecha(fecha) {
  return new Date(fecha).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' });
}

// Página privada: solo se llega con sesión iniciada (la protege ProtectedRoute)
export default function Perfil() {
  const { usuario } = useAuth();

  return (
    <section className="seccion-productos">
      <h1>Mi perfil</h1>

      <dl className="datos-perfil">
        <dt>Nombre</dt>
        <dd>{usuario.nombre}</dd>

        <dt>Email</dt>
        <dd>{usuario.email}</dd>

        {/* Se muestran solo si el backend los manda en los datos del usuario */}
        {usuario.role && (
          <>
            <dt>Tipo de cuenta</dt>
            <dd>{usuario.role === 'admin' ? 'Administrador' : 'Cliente'}</dd>
          </>
        )}

        {usuario.createdAt && (
          <>
            <dt>Cliente desde</dt>
            <dd>{formatearFecha(usuario.createdAt)}</dd>
          </>
        )}
      </dl>

      <Link to="/mis-pedidos" className="boton">
        Ver mis pedidos
      </Link>
    </section>
  );
}

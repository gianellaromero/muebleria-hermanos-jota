import { Link } from 'react-router-dom';

// Página privada preparada para el Sprint 8: ahí se van a listar los pedidos
// del usuario con GET /api/pedidos/mis-pedidos (enviando el token del AuthContext).
export default function MisPedidos() {
  return (
    <section className="seccion-productos">
      <h1>Mis pedidos</h1>
      <p className="sin-resultados">Todavía no tenés pedidos.</p>
      <Link to="/productos" className="boton">
        Ir al catálogo
      </Link>
    </section>
  );
}

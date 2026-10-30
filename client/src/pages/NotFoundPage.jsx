import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="seccion-nosotros">
      <h1>404 - Página no encontrada</h1>
      <p>Lo sentimos, la página que buscás no existe.</p>
      <Link to="/" className="boton">
        Volver al inicio
      </Link>
    </section>
  );
}
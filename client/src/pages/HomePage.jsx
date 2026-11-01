import { Link } from 'react-router-dom';
import AboutSection from '../components/AboutSection';

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-contenido">
          <h1>Mueblería Hermanos Jota</h1>
          <p>Más de 30 años de tradición familiar en muebles de calidad</p>
          <Link to="/productos" className="boton">
            Ver Catálogo
          </Link>
        </div>
      </section>
      <AboutSection />
    </>
  );
}

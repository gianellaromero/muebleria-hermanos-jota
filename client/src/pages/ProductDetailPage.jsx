import { useParams, useNavigate } from 'react-router-dom';
import ProductDetail from '../components/ProductDetail';

export default function ProductDetailPage({ onAgregarAlCarrito }) {
  const { id } = useParams(); // Obtiene el ID de la URL (ej: /productos/1)
  const navigate = useNavigate();

  return (
    <section className="seccion-productos">
      <ProductDetail
        id={id}
        onAgregarAlCarrito={onAgregarAlCarrito}
        onVolver={() => navigate('/productos')} // Vuelve al catálogo programáticamente
      />
    </section>
  );
}

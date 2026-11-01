import { useParams, useNavigate } from 'react-router-dom';
import ProductDetail from '../components/ProductDetail';

export default function ProductDetailPage({ onAgregarAlCarrito, onEliminado }) {
  const { id } = useParams(); // Obtiene el ID de la URL (ej: /productos/1)
  const navigate = useNavigate();

  // Después de eliminar se vuelve al catálogo, que pide la lista actualizada
  function handleEliminado(producto) {
    onEliminado(producto.id);
    navigate('/productos');
  }

  return (
    <section className="seccion-productos">
      <ProductDetail
        id={id}
        onAgregarAlCarrito={onAgregarAlCarrito}
        onVolver={() => navigate('/productos')} // Vuelve al catálogo programáticamente
        onEliminado={handleEliminado}
      />
    </section>
  );
}

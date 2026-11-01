import { useNavigate } from 'react-router-dom';
import Cart from '../components/Cart';

// El estado del carrito vive en App (lo usan el Navbar y varias páginas)
export default function CartPage({ items, onSumar, onRestar, onQuitar, onVaciar }) {
  const navigate = useNavigate();

  return (
    <section className="seccion-productos">
      <Cart
        items={items}
        onSumar={onSumar}
        onRestar={onRestar}
        onQuitar={onQuitar}
        onVaciar={onVaciar}
        onSeguirComprando={() => navigate('/productos')}
      />
    </section>
  );
}

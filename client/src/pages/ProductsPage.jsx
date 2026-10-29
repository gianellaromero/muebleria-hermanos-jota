import Catalog from '../components/Catalog';
import { useProductos } from '../hooks/useProductos';

// Esta página recibe las funciones del carrito desde App.js
export default function ProductsPage({ onVerDetalle, onAgregarAlCarrito }) {
  const { productos, cargando, error } = useProductos();

  return (
    <Catalog
      productos={productos}
      cargando={cargando}
      error={error}
      onVerDetalle={onVerDetalle}
      onAgregarAlCarrito={onAgregarAlCarrito}
    />
  );
}
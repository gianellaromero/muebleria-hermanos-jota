import { useEffect, useState } from 'react';
import { obtenerProductos } from '../services/productos';

// Pide los productos a GET /api/productos y devuelve { productos, cargando, error }.
// Lo usa ProductsPage: se vuelve a pedir cada vez que se entra al catálogo,
// así se ven los productos recién creados, editados o eliminados.
export function useProductos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelado = false; // evita actualizar el estado si el componente ya se desmontó

    obtenerProductos()
      .then((data) => {
        if (!cancelado) setProductos(data);
      })
      .catch((err) => {
        if (!cancelado) setError(err.message);
      })
      .finally(() => {
        if (!cancelado) setCargando(false);
      });

    return () => {
      cancelado = true;
    };
  }, []);

  return { productos, cargando, error };
}

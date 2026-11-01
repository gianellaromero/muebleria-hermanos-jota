import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Cada vez que cambia la ruta se vuelve al inicio de la página.
// React Router no lo hace solo: sin esto, al pasar del final del catálogo
// al detalle o al carrito la página quedaba scrolleada hacia abajo.
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

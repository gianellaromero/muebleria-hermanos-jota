import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Envuelve las páginas privadas: si no hay sesión, manda a /login.
// En el state queda la página que se quería ver, para volver a ella después del login.
export default function ProtectedRoute({ children }) {
  const { estaAutenticado, cargando } = useAuth();
  const location = useLocation();

  if (cargando) {
    return <p className="cargando">Cargando sesión...</p>;
  }

  if (!estaAutenticado) {
    return <Navigate to="/login" replace state={{ desde: location.pathname }} />;
  }

  return children;
}

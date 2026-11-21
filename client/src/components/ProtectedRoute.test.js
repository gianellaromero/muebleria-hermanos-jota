import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import ProtectedRoute from './ProtectedRoute';

const USUARIO = { id: 'u1', nombre: 'Ana Pérez', email: 'ana@mail.com' };

// Muestra a qué página se quería entrar, para comprobar que se guarda en el state
function PaginaLogin() {
  const location = useLocation();
  return <p>Login (desde {location.state?.desde})</p>;
}

function renderConSesion(sesion) {
  render(
    <AuthContext.Provider value={sesion}>
      <MemoryRouter initialEntries={['/perfil']}>
        <Routes>
          <Route path="/login" element={<PaginaLogin />} />
          <Route
            path="/perfil"
            element={
              <ProtectedRoute>
                <p>Contenido privado</p>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>
  );
}

test('sin sesión redirige a /login y recuerda la página pedida', () => {
  renderConSesion({ usuario: null, token: null, estaAutenticado: false, cargando: false });

  expect(screen.getByText('Login (desde /perfil)')).toBeInTheDocument();
  expect(screen.queryByText('Contenido privado')).not.toBeInTheDocument();
});

test('con sesión muestra la página privada', () => {
  renderConSesion({ usuario: USUARIO, token: 'token-falso', estaAutenticado: true, cargando: false });

  expect(screen.getByText('Contenido privado')).toBeInTheDocument();
});

test('mientras se recupera la sesión no redirige', () => {
  renderConSesion({ usuario: null, token: null, estaAutenticado: false, cargando: true });

  expect(screen.getByText('Cargando sesión...')).toBeInTheDocument();
  expect(screen.queryByText(/Login/)).not.toBeInTheDocument();
});

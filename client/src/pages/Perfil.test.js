import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Perfil from './Perfil';

function renderPerfil(usuario) {
  render(
    <AuthContext.Provider value={{ usuario, token: 'token-falso', estaAutenticado: true, cargando: false }}>
      <MemoryRouter>
        <Perfil />
      </MemoryRouter>
    </AuthContext.Provider>
  );
}

test('muestra el nombre y el email del usuario', () => {
  renderPerfil({ id: 'u1', nombre: 'Ana Pérez', email: 'ana@mail.com' });

  expect(screen.getByRole('heading', { name: 'Mi perfil' })).toBeInTheDocument();
  expect(screen.getByText('Ana Pérez')).toBeInTheDocument();
  expect(screen.getByText('ana@mail.com')).toBeInTheDocument();
  expect(screen.queryByText('Cliente desde')).not.toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Ver mis pedidos' })).toHaveAttribute('href', '/mis-pedidos');
});

test('muestra el tipo de cuenta y la fecha de alta si vienen en los datos', () => {
  renderPerfil({
    id: 'u1',
    nombre: 'Ana Pérez',
    email: 'ana@mail.com',
    role: 'admin',
    createdAt: '2026-11-18T12:00:00.000Z',
  });

  expect(screen.getByText('Administrador')).toBeInTheDocument();
  expect(screen.getByText('Cliente desde')).toBeInTheDocument();
  expect(screen.getByText(/noviembre de 2026/)).toBeInTheDocument();
});

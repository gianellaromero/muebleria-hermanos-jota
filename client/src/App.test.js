import { render, screen } from '@testing-library/react';
import App from './App';

test('muestra el inicio con el acceso al catálogo', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /mueblería hermanos jota/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /ver catálogo/i })).toHaveAttribute('href', '/productos');
});

test.each(['/perfil', '/mis-pedidos'])('sin sesión no se puede entrar a %s', (ruta) => {
  window.history.pushState({}, '', ruta);
  render(<App />);

  expect(window.location.pathname).toBe('/login');
  expect(screen.queryByRole('heading', { name: /mi perfil|mis pedidos/i })).not.toBeInTheDocument();
  window.history.pushState({}, '', '/');
});

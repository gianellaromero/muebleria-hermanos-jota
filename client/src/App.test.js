import { render, screen } from '@testing-library/react';
import App from './App';

test('muestra el inicio con el acceso al catálogo', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /mueblería hermanos jota/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /ver catálogo/i })).toHaveAttribute('href', '/productos');
});

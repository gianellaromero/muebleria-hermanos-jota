import { render, screen } from '@testing-library/react';
import App from './App';

test('muestra el catálogo de productos', () => {
  render(<App />);
  expect(screen.getByText(/catálogo de productos/i)).toBeInTheDocument();
});

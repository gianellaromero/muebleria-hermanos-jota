import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route, Link } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';

test('vuelve al inicio de la página cada vez que cambia la ruta', () => {
  render(
    <MemoryRouter initialEntries={['/productos']}>
      <ScrollToTop />
      <Routes>
        <Route path="/productos" element={<Link to="/carrito">Ir al carrito</Link>} />
        <Route path="/carrito" element={<p>Carrito</p>} />
      </Routes>
    </MemoryRouter>
  );
  window.scrollTo.mockClear();

  fireEvent.click(screen.getByText('Ir al carrito'));

  expect(screen.getByText('Carrito')).toBeInTheDocument();
  expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
});

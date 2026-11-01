import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductDetail from './ProductDetail';

const PRODUCTO = {
  id: 'abc123',
  nombre: 'Sillón Copacabana',
  categoria: 'Sillones',
  descripcion: 'Sillón de tres cuerpos',
  precio: 610000,
  stock: 2,
  imagenUrl: '/img/sillon-copacabana.png',
};

function respuestaFalsa(status, cuerpo) {
  return Promise.resolve({ ok: status < 400, status, json: () => Promise.resolve(cuerpo) });
}

function renderDetalle(onEliminado = jest.fn()) {
  render(
    <MemoryRouter>
      <ProductDetail id="abc123" onAgregarAlCarrito={jest.fn()} onVolver={jest.fn()} onEliminado={onEliminado} />
    </MemoryRouter>
  );
  return onEliminado;
}

beforeEach(() => {
  global.fetch = jest.fn();
});

test('muestra los datos del producto y el link para editarlo', async () => {
  global.fetch.mockReturnValue(respuestaFalsa(200, PRODUCTO));
  renderDetalle();

  expect(await screen.findByRole('heading', { name: 'Sillón Copacabana' })).toBeInTheDocument();
  expect(screen.getByText('Sillón de tres cuerpos')).toBeInTheDocument();
  expect(screen.getByRole('img', { name: 'Sillón Copacabana' })).toHaveAttribute('src', '/img/sillon-copacabana.png');
  expect(screen.getByRole('link', { name: 'Editar' })).toHaveAttribute('href', '/admin/editar-producto/abc123');
});

test('elimina el producto con DELETE después de confirmar', async () => {
  window.confirm = jest.fn(() => true);
  global.fetch
    .mockReturnValueOnce(respuestaFalsa(200, PRODUCTO))
    .mockReturnValueOnce(respuestaFalsa(200, { mensaje: 'Producto eliminado correctamente' }));
  const onEliminado = renderDetalle();

  const boton = await screen.findByRole('button', { name: 'Eliminar' });
  await act(async () => {
    fireEvent.click(boton);
  });

  const [url, opciones] = global.fetch.mock.calls[1];
  expect(url).toBe('http://localhost:3001/api/productos/abc123');
  expect(opciones.method).toBe('DELETE');
  expect(onEliminado).toHaveBeenCalledWith(PRODUCTO);
});

test('no elimina nada si se cancela la confirmación', async () => {
  window.confirm = jest.fn(() => false);
  global.fetch.mockReturnValue(respuestaFalsa(200, PRODUCTO));
  const onEliminado = renderDetalle();

  fireEvent.click(await screen.findByRole('button', { name: 'Eliminar' }));

  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(onEliminado).not.toHaveBeenCalled();
});

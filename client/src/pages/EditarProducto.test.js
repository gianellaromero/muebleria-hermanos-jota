import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import EditarProducto from './EditarProducto';

const PRODUCTO = {
  id: 'abc123',
  nombre: 'Mesa Comedor Pampa',
  categoria: 'Mesas',
  descripcion: 'Mesa de algarrobo',
  precio: 420000,
  stock: 3,
  imagenUrl: '/img/mesa-comedor-pampa.png',
};

// Monta la página en /admin/editar-producto/abc123 con una ruta de detalle de prueba
function renderPagina(onGuardado = jest.fn()) {
  render(
    <MemoryRouter initialEntries={['/admin/editar-producto/abc123']}>
      <Routes>
        <Route path="/admin/editar-producto/:id" element={<EditarProducto onGuardado={onGuardado} />} />
        <Route path="/productos/:id" element={<p>Página del detalle</p>} />
      </Routes>
    </MemoryRouter>
  );
  return onGuardado;
}

function respuestaFalsa(status, cuerpo) {
  return Promise.resolve({ ok: status < 400, status, json: () => Promise.resolve(cuerpo) });
}

beforeEach(() => {
  global.fetch = jest.fn();
});

test('carga los datos del producto en el formulario', async () => {
  global.fetch.mockReturnValue(respuestaFalsa(200, PRODUCTO));
  renderPagina();

  expect(await screen.findByLabelText(/nombre/i)).toHaveValue('Mesa Comedor Pampa');
  expect(screen.getByLabelText(/precio/i)).toHaveValue(420000);
  expect(screen.getByLabelText(/stock/i)).toHaveValue(3);
  expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/api/productos/abc123', undefined);
});

test('envía el PUT con los cambios y vuelve al detalle', async () => {
  jest.useFakeTimers();
  global.fetch
    .mockReturnValueOnce(respuestaFalsa(200, PRODUCTO))
    .mockReturnValueOnce(respuestaFalsa(200, { ...PRODUCTO, precio: 450000 }));
  const onGuardado = renderPagina();

  fireEvent.change(await screen.findByLabelText(/precio/i), { target: { value: '450000' } });

  await act(async () => {
    fireEvent.click(screen.getByRole('button', { name: 'Guardar cambios' }));
  });

  const [url, opciones] = global.fetch.mock.calls[1];
  expect(url).toBe('http://localhost:3001/api/productos/abc123');
  expect(opciones.method).toBe('PUT');
  expect(JSON.parse(opciones.body)).toMatchObject({ nombre: 'Mesa Comedor Pampa', precio: 450000, stock: 3 });
  expect(onGuardado).toHaveBeenCalledWith(expect.objectContaining({ precio: 450000 }));
  expect(screen.getByRole('status')).toHaveTextContent('se actualizó correctamente');

  act(() => jest.advanceTimersByTime(1500));
  expect(screen.getByText('Página del detalle')).toBeInTheDocument();
  jest.useRealTimers();
});

test('muestra el error si el producto no existe', async () => {
  global.fetch.mockReturnValue(respuestaFalsa(404, { error: 'Producto no encontrado' }));
  renderPagina();

  expect(await screen.findByRole('alert')).toHaveTextContent('Producto no encontrado');
});

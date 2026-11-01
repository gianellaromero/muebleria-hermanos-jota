import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import CrearProducto from './CrearProducto';

// Monta la página en /admin/crear-producto con una ruta /productos de prueba
function renderPagina() {
  render(
    <MemoryRouter initialEntries={['/admin/crear-producto']}>
      <Routes>
        <Route path="/admin/crear-producto" element={<CrearProducto />} />
        <Route path="/productos" element={<p>Página del catálogo</p>} />
      </Routes>
    </MemoryRouter>
  );
}

function escribir(etiqueta, valor) {
  fireEvent.change(screen.getByLabelText(etiqueta), { target: { value: valor } });
}

function respuestaFalsa(status, cuerpo) {
  return Promise.resolve({ ok: status < 400, status, json: () => Promise.resolve(cuerpo) });
}

beforeEach(() => {
  global.fetch = jest.fn();
});

test('muestra los errores de validación y no llama a la API', () => {
  renderPagina();
  fireEvent.click(screen.getByRole('button', { name: 'Crear producto' }));

  expect(screen.getByText(/el nombre es obligatorio/i)).toBeInTheDocument();
  expect(screen.getByText(/el precio es obligatorio/i)).toBeInTheDocument();
  expect(global.fetch).not.toHaveBeenCalled();
});

test('rechaza precio 0, stock decimal y una URL inválida', () => {
  renderPagina();
  escribir(/nombre/i, 'Mesa');
  escribir(/precio/i, '0');
  escribir(/stock/i, '1.5');
  escribir(/url de la imagen/i, 'imagen.png');
  fireEvent.click(screen.getByRole('button', { name: 'Crear producto' }));

  expect(screen.getByText(/mayor a 0/i)).toBeInTheDocument();
  expect(screen.getByText(/número entero/i)).toBeInTheDocument();
  expect(screen.getByText(/http:\/\/, https:\/\/ o "\/"/i)).toBeInTheDocument();
  expect(global.fetch).not.toHaveBeenCalled();
});

test('envía el POST con los tipos correctos y vuelve al catálogo', async () => {
  jest.useFakeTimers();
  global.fetch.mockReturnValue(respuestaFalsa(201, { _id: 'abc123', nombre: 'Mesa Ratona Delta' }));
  renderPagina();

  escribir(/nombre/i, '  Mesa Ratona Delta  ');
  escribir(/categoría/i, 'Mesas');
  escribir(/descripción/i, 'Mesa baja de madera');
  escribir(/precio/i, '185000');
  escribir(/stock/i, '4');
  escribir(/url de la imagen/i, '/img/mesa-de-centro-araucaria.png');

  await act(async () => {
    fireEvent.click(screen.getByRole('button', { name: 'Crear producto' }));
  });

  const [url, opciones] = global.fetch.mock.calls[0];
  expect(url).toBe('http://localhost:3001/api/productos');
  expect(opciones.method).toBe('POST');
  expect(JSON.parse(opciones.body)).toEqual({
    nombre: 'Mesa Ratona Delta',
    categoria: 'Mesas',
    descripcion: 'Mesa baja de madera',
    precio: 185000,
    stock: 4,
    imagenUrl: '/img/mesa-de-centro-araucaria.png',
  });

  expect(screen.getByRole('status')).toHaveTextContent('se creó correctamente');

  act(() => jest.advanceTimersByTime(1500));
  expect(screen.getByText('Página del catálogo')).toBeInTheDocument();
  jest.useRealTimers();
});

test('muestra el error que devuelve la API', async () => {
  global.fetch.mockReturnValue(respuestaFalsa(400, { error: 'El precio es obligatorio' }));
  renderPagina();
  escribir(/nombre/i, 'Mesa');
  escribir(/precio/i, '1000');

  await act(async () => {
    fireEvent.click(screen.getByRole('button', { name: 'Crear producto' }));
  });

  expect(screen.getByRole('alert')).toHaveTextContent('El precio es obligatorio');
});

test('avisa en español si el servidor está apagado', async () => {
  global.fetch.mockRejectedValue(new TypeError('Failed to fetch'));
  renderPagina();
  escribir(/nombre/i, 'Mesa');
  escribir(/precio/i, '1000');

  await act(async () => {
    fireEvent.click(screen.getByRole('button', { name: 'Crear producto' }));
  });

  expect(screen.getByRole('alert')).toHaveTextContent('No pudimos conectarnos con el servidor');
});

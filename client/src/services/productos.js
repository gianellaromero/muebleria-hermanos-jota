// Todas las llamadas a la API de productos pasan por este archivo.
// La URL sale de client/.env (REACT_APP_API_URL), así en el deploy
// solo hay que cambiar esa variable y no tocar ningún componente.
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
const PRODUCTOS_URL = `${API_URL}/api/productos`;

// Hace el pedido y devuelve el JSON, o lanza un Error con un mensaje
// pensado para mostrarle al usuario.
async function pedir(url, opciones) {
  let respuesta;
  try {
    respuesta = await fetch(url, opciones);
  } catch {
    // fetch solo falla así cuando no hay conexión con el servidor
    throw new Error('No pudimos conectarnos con el servidor. Verificá que la API esté encendida.');
  }

  const datos = await respuesta.json().catch(() => null);

  if (!respuesta.ok) {
    // La API responde los errores como { error: "mensaje" }
    throw new Error(datos?.error || `Error ${respuesta.status} al comunicarse con la API.`);
  }

  return datos;
}

export function obtenerProductos() {
  return pedir(PRODUCTOS_URL);
}

export function obtenerProducto(id) {
  return pedir(`${PRODUCTOS_URL}/${id}`);
}

export function crearProducto(producto) {
  return pedir(PRODUCTOS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto),
  });
}

export function eliminarProducto(id) {
  return pedir(`${PRODUCTOS_URL}/${id}`, { method: 'DELETE' });
}

export function actualizarProducto(id, producto) {
  return pedir(`${PRODUCTOS_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto),
  });
}

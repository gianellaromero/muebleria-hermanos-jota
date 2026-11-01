import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { eliminarProducto, obtenerProducto } from '../services/productos';
import { formatPrice } from '../utils/formatPrice';
import { imagenProducto } from '../utils/imagenProducto';

// Recibe solo el id y pide el producto a GET /api/productos/:id.
// Con React Router, el id puede venir de useParams().
export default function ProductDetail({ id, onAgregarAlCarrito, onVolver, onEliminado }) {
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  // Muestra el aviso "Producto añadido" durante unos segundos
  const [agregado, setAgregado] = useState(false);
  const [eliminando, setEliminando] = useState(false);
  const [errorEliminar, setErrorEliminar] = useState('');

  // Cada vez que cambia el id se pide el producto a la API
  useEffect(() => {
    let cancelado = false; // evita actualizar el estado si el usuario ya se fue

    setCargando(true);
    setError('');
    obtenerProducto(id)
      .then((data) => {
        if (!cancelado) setProducto(data);
      })
      .catch((err) => {
        if (!cancelado) setError(err.message);
      })
      .finally(() => {
        if (!cancelado) setCargando(false);
      });

    return () => {
      cancelado = true;
    };
  }, [id]);

  // Al mostrar un producto: subir al inicio y actualizar el título de la pestaña
  useEffect(() => {
    if (!producto) return;
    window.scrollTo(0, 0);
    document.title = `Mueblería Hermanos Jota | ${producto.nombre}`;
    return () => {
      document.title = 'Mueblería Hermanos Jota';
    };
  }, [producto]);

  // Oculta el aviso a los 2 segundos (y limpia el timer si se sale antes)
  useEffect(() => {
    if (!agregado) return;
    const timer = setTimeout(() => setAgregado(false), 2000);
    return () => clearTimeout(timer);
  }, [agregado]);

  function handleAgregar() {
    onAgregarAlCarrito(producto);
    setAgregado(true);
  }

  // React → DELETE /api/productos/:id → MongoDB
  async function handleEliminar() {
    if (!window.confirm(`¿Seguro que querés eliminar "${producto.nombre}"? No se puede deshacer.`)) return;

    setEliminando(true);
    setErrorEliminar('');
    try {
      await eliminarProducto(producto.id);
      onEliminado(producto);
    } catch (err) {
      setErrorEliminar(err.message);
      setEliminando(false);
    }
  }

  const botonVolver = (
    <button type="button" className="boton-volver" onClick={onVolver}>
      ← Volver al catálogo
    </button>
  );

  if (cargando) {
    return (
      <>
        {botonVolver}
        <p className="cargando" role="status">Cargando producto...</p>
      </>
    );
  }

  if (error) {
    return (
      <>
        {botonVolver}
        <p className="mensaje-error" role="alert">{error}</p>
      </>
    );
  }

  return (
    <>
      {botonVolver}

      <article className="producto-detalle">
        <img src={imagenProducto(producto)} alt={producto.nombre} width="600" height="450" />

        <section>
          <p className="etiqueta">{producto.categoria}</p>
          <h1>{producto.nombre}</h1>
          <p>{producto.descripcion}</p>

          <p className="precio">
            <strong>Precio:</strong> {formatPrice(producto.precio)}
          </p>

          <button className="boton" type="button" onClick={handleAgregar}>
            Añadir al Carrito
          </button>

          {agregado && (
            <p className="mensaje-exito" role="status">
              ✓ {producto.nombre} se añadió al carrito.
            </p>
          )}

          <div className="acciones-admin">
            <Link to={`/admin/editar-producto/${producto.id}`} className="boton boton-secundario">
              Editar
            </Link>
            <button
              type="button"
              className="boton boton-peligro"
              onClick={handleEliminar}
              disabled={eliminando}
            >
              {eliminando ? 'Eliminando…' : 'Eliminar'}
            </button>
          </div>

          {errorEliminar && (
            <p className="mensaje-error" role="alert">{errorEliminar}</p>
          )}
        </section>
      </article>
    </>
  );
}

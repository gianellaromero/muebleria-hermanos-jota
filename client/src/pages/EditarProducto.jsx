import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import { actualizarProducto, obtenerProducto } from '../services/productos';

// Tiempo que se muestra el mensaje de éxito antes de volver al detalle
const ESPERA_REDIRECCION_MS = 1500;

// El formulario trabaja con textos: los números se pasan a string para los inputs
function aValoresDelFormulario(producto) {
  return {
    nombre: producto.nombre,
    categoria: producto.categoria || '',
    descripcion: producto.descripcion || '',
    precio: String(producto.precio),
    stock: String(producto.stock ?? ''),
    imagenUrl: producto.imagenUrl || '',
  };
}

export default function EditarProducto({ onGuardado }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  // Producto ya guardado (null mientras no se haya guardado)
  const [guardado, setGuardado] = useState(null);

  // GET /api/productos/:id para cargar los datos actuales en el formulario
  useEffect(() => {
    let cancelado = false;

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

  useEffect(() => {
    if (!guardado) return;
    const timer = setTimeout(() => navigate(`/productos/${id}`), ESPERA_REDIRECCION_MS);
    return () => clearTimeout(timer);
  }, [guardado, id, navigate]);

  // React → PUT /api/productos/:id → MongoDB
  async function handleGuardar(cambios) {
    const actualizado = await actualizarProducto(id, cambios);
    onGuardado?.(actualizado);
    setGuardado(actualizado);
  }

  let contenido;
  if (cargando) {
    contenido = <p className="cargando" role="status">Cargando producto...</p>;
  } else if (error) {
    contenido = (
      <>
        <p className="mensaje-error" role="alert">{error}</p>
        <Link to="/productos" className="boton-volver">← Volver al catálogo</Link>
      </>
    );
  } else if (guardado) {
    contenido = (
      <p className="mensaje-exito" role="status">
        ✓ "{guardado.nombre}" se actualizó correctamente. Volviendo al producto…
      </p>
    );
  } else {
    contenido = (
      <ProductForm
        valoresIniciales={aValoresDelFormulario(producto)}
        textoBoton="Guardar cambios"
        onSubmit={handleGuardar}
      />
    );
  }

  return (
    <section className="seccion-admin">
      <p className="etiqueta">Administración</p>
      <h1>Editar producto</h1>
      {contenido}
    </section>
  );
}

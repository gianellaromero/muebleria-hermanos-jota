import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import { crearProducto } from '../services/productos';

// Tiempo que se muestra el mensaje de éxito antes de volver al catálogo
const ESPERA_REDIRECCION_MS = 1500;

export default function CrearProducto() {
  const navigate = useNavigate();
  // Producto recién creado (null mientras no se haya guardado)
  const [creado, setCreado] = useState(null);

  useEffect(() => {
    if (!creado) return;
    const timer = setTimeout(() => navigate('/productos'), ESPERA_REDIRECCION_MS);
    return () => clearTimeout(timer);
  }, [creado, navigate]);

  // React → POST /api/productos → MongoDB
  async function handleCrear(producto) {
    const nuevo = await crearProducto(producto);
    setCreado(nuevo || producto);
  }

  return (
    <section className="seccion-admin">
      <p className="etiqueta">Administración</p>
      <h1>Crear producto</h1>

      {creado ? (
        <p className="mensaje-exito" role="status">
          ✓ "{creado.nombre}" se creó correctamente. Volviendo al catálogo…
        </p>
      ) : (
        <ProductForm textoBoton="Crear producto" onSubmit={handleCrear} />
      )}
    </section>
  );
}

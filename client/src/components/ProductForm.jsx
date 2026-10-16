import React, { useState } from 'react';

const FORMULARIO_VACIO = { nombre: '', descripcion: '', precio: '', stock: '', imagenUrl: '' };

// Devuelve { campo: 'mensaje' } con los campos inválidos
function validar({ nombre, precio, stock, imagenUrl }) {
  const errores = {};

  if (nombre.trim().length < 2) {
    errores.nombre = 'El nombre es obligatorio (mínimo 2 caracteres).';
  }

  if (precio === '') {
    errores.precio = 'El precio es obligatorio.';
  } else if (!(Number(precio) > 0)) {
    errores.precio = 'El precio tiene que ser un número mayor a 0.';
  }

  if (stock !== '' && !(Number.isInteger(Number(stock)) && Number(stock) >= 0)) {
    errores.stock = 'El stock tiene que ser un número entero, 0 o mayor.';
  }

  const url = imagenUrl.trim();
  if (url && !/^(https?:\/\/|\/)\S+$/.test(url)) {
    errores.imagenUrl = 'Ingresá una URL que empiece con http://, https:// o "/".';
  }

  return errores;
}

// Formulario controlado de producto. Se usa para crear (Sprint 5)
// y se podrá reutilizar para editar (Sprint 6) pasando valoresIniciales.
export default function ProductForm({ valoresIniciales, textoBoton, onSubmit }) {
  const [datos, setDatos] = useState({ ...FORMULARIO_VACIO, ...valoresIniciales });
  const [errores, setErrores] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [errorServidor, setErrorServidor] = useState('');
  // Si la imagen de la vista previa no carga, no se muestra
  const [imagenRota, setImagenRota] = useState(false);

  function handleChange(evento) {
    const { name, value } = evento.target;
    setDatos((anteriores) => ({ ...anteriores, [name]: value }));
    if (name === 'imagenUrl') setImagenRota(false);
    if (errores[name]) {
      setErrores((anteriores) => ({ ...anteriores, [name]: undefined }));
    }
  }

  async function handleSubmit(evento) {
    evento.preventDefault();
    setErrorServidor('');

    const nuevosErrores = validar(datos);
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;

    // Se envían los tipos que espera el modelo Product de MongoDB
    const producto = {
      nombre: datos.nombre.trim(),
      descripcion: datos.descripcion.trim(),
      precio: Number(datos.precio),
      stock: datos.stock === '' ? 0 : Number(datos.stock),
      imagenUrl: datos.imagenUrl.trim(),
    };

    setEnviando(true);
    try {
      await onSubmit(producto);
    } catch (error) {
      setErrorServidor(error.message);
    } finally {
      setEnviando(false);
    }
  }

  const urlVistaPrevia = datos.imagenUrl.trim();

  return (
    <form className="formulario-producto" onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="nombre">Nombre *</label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          value={datos.nombre}
          onChange={handleChange}
          aria-invalid={Boolean(errores.nombre)}
          required
        />
        {errores.nombre && <p className="mensaje-error">{errores.nombre}</p>}
      </div>

      <div>
        <label htmlFor="descripcion">Descripción</label>
        <textarea
          id="descripcion"
          name="descripcion"
          rows="4"
          value={datos.descripcion}
          onChange={handleChange}
        />
      </div>

      <div className="fila-formulario">
        <div>
          <label htmlFor="precio">Precio (ARS) *</label>
          <input
            id="precio"
            name="precio"
            type="number"
            min="0"
            step="any"
            inputMode="decimal"
            value={datos.precio}
            onChange={handleChange}
            aria-invalid={Boolean(errores.precio)}
            required
          />
          {errores.precio && <p className="mensaje-error">{errores.precio}</p>}
        </div>

        <div>
          <label htmlFor="stock">Stock</label>
          <input
            id="stock"
            name="stock"
            type="number"
            min="0"
            step="1"
            inputMode="numeric"
            placeholder="0"
            value={datos.stock}
            onChange={handleChange}
            aria-invalid={Boolean(errores.stock)}
          />
          {errores.stock && <p className="mensaje-error">{errores.stock}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="imagenUrl">URL de la imagen</label>
        <input
          id="imagenUrl"
          name="imagenUrl"
          type="url"
          placeholder="https://... o /img/nombre.png"
          value={datos.imagenUrl}
          onChange={handleChange}
          aria-invalid={Boolean(errores.imagenUrl)}
        />
        {errores.imagenUrl && <p className="mensaje-error">{errores.imagenUrl}</p>}

        {urlVistaPrevia && !errores.imagenUrl && !imagenRota && (
          <img
            className="vista-previa"
            src={urlVistaPrevia}
            alt="Vista previa del producto"
            onError={() => setImagenRota(true)}
          />
        )}
      </div>

      <p className="ayuda-formulario">Los campos con * son obligatorios.</p>

      <button className="boton" type="submit" disabled={enviando}>
        {enviando ? 'Guardando…' : textoBoton}
      </button>

      {errorServidor && (
        <p className="mensaje-error" role="alert">{errorServidor}</p>
      )}
    </form>
  );
}

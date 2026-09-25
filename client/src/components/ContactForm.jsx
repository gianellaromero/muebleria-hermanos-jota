import React, { useState } from 'react';

const FORMULARIO_VACIO = { nombre: '', email: '', mensaje: '' };
const MINIMO_MENSAJE = 10;

function validarEmail(valor) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
}

// Devuelve un objeto { campo: 'mensaje de error' } con los campos inválidos
function validar({ nombre, email, mensaje }) {
  const errores = {};
  if (nombre.trim().length < 2) {
    errores.nombre = 'Ingresá un nombre de al menos 2 caracteres.';
  }
  if (!validarEmail(email.trim())) {
    errores.email = 'Ingresá un email válido.';
  }
  if (mensaje.trim().length < MINIMO_MENSAJE) {
    errores.mensaje = `El mensaje debe tener al menos ${MINIMO_MENSAJE} caracteres.`;
  }
  return errores;
}

export default function ContactForm() {
  // Formulario controlado: React es la única fuente de verdad de cada campo
  const [datos, setDatos] = useState(FORMULARIO_VACIO);
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  // Un solo handler para todos los campos, usando el atributo "name"
  function handleChange(evento) {
    const { name, value } = evento.target;
    setDatos((anteriores) => ({ ...anteriores, [name]: value }));
    setEnviado(false);
    // Si el campo tenía error, se borra apenas el usuario lo corrige
    if (errores[name]) {
      setErrores((anteriores) => ({ ...anteriores, [name]: undefined }));
    }
  }

  function handleSubmit(evento) {
    evento.preventDefault();
    const nuevosErrores = validar(datos);
    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) {
      setEnviado(false);
      return;
    }

    console.log('Mensaje de contacto:', datos);
    setDatos(FORMULARIO_VACIO);
    setEnviado(true);
  }

  const caracteres = datos.mensaje.trim().length;

  return (
    <form className="formulario-contacto" onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="nombre">Nombre</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={datos.nombre}
          onChange={handleChange}
          aria-invalid={Boolean(errores.nombre)}
          required
        />
        {errores.nombre && <p className="mensaje-error">{errores.nombre}</p>}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={datos.email}
          onChange={handleChange}
          aria-invalid={Boolean(errores.email)}
          required
        />
        {errores.email && <p className="mensaje-error">{errores.email}</p>}
      </div>

      <div>
        <label htmlFor="mensaje">Mensaje</label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows="7"
          value={datos.mensaje}
          onChange={handleChange}
          aria-invalid={Boolean(errores.mensaje)}
          required
        />
        <small className="contador-caracteres">
          {caracteres < MINIMO_MENSAJE
            ? `Faltan ${MINIMO_MENSAJE - caracteres} caracteres`
            : `${caracteres} caracteres ✓`}
        </small>
        {errores.mensaje && <p className="mensaje-error">{errores.mensaje}</p>}
      </div>

      <button className="boton" type="submit">
        Enviar mensaje
      </button>

      {enviado && (
        <p className="mensaje-exito" role="status">
          ¡Gracias! Tu mensaje fue enviado correctamente. Te responderemos a la brevedad.
        </p>
      )}
    </form>
  );
}

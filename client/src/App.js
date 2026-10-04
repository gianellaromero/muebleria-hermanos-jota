import React, { useState, useEffect } from "react";
import { flushSync } from "react-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import ContactForm from "./components/ContactForm";
import Cart from "./components/Cart";
import "./App.css";

function App() {
  // Carrito: cada item es { ...producto, cantidad }
  const [carrito, setCarrito] = useState([]);

  // Productos que vienen del backend
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  // Producto abierto en el detalle
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  // true = se muestra la vista del carrito
  const [verCarrito, setVerCarrito] = useState(false);

  // Cargar productos desde el backend
  useEffect(() => {
    async function cargarProductos() {
      try {
        const respuesta = await fetch("http://localhost:3001/api/productos");

        if (!respuesta.ok) {
          throw new Error("No se pudieron cargar los productos.");
        }

        const data = await respuesta.json();
        setProductos(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setCargando(false);
      }
    }

    cargarProductos();
  }, []);

  // Total de unidades en el carrito
  const cantidadEnCarrito = carrito.reduce(
    (total, item) => total + item.cantidad,
    0
  );

  // Si el producto ya está en el carrito suma una unidad;
  // si no, lo agrega
  function agregarAlCarrito(producto) {
    setCarrito((anterior) => {
      const existe = anterior.some((item) => item.id === producto.id);

      if (!existe) {
        return [...anterior, { ...producto, cantidad: 1 }];
      }

      return anterior.map((item) =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );
    });
  }

  // Resta una unidad; si llega a 0, sale del carrito
  function restarDelCarrito(id) {
    setCarrito((anterior) =>
      anterior
        .map((item) =>
          item.id === id
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
        .filter((item) => item.cantidad > 0)
    );
  }

  // Elimina completamente un producto del carrito
  function quitarDelCarrito(id) {
    setCarrito((anterior) =>
      anterior.filter((item) => item.id !== id)
    );
  }

  // Vacía todo el carrito
  function vaciarCarrito() {
    setCarrito([]);
  }

  // Navegación del Navbar:
  // cierra detalle/carrito y baja a la sección correspondiente
  function irASeccion(id) {
    flushSync(() => {
      setProductoSeleccionado(null);
      setVerCarrito(false);
    });

    document.getElementById(id)?.scrollIntoView();
  }

  // Abre el carrito
  function abrirCarrito() {
    flushSync(() => {
      setProductoSeleccionado(null);
      setVerCarrito(true);
    });

    document.getElementById("productos")?.scrollIntoView();
  }

  // Renderizado condicional:
  // carrito, detalle de producto o catálogo
  let vistaPrincipal;

  if (verCarrito) {
    vistaPrincipal = (
      <Cart
        items={carrito}
        onSumar={agregarAlCarrito}
        onRestar={restarDelCarrito}
        onQuitar={quitarDelCarrito}
        onVaciar={vaciarCarrito}
        onSeguirComprando={() => setVerCarrito(false)}
      />
    );
  } else if (productoSeleccionado) {
    vistaPrincipal = (
      <ProductDetail
        producto={productoSeleccionado}
        onAgregarAlCarrito={agregarAlCarrito}
        onVolver={() => setProductoSeleccionado(null)}
      />
    );
  } else {
    vistaPrincipal = (
      <>
        <p className="etiqueta">Nuestra colección</p>
        <h1>Catálogo de productos</h1>

        {cargando ? (
          <p role="status">Cargando productos...</p>
        ) : error ? (
          <p role="alert">{error}</p>
        ) : productos.length === 0 ? (
          <p>No hay productos disponibles</p>
        ) : (
          <ProductList
            productos={productos}
            onVerDetalle={setProductoSeleccionado}
            onAgregarAlCarrito={agregarAlCarrito}
          />
        )}
      </>
    );
  }

  return (
    <div className="App" id="inicio">
      <Navbar
        contadorCarrito={cantidadEnCarrito}
        onNavegar={irASeccion}
        onVerCarrito={abrirCarrito}
      />

      <main>
        <section id="productos" className="seccion-productos">
          {vistaPrincipal}
        </section>
{!productoSeleccionado && (
  <>
        <section id="nosotros" className="seccion-nosotros">
          <p className="etiqueta">
            Más de 30 años de tradición familiar
          </p>

          <h2>Nuestra historia</h2>

          <p>
            Somos una empresa familiar que combina artesanía, materiales de
            primera calidad y diseño funcional para acompañarte en cada rincón
            de tu casa. Nuestra tradición se transmite de generación en
            generación, con el mismo compromiso de siempre: entregar muebles
            duraderos, cómodos y con el calor de un trabajo hecho con
            dedicación.
          </p>
        </section>

        <section id="contacto" className="seccion-contacto">
          <p className="etiqueta">Estamos para ayudarte</p>

          <h2>Contacto</h2>

          <ContactForm />
        </section>
         </>
)}
      </main>

      <Footer />
    </div>
  );
}

export default App;

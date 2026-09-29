import React, { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import ContactForm from './components/ContactForm';
import './App.css';


function App() {
  // Estado para el carrito 
  const [carrito, setCarrito] = useState([]);
  // Productos que vienen del backend
  const [productos, setProductos] = useState([]);
  // Producto abierto en el detalle (null = se muestra el catálogo)
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/productos")
      .then(res => res.json())
      .then(data => {
        setProductos(data);
      })
      .catch(error => console.error("Error:", error));
  }, []);

  function agregarAlCarrito(producto) {
    setCarrito((anterior) => [...anterior, producto]);
  }

  // Navegación del Navbar: cierra el detalle (si estaba abierto) y baja a la sección.
  // flushSync hace que React actualice la pantalla antes de calcular el scroll.
  function irASeccion(id) {
    flushSync(() => setProductoSeleccionado(null));
    document.getElementById(id)?.scrollIntoView();
  }

  return (
    <div className="App" id="inicio">
      <Navbar contadorCarrito={carrito.length} onNavegar={irASeccion} />

      <main>
        <section id="productos" className="seccion-productos">
          {productoSeleccionado ? (
            <ProductDetail
              producto={productoSeleccionado}
              onAgregarAlCarrito={agregarAlCarrito}
              onVolver={() => setProductoSeleccionado(null)}
            />
          ) : (
            <>
              <p className="etiqueta">Nuestra colección</p>
              <h1>Catálogo de productos</h1>

              {/*lista completa de productos*/}

              {productos.length === 0 ? (
                <p
                  style={{
                    textAlign: "center",
                    width: "100%",
                    marginTop: "80px"
                  }}
                >
                  No hay productos disponibles
                </p>
              ) : (
                <ProductList productos={productos} onVerDetalle={setProductoSeleccionado} />
              )}
            </>
          )}
        </section>

        <section id="nosotros" className="seccion-nosotros">
          <p className="etiqueta">Más de 30 años de tradición familiar</p>
          <h2>Nuestra historia</h2>
          <p>
            Somos una empresa familiar que combina artesanía, materiales de primera
            calidad y diseño funcional para acompañarte en cada rincón de tu casa.
            Nuestra tradición se transmite de generación en generación, con el mismo
            compromiso de siempre: entregar muebles duraderos, cómodos y con el calor
            de un trabajo hecho con dedicación.
          </p>
        </section>

        <section id="contacto" className="seccion-contacto">
          <p className="etiqueta">Estamos para ayudarte</p>
          <h2>Contacto</h2>
          <ContactForm />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
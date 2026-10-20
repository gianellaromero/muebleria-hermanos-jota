import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Catalog from "./components/Catalog";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import { useProductos } from "./hooks/useProductos";
import "./App.css";

function App() {
  // Productos de la API (se piden una sola vez)
  const { productos, cargando, error } = useProductos();
  // Carrito: cada item es { ...producto, cantidad }
  const [carrito, setCarrito] = useState([]);
  // Id del producto abierto en el detalle (null = no hay detalle abierto)
  const [productoSeleccionadoId, setProductoSeleccionadoId] = useState(null);
  // true = se muestra la vista del carrito
  const [verCarrito, setVerCarrito] = useState(false);
  // Sección a la que hay que bajar después de cambiar de vista: { id }
  const [seccionDestino, setSeccionDestino] = useState(null);

  // Cuando cambia la sección destino, React ya mostró la vista nueva:
  // recién ahí existe el elemento y se puede hacer scroll
  useEffect(() => {
    if (!seccionDestino) return;
    document.getElementById(seccionDestino.id)?.scrollIntoView();
  }, [seccionDestino]);

  // Total de unidades, para el contador del Navbar
  const cantidadEnCarrito = carrito.reduce((total, item) => total + item.cantidad, 0);

  // Si el producto ya está en el carrito suma una unidad; si no, lo agrega
  function agregarAlCarrito(producto) {
    setCarrito((anterior) => {
      const existe = anterior.some((item) => item.id === producto.id);
      if (!existe) {
        return [...anterior, { ...producto, cantidad: 1 }];
      }
      return anterior.map((item) =>
        item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
      );
    });
  }

  // Resta una unidad; si llega a 0, el producto sale del carrito
  function restarDelCarrito(id) {
    setCarrito((anterior) =>
      anterior
        .map((item) => (item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item))
        .filter((item) => item.cantidad > 0)
    );
  }

  function quitarDelCarrito(id) {
    setCarrito((anterior) => anterior.filter((item) => item.id !== id));
  }

  function vaciarCarrito() {
    setCarrito([]);
  }

  // Navbar: vuelve al catálogo (cerrando detalle o carrito) y baja a la sección
  function irASeccion(id) {
    setProductoSeleccionadoId(null);
    setVerCarrito(false);
    setSeccionDestino({ id });
  }

  function abrirCarrito() {
    setProductoSeleccionadoId(null);
    setVerCarrito(true);
    setSeccionDestino({ id: "productos" });
  }

  // Renderizado condicional: carrito, detalle de un producto o catálogo
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
  } else if (productoSeleccionadoId !== null) {
    vistaPrincipal = (
      <ProductDetail
        id={productoSeleccionadoId}
        onAgregarAlCarrito={agregarAlCarrito}
        onVolver={() => setProductoSeleccionadoId(null)}
      />
    );
  } else {
    vistaPrincipal = (
      <Catalog
        productos={productos}
        cargando={cargando}
        error={error}
        onVerDetalle={(producto) => setProductoSeleccionadoId(producto.id)}
        onAgregarAlCarrito={agregarAlCarrito}
      />
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

        {/* En el detalle se ocultan Nosotros y Contacto */}
        {productoSeleccionadoId === null && (
          <>
            <AboutSection />
            <ContactSection />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;

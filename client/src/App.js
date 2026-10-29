import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Catalog from "./components/Catalog";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import CrearProducto from "./pages/CrearProducto"; 
import { useProductos } from "./hooks/useProductos";
import "./App.css";

// Wrapper para que ProductDetail pueda leer el ID de la URL
function ProductDetailPage({ onAgregarAlCarrito }) {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <ProductDetail 
      id={id} 
      onAgregarAlCarrito={onAgregarAlCarrito} 
      onVolver={() => navigate("/productos")} 
    />
  );
}

function AppContent() {
  const navigate = useNavigate();
  const { productos, cargando, error } = useProductos();
  const [carrito, setCarrito] = useState([]);

  const cantidadEnCarrito = carrito.reduce((total, item) => total + item.cantidad, 0);

  function agregarAlCarrito(producto) {
    setCarrito((anterior) => {
      const existe = anterior.some((item) => item.id === producto.id);
      if (!existe) return [...anterior, { ...producto, cantidad: 1 }];
      return anterior.map((item) =>
        item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
      );
    });
  }

  function restarDelCarrito(id) {
    setCarrito((anterior) =>
      anterior.map((item) => (item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item))
      .filter((item) => item.cantidad > 0)
    );
  }

  function quitarDelCarrito(id) {
    setCarrito((anterior) => anterior.filter((item) => item.id !== id));
  }

  function vaciarCarrito() {
    setCarrito([]);
  }

  return (
    <div className="App" id="inicio">
      <Navbar contadorCarrito={cantidadEnCarrito} />

      <main>
        <Routes>
          {/* Ruta de Inicio: muestra Catálogo + Nosotros + Contacto */}
          <Route path="/" element={
            <>
              <section id="productos" className="seccion-productos">
                <Catalog
                  productos={productos}
                  cargando={cargando}
                  error={error}
                  onVerDetalle={(producto) => navigate(`/productos/${producto.id}`)}
                  onAgregarAlCarrito={agregarAlCarrito}
                />
              </section>
              <AboutSection />
              <ContactSection />
            </>
          } />

          {/* Ruta exclusiva del Catálogo */}
          <Route path="/productos" element={
            <section id="productos" className="seccion-productos">
              <Catalog
                productos={productos}
                cargando={cargando}
                error={error}
                onVerDetalle={(producto) => navigate(`/productos/${producto.id}`)}
                onAgregarAlCarrito={agregarAlCarrito}
              />
            </section>
          } />

          {/* Ruta de Detalle de un Producto */}
          <Route path="/productos/:id" element={
            <section id="productos" className="seccion-productos">
              <ProductDetailPage onAgregarAlCarrito={agregarAlCarrito} />
            </section>
          } />

          {/* Ruta del Carrito */}
          <Route path="/carrito" element={
            <section id="productos" className="seccion-productos">
              <Cart
                items={carrito}
                onSumar={agregarAlCarrito}
                onRestar={restarDelCarrito}
                onQuitar={quitarDelCarrito}
                onVaciar={vaciarCarrito}
                onSeguirComprando={() => navigate("/productos")}
              />
            </section>
          } />

          {/* Ruta de Contacto */}
          <Route path="/contacto" element={<ContactSection />} />

          {/* Ruta de Administración (Crear Producto) */}
          <Route path="/admin/crear-producto" element={<CrearProducto />} />

        </Routes>
      </main>

      <Footer />
    </div>
  );
}

// El Router debe envolver toda la aplicación
export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
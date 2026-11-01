import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";
import CrearProducto from "./pages/CrearProducto";
import EditarProducto from "./pages/EditarProducto";
import "./App.css";

function AppContent() {
  const navigate = useNavigate();
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

  // Si se edita un producto que está en el carrito, se actualizan sus datos (precio, nombre...)
  function actualizarEnCarrito(producto) {
    setCarrito((anterior) =>
      anterior.map((item) => (item.id === producto.id ? { ...producto, cantidad: item.cantidad } : item))
    );
  }

  return (
    <div className="App" id="inicio">
      <Navbar contadorCarrito={cantidadEnCarrito} />

      <main>
        <Routes>
          {/* Ruta de Inicio */}
          <Route path="/" element={<HomePage />} />

          {/* Ruta del Catálogo */}
          <Route
            path="/productos"
            element={
              <ProductsPage
                onVerDetalle={(producto) => navigate(`/productos/${producto.id}`)}
                onAgregarAlCarrito={agregarAlCarrito}
              />
            }
          />

          {/* Ruta del Detalle de un Producto (usa :id dinámico) */}
          <Route
            path="/productos/:id"
            element={
              <ProductDetailPage
                onAgregarAlCarrito={agregarAlCarrito}
                onEliminado={quitarDelCarrito}
              />
            }
          />

          {/* Ruta del Carrito */}
          <Route
            path="/carrito"
            element={
              <CartPage
                items={carrito}
                onSumar={agregarAlCarrito}
                onRestar={restarDelCarrito}
                onQuitar={quitarDelCarrito}
                onVaciar={vaciarCarrito}
              />
            }
          />

          {/* Ruta de Contacto */}
          <Route path="/contacto" element={<ContactPage />} />

          {/* Rutas de Administración */}
          <Route path="/admin/crear-producto" element={<CrearProducto />} />
          <Route
            path="/admin/editar-producto/:id"
            element={<EditarProducto onGuardado={actualizarEnCarrito} />}
          />

          {/* Ruta comodín (404) - SIEMPRE va al final */}
          <Route path="*" element={<NotFoundPage />} />
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
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

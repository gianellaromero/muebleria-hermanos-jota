import React, { useState } from 'react';
import { flushSync } from 'react-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import ContactForm from './components/ContactForm';
import './App.css';

// Datos del backend
const PRODUCTOS = [
  {
    id: 1,
    nombre: "Mesa Comedor Pampa",
    categoria: "Mesas",
    imagen: "/Kit de imágenes/Mesa Comedor Pampa.png",
    alt: "Mesa de comedor de madera maciza",
    precio: 420000,
    descripcionCorta: "Mesa amplia para 6 personas, ideal para reuniones familiares.",
    descripcionLarga: "Mesa amplia para 6 personas, fabricada en madera maciza de algarrobo. Ideal para reuniones familiares y el uso diario del hogar.",
    detallesFabricacion: [
      "Madera maciza de algarrobo",
      "Terminación natural al aceite",
      "Capacidad para 6 personas",
      "Ensamble artesanal"
    ]
  },
  {
    id: 2,
    nombre: "Sillón Copacabana",
    categoria: "Sillones",
    imagen: "/Kit de imágenes/Sillón Copacabana.png",
    alt: "Sillón de tres cuerpos tapizado",
    precio: 610000,
    descripcionCorta: "Comodidad y estilo para tu living, con cuero resistente al uso diario.",
    descripcionLarga: "Sillón de tres cuerpos tapizado en cuero ecológico resistente, pensado para acompañar largas jornadas de descanso en tu living.",
    detallesFabricacion: [
      "Estructura de madera reforzada",
      "Tapizado en cuero ecológico",
      "Espuma de alta densidad",
      "Costuras reforzadas"
    ]
  },
  {
    id: 3,
    nombre: "Sillas Córdoba",
    categoria: "Sillas",
    imagen: "/Kit de imágenes/Sillas Córdoba.png",
    alt: "Silla Cordoba",
    precio: 85000,
    descripcionCorta: "Comodidad y estilo para tu comedor, con telas resistentes al uso diario.",
    descripcionLarga: "Silla de comedor con estructura de madera y tapizado en tela resistente, disponible para completar cualquier juego de mesa.",
    detallesFabricacion: [
      "Estructura de madera dura",
      "Tapizado en tela resistente",
      "Diseño ergonómico",
      "Precio por unidad"
    ]
  },
  {
    id: 4,
    nombre: "Escritorio Costa",
    categoria: "Escritorios",
    imagen: "/Kit de imágenes/Escritorio Costa.png",
    alt: "Escritorio de home office con cajonera",
    precio: 265000,
    descripcionCorta: "Superficie amplia y cajonera integrada para estudiar o trabajar desde casa.",
    descripcionLarga: "Escritorio de home office con superficie amplia y cajonera integrada, pensado para estudiar o trabajar cómodamente desde casa.",
    detallesFabricacion: [
      "Melamina de alta densidad",
      "Cajonera con guías metálicas",
      "Cableado organizado",
      "Fácil ensamble"
    ]
  },
  {
    id: 5,
    nombre: "Aparador Uspallata",
    categoria: "Aparadores",
    imagen: "/Kit de imágenes/Aparador Uspallata.png",
    alt: "Aparador de madera con puertas y cajones",
    precio: 380000,
    descripcionCorta: "Aparador con puertas y cajones para ordenar tu vajilla y mantelería.",
    descripcionLarga: "Aparador de línea moderna con puertas y cajones, ideal para ordenar vajilla, mantelería y objetos decorativos en el comedor.",
    detallesFabricacion: [
      "Madera maciza y melamina combinadas",
      "Herrajes de cierre suave",
      "Interior con estantes regulables",
      "Terminación mate"
    ]
  },
  {
    id: 6,
    nombre: "Biblioteca Recoleta",
    categoria: "Bibliotecas",
    imagen: "/Kit de imágenes/Biblioteca Recoleta.png",
    alt: "Biblioteca de madera con varios estantes",
    precio: 310000,
    descripcionCorta: "Biblioteca de varios estantes para libros, decoración y objetos personales.",
    descripcionLarga: "Biblioteca de piso con varios estantes fijos, pensada para organizar libros, decoración y objetos personales con estilo clásico.",
    detallesFabricacion: [
      "Madera maciza de pino",
      "Estantes reforzados",
      "Base antivuelco",
      "Terminación con barniz natural"
    ]
  },
  {
    id: 7,
    nombre: "Butaca Mendoza",
    categoria: "Sillones",
    imagen: "/Kit de imágenes/Butaca Mendoza.png",
    alt: "Butaca individual tapizada",
    precio: 240000,
    descripcionCorta: "Butaca individual tapizada, ideal para living o dormitorio.",
    descripcionLarga: "Butaca individual tapizada en tela suave, con patas de madera torneada. Perfecta como rincón de lectura en living o dormitorio.",
    detallesFabricacion: [
      "Estructura de madera maciza",
      "Tapizado en tela premium",
      "Patas torneadas a mano",
      "Espuma de alta densidad"
    ]
  },
  {
    id: 8,
    nombre: "Mesa de Centro Araucaria",
    categoria: "Mesas",
    imagen: "/Kit de imágenes/Mesa de Centro Araucaria.png",
    alt: "Mesa de centro de madera",
    precio: 150000,
    descripcionCorta: "Mesa de centro de madera, ideal para acompañar tu sillón o sofá.",
    descripcionLarga: "Mesa de centro de líneas simples fabricada en madera maciza, pensada para acompañar sillones y sofás en el living.",
    detallesFabricacion: [
      "Madera maciza de algarrobo",
      "Diseño minimalista",
      "Terminación natural al aceite",
      "Fácil de combinar"
    ]
  },
  {
    id: 9,
    nombre: "Mesa de Noche Aconcagua",
    categoria: "Mesas",
    imagen: "/Kit de imágenes/Mesa de Noche Aconcagua.png",
    alt: "Mesa de noche con cajón",
    precio: 95000,
    descripcionCorta: "Mesa de noche compacta con cajón, ideal para el dormitorio.",
    descripcionLarga: "Mesa de noche compacta con un cajón amplio, pensada para acompañar cualquier dormitorio sin ocupar demasiado espacio.",
    detallesFabricacion: [
      "Melamina de alta densidad",
      "Cajón con guías metálicas",
      "Diseño compacto",
      "Precio por unidad"
    ]
  },
  {
    id: 10,
    nombre: "Silla de Trabajo Belgrano",
    categoria: "Sillas",
    imagen: "/Kit de imágenes/Silla de Trabajo Belgrano.png",
    alt: "Silla de trabajo ergonómica",
    precio: 130000,
    descripcionCorta: "Silla ergonómica pensada para largas jornadas de home office.",
    descripcionLarga: "Silla de trabajo ergonómica con soporte lumbar, pensada para acompañar largas jornadas de estudio o home office.",
    detallesFabricacion: [
      "Estructura reforzada",
      "Soporte lumbar ajustable",
      "Tapizado transpirable",
      "Altura regulable"
    ]
  },
  {
    id: 11,
    nombre: "Sofá Patagonia",
    categoria: "Sillones",
    imagen: "/Kit de imágenes/Sofá Patagonia.png",
    alt: "Sofá de tres cuerpos color arena",
    precio: 720000,
    descripcionCorta: "Sofá de tres cuerpos, amplio y cómodo para toda la familia.",
    descripcionLarga: "Sofá de tres cuerpos con tapizado color arena, amplio y cómodo, pensado como protagonista del living familiar.",
    detallesFabricacion: [
      "Estructura de madera reforzada",
      "Tapizado antimanchas",
      "Almohadones desenfundables",
      "Espuma de alta densidad"
    ]
  }
];

function App() {
  // Estado para el carrito 
  const [carrito, setCarrito] = useState([]);
  // Producto abierto en el detalle (null = se muestra el catálogo)
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

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
              <ProductList productos={PRODUCTOS} onVerDetalle={setProductoSeleccionado} />
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
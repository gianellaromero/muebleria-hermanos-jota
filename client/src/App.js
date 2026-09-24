import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
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
    descripcionCorta: "Mesa amplia para 6 personas, ideal para reuniones familiares."
  },
  {
    id: 2,
    nombre: "Sillón Copacabana",
    categoria: "Sillones",
    imagen: "/Kit de imágenes/Sillón Copacabana.png",
    alt: "Sillón de tres cuerpos tapizado",
    precio: 610000,
    descripcionCorta: "Comodidad y estilo para tu living, con cuero resistente al uso diario."
  },
  {
    id: 3,
    nombre: "Sillas Córdoba",
    categoria: "Sillas",
    imagen: "/Kit de imágenes/Sillas Córdoba.png",
    alt: "Silla Cordoba",
    precio: 85000,
    descripcionCorta: "Comodidad y estilo para tu comedor, con telas resistentes al uso diario."
  },
  {
    id: 4,
    nombre: "Escritorio Costa",
    categoria: "Escritorios",
    imagen: "/Kit de imágenes/Escritorio Costa.png",
    alt: "Escritorio de home office con cajonera",
    precio: 265000,
    descripcionCorta: "Superficie amplia y cajonera integrada para estudiar o trabajar desde casa."
  },
  {
    id: 5,
    nombre: "Aparador Uspallata",
    categoria: "Aparadores",
    imagen: "/Kit de imágenes/Aparador Uspallata.png",
    alt: "Aparador de madera con puertas y cajones",
    precio: 380000,
    descripcionCorta: "Aparador con puertas y cajones para ordenar tu vajilla y mantelería."
  },
  {
    id: 6,
    nombre: "Biblioteca Recoleta",
    categoria: "Bibliotecas",
    imagen: "/Kit de imágenes/Biblioteca Recoleta.png",
    alt: "Biblioteca de madera con varios estantes",
    precio: 310000,
    descripcionCorta: "Biblioteca de varios estantes para libros, decoración y objetos personales."
  },
  {
    id: 7,
    nombre: "Butaca Mendoza",
    categoria: "Sillones",
    imagen: "/Kit de imágenes/Butaca Mendoza.png",
    alt: "Butaca individual tapizada",
    precio: 240000,
    descripcionCorta: "Butaca individual tapizada, ideal para living o dormitorio."
  },
  {
    id: 8,
    nombre: "Mesa de Centro Araucaria",
    categoria: "Mesas",
    imagen: "/Kit de imágenes/Mesa de Centro Araucaria.png",
    alt: "Mesa de centro de madera",
    precio: 150000,
    descripcionCorta: "Mesa de centro de madera, ideal para acompañar tu sillón o sofá."
  },
  {
    id: 9,
    nombre: "Mesa de Noche Aconcagua",
    categoria: "Mesas",
    imagen: "/Kit de imágenes/Mesa de Noche Aconcagua.png",
    alt: "Mesa de noche con cajón",
    precio: 95000,
    descripcionCorta: "Mesa de noche compacta con cajón, ideal para el dormitorio."
  },
  {
    id: 10,
    nombre: "Silla de Trabajo Belgrano",
    categoria: "Sillas",
    imagen: "/Kit de imágenes/Silla de Trabajo Belgrano.png",
    alt: "Silla de trabajo ergonómica",
    precio: 130000,
    descripcionCorta: "Silla ergonómica pensada para largas jornadas de home office."
  },
  {
    id: 11,
    nombre: "Sofá Patagonia",
    categoria: "Sillones",
    imagen: "/Kit de imágenes/Sofá Patagonia.png",
    alt: "Sofá de tres cuerpos color arena",
    precio: 720000,
    descripcionCorta: "Sofá de tres cuerpos, amplio y cómodo para toda la familia."
  }
];

function App() {
  // Estado para el carrito 
  const [carrito, setCarrito] = useState([]);

  return (
    <div className="App">
      <Navbar contadorCarrito={carrito.length} />
      
      <main className="seccion-productos">
        <p className="etiqueta">Nuestra colección</p>
        <h1>Catálogo de productos</h1>
        
        {/*lista completa de productos*/}
        <ProductList productos={PRODUCTOS} />
      </main>

      <Footer />
    </div>
  );
}

export default App;
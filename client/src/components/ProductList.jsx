import React from 'react';
import ProductCard from './ProductCard';

export default function ProductList({ productos, onVerDetalle }) {
  return (
    <section className="grilla-productos" aria-label="Catálogo de muebles">
      {productos.map((producto) => (
        <ProductCard 
          key={producto.id} 
          producto={producto}
          onVerDetalle={onVerDetalle}
        />
      ))}
    </section>
  );
}
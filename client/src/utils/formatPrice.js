// Formato único de precios para toda la app: $ 420.000
const formatoPesos = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
});

export function formatPrice(valor) {
  return formatoPesos.format(valor);
}

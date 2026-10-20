import ContactForm from './ContactForm';

// Sección "Contacto": título + formulario
export default function ContactSection() {
  return (
    <section id="contacto" className="seccion-contacto">
      <p className="etiqueta">Estamos para ayudarte</p>
      <h2>Contacto</h2>
      <ContactForm />
    </section>
  );
}

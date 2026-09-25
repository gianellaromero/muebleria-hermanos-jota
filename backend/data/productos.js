const PRODUCTOS = [
    {
        id: 1,
        nombre: "Mesa Comedor Pampa",
        categoria: "Mesas",
        imagen: "/img/mesa-comedor-pampa.png",
        alt: "Mesa de comedor de madera maciza",
        precio: 420000,
        destacado: true,
        descripcionCorta: "Mesa amplia para 6 personas, ideal para reuniones familiares.",
        descripcionLarga:
            "Mesa amplia para 6 personas, fabricada en madera maciza de algarrobo. Ideal para reuniones familiares y el uso diario del hogar.",
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
        imagen: "/img/sillon-copacabana.png",
        alt: "Sillón de tres cuerpos tapizado",
        precio: 610000,
        destacado: true,
        descripcionCorta: "Comodidad y estilo para tu living, con cuero resistente al uso diario.",
        descripcionLarga:
            "Sillón de tres cuerpos tapizado en cuero ecológico resistente, pensado para acompañar largas jornadas de descanso en tu living.",
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
        imagen: "/img/sillas-cordoba.png",
        alt: "Silla Cordoba",
        precio: 85000,
        destacado: true,
        descripcionCorta: "Comodidad y estilo para tu comedor, con telas resistentes al uso diario.",
        descripcionLarga:
            "Silla de comedor con estructura de madera y tapizado en tela resistente, disponible para completar cualquier juego de mesa.",
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
        imagen: "/img/escritorio-costa.png",
        alt: "Escritorio de home office con cajonera",
        precio: 265000,
        destacado: true,
        descripcionCorta: "Superficie amplia y cajonera integrada para estudiar o trabajar desde casa.",
        descripcionLarga:
            "Escritorio de home office con superficie amplia y cajonera integrada, pensado para estudiar o trabajar cómodamente desde casa.",
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
        imagen: "/img/aparador-uspallata.png",
        alt: "Aparador de madera con puertas y cajones",
        precio: 380000,
        destacado: false,
        descripcionCorta: "Aparador con puertas y cajones para ordenar tu vajilla y mantelería.",
        descripcionLarga:
            "Aparador de línea moderna con puertas y cajones, ideal para ordenar vajilla, mantelería y objetos decorativos en el comedor.",
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
        imagen: "/img/biblioteca-recoleta.png",
        alt: "Biblioteca de madera con varios estantes",
        precio: 310000,
        destacado: false,
        descripcionCorta: "Biblioteca de varios estantes para libros, decoración y objetos personales.",
        descripcionLarga:
            "Biblioteca de piso con varios estantes fijos, pensada para organizar libros, decoración y objetos personales con estilo clásico.",
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
        imagen: "/img/butaca-mendoza.png",
        alt: "Butaca individual tapizada",
        precio: 240000,
        destacado: false,
        descripcionCorta: "Butaca individual tapizada, ideal para living o dormitorio.",
        descripcionLarga:
            "Butaca individual tapizada en tela suave, con patas de madera torneada. Perfecta como rincón de lectura en living o dormitorio.",
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
        imagen: "/img/mesa-de-centro-araucaria.png",
        alt: "Mesa de centro de madera",
        precio: 150000,
        destacado: false,
        descripcionCorta: "Mesa de centro de madera, ideal para acompañar tu sillón o sofá.",
        descripcionLarga:
            "Mesa de centro de líneas simples fabricada en madera maciza, pensada para acompañar sillones y sofás en el living.",
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
        imagen: "/img/mesa-de-noche-aconcagua.png",
        alt: "Mesa de noche con cajón",
        precio: 95000,
        destacado: false,
        descripcionCorta: "Mesa de noche compacta con cajón, ideal para el dormitorio.",
        descripcionLarga:
            "Mesa de noche compacta con un cajón amplio, pensada para acompañar cualquier dormitorio sin ocupar demasiado espacio.",
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
        imagen: "/img/silla-de-trabajo-belgrano.png",
        alt: "Silla de trabajo ergonómica",
        precio: 130000,
        destacado: false,
        descripcionCorta: "Silla ergonómica pensada para largas jornadas de home office.",
        descripcionLarga:
            "Silla de trabajo ergonómica con soporte lumbar, pensada para acompañar largas jornadas de estudio o home office.",
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
        imagen: "/img/sofa-patagonia.png",
        alt: "Sofá de tres cuerpos color arena",
        precio: 720000,
        destacado: false,
        descripcionCorta: "Sofá de tres cuerpos, amplio y cómodo para toda la familia.",
        descripcionLarga:
            "Sofá de tres cuerpos con tapizado color arena, amplio y cómodo, pensado como protagonista del living familiar.",
        detallesFabricacion: [
            "Estructura de madera reforzada",
            "Tapizado antimanchas",
            "Almohadones desenfundables",
            "Espuma de alta densidad"
        ]
    }
];

module.exports = PRODUCTOS;
const BASE = import.meta.env.BASE_URL;
const GUIDE_IMG = `${BASE}images/Gu%C3%ADa`;

export const LEARN_TOPICS = [
  {
    slug: 'riego-por-estacion',
    isVisible: false,
    tag: 'Riego',
    title: 'Riego por estación en Uruguay',
    summary: 'Cómo ajustar el agua según verano, otoño, invierno y primavera.',
    readTime: '6 min',
    image: `${GUIDE_IMG}/riego%20estaciones.jpeg`,
    intro:
      'En Uruguay el clima cambia bastante entre estaciones. El riego ideal no es fijo: depende de la temperatura, el viento, el tipo de maceta y la luz.',
    highlights: ['Primero mirar tierra, después regar', 'Menos agua en invierno', 'Más control en olas de calor'],
    sections: [
      {
        id: 'base',
        title: 'Regla base para no fallar',
        paragraphs: [
          'Evitá regar por calendario estricto. Regar solo por día de semana suele causar exceso.',
          'Antes de agregar agua, tocá el sustrato unos 2 a 3 cm. Si está húmedo, esperá.',
        ],
        bullets: [
          'Maceta chica seca más rápido que maceta grande.',
          'Barro seca más rápido que plástico.',
          'Planta en sombra suele necesitar menos agua.',
        ],
      },
      {
        id: 'chequeo',
        title: 'Chequeo rápido de humedad',
        paragraphs: ['Usá este mini control en menos de 1 minuto:'],
        bullets: [
          'Insertá un dedo en la tierra hasta la segunda falange.',
          'Si sale con tierra pegada y fresca, todavía no regués.',
          'Si sale seco y suelto, regá de forma pareja hasta que drene.',
          'Vaciá el plato a los 10-15 minutos para evitar encharque.',
        ],
      },
    ],
    seasonNotes: [
      { season: 'Verano (dic-feb)', notes: ['Regar temprano o al atardecer.', 'Revisar la humedad día por medio en macetas chicas.'] },
      { season: 'Otoño (mar-may)', notes: ['Bajar la frecuencia gradualmente.', 'Evitar mojar las hojas al final del día.'] },
      { season: 'Invierno (jun-ago)', notes: ['Reducir el riego en interiores fríos.', 'No fertilizar en exceso durante el reposo.'] },
      { season: 'Primavera (sep-nov)', notes: ['Aumentar el riego progresivo.', 'Controlar brotes nuevos y plagas tempranas.'] },
    ],
    relatedCatalog: [
      { label: 'Ver plantas de interior fáciles', to: '/catalogo?cat=Interior&need=facil' },
      { label: 'Ver sustratos y tierra', to: '/catalogo?cat=Sustratos%20y%20Tierra' },
    ],
  },
  {
    slug: 'sustratos-y-mezclas',
    isVisible: false,
    tag: 'Sustratos',
    title: 'Sustratos y mezclas recomendadas',
    summary: 'Qué tierra usar según la planta, la maceta y el nivel de drenaje.',
    readTime: '7 min',
    image: `${GUIDE_IMG}/sustrato.jpeg`,
    intro:
      'La tierra correcta evita la mayoría de los problemas de riego. Un buen sustrato guarda humedad sin ahogar las raíces.',
    highlights: ['No todo va con tierra negra pura', 'La perlita mejora la aireación', 'El drenaje es obligatorio'],
    sections: [
      {
        id: 'interior',
        title: 'Mezcla para interior',
        paragraphs: ['Ideal para plantas como Potus, Monstera, Drácena o Ficus elástica.'],
        bullets: [
          '50% sustrato universal',
          '30% compost maduro o humus',
          '20% perlita o material drenante',
        ],
      },
      {
        id: 'suculentas',
        title: 'Mezcla para cactus y suculentas',
        paragraphs: ['Estas plantas prefieren un secado rápido entre riegos.'],
        bullets: [
          '40% sustrato liviano',
          '40% arena gruesa o pómez',
          '20% perlita',
        ],
      },
      {
        id: 'errores',
        title: 'Errores comunes',
        bullets: [
          'Usar tierra compacta sin porosidad.',
          'Reutilizar sustrato viejo sin renovarlo.',
          'Olvidar la capa drenante y los agujeros en la maceta.',
        ],
      },
    ],
    relatedCatalog: [
      { label: 'Ver sustratos disponibles', to: '/catalogo?cat=Sustratos%20y%20Tierra' },
      { label: 'Ver macetas con drenaje', to: '/catalogo?cat=Macetas' },
    ],
  },
  {
    slug: 'macetas-y-drenaje',
    isVisible: false,
    tag: 'Macetas',
    title: 'Macetas y drenaje sin errores',
    summary: 'Cómo elegir el material, tamaño y drenaje para cada planta.',
    readTime: '5 min',
    image: `${GUIDE_IMG}/macetas.jpeg`,
    intro:
      'La maceta influye directamente en el riego y la salud de las raíces. Elegir bien evita la podredumbre y el estrés hídrico.',
    highlights: ['Drenaje primero', 'Tamaño proporcional', 'Material según tu rutina'],
    sections: [
      {
        id: 'materiales',
        title: 'Barro, plástico o cerámica',
        bullets: [
          'Barro: respira y seca rápido. Ideal para quienes riegan de más.',
          'Plástico: retiene humedad. Bueno si regás poco o hay viento.',
          'Cerámica esmaltada: decorativa, revisar drenaje real.',
        ],
      },
      {
        id: 'tamano',
        title: 'Tamaño recomendado',
        bullets: [
          'Evitá pasar a una maceta enorme de golpe.',
          'Subí solo 2 a 4 cm de diámetro respecto a la actual.',
          'Si hay demasiada tierra libre, tarda más en secar.',
        ],
      },
    ],
    relatedCatalog: [{ label: 'Ver macetas', to: '/catalogo?cat=Macetas' }],
  },
  {
    slug: 'luz-y-ubicacion',
    isVisible: false,
    tag: 'Luz',
    title: 'Luz y ubicación de plantas',
    summary: 'Cómo identificar si tu espacio tiene mucha, media o poca luz.',
    readTime: '5 min',
    image: `${GUIDE_IMG}/iluminacion.jpeg`,
    intro:
      'La luz es el factor más importante para elegir la especie. No todas las plantas aguantan los mismos rincones.',
    highlights: ['No toda ventana es igual', 'El sol directo quema algunas hojas', 'Mover 1 metro cambia mucho'],
    sections: [
      {
        id: 'mapa-luz',
        title: 'Mapa rápido de luz en casa',
        bullets: [
          'Mucha luz: cerca de la ventana con sol varias horas.',
          'Luz media: claridad abundante sin sol directo fuerte.',
          'Poca luz: rincón interior lejos de la ventana.',
        ],
      },
      {
        id: 'senales',
        title: 'Señales de luz insuficiente o excesiva',
        bullets: [
          'Poca luz: entrenudos largos, hojas chicas, pérdida de color.',
          'Exceso de sol: manchas secas, bordes quemados.',
          'Solución: mover de a poco y observar de 7 a 10 días.',
        ],
      },
    ],
    relatedCatalog: [
      { label: 'Plantas para poca luz', to: '/catalogo?cat=Interior&need=poca-luz' },
      { label: 'Plantas de exterior', to: '/catalogo?cat=Exterior' },
    ],
  },
  {
    slug: 'plagas-comunes-uruguay',
    isVisible: false,
    tag: 'Plagas',
    title: 'Plagas comunes en Uruguay',
    summary: 'Cómo prevenir y actuar a tiempo sin complicaciones.',
    readTime: '6 min',
    image: `${GUIDE_IMG}/plagas.jpeg`,
    intro:
      'La prevención semanal evita tratamientos agresivos. Cuanto antes detectes, más fácil es resolver.',
    highlights: ['Revisión semanal en hojas', 'Ventilación y limpieza', 'Actuar temprano'],
    sections: [
      {
        id: 'deteccion',
        title: 'Chequeo semanal en 3 pasos',
        bullets: [
          'Revisar el envés de las hojas y brotes tiernos.',
          'Buscar puntos algodonosos, melaza o telitas finas.',
          'Separar la planta afectada del resto hasta controlar.',
        ],
      },
      {
        id: 'plagas',
        title: 'Las más frecuentes',
        bullets: [
          'Cochinilla: bolitas blancas algodonosas.',
          'Pulgón: colonias en brotes nuevos.',
          'Arañuela: punteado y telitas en hojas.',
          'Hongos: manchas oscuras asociadas a exceso de humedad.',
        ],
      },
    ],
    relatedCatalog: [{ label: 'Ver productos de cuidado', to: '/catalogo?cat=Fertilizantes%20y%20Cuidado' }],
  },
  {
    slug: 'calendario-botanico-uruguay',
    isVisible: false,
    tag: 'Calendario',
    title: 'Calendario botánico en Uruguay',
    summary: 'Qué conviene hacer cada mes para mantener tus plantas fuertes.',
    readTime: '8 min',
    image: `${GUIDE_IMG}/calendario.jpeg`,
    intro:
      'Este calendario te ayuda a planificar las tareas sin sobrecargar tus plantas. Sirve para interior, exterior y huerta en maceta.',
    highlights: ['Tareas por bloque estacional', 'Poda y trasplante en el momento correcto', 'Prevención antes de extremos climáticos'],
    sections: [
      {
        id: 'calido',
        title: 'Época cálida (sep-feb)',
        bullets: [
          'Mayor crecimiento: ajustar riego y fertilización.',
          'Controlar plagas por aumento de temperatura.',
          'Podas suaves para ordenar la forma y estimular brotes.',
        ],
      },
      {
        id: 'frio',
        title: 'Época fría (mar-ago)',
        bullets: [
          'Reducir el riego y evitar encharques.',
          'Proteger especies sensibles de las heladas.',
          'Preparar sustratos para el recambio de primavera.',
        ],
      },
    ],
    relatedCatalog: [
      { label: 'Ver huerta y aromáticas', to: '/catalogo?cat=Huerta' },
      { label: 'Ver plantas de interior', to: '/catalogo?cat=Interior' },
    ],
  },
  {
    slug: 'guia-ficus-lyrata',
    isVisible: true,
    tag: 'Guía definitiva',
    title: 'Guía completa del Ficus Lyrata',
    summary: 'De hojas caídas a follaje exuberante: luz, riego, suelo y soluciones concretas.',
    readTime: '10 min',
    image: `${GUIDE_IMG}/iluminacion.jpeg`,
    intro:
      'Esta guía te muestra, paso a paso, cómo ubicar y cuidar tu Ficus Lyrata en Uruguay para evitar hojas amarillas, manchas y pérdida de vigor.',
    highlights: ['Ideal para interior luminoso', 'Muy sensible al exceso de agua', 'Responde mejor a rutinas estables'],
    sections: [
      {
        id: 'luz',
        title: '1. La luz: el secreto del éxito',
        paragraphs: [
          'El Ficus Lyrata necesita muchísima claridad para crecer fuerte. En Uruguay funciona muy bien cerca de una ventana este o norte con sol filtrado.',
          'No conviene ubicarlo en rincones oscuros ni exponerlo de golpe al sol duro de la tarde, porque puede quemar sus hojas.',
        ],
        bullets: [
          'Ideal: luz indirecta brillante durante gran parte del día.',
          'Aceptable: sol suave de mañana con cortina clara.',
          'Riesgoso: oeste con sol directo fuerte sin protección.',
        ],
      },
      {
        id: 'riego',
        title: '2. Riego: cuánto y cuándo',
        paragraphs: [
          'La causa más común de problemas en el Lyrata es regar de más. Regá solo cuando los primeros centímetros del sustrato estén secos.',
          'En invierno suele necesitar bastante menos agua que en primavera y verano.',
        ],
        bullets: [
          'Primavera/verano: controlar la humedad cada 3-4 días.',
          'Otoño/invierno: espaciar riegos y evitar encharques.',
          'Siempre vaciar el plato después de drenar.',
        ],
      },
      {
        id: 'suelo',
        title: '3. Suelo y maceta',
        paragraphs: [
          'Prefiere un sustrato aireado y una maceta con drenaje real. Si el sustrato queda compactado, las raíces sufren y aparecen síntomas en las hojas.',
        ],
        bullets: [
          'Mezcla recomendada: sustrato universal + perlita + compost.',
          'Maceta: subir solo 2-4 cm de diámetro por trasplante.',
          'Trasplante ideal: inicio de primavera.',
        ],
      },
    ],
    problems: [
      {
        title: 'Hojas amarillas',
        description: 'Suele indicar exceso de riego o sustrato agotado.',
        solution: 'Dejá secar más entre riegos y mejorá el drenaje.',
      },
      {
        title: 'Puntas marrones',
        description: 'Puede deberse a baja humedad o riego irregular.',
        solution: 'Regularizá el riego y evitá corrientes de aire seco.',
      },
      {
        title: 'Caída de hojas',
        description: 'Frecuente por cambios bruscos de lugar o temperatura.',
        solution: 'Mantené una ubicación estable y sin corrientes frías.',
      },
    ],
    faqs: [
      {
        question: '¿Cada cuánto regar un Ficus Lyrata en Uruguay?',
        answer:
          'No se riega por calendario fijo. Regá cuando la capa superior del sustrato esté seca. En invierno suele requerir menos agua.',
      },
      {
        question: '¿Puede recibir sol directo?',
        answer:
          'Tolera sol suave de mañana. El sol fuerte de la tarde, sobre todo en verano, puede quemar las hojas si no hay filtro.',
      },
      {
        question: '¿Por qué se le caen las hojas de abajo?',
        answer:
          'Puede ser por estrés de traslado, cambios de luz o riego excesivo. Si el resto de la planta se ve sana, suele recuperarse al estabilizar los cuidados.',
      },
    ],
    relatedGuides: [
      { slug: 'luz-y-ubicacion', title: 'Luz y ubicación de plantas', summary: 'Aprendé a leer la luz de tu casa antes de ubicar cualquier especie.' },
      { slug: 'riego-por-estacion', title: 'Riego por estación en Uruguay', summary: 'Ajustá la frecuencia y cantidad de agua según la época del año.' },
      { slug: 'sustratos-y-mezclas', title: 'Sustratos y mezclas recomendadas', summary: 'La base para evitar el exceso de agua y raíces debilitadas.' },
    ],
    relatedCatalog: [
      { label: 'Ver Ficus y plantas de interior', to: '/catalogo?cat=Interior&q=Ficus' },
      { label: 'Ver macetas con drenaje', to: '/catalogo?cat=Macetas' },
    ],
  },
];

export const getLearnTopicBySlug = (topicSlug) =>
  LEARN_TOPICS.find((topic) => topic.slug === topicSlug);

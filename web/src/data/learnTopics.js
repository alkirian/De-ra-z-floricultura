const BASE = import.meta.env.BASE_URL;
const GUIDE_IMG = `${BASE}images/Gu%C3%ADa`;

export const LEARN_TOPICS = [
  {
    slug: 'riego-por-estacion',
    isVisible: false,
    tag: 'Riego',
    title: 'Riego por estacion en Uruguay',
    summary: 'Como ajustar el agua segun verano, otono, invierno y primavera.',
    readTime: '6 min',
    image: `${GUIDE_IMG}/riego%20estaciones.jpeg`,
    intro:
      'En Uruguay el clima cambia bastante entre estaciones. El riego ideal no es fijo: depende de temperatura, viento, tipo de maceta y luz.',
    highlights: ['Primero mirar tierra, despues regar', 'Menos agua en invierno', 'Mas control en olas de calor'],
    sections: [
      {
        id: 'base',
        title: 'Regla base para no fallar',
        paragraphs: [
          'Evita regar por calendario estricto. Regar solo por dia de semana suele causar exceso.',
          'Antes de agregar agua, toca el sustrato 2 a 3 cm. Si esta humedo, espera.',
        ],
        bullets: [
          'Maceta chica seca mas rapido que maceta grande.',
          'Barro seca mas rapido que plastico.',
          'Planta en sombra suele necesitar menos agua.',
        ],
      },
      {
        id: 'chequeo',
        title: 'Chequeo rapido de humedad',
        paragraphs: ['Usa este mini control en menos de 1 minuto:'],
        bullets: [
          'Inserta un dedo en la tierra hasta la segunda falange.',
          'Si sale con tierra pegada y fresca, todavia no riegues.',
          'Si sale seco y suelto, riega de forma pareja hasta que drene.',
          'Vaciar el plato a los 10-15 minutos para evitar encharque.',
        ],
      },
    ],
    seasonNotes: [
      { season: 'Verano (dic-feb)', notes: ['Regar temprano o al atardecer.', 'Revisar humedad dia por medio en macetas chicas.'] },
      { season: 'Otono (mar-may)', notes: ['Bajar frecuencia gradualmente.', 'Evitar mojar hojas al final del dia.'] },
      { season: 'Invierno (jun-ago)', notes: ['Reducir riego en interiores frios.', 'No fertilizar en exceso durante reposo.'] },
      { season: 'Primavera (sep-nov)', notes: ['Aumentar riego progresivo.', 'Controlar brotes nuevos y plagas tempranas.'] },
    ],
    relatedCatalog: [
      { label: 'Ver plantas de interior faciles', to: '/catalogo?cat=Interior&need=facil' },
      { label: 'Ver sustratos y tierra', to: '/catalogo?cat=Sustratos%20y%20Tierra' },
    ],
  },
  {
    slug: 'sustratos-y-mezclas',
    isVisible: false,
    tag: 'Sustratos',
    title: 'Sustratos y mezclas recomendadas',
    summary: 'Que tierra usar segun planta, maceta y nivel de drenaje.',
    readTime: '7 min',
    image: `${GUIDE_IMG}/sustrato.jpeg`,
    intro:
      'La tierra correcta evita la mayoria de problemas de riego. Un buen sustrato guarda humedad sin ahogar raices.',
    highlights: ['No todo va con tierra negra pura', 'La perlita mejora aireacion', 'El drenaje es obligatorio'],
    sections: [
      {
        id: 'interior',
        title: 'Mezcla para interior',
        paragraphs: ['Ideal para plantas como Potus, Monstera, Dracena o Ficus elastica.'],
        bullets: [
          '50% sustrato universal',
          '30% compost maduro o humus',
          '20% perlita o material drenante',
        ],
      },
      {
        id: 'suculentas',
        title: 'Mezcla para cactus y suculentas',
        paragraphs: ['Estas plantas prefieren secado rapido entre riegos.'],
        bullets: [
          '40% sustrato liviano',
          '40% arena gruesa o pomez',
          '20% perlita',
        ],
      },
      {
        id: 'errores',
        title: 'Errores comunes',
        bullets: [
          'Usar tierra compacta sin porosidad.',
          'Reutilizar sustrato viejo sin renovarlo.',
          'Olvidar capa drenante y agujeros en maceta.',
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
    summary: 'Como elegir material, tamano y drenaje para cada planta.',
    readTime: '5 min',
    image: `${GUIDE_IMG}/macetas.jpeg`,
    intro:
      'La maceta influye directamente en el riego y la salud de las raices. Elegir bien evita podredumbre y estres hidrico.',
    highlights: ['Drenaje primero', 'Tamano proporcional', 'Material segun tu rutina'],
    sections: [
      {
        id: 'materiales',
        title: 'Barro, plastico o ceramica',
        bullets: [
          'Barro: respira y seca rapido. Ideal para quienes riegan de mas.',
          'Plastico: retiene humedad. Bueno si riegas poco o hay viento.',
          'Ceramica esmaltada: decorativa, revisar drenaje real.',
        ],
      },
      {
        id: 'tamano',
        title: 'Tamano recomendado',
        bullets: [
          'Evita pasar a una maceta enorme de golpe.',
          'Sube solo 2 a 4 cm de diametro respecto a la actual.',
          'Si hay demasiada tierra libre, tarda mas en secar.',
        ],
      },
    ],
    relatedCatalog: [{ label: 'Ver macetas', to: '/catalogo?cat=Macetas' }],
  },
  {
    slug: 'luz-y-ubicacion',
    isVisible: false,
    tag: 'Luz',
    title: 'Luz y ubicacion de plantas',
    summary: 'Como identificar si tu espacio tiene mucha, media o poca luz.',
    readTime: '5 min',
    image: `${GUIDE_IMG}/iluminacion.jpeg`,
    intro:
      'La luz es el factor mas importante para elegir especie. No todas las plantas aguantan los mismos rincones.',
    highlights: ['No toda ventana es igual', 'Sol directo quema algunas hojas', 'Mover 1 metro cambia mucho'],
    sections: [
      {
        id: 'mapa-luz',
        title: 'Mapa rapido de luz en casa',
        bullets: [
          'Mucha luz: cerca de ventana con sol varias horas.',
          'Luz media: claridad abundante sin sol directo fuerte.',
          'Poca luz: rincon interior lejos de ventana.',
        ],
      },
      {
        id: 'senales',
        title: 'Senales de luz insuficiente o excesiva',
        bullets: [
          'Poca luz: entrenudos largos, hojas chicas, perdida de color.',
          'Exceso de sol: manchas secas, bordes quemados.',
          'Solucion: mover de a poco y observar 7 a 10 dias.',
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
    summary: 'Como prevenir y actuar a tiempo sin complicaciones.',
    readTime: '6 min',
    image: `${GUIDE_IMG}/plagas.jpeg`,
    intro:
      'La prevencion semanal evita tratamientos agresivos. Cuanto antes detectes, mas facil es resolver.',
    highlights: ['Revision semanal en hojas', 'Ventilacion y limpieza', 'Actuar temprano'],
    sections: [
      {
        id: 'deteccion',
        title: 'Chequeo semanal en 3 pasos',
        bullets: [
          'Revisar enves de hojas y brotes tiernos.',
          'Buscar puntos algodonosos, melaza o telitas finas.',
          'Separar planta afectada del resto hasta controlar.',
        ],
      },
      {
        id: 'plagas',
        title: 'Las mas frecuentes',
        bullets: [
          'Cochinilla: bolitas blancas algodonosas.',
          'Pulgon: colonias en brotes nuevos.',
          'Aranuela: punteado y telitas en hojas.',
          'Hongos: manchas oscuras con exceso de humedad.',
        ],
      },
    ],
    relatedCatalog: [{ label: 'Ver productos de cuidado', to: '/catalogo?cat=Fertilizantes%20y%20Cuidado' }],
  },
  {
    slug: 'calendario-botanico-uruguay',
    isVisible: false,
    tag: 'Calendario',
    title: 'Calendario botanico Uruguay',
    summary: 'Que conviene hacer cada mes para mantener tus plantas fuertes.',
    readTime: '8 min',
    image: `${GUIDE_IMG}/calendario.jpeg`,
    intro:
      'Este calendario te ayuda a planificar tareas sin sobrecargar tus plantas. Sirve para interior, exterior y huerta en maceta.',
    highlights: ['Tareas por bloque estacional', 'Poda y trasplante en momento correcto', 'Prevencion antes de extremos climaticos'],
    sections: [
      {
        id: 'calido',
        title: 'Epoca calida (sep-feb)',
        bullets: [
          'Mayor crecimiento: ajustar riego y fertilizacion.',
          'Controlar plagas por aumento de temperatura.',
          'Podas suaves para ordenar forma y estimular brotes.',
        ],
      },
      {
        id: 'frio',
        title: 'Epoca fria (mar-ago)',
        bullets: [
          'Reducir riego y evitar encharques.',
          'Proteger especies sensibles de heladas.',
          'Preparar sustratos para recambio de primavera.',
        ],
      },
    ],
    relatedCatalog: [
      { label: 'Ver huerta y aromaticas', to: '/catalogo?cat=Huerta' },
      { label: 'Ver plantas de interior', to: '/catalogo?cat=Interior' },
    ],
  },
  {
    slug: 'guia-ficus-lyrata',
    isVisible: true,
    tag: 'Guia definitiva',
    title: 'Guia completa del Ficus Lyrata',
    summary: 'De hojas caidas a follaje exuberante: luz, riego, suelo y soluciones concretas.',
    readTime: '10 min',
    image: `${GUIDE_IMG}/iluminacion.jpeg`,
    intro:
      'Esta guia te muestra, paso a paso, como ubicar y cuidar tu Ficus Lyrata en Uruguay para evitar hojas amarillas, manchas y perdida de vigor.',
    highlights: ['Ideal para interior luminoso', 'Muy sensible al exceso de agua', 'Responde mejor a rutinas estables'],
    sections: [
      {
        id: 'luz',
        title: '1. La luz: el secreto del exito',
        paragraphs: [
          'El Ficus Lyrata necesita muchisima claridad para crecer fuerte. En Uruguay funciona muy bien cerca de una ventana este o norte con sol filtrado.',
          'No conviene ubicarlo en rincones oscuros ni exponerlo de golpe al sol duro de tarde, porque puede quemar hojas.',
        ],
        bullets: [
          'Ideal: luz indirecta brillante durante gran parte del dia.',
          'Aceptable: sol suave de manana con cortina clara.',
          'Riesgoso: oeste con sol directo fuerte sin proteccion.',
        ],
      },
      {
        id: 'riego',
        title: '2. Riego: cuanto y cuando',
        paragraphs: [
          'La causa mas comun de problemas en Lyrata es regar de mas. Rega solo cuando los primeros centimetros del sustrato esten secos.',
          'En invierno suele necesitar bastante menos agua que en primavera y verano.',
        ],
        bullets: [
          'Primavera/verano: controlar humedad cada 3-4 dias.',
          'Otono/invierno: espaciar riegos y evitar encharques.',
          'Siempre vaciar el plato despues de drenar.',
        ],
      },
      {
        id: 'suelo',
        title: '3. Suelo y maceta',
        paragraphs: [
          'Prefiere sustrato aireado y maceta con drenaje real. Si el sustrato queda compactado, las raices sufren y aparecen sintomas en hojas.',
        ],
        bullets: [
          'Mezcla recomendada: sustrato universal + perlita + compost.',
          'Maceta: subir solo 2-4 cm de diametro por trasplante.',
          'Trasplante ideal: inicio de primavera.',
        ],
      },
    ],
    problems: [
      {
        title: 'Hojas amarillas',
        description: 'Suele indicar exceso de riego o sustrato agotado.',
        solution: 'Deja secar mas entre riegos y mejora drenaje.',
      },
      {
        title: 'Puntas marrones',
        description: 'Puede deberse a baja humedad o riego irregular.',
        solution: 'Regulariza riego y evita corrientes de aire seco.',
      },
      {
        title: 'Caida de hojas',
        description: 'Frecuente por cambios bruscos de lugar o temperatura.',
        solution: 'Mantene una ubicacion estable y sin corrientes frias.',
      },
    ],
    faqs: [
      {
        question: 'Cada cuanto regar un Ficus Lyrata en Uruguay?',
        answer:
          'No se riega por calendario fijo. Rega cuando la capa superior del sustrato este seca. En invierno suele requerir menos agua.',
      },
      {
        question: 'Puede recibir sol directo?',
        answer:
          'Tolera sol suave de manana. El sol fuerte de tarde, sobre todo en verano, puede quemar hojas si no hay filtro.',
      },
      {
        question: 'Por que se le caen hojas de abajo?',
        answer:
          'Puede ser por estres de traslado, cambios de luz o riego excesivo. Si el resto de la planta se ve sana, suele recuperarse al estabilizar cuidados.',
      },
    ],
    relatedGuides: [
      { slug: 'luz-y-ubicacion', title: 'Luz y ubicacion de plantas', summary: 'Aprende a leer la luz de tu casa antes de ubicar cualquier especie.' },
      { slug: 'riego-por-estacion', title: 'Riego por estacion en Uruguay', summary: 'Ajusta frecuencia y cantidad de agua segun epoca del ano.' },
      { slug: 'sustratos-y-mezclas', title: 'Sustratos y mezclas recomendadas', summary: 'La base para evitar exceso de agua y raices debilitadas.' },
    ],
    relatedCatalog: [
      { label: 'Ver Ficus y plantas de interior', to: '/catalogo?cat=Interior&q=Ficus' },
      { label: 'Ver macetas con drenaje', to: '/catalogo?cat=Macetas' },
    ],
  },
];

export const getLearnTopicBySlug = (topicSlug) =>
  LEARN_TOPICS.find((topic) => topic.slug === topicSlug);

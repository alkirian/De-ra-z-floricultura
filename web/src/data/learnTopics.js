const BASE = import.meta.env.BASE_URL;
const GUIDE_IMG = `${BASE}images/Gu%C3%ADa`;

export const LEARN_TOPICS = [
  {
    slug: 'guia-ficus-lyrata',
    isVisible: true,
    tag: 'Guía definitiva',
    title: 'Guía completa del Ficus Lyrata',
    seoTitle: 'Cuidados del Ficus Lyrata en Uruguay | De Raíz Floricultura',
    seoDescription: 'Guía completa del Ficus Lyrata: luz ideal, cuándo regar, sustrato y problemas comunes. Consejos adaptados al clima uruguayo de De Raíz.',
    summary: 'Consejos prácticos para pasar de una planta triste a una llena de hojas verdes y fuertes.',
    readTime: '10 min',
    image: `${BASE}images/Gu%C3%ADas/ficus%20lyrata.webp`,
    intro:
      'Esta guía te muestra de forma sencilla cómo ubicar y cuidar tu Ficus Lyrata en Uruguay para evitar que se le caigan las hojas o le salgan manchas y lograr que crezca divino.',
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
        description: 'Suele indicar exceso de riego o sustrato acotado.',
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
    relatedCatalog: [
      { label: 'Ver Ficus y plantas de interior', to: '/catalogo?cat=Interior&q=Ficus' },
      { label: 'Ver macetas con drenaje', to: '/catalogo?cat=Macetas' },
    ],
  },
  {
    slug: 'guia-espada-de-san-jorge',
    isVisible: true,
    tag: 'Guía definitiva',
    title: 'Guía completa de la Espada de San Jorge (Sansevieria)',
    seoTitle: 'Cuidados de la Espada de San Jorge (Sansevieria) | De Raíz Uruguay',
    seoDescription:
      'Aprende a cuidar tu Espada de San Jorge. Guía rápida sobre riego en invierno, luz ideal y solución a hojas caídas o podridas. Visita De Raíz.',
    summary: 'Consejos sobre luz, riego y sustrato para mantener tu Sansevieria siempre sana.',
    readTime: '8 min',
    image: `${BASE}images/Gu%C3%ADas/san%20seivieria.webp`,
    intro:
      'La Espada de San Jorge (Sansevieria) es de las plantas más aguantadoras que existen. Purifica el aire y tolera descuidos, pero tiene una debilidad: el exceso de agua. Te contamos cómo cuidarla para tenerla siempre fuerte.',
    highlights: ['Luz adaptable (desde sombra a sol)', 'Riego muy espaciado', 'Sustrato que drene bien'],
    sections: [
      {
        id: 'luz',
        title: '1. ¿Cuánta luz necesita?',
        paragraphs: [
          'Es famosa por sobrevivir en rincones con poca luz, pero no es lo ideal. Para que sus hojas mantengan sus colores bien definidos y crezca con fuerza, prefiere luz indirecta brillante.',
          'Se banca un par de horas de sol directo suave, sobre todo en los meses fríos de Uruguay, pero evitemos el sol fuerte del mediodía en verano para que no se le quemen las puntas.',
        ],
      },
      {
        id: 'riego',
        title: '2. El riego: menos es más',
        paragraphs: [
          'El error más común con la Espada de San Jorge es regarla de más. Acordate de que almacena agua en sus hojas gruesas.',
          'Hay que regarla recién cuando la tierra esté 100% seca de arriba a abajo. En verano, esto puede ser cada 15 días, pero en el invierno de Uruguay (cuando hay mucha humedad y hace frío), con una vez al mes alcanza y sobra. Ante la duda, es mejor no regar.',
        ],
      },
      {
        id: 'suelo',
        title: '3. El sustrato ideal',
        paragraphs: [
          'Necesita respirar. Un sustrato universal apelmazado pudrirá sus raíces en cuestión de días. Utiliza una mezcla para cactus y suculentas.',
          'En De Raíz preparamos un sustrato específico muy poroso, cargado de perlita y arena gruesa, ideal para garantizar que el agua pase de largo y no se encharque.',
        ],
      },
    ],
    problems: [
      {
        title: 'Hojas caídas o blandas',
        description: 'Si las hojas se doblan desde la base y están pastosas, tu planta tiene pudrición por exceso de agua.',
        solution: 'Retírala de la maceta de inmediato, corta las partes podridas con tijeras desinfectadas, cambia todo el sustrato por uno seco y suspende el riego.',
      },
      {
        title: 'Manchas marrones y secas',
        description: 'Suele ser indicio de quemaduras por sol directo muy fuerte, o daño por corrientes de aire helado en invierno.',
        solution: 'Reubica la maceta a un lugar más resguardado con luz indirecta brillante.',
      },
      {
        title: 'La planta no crece',
        description: 'La Sansevieria es de crecimiento lento. Si no da brotes, puede estar en un rincón demasiado oscuro o en una maceta excesivamente grande.',
        solution: 'Acércala a la luz y plántala en macetas ajustadas; prefieren estar ligeramente apretadas.',
      },
    ],
    relatedCatalog: [
      { label: 'Ver macetas para interior', to: '/catalogo?cat=Macetas' },
      { label: 'Ver sustratos y tierra', to: '/catalogo?cat=Sustratos%20y%20Tierra' },
    ],
  },
  {
    slug: 'guia-monstera-deliciosa',
    isVisible: true,
    tag: 'Guía definitiva',
    title: 'Guía completa de la Monstera Deliciosa',
    seoTitle: 'Cuidados de la Monstera Deliciosa en Uruguay | De Raíz',
    seoDescription: 'Aprende a cuidar tu Monstera Deliciosa. Luz ideal, riego estacional, sustrato y diagnóstico de hojas amarillas en Uruguay.',
    summary: 'Cómo cuidar sus hojas caladas, riego por estación, sustrato poroso y hacer esquejes.',
    readTime: '8 min',
    image: `${BASE}images/Interior.jpeg`,
    intro:
      'La Costilla de Adán (Monstera Deliciosa) se roba todas las miradas con sus hojas enormes y caladas. En esta guía te contamos cómo entender lo que necesita para que crezca hermosa y fuerte en casa.',
    highlights: ['Luz indirecta muy brillante', 'Sensible al exceso de riego', 'Fácil de propagar por esqueje'],
    sections: [
      {
        id: 'luz',
        title: '1. LA LUZ: EL MOTOR DE SUS AGUJEROS',
        paragraphs: [
          'La Monstera crece bajo el dosel forestal en las selvas de Centroamérica, recibiendo luz indirecta brillante.',
          'Evita el sol directo fuerte de la tarde en el verano uruguayo para no quemar su follaje. Si no recibe suficiente claridad, sus hojas nuevas nacerán pequeñas y sin sus características perforaciones (fenestraciones).',
        ],
        bullets: [
          'Ubicación recomendada: cerca de ventana este o norte filtrado.',
          'Gira la maceta 90 grados al mes para un desarrollo equilibrado.',
        ],
      },
      {
        id: 'riego',
        title: '2. EL RIEGO POR ESTACIÓN EN URUGUAY',
        paragraphs: [
          'El exceso de riego es su principal enemigo. Sus raíces carnosas son altamente propensas a la pudrición si permanecen encharcadas.',
          'En verano uruguayo, el crecimiento es activo y demanda riego semanal. En invierno, baja la frecuencia drásticamente regando solo cuando el sustrato seque casi por completo.',
        ],
        bullets: [
          'Verano: regar cada 5-7 días tras secar el primer tercio del suelo.',
          'Invierno: regar cada 15-20 días y evitar pulverizar foliarmente en frío.',
        ],
      },
      {
        id: 'sustrato',
        title: '3. EL SUSTRATO IDEAL',
        paragraphs: [
          'La Monstera necesita un suelo poroso y aireado que permita a sus raíces respirar e imite el suelo de la selva tropical.',
          'Una mezcla pesada de tierra de jardín común compactará la maceta y ahogará la planta.',
        ],
        bullets: [
          'Mezcla recomendada: 40% fibra de coco, 30% perlita, 20% humus de lombriz, 10% corteza.',
          'Siempre utiliza macetas que cuenten con agujeros de drenaje reales.',
        ],
      },
      {
        id: 'propagacion',
        title: '4. PROPAGACIÓN PASO A PASO',
        paragraphs: [
          'Multiplicar la Monstera es fácil siempre y cuando cortes incluyendo un nodo (el abultamiento en el tallo del cual nacen las hojas y las raíces aéreas).',
        ],
        bullets: [
          'Corta 2 cm por debajo del nodo usando una yema desinfectada.',
          'Coloca el esqueje en agua en un rincón luminoso y cambia el agua semanalmente.',
          'Trasplanta a tierra cuando las raíces alcancen los 5-8 cm de largo.',
        ],
      },
    ],
    problems: [
      {
        title: 'Hojas amarillas inferiores',
        description: 'Suele deberse a un exceso de riego acumulado en el fondo de la maceta.',
        solution: 'Espacia los riegos y asegúrate de que el agua drene rápido y de vaciar el plato.',
      },
      {
        title: 'Puntas secas o crujientes',
        description: 'Indica falta de humedad ambiental o sequedad debido a calefacción en invierno.',
        solution: 'Pulveriza las hojas o agrúpala con otras plantas para crear un microclima húmedo.',
      },
      {
        title: 'Hojas nuevas sin cortes',
        description: 'La planta es muy joven o le falta luz natural para poder perforar sus hojas.',
        solution: 'Acércala a una ventana muy luminosa con luz indirecta brillante.',
      },
    ],
    relatedCatalog: [
      { label: 'Ver sustrato para plantas de interior', to: '/catalogo?cat=Sustratos%20y%20Tierra' },
      { label: 'Ver macetas y tutores', to: '/catalogo?cat=Macetas' },
    ],
  },
];

export const getLearnTopicBySlug = (topicSlug) =>
  LEARN_TOPICS.find((topic) => topic.slug === topicSlug);

export const BIZ_INFO = {
  name: "De Raíz Floricultura",
  location: "Las Piedras, Canelones, Uruguay (Ruta 48)",
  phone: "59893307699",
  hours: "Lunes a Sábado: 9:00 - 18:00 | Domingos: 9:00 - 13:00 (A confirmar)",
  payment: "Tarjetas de crédito, débito y efectivo",
};

export const WA_MESSAGES = {
  general: "¡Hola De Raíz! Vengo de la web y tengo una consulta general.",
  ayudaElegir: "¡Hola De Raíz! No sé qué planta elegir. ¿Me ayudan según mi espacio y luz?",
  pocaLuz: "¡Hola De Raíz! Tengo un espacio con poca luz y quiero opciones que funcionen bien.",
  plantaFacil: "¡Hola De Raíz! Quiero una planta fácil de cuidar para empezar.",
  fotoEspacio: "¡Hola De Raíz! Quiero mandar una foto de mi espacio para que me recomienden una planta.",
  diagnostico: "¡Hola De Raíz! Necesito ayuda con una planta que está decaída. ¿Les mando foto para diagnóstico?",
  disponibilidad: (producto) => `¡Hola! Quiero consultar disponibilidad y precio de "${producto}".`,
  producto: (producto) => `¡Hola! Me encantó el producto "${producto}" que vi en la web. ¿Tienen stock?`,

  ubicacion: "¡Hola! ¿Me pasan la ubicación exacta del vivero para ir a visitarlos?",
  testimonios: "Hola, vi la web de De Raíz Floricultura y quiero que me ayuden a elegir una planta."
};

export const generateWaLink = (message) => {
  return `https://wa.me/${BIZ_INFO.phone}?text=${encodeURIComponent(message)}`;
};

export const CATALOG_SECTIONS = [
  { id: 'plantas', label: '🌱 Vida y Plantas' },
  { id: 'insumos', label: '🛠️ Insumos y Macetas' }
];

export const CATEGORIES = {
  plantas: ['Todas', 'Interior', 'Exterior', 'Huerta', 'Suculentas'],
  insumos: ['Todos', 'Macetas', 'Sustratos y Tierra', 'Fertilizantes y Cuidado', 'Control de Plagas', 'Herramientas']
};

const BASE = import.meta.env.BASE_URL;
const PLANT_IMAGES_BASE_PATH = `${BASE}images/plantas%202`;
const SAFE_PLANT_IMAGES = {
  Anthurium: `${PLANT_IMAGES_BASE_PATH}/anturio.png`,
  Aphelandra: `${PLANT_IMAGES_BASE_PATH}/afelandra.png`,
  Areca: `${PLANT_IMAGES_BASE_PATH}/areca.png`,
  Chamaedorea: `${PLANT_IMAGES_BASE_PATH}/chamaedorea.png`,
  Croton: `${PLANT_IMAGES_BASE_PATH}/croton.png`,
  Dieffenbachia: `${PLANT_IMAGES_BASE_PATH}/dieffenbachia.png`,
  'Drácena': `${PLANT_IMAGES_BASE_PATH}/dracaena.png`,
  'Ficus elástica': `${PLANT_IMAGES_BASE_PATH}/ficus_elastica.png`,
  'Ficus lyrata': `${PLANT_IMAGES_BASE_PATH}/ficus_lyrata.png`,
  Monstera: `${PLANT_IMAGES_BASE_PATH}/monstera_deliciosa.png`,
  'Monstera Monkey': `${PLANT_IMAGES_BASE_PATH}/monstera_adansonii.png`,
  Peperomia: `${PLANT_IMAGES_BASE_PATH}/peperomia.png`,
  Potus: `${PLANT_IMAGES_BASE_PATH}/potus.png`,
  Raphis: `${PLANT_IMAGES_BASE_PATH}/raphis.png`,
  Sansevieria: `${PLANT_IMAGES_BASE_PATH}/sansevieria.png`,
  'Sansevieria golden': `${PLANT_IMAGES_BASE_PATH}/sansevieria_variegada.png`,
  Spathiphyllum: `${PLANT_IMAGES_BASE_PATH}/espatifilo.png`,
  'Violeta africana': `${PLANT_IMAGES_BASE_PATH}/violeta_africana.png`,
  Alternanthera: `${PLANT_IMAGES_BASE_PATH}/alternanthera_variedades.png`,
  Azalea: `${PLANT_IMAGES_BASE_PATH}/azalea_rosa.png`,
  'Azalea de parque': `${PLANT_IMAGES_BASE_PATH}/azalea_fucsia.png`,
  Calistemo: `${PLANT_IMAGES_BASE_PATH}/callistemon.png`,
  'Ciprés calvo': `${PLANT_IMAGES_BASE_PATH}/cipres.png`,
  Clavelina: `${PLANT_IMAGES_BASE_PATH}/clavelina.png`,
  Columnea: `${PLANT_IMAGES_BASE_PATH}/columnea.png`,
  Copete: `${PLANT_IMAGES_BASE_PATH}/copete.png`,
  Coprosma: `${PLANT_IMAGES_BASE_PATH}/coprosoma.png`,
  Cuphea: `${PLANT_IMAGES_BASE_PATH}/cuphea.png`,
  Dipladenia: `${PLANT_IMAGES_BASE_PATH}/dipladenia.png`,
  'Espárrago': `${PLANT_IMAGES_BASE_PATH}/esparrago.png`,
  Gazania: `${PLANT_IMAGES_BASE_PATH}/gazania.png`,
  Helecho: `${PLANT_IMAGES_BASE_PATH}/helecho_boston.png`,
  Hiedra: `${PLANT_IMAGES_BASE_PATH}/hiedra.png`,
  Lavanda: `${PLANT_IMAGES_BASE_PATH}/lavanda.png`,
  'Mini clavel': `${PLANT_IMAGES_BASE_PATH}/mini%20clavel.png`,
  'Mini viola': `${PLANT_IMAGES_BASE_PATH}/mini%20viola.png`,
  Nácar: `${PLANT_IMAGES_BASE_PATH}/flor%20de%20nacar.png`,
  Pennisetum: `${PLANT_IMAGES_BASE_PATH}/pennisetum.png`,
  Petunia: `${PLANT_IMAGES_BASE_PATH}/petunia.png`,
  'Pittosporum nana': `${PLANT_IMAGES_BASE_PATH}/pittosporum%20nana.png`,
  Limón: `${PLANT_IMAGES_BASE_PATH}/limonero.png`,
  Menta: `${PLANT_IMAGES_BASE_PATH}/menta_flor.png`,
  Pimiento: `${PLANT_IMAGES_BASE_PATH}/pimiento.png`,
  Plumbago: `${PLANT_IMAGES_BASE_PATH}/plumbago.png`,
  Romero: `${PLANT_IMAGES_BASE_PATH}/romero.png`,
  Ruda: `${PLANT_IMAGES_BASE_PATH}/ruda.png`,
  Tomillo: `${PLANT_IMAGES_BASE_PATH}/tomillo.png`,
  'Velo de novia': `${PLANT_IMAGES_BASE_PATH}/gypsophila.png`,
  Westringia: `${PLANT_IMAGES_BASE_PATH}/westringia.png`,
};

const getPlantImage = (name) => SAFE_PLANT_IMAGES[name] || `${BASE}images/placeholder_white.png`;

const EASY_PLANTS = [
  'sansevieria', 'potus', 'peperomia', 'dracena', 'spathiphyllum', 'hiedra',
  'lavanda', 'gazania', 'copete', 'petunia', 'romero', 'menta', 'ruda', 'tomillo', 'albahaca'
];
const HARD_PLANTS = ['anthurium', 'aphelandra', 'croton', 'dieffenbachia', 'ficus lyrata'];

const normalizePlantName = (value = '') => value
  .toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '');

const getDifficulty = (name) => {
  const normalized = normalizePlantName(name);
  if (EASY_PLANTS.some((term) => normalized.includes(term))) return 'Baja';
  if (HARD_PLANTS.some((term) => normalized.includes(term))) return 'Alta';
  return 'Media';
};

const PET_FRIENDLY_PLANTS = [
  'areca', 'helecho', 'calathea', 'calatea', 'raphis', 'violeta africana',
  'romero', 'tomillo', 'albahaca', 'westringia', 'aphelandra', 'peperomia', 'chamaedorea'
];

const checkIfPetFriendly = (name) => {
  const normalized = normalizePlantName(name);
  return PET_FRIENDLY_PLANTS.some((term) => normalized.includes(term));
};

const interiorPlants = [
  "Anthurium", "Aphelandra", "Areca", "Chamaedorea", "Croton", "Dieffenbachia", "Drácena", 
  "Ficus elástica", "Ficus lyrata", "Ficus variado", "Monstera", "Monstera Monkey", 
  "Paleta de pintor", "Peperomia", "Potus", "Raphis", "Sansevieria", "Sansevieria golden", 
  "Spathiphyllum", "Violeta africana"
];

const exteriorPlants = [
  "Alternanthera", "Azalea", "Azalea de parque", "Boca de sapo", "Calistemo", "Ciprés calvo", 
  "Clavelina", "Columnea", "Copete", "Coprosma", "Cuphea", "Dipladenia", "Dólar amarillo", 
  "Eugenia", "Espárrago", "Flor de azúcar", "Gazania", "Guinea", "Helecho", "Helecho Hawaii", 
  "Hiedra", "Jazmín de Hungría", "Leandro Gómez", "Lavanda", "Mini clavel", "Mini viola", 
  "Mota", "Nácar", "Óleo taxinia", "Pennisetum", "Petunia", "Pittosporum nana", "Plumbago", 
  "Velo de novia", "Viburno", "Westringia"
];

const huertaPlants = [
  "Albahaca (morada y verde)", "Limón", "Mandarino", "Menta", "Pimiento", "Romero", "Ruda", "Tomillo"
];

const PLANT_LIGHT_MAP = {
  // Interior
  'anthurium': 'Mucha claridad sin sol directo',
  'aphelandra': 'Mucha claridad sin sol directo',
  'areca': 'Mucha claridad sin sol directo',
  'chamaedorea': 'Luz baja o media (sombra o semisombra)',
  'croton': 'Mucha luz (sol directo o pleno sol)',
  'dieffenbachia': 'Luz media o brillante (sin sol directo)',
  'dracena': 'Adaptable (Sombra, poca o mucha luz)',
  'ficus elastica': 'Mucha luz (sol directo o semisombra)',
  'ficus lyrata': 'Mucha claridad sin sol directo',
  'ficus variado': 'Mucha claridad sin sol directo',
  'monstera': 'Mucha claridad sin sol directo',
  'monstera monkey': 'Mucha claridad sin sol directo',
  'paleta de pintor': 'Mucha claridad sin sol directo',
  'peperomia': 'Luz media o brillante (sin sol directo)',
  'potus': 'Adaptable (Sombra, poca o mucha luz)',
  'raphis': 'Luz baja o media (sombra o semisombra)',
  'sansevieria': 'Adaptable (Sombra, poca o mucha luz)',
  'sansevieria golden': 'Adaptable (Sombra, poca o mucha luz)',
  'spathiphyllum': 'Luz baja o media (sombra o semisombra)',
  'violeta africana': 'Mucha claridad sin sol directo',

  // Exterior
  'alternanthera': 'Mucha luz (sol directo o pleno sol)',
  'azalea': 'Luz media a mucha (semisombra)',
  'azalea de parque': 'Mucha luz (sol directo o semisombra)',
  'boca de sapo': 'Mucha luz (sol directo o semisombra)',
  'calistemo': 'Mucha luz (sol directo o pleno sol)',
  'cipres calvo': 'Mucha luz (sol directo o pleno sol)',
  'clavelina': 'Mucha luz (sol directo o pleno sol)',
  'columnea': 'Mucha claridad sin sol directo',
  'copete': 'Mucha luz (sol directo o pleno sol)',
  'coprosma': 'Mucha luz (sol directo o pleno sol)',
  'cuphea': 'Mucha luz (sol directo o pleno sol)',
  'dipladenia': 'Mucha luz (sol directo o pleno sol)',
  'dolar amarillo': 'Luz baja o media (sombra o semisombra)',
  'eugenia': 'Mucha luz (sol directo o pleno sol)',
  'esparrago': 'Luz media a mucha (semisombra)',
  'flor de azucar': 'Adaptable (Sombra, poca o mucha luz)',
  'gazania': 'Mucha luz (sol directo o pleno sol)',
  'guinea': 'Luz baja o media (sombra o semisombra)',
  'helecho': 'Luz baja o media (sombra o semisombra)',
  'helecho hawaii': 'Luz baja o media (sombra o semisombra)',
  'hiedra': 'Adaptable (Sombra, poca o mucha luz)',
  'jazmin de hungria': 'Mucha luz (sol directo o pleno sol)',
  'leandro gomez': 'Adaptable (Sombra, poca o mucha luz)',
  'lavanda': 'Mucha luz (sol directo o pleno sol)',
  'mini clavel': 'Mucha luz (sol directo o pleno sol)',
  'mini viola': 'Mucha luz (sol directo o pleno sol)',
  'mota': 'Mucha luz (sol directo o pleno sol)',
  'nacar': 'Mucha claridad sin sol directo',
  'oleo taxinia': 'Mucha luz (sol directo o pleno sol)',
  'pennisetum': 'Mucha luz (sol directo o pleno sol)',
  'petunia': 'Mucha luz (sol directo o pleno sol)',
  'pittosporum nana': 'Mucha luz (sol directo o pleno sol)',
  'plumbago': 'Mucha luz (sol directo o pleno sol)',
  'velo de novia': 'Luz baja o media (sombra o semisombra)',
  'viburno': 'Mucha luz (sol directo o pleno sol)',
  'westringia': 'Mucha luz (sol directo o pleno sol)',

  // Huerta
  'albahaca (morada y verde)': 'Mucha luz (sol directo o pleno sol)',
  'albahaca': 'Mucha luz (sol directo o pleno sol)',
  'limon': 'Mucha luz (sol directo o pleno sol)',
  'mandarino': 'Mucha luz (sol directo o pleno sol)',
  'menta': 'Adaptable (Sombra, poca o mucha luz)',
  'pimiento': 'Mucha luz (sol directo o pleno sol)',
  'romero': 'Mucha luz (sol directo o pleno sol)',
  'ruda': 'Mucha luz (sol directo o pleno sol)',
  'tomillo': 'Mucha luz (sol directo o pleno sol)'
};

const getPlantLightValue = (name) => {
  const normalized = normalizePlantName(name);
  if (PLANT_LIGHT_MAP[normalized]) {
    return PLANT_LIGHT_MAP[normalized];
  }
  const foundKey = Object.keys(PLANT_LIGHT_MAP).find(
    (k) => normalized.includes(k) || k.includes(normalized)
  );
  if (foundKey) {
    return PLANT_LIGHT_MAP[foundKey];
  }
  return 'Luz media indirecta';
};

const ESCASO_RIEGO_KEYWORDS = [
  'sansevieria', 'romero', 'tomillo', 'ruda', 'copete', 'suculentas'
];

const FRECUENTE_RIEGO_KEYWORDS = [
  'helecho', 'spathiphyllum', 'albahaca', 'limon', 'mandarino', 'pimiento', 'aphelandra'
];

const getPlantWaterValue = (name) => {
  const normalized = normalizePlantName(name);
  if (ESCASO_RIEGO_KEYWORDS.some((kw) => normalized.includes(kw))) {
    return 'Riego escaso (dejar secar por completo)';
  }
  if (FRECUENTE_RIEGO_KEYWORDS.some((kw) => normalized.includes(kw))) {
    return 'Riego frecuente (mantener húmedo)';
  }
  return 'Riego moderado (cuando seque la superficie)';
};

// Helper to generate the large array of plants
let nextId = 1;
const plantProducts = [];

// Interior
interiorPlants.forEach((name, i) => {
  plantProducts.push({
    id: nextId++,
    section: 'plantas',
    category: "Interior",
    name: name,
    price: "Consultar",
    image: getPlantImage(name),
    isPetFriendly: checkIfPetFriendly(name),
    description: `Planta de interior ${name}. Ideal para decorar tus espacios con vida.`,
    attributes: [
      { type: 'luz', value: getPlantLightValue(name) },
      { type: 'riego', value: getPlantWaterValue(name) },
      { type: 'dificultad', value: getDifficulty(name) }
    ],
    careTips: "Limpiar las hojas con un paño húmedo para mantenerlas brillantes. Evitar corrientes de aire frío y cambios bruscos de temperatura.",
    pests: "Cochinilla algodonosa, arañuela roja (en ambientes muy secos)."
  });
});

// Exterior
exteriorPlants.forEach((name, i) => {
  plantProducts.push({
    id: nextId++,
    section: 'plantas',
    category: "Exterior",
    name: name,
    price: "Consultar",
    image: getPlantImage(name),
    isPetFriendly: checkIfPetFriendly(name),
    description: `Planta de exterior ${name}. Perfecta para darle color a tu jardín o balcón.`,
    attributes: [
      { type: 'luz', value: getPlantLightValue(name) },
      { type: 'riego', value: getPlantWaterValue(name) },
      { type: 'dificultad', value: getDifficulty(name) }
    ],
    careTips: "Abonar a principios de primavera y verano. Podar ramas secas o flores marchitas para fomentar nuevo crecimiento.",
    pests: "Pulgones (especialmente en primavera), trips y hormigas cortadoras."
  });
});

// Huerta
huertaPlants.forEach((name) => {
  plantProducts.push({
    id: nextId++,
    section: 'plantas',
    category: "Huerta",
    name: name,
    price: "Consultar",
    image: getPlantImage(name),
    isPetFriendly: checkIfPetFriendly(name),
    description: `${name} perfecta para tu huerta orgánica en casa. Aromática y noble.`,
    attributes: [
      { type: 'luz', value: getPlantLightValue(name) },
      { type: 'riego', value: getPlantWaterValue(name) },
      { type: 'dificultad', value: getDifficulty(name) }
    ],
    careTips: "Cosechar regularmente para estimular el crecimiento y evitar que la planta semille prematuramente.",
    pests: "Mosca blanca, pulgones y orugas. Recomendamos preventivos orgánicos como aceite de Neem o jabón potásico."
  });
});

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
};

const newInsumoProductsRaw = [
  {
    "nombre": "Samambaias Vitaplan",
    "categoria": "Sustratos y Tierra",
    "descripcion": "Acondicionador de suelo para plantas ornamentales, ideal para mejorar la estructura del sustrato y acompañar el desarrollo de plantas de interior y exterior.",
    "detalle": "Producto para mejorar el sustrato y favorecer el desarrollo de plantas ornamentales. Especialmente útil para helechos, plantas verdes y especies de interior que requieren un sustrato aireado y con buena retención de humedad.",
    "presentacion": "Bolsa aprox. 7,5 kg",
    "uso": "Ornamentales y helechos",
    "precio": null,
    "imagen": "generica-sustratos.jpg"
  },
  {
    "nombre": "Turba de Musgo Sphagnum",
    "categoria": "Sustratos y Tierra",
    "descripcion": "Turba ideal para mejorar la retención de humedad en mezclas de sustrato y favorecer un ambiente más estable para las raíces.",
    "detalle": "Turba de musgo sphagnum recomendada para preparar mezclas de sustrato con buena retención de agua. Útil para plantas ornamentales, acidófilas, almácigos y mezclas especiales.",
    "presentacion": "Bolsa",
    "uso": "Mezclas de sustrato",
    "precio": null,
    "imagen": "generica-sustratos.jpg"
  },
  {
    "nombre": "Smartfoil Bioestimulante Orgánico",
    "categoria": "Fertilizantes y Cuidado",
    "descripcion": "Bioestimulante orgánico de uso doméstico, pensado para acompañar el crecimiento y fortalecimiento general de las plantas.",
    "detalle": "Bioestimulante orgánico a base de metabolitos de fermentación de levadura. Recomendado para fortalecer plantas, estimular su desarrollo y mejorar su respuesta general al cuidado. Leer instrucciones del envase antes de usar.",
    "presentacion": "Caja con 20 sachets",
    "uso": "Plantas de interior, exterior y huerta",
    "precio": null,
    "imagen": "generica-fertilizantes.jpg"
  },
  {
    "nombre": "Humato de Fósforo y Potasio",
    "categoria": "Fertilizantes y Cuidado",
    "descripcion": "Biofertilizante líquido con fósforo y potasio, recomendado para acompañar la etapa de floración de las plantas.",
    "detalle": "Producto líquido orientado al cuidado y nutrición de plantas en etapa de floración. Aporta nutrientes importantes para acompañar el desarrollo floral. Aplicar según indicaciones del envase.",
    "presentacion": "Botella",
    "uso": "Floración",
    "precio": null,
    "imagen": "generica-fertilizantes.jpg"
  },
  {
    "nombre": "Super Magro La Huertina",
    "categoria": "Fertilizantes y Cuidado",
    "descripcion": "Biofertilizante líquido recomendado para acompañar el crecimiento y desarrollo general de las plantas.",
    "detalle": "Producto líquido para uso en jardinería y huerta. Recomendado para estimular el crecimiento vegetal y acompañar el mantenimiento de plantas sanas. Aplicar siguiendo las indicaciones del envase.",
    "presentacion": "Botella",
    "uso": "Crecimiento vegetal",
    "precio": null,
    "imagen": "generica-fertilizantes.jpg"
  },
  {
    "nombre": "Brillo para Hojas Gran Amor",
    "categoria": "Fertilizantes y Cuidado",
    "descripcion": "Producto para aportar brillo y cuidado a las hojas de plantas ornamentales de interior.",
    "detalle": "Producto líquido para cuidado foliar. Ayuda a mejorar la presentación de las hojas y acompañar el mantenimiento de plantas ornamentales. Ideal para plantas de interior.",
    "presentacion": "Botella 220 cm³ aprox.",
    "uso": "Hojas y plantas ornamentales",
    "precio": null,
    "imagen": "generica-cuidado-plantas.jpg"
  },
  {
    "nombre": "Sulfato de Hierro Crece Más",
    "categoria": "Fertilizantes y Cuidado",
    "descripcion": "Corrector mineral a base de hierro, recomendado para el cuidado nutricional de plantas, árboles y jardín.",
    "detalle": "Sulfato de hierro para corregir deficiencias minerales y acompañar el desarrollo saludable de las plantas. Ayuda a mejorar el color y vigor general. Utilizar según instrucciones de la etiqueta.",
    "presentacion": "Bolsa",
    "uso": "Plantas, árboles y jardín",
    "precio": null,
    "imagen": "generica-fertilizantes.jpg"
  },
  {
    "nombre": "Nutri Cobre Vitaplan",
    "categoria": "Fertilizantes y Cuidado",
    "descripcion": "Fertilizante mineral mixto con cobre, presentado en formato spray para aplicación práctica.",
    "detalle": "Producto mineral con sulfato de cobre para el cuidado de plantas. Recomendado para mantenimiento preventivo y nutricional según indicaciones del fabricante. Leer etiqueta antes de usar.",
    "presentacion": "Spray 500 ml",
    "uso": "Cuidado de plantas",
    "precio": null,
    "imagen": "generica-cuidado-plantas.jpg"
  },
  {
    "nombre": "Fertilizante para Orquídeas",
    "categoria": "Fertilizantes y Cuidado",
    "descripcion": "Fertilizante específico para el cuidado y nutrición de orquídeas.",
    "detalle": "Producto orientado al mantenimiento de orquídeas. Ayuda a acompañar su crecimiento y floración cuando se utiliza correctamente. Presentación exacta y modo de uso a confirmar según etiqueta.",
    "presentacion": "A confirmar",
    "uso": "Orquídeas",
    "precio": null,
    "imagen": "generica-orquideas.jpg"
  },
  {
    "nombre": "Cero Plaga Hormiguicida",
    "categoria": "Control de Plagas",
    "descripcion": "Hormiguicida para uso en hogar y jardín, indicado para el control de hormigas.",
    "detalle": "Producto para el control de hormigas en espacios de hogar y jardín. Aplicar únicamente según las instrucciones del envase. Leer etiqueta, dosis y precauciones antes de usar.",
    "presentacion": "Botella spray",
    "uso": "Hormigas",
    "precio": null,
    "imagen": "generica-plagas.jpg"
  },
  {
    "nombre": "Cero Plaga Caracolicida",
    "categoria": "Control de Plagas",
    "descripcion": "Producto para el control de caracoles y babosas en jardín y plantas ornamentales.",
    "detalle": "Caracolicida para uso en jardín. Recomendado para controlar caracoles y babosas en zonas con plantas. Usar con precaución y seguir las instrucciones del envase. Leer etiqueta, dosis y precauciones antes de usar.",
    "presentacion": "Botella spray",
    "uso": "Caracoles y babosas",
    "precio": null,
    "imagen": "generica-plagas.jpg"
  },
  {
    "nombre": "Gran Amor Cura las Plantas",
    "categoria": "Control de Plagas",
    "descripcion": "Insecticida acaricida para el cuidado de plantas ornamentales de interior y exterior.",
    "detalle": "Producto para el cuidado de plantas frente a insectos y ácaros. Recomendado para plantas ornamentales. Leer etiqueta, dosis y precauciones antes de usar.",
    "presentacion": "Envase 500 cm³",
    "uso": "Insectos y ácaros",
    "precio": null,
    "imagen": "generica-plagas.jpg"
  },
  {
    "nombre": "Fungicida Orgánico Gran Amor",
    "categoria": "Control de Plagas",
    "descripcion": "Fungicida orgánico para el control de hongos en plantas.",
    "detalle": "Producto orgánico para el control de hongos en plantas. Aplicar según indicaciones del envase. Leer etiqueta, dosis y precauciones antes de usar.",
    "presentacion": "Botella 500 cm³",
    "uso": "Hongos en plantas",
    "precio": null,
    "imagen": "generica-plagas.jpg"
  },
  {
    "nombre": "Aceite de Neem + Jabón Potásico",
    "categoria": "Control de Plagas",
    "descripcion": "Producto a base de aceite de neem y jabón potásico para el cuidado de árboles, plantas y huerta.",
    "detalle": "Producto recomendado para el control and prevención de insectos y hongos en plantas. Apto para árboles, plantas ornamentales y huerta según indicaciones del envase. Leer etiqueta, dosis y precauciones antes de usar.",
    "presentacion": "Botella 500 ml / 1 L",
    "uso": "Árboles, plantas y huerta",
    "precio": null,
    "imagen": "generica-plagas.jpg"
  },
  {
    "nombre": "Jabón Potásico La Huertina",
    "categoria": "Control de Plagas",
    "descripcion": "Jabón potásico de amplio espectro para el cuidado de árboles y plantas.",
    "detalle": "Jabón potásico para control de insectos en plantas. Producto apto para árboles y plantas según indicaciones del envase. Leer etiqueta, dosis y precauciones antes de usar.",
    "presentacion": "Botella o spray",
    "uso": "Árboles y plantas",
    "precio": null,
    "imagen": "generica-plagas.jpg"
  },
  {
    "nombre": "Tribel Multiuso",
    "categoria": "Control de Plagas",
    "descripcion": "Insecticida multiuso para el control de insectos en plantas.",
    "detalle": "Insecticida de uso múltiple para plantas. Producto químico: leer etiqueta, dosis y precauciones antes de usar.",
    "presentacion": "Botella 100 ml",
    "uso": "Control de insectos",
    "precio": null,
    "imagen": "generica-plagas.jpg"
  },
  {
    "nombre": "Cipermic 25",
    "categoria": "Control de Plagas",
    "descripcion": "Insecticida piretroide concentrado emulsionable de uso agrícola.",
    "detalle": "Insecticida concentrado emulsionable piretroide. Producto de uso agrícola. Leer etiqueta, dosis y precauciones antes de usar.",
    "presentacion": "Frasco 100 ml",
    "uso": "Control de insectos",
    "precio": null,
    "imagen": "generica-plagas.jpg"
  },
  {
    "nombre": "Mix Hormital",
    "categoria": "Control de Plagas",
    "descripcion": "Cebo hormiguicida granulado para el control de hormigas.",
    "detalle": "Producto hormiguicida para control de hormigas. Presentación en cebo granulado. Leer etiqueta, dosis y precauciones antes de usar.",
    "presentacion": "Bolsa",
    "uso": "Hormigas",
    "precio": null,
    "imagen": "generica-plagas.jpg"
  },
  {
    "nombre": "Ara-Ba Mata Caracoles y Babosas",
    "categoria": "Control de Plagas",
    "descripcion": "Producto para el control de caracoles y babosas en jardín, canteros y plantas.",
    "detalle": "Molusquicida para control de caracoles y babosas. Utilizar de acuerdo a la etiqueta y mantener fuera del alcance de niños y mascotas. Leer etiqueta, dosis y precauciones antes de usar.",
    "presentacion": "Bolsa 100 g / 200 g",
    "uso": "Caracoles y babosas",
    "precio": null,
    "imagen": "generica-plagas.jpg"
  },
  {
    "nombre": "Super Babocol",
    "categoria": "Control de Plagas",
    "descripcion": "Molusquicida para el control de babosas y caracoles en jardín.",
    "detalle": "Producto formulado para el control de babosas y caracoles. Recomendado para jardín, canteros y plantas ornamentales. Leer etiqueta, dosis y precauciones antes de usar.",
    "presentacion": "Bolsa",
    "uso": "Caracoles y babosas",
    "precio": null,
    "imagen": "generica-plagas.jpg"
  },
  {
    "nombre": "Oxicloruro de Cobre Beltrame",
    "categoria": "Control de Plagas",
    "descripcion": "Fungicida a base de cobre para el cuidado de plantas.",
    "detalle": "Fungicida presentado en sobres o caja. Producto para uso en plantas según indicaciones de etiqueta. Leer etiqueta, dosis y precauciones antes de usar.",
    "presentacion": "Caja 15 x 50 g",
    "uso": "Control de hongos",
    "precio": null,
    "imagen": "generica-plagas.jpg"
  },
  {
    "nombre": "Piedritas Decorativas Crece Más",
    "categoria": "Macetas",
    "descripcion": "Piedritas decorativas para cubrir la superficie de macetas y mejorar la presentación de las plantas.",
    "detalle": "Piedras decorativas para macetas, ideales para terminaciones prolijas en plantas de interior, exterior y arreglos decorativos.",
    "presentacion": "Bolsa",
    "uso": "Decoración de macetas",
    "precio": null,
    "imagen": "generica-decoracion.jpg"
  },
  {
    "nombre": "Maceta Cuadrada Alta Vendy",
    "categoria": "Macetas",
    "descripcion": "Maceta cuadrada alta de diseño moderno, ideal para plantas ornamentales de interior y exterior.",
    "detalle": "Maceta de formato alto, disponible en varios colores. Recomendada para decorar espacios interiores, balcones, patios y jardines.",
    "presentacion": "Unidad",
    "uso": "Interior y exterior",
    "precio": null,
    "imagen": "generica-macetas.jpg"
  },
  {
    "nombre": "Maceta Redonda Línea Original",
    "categoria": "Macetas",
    "descripcion": "Maceta redonda para plantas ornamentales, disponible en distintos colores y tamaños.",
    "detalle": "Maceta redonda para uso en interior o exterior. Ideal para plantas ornamentales, arreglos verdes y decoración de ambientes.",
    "presentacion": "Unidad",
    "uso": "Interior y exterior",
    "precio": null,
    "imagen": "generica-macetas.jpg"
  },
  {
    "nombre": "Maceta Cerámica Decorativa",
    "categoria": "Macetas",
    "descripcion": "Maceta cerámica esmaltada de diseño decorativo para plantas de interior.",
    "detalle": "Maceta cerámica decorativa disponible en distintos diseños, colores y tamaños. Ideal para realzar plantas ornamentales y espacios interiores.",
    "presentacion": "Unidad",
    "uso": "Plantas de interior",
    "precio": null,
    "imagen": "generica-macetas.jpg"
  },
  {
    "nombre": "Pulverizador Manual",
    "categoria": "Herramientas",
    "descripcion": "Pulverizador manual para riego liviano, cuidado de hojas o aplicación de productos líquidos.",
    "detalle": "Accesorio práctico para jardinería doméstica. Apto para pulverizar agua o productos líquidos según corresponda.",
    "presentacion": "Unidad",
    "uso": "Riego y aplicación",
    "precio": null,
    "imagen": "generica-accesorios.jpg"
  }
];

const newInsumoProducts = newInsumoProductsRaw.map((p) => {
  return {
    id: nextId++,
    section: 'insumos',
    category: p.categoria,
    name: p.nombre,
    slug: slugify(p.nombre),
    price: p.precio,
    image: `${BASE}images/placeholder_white.png`,
    description: p.detalle || p.descripcion,
    active: true,
    stock: "disponible",
    attributes: [
      { type: 'presentacion', value: p.presentacion },
      { type: 'uso', value: p.uso }
    ]
  };
});

const originalInsumos = [
  {
    id: nextId++,
    section: 'insumos',
    category: "Macetas",
    name: "Maceta de Barro Clásica",
    price: "Consultar",
    image: `${BASE}images/placeholder_white.png`,
    description: "Maceta de terracota transpirable, excelente para suculentas y plantas que odian el exceso de humedad.",
    attributes: [
      { type: 'material', value: 'Barro / Terracota' },
      { type: 'tamano', value: 'Varios tamaños' }
    ]
  },
  {
    id: nextId++,
    section: 'insumos',
    category: "Macetas",
    name: "Maceta Rotomoldeada",
    price: "Consultar",
    image: `${BASE}images/placeholder_white.png`,
    description: "Macetas modernas, ultra livianas y resistentes al sol. No se decoloran ni se rompen con facilidad.",
    attributes: [
      { type: 'material', value: 'Plástico Rotomoldeado' },
      { type: 'tamano', value: 'Grandes volúmenes' }
    ]
  },
  {
    id: nextId++,
    section: 'insumos',
    category: "Sustratos y Tierra",
    name: "Tierra Preparada Premium",
    price: "Consultar",
    image: `${BASE}images/placeholder_white.png`,
    description: "Mezcla ideal lista para usar en macetas. Contiene compost, perlita y humus de lombriz.",
    attributes: [
      { type: 'volumen', value: 'Bolsas de 10L y 25L' },
      { type: 'uso', value: 'Plantas de interior y exterior' }
    ]
  },
  {
    id: nextId++,
    section: 'insumos',
    category: "Sustratos y Tierra",
    name: "Sustrato para Suculentas",
    price: "Consultar",
    image: `${BASE}images/placeholder_white.png`,
    description: "Sustrato con alto porcentaje de arena y pometina para garantizar un drenaje extremo.",
    attributes: [
      { type: 'volumen', value: 'Bolsa de 5L' },
      { type: 'uso', value: 'Cactus y crasas' }
    ]
  },
  {
    id: nextId++,
    section: 'insumos',
    category: "Fertilizantes y Cuidado",
    name: "Humus de Lombriz Líquido",
    price: "Consultar",
    image: `${BASE}images/placeholder_white.png`,
    description: "Fertilizante 100% orgánico. Mejora la floración y el crecimiento verde sin quemar la planta.",
    attributes: [
      { type: 'tipo', value: 'Orgánico líquido' },
      { type: 'uso', value: 'Diluir en riego' }
    ]
  }
].map(p => ({
  ...p,
  slug: slugify(p.name),
  active: true,
  stock: "disponible"
}));

const processedPlantProducts = plantProducts.map(p => ({
  ...p,
  slug: slugify(p.name),
  active: true,
  stock: "disponible"
}));

const allProductsBase = [
  ...processedPlantProducts,
  ...originalInsumos
];

newInsumoProducts.forEach(newProd => {
  const existingIdx = allProductsBase.findIndex(
    p => p.name.toLowerCase() === newProd.name.toLowerCase() || p.slug === newProd.slug
  );
  if (existingIdx !== -1) {
    allProductsBase[existingIdx] = {
      ...allProductsBase[existingIdx],
      ...newProd,
      id: allProductsBase[existingIdx].id
    };
  } else {
    allProductsBase.push(newProd);
  }
});

export const MOCK_PRODUCTS = allProductsBase;

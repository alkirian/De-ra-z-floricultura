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
const PLANT_IMAGES_BASE_PATH = 'images/plantas%202';
const SAFE_PLANT_IMAGES = {
  Anthurium: `${PLANT_IMAGES_BASE_PATH}/anturio.webp`,
  Aphelandra: `${PLANT_IMAGES_BASE_PATH}/afelandra.webp`,
  Areca: `${PLANT_IMAGES_BASE_PATH}/areca.webp`,
  Chamaedorea: `${PLANT_IMAGES_BASE_PATH}/chamaedorea.webp`,
  Croton: `${PLANT_IMAGES_BASE_PATH}/croton.webp`,
  Dieffenbachia: `${PLANT_IMAGES_BASE_PATH}/dieffenbachia.webp`,
  'Drácena': `${PLANT_IMAGES_BASE_PATH}/dracaena.webp`,
  'Ficus elástica': `${PLANT_IMAGES_BASE_PATH}/ficus_elastica.webp`,
  'Ficus lyrata': `${PLANT_IMAGES_BASE_PATH}/ficus_lyrata.webp`,
  Monstera: `${PLANT_IMAGES_BASE_PATH}/monstera_deliciosa.webp`,
  'Monstera Monkey': `${PLANT_IMAGES_BASE_PATH}/monstera_adansonii.webp`,
  Peperomia: `${PLANT_IMAGES_BASE_PATH}/peperomia.webp`,
  Potus: `${PLANT_IMAGES_BASE_PATH}/potus.webp`,
  Raphis: `${PLANT_IMAGES_BASE_PATH}/raphis.webp`,
  Sansevieria: `${PLANT_IMAGES_BASE_PATH}/sansevieria.webp`,
  'Sansevieria golden': `${PLANT_IMAGES_BASE_PATH}/sansevieria_variegada.webp`,
  Spathiphyllum: `${PLANT_IMAGES_BASE_PATH}/espatifilo.webp`,
  'Violeta africana': `${PLANT_IMAGES_BASE_PATH}/violeta_africana.webp`,
  Alternanthera: `${PLANT_IMAGES_BASE_PATH}/alternanthera_variedades.webp`,
  Azalea: `${PLANT_IMAGES_BASE_PATH}/azalea_rosa.webp`,
  'Azalea de parque': `${PLANT_IMAGES_BASE_PATH}/azalea_fucsia.webp`,
  Calistemo: `${PLANT_IMAGES_BASE_PATH}/callistemon.webp`,
  'Ciprés calvo': `${PLANT_IMAGES_BASE_PATH}/cipres.webp`,
  Clavelina: `${PLANT_IMAGES_BASE_PATH}/clavelina.webp`,
  Columnea: `${PLANT_IMAGES_BASE_PATH}/columnea.webp`,
  Copete: `${PLANT_IMAGES_BASE_PATH}/copete.webp`,
  Coprosma: `${PLANT_IMAGES_BASE_PATH}/coprosoma.webp`,
  Cuphea: `${PLANT_IMAGES_BASE_PATH}/cuphea.webp`,
  Dipladenia: `${PLANT_IMAGES_BASE_PATH}/dipladenia.webp`,
  'Espárrago': `${PLANT_IMAGES_BASE_PATH}/esparrago.webp`,
  Gazania: `${PLANT_IMAGES_BASE_PATH}/gazania.webp`,
  Helecho: `${PLANT_IMAGES_BASE_PATH}/helecho_boston.webp`,
  Hiedra: `${PLANT_IMAGES_BASE_PATH}/hiedra.webp`,
  Lavanda: `${PLANT_IMAGES_BASE_PATH}/lavanda.webp`,
  'Mini clavel': `${PLANT_IMAGES_BASE_PATH}/mini%20clavel.webp`,
  'Mini viola': `${PLANT_IMAGES_BASE_PATH}/mini%20viola.webp`,
  Nácar: `${PLANT_IMAGES_BASE_PATH}/flor%20de%20nacar.webp`,
  Pennisetum: `${PLANT_IMAGES_BASE_PATH}/pennisetum.webp`,
  Petunia: `${PLANT_IMAGES_BASE_PATH}/petunia.webp`,
  'Pittosporum nana': `${PLANT_IMAGES_BASE_PATH}/pittosporum%20nana.webp`,
  Limón: `${PLANT_IMAGES_BASE_PATH}/limonero.webp`,
  Menta: `${PLANT_IMAGES_BASE_PATH}/menta_flor.webp`,
  Pimiento: `${PLANT_IMAGES_BASE_PATH}/pimiento.webp`,
  Plumbago: `${PLANT_IMAGES_BASE_PATH}/plumbago.webp`,
  Romero: `${PLANT_IMAGES_BASE_PATH}/romero.webp`,
  Ruda: `${PLANT_IMAGES_BASE_PATH}/ruda.webp`,
  Tomillo: `${PLANT_IMAGES_BASE_PATH}/tomillo.webp`,
  'Velo de novia': `${PLANT_IMAGES_BASE_PATH}/gypsophila.webp`,
  Westringia: `${PLANT_IMAGES_BASE_PATH}/westringia.webp`,
};

const getPlantImage = (name) => SAFE_PLANT_IMAGES[name] || 'images/placeholder_white.png';

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
    description: `El/La ${name} es una de nuestras variedades favoritas para interior. Ideal si buscás sumar hojas verdes y un toque fresco a tus rincones con buena luz natural.`,
    attributes: [
      { type: 'luz', value: getPlantLightValue(name) },
      { type: 'riego', value: getPlantWaterValue(name) },
      { type: 'dificultad', value: getDifficulty(name) }
    ],
    careTips: "Recomendación De Raíz: Limpiale el polvo de las hojas con un pañito húmedo de vez en cuando (así respira mejor) y buscale un rincón estable, lejos de corrientes de aire frío o estufas.",
    pests: "Atención con: Cochinilla algodonosa o arañuela roja (sobre todo si el ambiente está muy seco)."
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
    description: `Llevá el/la ${name} a tu patio, balcón o jardín. Es una planta hermosa, cultivada por nosotros y muy buscada para dar color y vida al aire libre.`,
    attributes: [
      { type: 'luz', value: getPlantLightValue(name) },
      { type: 'riego', value: getPlantWaterValue(name) },
      { type: 'dificultad', value: getDifficulty(name) }
    ],
    careTips: "Consejo botánico: Podale las flores marchitas y ramas secas para que brote con más fuerza. Agradece un abonado al inicio de la primavera.",
    pests: "Atención con: Pulgones en primavera, trips u hormigas cortadoras si está en jardín abierto."
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
    description: `${name} de cultivo propio, lista para trasplantar. Una aromática noble y sana, ideal para tu huerta en casa y usar fresca en tus recetas.`,
    attributes: [
      { type: 'luz', value: getPlantLightValue(name) },
      { type: 'riego', value: getPlantWaterValue(name) },
      { type: 'dificultad', value: getDifficulty(name) }
    ],
    careTips: "Tip del cultivador: Cosechá sus ramitas con frecuencia para estimular a que siga brotando con fuerza y evitar que florezca antes de tiempo.",
    pests: "Cuidado con: Orugas o mosca blanca. Podés combatirlas de forma natural y ecológica usando jabón potásico y aceite de Neem."
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
    "nombre": "Argila Expandida Vitaplan (1.2L)",
    "categoria": "Sustratos y Tierra",
    "descripcion": "Arcilla expandida ideal para mejorar el drenaje en la base de las macetas y decorar la superficie de tus plantas.",
    "detalle": "Arcilla expandida ideal para mejorar el drenaje en la base de las macetas y decorar la superficie de tus plantas.",
    "presentacion": "Bolsa 1.2L",
    "uso": "Drenaje y decoración de macetas",
    "precio": "Consultar",
    "imagen": "insumo_2.png"
  },
  {
    "nombre": "Insecticida Cipermic 25 (100ml)",
    "categoria": "Control de Plagas",
    "descripcion": "Insecticida piretroide concentrado de amplio espectro para control de hormigas, moscas, mosquitos y otras plagas comunes en el jardín.",
    "detalle": "Insecticida piretroide concentrado de amplio espectro para control de hormigas, moscas, mosquitos y otras plagas comunes en el jardín. Utilizar con precaución siguiendo las indicaciones del envase.",
    "presentacion": "Frasco 100 ml",
    "uso": "Control de hormigas e insectos",
    "precio": "Consultar",
    "imagen": "insumo_3.png"
  },
  {
    "nombre": "Sustrato Cactus y Suculentas Terrafertil (5L)",
    "categoria": "Sustratos y Tierra",
    "descripcion": "Mezcla premium lista para usar, especialmente formulada para cactus y suculentas. Garantiza un excelente drenaje y aireación.",
    "detalle": "Mezcla premium lista para usar, especialmente formulada para cactus y suculentas. Garantiza un excelente drenaje y aireación para evitar la pudrición de raíces.",
    "presentacion": "Bolsa 5L",
    "uso": "Cactus y crasas",
    "precio": "Consultar",
    "imagen": "insumo_4.png"
  },
  {
    "nombre": "Aceite de Neem Orgánico (Óleo de Neem)",
    "categoria": "Control de Plagas",
    "descripcion": "Insecticida y acaricida orgánico natural a base de aceite de neem. Ideal para el control preventivo y curativo de plagas comunes.",
    "detalle": "Insecticida y acaricida orgánico natural a base de aceite de neem. Ideal para el control preventivo y curativo de plagas comunes de forma ecológica y segura.",
    "presentacion": "Caja con aplicador",
    "uso": "Insectos y ácaros",
    "precio": "Consultar",
    "imagen": "insumo_5.png"
  },
  {
    "nombre": "Triple Acción Gran Amor (Fungicida/Insecticida)",
    "categoria": "Control de Plagas",
    "descripcion": "Producto listo para usar de triple acción que protege tus plantas contra insectos, ácaros y hongos comunes del jardín.",
    "detalle": "Producto listo para usar de triple acción que protege tus plantas contra insectos, ácaros y hongos comunes del jardín de forma rápida y práctica.",
    "presentacion": "Pulverizador 500 cc",
    "uso": "Control de insectos, ácaros y hongos",
    "precio": "Consultar",
    "imagen": "insumo_6.png"
  },
  {
    "nombre": "Aceite de Neem Gran Amor (220cc)",
    "categoria": "Control de Plagas",
    "descripcion": "Aceite de neem emulsificable, insecticida orgánico y preventivo natural para mantener tus plantas sanas y libres de plagas.",
    "detalle": "Aceite de neem emulsificable, insecticida orgánico y preventivo natural para mantener tus plantas sanas y libres de plagas de forma ecológica.",
    "presentacion": "Botella 220 cc",
    "uso": "Preventivo orgánico",
    "precio": "Consultar",
    "imagen": "insumo_7.png"
  },
  {
    "nombre": "Alimento para Orquídeas Crece Más",
    "categoria": "Fertilizantes y Cuidado",
    "descripcion": "Fertilizante líquido balanceado y específico para nutrir y promover una floración abundante y prolongada en todo tipo de orquídeas.",
    "detalle": "Fertilizante líquido balanceado y específico para nutrir y promover una floración abundante y prolongada en todo tipo de orquídeas.",
    "presentacion": "Botella",
    "uso": "Nutrición y floración de orquídeas",
    "precio": "Consultar",
    "imagen": "insumo_8.png"
  },
  {
    "nombre": "Fertilizante Granulado Cultivar Maccio",
    "categoria": "Fertilizantes y Cuidado",
    "descripcion": "Fertilizante completo granulado (N-P-K) formulado para potenciar el crecimiento vigoroso, follaje verde y floración espectacular en plantas y flores.",
    "detalle": "Fertilizante completo granulado (N-P-K) formulado para potenciar el crecimiento vigoroso, follaje verde y floración espectacular en plantas y flores.",
    "presentacion": "Bolsa",
    "uso": "Crecimiento y floración general",
    "precio": "Consultar",
    "imagen": "insumo_9.png"
  },
  {
    "nombre": "Nutri Cobre Vitaplan (Spray 500ml)",
    "categoria": "Fertilizantes y Cuidado",
    "descripcion": "Nutriente mineral mixto con cobre presentado en spray de fácil aplicación. Fortalece las defensas naturales de tus plantas frente a hongos.",
    "detalle": "Nutriente mineral mixto con cobre presentado en spray de fácil aplicación. Fortalece las defensas naturales de tus plantas frente a hongos.",
    "presentacion": "Spray 500 ml",
    "uso": "Prevención de hongos y nutrición foliar",
    "precio": "Consultar",
    "imagen": "insumo_11.png"
  },
  {
    "nombre": "Sulfato de Hierro Crece Más",
    "categoria": "Fertilizantes y Cuidado",
    "descripcion": "Corrector mineral ideal para prevenir y tratar la clorosis férrica (hojas amarillas). Aporta el hierro necesario para devolver el verde intenso a tus plantas.",
    "detalle": "Corrector mineral ideal para prevenir y tratar la clorosis férrica (hojas amarillas). Aporta el hierro necesario para devolver el verde intenso a tus plantas.",
    "presentacion": "Bolsa",
    "uso": "Corrección de clorosis (hojas amarillas)",
    "precio": "Consultar",
    "imagen": "insumo_12.png"
  },
  {
    "nombre": "Sustrato para Orquídeas Terrafertil (5L)",
    "categoria": "Sustratos y Tierra",
    "descripcion": "Mezcla específica a base de corteza, carbón y turba que proporciona la aireación y soporte ideales para el correcto desarrollo radicular de las orquídeas.",
    "detalle": "Mezcla específica a base de corteza, carbón y turba que proporciona la aireación y soporte ideales para el correcto desarrollo radicular de las orquídeas.",
    "presentacion": "Bolsa 5L",
    "uso": "Aireación ideal para raíces de orquídeas",
    "precio": "Consultar",
    "imagen": "insumo_13.png"
  },
  {
    "nombre": "Enraizador Hidrosol (Gotero)",
    "categoria": "Fertilizantes y Cuidado",
    "descripcion": "Hormona líquida para enraizar esquejes y gajos de plantas leñosas y herbáceas. Acelera el desarrollo de raíces sanas y fuertes.",
    "detalle": "Hormona líquida para enraizar esquejes y gajos de plantas leñosas y herbáceas. Acelera el desarrollo de raíces sanas y fuertes.",
    "presentacion": "Envase gotero",
    "uso": "Propagación por esquejes",
    "precio": "Consultar",
    "imagen": "insumo_14.png"
  },
  {
    "nombre": "Fertilizante Horta-Fácil Granulado (250g)",
    "categoria": "Fertilizantes y Cuidado",
    "descripcion": "Fertilizante balanceado granulado diseñado para nutrir de forma sostenida tus canteros de flores, arbustos y plantas en la huerta.",
    "detalle": "Fertilizante balanceado granulado diseñado para nutrir de forma sostenida tus canteros de flores, arbustos y plantas en la huerta.",
    "presentacion": "Envase 250g",
    "uso": "Nutrición para flores y huerta",
    "precio": "Consultar",
    "imagen": "insumo_15.png"
  },
  {
    "nombre": "Urea Maccio Cultivar Nitrogenado",
    "categoria": "Fertilizantes y Cuidado",
    "descripcion": "Fertilizante nitrogenado de alta concentración (46% N) que estimula un crecimiento verde rápido y exuberante en el césped y follaje.",
    "detalle": "Fertilizante nitrogenado de alta concentración (46% N) que estimula un crecimiento verde rápido y exuberante en el césped y follaje.",
    "presentacion": "Bolsa",
    "uso": "Crecimiento de césped y follaje verde",
    "precio": "Consultar",
    "imagen": "insumo_16.png"
  },
  {
    "nombre": "Oxicloruro de Cobre Beltrame Fungicida",
    "categoria": "Control de Plagas",
    "descripcion": "Fungicida preventivo de amplio espectro formulado a base de cobre. Protege plantas y frutales contra hongos foliares como torque, antracnosis y mildiú.",
    "detalle": "Fungicida preventivo de amplio espectro formulado a base de cobre. Protege plantas y frutales contra hongos foliares como torque, antracnosis y mildiú.",
    "presentacion": "Caja con sobres",
    "uso": "Prevención de hongos en plantas y árboles",
    "precio": "Consultar",
    "imagen": "insumo_17.png"
  },
  {
    "nombre": "Semillas de Césped Familiar Beltrame (500g)",
    "categoria": "Sustratos y Tierra",
    "descripcion": "Mezcla de semillas seleccionadas de alta calidad para sembrar y lograr un césped familiar tupido, resistente al pisoteo y de rápido establecimiento.",
    "detalle": "Mezcla de semillas seleccionadas de alta calidad para sembrar y lograr un césped familiar tupido, resistente al pisoteo y de rápido establecimiento.",
    "presentacion": "Bolsa 500g",
    "uso": "Siembra y resiembra de césped familiar",
    "precio": "Consultar",
    "imagen": "insumo_18.png"
  },
  {
    "nombre": "Sustrato Plantas de Interior Terrafertil",
    "categoria": "Sustratos y Tierra",
    "descripcion": "Mezcla premium formulada especialmente para plantas de interior. Brinda retención de humedad óptima, aireación y los nutrientes necesarios para hojas verdes y sanas.",
    "detalle": "Mezcla premium formulada especialmente para plantas de interior. Brinda retención de humedad óptima, aireación y los nutrientes necesarios para hojas verdes y sanas.",
    "presentacion": "Bolsa",
    "uso": "Mezcla para plantas de interior en maceta",
    "precio": "Consultar",
    "imagen": "insumo_19.png"
  },
  {
    "nombre": "Turba de Musgo Sphagnum Terrafertil",
    "categoria": "Sustratos y Tierra",
    "descripcion": "Turba seleccionada ideal para acondicionar el suelo, preparar sustratos ácidos o mejorar la retención de agua en mezclas especiales de trasplante.",
    "detalle": "Turba seleccionada ideal para acondicionar el suelo, preparar sustratos ácidos o mejorar la retención de agua en mezclas especiales de trasplante.",
    "presentacion": "Bolsa",
    "uso": "Retención de humedad y sustrato ácido",
    "precio": "Consultar",
    "imagen": "insumo_21.png"
  },
  {
    "nombre": "Sustrato Súper Resaca Terrafertil",
    "categoria": "Sustratos y Tierra",
    "descripcion": "Acondicionador orgánico rico en materia orgánica de río, ideal para ablandar suelos arcillosos y aportar esponjosidad a tus sustratos.",
    "detalle": "Acondicionador orgánico rico en materia orgánica de río, ideal para ablandar suelos arcillosos y aportar esponjosidad a tus sustratos.",
    "presentacion": "Bolsa",
    "uso": "Enmienda orgánica para mejorar suelo",
    "precio": "Consultar",
    "imagen": "insumo_22.png"
  },
  {
    "nombre": "Súper Babocol Caracolicida",
    "categoria": "Control de Plagas",
    "descripcion": "Cebo granulado molusquicida altamente efectivo para el control y eliminación de caracoles y babosas en canteros y huertas.",
    "detalle": "Cebo granulado molusquicida altamente efectivo para el control y eliminación de caracoles y babosas en canteros y huertas.",
    "presentacion": "Bolsa",
    "uso": "Cebo granulado contra caracoles y babosas",
    "precio": "Consultar",
    "imagen": "insumo_23.png"
  },
  {
    "nombre": "Sustrato Samambaias Vitaplan (7.5kg)",
    "categoria": "Sustratos y Tierra",
    "descripcion": "Sustrato formulado específicamente para helechos y plantas verdes que requieren alta retención de humedad, esponjosidad y un medio rico en materia orgánica.",
    "detalle": "Sustrato formulado específicamente para helechos y plantas verdes que requieren alta retención de humedad, esponjosidad y un medio rico en materia orgánica.",
    "presentacion": "Bolsa aprox. 7.5 kg",
    "uso": "Helechos y plantas que requieren humedad",
    "precio": "Consultar",
    "imagen": "insumo_27.png"
  },
  {
    "nombre": "Cero Plaga Caracolicida Granulado",
    "categoria": "Control de Plagas",
    "descripcion": "Cebo granulado específico para atraer y eliminar caracoles y babosas. Resistente a la humedad para una mayor duración en el jardín.",
    "detalle": "Cebo granulado específico para atraer y eliminar caracoles y babosas. Resistente a la humedad para una mayor duración en el jardín.",
    "presentacion": "Botella dosificadora",
    "uso": "Control persistente de caracoles y babosas",
    "precio": "Consultar",
    "imagen": "insumo_28.png"
  },
  {
    "nombre": "Combo Cero Plaga Rastreros (Spray)",
    "categoria": "Control de Plagas",
    "descripcion": "Combo preventivo y curativo líquido para el control de hormigas e insectos rastreros en el jardín y plantas ornamentales.",
    "detalle": "Combo preventivo y curativo líquido para el control de hormigas e insectos rastreros en el jardín y plantas ornamentales.",
    "presentacion": "Botellas spray listos para usar",
    "uso": "Control de hormigas e insectos rastreros",
    "precio": "Consultar",
    "imagen": "insumo_29.png"
  },
  {
    "nombre": "Piedritas Decorativas Blancas Crece Más",
    "categoria": "Macetas",
    "descripcion": "Piedras blancas decorativas seleccionadas para colocar sobre el sustrato. Aportan una excelente terminación estética y retienen la humedad.",
    "detalle": "Piedras blancas decorativas seleccionadas para colocar sobre el sustrato. Aportan una excelente terminación estética y retienen la humedad.",
    "presentacion": "Bolsa",
    "uso": "Decoración de macetas y retención de humedad",
    "precio": "Consultar",
    "imagen": "insumo_30.png"
  },
  {
    "nombre": "Melaza para Plantas Nutrilab",
    "categoria": "Fertilizantes y Cuidado",
    "descripcion": "Melaza de caña de alta calidad rica en carbohidratos que alimenta la microvida del suelo y aporta micronutrientes para potenciar el vigor y rendimiento.",
    "detalle": "Melaza de caña de alta calidad rica en carbohidratos que alimenta la microvida del suelo y aporta micronutrientes para potenciar el vigor y rendimiento.",
    "presentacion": "Envase plástico",
    "uso": "Alimento para microvida y floración",
    "precio": "Consultar",
    "imagen": "insumo_31.png"
  },
  {
    "nombre": "Alimento para Plantas Crece Más Universal",
    "categoria": "Fertilizantes y Cuidado",
    "descripcion": "Fertilizante líquido completo y balanceado de uso universal. Aporta nitrógeno, fósforo y potasio para un crecimiento armónico de todo tipo de plantas.",
    "detalle": "Fertilizante líquido completo y balanceado de uso universal. Aporta nitrógeno, fósforo y potasio para un crecimiento armónico de todo tipo de plantas.",
    "presentacion": "Botella",
    "uso": "Nutrición equilibrada multiuso",
    "precio": "Consultar",
    "imagen": "insumo_32.png"
  },
  {
    "nombre": "Combo La Huertina (Super Magro + Humato + ME)",
    "categoria": "Fertilizantes y Cuidado",
    "descripcion": "Kit completo de nutrición orgánica que incluye bioestimulante foliar, abono líquido y regenerador de microvida para tus plantas y huerta.",
    "detalle": "Kit completo de nutrición orgánica que incluye bioestimulante foliar, abono líquido y regenerador de microvida para tus plantas y huerta.",
    "presentacion": "3 botellas líquidas",
    "uso": "Kit completo de biofertilizantes orgánicos",
    "precio": "Consultar",
    "imagen": "insumo_33.png"
  },
  {
    "nombre": "Combo La Huertina Pasta Potásica + Alimento",
    "categoria": "Fertilizantes y Cuidado",
    "descripcion": "Kit práctico que combina jabón potásico concentrado para prevención de plagas y fertilizante premium para incentivar el florecimiento de tus orquídeas.",
    "detalle": "Kit práctico que combina jabón potásico concentrado para prevención de plagas y fertilizante premium para incentivar el florecimiento de tus orquídeas.",
    "presentacion": "Jabón potásico en pasta + botella de alimento",
    "uso": "Prevención de plagas y nutrición de flores",
    "precio": "Consultar",
    "imagen": "insumo_34.png"
  },
  {
    "nombre": "Fertilizante Horta-Fácil Bolsa Amarilla",
    "categoria": "Fertilizantes y Cuidado",
    "descripcion": "Fertilizante granulado balanceado para canteros, huerta y jardín. Aporta nutrientes esenciales de liberación gradual para un follaje verde y flores abundantes.",
    "detalle": "Fertilizante granulado balanceado para canteros, huerta y jardín. Aporta nutrientes esenciales de liberación gradual para un follaje verde y flores abundantes.",
    "presentacion": "Bolsa amarilla",
    "uso": "Fertilidad sostenida de canteros y huerta",
    "precio": "Consultar",
    "imagen": "insumo_35.png"
  },
  {
    "nombre": "Fibra de Coco Vitaplan (2000g)",
    "categoria": "Sustratos y Tierra",
    "descripcion": "Fibra de coco deshidratada y procesada de forma ecológica. Aporta una excelente retención de humedad, esponjosidad y estimula el desarrollo de raíces sanas.",
    "detalle": "Fibra de coco deshidratada y procesada de forma ecológica. Aporta una excelente retención de humedad, esponjosidad y estimula el desarrollo de raíces sanas.",
    "presentacion": "Bolsa 2000g",
    "uso": "Fibra natural ecológica para sustrato",
    "precio": "Consultar",
    "imagen": "insumo_36.png"
  },
  {
    "nombre": "Combo Agroyuyo Plagas (Neem + Jabón + Aceite)",
    "categoria": "Control de Plagas",
    "descripcion": "Kit completo preventivo y curativo a base de extractos vegetales. Ideal para combatir mosca blanca, pulgón, arañuela y cochinilla de forma orgánica.",
    "detalle": "Kit completo preventivo y curativo a base de extractos vegetales. Ideal para combatir mosca blanca, pulgón, arañuela y cochinilla de forma orgánica.",
    "presentacion": "Kit de envases dosificadores",
    "uso": "Kit ecológico contra pulgones y cochinillas",
    "precio": "Consultar",
    "imagen": "insumo_37.png"
  },
  {
    "nombre": "Combo Cipermic + Neem + Jabón Potásico",
    "categoria": "Control de Plagas",
    "descripcion": "Kit fitosanitario mixto que combina el poder insecticida de contacto del Cipermic con la prevención persistente y orgánica del Neem y Jabón Potásico.",
    "detalle": "Kit fitosanitario mixto que combina el poder insecticida de contacto del Cipermic con la prevención persistente y orgánica del Neem y Jabón Potásico.",
    "presentacion": "Kit mixto de frascos concentrados",
    "uso": "Kit de choque y prevención de plagas",
    "precio": "Consultar",
    "imagen": "insumo_38.png"
  },
  {
    "nombre": "Fungicida e Insecticida Lampo (Sobres)",
    "categoria": "Control de Plagas",
    "descripcion": "Fungicida foliar preventivo y curativo de alto espectro en sobres. Protege tus plantas hortícolas y ornamentales de hongos comunes como oídio y mildiú.",
    "detalle": "Fungicida foliar preventivo y curativo de alto espectro en sobres. Protege tus plantas hortícolas y ornamentales de hongos comunes como oídio y mildiú.",
    "presentacion": "Sobres individuales",
    "uso": "Tratamiento foliar preventivo y curativo",
    "precio": "Consultar",
    "imagen": "insumo_39.png"
  },
  {
    "nombre": "Combo Sanidad y Nutrición Completo",
    "categoria": "Control de Plagas",
    "descripcion": "Kit integral de cabecera para el hobbista del jardín. Contiene preventivo fúngico, insecticida granulado y fertilizantes para el cuidado integral durante todo el año.",
    "detalle": "Kit integral de cabecera para el hobbista del jardín. Contiene preventivo fúngico, insecticida granulado y fertilizantes para el cuidado integral durante todo el año.",
    "presentacion": "Combo completo de insumos",
    "uso": "Kit anual de prevención y alimentación vegetal",
    "precio": "Consultar",
    "imagen": "insumo_40.png"
  },
  {
    "nombre": "Sustrato Violetas Vitaplan (1.5kg)",
    "categoria": "Sustratos y Tierra",
    "descripcion": "Mezcla específica y liviana diseñada especialmente para violetas africanas y plantas del mismo género. Brinda un drenaje óptimo y nutrición suave.",
    "detalle": "Mezcla específica y liviana diseñada especialmente para violetas africanas y plantas del mismo género. Brinda un drenaje óptimo y nutrición suave.",
    "presentacion": "Bolsa 1.5kg",
    "uso": "Mezcla suave específica para violetas",
    "precio": "Consultar",
    "imagen": "insumo_1.png"
  },
  {
    "nombre": "Maceta Terracota Clásica N°14",
    "categoria": "Macetas",
    "descripcion": "Maceta de barro cocido tradicional. Su porosidad permite una excelente aireación de las raíces y evaporación del exceso de agua, ideal para plantas delicadas.",
    "detalle": "Maceta de barro cocido tradicional. Su porosidad permite una excelente aireación de las raíces y evaporación del exceso de agua, ideal para plantas delicadas como suculentas y cactus.",
    "presentacion": "Unidad (Diámetro 14cm)",
    "uso": "Excelente drenaje y aireación natural",
    "precio": "Consultar",
    "imagen": "insumo_30.png"
  },
  {
    "nombre": "Maceta Premium Rotomoldeada Cónica",
    "categoria": "Macetas",
    "descripcion": "Maceta de diseño moderno fabricada en polietileno de alta calidad. Resistente al sol (filtro UV), golpes y temperaturas extremas, ultra liviana.",
    "detalle": "Maceta de diseño moderno fabricada en polietileno de alta calidad. Resistente al sol (filtro UV), golpes y temperaturas extremas, ultra liviana y apta para interior o exterior.",
    "presentacion": "Unidad (Altura 30cm)",
    "uso": "Decoración exterior/interior ultra duradera",
    "precio": "Consultar",
    "imagen": "insumo_30.png"
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
    image: `images/insumos/ok/${p.imagen}`,
    description: p.detalle || p.descripcion,
    active: true,
    stock: "disponible",
    attributes: [
      { type: 'presentacion', value: p.presentacion },
      { type: 'uso', value: p.uso }
    ]
  };
});

const originalInsumos = [];

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

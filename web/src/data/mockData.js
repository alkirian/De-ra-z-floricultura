export const BIZ_INFO = {
  name: "De Raíz Floricultura",
  location: "Las Piedras, Canelones, Uruguay (Ruta 48)",
  phone: "59893307699",
  hours: "Lunes a Sábado: 9:00 - 18:00 | Domingos: 9:00 - 13:00 (A confirmar)",
  payment: "Tarjetas de crédito, débito y efectivo",
};

export const WA_MESSAGES = {
  general: "¡Hola De Raíz! Vengo de la web y tengo una consulta general.",
  producto: (producto) => `¡Hola! Me encantó el producto "${producto}" que vi en la web. ¿Tienen stock?`,
  asesoramiento: (ubicacion, luz, proposito, sugeridas) => `¡Hola! Hice el test en la web. Busco una planta para un espacio de ${ubicacion} con ${luz} luz natural. Mi nivel de experiencia es: ${proposito}. La web me sugirió: ${sugeridas}. ¿Me pueden ayudar?`,
  regalo: (tipo, presupuesto) => `¡Hola! Quiero armar un regalo de plantas. La ocasión es: ${tipo}. Mi presupuesto es: ${presupuesto}. ¿Qué combo me recomiendan?`,
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
  insumos: ['Todos', 'Macetas', 'Sustratos y Tierra', 'Fertilizantes y Cuidado', 'Herramientas']
};

const PLANT_IMAGES_BASE_PATH = '/images/plantas%202';
const SAFE_PLANT_IMAGES = {
  Areca: `${PLANT_IMAGES_BASE_PATH}/areca.png`,
  Chamaedorea: `${PLANT_IMAGES_BASE_PATH}/chamaedorea.png`,
  Croton: `${PLANT_IMAGES_BASE_PATH}/croton.png`,
  Dieffenbachia: `${PLANT_IMAGES_BASE_PATH}/dieffenbachia.png`,
  Clavelina: `${PLANT_IMAGES_BASE_PATH}/clavelina.png`,
  Columnea: `${PLANT_IMAGES_BASE_PATH}/columnea.png`,
  Cuphea: `${PLANT_IMAGES_BASE_PATH}/cuphea.png`,
  Dipladenia: `${PLANT_IMAGES_BASE_PATH}/dipladenia.png`,
  'Espárrago': `${PLANT_IMAGES_BASE_PATH}/esparrago.png`,
};

const getPlantImage = (name) => SAFE_PLANT_IMAGES[name] || '/images/placeholder_white.png';

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
    description: `Planta de interior ${name}. Ideal para decorar tus espacios con vida. [Foto de referencia, a actualizar con stock real]`,
    attributes: [
      { type: 'luz', value: 'Media a mucha (sin sol)' },
      { type: 'riego', value: 'Riego moderado' }
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
    description: `Planta de exterior ${name}. Perfecta para darle color a tu jardín o balcón. [Foto de referencia, a actualizar con stock real]`,
    attributes: [
      { type: 'luz', value: 'Sol directo o semisombra' },
      { type: 'riego', value: 'Riego frecuente' }
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
    description: `${name} perfecta para tu huerta orgánica en casa. Aromática y noble.`,
    attributes: [
      { type: 'luz', value: 'Pleno sol' },
      { type: 'riego', value: 'Riego diario en verano' }
    ],
    careTips: "Cosechar regularmente para estimular el crecimiento y evitar que la planta semille prematuramente.",
    pests: "Mosca blanca, pulgones y orugas. Recomendamos preventivos orgánicos como aceite de Neem o jabón potásico."
  });
});

export const MOCK_PRODUCTS = [
  ...plantProducts,
  // --- INSUMOS ---
  {
    id: nextId++,
    section: 'insumos',
    category: "Macetas",
    name: "Maceta de Barro Clásica",
    price: "Consultar",
    image: "/images/placeholder_white.png",
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
    image: "/images/placeholder_white.png",
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
    image: "/images/placeholder_white.png",
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
    image: "/images/placeholder_white.png",
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
    image: "/images/placeholder_white.png",
    description: "Fertilizante 100% orgánico. Mejora la floración y el crecimiento verde sin quemar la planta.",
    attributes: [
      { type: 'tipo', value: 'Orgánico líquido' },
      { type: 'uso', value: 'Diluir en riego' }
    ]
  }
];

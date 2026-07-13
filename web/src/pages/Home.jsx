import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import { ArrowRight, MessageCircle, Sparkles, Leaf, MapPin, ChevronLeft, ChevronRight, BookOpen, X, ShoppingCart, Sun, Droplets, Ruler, Package, Sprout, RotateCcw, Clock, Phone, Navigation, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { generateWaLink, WA_MESSAGES } from '../data/mockData';
import { useCatalog } from '../context/CatalogContext';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import SEO from '../components/SEO';
import './Home.css';
const getAttributeIcon = (type) => {
  switch (type) {
    case 'luz':      return <Sun size={14} />;
    case 'riego':    return <Droplets size={14} />;
    case 'tamano':   return <Ruler size={14} />;
    case 'material': return <Package size={14} />;
    default:         return <Sprout size={14} />;
  }
};

/* SVG onda separadora */
const WaveTop = ({ fill = '#F4EBDD', bg = 'transparent', className = '' }) => (
  <div className={`wave-transition wave-transition--top ${className}`.trim()} style={{ background: bg }}>
    <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="none">
      <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill={fill}/>
    </svg>
  </div>
);

const WaveBottom = ({ fill = '#F4EBDD', bg = 'transparent', className = '' }) => (
  <div className={`wave-transition wave-transition--bottom ${className}`.trim()} style={{ background: bg }}>
    <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="none">
      <path d="M0,30 C360,0 1080,60 1440,30 L1440,0 L0,0 Z" fill={fill}/>
    </svg>
  </div>
);

/* Ícono SVG lineal de planta interior */
const IconInterior = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="cat-icon">
    <rect x="20" y="44" width="24" height="12" rx="4" stroke="currentColor" strokeWidth="2"/>
    <path d="M32 44 C32 44 32 30 32 26" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M32 36 C32 36 20 28 16 18 C26 18 32 26 32 36Z" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M32 30 C32 30 44 22 48 12 C38 12 32 22 32 30Z" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);



const IconJardineria = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="cat-icon">
    <path d="M14 50 L28 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <ellipse cx="34" cy="18" rx="12" ry="8" transform="rotate(-30 34 18)" stroke="currentColor" strokeWidth="2"/>
    <path d="M28 24 C28 24 36 20 42 22" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2"/>
  </svg>
);

const IconMaceta = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="cat-icon">
    <path d="M18 28 L22 54 L42 54 L46 28 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    <rect x="14" y="22" width="36" height="8" rx="3" stroke="currentColor" strokeWidth="2"/>
    <path d="M32 22 C32 22 32 14 32 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M32 16 C32 16 24 10 20 6 C26 6 32 12 32 16Z" fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M32 14 C32 14 40 8 44 4 C38 4 32 10 32 14Z" fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);
// Iconos e Ilustraciones SVG personalizadas para el Asesor Botánico (Quiz)
const SvgHome = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const SvgSun = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
);

const SvgDroplets = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.09 3 12.25c0 2.22 1.8 4.05 4 4.05z" />
    <path d="M17 18.5c1.37 0 2.5-1.14 2.5-2.53 0-.72-.35-1.41-1.07-1.99s-1.43-1.4-1.61-2.31c-.18.91-.71 1.77-1.43 2.35s-1.07 1.09-1.07 1.81c0 1.39 1.13 2.53 2.5 2.53z" />
  </svg>
);

const SvgPaw = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 14c-1.66 0-3-1.12-3-2.5S10.34 9 12 9s3 1.12 3 2.5-1.34 2.5-3 2.5z" />
    <path d="M5.5 10c-.83 0-1.5-.67-1.5-1.5S4.67 7 5.5 7 7 7.67 7 8.5 6.33 10 5.5 10z" />
    <path d="M18.5 10c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
    <path d="M9 6c-.83 0-1.5-.67-1.5-1.5S8.17 3 9 3s1.5.67 1.5 1.5S9.83 6 9 6z" />
    <path d="M15 6c-.83 0-1.5-.67-1.5-1.5S14.17 3 15 3s1.5.67 1.5 1.5S15.83 6 15 6z" />
  </svg>
);

const SvgInteriorOption = () => (
  <svg viewBox="0 0 64 64" className="quiz-card-svg" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="20" y="44" width="24" height="12" rx="3" strokeWidth="2" />
    <path d="M32 44 V30" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M32 32 C26 24 24 16 32 10 C40 16 38 24 32 32Z" fill="var(--verde-salvia)" opacity="0.2" strokeWidth="1.5" />
    <path d="M22 30 H42" strokeWidth="1.5" opacity="0.4" />
  </svg>
);

const SvgExteriorOption = () => (
  <svg viewBox="0 0 64 64" className="quiz-card-svg" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 54 C16 42 22 32 32 32 C42 32 48 42 48 54" strokeWidth="2" />
    <circle cx="32" cy="22" r="10" strokeWidth="2" fill="var(--verde-salvia)" opacity="0.2" />
    <path d="M32 32 V54" strokeWidth="2.5" />
    <path d="M10 54 H54" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const SvgLowLight = () => (
  <svg viewBox="0 0 64 64" className="quiz-card-svg" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="28" cy="28" r="16" strokeDasharray="4 4" />
    <path d="M36 16 A16 16 0 0 1 48 36 A18 18 0 1 0 36 16 Z" fill="var(--verde-salvia)" opacity="0.3" strokeWidth="2" />
  </svg>
);

const SvgIndirectLight = () => (
  <svg viewBox="0 0 64 64" className="quiz-card-svg" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="38" cy="24" r="12" strokeWidth="1.5" strokeDasharray="3 3" />
    <path d="M16 48 C16 40 24 36 30 40 C34 32 46 34 46 44 C50 44 54 46 54 52 H14 C14 52 16 50 16 48Z" fill="var(--verde-salvia)" opacity="0.25" strokeWidth="2" />
  </svg>
);

const SvgDirectLight = () => (
  <svg viewBox="0 0 64 64" className="quiz-card-svg" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="32" cy="32" r="12" fill="var(--verde-salvia)" opacity="0.2" strokeWidth="2" />
    <path d="M32 8 V14 M32 50 V56 M8 32 H14 M50 32 H56" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M15 15 L19.2 19.2 M44.8 44.8 L49 49 M15 49 L19.2 44.8 M44.8 19.2 L49 15" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const SvgBeginner = () => (
  <svg viewBox="0 0 64 64" className="quiz-card-svg" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M32 54 V26" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M32 34 C32 34 22 28 18 18 C28 18 32 26 32 34Z" fill="var(--verde-salvia)" opacity="0.3" strokeWidth="1.5" />
    <path d="M32 40 C32 40 42 34 46 24 C36 24 32 32 32 40Z" fill="var(--verde-salvia)" opacity="0.3" strokeWidth="1.5" />
    <circle cx="32" cy="54" r="4" fill="currentColor" />
  </svg>
);

const SvgEnthusiast = () => (
  <svg viewBox="0 0 64 64" className="quiz-card-svg" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M32 12 C32 12 16 32 16 42 A16 16 0 0 0 48 42 C48 32 32 12 32 12Z" fill="var(--verde-salvia)" opacity="0.2" strokeWidth="2" />
    <path d="M26 42 Q32 46 38 42" strokeWidth="2" strokeLinecap="round" />
    <circle cx="32" cy="28" r="3" fill="currentColor" opacity="0.5" />
  </svg>
);

const SvgFlowers = () => (
  <svg viewBox="0 0 64 64" className="quiz-card-svg" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="32" cy="32" r="8" fill="var(--verde-salvia)" opacity="0.25" strokeWidth="2" />
    <circle cx="32" cy="18" r="6" strokeWidth="1.5" />
    <circle cx="32" cy="46" r="6" strokeWidth="1.5" />
    <circle cx="18" cy="32" r="6" strokeWidth="1.5" />
    <circle cx="46" cy="32" r="6" strokeWidth="1.5" />
    <path d="M32 46 V56" strokeWidth="2" />
  </svg>
);

const SvgPetsYes = () => (
  <svg viewBox="0 0 64 64" className="quiz-card-svg" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M32 40 C32 35 24 35 24 42 C24 48 32 50 32 50 C32 50 40 48 40 42 C40 35 32 35 32 40Z" fill="var(--verde-salvia)" opacity="0.2" strokeWidth="2" />
    <circle cx="20" cy="28" r="4" strokeWidth="1.5" />
    <circle cx="28" cy="22" r="4" strokeWidth="1.5" />
    <circle cx="36" cy="22" r="4" strokeWidth="1.5" />
    <circle cx="44" cy="28" r="4" strokeWidth="1.5" />
    <path d="M48 44 C46 42 42 42 42 46 C42 50 48 54 48 54 C48 54 54 50 54 46 C54 42 50 42 48 44Z" stroke="var(--naranja-floral)" fill="var(--naranja-floral)" opacity="0.3" />
  </svg>
);

const SvgPetsNo = () => (
  <svg viewBox="0 0 64 64" className="quiz-card-svg" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 18 L32 8 L50 18 L50 42 C50 50 32 56 32 56 C32 56 14 50 14 42 Z" fill="var(--verde-salvia)" opacity="0.2" strokeWidth="2" />
    <path d="M24 32 L30 38 L42 26" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const QUIZ_STEPS_METADATA = [
  { step: 1, label: 'Ubicación', field: 'placement', icon: <SvgHome size={16} /> },
  { step: 2, label: 'Luz', field: 'light', icon: <SvgSun size={16} /> },
  { step: 3, label: 'Cuidado', field: 'care', icon: <SvgDroplets size={16} /> },
  { step: 4, label: 'Mascotas', field: 'pets', icon: <SvgPaw size={16} /> }
];

const BASE = import.meta.env.BASE_URL;
// Si queres cambiar imagenes, edita solo el campo image de cada objeto en COMBO_INSPIRATIONS.

const COMBO_CUSTOM_MESSAGE =
  'Hola De Raíz, quiero armar un combo personalizado con planta y maceta. ¿Me pueden ayudar?';

const COMBO_INSPIRATIONS = [
  {
    id: 'toque-natural',
    title: 'Combo Toque Natural',
    description: 'Una combinación clásica de planta vistosa con una maceta de diseño para renovar cualquier rincón.',
    includes: 'Planta + maceta',
    image: `${BASE}images/Combos/662883861_18084336809621436_14415400890110370_n.webp`,
    alt: 'Combo Toque Natural con planta ornamental y maceta blanca texturada.',
    whatsappMessage:
      'Hola De Raíz, vi el Combo Toque Natural en la web y me gustaría armar uno parecido. ¿Me pueden asesorar?',
  },
  {
    id: 'selva-mini',
    title: 'Combo Selva Mini',
    description: 'Ideal para armar tu rinconcito selvático en repisas, escritorios o mesas de luz.',
    includes: 'Monstera adansonii + maceta a elección',
    image: `${BASE}images/Combos/681808372_18084336797621436_6574950320876914164_n.webp`,
    alt: 'Combo Selva Mini con Monstera adansonii y maceta de interior.',
    whatsappMessage:
      'Hola De Raíz, vi el Combo Selva Mini en la web y me gustaría armar uno parecido. ¿Me pueden asesorar?',
  },
  {
    id: 'rincon-calido',
    title: 'Combo Rincón Cálido',
    description: 'Para crear un rincón acogedor en tu living usando texturas rústicas y hojas únicas.',
    includes: 'Planta + maceta',
    image: `${BASE}images/Combos/682819319_18084336818621436_4685393247746492369_n.webp`,
    alt: 'Combo Rincón Cálido con planta variegada en maceta tejida.',
    whatsappMessage:
      'Hola De Raíz, vi el Combo Rincón Cálido en la web y me gustaría armar uno parecido. ¿Me pueden asesorar?',
  },
  {
    id: 'selva-natural',
    title: 'Combo Selva Natural',
    description: 'Hojas de gran formato y una maceta de cerámica hecha a mano para darle presencia a tu espacio.',
    includes: 'Planta + maceta',
    image: `${BASE}images/Combos/682935109_18084336827621436_33320198583019895_n.webp`,
    alt: 'Combo Selva Natural con planta Monstera en maceta de cerámica clara.',
    whatsappMessage:
      'Hola De Raíz, vi el Combo Selva Natural en la web y me gustaría armar uno parecido. ¿Me pueden asesorar?',
  },
];



const CATEGORIES = [
  { 
    id: 'plantas',
    icon: <IconInterior />, 
    title: 'Plantas', 
    shortDesc: 'Interior, exterior y suculentas.', 
    link: '/catalogo', 
    color: '#2F4A2E',
    bgImage: `${BASE}images/categorias/bg_plantas.webp`,
    adviceTitle: 'Tip Botánico',
    advice: 'Cada planta tiene su lugar. Las de interior suelen preferir luz indirecta brillante, mientras que las de exterior y huerta necesitan mucho sol directo. Es clave elegir la planta según la luz real de tu espacio, no al revés.'
  },
  { 
    id: 'insumos',
    icon: <IconJardineria />, 
    title: 'Insumos', 
    shortDesc: 'Sustratos y fertilizantes.', 
    link: '/catalogo?cat=Sustratos%20y%20Tierra', 
    color: '#6F7F5F',
    bgImage: `${BASE}images/categorias/bg_insumos.webp`,
    adviceTitle: 'Nutrición y Tierra',
    advice: 'La tierra común se compacta. Un buen sustrato debe ser suelto para que las raíces respiren y absorban nutrientes. Recordá fertilizar solo en su época de crecimiento (primavera y verano).'
  },
  { 
    id: 'macetas',
    icon: <IconMaceta />, 
    title: 'Macetas', 
    shortDesc: 'Barro, plástico y decorativas.', 
    link: '/catalogo?cat=Macetas', 
    color: '#A65F3A',
    bgImage: `${BASE}images/categorias/bg_macetas.webp`,
    adviceTitle: 'El Secreto del Drenaje',
    advice: 'El drenaje es vital para que las raíces no se pudran. Usá macetas con agujeros siempre que puedas. Si elegís una maceta decorativa sin drenaje, te recomendamos usarla como portamaceta.'
  },
];

const PET_SAFE_PLANTS = [
  'areca', 'chamaedorea', 'peperomia', 'raphis', 'violeta africana',
  'helecho', 'lavanda', 'romero', 'tomillo', 'albahaca', 'menta', 'limon', 'mandarino'
];

const isPetSafe = (name) => {
  const normalized = name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return PET_SAFE_PLANTS.some(term => normalized.includes(term));
};



const getRecommendations = (answers, products) => {
  const { placement, light, care, pets } = answers;
  const plants = products.filter(p => p.section === 'plantas' && p.active !== false);
  
  const scored = plants.map(plant => {
    let score = 0;
    
    // 1. Placement (Category)
    if (placement === 'interior' && plant.category === 'Interior') score += 12;
    if (placement === 'exterior' && plant.category === 'Exterior') score += 12;
    if (placement === 'huerta' && plant.category === 'Huerta') score += 12;
    
    // 2. Light
    const plantLight = plant.attributes.find(a => a.type === 'luz')?.value || '';
    const lightVal = plantLight.toLowerCase();
    
    if (light === 'poca') {
      if (lightVal.includes('poca') || lightVal.includes('sin sol') || lightVal.includes('sombra') || lightVal.includes('moderado') || lightVal.includes('media')) {
        score += 10;
      }
      if (lightVal.includes('sol directo') || lightVal.includes('pleno sol')) {
        score -= 20;
      }
    } else if (light === 'indirecta') {
      if (lightVal.includes('sin sol') || lightVal.includes('indirecta') || lightVal.includes('semisombra') || lightVal.includes('media a mucha')) {
        score += 10;
      }
    } else if (light === 'directa') {
      if (lightVal.includes('sol directo') || lightVal.includes('pleno sol') || lightVal.includes('semisombra')) {
        score += 10;
      }
      if (lightVal.includes('sin sol')) {
        score -= 20;
      }
    }
    
    // 3. Care / Difficulty
    const plantDiff = plant.attributes.find(a => a.type === 'dificultad')?.value || 'Media';
    
    if (care === 'principiante') {
      if (plantDiff === 'Baja') score += 10;
      if (plantDiff === 'Alta') score -= 10;
    } else if (care === 'entusiasta') {
      if (plantDiff === 'Media' || plantDiff === 'Alta') score += 10;
      if (plantDiff === 'Baja') score += 5;
    } else if (care === 'flores') {
      const nameNorm = plant.name.toLowerCase();
      const descNorm = plant.description.toLowerCase();
      const hasFlowers = nameNorm.includes('azalea') || nameNorm.includes('petunia') || nameNorm.includes('clavel') || 
                         nameNorm.includes('viola') || nameNorm.includes('sapito') || nameNorm.includes('azucar') || 
                         nameNorm.includes('copete') || nameNorm.includes('boca de sapo') || descNorm.includes('flor') || 
                         descNorm.includes('colores') || descNorm.includes('aromatica') || plant.category === 'Huerta';
      if (hasFlowers) score += 10;
    }
    
    // 4. Pets (Pet-Friendly)
    if (pets === 'si') {
      const safe = isPetSafe(plant.name);
      if (safe) {
        score += 15;
      } else {
        score -= 30;
      }
    }
    
    return { plant, score };
  });
  
  const sorted = scored.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return 0.5 - Math.random();
  });
  
  return sorted.slice(0, 1).map(item => item.plant);
};

const getExplanation = (plant, answers) => {
  const { light, care, pets } = answers;
  const plantDiff = plant.attributes.find(a => a.type === 'dificultad')?.value || 'Media';
  const isSafe = isPetSafe(plant.name);
  
  let text = `Creemos que el **${plant.name}** te va a encantar para tu espacio de **${plant.category}**`;
  
  if (light === 'poca') {
    text += ` con poca luz natural, ya que se banca bárbaro los rincones con sombra o luz tenue.`;
  } else if (light === 'indirecta') {
    text += ` con buena luz filtrada: ahí va a crecer divina sin que el sol directo le queme las hojas.`;
  } else {
    text += ` con sol directo de lleno, aprovechando la luz para crecer bien fuerte y tupida.`;
  }
  
  if (care === 'principiante') {
    text += ` Como es de cuidado **Baja**, es súper noble. Se perdona si te olvidás de regarla de vez en cuando, ideal para empezar sin presiones.`;
  } else if (care === 'entusiasta') {
    text += ` Su nivel de cuidado es **${plantDiff}**, ideal si querés dedicarle unos minutos a ver cómo avanza y regarla a su tiempo.`;
  } else if (care === 'flores') {
    text += ` Al ser una variedad muy vistosa, te va a alegrar el espacio con sus flores o sus hojas de colores llamativos.`;
  }
  
  if (pets === 'si' && isSafe) {
    text += ` ¡Y un golazo: es Pet-Friendly 🐾, así que no hay drama si tenés perros o gatos curiosos!`;
  }
  
  return text;
};

const generateQuizWhatsAppMessage = (plants, answers) => {
  const { placement, light, care, pets } = answers;
  const plantNames = plants.map(p => p.name).join(' y ');
  
  const placementText = placement === 'interior' ? 'Interior' : (placement === 'exterior' ? 'Exterior' : 'Huerta');
  const lightText = light === 'poca' ? 'poca luz' : (light === 'indirecta' ? 'mucha luz indirecta' : 'sol directo');
  const careText = care === 'principiante' ? 'principiante' : (care === 'entusiasta' ? 'entusiasta' : 'amante de las flores');
  const petsText = pets === 'si' ? 'tengo mascotas (Pet-Friendly)' : 'sin problemas de mascotas';
  
  return `¡Hola De Raíz! Hice el test interactivo en su web y me recomendó la planta ${plantNames} para un espacio de ${placementText} con ${lightText}. Mi perfil de cuidado es ${careText} y ${petsText}. ¿Tienen stock de alguna de las dos para ir a buscarla?`;
};

const renderExplanationText = (text) => {
  if (!text) return '';
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

const getRemainingCount = (step, answers, products) => {
  if (!products) return 0;
  let list = products.filter(p => p.section === 'plantas' && p.active !== false);
  
  if (step > 1 && answers.placement) {
    const catMap = { interior: 'Interior', exterior: 'Exterior', huerta: 'Huerta' };
    list = list.filter(p => p.category === catMap[answers.placement]);
  }
  
  if (step > 2 && answers.light) {
    list = list.filter(plant => {
      const plantLight = plant.attributes.find(a => a.type === 'luz')?.value || '';
      const lightVal = plantLight.toLowerCase();
      if (answers.light === 'poca') {
        return !(lightVal.includes('sol directo') || lightVal.includes('pleno sol'));
      }
      if (answers.light === 'directa') {
        return !lightVal.includes('sin sol');
      }
      return true;
    });
  }
  
  if (step > 3 && answers.care) {
    if (answers.care === 'flores') {
      list = list.filter(plant => {
        const nameNorm = plant.name.toLowerCase();
        const descNorm = plant.description.toLowerCase();
        return nameNorm.includes('azalea') || nameNorm.includes('petunia') || nameNorm.includes('clavel') || 
               nameNorm.includes('viola') || nameNorm.includes('sapito') || nameNorm.includes('azucar') || 
               nameNorm.includes('copete') || nameNorm.includes('boca de sapo') || descNorm.includes('flor') || 
               descNorm.includes('colores') || descNorm.includes('aromatica') || plant.category === 'Huerta';
      });
    } else if (answers.care === 'principiante') {
      list = list.filter(plant => (plant.attributes.find(a => a.type === 'dificultad')?.value || 'Baja') === 'Baja');
    }
  }
  
  if (step > 4 && answers.pets && answers.pets === 'si') {
    list = list.filter(plant => isPetSafe(plant.name));
  }
  
  return list.length;
};

const Home = () => {
  const { products } = useCatalog();
  
  // Obtener ejemplares de productos por categoría
  const getCategoryExemplars = (catId) => {
    if (!products || products.length === 0) return [];
    if (catId === 'plantas') {
      const popularPlants = ["Monstera", "Areca", "Potus", "Sansevieria", "Ficus elástica"];
      let list = products.filter(p => p.section === 'plantas' && p.active !== false && popularPlants.some(name => p.name.toLowerCase().includes(name.toLowerCase())));
      if (list.length < 3) {
        list = products.filter(p => p.section === 'plantas' && p.active !== false);
      }
      return list.slice(0, 3);
    } else if (catId === 'macetas') {
      return products.filter(p => (p.category === 'Macetas' || p.categoria === 'Macetas') && p.active !== false).slice(0, 3);
    } else if (catId === 'insumos') {
      return products.filter(p => p.section === 'insumos' && p.category !== 'Macetas' && p.categoria !== 'Macetas' && p.active !== false).slice(0, 3);
    }
    return [];
  };

  const heroRef = useRef(null);
  const quickActionsRef = useRef(null);
  const combosGridRef = useRef(null);
  const colLeftRef = useRef(null);
  const colRightRef = useRef(null);
  const testimonialsSectionRef = useRef(null);
  const [activeComboIndex, setActiveComboIndex] = useState(null);

  // Sistema de recomendaciones de catálogo aleatorio
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Estados para el recomendador interactivo
  const [quizStep, setQuizStep] = useState(1);
  const [quizAnswers, setQuizAnswers] = useState({
    placement: '',
    light: '',
    care: '',
    pets: ''
  });
  const [quizResults, setQuizResults] = useState([]);
  const [animationClass, setAnimationClass] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSelectOption = (stepName, value) => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    const updatedAnswers = { ...quizAnswers, [stepName]: value };
    setQuizAnswers(updatedAnswers);
    
    // Deslizar hacia la izquierda (siguiente)
    setAnimationClass('quiz-fade-out-left');
    
    setTimeout(() => {
      if (quizStep < 4) {
        setQuizStep(prev => prev + 1);
        setAnimationClass('quiz-fade-in-right');
      } else {
        const results = getRecommendations(updatedAnswers, products);
        setQuizResults(results);
        setQuizStep(5); // Paso de resultados
        setAnimationClass('quiz-fade-in-right');
      }
      
      setTimeout(() => {
        setAnimationClass('');
        setIsTransitioning(false);
      }, 50);
    }, 350);
  };

  const handleGoBack = (targetStep = quizStep - 1) => {
    if (isTransitioning || targetStep < 1 || targetStep >= quizStep) return;
    setIsTransitioning(true);
    
    // Deslizar hacia la derecha (retroceder)
    setAnimationClass('quiz-fade-out-right');
    
    setTimeout(() => {
      setQuizStep(targetStep);
      setAnimationClass('quiz-fade-in-left');
      
      setTimeout(() => {
        setAnimationClass('');
        setIsTransitioning(false);
      }, 50);
    }, 350);
  };

  const handleRestartQuiz = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    setAnimationClass('quiz-fade-out-right');
    
    setTimeout(() => {
      setQuizStep(1);
      setQuizAnswers({
        placement: '',
        light: '',
        care: '',
        pets: ''
      });
      setQuizResults([]);
      setAnimationClass('quiz-fade-in-left');
      
      setTimeout(() => {
        setAnimationClass('');
        setIsTransitioning(false);
      }, 50);
    }, 350);
  };



  // Helper para mover los carruseles móviles suavemente con snapping al pulsar las flechas
  const scrollCarousel = (ref, direction) => {
    if (!ref.current) return;
    const container = ref.current;
    const firstCard = container.querySelector('.quick-action-card, .value-item, .combo-card');
    if (!firstCard) return;
    
    const cardWidth = firstCard.clientWidth;
    const gap = parseFloat(getComputedStyle(container).gap) || 20;
    const scrollAmount = direction === 'left' ? -(cardWidth + gap) : (cardWidth + gap);
    
    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  };


  // --- SISTEMA DE REVELADO DE ELEMENTOS AL SCROLL (UP & DOWN) ---
  useEffect(() => {
    const revealCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
        } else {
          entry.target.classList.remove('reveal-visible');
        }
      });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
      root: null,
      threshold: 0.01, // Se activa al más mínimo contacto con el búfer para máxima fluidez
      rootMargin: '120px 0px 120px 0px', // Búfer de 120px arriba y abajo para animar de antemano
    });

    const elementsToReveal = document.querySelectorAll('.reveal-on-scroll');
    elementsToReveal.forEach((el) => revealObserver.observe(el));

    return () => {
      elementsToReveal.forEach((el) => revealObserver.unobserve(el));
      revealObserver.disconnect();
    };
  }, [products]);

  // --- ANIMACIONES GSAP SCROLLTRIGGER PARA CATEGORIAS INTERCALADAS ---
  useEffect(() => {
    if (!products || products.length === 0) return;

    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray('.category-row');
      rows.forEach((row) => {
        const cardCol = row.querySelector('.category-card-col');
        const productCards = row.querySelectorAll('.exemplar-card-wrapper');

        // Configurar valores iniciales inmediatos y limpios (sin desplazamientos laterales costosos)
        gsap.set(cardCol, { opacity: 0, y: 30 });
        gsap.set(productCards, { opacity: 0, y: 20 });

        // Animación de la columna de la tarjeta
        gsap.to(cardCol, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardCol,
            start: "top 90%",
            toggleActions: "play none none reverse",
          }
        });

        // Animación de los productos ejemplares de la categoría con un ligero retraso (stagger)
        gsap.to(productCards, {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: row.querySelector('.category-exemplars-col') || row,
            start: "top 90%",
            toggleActions: "play none none reverse",
          }
        });
      });
    });

    return () => ctx.revert(); // Recolección de basura impecable usando gsap.context
  }, [products]);

  // --- EFECTO DE APILAMIENTO DE TARJETAS DE COMBOS (STACKING CARDS) CON GSAP SCROLLTRIGGER ---
  useEffect(() => {
    if (!combosGridRef.current) return;
    const cards = combosGridRef.current.querySelectorAll('.combo-stack-card');
    if (cards.length === 0) return;

    const ctx = gsap.context(() => {
      cards.forEach((card, index) => {
        if (index === cards.length - 1) return; // La última tarjeta se queda fija arriba

        const nextCard = cards[index + 1];
        const stickyTop = () => window.innerWidth < 768 ? 90 : 120;
        const totalDistance = () => card.offsetHeight + 50;

        gsap.to(card, {
          scale: 0.95,
          y: -25,
          opacity: 0.75, // Ajustado a 0.75 y sin filter para evitar el bug del fondo negro en Chrome
          ease: 'none',
          scrollTrigger: {
            trigger: nextCard,
            start: () => `top ${stickyTop() + totalDistance()}px`,
            end: () => `top ${stickyTop()}px`,
            scrub: true,
            invalidateOnRefresh: true,
          }
        });
      });
    }, combosGridRef);

    return () => {
      ctx.revert();
    };
  }, []);

  // --- MIGRACIÓN A GSAP (ENTRADA DEL HERO - OPTIMIZADA SIN HOJAS COMPLEMENTARIAS) ---
  useEffect(() => {
    // GSAP Context para loops de balanceo y entradas
    const ctx = gsap.context(() => {
      // Rebote vertical orgánico del scroll indicator
      gsap.to(".scroll-leaf-bounce", {
        y: 10,
        duration: 1.3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Secuencia de Entrada Teatral de Elementos en el Hero (Entrance Timeline)
      const tl = gsap.timeline();
      
      tl.from(".hero-brand-logo", {
        opacity: 0,
        y: 30,
        scale: 0.95,
        duration: 1.1,
        ease: "power4.out"
      });

      tl.from(".hero-subtitle", {
        opacity: 0,
        y: 18,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.8");

      tl.from(".hero-actions .btn", {
        opacity: 0,
        y: 12,
        scale: 0.97,
        duration: 0.8,
        ease: "back.out(1.2)",
        stagger: 0.15
      }, "-=0.6");

      tl.from(".hero-scroll-indicator", {
        opacity: 0,
        y: 15,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.6");

    }, heroRef);

    return () => {
      ctx.revert(); // Recolección de basura impecable al desmontar
    };
  }, []);

  const testimonials = [
    {
      name: 'Clara M.',
      loc: 'Montevideo',
      text: 'Mi balcón cobró vida con las aromáticas y suculentas de De Raíz. La asesoría personalizada fue clave.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
    },
    {
      name: 'Mateo S.',
      loc: 'Las Piedras',
      text: 'Compré varios árboles nativos para el jardín y prendieron todos excelente. Calidad de cultivo insuperable.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
    },
    {
      name: 'Sofía y Juan',
      loc: 'Canelones',
      text: 'Para nuestro casamiento nos armaron unos centros de mesa rústicos hermosos. Captaron la esencia al instante.',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80'
    },
    {
      name: 'Valeria D.',
      loc: 'Las Piedras',
      text: 'El taller de huerta orgánica me cambió la forma de ver mis plantas. ¡Súper pacientes y dedicados!',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80'
    },
    {
      name: 'Alejandro G.',
      loc: 'La Paz',
      text: 'El sustrato preparado que venden es mágico, mis plantas de interior revivieron en dos semanas.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
    },
    {
      name: 'Beatriz P.',
      loc: 'Progreso',
      text: 'Tienen la mayor variedad de plantines florales de la zona. Siempre que voy encuentro algo especial.',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
    }
  ];

  useEffect(() => {
    let mm = gsap.matchMedia();

    // 1. Animación Parallax de Columnas en pantallas de escritorio
    mm.add("(min-width: 768px)", () => {
      if (colLeftRef.current && colRightRef.current) {
        gsap.fromTo(colLeftRef.current, 
          { y: '120px' },
          { 
            y: '-120px',
            scrollTrigger: {
              trigger: testimonialsSectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            }
          }
        );

        gsap.fromTo(colRightRef.current, 
          { y: '-120px' },
          { 
            y: '120px',
            scrollTrigger: {
              trigger: testimonialsSectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            }
          }
        );
      }
    });

    // 2. Revelación suave (reveal) de cada tarjeta (todas las resoluciones)
    mm.add("all", () => {
      const wrappers = gsap.utils.toArray('.reveal-testimonial');
      wrappers.forEach((wrapper) => {
        gsap.fromTo(wrapper, 
          { 
            opacity: 0,
            y: 50,
            scale: 0.95
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: wrapper,
              start: "top 92%",
              toggleActions: "play none none reverse",
            }
          }
        );
      });
    });

    return () => mm.revert();
  }, []);

  const openComboLightbox = (index) => {
    setActiveComboIndex(index);
  };

  const closeComboLightbox = () => {
    setActiveComboIndex(null);
  };

  const goToPrevCombo = () => {
    setActiveComboIndex((prev) => (prev === null ? null : (prev - 1 + COMBO_INSPIRATIONS.length) % COMBO_INSPIRATIONS.length));
  };

  const goToNextCombo = () => {
    setActiveComboIndex((prev) => (prev === null ? null : (prev + 1) % COMBO_INSPIRATIONS.length));
  };

  useEffect(() => {
    if (activeComboIndex === null) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeComboLightbox();
      if (event.key === 'ArrowLeft') goToPrevCombo();
      if (event.key === 'ArrowRight') goToNextCombo();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeComboIndex]);

  return (
    <div className="home-page">
      <SEO
        title="Vivero De Raíz | Plantas y Macetas en Las Piedras, Uruguay"
        description="Tu vivero de confianza en Las Piedras, Canelones. Encontrá la mejor selección de plantas de interior y exterior, tierra, sustratos y asesoramiento botánico personalizado en Ruta 48."
        path="/"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': ['Florist', 'GardenStore'],
          name: 'De Raíz Floricultura',
          description: 'Vivero especializado en plantas de interior y exterior, macetas e insumos con asesoramiento botánico personalizado en Las Piedras, Canelones.',
          image: [
            'https://alkirian.github.io/De-ra-z-floricultura/images/logo-hero-white.webp',
            'https://alkirian.github.io/De-ra-z-floricultura/images/Instagram/641159597_18569292976036794_7285793248818445959_n.jpg',
          ],
          url: 'https://alkirian.github.io/De-ra-z-floricultura',
          telephone: '+59893307699',
          priceRange: '$$',
          currenciesAccepted: 'UYU',
          paymentAccepted: 'Cash, MercadoPago',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Ruta 48',
            addressLocality: 'Las Piedras',
            addressRegion: 'Canelones',
            addressCountry: 'UY',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: '-34.7291',
            longitude: '-56.2201',
          },
          hasMap: 'https://www.google.com/maps/search/?api=1&query=De+Raiz+Floricultura+Las+Piedras',
          openingHoursSpecification: [
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
              opens: '09:00',
              closes: '18:00',
            },
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: 'Sunday',
              opens: '09:00',
              closes: '13:00',
            },
          ],
          sameAs: [
            'https://www.instagram.com/deraizfloricultura',
          ],
        }}
      />

      {/* ══════════════════════════
          HERO SPLIT ORGÁNICO
      ══════════════════════════ */}
      <section className="hero split-hero hero-sage-botanicals" ref={heroRef}>
        {/* Hojas laterales removidas en favor de la raíz unificada */}

        {/* Contenido principal centrado */}
        <div className="hero-content-centered">
          <h1 className="sr-only">De Raiz Floricultura - Vivero en Las Piedras, Uruguay</h1>
          <img
            src={`${BASE}images/logo-hero-white.webp`}
            alt="De Raíz Floricultura"
            className="hero-brand-logo"
            loading="eager"
          />
          <p className="hero-subtitle">
            Plantas de cultivo propio y asesoramiento en Las Piedras.<br/>
            Te damos una mano para elegir la variedad ideal para tu casa.
          </p>
          <div className="hero-actions stagger-3">
            <a href={generateWaLink(WA_MESSAGES.ayudaElegir)} target="_blank" rel="noreferrer" className="btn btn-light">
              <MessageCircle size={16} /> Asesorate gratis
            </a>
            <Link to="/catalogo" className="btn btn-outline-light">
              Ver catálogo <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Separador inferior con hoja integrada que cruza el borde */}
        <div className="hero-bottom-separator-container">
          <svg
            className="hero-bottom-separator"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M0,72 C180,48 340,38 520,52 C742,70 940,102 1142,88 C1258,80 1358,62 1440,46 L1440,120 L0,120 Z"
              fill="var(--beige-claro)"
            />
          </svg>
        </div>

        {/* Indicador de scroll botánico */}
        <div className="hero-scroll-indicator">
          <img src={`${BASE}images/SVG Hero/SVG/Recurso 13.svg`} className="scroll-leaf-bounce" alt="" />
          <span className="scroll-text">Desliza para explorar</span>
        </div>
      </section>
               {/* ══════════════════════════
          CATEGORÍAS ILUSTRADAS
      ══════════════════════════ */}
      <section className="categories-section section-padding" style={{background: 'var(--beige-claro)', position: 'relative', overflow: 'hidden'}}>
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div className="text-center mb-12 reveal-on-scroll reveal-up">
            <span className="section-label">Qué encontrás en De Raíz</span>
            <h2>Explorá nuestras categorías</h2>
            <div className="title-underline"></div>
          </div>
          <div className="categories-alternating-list">
            {CATEGORIES.map((cat, i) => {
              const exemplars = getCategoryExemplars(cat.id);
              const isEven = i % 2 === 0;
              
              return (
                <div 
                  key={cat.id} 
                  className={`category-row ${isEven ? 'category-row--even' : 'category-row--odd'}`}
                  style={{ '--cat-color': cat.color }}
                >
                  <div className={`category-card-col reveal-on-scroll ${isEven ? 'reveal-left' : 'reveal-right'}`}>
                    <div className="category-card-outer" style={{ backgroundImage: `url(${cat.bgImage})` }}>
                      <div className="category-card-overlay"></div>
                      <div className="category-card-content">
                        <div className="category-card-icon-wrap" style={{ color: cat.color }}>
                          {cat.icon}
                        </div>
                        <div className="category-card-header">
                          <span className="category-card-badge" style={{ color: cat.color, backgroundColor: `${cat.color}15` }}>Categoría</span>
                          <h3 className="category-card-title">{cat.title}</h3>
                        </div>
                        <p className="category-card-desc">{cat.shortDesc}</p>
                        
                        <div className="category-card-advice" style={{ borderColor: `${cat.color}40` }}>
                          <span className="advice-title" style={{ color: cat.color, backgroundColor: `${cat.color}15` }}>
                            <Sparkles size={14} /> {cat.adviceTitle}
                          </span>
                          <p className="advice-text">{cat.advice}</p>
                        </div>
                        
                        <Link to={cat.link} className="category-card-btn" style={{ backgroundColor: cat.color }}>
                          Ver catálogo <ArrowRight size={16} />
                        </Link>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`category-exemplars-col reveal-on-scroll ${isEven ? 'reveal-right' : 'reveal-left'}`}>
                    <div className="exemplars-header">
                      <span className="exemplars-label" style={{ color: cat.color }}>Ejemplares recomendados de {cat.title}</span>
                      <div className="exemplars-divider" style={{ backgroundColor: `${cat.color}30` }}></div>
                    </div>
                    <div className="exemplars-grid">
                      {exemplars.map((product) => (
                        <div key={product.id} className="exemplar-card-wrapper">
                          <ProductCard 
                            product={product} 
                            onClick={setSelectedProduct} 
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* --------------------------
          COMBOS INSPIRACION
      -------------------------- */}
      <section className="combos-section section-padding--sm" aria-labelledby="combos-title">
        <div className="container">
          <div className="text-center combos-header reveal-on-scroll reveal-up">
            <span className="section-label">Inspiracion real</span>
            <h2 id="combos-title">Combos verdes para regalar o decorar</h2>
            <p className="combos-subtitle">
              Inspirate con algunos combos que ya armamos y escribinos para crear uno a tu medida.
            </p>
          </div>

          <div className="combos-stack-container" ref={combosGridRef}>
            {COMBO_INSPIRATIONS.map((combo, index) => {
              const cardStyle = {
                zIndex: index + 1,
              };

              return (
                <article
                  key={combo.id}
                  className="combo-stack-card"
                  style={cardStyle}
                  role="button"
                  tabIndex={0}
                  onClick={() => openComboLightbox(index)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      openComboLightbox(index);
                    }
                  }}
                  aria-label={`${combo.title}: ver imagen en grande`}
                >
                  <div className="combo-stack-card-image-wrap">
                    <img
                      src={combo.image}
                      alt={combo.alt}
                      className="combo-stack-card-image"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="combo-stack-card-zoom-badge">
                      <span>🔍 Ampliar imagen</span>
                    </div>
                  </div>
                  <div className="combo-stack-card-content" onClick={(event) => event.stopPropagation()}>
                    <span className="combo-stack-badge">Propuesta 0{index + 1}</span>
                    <h3>{combo.title}</h3>
                    <p className="combo-stack-card-description">{combo.description}</p>
                    <p className="combo-stack-card-includes">
                      <strong>Incluye:</strong> {combo.includes}
                    </p>
                    <a
                      href={generateWaLink(combo.whatsappMessage)}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-secondary combo-stack-card-btn"
                      aria-label={`${combo.title}: Quiero uno parecido por WhatsApp`}
                    >
                      Quiero uno parecido
                    </a>
                  </div>
                </article>
              );
            })}
          </div>


          <article className="combo-custom-cta reveal-on-scroll reveal-scale">
            <h3>Queres armar tu propio combo?</h3>
            <p>
              Elegi una planta, una maceta y el estilo que mas te guste. Nosotros te ayudamos a
              combinarlo.
            </p>
            <a
              href={generateWaLink(COMBO_CUSTOM_MESSAGE)}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary combo-custom-cta-btn"
            >
              Armar mi combo por WhatsApp
            </a>
          </article>
        </div>
      </section>

      {/* ══════════════════════════
          ASESORAMIENTO GRATUITO
      ══════════════════════════ */}
      <WaveTop fill="var(--verde-profundo)" bg="var(--crema)" className="wave-transition--combos-to-advice" />
      <section className="advice-section section-padding--sm">
        <div className="container">
          <div className="text-center mb-8 reveal-on-scroll reveal-up">
            <span className="section-label">Asesoramiento Interactivo 🌿</span>
            <h2>¿No sabés qué planta elegir?</h2>
            <p className="quiz-section-intro" style={{ maxWidth: '600px', margin: '12px auto 0', color: '#ffffff', fontSize: '1.05rem', lineHeight: '1.6' }}>
              Respondé 4 preguntas rápidas y te recomendamos las variedades que mejor se adapten a tu luz, tus tiempos y tus mascotas.
            </p>
          </div>

          <div className="advice-quiz-container">
            {/* Header del Quiz / Stepper Timeline */}
            <div className="quiz-header-timeline">
              {quizStep > 1 && quizStep <= 4 && (
                <button
                  type="button"
                  className="quiz-back-btn"
                  onClick={() => handleGoBack(quizStep - 1)}
                  disabled={isTransitioning}
                  aria-label="Volver al paso anterior"
                >
                  <ArrowRight size={14} style={{ transform: 'rotate(180deg)', marginRight: '6px' }} /> Volver
                </button>
              )}
              
              {quizStep <= 4 && (
                <div className="quiz-timeline">
                  {QUIZ_STEPS_METADATA.map((s) => {
                    const isActive = quizStep === s.step;
                    const isCompleted = quizStep > s.step;
                    const isPending = quizStep < s.step;
                    
                    let stepClass = 'timeline-step';
                    if (isActive) stepClass += ' active';
                    if (isCompleted) stepClass += ' completed';
                    if (isPending) stepClass += ' pending';
                    
                    return (
                      <div key={s.step} className="timeline-step-outer">
                        <button
                          type="button"
                          className={stepClass}
                          onClick={() => isCompleted && handleGoBack(s.step)}
                          disabled={!isCompleted || isTransitioning}
                          aria-label={`Ir al paso ${s.step}: ${s.label}`}
                        >
                          <div className="timeline-step-icon-wrap">
                            {isCompleted ? <Check size={12} strokeWidth={3} /> : s.icon}
                          </div>
                          <span className="timeline-step-label">{s.label}</span>
                        </button>
                        {s.step < 4 && (
                          <div className={`timeline-line ${quizStep > s.step ? 'filled' : ''}`} />
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {quizStep <= 4 && (
                <div className="quiz-remaining-badge reveal-scale">
                  <Sprout className="sprout-bounce-icon" size={14} />
                  <span>
                    <span key={getRemainingCount(quizStep, quizAnswers, products)} className="remaining-count-anim">
                      {getRemainingCount(quizStep, quizAnswers, products)}
                    </span>{' '}
                    {getRemainingCount(quizStep, quizAnswers, products) === 1 ? 'planta compatible' : 'plantas compatibles'}
                  </span>
                </div>
              )}
            </div>

            <div className="quiz-body-wrapper">
              {quizStep === 1 && (
                <div className={`quiz-step-content ${animationClass}`}>
                  <h3>¿Dónde vas a ubicar tu planta? 🏠</h3>
                  <p className="quiz-step-subtitle">Definir el ambiente correcto es clave para que tu planta crezca sana.</p>
                  <div className="quiz-cards-grid quiz-cards-grid--two">
                    <button
                      type="button"
                      className={`quiz-card-option ${quizAnswers.placement === 'interior' ? 'selected' : ''}`}
                      onClick={() => handleSelectOption('placement', 'interior')}
                      disabled={isTransitioning}
                    >
                      <div className="quiz-card-icon-wrap">
                        <SvgInteriorOption />
                      </div>
                      <h4>Interior</h4>
                      <p>Living, dormitorio, cocina u oficina.</p>
                      <div className="quiz-card-select-dot"></div>
                    </button>
                    <button
                      type="button"
                      className={`quiz-card-option ${quizAnswers.placement === 'exterior' ? 'selected' : ''}`}
                      onClick={() => handleSelectOption('placement', 'exterior')}
                      disabled={isTransitioning}
                    >
                      <div className="quiz-card-icon-wrap">
                        <SvgExteriorOption />
                      </div>
                      <h4>Exterior</h4>
                      <p>Jardín, patio o balcón abierto.</p>
                      <div className="quiz-card-select-dot"></div>
                    </button>
                  </div>
                </div>
              )}

              {quizStep === 2 && (
                <div className={`quiz-step-content ${animationClass}`}>
                  <h3>¿Cómo es la luz natural en ese lugar? ⛅</h3>
                  <p className="quiz-step-subtitle">La iluminación es vital. Elegí la opción más cercana a tu espacio real.</p>
                  <div className="quiz-cards-grid">
                    <button
                      type="button"
                      className={`quiz-card-option ${quizAnswers.light === 'poca' ? 'selected' : ''}`}
                      onClick={() => handleSelectOption('light', 'poca')}
                      disabled={isTransitioning}
                    >
                      <div className="quiz-card-icon-wrap">
                        <SvgLowLight />
                      </div>
                      <h4>Poca luz / Sombra</h4>
                      <p>Espacios con sombra o luz tenue.</p>
                      <div className="quiz-card-select-dot"></div>
                    </button>
                    <button
                      type="button"
                      className={`quiz-card-option ${quizAnswers.light === 'indirecta' ? 'selected' : ''}`}
                      onClick={() => handleSelectOption('light', 'indirecta')}
                      disabled={isTransitioning}
                    >
                      <div className="quiz-card-icon-wrap">
                        <SvgIndirectLight />
                      </div>
                      <h4>Luz indirecta brillante</h4>
                      <p>Mucha luz natural, sin sol directo.</p>
                      <div className="quiz-card-select-dot"></div>
                    </button>
                    <button
                      type="button"
                      className={`quiz-card-option ${quizAnswers.light === 'directa' ? 'selected' : ''}`}
                      onClick={() => handleSelectOption('light', 'directa')}
                      disabled={isTransitioning}
                    >
                      <div className="quiz-card-icon-wrap">
                        <SvgDirectLight />
                      </div>
                      <h4>Sol directo</h4>
                      <p>Rayos de sol de lleno varias horas.</p>
                      <div className="quiz-card-select-dot"></div>
                    </button>
                  </div>
                </div>
              )}

              {quizStep === 3 && (
                <div className={`quiz-step-content ${animationClass}`}>
                  <h3>¿Cómo te definirías cuidando plantas? 💧</h3>
                  <p className="quiz-step-subtitle">Elegí la planta que se adapte mejor a tus tiempos y a tu rutina diaria.</p>
                  <div className="quiz-cards-grid">
                    <button
                      type="button"
                      className={`quiz-card-option ${quizAnswers.care === 'principiante' ? 'selected' : ''}`}
                      onClick={() => handleSelectOption('care', 'principiante')}
                      disabled={isTransitioning}
                    >
                      <div className="quiz-card-icon-wrap">
                        <SvgBeginner />
                      </div>
                      <h4>Principiante / Poco tiempo</h4>
                      <p>Plantas súper guerreras de bajo cuidado.</p>
                      <div className="quiz-card-select-dot"></div>
                    </button>
                    <button
                      type="button"
                      className={`quiz-card-option ${quizAnswers.care === 'entusiasta' ? 'selected' : ''}`}
                      onClick={() => handleSelectOption('care', 'entusiasta')}
                      disabled={isTransitioning}
                    >
                      <div className="quiz-card-icon-wrap">
                        <SvgEnthusiast />
                      </div>
                      <h4>Entusiasta / Con tiempo</h4>
                      <p>Me gusta mimarlas y regar seguido.</p>
                      <div className="quiz-card-select-dot"></div>
                    </button>
                    <button
                      type="button"
                      className={`quiz-card-option ${quizAnswers.care === 'flores' ? 'selected' : ''}`}
                      onClick={() => handleSelectOption('care', 'flores')}
                      disabled={isTransitioning}
                    >
                      <div className="quiz-card-icon-wrap">
                        <SvgFlowers />
                      </div>
                      <h4>Quiero flores y color</h4>
                      <p>Variedades que aporten tonos al espacio.</p>
                      <div className="quiz-card-select-dot"></div>
                    </button>
                  </div>
                </div>
              )}

              {quizStep === 4 && (
                <div className={`quiz-step-content ${animationClass}`}>
                  <h3>¿Tenés mascotas curiosas en casa? 🐾</h3>
                  <p className="quiz-step-subtitle">Algunas plantas son tóxicas. Protegemos a tus mejores amigos.</p>
                  <div className="quiz-cards-grid quiz-cards-grid--two">
                    <button
                      type="button"
                      className={`quiz-card-option ${quizAnswers.pets === 'si' ? 'selected' : ''}`}
                      onClick={() => handleSelectOption('pets', 'si')}
                      disabled={isTransitioning}
                    >
                      <div className="quiz-card-icon-wrap">
                        <SvgPetsYes />
                      </div>
                      <h4>Sí, necesito Pet-Friendly</h4>
                      <p>Variedades 100% seguras para perros y gatos.</p>
                      <div className="quiz-card-select-dot"></div>
                    </button>
                    <button
                      type="button"
                      className={`quiz-card-option ${quizAnswers.pets === 'no' ? 'selected' : ''}`}
                      onClick={() => handleSelectOption('pets', 'no')}
                      disabled={isTransitioning}
                    >
                      <div className="quiz-card-icon-wrap">
                        <SvgPetsNo />
                      </div>
                      <h4>No tengo / No me preocupa</h4>
                      <p>Cualquier variedad me sirve perfectamente.</p>
                      <div className="quiz-card-select-dot"></div>
                    </button>
                  </div>
                </div>
              )}

              {quizStep === 5 && (
                <div className={`quiz-step-content quiz-results-content ${animationClass}`}>
                  <div className="quiz-results-header">
                    <span className="section-label">¡Tu resultado botánico! 🏆</span>
                    <h3>Encontramos tu planta ideal 🌿</h3>
                    <p className="quiz-results-subtitle">
                      En base a tus respuestas: <span className="quiz-summary-pill">{quizAnswers.placement === 'interior' ? 'Interior' : 'Exterior'}</span> 
                      <span className="quiz-summary-pill">{quizAnswers.light === 'poca' ? 'Poca luz' : quizAnswers.light === 'indirecta' ? 'Luz indirecta' : 'Sol directo'}</span> 
                      <span className="quiz-summary-pill">{quizAnswers.care === 'principiante' ? 'Principiante' : quizAnswers.care === 'entusiasta' ? 'Entusiasta' : 'Con flores'}</span> 
                      {quizAnswers.pets === 'si' && <span className="quiz-summary-pill quiz-summary-pill--pet">🐾 Pet-Friendly</span>}
                    </p>
                  </div>

                  <div className="quiz-results-container">
                    {quizResults.map((product) => {
                      const explanation = getExplanation(product, quizAnswers);
                      const hasCareTips = product.careTips;
                      return (
                        <div key={product.id} className="quiz-match-card reveal-scale">
                          {/* Panel de Imagen con Badge de Coincidencia */}
                          <div className="quiz-match-card-image-panel" onClick={() => setSelectedProduct(product)}>
                            <img src={product.image} alt={product.name} />
                            <div className="quiz-match-compatibility-badge">
                              <Sparkles size={12} className="sparkle-spin" />
                              <span>98% Coincidencia</span>
                            </div>
                            <span className="quiz-match-zoom-hint">🔍 Ampliar foto</span>
                          </div>
                          
                          {/* Panel de Información y Acciones */}
                          <div className="quiz-match-card-info-panel">
                            <span className="quiz-match-category-tag">{product.category}</span>
                            <h4 className="quiz-match-title">{product.name}</h4>
                            
                            {/* Grid de Atributos Botánicos */}
                            <div className="quiz-match-metrics-grid">
                              <div className="quiz-match-metric-item">
                                <div className="metric-icon-wrap"><Sun size={14} /></div>
                                <div className="metric-info">
                                  <span className="metric-label">Luz</span>
                                  <span className="metric-value">{product.attributes.find(a => a.type === 'luz')?.value || 'Adaptable'}</span>
                                </div>
                              </div>
                              <div className="quiz-match-metric-item">
                                <div className="metric-icon-wrap"><Droplets size={14} /></div>
                                <div className="metric-info">
                                  <span className="metric-label">Riego</span>
                                  <span className="metric-value">{product.attributes.find(a => a.type === 'riego')?.value || 'Moderado'}</span>
                                </div>
                              </div>
                              <div className="quiz-match-metric-item">
                                <div className="metric-icon-wrap"><Ruler size={14} /></div>
                                <div className="metric-info">
                                  <span className="metric-label">Dificultad</span>
                                  <span className="metric-value">{product.attributes.find(a => a.type === 'dificultad')?.value || 'Baja'}</span>
                                </div>
                              </div>
                              <div className="quiz-match-metric-item">
                                <div className="metric-icon-wrap"><Leaf size={14} /></div>
                                <div className="metric-info">
                                  <span className="metric-label">Mascotas</span>
                                  <span className="metric-value">{product.isPetFriendly || isPetSafe(product.name) ? 'Pet-Friendly 🐾' : 'Tóxica (mantener alejada)'}</span>
                                </div>
                              </div>
                            </div>

                            {/* Explicación Personalizada */}
                            <div className="quiz-match-explanation-box">
                              <p className="quiz-match-explanation-text">
                                {renderExplanationText(explanation)}
                              </p>
                            </div>

                            {/* Tip de Cuidado del Vivero */}
                            {hasCareTips && (
                              <div className="quiz-match-tips-box">
                                <h5>🌿 Tip de Cultivo De Raíz:</h5>
                                <p>{product.careTips}</p>
                              </div>
                            )}

                            {/* Acciones del Producto */}
                            <div className="quiz-match-actions">
                              <button
                                type="button"
                                className="btn btn-primary quiz-match-add-btn"
                                onClick={() => addToCart(product)}
                              >
                                <ShoppingCart size={14} /> Agregar al carrito
                              </button>
                              <a
                                href={generateWaLink(WA_MESSAGES.producto(product.name))}
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn-secondary quiz-match-wa-btn"
                              >
                                <MessageCircle size={14} /> Consultar Stock
                              </a>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Acciones Globales del Resultado */}
                  <div className="quiz-results-footer-actions">
                    <a
                      href={generateWaLink(generateQuizWhatsAppMessage(quizResults, quizAnswers))}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-primary quiz-wa-cta"
                    >
                      <MessageCircle size={18} /> Consultar stock completo por WhatsApp
                    </a>
                    <button
                      type="button"
                      className="btn btn-secondary quiz-restart-btn"
                      onClick={handleRestartQuiz}
                    >
                      <RotateCcw size={16} /> Hacer el test de nuevo
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <WaveBottom fill="var(--verde-profundo)" bg="var(--blanco-calido)" className="wave-transition--advice-to-categories" />



      {/* ══════════════════════════
          LOCAL EN LAS PIEDRAS (REDESIGN)
      ══════════════════════════ */}
      <section className="location-map-section section-padding" style={{ background: 'var(--blanco-calido)', position: 'relative', paddingTop: 0 }}>
        <div className="container">
          <div className="location-header" style={{ marginTop: '48px' }}>
            <h2 className="location-uppercase-title">Ubicación</h2>
          </div>

          <div className="location-map-card">
            <div className="location-map-iframe-container">
              <iframe
                title="Mapa de ubicación de De Raíz Floricultura"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.7818987483665!2d-56.222674924258816!3d-34.729095572911576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a12f5a653bb7ef%3A0xe54ef84c7e6c9c7f!2sDe%20Raiz%20Floricultura!5e0!3m2!1ses-419!2suy!4v1710000000000!5m2!1ses-419!2suy"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <div className="location-floating-card">
              <h3 className="landmarks-title">Puntos Cercanos</h3>
              <ul className="landmarks-list">
                <li>
                  <span className="landmark-name">Ruta 5 (Conexión rápida)</span>
                  <span className="landmark-time">4 mins</span>
                </li>
                <li>
                  <span className="landmark-name">Plaza Las Piedras (Centro)</span>
                  <span className="landmark-time">6 mins</span>
                </li>
                <li>
                  <span className="landmark-name">Progreso</span>
                  <span className="landmark-time">10 mins</span>
                </li>
                <li>
                  <span className="landmark-name">Límite con Montevideo</span>
                  <span className="landmark-time">12 mins</span>
                </li>
                <li>
                  <span className="landmark-name">Ruta 102 (Acceso Perimetral)</span>
                  <span className="landmark-time">15 mins</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="location-editorial-grid">
            <div className="editorial-left">
              <h3 className="editorial-lead-title">Visítanos en Las Piedras</h3>
              <p className="editorial-heading-text">Tu escapada natural en Ruta 48</p>
            </div>
            <div className="editorial-right">
              <p className="editorial-paragraph">
                Vení a conocer nuestro vivero y cultivo en persona. Encontrá todas las variedades en un espacio natural único y recibí asesoramiento botánico directo de nuestro equipo.
              </p>
              
              <address className="editorial-address-block" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                <div className="editorial-info-col">
                  <strong>Dirección</strong>
                  <span><MapPin size={12} style={{ marginRight: '4px', verticalAlign: 'middle' }} /> Ruta 48, Las Piedras, Canelones, Uruguay</span>
                </div>
                <div className="editorial-info-col">
                  <strong>Teléfono</strong>
                  <span><Phone size={12} style={{ marginRight: '4px', verticalAlign: 'middle' }} /> <a href="tel:+59899000000">+598 99 000 000</a></span>
                </div>
                <div className="editorial-info-col">
                  <strong>Horarios</strong>
                  <span>Lunes a Sábado: 09:00 - 18:00</span>
                  <span>Domingos: 09:00 - 13:00</span>
                </div>
              </address>

              <div className="editorial-ctas">
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=De+Raiz+Floricultura+Las+Piedras" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="btn btn-editorial-primary"
                >
                  <Navigation size={15} /> Cómo llegar
                </a>
                <Link to="/contacto" className="btn btn-editorial-secondary">
                  <MessageCircle size={15} /> Más información
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WaveBottom fill="var(--blanco-calido)" bg="var(--verde-profundo)" className="wave-transition--categories-to-testimonials" />


      {/* ══════════════════════════
          TESTIMONIOS
      ══════════════════════════ */}
      <section className="testimonials-section section-padding" ref={testimonialsSectionRef}>
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div className="text-center mb-16 testimonials-header">
            <span className="section-label">Clientes</span>
            <h2>Lo que dicen nuestros clientes</h2>
            <p className="testimonials-subtitle">
              Opiniones reales de clientes de Las Piedras.
            </p>
          </div>

          <div className="testimonials-grid">
            <div className="testimonials-col testimonials-col-left" ref={colLeftRef}>
              {testimonials.filter((_, i) => i % 2 === 0).map((t, i) => (
                <div key={i} className="reveal-testimonial">
                  <div className="testimonial-card">
                    <div className="testimonial-stars">{'★★★★★'}</div>
                    <div className="testimonial-content">
                      <div className="testimonial-avatar-wrapper">
                        <img src={t.avatar} alt={t.name} className="testimonial-avatar" />
                      </div>
                      <div className="testimonial-info">
                        <p className="testimonial-text">"{t.text}"</p>
                        <div className="testimonial-author">
                          <span className="testimonial-name">- {t.name.toUpperCase()}</span>
                          <span className="testimonial-loc">{t.loc}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="testimonials-col testimonials-col-right" ref={colRightRef}>
              {testimonials.filter((_, i) => i % 2 !== 0).map((t, i) => (
                <div key={i} className="reveal-testimonial">
                  <div className="testimonial-card">
                    <div className="testimonial-stars">{'★★★★★'}</div>
                    <div className="testimonial-content">
                      <div className="testimonial-avatar-wrapper">
                        <img src={t.avatar} alt={t.name} className="testimonial-avatar" />
                      </div>
                      <div className="testimonial-info">
                        <p className="testimonial-text">"{t.text}"</p>
                        <div className="testimonial-author">
                          <span className="testimonial-name">- {t.name.toUpperCase()}</span>
                          <span className="testimonial-loc">{t.loc}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <a href={generateWaLink(WA_MESSAGES.general)} target="_blank" rel="noreferrer" className="btn btn-outline-light">
              <MessageCircle size={18} /> Consultar por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {activeComboIndex !== null && (
        <div
          className="combo-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Vista ampliada: ${COMBO_INSPIRATIONS[activeComboIndex].title}`}
          onClick={closeComboLightbox}
        >
          <div className="combo-lightbox-panel" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="combo-lightbox-close"
              onClick={closeComboLightbox}
              aria-label="Cerrar imagen"
            >
              <X size={20} />
            </button>

            <button
              type="button"
              className="combo-lightbox-nav combo-lightbox-nav--prev"
              onClick={goToPrevCombo}
              aria-label="Imagen anterior"
            >
              <ChevronLeft size={22} />
            </button>

            <figure className="combo-lightbox-figure">
              <img
                src={COMBO_INSPIRATIONS[activeComboIndex].image}
                alt={COMBO_INSPIRATIONS[activeComboIndex].alt}
                className="combo-lightbox-image"
              />
              <figcaption>
                {COMBO_INSPIRATIONS[activeComboIndex].title}
              </figcaption>
            </figure>

            <button
              type="button"
              className="combo-lightbox-nav combo-lightbox-nav--next"
              onClick={goToNextCombo}
              aria-label="Siguiente imagen"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>
      )}

      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}

    </div>
  );
};

export default Home;





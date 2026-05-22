import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, MessageCircle, Sparkles, Leaf, MapPin, ChevronLeft, ChevronRight, BookOpen, X, ShoppingCart, Sun, Droplets, Ruler, Package, Sprout, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { generateWaLink, WA_MESSAGES, MOCK_PRODUCTS } from '../data/mockData';
import { useCart } from '../context/CartContext';
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
    <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill={fill}/>
    </svg>
  </div>
);

const WaveBottom = ({ fill = '#F4EBDD', bg = 'transparent', className = '' }) => (
  <div className={`wave-transition wave-transition--bottom ${className}`.trim()} style={{ background: bg }}>
    <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
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

const IconFlor = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="cat-icon">
    <circle cx="32" cy="32" r="6" stroke="currentColor" strokeWidth="2"/>
    <path d="M32 8 C32 8 28 18 32 26 C36 18 32 8 32 8Z" fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M32 38 C32 38 28 48 32 56 C36 48 32 38 32 38Z" fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 32 C8 32 18 28 26 32 C18 36 8 32 8 32Z" fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M38 32 C38 32 48 28 56 32 C48 36 38 32 38 32Z" fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M14 14 C14 14 20 22 26 26 C22 20 14 14 14 14Z" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M38 38 C38 38 44 46 50 50 C46 44 38 38 38 38Z" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const IconRegalo = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="cat-icon">
    <rect x="10" y="28" width="44" height="28" rx="3" stroke="currentColor" strokeWidth="2"/>
    <rect x="10" y="20" width="44" height="10" rx="3" stroke="currentColor" strokeWidth="2"/>
    <path d="M32 20 L32 56" stroke="currentColor" strokeWidth="2"/>
    <path d="M32 20 C32 20 24 14 20 10 C24 8 32 14 32 20Z" fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M32 20 C32 20 40 14 44 10 C40 8 32 14 32 20Z" fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="1.5"/>
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

const IconAsesoramiento = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="cat-icon">
    <path d="M12 40 C12 40 12 20 32 14 C52 8 54 28 44 36 C36 42 28 38 28 38 L20 52 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    <circle cx="26" cy="28" r="2" fill="currentColor"/>
    <circle cx="32" cy="28" r="2" fill="currentColor"/>
    <circle cx="38" cy="28" r="2" fill="currentColor"/>
  </svg>
);

const BASE = import.meta.env.BASE_URL;
// Reemplazar por el numero final de WhatsApp en formato internacional (sin + ni espacios).
const WHATSAPP_NUMBER = 'AQUI_COLOCAR_NUMERO';
// Si queres cambiar imagenes, edita solo el campo image de cada objeto en COMBO_INSPIRATIONS.

const createWhatsAppLink = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

const COMBO_CUSTOM_MESSAGE =
  'Hola De Raíz, quiero armar un combo personalizado con planta y maceta. ¿Me pueden ayudar?';

const COMBO_INSPIRATIONS = [
  {
    id: 'toque-natural',
    title: 'Combo Toque Natural',
    description: 'Un toque de naturaleza que transforma tu espacio.',
    includes: 'Planta + maceta',
    image: `${BASE}images/Combos/662883861_18084336809621436_14415400890110370_n.webp`,
    alt: 'Combo Toque Natural con planta ornamental y maceta blanca texturada.',
    whatsappMessage:
      'Hola De Raíz, vi el Combo Toque Natural en la web y me gustaría armar uno parecido. ¿Me pueden asesorar?',
  },
  {
    id: 'selva-mini',
    title: 'Combo Selva Mini',
    description: 'Sumá verde y frescura a tus espacios.',
    includes: 'Monstera adansonii + maceta a elección',
    image: `${BASE}images/Combos/681808372_18084336797621436_6574950320876914164_n.webp`,
    alt: 'Combo Selva Mini con Monstera adansonii y maceta de interior.',
    whatsappMessage:
      'Hola De Raíz, vi el Combo Selva Mini en la web y me gustaría armar uno parecido. ¿Me pueden asesorar?',
  },
  {
    id: 'rincon-calido',
    title: 'Combo Rincón Cálido',
    description: 'Sumá calidez y vida a tus espacios.',
    includes: 'Planta + maceta',
    image: `${BASE}images/Combos/682819319_18084336818621436_4685393247746492369_n.webp`,
    alt: 'Combo Rincón Cálido con planta variegada en maceta tejida.',
    whatsappMessage:
      'Hola De Raíz, vi el Combo Rincón Cálido en la web y me gustaría armar uno parecido. ¿Me pueden asesorar?',
  },
  {
    id: 'selva-natural',
    title: 'Combo Selva Natural',
    description: 'Verde que transforma, vida que inspira.',
    includes: 'Planta + maceta',
    image: `${BASE}images/Combos/682935109_18084336827621436_33320198583019895_n.webp`,
    alt: 'Combo Selva Natural con planta Monstera en maceta de cerámica clara.',
    whatsappMessage:
      'Hola De Raíz, vi el Combo Selva Natural en la web y me gustaría armar uno parecido. ¿Me pueden asesorar?',
  },
];

const ADVICE_STEPS = [
  { title: 'Tu espacio', detail: 'Nos contas dónde va la planta.' },
  { title: 'Nuestras sugerencias', detail: 'Te proponemos 3 opciones claras.' },
  { title: 'Tu elección', detail: 'Confirmás por WhatsApp si querés.' },
];

const ADVICE_FEATURED_IMAGE = `${BASE}images/Plantas/Boca de sapo.png`;

const CATEGORIES = [
  { 
    icon: <IconInterior />, 
    title: 'Plantas', 
    shortDesc: 'Interior, exterior y suculentas.', 
    link: '/catalogo', 
    color: '#2F4A2E',
    bgImage: `${BASE}images/categorias/bg_plantas.png`,
    adviceTitle: 'Tip Botánico',
    advice: 'Cada planta tiene su lugar. Las de interior suelen preferir luz indirecta brillante, mientras que las de exterior y huerta necesitan mucho sol directo. Es clave elegir la planta según la luz real de tu espacio, no al revés.'
  },
  { 
    icon: <IconMaceta />, 
    title: 'Macetas', 
    shortDesc: 'Barro, plástico y decorativas.', 
    link: '/catalogo?cat=Macetas', 
    color: '#A65F3A',
    bgImage: `${BASE}images/categorias/bg_macetas.png`,
    adviceTitle: 'El Secreto del Drenaje',
    advice: 'El drenaje es vital para que las raíces no se pudran. Usá macetas con agujeros siempre que puedas. Si elegís una maceta decorativa sin drenaje, te recomendamos usarla como portamaceta.'
  },
  { 
    icon: <IconJardineria />, 
    title: 'Insumos', 
    shortDesc: 'Sustratos y fertilizantes.', 
    link: '/catalogo?cat=Sustratos%20y%20Tierra', 
    color: '#6F7F5F',
    bgImage: `${BASE}images/categorias/bg_insumos.png`,
    adviceTitle: 'Nutrición y Tierra',
    advice: 'La tierra común se compacta. Un buen sustrato debe ser suelto para que las raíces respiren y absorban nutrientes. Recordá fertilizar solo en su época de crecimiento (primavera y verano).'
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

const getDifficultyText = (diff) => {
  if (diff === 'Baja') return 'Muy fácil';
  if (diff === 'Media') return 'Cuidado moderado';
  return 'Para expertos';
};

const getRecommendations = (answers) => {
  const { placement, light, care, pets } = answers;
  const plants = MOCK_PRODUCTS.filter(p => p.section === 'plantas');
  
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
  
  return sorted.slice(0, 2).map(item => item.plant);
};

const getExplanation = (plant, answers) => {
  const { placement, light, care, pets } = answers;
  const plantDiff = plant.attributes.find(a => a.type === 'dificultad')?.value || 'Media';
  const isSafe = isPetSafe(plant.name);
  
  let text = `Elegimos el **${plant.name}** porque es ideal para tu espacio de **${plant.category}**`;
  
  if (light === 'poca') {
    text += ` con poca luz natural, ya que tolera rincones de sombra excelente.`;
  } else if (light === 'indirecta') {
    text += ` con mucha luz indirecta, donde sus hojas crecerán hermosas sin quemarse por el sol.`;
  } else {
    text += ` con sol directo, aprovechando los rayos de sol para su pleno crecimiento y vigor.`;
  }
  
  if (care === 'principiante') {
    text += ` Al ser de dificultad **Baja**, es súper resistente y perdona olvidos de riego, ideal para arrancar sin presiones.`;
  } else if (care === 'entusiasta') {
    text += ` Su nivel de cuidado es **${plantDiff}**, perfecto para vos que disfrutás observarlas y regar con regularidad.`;
  } else if (care === 'flores') {
    text += ` Al ser una variedad muy vistosa, aportará hermosas flores o colores vibrantes para alegrar tu rincón.`;
  }
  
  if (pets === 'si' && isSafe) {
    text += ` ¡Y lo mejor es que es 100% Pet-Friendly 🐾, totalmente segura para tus compañeros peludos!`;
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

const Home = () => {
  const heroRef = useRef(null);
  const quickActionsRef = useRef(null);
  const valueGridRef = useRef(null);
  const combosGridRef = useRef(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [activeComboIndex, setActiveComboIndex] = useState(null);
  const [expandedCategory, setExpandedCategory] = useState(null);

  // Sistema de recomendaciones de catálogo aleatorio
  const { addToCart } = useCart();
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [currentRecIndex, setCurrentRecIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Estados para el recomendador interactivo
  const [quizActive, setQuizActive] = useState(false);
  const [quizStep, setQuizStep] = useState(1);
  const [quizAnswers, setQuizAnswers] = useState({
    placement: '',
    light: '',
    care: '',
    pets: ''
  });
  const [quizResults, setQuizResults] = useState([]);

  const handleSelectOption = (stepName, value) => {
    const updatedAnswers = { ...quizAnswers, [stepName]: value };
    setQuizAnswers(updatedAnswers);
    
    if (quizStep < 4) {
      setQuizStep(prev => prev + 1);
    } else {
      const results = getRecommendations(updatedAnswers);
      setQuizResults(results);
      setQuizStep(5); // Paso de resultados
    }
  };

  useEffect(() => {
    const plants = MOCK_PRODUCTS.filter((p) => p.section === 'plantas');
    if (plants.length > 0) {
      const shuffled = [...plants].sort(() => 0.5 - Math.random());
      setRecommendedProducts(shuffled.slice(0, 3));
    }
  }, []);

  const nextRec = () => {
    setCurrentRecIndex((prev) => (prev + 1) % recommendedProducts.length);
  };

  const prevRec = () => {
    setCurrentRecIndex((prev) => (prev - 1 + recommendedProducts.length) % recommendedProducts.length);
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
  }, []);

  // --- MIGRACIÓN A GSAP (ANIMACIÓN PREMIUM BOTÁNICA V4) ---
  useEffect(() => {
    // 1. Inercia física y Lerp para animación de viento continua a 60fps
    let targetWind = 0;
    let currentWind = 0;
    let lastScrollY = window.scrollY || window.pageYOffset;
    let lastTime = performance.now();

    // Clasificación de hojas por profundidad para el efecto de paralaje 3D
    const leftForeground = [".leaf-l1", ".leaf-l9"];
    const leftMidground = [".leaf-l2", ".leaf-l5", ".leaf-l6", ".leaf-l8", ".leaf-l10"];
    const leftBackground = [".leaf-l3", ".leaf-l4", ".leaf-l7"];

    const rightForeground = [".leaf-r6", ".leaf-r8"];
    const rightMidground = [".leaf-r1", ".leaf-r4", ".leaf-r7", ".leaf-r9"];
    const rightBackground = [".leaf-r2", ".leaf-r3", ".leaf-r5", ".leaf-r10"];

    // Actualización de física y paralaje a 60fps
    const updateWindPhysics = () => {
      const currentScrollY = window.scrollY || window.pageYOffset;
      
      // Detener actualizaciones pesadas si el usuario ya bajó del todo del Hero
      if (currentScrollY > 1100) return;

      // Lerp amortiguado de la velocidad real del viento persiguiendo al objetivo
      // 0.05 da una transición extremadamente suave y planeadora (inercia majestuosa)
      currentWind += (targetWind - currentWind) * 0.05;

      // Desaceleración y fricción continua del viento objetivo (decae con suavidad premium de ~1.2s)
      targetWind *= 0.95;
      if (targetWind < 0.001) targetWind = 0;

      // Si el viento se calma por completo, volvemos exactamente a cero y cortamos
      if (Math.abs(currentWind) < 0.001) {
        currentWind = 0;
      }

      // Parallax offsets: al scrollear hacia abajo (scrollY aumenta), las hojas se mueven hacia arriba (y negativo)
      // Primer plano se mueve rápido, plano medio velocidad media, fondo de manera lenta
      const yFore = -0.45 * currentScrollY;
      const yMid = -0.26 * currentScrollY;
      const yBack = -0.12 * currentScrollY;

      // Aplicar transformaciones combinadas de viento + paralaje al wrapper intermedio de viento
      // Hojas del borde izquierdo
      gsap.set(leftForeground.map(sel => `${sel} .botanical-leaf-wind-wrapper`), {
        x: -30 * currentWind,
        y: -8 * currentWind + yFore,
        skewX: -8 * currentWind,
        rotation: -14 * currentWind,
      });
      gsap.set(leftMidground.map(sel => `${sel} .botanical-leaf-wind-wrapper`), {
        x: -30 * currentWind,
        y: -8 * currentWind + yMid,
        skewX: -8 * currentWind,
        rotation: -14 * currentWind,
      });
      gsap.set(leftBackground.map(sel => `${sel} .botanical-leaf-wind-wrapper`), {
        x: -30 * currentWind,
        y: -8 * currentWind + yBack,
        skewX: -8 * currentWind,
        rotation: -14 * currentWind,
      });

      // Hojas del borde derecho
      gsap.set(rightForeground.map(sel => `${sel} .botanical-leaf-wind-wrapper`), {
        x: 30 * currentWind,
        y: -8 * currentWind + yFore,
        skewX: 8 * currentWind,
        rotation: 14 * currentWind,
      });
      gsap.set(rightMidground.map(sel => `${sel} .botanical-leaf-wind-wrapper`), {
        x: 30 * currentWind,
        y: -8 * currentWind + yMid,
        skewX: 8 * currentWind,
        rotation: 14 * currentWind,
      });
      gsap.set(rightBackground.map(sel => `${sel} .botanical-leaf-wind-wrapper`), {
        x: 30 * currentWind,
        y: -8 * currentWind + yBack,
        skewX: 8 * currentWind,
        rotation: 14 * currentWind,
      });
    };

    const handleScrollWind = () => {
      const currentScrollY = window.scrollY || window.pageYOffset;
      const currentTime = performance.now();
      const timeDiff = currentTime - lastTime;

      // Detener cálculos si el usuario scrolla muy abajo del Hero (ahorro de CPU)
      if (currentScrollY > 1100) {
        lastScrollY = currentScrollY;
        lastTime = currentTime;
        return;
      }

      // Si ha pasado más de 120ms (pasa al pausar el scroll), reiniciamos baseline
      // para evitar saltos de delta gigantescos tras una pausa
      if (timeDiff > 120) {
        lastScrollY = currentScrollY;
        lastTime = currentTime;
        return;
      }

      if (timeDiff > 0) {
        const scrollDelta = Math.abs(currentScrollY - lastScrollY);
        const speed = scrollDelta / timeDiff; // velocidad real en px/ms
        
        // Sumamos a la ráfaga de viento objetivo (físicamente acumulable al scrollear de corrido)
        targetWind += speed * 1.8;
        
        // Tope máximo para evitar deformaciones físicas absurdas en scrolls muy rápidos
        if (targetWind > 2.5) targetWind = 2.5;
      }

      lastScrollY = currentScrollY;
      lastTime = currentTime;
    };

    // Usar IntersectionObserver para activar el ticker y scroll listener solo cuando el Hero es visible
    let isSubscribed = false;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!isSubscribed) {
            window.addEventListener("scroll", handleScrollWind, { passive: true });
            gsap.ticker.add(updateWindPhysics);
            isSubscribed = true;
          }
        } else {
          if (isSubscribed) {
            window.removeEventListener("scroll", handleScrollWind);
            gsap.ticker.remove(updateWindPhysics);
            isSubscribed = false;
          }
        }
      });
    }, { threshold: 0 });

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    // GSAP Context para los loops de balanceo y entradas
    const ctx = gsap.context(() => {
      // 1. Animaciones base flotantes e independientes (Swaying Loops) para cada una de las 20 hojas
      const leavesConfig = [
        { sel: ".leaf-l1", y: 12, x: -8, rot: 10, durY: 9.2, durX: 11.4, durR: 8.3 },
        { sel: ".leaf-l2", y: 14, x: -6, rot: -8, durY: 10.5, durX: 12.1, durR: 9.0 },
        { sel: ".leaf-l3", y: 10, x: -9, rot: 12, durY: 13.0, durX: 14.2, durR: 11.5 },
        { sel: ".leaf-l4", y: 15, x: 7, rot: -10, durY: 11.8, durX: 13.5, durR: 10.2 },
        { sel: ".leaf-l5", y: 11, x: -5, rot: 8, durY: 12.4, durX: 15.0, durR: 9.8 },
        { sel: ".leaf-l6", y: 13, x: 8, rot: -12, durY: 10.9, durX: 12.8, durR: 11.1 },
        { sel: ".leaf-l7", y: 9, x: -6, rot: 7, durY: 14.1, durX: 11.9, durR: 12.5 },
        { sel: ".leaf-l8", y: 16, x: 10, rot: -14, durY: 9.8, durX: 13.2, durR: 8.7 },
        { sel: ".leaf-l9", y: 18, x: -11, rot: 15, durY: 8.5, durX: 10.6, durR: 7.9 },
        { sel: ".leaf-l10", y: 12, x: 6, rot: -9, durY: 11.2, durX: 14.0, durR: 10.6 },
        
        { sel: ".leaf-r1", y: 15, x: 6, rot: -12, durY: 10.1, durX: 12.8, durR: 9.4 },
        { sel: ".leaf-r2", y: 11, x: -5, rot: 7, durY: 13.5, durX: 11.2, durR: 10.5 },
        { sel: ".leaf-r3", y: 9, x: 5, rot: -6, durY: 14.3, durX: 12.1, durR: 10.5 },
        { sel: ".leaf-r4", y: 13, x: -7, rot: 11, durY: 11.5, durX: 14.5, durR: 9.9 },
        { sel: ".leaf-r5", y: 10, x: 6, rot: -8, durY: 12.8, durX: 13.9, durR: 11.3 },
        { sel: ".leaf-r6", y: 14, x: -8, rot: 10, durY: 10.3, durX: 12.4, durR: 9.1 },
        { sel: ".leaf-r7", y: 12, x: 7, rot: -9, durY: 12.0, durX: 13.6, durR: 10.8 },
        { sel: ".leaf-r8", y: 16, x: -10, rot: 13, durY: 9.5, durX: 11.8, durR: 7.6 },
        { sel: ".leaf-r9", y: 13, x: 8, rot: -10, durY: 11.1, durX: 13.0, durR: 9.6 },
        { sel: ".leaf-r10", y: 10, x: -5, rot: 6, durY: 13.8, durX: 15.2, durR: 11.9 }
      ];

      leavesConfig.forEach(cfg => {
        gsap.to(`${cfg.sel} .botanical-leaf-sway-wrapper`, {
          y: `+=${cfg.y}`,
          duration: cfg.durY,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
        gsap.to(`${cfg.sel} .botanical-leaf-sway-wrapper`, {
          x: cfg.x > 0 ? `+=${cfg.x}` : `-=${Math.abs(cfg.x)}`,
          duration: cfg.durX,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
        gsap.to(`${cfg.sel} .botanical-leaf-sway-wrapper`, {
          rotation: cfg.rot > 0 ? `+=${cfg.rot}` : `-=${Math.abs(cfg.rot)}`,
          duration: cfg.durR,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      });

      // Flotación lenta y flotante de la hoja caída en el separador
      gsap.to(".separator-fallen-leaf", {
        y: "+=5",
        duration: 5.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
      gsap.to(".separator-fallen-leaf", {
        rotation: "+=6",
        duration: 6.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Rebote vertical orgánico del scroll indicator
      gsap.to(".scroll-leaf-bounce", {
        y: 10,
        duration: 1.3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // 2. Secuencia de Entrada Teatral de Elementos en el Hero (Entrance Timeline)
      const tl = gsap.timeline();
      
      tl.from(".hero-eyebrow", {
        opacity: 0,
        y: -18,
        duration: 0.8,
        ease: "power2.out"
      });

      tl.from(".hero-brand-logo", {
        opacity: 0,
        y: 30,
        scale: 0.95,
        duration: 1.1,
        ease: "power4.out"
      }, "-=0.6");

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

      // Suave float-in para todas las hojas desde los bordes de la pantalla (10 izquierdas, 10 derechas)
      tl.from(".leaf-l1, .leaf-l2, .leaf-l3, .leaf-l4, .leaf-l5, .leaf-l6, .leaf-l7, .leaf-l8, .leaf-l9, .leaf-l10", {
        x: -70,
        opacity: 0,
        scale: 0.8,
        duration: 1.8,
        ease: "power3.out",
        stagger: 0.06
      }, "-=1.3");

      tl.from(".leaf-r1, .leaf-r2, .leaf-r3, .leaf-r4, .leaf-r5, .leaf-r6, .leaf-r7, .leaf-r8, .leaf-r9, .leaf-r10", {
        x: 70,
        opacity: 0,
        scale: 0.8,
        duration: 1.8,
        ease: "power3.out",
        stagger: 0.06
      }, "-=1.8");

      tl.from(".hero-scroll-indicator", {
        opacity: 0,
        y: 15,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.6");

      // 3. Efecto Breeze Hover interactivo (Ráfaga de viento al pasar el cursor)
      const btns = heroRef.current?.querySelectorAll('.hero-actions .btn');
      if (btns) {
        const onEnter = () => {
          gsap.to([
            ".leaf-l1 .botanical-leaf-inner", ".leaf-l2 .botanical-leaf-inner", 
            ".leaf-l3 .botanical-leaf-inner", ".leaf-l4 .botanical-leaf-inner", 
            ".leaf-l5 .botanical-leaf-inner", ".leaf-l6 .botanical-leaf-inner", 
            ".leaf-l7 .botanical-leaf-inner", ".leaf-l8 .botanical-leaf-inner", 
            ".leaf-l9 .botanical-leaf-inner", ".leaf-l10 .botanical-leaf-inner"
          ], {
            x: -25,
            y: -6,
            rotation: -10,
            scale: 1.03,
            duration: 0.8,
            ease: "power2.out",
            overwrite: "auto"
          });
          gsap.to([
            ".leaf-r1 .botanical-leaf-inner", ".leaf-r2 .botanical-leaf-inner", 
            ".leaf-r3 .botanical-leaf-inner", ".leaf-r4 .botanical-leaf-inner", 
            ".leaf-r5 .botanical-leaf-inner", ".leaf-r6 .botanical-leaf-inner", 
            ".leaf-r7 .botanical-leaf-inner", ".leaf-r8 .botanical-leaf-inner", 
            ".leaf-r9 .botanical-leaf-inner", ".leaf-r10 .botanical-leaf-inner"
          ], {
            x: 25,
            y: -6,
            rotation: 10,
            scale: 1.03,
            duration: 0.8,
            ease: "power2.out",
            overwrite: "auto"
          });
        };

        const onLeave = () => {
          gsap.to(".botanical-leaf-inner", {
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            duration: 1.4,
            ease: "power2.out",
            overwrite: "auto"
          });
        };

        btns.forEach(btn => {
          btn.addEventListener('mouseenter', onEnter);
          btn.addEventListener('mouseleave', onLeave);
        });
      }

    }, heroRef);

    return () => {
      ctx.revert(); // Recolección de basura impecable al desmontar
      observer.disconnect();
      if (isSubscribed) {
        window.removeEventListener("scroll", handleScrollWind);
        gsap.ticker.remove(updateWindPhysics);
      }
    };
  }, []);

  const testimonials = [
    { name: 'Mariana R.', loc: 'Las Piedras', text: 'Me recomendaron una planta para poca luz y quedó perfecta. Muy buena atención.' },
    { name: 'Andrés P.', loc: 'Canelones', text: 'Fui por un regalo y me armaron una opción linda y rápida. Recomiendo.' },
  ];
  useEffect(() => {
    const cards = valueGridRef.current?.querySelectorAll('.value-item');
    if (!cards || cards.length === 0) return undefined;

    let rafId = null;

    const animateOnScroll = () => {
      const viewportHeight = window.innerHeight;

      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const center = rect.top + rect.height * 0.5;
        const distance = (center - viewportHeight * 0.55) / viewportHeight;
        const shift = Math.max(-16, Math.min(16, distance * (14 + index * 2)));
        const rotate = Math.max(-1.2, Math.min(1.2, distance * (1.4 + index * 0.15)));
        card.style.setProperty('--scroll-shift', `${shift}px`);
        card.style.setProperty('--scroll-rotate', `${rotate}deg`);
      });
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        animateOnScroll();
        rafId = null;
      });
    };

    animateOnScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5500);

    return () => window.clearInterval(timer);
  }, [testimonials.length]);

  const goToPrevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

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
            'https://alkirian.github.io/De-ra-z-floricultura/images/logo-hero-white.png',
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
        {/* Canvas de Botánica Flotante (3D Parallax & Swaying) */}
        <div className="hero-botanical-canvas" aria-hidden="true">
          {/* Borde Izquierdo (10 Hojas) */}
          {/* Borde Izquierdo (10 Hojas) */}
          <div className="botanical-leaf leaf-l1 leaf-depth-foreground">
            <div className="botanical-leaf-wind-wrapper">
              <div className="botanical-leaf-sway-wrapper">
                <img src={`${BASE}images/SVG Hero/SVG/Recurso 4.svg`} className="botanical-leaf-inner" alt="" />
              </div>
            </div>
          </div>
          <div className="botanical-leaf leaf-l2 leaf-depth-midground">
            <div className="botanical-leaf-wind-wrapper">
              <div className="botanical-leaf-sway-wrapper">
                <img src={`${BASE}images/SVG Hero/SVG/Recurso 14.svg`} className="botanical-leaf-inner" alt="" />
              </div>
            </div>
          </div>
          <div className="botanical-leaf leaf-l3 leaf-depth-background">
            <div className="botanical-leaf-wind-wrapper">
              <div className="botanical-leaf-sway-wrapper">
                <img src={`${BASE}images/SVG Hero/SVG/Recurso 15.svg`} className="botanical-leaf-inner" alt="" />
              </div>
            </div>
          </div>
          <div className="botanical-leaf leaf-l4 leaf-depth-background">
            <div className="botanical-leaf-wind-wrapper">
              <div className="botanical-leaf-sway-wrapper">
                <img src={`${BASE}images/SVG Hero/SVG/Recurso 7.svg`} className="botanical-leaf-inner" alt="" />
              </div>
            </div>
          </div>
          <div className="botanical-leaf leaf-l5 leaf-depth-midground">
            <div className="botanical-leaf-wind-wrapper">
              <div className="botanical-leaf-sway-wrapper">
                <img src={`${BASE}images/SVG Hero/SVG/Recurso 9.svg`} className="botanical-leaf-inner" alt="" />
              </div>
            </div>
          </div>
          <div className="botanical-leaf leaf-l6 leaf-depth-midground">
            <div className="botanical-leaf-wind-wrapper">
              <div className="botanical-leaf-sway-wrapper">
                <img src={`${BASE}images/SVG Hero/SVG/Recurso 16.svg`} className="botanical-leaf-inner" alt="" />
              </div>
            </div>
          </div>
          <div className="botanical-leaf leaf-l7 leaf-depth-background">
            <div className="botanical-leaf-wind-wrapper">
              <div className="botanical-leaf-sway-wrapper">
                <img src={`${BASE}images/SVG Hero/SVG/Recurso 22.svg`} className="botanical-leaf-inner" alt="" />
              </div>
            </div>
          </div>
          <div className="botanical-leaf leaf-l8 leaf-depth-midground">
            <div className="botanical-leaf-wind-wrapper">
              <div className="botanical-leaf-sway-wrapper">
                <img src={`${BASE}images/SVG Hero/SVG/Recurso 10.svg`} className="botanical-leaf-inner" alt="" />
              </div>
            </div>
          </div>
          <div className="botanical-leaf leaf-l9 leaf-depth-foreground">
            <div className="botanical-leaf-wind-wrapper">
              <div className="botanical-leaf-sway-wrapper">
                <img src={`${BASE}images/SVG Hero/SVG/Recurso 18.svg`} className="botanical-leaf-inner" alt="" />
              </div>
            </div>
          </div>
          <div className="botanical-leaf leaf-l10 leaf-depth-midground">
            <div className="botanical-leaf-wind-wrapper">
              <div className="botanical-leaf-sway-wrapper">
                <img src={`${BASE}images/SVG Hero/SVG/Recurso 24.svg`} className="botanical-leaf-inner" alt="" />
              </div>
            </div>
          </div>

          {/* Borde Derecho (10 Hojas) */}
          <div className="botanical-leaf leaf-r1 leaf-depth-midground">
            <div className="botanical-leaf-wind-wrapper">
              <div className="botanical-leaf-sway-wrapper">
                <img src={`${BASE}images/SVG Hero/SVG/Recurso 5.svg`} className="botanical-leaf-inner" alt="" />
              </div>
            </div>
          </div>
          <div className="botanical-leaf leaf-r2 leaf-depth-background">
            <div className="botanical-leaf-wind-wrapper">
              <div className="botanical-leaf-sway-wrapper">
                <img src={`${BASE}images/SVG Hero/SVG/Recurso 17.svg`} className="botanical-leaf-inner" alt="" />
              </div>
            </div>
          </div>
          <div className="botanical-leaf leaf-r3 leaf-depth-background">
            <div className="botanical-leaf-wind-wrapper">
              <div className="botanical-leaf-sway-wrapper">
                <img src={`${BASE}images/SVG Hero/SVG/Recurso 6.svg`} className="botanical-leaf-inner" alt="" />
              </div>
            </div>
          </div>
          <div className="botanical-leaf leaf-r4 leaf-depth-midground">
            <div className="botanical-leaf-wind-wrapper">
              <div className="botanical-leaf-sway-wrapper">
                <img src={`${BASE}images/SVG Hero/SVG/Recurso 8.svg`} className="botanical-leaf-inner" alt="" />
              </div>
            </div>
          </div>
          <div className="botanical-leaf leaf-r5 leaf-depth-background">
            <div className="botanical-leaf-wind-wrapper">
              <div className="botanical-leaf-sway-wrapper">
                <img src={`${BASE}images/SVG Hero/SVG/Recurso 19.svg`} className="botanical-leaf-inner" alt="" />
              </div>
            </div>
          </div>
          <div className="botanical-leaf leaf-r6 leaf-depth-foreground">
            <div className="botanical-leaf-wind-wrapper">
              <div className="botanical-leaf-sway-wrapper">
                <img src={`${BASE}images/SVG Hero/SVG/Recurso 20.svg`} className="botanical-leaf-inner" alt="" />
              </div>
            </div>
          </div>
          <div className="botanical-leaf leaf-r7 leaf-depth-midground">
            <div className="botanical-leaf-wind-wrapper">
              <div className="botanical-leaf-sway-wrapper">
                <img src={`${BASE}images/SVG Hero/SVG/Recurso 23.svg`} className="botanical-leaf-inner" alt="" />
              </div>
            </div>
          </div>
          <div className="botanical-leaf leaf-r8 leaf-depth-foreground">
            <div className="botanical-leaf-wind-wrapper">
              <div className="botanical-leaf-sway-wrapper">
                <img src={`${BASE}images/SVG Hero/SVG/Recurso 11.svg`} className="botanical-leaf-inner" alt="" />
              </div>
            </div>
          </div>
          <div className="botanical-leaf leaf-r9 leaf-depth-midground">
            <div className="botanical-leaf-wind-wrapper">
              <div className="botanical-leaf-sway-wrapper">
                <img src={`${BASE}images/SVG Hero/SVG/Recurso 21.svg`} className="botanical-leaf-inner" alt="" />
              </div>
            </div>
          </div>
          <div className="botanical-leaf leaf-r10 leaf-depth-background">
            <div className="botanical-leaf-wind-wrapper">
              <div className="botanical-leaf-sway-wrapper">
                <img src={`${BASE}images/SVG Hero/SVG/Recurso 25.svg`} className="botanical-leaf-inner" alt="" />
              </div>
            </div>
          </div>
        </div>

        {/* Contenido principal centrado */}
        <div className="hero-content-centered">
          <h1 className="sr-only">De Raiz Floricultura - Vivero en Las Piedras, Uruguay</h1>
          <span className="hero-eyebrow">
            <MapPin size={14} /> Las Piedras, Uruguay
          </span>
          <img
            src={`${BASE}images/logo-hero-white.png`}
            alt="De Raíz Floricultura"
            className="hero-brand-logo"
            loading="eager"
          />
          <p className="hero-subtitle">
            Plantas, flores y asesoramiento en Las Piedras.<br/>
            Te ayudamos a encontrar la planta perfecta para tu espacio.
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
              fill="var(--crema)"
            />
          </svg>
          <img src={`${BASE}images/SVG Hero/SVG/Recurso 12.svg`} className="separator-fallen-leaf" alt="" />
        </div>

        {/* Indicador de scroll botánico */}
        <div className="hero-scroll-indicator">
          <img src={`${BASE}images/SVG Hero/SVG/Recurso 13.svg`} className="scroll-leaf-bounce" alt="" />
          <span className="scroll-text">Desliza para explorar</span>
        </div>
      </section>


      {/* ══════════════════════════
          ATAJOS RÁPIDOS
      ══════════════════════════ */}
      <div className="proposal-block" style={{background: 'var(--crema)'}}>
        <span className="proposal-corner proposal-corner--top-left" aria-hidden="true"></span>
        <span className="proposal-corner proposal-corner--top-right" aria-hidden="true"></span>
        <span className="proposal-corner proposal-corner--bottom-left" aria-hidden="true"></span>
        <span className="proposal-corner proposal-corner--bottom-right" aria-hidden="true"></span>
        <section className="quick-actions-section section-padding--sm">
          <div className="container">
            <div className="text-center mb-12 quick-actions-header reveal-on-scroll reveal-up">
              <span className="section-label">Comenzá por acá</span>
              <h2>Explorá el universo De Raíz</h2>
              <p className="quick-actions-subtitle">
                Te guiamos en cada paso para que lleves la naturaleza a tu vida, con la calidad y calidez de siempre.
              </p>
            </div>
            <div className="quick-actions-grid" ref={quickActionsRef}>
              <Link to="/catalogo" className="quick-action-card quick-action-card--catalog reveal-on-scroll reveal-up">
                <div className="quick-action-icon-wrapper">
                  <Leaf size={26} />
                </div>
                <span className="quick-action-kicker">Catálogo Completo</span>
                <h3>Plantas & Macetas</h3>
                <p>Llevá frescura a tu hogar. Gran variedad de interior, exterior, combos exclusivos e insumos premium.</p>
                <span className="quick-action-link">Explorar catálogo <ArrowRight size={16} /></span>
              </Link>

              <Link to="/aprende-de-raiz" className="quick-action-card quick-action-card--learn reveal-on-scroll reveal-up" style={{ '--reveal-delay': '0.15s' }}>
                <div className="quick-action-icon-wrapper">
                  <BookOpen size={26} />
                </div>
                <span className="quick-action-kicker">Guías de Cultivo</span>
                <h3>Aprendé de Raíz</h3>
                <p>Convertite en experto. Consejos paso a paso sobre riego, sustratos y plagas adaptadas a Uruguay.</p>
                <span className="quick-action-link">Ir a la guía botánica <ArrowRight size={16} /></span>
              </Link>

              <Link to="/contacto" className="quick-action-card quick-action-card--contact reveal-on-scroll reveal-up" style={{ '--reveal-delay': '0.3s' }}>
                <div className="quick-action-icon-wrapper">
                  <MapPin size={26} />
                </div>
                <span className="quick-action-kicker">Atención Cercana</span>
                <h3>Visitanos o Escribinos</h3>
                <p>Encontranos en Las Piedras, Ruta 48. O chateá con nuestro equipo para recibir asesoramiento personalizado.</p>
                <span className="quick-action-link">Ver contacto y local <ArrowRight size={16} /></span>
              </Link>
            </div>

            {/* Controles de navegación responsivos para carrusel en mobile */}
            <div className="carousel-nav-controls">
              <button 
                type="button" 
                className="carousel-nav-btn" 
                onClick={() => scrollCarousel(quickActionsRef, 'left')}
                aria-label="Deslizar carrusel de atajos a la izquierda"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                type="button" 
                className="carousel-nav-btn" 
                onClick={() => scrollCarousel(quickActionsRef, 'right')}
                aria-label="Deslizar carrusel de atajos a la derecha"
              >
                <ChevronRight size={20} />
              </button>
            </div>

          </div>
        </section>
        {/* ══════════════════════════
            PROPUESTA DE VALOR
        ══════════════════════════ */}
        <section className="value-section section-padding--sm">
          <div className="container container--narrow text-center reveal-on-scroll reveal-up">
            <span className="section-label">Nuestra propuesta</span>
            <h2>No solo vendemos plantas.</h2>
            <p className="value-text">
              Plantas, flores, macetas e insumos con atencion local en Las Piedras.
            </p>
            <div className="value-grid" ref={valueGridRef}>
              <div className="value-item reveal-on-scroll reveal-scale">
                <div className="value-icon-wrap">
                  <div className="value-icon">🌿</div>
                </div>
                <h4>Asesoramiento personalizado</h4>
                <p>Te orientamos según tu espacio, luz y experiencia.</p>
              </div>
              <div className="value-item reveal-on-scroll reveal-scale" style={{ '--reveal-delay': '0.15s' }}>
                <div className="value-icon-wrap">
                  <div className="value-icon">🪴</div>
                </div>
                <h4>Plantas, flores y macetas</h4>
                <p>Gran variedad de interior, exterior, flores y más.</p>
              </div>
              <div className="value-item reveal-on-scroll reveal-scale" style={{ '--reveal-delay': '0.3s' }}>
                <div className="value-icon-wrap">
                  <div className="value-icon">📍</div>
                </div>
                <h4>Atención local</h4>
                <p>Estamos en Las Piedras, Canelones. Visitanos.</p>
              </div>
            </div>

            {/* Controles de navegación responsivos para carrusel en mobile */}
            <div className="carousel-nav-controls">
              <button 
                type="button" 
                className="carousel-nav-btn" 
                onClick={() => scrollCarousel(valueGridRef, 'left')}
                aria-label="Deslizar carrusel de propuesta a la izquierda"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                type="button" 
                className="carousel-nav-btn" 
                onClick={() => scrollCarousel(valueGridRef, 'right')}
                aria-label="Deslizar carrusel de propuesta a la derecha"
              >
                <ChevronRight size={20} />
              </button>
            </div>

          </div>
        </section>
      </div>

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

          <div className="combos-grid" ref={combosGridRef}>
            {COMBO_INSPIRATIONS.map((combo, index) => (
              <article
                key={combo.id}
                className="combo-card reveal-on-scroll reveal-up"
                style={{ '--reveal-delay': `${(index % 3) * 0.15}s` }}
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
                <div className="combo-card-image-wrap">
                  <img
                    src={combo.image}
                    alt={combo.alt}
                    className="combo-card-image"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="combo-card-content">
                  <h3>{combo.title}</h3>
                  <p className="combo-card-description">{combo.description}</p>
                  <p className="combo-card-includes">
                    <strong>Incluye:</strong> {combo.includes}
                  </p>
                  <a
                    href={createWhatsAppLink(combo.whatsappMessage)}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-secondary combo-card-btn"
                    aria-label={`${combo.title}: Quiero uno parecido por WhatsApp`}
                    onClick={(event) => event.stopPropagation()}
                  >
                    Quiero uno parecido
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* Controles de navegación responsivos para carrusel en mobile */}
          <div className="carousel-nav-controls">
            <button 
              type="button" 
              className="carousel-nav-btn" 
              onClick={() => scrollCarousel(combosGridRef, 'left')}
              aria-label="Deslizar carrusel de combos a la izquierda"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              type="button" 
              className="carousel-nav-btn" 
              onClick={() => scrollCarousel(combosGridRef, 'right')}
              aria-label="Deslizar carrusel de combos a la derecha"
            >
              <ChevronRight size={20} />
            </button>
          </div>


          <article className="combo-custom-cta reveal-on-scroll reveal-scale">
            <h3>Queres armar tu propio combo?</h3>
            <p>
              Elegi una planta, una maceta y el estilo que mas te guste. Nosotros te ayudamos a
              combinarlo.
            </p>
            <a
              href={createWhatsAppLink(COMBO_CUSTOM_MESSAGE)}
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
      <WaveTop fill="var(--verde-profundo)" bg="var(--crema)" />
      <section className="advice-section section-padding--sm">
        <div className="container">
          <div className="text-center mb-8 reveal-on-scroll reveal-up">
            <span className="section-label">Asesoramiento Interactivo 🌿</span>
            <h2>¿No sabés qué planta elegir?</h2>
            <p className="quiz-section-intro" style={{ maxWidth: '600px', margin: '12px auto 0', color: 'var(--texto-medio)', fontSize: '1.05rem', lineHeight: '1.6' }}>
              Completá nuestro test botánico interactivo en 15 segundos. Nuestro sistema irá descartando plantas de nuestro cultivo en tiempo real para encontrar tus 2 compañeras ideales.
            </p>
          </div>

          <div className="advice-quiz-container animate-fade-in">
            {/* Header del Quiz */}
            <div className="quiz-header">
              {quizStep > 1 && quizStep <= 4 && (
                <button
                  type="button"
                  className="quiz-back-btn"
                  onClick={() => setQuizStep(prev => prev - 1)}
                  aria-label="Volver al paso anterior"
                >
                  <ArrowRight size={16} style={{ transform: 'rotate(180deg)', marginRight: '8px' }} /> Volver
                </button>
              )}
              <div className="quiz-progress-wrapper">
                <div className="quiz-progress-bar" style={{ width: `${(quizStep / 4) * 100}%` }}></div>
              </div>
              {quizStep <= 4 && (
                <span className="quiz-step-indicator">
                  Paso {quizStep} de 4 • {getRemainingCount(quizStep, quizAnswers)} {getRemainingCount(quizStep, quizAnswers) === 1 ? 'planta compatible' : 'plantas compatibles'}
                </span>
              )}
            </div>

              {quizStep === 1 && (
                <div className="quiz-step-content animate-fade-in">
                  <h3>¿Dónde vas a ubicar tu planta? 🏠</h3>
                  <p className="quiz-step-subtitle">Definir el ambiente correcto es clave para que tu planta crezca sana.</p>
                  <div className="quiz-cards-grid">
                    <button
                      type="button"
                      className="quiz-card-option"
                      onClick={() => handleSelectOption('placement', 'interior')}
                    >
                      <div className="quiz-card-icon">🏠</div>
                      <h4>Interior</h4>
                      <p>Living, dormitorio, cocina u oficina.</p>
                    </button>
                    <button
                      type="button"
                      className="quiz-card-option"
                      onClick={() => handleSelectOption('placement', 'exterior')}
                    >
                      <div className="quiz-card-icon">☀️</div>
                      <h4>Exterior</h4>
                      <p>Jardín, patio o balcón abierto.</p>
                    </button>
                    <button
                      type="button"
                      className="quiz-card-option"
                      onClick={() => handleSelectOption('placement', 'huerta')}
                    >
                      <div className="quiz-card-icon">🥬</div>
                      <h4>Huerta o Cocina</h4>
                      <p>Aromáticas y frutales para cultivar.</p>
                    </button>
                  </div>
                </div>
              )}

              {quizStep === 2 && (
                <div className="quiz-step-content animate-fade-in">
                  <h3>¿Cómo es la luz natural en ese lugar? ⛅</h3>
                  <p className="quiz-step-subtitle">La iluminación es vital. Elegí la opción más cercana a tu espacio real.</p>
                  <div className="quiz-cards-grid">
                    <button
                      type="button"
                      className="quiz-card-option"
                      onClick={() => handleSelectOption('light', 'poca')}
                    >
                      <div className="quiz-card-icon">🕶️</div>
                      <h4>Poca luz / Sombra</h4>
                      <p>Espacios con sombra o luz tenue.</p>
                    </button>
                    <button
                      type="button"
                      className="quiz-card-option"
                      onClick={() => handleSelectOption('light', 'indirecta')}
                    >
                      <div className="quiz-card-icon">⛅</div>
                      <h4>Luz indirecta brillante</h4>
                      <p>Mucha luz natural, sin sol directo.</p>
                    </button>
                    <button
                      type="button"
                      className="quiz-card-option"
                      onClick={() => handleSelectOption('light', 'directa')}
                    >
                      <div className="quiz-card-icon">☀️</div>
                      <h4>Sol directo</h4>
                      <p>Rayos de sol de lleno varias horas.</p>
                    </button>
                  </div>
                </div>
              )}

              {quizStep === 3 && (
                <div className="quiz-step-content animate-fade-in">
                  <h3>¿Cómo te definirías cuidando plantas? 💧</h3>
                  <p className="quiz-step-subtitle">Elegí la planta que se adapte mejor a tus tiempos y a tu rutina diaria.</p>
                  <div className="quiz-cards-grid">
                    <button
                      type="button"
                      className="quiz-card-option"
                      onClick={() => handleSelectOption('care', 'principiante')}
                    >
                      <div className="quiz-card-icon">🟢</div>
                      <h4>Principiante / Poco tiempo</h4>
                      <p>Plantas súper guerreras de bajo cuidado.</p>
                    </button>
                    <button
                      type="button"
                      className="quiz-card-option"
                      onClick={() => handleSelectOption('care', 'entusiasta')}
                    >
                      <div className="quiz-card-icon">💧</div>
                      <h4>Entusiasta / Con tiempo</h4>
                      <p>Me gusta mimarlas y regar seguido.</p>
                    </button>
                    <button
                      type="button"
                      className="quiz-card-option"
                      onClick={() => handleSelectOption('care', 'flores')}
                    >
                      <div className="quiz-card-icon">🌸</div>
                      <h4>Quiero flores y color</h4>
                      <p>Variedades que aporten tonos alegres.</p>
                    </button>
                  </div>
                </div>
              )}

              {quizStep === 4 && (
                <div className="quiz-step-content animate-fade-in">
                  <h3>¿Tenés mascotas curiosas en casa? 🐾</h3>
                  <p className="quiz-step-subtitle">Algunas plantas son tóxicas. Protegemos a tus mejores amigos.</p>
                  <div className="quiz-cards-grid quiz-cards-grid--two">
                    <button
                      type="button"
                      className="quiz-card-option"
                      onClick={() => handleSelectOption('pets', 'si')}
                    >
                      <div className="quiz-card-icon">🐱🐶</div>
                      <h4>Sí, necesito Pet-Friendly</h4>
                      <p>Variedades 100% seguras para perros y gatos.</p>
                    </button>
                    <button
                      type="button"
                      className="quiz-card-option"
                      onClick={() => handleSelectOption('pets', 'no')}
                    >
                      <div className="quiz-card-icon">🏡</div>
                      <h4>No tengo / No me preocupa</h4>
                      <p>Cualquier variedad me sirve perfectamente.</p>
                    </button>
                  </div>
                </div>
              )}

              {quizStep === 5 && (
                <div className="quiz-step-content quiz-results-content animate-fade-in">
                  <div className="quiz-results-header">
                    <span className="section-label">¡Tu resultado botánico! 🏆</span>
                    <h3>Encontramos tus 2 plantas ideales</h3>
                    <p className="quiz-results-subtitle">
                      En base a tus respuestas: <span className="quiz-summary-pill">{quizAnswers.placement === 'interior' ? 'Interior' : quizAnswers.placement === 'exterior' ? 'Exterior' : 'Huerta'}</span> 
                      <span className="quiz-summary-pill">{quizAnswers.light === 'poca' ? 'Poca luz' : quizAnswers.light === 'indirecta' ? 'Luz indirecta' : 'Sol directo'}</span> 
                      <span className="quiz-summary-pill">{quizAnswers.care === 'principiante' ? 'Principiante' : quizAnswers.care === 'entusiasta' ? 'Entusiasta' : 'Con flores'}</span> 
                      {quizAnswers.pets === 'si' && <span className="quiz-summary-pill quiz-summary-pill--pet">🐾 Pet-Friendly</span>}
                    </p>
                  </div>

                  <div className="quiz-results-grid">
                    {quizResults.map((product) => {
                      const explanation = getExplanation(product, quizAnswers);
                      return (
                        <div key={product.id} className="quiz-result-card">
                          <div className="quiz-result-card-image" onClick={() => setSelectedProduct(product)}>
                            <img src={product.image} alt={product.name} />
                            <span className="quiz-result-card-badge">{product.category}</span>
                          </div>
                          
                          <div className="quiz-result-card-body">
                            <h4 className="quiz-result-card-title">{product.name}</h4>
                            
                            {/* Atributos cortos */}
                            <div className="quiz-result-card-attrs">
                              {product.attributes.slice(0, 3).map((attr, aIdx) => (
                                <span key={aIdx} className="quiz-result-card-attr-item">
                                  {getAttributeIcon(attr.type)} {attr.value}
                                </span>
                              ))}
                            </div>

                            {/* Explicación personalizada */}
                            <p className="quiz-result-card-explanation">
                              {renderExplanationText(explanation)}
                            </p>

                            {/* Botones de acción */}
                            <div className="quiz-result-card-actions">
                              <button
                                type="button"
                                className="btn btn-primary btn-sm quiz-card-add-btn"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  addToCart(product);
                                }}
                              >
                                <ShoppingCart size={14} /> Agregar
                              </button>
                              <a
                                href={generateWaLink(WA_MESSAGES.producto(product.name))}
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn-outline btn-sm quiz-card-wa-btn"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <MessageCircle size={14} /> Stock
                              </a>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Acciones globales */}
                  <div className="quiz-results-footer-actions">
                    <a
                      href={generateWaLink(generateQuizWhatsAppMessage(quizResults, quizAnswers))}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-primary quiz-wa-cta"
                    >
                      <MessageCircle size={18} /> Consultar stock de ambas por WhatsApp
                    </a>
                    <button
                      type="button"
                      className="btn btn-outline quiz-restart-btn"
                      onClick={() => {
                        setQuizStep(1);
                        setQuizAnswers({
                          placement: '',
                          light: '',
                          care: '',
                          pets: ''
                        });
                        setQuizResults([]);
                      }}
                    >
                      <RotateCcw size={16} /> Volver a empezar
                    </button>
                  </div>
                </div>
              )}
            </div>
        </div>
      </section>
      <WaveBottom fill="var(--verde-profundo)" bg="var(--beige-claro)" className="wave-transition--advice-to-categories" />

      {/* ══════════════════════════
          CATEGORÍAS ILUSTRADAS
      ══════════════════════════ */}
      <section className="categories-section section-padding" style={{background: 'var(--beige-claro)', position: 'relative', overflow: 'hidden'}}>
        {/* Hojas decorativas sutiles desenfocadas en los bordes */}
        <img src={`${BASE}images/bg_leaves.png`} alt="" className="bg-leaf-blur bg-leaf-blur--left" aria-hidden="true" loading="lazy" decoding="async" />
        <img src={`${BASE}images/bg_leaves.png`} alt="" className="bg-leaf-blur bg-leaf-blur--right" aria-hidden="true" loading="lazy" decoding="async" />

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div className="text-center mb-12 reveal-on-scroll reveal-up">
            <span className="section-label">Qué encontrás en De Raíz</span>
            <h2>Explorá nuestras categorías</h2>
            <div className="title-underline"></div>
          </div>
          <div className="categories-accordion-desktop">
            <div className="accordion-container">
              {CATEGORIES.map((cat, i) => (
                <div
                  key={i}
                  className={`accordion-item reveal-on-scroll reveal-scale ${activeAccordion === i ? 'accordion-item--active' : ''}`}
                  onClick={() => setActiveAccordion(i)}
                  style={{
                    '--cat-color': cat.color,
                    backgroundImage: `url(${cat.bgImage})`,
                    '--reveal-delay': `${i * 0.15}s`
                  }}
                >
                  <div className="accordion-overlay"></div>
                  <div className="accordion-content-wrapper">
                    <div className="accordion-icon-wrap" style={{ color: cat.color }}>
                      <div className="accordion-icon">{cat.icon}</div>
                    </div>
                    <div className="accordion-content">
                      <div className="accordion-header">
                        <h4>{cat.title}</h4>
                        <p className="accordion-short-desc">{cat.shortDesc}</p>
                      </div>
                      <div className="accordion-details">
                        <div className="advice-box" style={{ borderColor: `${cat.color}60`, backgroundColor: `rgba(255, 255, 255, 0.65)` }}>
                          <span className="advice-title" style={{ color: cat.color }}><Sparkles size={14} /> {cat.adviceTitle}</span>
                          <p>{cat.advice}</p>
                        </div>
                        <Link to={cat.link} className="btn-accordion" style={{ backgroundColor: cat.color }}>
                          Ver {cat.title} <ArrowRight size={16} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="categories-carousel-mobile">
            <div className="carousel-track-mobile">
              {CATEGORIES.map((cat, i) => (
                <div
                  key={i}
                  className="carousel-slide-mobile"
                  style={{
                    '--cat-color': cat.color,
                    backgroundImage: `url(${cat.bgImage})`
                  }}
                >
                  <Link className="mobile-category-card-main" to={cat.link}>
                    <div className="mobile-category-overlay"></div>
                    <div className="mobile-category-content">
                      <div className="mobile-category-icon-wrap" style={{ color: cat.color }}>
                        {cat.icon}
                      </div>
                      <h3 className="mobile-category-title">{cat.title}</h3>
                      <p className="mobile-category-desc">{cat.shortDesc}</p>
                      <button
                        type="button"
                        className="btn-mobile-category-tip"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.25)', borderColor: `${cat.color}40` }}
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          setExpandedCategory(i);
                        }}
                      >
                        <Sparkles size={14} /> Tip Botánico
                      </button>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {CATEGORIES.map((cat, i) => (
              <div
                key={`drawer-${i}`}
                className={`mobile-category-advice-drawer ${expandedCategory === i ? 'mobile-category-advice-drawer--open' : ''}`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="mobile-category-advice-drawer-overlay" onClick={() => setExpandedCategory(null)}></div>
                <div className="mobile-category-advice-drawer-content" style={{ borderTop: `4px solid ${cat.color}` }}>
                  <button
                    type="button"
                    className="btn-close-advice-drawer"
                    onClick={() => setExpandedCategory(null)}
                    aria-label="Cerrar tip botánico"
                  >
                    <X size={20} />
                  </button>
                  <div className="advice-drawer-header">
                    <div className="advice-drawer-icon" style={{ backgroundColor: `${cat.color}20`, color: cat.color }}>
                      {cat.icon}
                    </div>
                    <div>
                      <span className="advice-drawer-subtitle" style={{ color: cat.color }}>{cat.adviceTitle}</span>
                      <h4 className="advice-drawer-title">{cat.title}</h4>
                    </div>
                  </div>
                  <div className="advice-drawer-body">
                    <p>{cat.advice}</p>
                  </div>
                  <div className="advice-drawer-footer">
                    <Link
                      to={cat.link}
                      className="btn btn-primary btn-block"
                      style={{ backgroundColor: cat.color, borderColor: cat.color }}
                      onClick={() => setExpandedCategory(null)}
                    >
                      Ver catálogo <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      <WaveBottom fill="var(--beige-claro)" bg="var(--verde-profundo)" className="wave-transition--categories-to-testimonials" />


      {/* ══════════════════════════
          TESTIMONIOS
      ══════════════════════════ */}
      <section className="testimonials-section section-padding">
        {/* Hojas de eucalipto decorativas desenfocadas */}
        <img src={`${BASE}images/bg_eucalyptus.png`} alt="" className="bg-leaf-blur bg-leaf-blur--left" aria-hidden="true" loading="lazy" decoding="async" />
        <img src={`${BASE}images/bg_eucalyptus.png`} alt="" className="bg-leaf-blur bg-leaf-blur--right" aria-hidden="true" loading="lazy" decoding="async" />

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div className="text-center mb-12 testimonials-header reveal-on-scroll reveal-up">
            <span className="section-label">Clientes</span>
            <h2>Lo que dicen nuestros clientes</h2>
            <p className="testimonials-subtitle">
              Opiniones reales de clientes de Las Piedras.
            </p>
          </div>
          <div className="testimonial-carousel reveal-on-scroll reveal-scale">
            <button type="button" className="testimonial-nav testimonial-nav--prev" onClick={goToPrevTestimonial} aria-label="Testimonio anterior">
              <ChevronLeft size={20} />
            </button>

            <div className="testimonial-track" style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}>
              {testimonials.map((t, i) => (
                <div key={i} className="testimonial-slide">
                  <div className="testimonial-card animate-fade-in">
                    <div className="testimonial-stars">{'★★★★★'}</div>
                    <p className="testimonial-text">"{t.text}"</p>
                    <div className="testimonial-author">
                      <strong>{t.name}</strong>
                      <span>{t.loc}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button type="button" className="testimonial-nav testimonial-nav--next" onClick={goToNextTestimonial} aria-label="Siguiente testimonio">
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="testimonial-dots" aria-label="Indicadores de testimonio">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`testimonial-dot ${activeTestimonial === i ? 'active' : ''}`}
                onClick={() => setActiveTestimonial(i)}
                aria-label={`Ir al testimonio ${i + 1}`}
              />
            ))}
          </div>
          <div className="text-center mt-8">
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





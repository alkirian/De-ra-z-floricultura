import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, MessageCircle, Sparkles, Leaf, MapPin, ChevronLeft, ChevronRight, BookOpen, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { generateWaLink, WA_MESSAGES } from '../data/mockData';
import SEO from '../components/SEO';
import './Home.css';

;

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

const Home = () => {
  const heroRef = useRef(null);
  const valueGridRef = useRef(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [activeComboIndex, setActiveComboIndex] = useState(null);

  // --- MIGRACIÓN A GSAP (ANIMACIÓN PREMIUM BOTÁNICA) ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Animaciones base flotantes e independientes (Swaying Loops) para cada una de las 20 hojas
      // Animamos 'x', 'y' y 'rotation' de forma asíncrona para lograr un movimiento totalmente caótico y natural.
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
        gsap.to(cfg.sel, {
          y: `+=${cfg.y}`,
          duration: cfg.durY,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
        gsap.to(cfg.sel, {
          x: cfg.x > 0 ? `+=${cfg.x}` : `-=${Math.abs(cfg.x)}`,
          duration: cfg.durX,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
        gsap.to(cfg.sel, {
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

    // 4. Animación de viento reactiva al Scroll de alta performance basada en velocidad
    let lastScrollY = window.scrollY || window.pageYOffset;
    let lastTime = performance.now();
    let scrollEndTimeout = null;

    const handleScrollWind = () => {
      const currentScrollY = window.scrollY || window.pageYOffset;
      const currentTime = performance.now();
      const deltaTime = currentTime - lastTime;

      // Optimización premium: evitar cálculos innecesarios si el hero está fuera del viewport (scroll profundo)
      if (currentScrollY > 1100) {
        lastScrollY = currentScrollY;
        lastTime = currentTime;
        return;
      }

      if (deltaTime > 0) {
        const scrollDelta = Math.abs(currentScrollY - lastScrollY);
        // Calcular velocidad de scroll (px/ms)
        const speed = scrollDelta / deltaTime;
        
        // Escalamos la intensidad del viento de 0 a 2.8 como máximo (viento fuerte!)
        const windIntensity = Math.min(2.8, speed * 0.85);

        if (windIntensity > 0.05) {
          // Hojas izquierdas deflectan hacia la izquierda con flexión y alabeo (skew/rotation)
          gsap.to(".leaf-l1 .botanical-leaf-inner, .leaf-l2 .botanical-leaf-inner, .leaf-l3 .botanical-leaf-inner, .leaf-l4 .botanical-leaf-inner, .leaf-l5 .botanical-leaf-inner, .leaf-l6 .botanical-leaf-inner, .leaf-l7 .botanical-leaf-inner, .leaf-l8 .botanical-leaf-inner, .leaf-l9 .botanical-leaf-inner, .leaf-l10 .botanical-leaf-inner", {
            x: -38 * windIntensity,
            y: -10 * windIntensity,
            skewX: -12 * windIntensity,
            rotation: -18 * windIntensity,
            duration: 0.22,
            ease: "power1.out",
            overwrite: "auto"
          });

          // Hojas derechas deflectan hacia la derecha con flexión y alabeo
          gsap.to(".leaf-r1 .botanical-leaf-inner, .leaf-r2 .botanical-leaf-inner, .leaf-r3 .botanical-leaf-inner, .leaf-r4 .botanical-leaf-inner, .leaf-r5 .botanical-leaf-inner, .leaf-r6 .botanical-leaf-inner, .leaf-r7 .botanical-leaf-inner, .leaf-r8 .botanical-leaf-inner, .leaf-r9 .botanical-leaf-inner, .leaf-r10 .botanical-leaf-inner", {
            x: 38 * windIntensity,
            y: -10 * windIntensity,
            skewX: 12 * windIntensity,
            rotation: 18 * windIntensity,
            duration: 0.22,
            ease: "power1.out",
            overwrite: "auto"
          });
        }
      }

      lastScrollY = currentScrollY;
      lastTime = currentTime;

      // Retorno elástico de viento con rebote premium amortiguado
      if (scrollEndTimeout) clearTimeout(scrollEndTimeout);
      scrollEndTimeout = setTimeout(() => {
        gsap.to(".botanical-leaf-inner", {
          x: 0,
          y: 0,
          skewX: 0,
          rotation: 0,
          duration: 1.5,
          ease: "elastic.out(1.1, 0.6)",
          overwrite: "auto"
        });
      }, 150);
    };

    window.addEventListener("scroll", handleScrollWind, { passive: true });

    return () => {
      ctx.revert(); // Recolección de basura impecable al desmontar
      window.removeEventListener("scroll", handleScrollWind);
      if (scrollEndTimeout) clearTimeout(scrollEndTimeout);
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
        title="De Raíz Floricultura | Venta de Plantas y Macetas en Las Piedras"
        description="Tu vivero de confianza en Las Piedras, Canelones. Encontrá la mejor selección de plantas de interior y exterior, tierra, sustratos y asesoramiento botánico personalizado en Ruta 48."
        path="/"
      />

      {/* ══════════════════════════
          HERO SPLIT ORGÁNICO
      ══════════════════════════ */}
      <section className="hero split-hero hero-sage-botanicals" ref={heroRef}>
        {/* Canvas de Botánica Flotante (3D Parallax & Swaying) */}
        <div className="hero-botanical-canvas" aria-hidden="true">
          {/* Borde Izquierdo (10 Hojas) */}
          <div className="botanical-leaf leaf-l1 leaf-depth-foreground">
            <img src={`${BASE}images/SVG Hero/SVG/Recurso 4.svg`} className="botanical-leaf-inner" alt="" />
          </div>
          <div className="botanical-leaf leaf-l2 leaf-depth-midground">
            <img src={`${BASE}images/SVG Hero/SVG/Recurso 14.svg`} className="botanical-leaf-inner" alt="" />
          </div>
          <div className="botanical-leaf leaf-l3 leaf-depth-background">
            <img src={`${BASE}images/SVG Hero/SVG/Recurso 15.svg`} className="botanical-leaf-inner" alt="" />
          </div>
          <div className="botanical-leaf leaf-l4 leaf-depth-background">
            <img src={`${BASE}images/SVG Hero/SVG/Recurso 7.svg`} className="botanical-leaf-inner" alt="" />
          </div>
          <div className="botanical-leaf leaf-l5 leaf-depth-midground">
            <img src={`${BASE}images/SVG Hero/SVG/Recurso 9.svg`} className="botanical-leaf-inner" alt="" />
          </div>
          <div className="botanical-leaf leaf-l6 leaf-depth-midground">
            <img src={`${BASE}images/SVG Hero/SVG/Recurso 16.svg`} className="botanical-leaf-inner" alt="" />
          </div>
          <div className="botanical-leaf leaf-l7 leaf-depth-background">
            <img src={`${BASE}images/SVG Hero/SVG/Recurso 22.svg`} className="botanical-leaf-inner" alt="" />
          </div>
          <div className="botanical-leaf leaf-l8 leaf-depth-midground">
            <img src={`${BASE}images/SVG Hero/SVG/Recurso 10.svg`} className="botanical-leaf-inner" alt="" />
          </div>
          <div className="botanical-leaf leaf-l9 leaf-depth-foreground">
            <img src={`${BASE}images/SVG Hero/SVG/Recurso 18.svg`} className="botanical-leaf-inner" alt="" />
          </div>
          <div className="botanical-leaf leaf-l10 leaf-depth-midground">
            <img src={`${BASE}images/SVG Hero/SVG/Recurso 24.svg`} className="botanical-leaf-inner" alt="" />
          </div>

          {/* Borde Derecho (10 Hojas) */}
          <div className="botanical-leaf leaf-r1 leaf-depth-midground">
            <img src={`${BASE}images/SVG Hero/SVG/Recurso 5.svg`} className="botanical-leaf-inner" alt="" />
          </div>
          <div className="botanical-leaf leaf-r2 leaf-depth-background">
            <img src={`${BASE}images/SVG Hero/SVG/Recurso 17.svg`} className="botanical-leaf-inner" alt="" />
          </div>
          <div className="botanical-leaf leaf-r3 leaf-depth-background">
            <img src={`${BASE}images/SVG Hero/SVG/Recurso 6.svg`} className="botanical-leaf-inner" alt="" />
          </div>
          <div className="botanical-leaf leaf-r4 leaf-depth-midground">
            <img src={`${BASE}images/SVG Hero/SVG/Recurso 8.svg`} className="botanical-leaf-inner" alt="" />
          </div>
          <div className="botanical-leaf leaf-r5 leaf-depth-background">
            <img src={`${BASE}images/SVG Hero/SVG/Recurso 19.svg`} className="botanical-leaf-inner" alt="" />
          </div>
          <div className="botanical-leaf leaf-r6 leaf-depth-foreground">
            <img src={`${BASE}images/SVG Hero/SVG/Recurso 20.svg`} className="botanical-leaf-inner" alt="" />
          </div>
          <div className="botanical-leaf leaf-r7 leaf-depth-midground">
            <img src={`${BASE}images/SVG Hero/SVG/Recurso 23.svg`} className="botanical-leaf-inner" alt="" />
          </div>
          <div className="botanical-leaf leaf-r8 leaf-depth-foreground">
            <img src={`${BASE}images/SVG Hero/SVG/Recurso 11.svg`} className="botanical-leaf-inner" alt="" />
          </div>
          <div className="botanical-leaf leaf-r9 leaf-depth-midground">
            <img src={`${BASE}images/SVG Hero/SVG/Recurso 21.svg`} className="botanical-leaf-inner" alt="" />
          </div>
          <div className="botanical-leaf leaf-r10 leaf-depth-background">
            <img src={`${BASE}images/SVG Hero/SVG/Recurso 25.svg`} className="botanical-leaf-inner" alt="" />
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
            <div className="text-center mb-12 quick-actions-header">
              <span className="section-label">Comenzá por acá</span>
              <h2>Explorá el universo De Raíz</h2>
              <p className="quick-actions-subtitle">
                Te guiamos en cada paso para que lleves la naturaleza a tu vida, con la calidad y calidez de siempre.
              </p>
            </div>
            <div className="quick-actions-grid">
              <Link to="/catalogo" className="quick-action-card quick-action-card--catalog">
                <div className="quick-action-icon-wrapper">
                  <Leaf size={26} />
                </div>
                <span className="quick-action-kicker">Catálogo Completo</span>
                <h3>Plantas & Macetas</h3>
                <p>Llevá frescura a tu hogar. Gran variedad de interior, exterior, combos exclusivos e insumos premium.</p>
                <span className="quick-action-link">Explorar catálogo <ArrowRight size={16} /></span>
              </Link>

              <Link to="/aprende-de-raiz" className="quick-action-card quick-action-card--learn">
                <div className="quick-action-icon-wrapper">
                  <BookOpen size={26} />
                </div>
                <span className="quick-action-kicker">Guías de Cultivo</span>
                <h3>Aprendé de Raíz</h3>
                <p>Convertite en experto. Consejos paso a paso sobre riego, sustratos y plagas adaptadas a Uruguay.</p>
                <span className="quick-action-link">Ir a la guía botánica <ArrowRight size={16} /></span>
              </Link>

              <Link to="/contacto" className="quick-action-card quick-action-card--contact">
                <div className="quick-action-icon-wrapper">
                  <MapPin size={26} />
                </div>
                <span className="quick-action-kicker">Atención Cercana</span>
                <h3>Visitanos o Escribinos</h3>
                <p>Encontranos en Las Piedras, Ruta 48. O chateá con nuestro equipo para recibir asesoramiento personalizado.</p>
                <span className="quick-action-link">Ver contacto y local <ArrowRight size={16} /></span>
              </Link>
            </div>
          </div>
        </section>
        {/* ══════════════════════════
            PROPUESTA DE VALOR
        ══════════════════════════ */}
        <section className="value-section section-padding--sm">
          <div className="container container--narrow text-center">
            <span className="section-label">Nuestra propuesta</span>
            <h2>No solo vendemos plantas.</h2>
            <p className="value-text">
              Plantas, flores, macetas e insumos con atencion local en Las Piedras.
            </p>
            <div className="value-grid" ref={valueGridRef}>
              <div className="value-item">
                <div className="value-icon-wrap">
                  <div className="value-icon">🌿</div>
                </div>
                <h4>Asesoramiento personalizado</h4>
                <p>Te orientamos según tu espacio, luz y experiencia.</p>
              </div>
              <div className="value-item">
                <div className="value-icon-wrap">
                  <div className="value-icon">🪴</div>
                </div>
                <h4>Plantas, flores y macetas</h4>
                <p>Gran variedad de interior, exterior, flores y más.</p>
              </div>
              <div className="value-item">
                <div className="value-icon-wrap">
                  <div className="value-icon">📍</div>
                </div>
                <h4>Atención local</h4>
                <p>Estamos en Las Piedras, Canelones. Visitanos.</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* --------------------------
          COMBOS INSPIRACION
      -------------------------- */}
      <section className="combos-section section-padding--sm" aria-labelledby="combos-title">
        <div className="container">
          <div className="text-center combos-header">
            <span className="section-label">Inspiracion real</span>
            <h2 id="combos-title">Combos verdes para regalar o decorar</h2>
            <p className="combos-subtitle">
              Inspirate con algunos combos que ya armamos y escribinos para crear uno a tu medida.
            </p>
          </div>

          <div className="combos-grid">
            {COMBO_INSPIRATIONS.map((combo, index) => (
              <article
                key={combo.id}
                className="combo-card"
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

          <article className="combo-custom-cta">
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
        <div className="container advice-grid">
          <div className="advice-text">
            <span className="section-label advice-label">Asesoramiento gratuito</span>
            <h2>¿No sabés qué planta elegir?</h2>
            <p>
              Te guiamos en 1 minuto y te mostramos opciones reales para vos.
            </p>

            <div className="advice-steps" aria-label="Cómo te ayudamos a elegir">
              {ADVICE_STEPS.map((step, index) => (
                <div key={step.title} className="advice-step-item">
                  <span className="advice-step-number">{index + 1}</span>
                  <div>
                    <strong>{step.title}</strong>
                    <p>{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="advice-actions">
              <a
                href={generateWaLink(WA_MESSAGES.ayudaElegir)}
                target="_blank"
                rel="noreferrer"
                className="btn btn-light"
              >
                <Sparkles size={18} /> Quiero mi recomendación
              </a>
              <Link to="/catalogo" className="advice-secondary-link">
                <MessageCircle size={16} /> Ver catálogo primero
              </Link>
            </div>
          </div>

          <div className="advice-image">
            <img
              src={ADVICE_FEATURED_IMAGE}
              alt="Planta destacada para asesoramiento personalizado"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>
      <WaveBottom fill="var(--verde-profundo)" bg="var(--beige-claro)" className="wave-transition--advice-to-categories" />

      {/* ══════════════════════════
          CATEGORÍAS ILUSTRADAS
      ══════════════════════════ */}
      <section className="categories-section section-padding" style={{background: 'var(--beige-claro)', position: 'relative', overflow: 'hidden'}}>
        {/* Hojas decorativas sutiles desenfocadas en los bordes */}
        <img src={`${BASE}images/bg_leaves.png`} alt="" className="bg-leaf-blur bg-leaf-blur--left" aria-hidden="true" />
        <img src={`${BASE}images/bg_leaves.png`} alt="" className="bg-leaf-blur bg-leaf-blur--right" aria-hidden="true" />

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div className="text-center mb-12">
            <span className="section-label">Qué encontrás en De Raíz</span>
            <h2>Explorá nuestras categorías</h2>
            <div className="title-underline"></div>
          </div>
          <div className="accordion-container">
            {CATEGORIES.map((cat, i) => (
              <div
                key={i}
                className={`accordion-item ${activeAccordion === i ? 'accordion-item--active' : ''}`}
                onClick={() => setActiveAccordion(i)}
                style={{
                  '--cat-color': cat.color,
                  backgroundImage: `url(${cat.bgImage})`,
                  animationDelay: `${i * 0.08}s`
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
      </section>


      <WaveBottom fill="var(--beige-claro)" bg="var(--verde-profundo)" className="wave-transition--categories-to-testimonials" />


      {/* ══════════════════════════
          TESTIMONIOS
      ══════════════════════════ */}
      <section className="testimonials-section section-padding">
        {/* Hojas de eucalipto decorativas desenfocadas */}
        <img src={`${BASE}images/bg_eucalyptus.png`} alt="" className="bg-leaf-blur bg-leaf-blur--left" aria-hidden="true" />
        <img src={`${BASE}images/bg_eucalyptus.png`} alt="" className="bg-leaf-blur bg-leaf-blur--right" aria-hidden="true" />

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div className="text-center mb-12 testimonials-header">
            <span className="section-label">Clientes</span>
            <h2>Lo que dicen nuestros clientes</h2>
            <p className="testimonials-subtitle">
              Opiniones reales de clientes de Las Piedras.
            </p>
          </div>
          <div className="testimonial-carousel">
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

    </div>
  );
};

export default Home;





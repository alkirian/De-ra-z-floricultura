import { useMemo, useState } from 'react';
import {
  Sun,
  Lamp,
  CloudSun,
  MoonStar,
  Compass,
  Home,
  Building2,
  Store,
  Trees,
  Leaf,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';
import './BotanicaLuzUruguay.css';

const LIGHT_TYPES = [
  {
    id: 'directa',
    icon: Sun,
    title: 'Sol directo',
    desc: 'Rayos de sol sobre las hojas. Ideal para especies de alto requerimiento luminoso.',
    plants: ['Cactus', 'Suculentas', 'Lavanda', 'Romero', 'Geranios', 'Rosales'],
    warning: 'En verano uruguayo puede quemar hojas delicadas.',
  },
  {
    id: 'indirecta',
    icon: Lamp,
    title: 'Luz indirecta brillante',
    desc: 'Mucha claridad, sin sol directo sobre hojas.',
    plants: ['Monstera', 'Potus', 'Philodendron', 'Ficus', 'Anturios', 'Orquideas', 'Peperomias'],
  },
  {
    id: 'media',
    icon: CloudSun,
    title: 'Media sombra',
    desc: 'Sol suave parcial o luz filtrada por cortina, arbol o malla.',
    plants: ['Hortensias', 'Begonias', 'Helechos', 'Azaleas', 'Clivias', 'Camelias'],
  },
  {
    id: 'baja',
    icon: MoonStar,
    title: 'Luz baja',
    desc: 'Espacios alejados de ventanas o con menor claridad.',
    plants: ['Sansevieria', 'Zamioculca', 'Aspidistra', 'Aglaonema', 'Dracaena', 'Potus'],
    warning: 'Poca luz no es oscuridad total. Casi ninguna planta vive bien sin claridad.',
  },
];

const ORIENTATIONS = [
  {
    id: 'norte',
    title: 'Norte: la zona mas luminosa',
    text: 'En Uruguay recibe mas luz y mas sol durante el ano.',
    ideal: ['Cactus', 'Suculentas', 'Aromaticas', 'Geranios', 'Hibiscus', 'Huerta en maceta'],
    tip: 'En verano, filtrar un poco el sol de mediodia en especies delicadas.',
  },
  {
    id: 'este',
    title: 'Este: sol suave de manana',
    text: 'Una orientacion muy amigable para plantas de interior y tropicales.',
    ideal: ['Helechos', 'Calatheas', 'Anturios', 'Begonias', 'Orquideas', 'Potus', 'Monstera'],
  },
  {
    id: 'oeste',
    title: 'Oeste: sol fuerte de tarde',
    text: 'En primavera y verano el sol puede ser intenso.',
    ideal: ['Cactus', 'Suculentas resistentes', 'Romero', 'Lavanda', 'Buganvilla', 'Geranios'],
    tip: 'Evitar tropicales delicadas sin proteccion.',
  },
  {
    id: 'sur',
    title: 'Sur: menos sol directo',
    text: 'Menor intensidad. Funciona para especies tolerantes a luz media o baja.',
    ideal: ['Sansevieria', 'Zamioculca', 'Aspidistra', 'Potus', 'Aglaonema', 'Dracaena'],
    tip: 'Regar menos, porque el sustrato seca mas lento.',
  },
];

const QUIZ = {
  vivienda: ['Apartamento', 'Casa con patio', 'Balcon', 'Oficina o local'],
  orientacion: ['Norte', 'Este', 'Oeste', 'Sur', 'No se'],
  luz: ['Sol directo varias horas', 'Sol solo de manana', 'Mucha claridad sin sol directo', 'Poca luz', 'No estoy seguro'],
  planta: ['Planta de interior', 'Cactus o suculenta', 'Aromatica', 'Planta con flor', 'Helecho o tropical', 'Huerta en maceta'],
};

const SEASONS = [
  { id: 'primavera', title: 'Primavera', text: 'Arranca el crecimiento activo.', tips: ['Aumentar luz gradualmente', 'Fertilizar con moderacion', 'Revisar brotes nuevos', 'Controlar plagas'] },
  { id: 'verano', title: 'Verano', text: 'Sol fuerte, sobre todo en norte y oeste.', tips: ['Proteger tropicales del sol duro', 'Usar cortina o media sombra', 'Regar segun necesidad real', 'Evitar macetas recalentadas'] },
  { id: 'otono', title: 'Otono', text: 'Baja la luz y se enlentece el crecimiento.', tips: ['Reducir riego', 'Aprovechar zonas luminosas', 'Preparar plantas sensibles al frio', 'Evitar fertilizacion fuerte'] },
  { id: 'invierno', title: 'Invierno', text: 'Menos luz y temperaturas bajas.', tips: ['Acercar a ventanas', 'No regar de mas', 'Evitar vidrios frios', 'Proteger de corrientes y heladas'] },
];

const HOUSING = [
  { id: 'apartamento', icon: Building2, title: 'Apartamento', tips: ['Mirar orientacion de ventanas', 'Elegir especies de interior resistentes', 'Cuidado con sol fuerte tras vidrio', 'Evitar sobre-riego'] },
  { id: 'casa', icon: Home, title: 'Casa con patio', tips: ['Separar zonas de sol y sombra', 'Usar pergola o media sombra', 'Proteger tropicales del frio', 'Aprovechar norte para sol pleno'] },
  { id: 'balcon', icon: Trees, title: 'Balcon', tips: ['Considerar sol y viento', 'Usar maceta con buen drenaje', 'Oeste pide especies mas resistentes', 'Sur pide especies tolerantes a menor luz'] },
  { id: 'oficina', icon: Store, title: 'Oficina o local', tips: ['Plantas resistentes a baja luz', 'Evitar aire acondicionado directo', 'No usar planta de flor sin luz buena', 'Rotar plantas si el espacio es oscuro'] },
];

const SUMMARY_ROWS = [
  ['Sol directo fuerte', 'Sol varias horas, sobre todo mediodia/tarde', 'Cactus, suculentas, lavanda, romero', 'Regar mas en maceta y proteger sensibles en verano'],
  ['Sol suave', 'Sol de manana o filtrado', 'Begonias, anturios, orquideas, potus, monstera', 'Excelente para tropicales'],
  ['Luz indirecta brillante', 'Mucha claridad sin sol directo', 'Philodendron, ficus, dracaena, peperomia', 'Evitar rincones oscuros'],
  ['Media sombra', 'Sol parcial o filtrado por arboles', 'Hortensias, camelias, clivias, helechos', 'Humedad estable sin encharcar'],
  ['Sombra luminosa', 'Sin sol directo pero con buena claridad', 'Aspidistra, helechos, aglaonema, sansevieria', 'Riego moderado'],
  ['Baja luz', 'Lejos de ventanas o poca claridad', 'Zamioculca, sansevieria, potus, aspidistra', 'Crecimiento mas lento y menos riego'],
];

const makeQuizResult = ({ vivienda, orientacion, luz, planta }) => {
  const plantType = planta?.toLowerCase() || '';
  const orient = orientacion?.toLowerCase() || '';
  const light = luz?.toLowerCase() || '';

  let tipoLuz = 'Luz indirecta brillante';
  let orientacionIdeal = 'Este o norte filtrado';
  let sugeridas = ['Potus', 'Monstera', 'Dracaena'];
  let advertencias = ['Evita mover la planta de golpe entre sombra y sol directo.'];
  let riego = 'Rega cuando la capa superior del sustrato este seca.';

  if (plantType.includes('cactus') || plantType.includes('suculenta') || plantType.includes('aromatica')) {
    tipoLuz = 'Sol directo o sol suave intenso';
    orientacionIdeal = 'Norte u oeste controlado';
    sugeridas = ['Cactus', 'Suculentas', 'Romero', 'Lavanda'];
    advertencias = ['En maceta chica, el sustrato seca rapido en verano.'];
    riego = 'Riego espaciado y profundo. Nada de encharcar.';
  } else if (plantType.includes('helecho') || plantType.includes('tropical') || plantType.includes('interior')) {
    tipoLuz = 'Luz indirecta brillante o sol suave de manana';
    orientacionIdeal = 'Este o norte filtrado';
    sugeridas = ['Helecho', 'Anturio', 'Orquidea', 'Calathea', 'Potus'];
    advertencias = ['Evita oeste sin cortina en verano.'];
    riego = 'Mantene humedad pareja, sin agua estancada.';
  }

  if (orient === 'sur' || light.includes('poca')) {
    tipoLuz = 'Luz media a baja';
    orientacionIdeal = 'Sur luminoso o cerca de ventana clara';
    sugeridas = ['Sansevieria', 'Zamioculca', 'Aglaonema', 'Potus'];
    advertencias = ['Con baja luz, la planta crece mas lento.'];
    riego = 'Reduce frecuencia de riego y controla secado real.';
  }

  if (orient === 'oeste' && !plantType.includes('cactus')) {
    advertencias.unshift('Oeste tiene sol fuerte de tarde: protege hojas delicadas.');
  }

  if (vivienda?.toLowerCase().includes('oficina')) {
    advertencias.push('Evita aire acondicionado directo sobre las hojas.');
  }

  return { tipoLuz, orientacionIdeal, sugeridas, advertencias, riego };
};

const BotanicaLuzUruguay = () => {
  const [lightId, setLightId] = useState('indirecta');
  const [orientationId, setOrientationId] = useState('este');
  const [seasonTab, setSeasonTab] = useState('primavera');
  const [quizAnswers, setQuizAnswers] = useState({ vivienda: '', orientacion: '', luz: '', planta: '' });

  const selectedLight = LIGHT_TYPES.find((item) => item.id === lightId);
  const selectedOrientation = ORIENTATIONS.find((item) => item.id === orientationId);
  const selectedSeason = SEASONS.find((item) => item.id === seasonTab);

  const quizReady = Object.values(quizAnswers).every(Boolean);
  const quizResult = useMemo(() => makeQuizResult(quizAnswers), [quizAnswers]);

  const updateQuiz = (key, value) => {
    setQuizAnswers((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="botanica-luz-uy">
      <section className="luz-hero card">
        <span className="section-label">Encontra el lugar ideal para tu planta</span>
        <h2>Luz y ubicacion de plantas en Uruguay</h2>
        <p>
          Aprende a elegir el mejor lugar segun la luz, la orientacion de tu casa y la
          estacion del ano. En Uruguay, norte, este, oeste y sur no se comportan igual.
        </p>
        <a href="#modulo-luz" className="btn btn-primary">Empezar guia interactiva</a>
      </section>

      <section id="modulo-luz" className="luz-module">
        <h3>Que tipo de luz tenes?</h3>
        <div className="luz-card-grid">
          {LIGHT_TYPES.map((item) => {
            const Icon = item.icon;
            return (
              <button key={item.id} type="button" className={`luz-type-card ${item.id === lightId ? 'is-active' : ''}`} onClick={() => setLightId(item.id)}>
                <Icon size={20} />
                <strong>{item.title}</strong>
                <span>{item.desc}</span>
              </button>
            );
          })}
        </div>
        <div className="luz-detail card">
          <h4>{selectedLight?.title}</h4>
          <p>{selectedLight?.desc}</p>
          <p><strong>Plantas recomendadas:</strong> {selectedLight?.plants.join(', ')}.</p>
          {selectedLight?.warning && <p className="luz-warning"><AlertTriangle size={16} /> {selectedLight.warning}</p>}
        </div>
      </section>

      <section className="luz-module">
        <h3>Orientacion de tu ventana o balcon (Hemisferio Sur)</h3>
        <div className="orientation-switch" role="tablist" aria-label="Orientacion">
          {ORIENTATIONS.map((item) => (
            <button key={item.id} type="button" className={`orientation-chip ${item.id === orientationId ? 'is-active' : ''}`} onClick={() => setOrientationId(item.id)}>
              <Compass size={14} /> {item.id.toUpperCase()}
            </button>
          ))}
        </div>
        <div className="orientation-card card">
          <h4>{selectedOrientation?.title}</h4>
          <p>{selectedOrientation?.text}</p>
          <p><strong>Ideal para:</strong> {selectedOrientation?.ideal.join(', ')}.</p>
          {selectedOrientation?.tip && <p className="luz-tip"><CheckCircle2 size={16} /> {selectedOrientation.tip}</p>}
        </div>
      </section>

      <section className="luz-module card">
        <h3>Donde pongo mi planta? (mini quiz)</h3>
        <div className="quiz-grid">
          <div className="quiz-group">
            <label>1) Que tipo de espacio tenes?</label>
            <select value={quizAnswers.vivienda} onChange={(e) => updateQuiz('vivienda', e.target.value)}>
              <option value="">Seleccionar...</option>
              {QUIZ.vivienda.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
          <div className="quiz-group">
            <label>2) Hacia donde mira tu ventana o balcon?</label>
            <select value={quizAnswers.orientacion} onChange={(e) => updateQuiz('orientacion', e.target.value)}>
              <option value="">Seleccionar...</option>
              {QUIZ.orientacion.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
          <div className="quiz-group">
            <label>3) Cuanta luz recibe el lugar?</label>
            <select value={quizAnswers.luz} onChange={(e) => updateQuiz('luz', e.target.value)}>
              <option value="">Seleccionar...</option>
              {QUIZ.luz.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
          <div className="quiz-group">
            <label>4) Que tipo de planta queres ubicar?</label>
            <select value={quizAnswers.planta} onChange={(e) => updateQuiz('planta', e.target.value)}>
              <option value="">Seleccionar...</option>
              {QUIZ.planta.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
        </div>

        {quizReady && (
          <div className="quiz-result card">
            <h4>Tu ubicacion recomendada</h4>
            <p><strong>Tipo de luz:</strong> {quizResult.tipoLuz}</p>
            <p><strong>Orientacion ideal:</strong> {quizResult.orientacionIdeal}</p>
            <p><strong>Plantas sugeridas:</strong> {quizResult.sugeridas.join(', ')}</p>
            <p><strong>Consejo de riego:</strong> {quizResult.riego}</p>
            <ul>
              {quizResult.advertencias.map((warn) => <li key={warn}>{warn}</li>)}
            </ul>
          </div>
        )}
      </section>

      <section className="luz-module">
        <h3>Senales que te da tu planta</h3>
        <div className="signals-grid">
          <article className="signal-card card">
            <h4>Si le falta luz</h4>
            <ul>
              <li>Tallos largos y debiles</li>
              <li>Hojas pequenas</li>
              <li>Crecimiento inclinado hacia la ventana</li>
              <li>Poca floracion</li>
              <li>Variegados que se ponen verdes</li>
              <li>Sustrato que tarda mucho en secar</li>
            </ul>
            <p className="luz-tip"><CheckCircle2 size={16} /> Acercar gradualmente a mas claridad.</p>
          </article>
          <article className="signal-card card">
            <h4>Si recibe demasiado sol</h4>
            <ul>
              <li>Manchas marrones o secas</li>
              <li>Bordes quemados</li>
              <li>Hojas descoloridas</li>
              <li>Planta caida en horas de calor</li>
              <li>Sustrato que seca muy rapido</li>
              <li>Aspecto tostado en hojas</li>
            </ul>
            <p className="luz-warning"><AlertTriangle size={16} /> Mover a luz indirecta o sol de manana.</p>
          </article>
        </div>
      </section>

      <section className="luz-module">
        <h3>Cuidado por estacion del ano</h3>
        <div className="season-tabs">
          {SEASONS.map((season) => (
            <button key={season.id} type="button" className={`season-tab ${season.id === seasonTab ? 'is-active' : ''}`} onClick={() => setSeasonTab(season.id)}>
              {season.title}
            </button>
          ))}
        </div>
        <div className="season-panel card">
          <h4>{selectedSeason?.title}</h4>
          <p>{selectedSeason?.text}</p>
          <ul>
            {selectedSeason?.tips.map((tip) => <li key={tip}>{tip}</li>)}
          </ul>
        </div>
      </section>

      <section className="luz-module">
        <h3>Guia rapida por vivienda</h3>
        <div className="housing-grid">
          {HOUSING.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.id} className="housing-card card">
                <h4><Icon size={16} /> {item.title}</h4>
                <ul>{item.tips.map((tip) => <li key={tip}>{tip}</li>)}</ul>
              </article>
            );
          })}
        </div>
      </section>

      <section className="luz-module">
        <h3>Semaforo de luz (atajo rapido)</h3>
        <div className="semaforo-grid">
          <article className="semaforo-card card">
            <h4>Plantas tropicales</h4>
            <p><span className="semaforo-dot sem-verde"></span> Verde: este o norte filtrado</p>
            <p><span className="semaforo-dot sem-amarillo"></span> Amarillo: sur luminoso</p>
            <p><span className="semaforo-dot sem-rojo"></span> Rojo: oeste con sol directo de tarde</p>
          </article>
          <article className="semaforo-card card">
            <h4>Cactus y suculentas</h4>
            <p><span className="semaforo-dot sem-verde"></span> Verde: norte u oeste con varias horas de sol</p>
            <p><span className="semaforo-dot sem-amarillo"></span> Amarillo: este luminoso</p>
            <p><span className="semaforo-dot sem-rojo"></span> Rojo: rincon oscuro o sur sin claridad</p>
          </article>
        </div>
      </section>

      <section className="luz-module">
        <h3>Elegi segun tu luz</h3>
        <div className="summary-table-wrap card">
          <table className="summary-table">
            <thead>
              <tr>
                <th>Tipo de luz</th>
                <th>Como reconocerla</th>
                <th>Plantas recomendadas</th>
                <th>Cuidado clave</th>
              </tr>
            </thead>
            <tbody>
              {SUMMARY_ROWS.map((row) => (
                <tr key={row[0]}>
                  <td>{row[0]}</td>
                  <td>{row[1]}</td>
                  <td>{row[2]}</td>
                  <td>{row[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default BotanicaLuzUruguay;

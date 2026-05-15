const axios = require('axios');
const FormData = require('form-data');

const PLANTNET_URL = 'https://my-api.plantnet.org/v2/identify/all';
const FAKE_API_KEY = 'FAKE_PLANTNET_API_KEY_REPLACE_ME';

const createError = (status, publicError, details) => {
  const error = new Error(publicError);
  error.status = status;
  error.publicError = publicError;
  error.details = details;
  return error;
};

const extractRemainingRequests = (data, headers = {}) => {
  const bodyValue = data?.remainingIdentificationRequests ?? data?.remainingRequests ?? null;
  if (typeof bodyValue === 'number') return bodyValue;

  const headerCandidates = [
    headers['x-ratelimit-remaining'],
    headers['x-rate-limit-remaining'],
    headers['x-remaining-requests'],
  ];

  for (const candidate of headerCandidates) {
    const parsed = Number(candidate);
    if (Number.isFinite(parsed)) return parsed;
  }

  return null;
};

const mapRawResults = (results) => {
  if (!Array.isArray(results)) return [];

  return results.slice(0, 5).map((item) => {
    const scientificName =
      item?.species?.scientificNameWithoutAuthor ||
      item?.species?.scientificName ||
      null;

    return {
      score: typeof item?.score === 'number' ? Number(item.score.toFixed(4)) : null,
      scientificName,
      commonNames: Array.isArray(item?.species?.commonNames) ? item.species.commonNames : [],
    };
  });
};

const HEALTH_INFO_LIBRARY = {
  monstera: {
    basedOn: 'Monstera',
    commonFungalIssues: ['Mancha foliar por humedad alta', 'Pudricion de raiz por exceso de riego'],
    commonPests: ['Trips', 'Cochinilla algodonosa', 'Arana roja'],
    symptomsToWatch: ['Hojas amarillas en la base', 'Puntos marrones con borde oscuro', 'Hojas con decoloracion plateada'],
    generalRecommendations: ['Riega solo cuando se seque la capa superior del sustrato', 'Mejora ventilacion y evita agua estancada', 'Revisa el envés de las hojas 1 vez por semana'],
  },
  ficus: {
    basedOn: 'Ficus',
    commonFungalIssues: ['Antracnosis', 'Hongos de suelo por drenaje deficiente'],
    commonPests: ['Cochinilla', 'Pulgon', 'Mosca blanca'],
    symptomsToWatch: ['Caida repentina de hojas', 'Hojas pegajosas', 'Manchas negras o circulares'],
    generalRecommendations: ['Evita cambios bruscos de temperatura', 'Mantene riego moderado con buen drenaje', 'Limpia hojas para detectar plagas temprano'],
  },
  sansevieria: {
    basedOn: 'Sansevieria',
    commonFungalIssues: ['Pudricion basal por exceso de agua', 'Mancha fungica en hojas'],
    commonPests: ['Cochinilla', 'Trips'],
    symptomsToWatch: ['Hojas blandas o colapsadas', 'Base amarilla o con olor', 'Puntos secos marrones'],
    generalRecommendations: ['Deja secar bien entre riegos', 'Usa sustrato muy drenante', 'No dejes agua en el plato de la maceta'],
  },
  lavandula: {
    basedOn: 'Lavanda',
    commonFungalIssues: ['Oidio', 'Pudricion de cuello'],
    commonPests: ['Pulgones', 'Cigarrillas'],
    symptomsToWatch: ['Polvillo blanco en hojas', 'Marchitez aun con suelo humedo', 'Brotes debiles'],
    generalRecommendations: ['Ubicar a pleno sol', 'Evitar riegos frecuentes', 'Podar ramas secas para mejorar aireacion'],
  },
  generic: {
    basedOn: 'especie detectada',
    commonFungalIssues: ['Manchas fungicas en hojas', 'Pudricion de raiz por exceso de agua'],
    commonPests: ['Pulgones', 'Cochinilla', 'Arana roja'],
    symptomsToWatch: ['Hojas amarillas o blandas', 'Puntos marrones o negros', 'Presencia de melaza o telaranas finas'],
    generalRecommendations: ['Riego moderado y buen drenaje', 'Buena ventilacion y luz acorde a la especie', 'Inspeccion semanal de hojas y tallos'],
  },
};

const pickHealthInfo = ({ scientificName, genus }) => {
  const scientificToken = (scientificName || '').trim().split(' ')[0].toLowerCase();
  const genusToken = (genus || '').trim().toLowerCase();
  const key = HEALTH_INFO_LIBRARY[scientificToken]
    ? scientificToken
    : HEALTH_INFO_LIBRARY[genusToken]
      ? genusToken
      : 'generic';

  const info = HEALTH_INFO_LIBRARY[key];

  return {
    diagnosisWarning:
      'Informacion orientativa. Esto no reemplaza un diagnostico fitosanitario por imagen ni una revision profesional.',
    basedOn: info.basedOn,
    commonFungalIssues: info.commonFungalIssues,
    commonPests: info.commonPests,
    symptomsToWatch: info.symptomsToWatch,
    generalRecommendations: info.generalRecommendations,
  };
};

const normalizePlantnetResponse = (data, headers) => {
  const results = Array.isArray(data?.results) ? data.results : [];

  if (results.length === 0) {
    throw createError(
      422,
      'No encontramos resultados de identificación para esa imagen.',
      'Pl@ntNet respondió sin coincidencias en results.',
    );
  }

  const best = results[0];
  const species = best?.species || {};

  const scientificName = species.scientificNameWithoutAuthor || species.scientificName || null;
  const bestMatch =
    scientificName ||
    (Array.isArray(species.commonNames) && species.commonNames.length > 0
      ? species.commonNames[0]
      : null);

  const genus = species?.genus?.scientificNameWithoutAuthor || species?.genus?.scientificName || null;

  return {
    success: true,
    bestMatch,
    score: typeof best?.score === 'number' ? Number(best.score.toFixed(4)) : null,
    scientificName,
    commonNames: Array.isArray(species.commonNames) ? species.commonNames : [],
    family: species?.family?.scientificNameWithoutAuthor || species?.family?.scientificName || null,
    genus,
    remainingRequests: extractRemainingRequests(data, headers),
    rawResults: mapRawResults(results),
    generalHealthInfo: pickHealthInfo({ scientificName, genus }),
  };
};

const buildMockResponse = () => ({
  success: true,
  bestMatch: 'Monstera deliciosa',
  score: 0.92,
  scientificName: 'Monstera deliciosa Liebm.',
  commonNames: ['costilla de Adan', 'monstera'],
  family: 'Araceae',
  genus: 'Monstera',
  remainingRequests: null,
  rawResults: [],
  generalHealthInfo: pickHealthInfo({
    scientificName: 'Monstera deliciosa Liebm.',
    genus: 'Monstera',
  }),
  mock: true,
  note: 'Modo mock activo: PLANTNET_API_KEY es ficticia.',
});

const identifyWithPlantnet = async (file) => {
  const apiKey = process.env.PLANTNET_API_KEY;

  if (!apiKey) {
    throw createError(
      500,
      'La API key de Pl@ntNet no esta configurada en el backend.',
      'Defini PLANTNET_API_KEY en backend/.env',
    );
  }

  if (apiKey === FAKE_API_KEY) {
    return buildMockResponse();
  }

  const formData = new FormData();
  formData.append('images', file.buffer, {
    filename: file.originalname || 'plant.jpg',
    contentType: file.mimetype,
  });
  formData.append('organs', 'auto');

  const requestUrl = `${PLANTNET_URL}?api-key=${encodeURIComponent(apiKey)}&lang=es`;

  try {
    const response = await axios.post(requestUrl, formData, {
      headers: formData.getHeaders(),
      timeout: 30000,
      maxBodyLength: Infinity,
    });

    return normalizePlantnetResponse(response.data, response.headers);
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      const apiData = error.response.data;
      const apiMessage =
        (typeof apiData === 'string' && apiData) ||
        apiData?.message ||
        apiData?.error ||
        `HTTP ${status}`;

      if (status === 429 || /limit|quota|too many/i.test(String(apiMessage))) {
        throw createError(
          429,
          'Se alcanzo el limite diario de solicitudes en Pl@ntNet. Proba mas tarde.',
          apiMessage,
        );
      }

      if (status === 401 || status === 403) {
        throw createError(
          401,
          'La API key de Pl@ntNet es invalida o no tiene permisos.',
          'Revisa PLANTNET_API_KEY en backend/.env y confirma que sea la key oficial de Pl@ntNet.',
        );
      }

      throw createError(
        502,
        'Pl@ntNet no pudo procesar la imagen en este momento.',
        apiMessage,
      );
    }

    if (error.code === 'ECONNABORTED') {
      throw createError(
        504,
        'La solicitud a Pl@ntNet tardo demasiado. Intenta nuevamente.',
        error.message,
      );
    }

    throw createError(
      503,
      'No pudimos conectar con Pl@ntNet. Revisa tu conexion e intenta otra vez.',
      error.message,
    );
  }
};

module.exports = {
  identifyWithPlantnet,
  FAKE_API_KEY,
};

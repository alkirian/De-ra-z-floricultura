import { useEffect, useMemo, useState } from 'react';
import './PlantIdentifier.css';

const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_TYPES = ['image/jpeg', 'image/png'];

const buildEndpoint = (baseUrl) => {
  if (!baseUrl) return '/api/plantnet/identify';
  return `${baseUrl.replace(/\/$/, '')}/api/plantnet/identify`;
};

const formatScore = (score) => {
  if (typeof score !== 'number' || Number.isNaN(score)) return 'No disponible';
  return `${(score * 100).toFixed(1)}%`;
};

const scoreToPercent = (score) => {
  if (typeof score !== 'number' || Number.isNaN(score)) return null;
  return Math.max(0, Math.min(100, score * 100));
};

const getConfidenceLabel = (score) => {
  const percent = scoreToPercent(score);
  if (percent === null) return 'Sin datos';
  if (percent >= 75) return 'Alta';
  if (percent >= 45) return 'Media';
  return 'Baja';
};

const getConfidenceTone = (score) => {
  const percent = scoreToPercent(score);
  if (percent === null) return 'neutral';
  if (percent >= 75) return 'high';
  if (percent >= 45) return 'medium';
  return 'low';
};

const PlantIdentifier = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [backendOnline, setBackendOnline] = useState(true);

  const endpoint = useMemo(
    () => buildEndpoint(import.meta.env.VITE_API_URL?.trim()),
    [],
  );

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl('');
      return undefined;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const apiBase = import.meta.env.VITE_API_URL || '';
        const response = await fetch(`${apiBase}/api/health`);
        setBackendOnline(response.ok);
      } catch (checkError) {
        setBackendOnline(false);
      }
    };

    checkBackend();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    setError('');
    setResult(null);

    if (!file) {
      setSelectedFile(null);
      return;
    }

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setSelectedFile(null);
      setError('Formato no permitido. Subi una imagen JPG o PNG.');
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setSelectedFile(null);
      setError('La imagen supera el limite de 10 MB.');
      return;
    }

    setSelectedFile(file);
  };

  const resetState = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    setResult(null);
    setError('');
    setIsLoading(false);
  };

  const handleIdentify = async () => {
    if (!selectedFile) {
      setError('Primero selecciona una imagen para identificar.');
      return;
    }

    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok || !payload?.success) {
        if (!payload && response.status === 502) {
          setError('La herramienta de identificación no está disponible en este momento. Probá de nuevo en unos minutos.');
          return;
        }

        const backendMessage = payload?.details
          ? `${payload.error} (${payload.details})`
          : payload?.error;

        setError(backendMessage || 'No pudimos identificar la planta con esa imagen.');
        return;
      }

      setResult(payload);
    } catch (requestError) {
      setError(
        'No pudimos analizar la imagen por un problema de conexión. Probá de nuevo en unos minutos.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="plant-identifier card">
      <div className="plant-identifier-header">
        <span className="section-label">Nuevo</span>
        <h3>Descubrí tu planta desde una foto</h3>
        <p>
          Subí una foto nítida de sus hojas o flores y te ayudamos a identificar de qué especie se trata.
        </p>
      </div>

      {!backendOnline && (
        <div className="plant-alert plant-alert-error">
          El identificador automático está tomando un descanso. Escribinos directamente al WhatsApp con una foto y te decimos qué planta es en un ratito.
        </div>
      )}

      <label className="plant-upload-field" htmlFor="plant-image-input">
        <input
          id="plant-image-input"
          type="file"
          accept="image/png,image/jpeg"
          onChange={handleFileChange}
        />
        <span>Seleccionar imagen (JPG o PNG, max 10 MB)</span>
      </label>

      {previewUrl && (
        <div className="plant-preview-wrap">
          <img src={previewUrl} alt="Preview de planta" className="plant-preview" />
        </div>
      )}

      <div className="plant-actions">
        <button type="button" className="btn btn-primary" onClick={handleIdentify} disabled={isLoading}>
          {isLoading ? 'Analizando...' : 'Identificar planta'}
        </button>
        <button type="button" className="btn btn-secondary" onClick={resetState}>
          Limpiar
        </button>
      </div>

      {error && <div className="plant-alert plant-alert-error">{error}</div>}

      {result && (
        <div className="plant-result">
          {result.mock && (
            <div className="plant-alert plant-alert-info">
              Modo mock activo: estas viendo una respuesta simulada porque la API key es ficticia.
            </div>
          )}

          <div className="plant-result-header">
            <span className="plant-result-kicker">Planta identificada</span>
            <h4 className="plant-best-match">{result.bestMatch || 'Sin coincidencia clara'}</h4>

            <div className={`plant-confidence-card plant-confidence-${getConfidenceTone(result.score)}`}>
              <div className="plant-confidence-top">
                <span>Confianza</span>
                <strong>{formatScore(result.score)}</strong>
              </div>
              <div className="plant-confidence-bar" role="presentation">
                <span style={{ width: `${scoreToPercent(result.score) || 0}%` }}></span>
              </div>
              <p>
                Nivel de confianza: <strong>{getConfidenceLabel(result.score)}</strong>
              </p>
            </div>
          </div>

          <div className="plant-result-grid">
            <div className="plant-result-item">
              <span className="plant-result-label">Nombre cientifico</span>
              <p className="plant-result-value">{result.scientificName || 'No disponible'}</p>
            </div>

            <div className="plant-result-item">
              <span className="plant-result-label">Nombres comunes</span>
              <p className="plant-result-value">
              {Array.isArray(result.commonNames) && result.commonNames.length > 0
                ? result.commonNames.join(', ')
                : 'No disponible'}
              </p>
            </div>

            <div className="plant-result-item">
              <span className="plant-result-label">Familia</span>
              <p className="plant-result-value">{result.family || 'No disponible'}</p>
            </div>

            <div className="plant-result-item">
              <span className="plant-result-label">Genero</span>
              <p className="plant-result-value">{result.genus || 'No disponible'}</p>
            </div>

            <div className="plant-result-item plant-result-item-wide">
              <span className="plant-result-label">Requests restantes hoy</span>
              <p className="plant-result-value">
                {result.remainingRequests ?? 'No disponible'}
              </p>
            </div>
          </div>

          {result.generalHealthInfo && (
            <div className="plant-health-info">
              <h5>Posibles enfermedades y plagas comunes</h5>
              <p className="plant-health-subtitle">
                Informacion basada en la especie detectada: <strong>{result.generalHealthInfo.basedOn}</strong>
              </p>
              <div className="plant-health-warning">{result.generalHealthInfo.diagnosisWarning}</div>

              <div className="plant-health-grid">
                <article className="plant-health-card">
                  <h6>Hongos frecuentes</h6>
                  <ul>
                    {result.generalHealthInfo.commonFungalIssues.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>

                <article className="plant-health-card">
                  <h6>Plagas frecuentes</h6>
                  <ul>
                    {result.generalHealthInfo.commonPests.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>

                <article className="plant-health-card">
                  <h6>Sintomas a observar</h6>
                  <ul>
                    {result.generalHealthInfo.symptomsToWatch.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>

                <article className="plant-health-card">
                  <h6>Recomendaciones generales</h6>
                  <ul>
                    {result.generalHealthInfo.generalRecommendations.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              </div>
            </div>
          )}

          <div className="plant-result-actions">
            <button type="button" className="btn btn-secondary" onClick={resetState}>
              Identificar otra imagen
            </button>
          </div>
        </div>
      )}

      <p className="plant-disclaimer">
        Disculpas: la identificación automática no es perfecta. Si la foto está un poco borrosa o tiene poca luz, puede fallar. Si te da dudas, recordá que siempre podés mandarnos una foto al WhatsApp y lo vemos juntos.
      </p>
    </div>
  );
};

export default PlantIdentifier;

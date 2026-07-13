import React from 'react';
import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://alkirian.github.io/De-ra-z-floricultura';
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-cover.webp`;

const normalizePath = (path = '/') => {
  if (!path.startsWith('/')) return `/${path}`;
  return path;
};

/**
 * SEO component — gestiona metaetiquetas dinámicas por página.
 * @param {string}  title       — Título de la página (max 60 caracteres)
 * @param {string}  description — Meta description (max 160 caracteres)
 * @param {string}  [path='/']  — Ruta relativa para el canonical
 * @param {string}  [image]     — URL absoluta de la imagen OG (opcional)
 * @param {object}  [jsonLd]    — Objeto JSON-LD de datos estructurados
 * @param {boolean} [noindex]   — Si es true, bloquea indexación de la página
 */
const SEO = ({ title, description, path = '/', image, jsonLd, noindex = false }) => {
  const canonical = `${SITE_URL}${normalizePath(path)}`;
  const ogImage = image || DEFAULT_OG_IMAGE;

  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex, follow" />}

      {/* Open Graph — WhatsApp, Facebook, LinkedIn */}
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="es_UY" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content="De Raíz Floricultura" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="De Raíz Floricultura — Vivero en Las Piedras, Uruguay" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {jsonLd ? <script type="application/ld+json">{JSON.stringify(jsonLd)}</script> : null}
    </Helmet>
  );
};

export default SEO;

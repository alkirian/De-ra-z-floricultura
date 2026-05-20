import React from 'react';
import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://alkirian.github.io/De-ra-z-floricultura';

const normalizePath = (path = '/') => {
  if (!path.startsWith('/')) return `/${path}`;
  return path;
};

const SEO = ({ title, description, path = '/', jsonLd }) => {
  const canonical = `${SITE_URL}${normalizePath(path)}`;

  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content="De Raiz Floricultura" />
      {jsonLd ? <script type="application/ld+json">{JSON.stringify(jsonLd)}</script> : null}
    </Helmet>
  );
};

export default SEO;

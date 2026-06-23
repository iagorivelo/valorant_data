// URL pública do site, usada por metadata (Open Graph), sitemap e robots.
// Defina NEXT_PUBLIC_SITE_URL no ambiente de deploy; o fallback cobre o local.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://valorant-data.vercel.app'
).replace(/\/+$/, '');

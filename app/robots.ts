import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/utils/site';

// Libera todo o site para indexação e aponta para o sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}

import type { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://portfolio.ricardomboukou.online';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/fr/admin/', '/en/admin/', '/fr/auth/', '/en/auth/'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

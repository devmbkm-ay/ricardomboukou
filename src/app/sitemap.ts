import type { MetadataRoute } from 'next';
import prisma from '@/lib/prisma';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://portfolio.ricardomboukou.online';
const locales = ['fr', 'en'] as const;

const staticRoutes = ['', '/about', '/projects', '/contact'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.flatMap((route) =>
    locales.map((lang) => ({
      url: `${SITE_URL}/${lang}${route}`,
      lastModified: now,
      changeFrequency: route === '' ? ('weekly' as const) : ('monthly' as const),
      priority: route === '' ? 1.0 : 0.8,
    }))
  );

  let projectEntries: MetadataRoute.Sitemap = [];
  try {
    const projects = await prisma.project.findMany({
      select: { id: true, updatedAt: true },
    });

    projectEntries = projects.flatMap((project) =>
      locales.map((lang) => ({
        url: `${SITE_URL}/${lang}/projects/${project.id}`,
        lastModified: project.updatedAt,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }))
    );
  } catch {
    // DB unavailable at build time — skip dynamic entries
  }

  return [...staticEntries, ...projectEntries];
}

import type { Metadata } from 'next';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Project } from '@prisma/client';
import ProjectDetailClient from './project-detail-client';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}): Promise<Metadata> {
  const { lang, id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) return {};

  const isFr = lang === 'fr';
  const title = isFr ? project.titleFr : project.titleEn;
  const description = isFr ? project.descriptionFr : project.descriptionEn;

  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}/projects/${id}`,
      languages: {
        fr: `/fr/projects/${id}`,
        en: `/en/projects/${id}`,
        'x-default': `/fr/projects/${id}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `/${lang}/projects/${id}`,
      images: project.imageUrl ? [{ url: project.imageUrl, alt: title }] : [],
    },
  };
}

async function getProject(id: string): Promise<Project | null> {
  const project = await prisma.project.findUnique({
    where: { id },
  });
  return project;
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  // This is a workaround for a strange Next.js/Turbopack bug where params is a promise
  const resolvedParams = await params; 
  
  const project = await getProject(resolvedParams.id);

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={project} />;
}

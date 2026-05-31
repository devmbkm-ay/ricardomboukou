import type { Metadata } from 'next';
import prisma from '@/lib/prisma';
import ProjectListClient from './project-list-client';
import { Suspense } from 'react';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isFr = lang === 'fr';

  return {
    title: isFr ? 'Projets' : 'Projects',
    description: isFr
      ? "Sélection de projets web illustrant mes compétences en développement fullstack, SEO technique et intégration IA : Kiff Cleaning, QuizFlip, Noce Florale et plus."
      : "A selection of web projects showcasing fullstack development, technical SEO and AI integration: Kiff Cleaning, QuizFlip, Noce Florale and more.",
    alternates: {
      canonical: `/${lang}/projects`,
      languages: {
        fr: '/fr/projects',
        en: '/en/projects',
        'x-default': '/fr/projects',
      },
    },
    openGraph: {
      url: `/${lang}/projects`,
    },
  };
}

export const dynamic = 'force-dynamic';

// This is the Server Component that fetches data
export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <Suspense fallback={<div>Loading projects...</div>}>
      <ProjectListClient projects={projects} />
    </Suspense>
  );
}

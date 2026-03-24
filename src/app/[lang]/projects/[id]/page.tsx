import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Project } from '@prisma/client';
import ProjectDetailClient from './project-detail-client';

export const dynamic = 'force-dynamic';

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

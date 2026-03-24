import prisma from '@/lib/prisma';
import ProjectListClient from './project-list-client';
import { Suspense } from 'react';

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

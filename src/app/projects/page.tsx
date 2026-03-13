// src/app/projects/page.tsx
import { Metadata } from 'next';
import prisma from '@/lib/prisma';
import { Suspense } from 'react';
import { Sparkles } from 'lucide-react';
import ProjectList from '@/components/shared/ProjectList'; 

export const metadata: Metadata = {
  title: 'Projects | Ricardo - Full-Stack Developer',
  description: 'Explore my portfolio of web applications built with modern technologies.',
};

// A simpler skeleton for the data-fetching part
function ProjectsSkeleton() {
  return (
    <div className="text-center text-zinc-400">
      <p>Loading projects...</p>
    </div>
  );
}

// The data fetching function
async function getProjects() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return projects;
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <section className="min-h-screen bg-zinc-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl" />

      <div className="container mx-auto py-20 px-4 relative z-10">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-300">Portfolio</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              My Projects
            </span>
          </h1>
          
          <p className="text-xl text-zinc-400 leading-relaxed">
            A collection of web applications I&apos;ve built, ranging from SaaS platforms to open-source tools. 
            Each project represents a unique challenge and learning experience.
          </p>
        </div>

        {/* Use the new Client Component for the interactive list */}
        <Suspense fallback={<ProjectsSkeleton />}>
          <ProjectList projects={projects} />
        </Suspense>
        
      </div>
    </section>
  );
}

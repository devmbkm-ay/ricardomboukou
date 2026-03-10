// app/projects/page.tsx (or pages/projects.tsx)
import { Metadata } from 'next';
import ProjectCard from '@/components/shared/project-card';
import prisma from '@/lib/prisma';
import { Project } from '@prisma/client';
import { Suspense } from 'react';
import { ArrowRight, Sparkles, Filter } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Projects | Ricardo - Full-Stack Developer',
  description: 'Explore my portfolio of web applications built with modern technologies.',
};

// Loading Skeleton
function ProjectsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-96 bg-zinc-900/50 rounded-2xl animate-pulse border border-zinc-800" />
      ))}
    </div>
  );
}

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10, // Limit for performance
  });

  const featuredProject = projects[0];
  const otherProjects = projects.slice(1);

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

          {/* Stats */}
          <div className="flex justify-center gap-8 mt-8 pt-8 border-t border-zinc-800">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{projects.length}</div>
              <div className="text-sm text-zinc-500 uppercase tracking-wider">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">
                {projects.filter((p: Project) => p.technologies?.includes('TypeScript')).length}
              </div>
              <div className="text-sm text-zinc-500 uppercase tracking-wider">TypeScript</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">
                {new Set(projects.flatMap((p: Project) => p.technologies)).size}
              </div>
              <div className="text-sm text-zinc-500 uppercase tracking-wider">Technologies</div>
            </div>
          </div>
        </div>

        {/* Filter Bar (Visual Only - can be made functional) */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {['All', 'React', 'Next.js', 'Node.js', 'Full Stack'].map((filter, i) => (
            <button
              key={filter}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all
                ${i === 0 
                  ? 'bg-white text-black' 
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-white'
                }
              `}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <Suspense fallback={<ProjectsSkeleton />}>
          <div className="space-y-8">
            {/* Featured Project */}
            {featuredProject && (
              <div className="mb-12">
                <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> Featured Project
                </h2>
                <ProjectCard
                  projects={[featuredProject]}
                />
              </div>
            )}

            {/* Other Projects */}
            {otherProjects.length > 0 && (
              <>
                <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-4">
                  More Projects
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {otherProjects.map((project: Project) => (
                    <ProjectCard
                      key={project.id || project.title}
                      projects={[project]}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </Suspense>

        {/* CTA Section */}
        {/* <div className="mt-20 text-center">
          <div className="inline-flex flex-col items-center gap-4 p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white">Have a project in mind?</h3>
            <p className="text-zinc-400 max-w-md">
              I&apos;m always open to discussing new opportunities and interesting projects.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-zinc-200 transition-colors group"
            >
              Let&apos;s Talk <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div> */}
      </div>
    </section>
  );
}
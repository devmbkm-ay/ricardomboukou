// src/app/projects/page.tsx
import { Metadata } from 'next';
import { Project } from '@prisma/client';
import { Suspense } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import ProjectFilterAndList from '@/components/shared/ProjectFilterAndList';

export const metadata: Metadata = {
  title: 'Projects | Ricardo - Full-Stack Developer',
  description: 'Explore my portfolio of web applications built with modern technologies.',
};


// --- MOCK DATA FETCHING ---
// TODO: Replace this with your actual Prisma data fetching logic
async function getProjects(techFilter?: string): Promise<Project[]> {
  const allProjects: Project[] = [
    { id: '1', title: 'Project A', description: 'Desc A', technologies: ['React', 'Next.js'], createdAt: new Date(), liveUrl: '#' },
    { id: '2', title: 'Project B', description: 'Desc B', technologies: ['Node.js', 'TypeScript'], createdAt: new Date(), liveUrl: '#' },
    { id: '3', title: 'Project C', description: 'Desc C', technologies: ['React', 'TypeScript'], createdAt: new Date(), liveUrl: '#' },
    { id: '4', title: 'Project D', description: 'Desc D', technologies: ['Full Stack', 'Next.js'], createdAt: new Date(), liveUrl: '#' },
  ];
  if (techFilter) {
    return allProjects.filter(p => p.technologies.includes(techFilter));
  }
  return allProjects;
}

async function getTechnologies(): Promise<string[]> {
  return ['React', 'Next.js', 'Node.js', 'TypeScript', 'Full Stack'];
}
// --- END MOCK DATA ---


// --- LOADING SKELETON ---
function ProjectsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-96 bg-zinc-900/50 rounded-2xl animate-pulse border border-zinc-800" />
      ))}
    </div>
  );
}

// --- THE SERVER COMPONENT ---
export default async function ProjectsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const techFilter = typeof searchParams?.tech === 'string' ? searchParams.tech : undefined;
  
  const [projects, technologies, allProjectsForStats] = await Promise.all([
    getProjects(techFilter),
    getTechnologies(),
    getProjects(), // Get all for stats and featured project
  ]);
  
  const featuredProject = allProjectsForStats.sort((a,b) => b.createdAt.getTime() - a.createdAt.getTime())[0];

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
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-8 mt-8 pt-8 border-t border-zinc-800">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{allProjectsForStats.length}</div>
              <div className="text-sm text-zinc-500 uppercase tracking-wider">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">
                {allProjectsForStats.filter((p) => p.technologies?.includes('TypeScript')).length}
              </div>
              <div className="text-sm text-zinc-500 uppercase tracking-wider">TypeScript</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{technologies.length}</div>
              <div className="text-sm text-zinc-500 uppercase tracking-wider">Technologies</div>
            </div>
          </div>
        </div>

        <Suspense fallback={<ProjectsSkeleton />}>
          <ProjectFilterAndList 
            projects={projects} 
            technologies={technologies}
            featuredProject={featuredProject}
          />
        </Suspense>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="inline-flex flex-col items-center gap-4 p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white">Have a project in mind?</h3>
            <p className="text-zinc-400 max-w-md">
              I&apos;m always open to discussing new opportunities and interesting projects.
            </p>
            <a href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-zinc-200 transition-colors group">
              Let&apos;s Talk <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

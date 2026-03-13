'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Project } from '@prisma/client';
import ProjectCard from './project-card';
import { Sparkles } from 'lucide-react';

interface ProjectListProps {
  projects: Project[];
  technologies: string[];
  featuredProject?: Project;
}

export default function ProjectFilterAndList({ projects, technologies, featuredProject }: ProjectListProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTech = searchParams.get('tech');

  const handleFilterClick = (tech: string) => {
    const params = new URLSearchParams(searchParams);
    if (tech === 'All') {
      params.delete('tech');
    } else {
      params.set('tech', tech);
    }
    // Using router.push to navigate to the new URL without a full page reload
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };
  
  const otherProjects = featuredProject ? projects.filter(p => p.id !== featuredProject.id) : projects;

  return (
    <>
      {/* Functional Filter Bar */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {['All', ...technologies].map((tech) => {
          const isActive = (tech === 'All' && !currentTech) || currentTech === tech;
          return (
            <button
              key={tech}
              onClick={() => handleFilterClick(tech)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                isActive
                  ? 'bg-white text-black'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-white'
              }`}
            >
              {tech}
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <div className="space-y-8">
        {/* Featured Project (only shows if no filter is active) */}
        {featuredProject && !currentTech && (
          <div className="mb-12">
            <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Featured Project
            </h2>
            <ProjectCard {...featuredProject} />
          </div>
        )}

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <>
            {!currentTech && featuredProject && (
               <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-4">
                More Projects
               </h2>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {otherProjects.map((project) => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </div>
          </>
        )}
        
        {projects.length === 0 && (
           <div className="text-center py-12">
             <p className="text-zinc-400">No projects found for the selected technology.</p>
           </div>
        )}
      </div>
    </>
  );
}

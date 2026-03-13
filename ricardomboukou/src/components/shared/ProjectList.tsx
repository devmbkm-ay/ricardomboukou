"use client";

import { useState, useMemo } from 'react';
import { Project } from '@prisma/client';
import ProjectCard from '@/components/shared/project-card';
import { Sparkles } from 'lucide-react';

interface ProjectListProps {
  projects: Project[];
}

export default function ProjectList({ projects }: ProjectListProps) {
  const [activeFilter, setActiveFilter] = useState('All');

  // Dynamically create a unique list of technologies from all projects
  const allTechnologies = useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach(p => {
      p.technologies?.forEach(tech => techSet.add(tech));
    });
    return ['All', ...Array.from(techSet).sort()];
  }, [projects]);

  // Filter projects based on the active filter
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') {
      return projects;
    }
    return projects.filter(p => p.technologies?.includes(activeFilter));
  }, [activeFilter, projects]);
  
  const featuredProject = filteredProjects[0];
  const otherProjects = filteredProjects.slice(1);

  return (
    <div>
      {/* Interactive Filter Bar */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {allTechnologies.map(tech => (
          <button
            key={tech}
            onClick={() => setActiveFilter(tech)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-all
              ${activeFilter === tech
                ? 'bg-white text-black'
                : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-white'
              }
            `}
          >
            {tech}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="space-y-8">
        {/* Featured Project */}
        {featuredProject && (
          <div className="mb-12">
            <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> 
              {activeFilter === 'All' ? 'Featured Project' : `Top Project in ${activeFilter}`}
            </h2>
            <ProjectCard {...featuredProject}/>
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
                  {...project}
                />
              ))}
            </div>
          </>
        )}

        {/* No Results Message */}
        {filteredProjects.length === 0 && (
            <div className="text-center py-16">
                <p className="text-xl text-zinc-400">No projects found for &quot;{activeFilter}&quot;.</p>
                <button 
                    onClick={() => setActiveFilter('All')} 
                    className="mt-4 text-purple-400 hover:text-purple-300 transition-colors"
                >
                    Show All Projects
                </button>
            </div>
        )}
      </div>
    </div>
  );
}

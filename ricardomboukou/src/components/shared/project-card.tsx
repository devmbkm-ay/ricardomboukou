// This is a placeholder component.
// Replace this with your actual ProjectCard component code.
import { Project } from '@prisma/client';
import { ExternalLink } from 'lucide-react';

export default function ProjectCard(project: Project) {
  return (
    <div className="h-96 bg-zinc-900/50 rounded-2xl border border-zinc-800 p-6 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-zinc-400 text-sm mb-4">{project.description}</p>
      </div>
      <div className="flex flex-col items-start">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map(tech => (
            <span key={tech} className="px-2 py-1 text-xs bg-purple-500/10 text-purple-300 rounded-full">
              {tech}
            </span>
          ))}
        </div>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-white hover:text-purple-400 transition-colors"
          >
            View Live <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
}

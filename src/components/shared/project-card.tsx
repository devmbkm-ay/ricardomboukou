// src/components/shared/project-card.tsx
import Image from 'next/image';
import Link from 'next/link';

// Add imageUrl, projectUrl, and githubUrl to your props
type ProjectCardProps = {
  title: string;
  description: string;
  imageUrl?: string | null;
  projectUrl?: string | null;
  githubUrl?: string | null;
  technologies: string[];
  // isFeatured?: boolean; // Optional: Flag to indicate if this is a featured project
};

const ProjectCard = ({
  title,
  description,
  imageUrl,
  projectUrl,
  githubUrl,
  technologies,
  // isFeatured = false,
}: ProjectCardProps) => {
  return (
    // Added group for hover effects and transition classes for smooth animations
    <div className="group relative flex flex-col rounded-lg border border-zinc-700 bg-zinc-800 p-6 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-sky-500/50 hover:shadow-lg hover:shadow-sky-500/10">
      
      {/* 1. Project Image */}
      {imageUrl && (
        <div className="relative mb-4 h-40 w-full contain overflow-hidden rounded-md">
          <Image
            src={imageUrl}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}

      {/* 2. Title and Links */}
      <div className="flex items-start justify-between">
        <h3 className="text-xl font-bold text-zinc-100">{title}</h3>
        <div className="flex items-center gap-4">
          {githubUrl && (
            <Link href={githubUrl} target="_blank" rel="noopener noreferrer" title="GitHub Repository">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400 transition-colors hover:text-sky-400"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
            </Link>
          )}
          {projectUrl && (
            <Link href={projectUrl} target="_blank" rel="noopener noreferrer" title="Live Demo">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400 transition-colors hover:text-sky-400"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </Link>
          )}
        </div>
      </div>
      
      {/* 3. Description and Technologies */}
      <p className="mt-2 flex-grow text-zinc-400">{description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {technologies?.map((tech) => (
          <span key={tech} className="rounded-full bg-zinc-700/50 px-3 py-1 text-xs font-medium text-sky-300">
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;
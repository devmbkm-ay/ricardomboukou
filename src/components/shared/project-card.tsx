// app/projects/projects-list.tsx
'use client';

import Image from "next/image";
import Link from "next/link";

type Project = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  projectUrl?: string;
  githubUrl?: string;
};

type ProjectCardProps = {
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  projectUrl?: string;
  githubUrl?: string;
  index: number;
};

function ProjectCard({ 
  title, 
  description, 
  technologies, 
  // imageUrl, 
  // projectUrl, 
  // githubUrl, 
  // index 

}: ProjectCardProps) {
  return (
    <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-6 flex flex-col">
      {/* {imageUrl && <Image src={imageUrl} alt={title} width={400} height={225} />} */}
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-zinc-400 flex-grow mb-4">{description}</p>
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <span key={tech} className="bg-zinc-700 text-zinc-300 text-xs font-medium px-2.5 py-1 rounded-full">
            {tech}
          </span>
        ))}
      </div>
      {/* {projectUrl && <Link  href={projectUrl} className="text-blue-400 hover:text-blue-300">
        View Project
      </Link >}
      {githubUrl && <Link  href={githubUrl} className="text-blue-400 hover:text-blue-300">
        GitHub
      </Link >} */}
    </div>
  );
}

export default function ProjectsList({ projects }: { projects?: Project[] }) {
  // Handle undefined or empty array
  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-12 text-zinc-500">
        <p>No projects found.</p>
      </div>
    );
  }

  return (
    <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-6 flex flex-col">
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id}
          title={project.title}
          description={project.description}
          technologies={project.technologies}
          // imageUrl={project.imageUrl}
          // projectUrl={project.projectUrl}
          // githubUrl={project.githubUrl}
          index={index}
        />
      ))}
    </div>
  );
}
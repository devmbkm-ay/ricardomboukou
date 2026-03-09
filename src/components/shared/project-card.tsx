//Props for the ProjectCard component
type ProjectCardProps = {
    title: string;
    description: string;
    // imageUrl: string;
    // projectUrl: string;
    technologies: string[];
}

//This function accepts a project object as a prop and display its title, description, and technologies
const ProjectCard =({title, description, technologies}: ProjectCardProps) => {
    return(
         <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-6 flex flex-col">
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-zinc-400 flex-grow mb-4">{description}</p>
            <div className="flex flex-wrap gap-2">
                {technologies.map((tech) => (
                <span key={tech} className="bg-zinc-700 text-zinc-300 text-xs font-medium px-2.5 py-1 rounded-full">
                    {tech}
                </span>
                ))}
            </div>
    </div>
    )
}

export default ProjectCard;
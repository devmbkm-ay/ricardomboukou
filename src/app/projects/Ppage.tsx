import ProjectCard from "@/components/shared/project-card";
import prisma from "@/lib/prisma";
import { Project } from "@prisma/client";


export default async function ProjectsPage() {

   const projects = await prisma.project.findMany({
    orderBy: {
      createdAt: 'desc' // Optional: order projects by newest first
    }
  });

    return(
        <section className="container mx-auto py-12 px-4">
            <h1 className="text-4xl font-bold tracking-tight text-center mb-10">
                My Projects
            </h1>
            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project:Project) => (
                <ProjectCard
                    key={project.title}
                    projects={[project]}
                />
                ))}
            </div> */}
        </section>
    )
}

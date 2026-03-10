import ProjectCard from "@/components/shared/project-card";
import prisma from "@/lib/prisma";
import { Project } from "@prisma/client";

// Initialize the Prisma Client
// const prisma = new PrismaClient();


// Sample project data - replace with real projects
// In the future, I will fetch this data from an API or a CMS
// const projects = [
//       {
//     title: 'Portfolio Website',
//     description: 'The very website you are looking at, built with Next.js, TypeScript, and Tailwind CSS. Deployed on Vercel.',
//     technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
//   },
//   {
//     title: 'Task Management App',
//     description: 'A full-stack application for managing tasks, with user authentication and a real-time database.',
//     technologies: ['React', 'Node.js', 'PostgreSQL', 'Prisma'],
//   },
//   {
//     title: 'E-commerce Storefront',
//     description: 'A headless e-commerce frontend with a clean, modern design, connected to a third-party API for products and checkout.',
//     technologies: ['Next.js', 'Stripe', 'GraphQL'],
//   },
//   {
//     title: 'Data Visualization Dashboard',
//     description: 'A dashboard for visualizing complex data sets using interactive charts and graphs.',
//     technologies: ['D3.js', 'React', 'FastAPI'],
//   },
// ]



export default async function ProjectsPage() {

  // Fetch projects from the database
  // const [projects, setProjects] = useState([]);

  // useEffect(() => {
  //   async function fetchProjects() {
  //     try {
  //       const response = await fetch('/api/projects');
  //       const data = await response.json();
  //       setProjects(data);
  //     } catch (error) {
  //       console.error('Error fetching projects:', error);
  //     }
  //   }

  //   fetchProjects();
  // }, []);

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project:Project) => (
            <ProjectCard
                key={project.title}
                title={project.title}
                description={project.description}
                technologies={project.technologies}
            />
            ))}
        </div>
    </section>
    )
}

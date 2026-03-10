import { PrismaClient } from '@prisma/client';

// Initialize the Prisma Client
const prisma = new PrismaClient();

const projects = [
  {
    title: 'Portfolio Website',
    description: 'The very website you are looking at, built with Next.js, TypeScript, and Tailwind CSS. Deployed on Vercel.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
  },
  {
    title: 'Task Management App',
    description: 'A full-stack application for managing tasks, with user authentication and a real-time database.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Prisma'],
  },
  {
    title: 'E-commerce Storefront',
    description: 'A headless e-commerce frontend with a clean, modern design, connected to a third-party API for products and checkout.',
    technologies: ['Next.js', 'Stripe', 'GraphQL'],
  },
  {
    title: 'Data Visualization Dashboard',
    description: 'A dashboard for visualizing complex data sets using interactive charts and graphs.',
    technologies: ['D3.js', 'React', 'FastAPI'],
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const project of projects) {
    const result = await prisma.project.create({
      data: project,
    });
    console.log(`Created project with id: ${result.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
// prisma/seed.ts
import 'dotenv/config'; // Ensures .env file is read
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

// Create connection to PostgreSQL using pg Pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Create an instance of the Prisma adapter for PostgreSQL
const adapter = new PrismaPg(pool);

//Pass the adapter to PrismaClient constructor
const prisma = new PrismaClient({adapter});

// Your project data
const projects = [
  {
    title: 'Portfolio Website',
    description: 'The very website you are looking at, built with Next.js, TypeScript, and Tailwind CSS. Deployed on Vercel.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    imageUrl: '/images/portfolio.png', // Using a placeholder, replace with your actual image path in /public
    projectUrl: 'https://ricardomboukou.vercel.app/projects',
    githubUrl: 'https://github.com/ricardomboukou/portfolio',
  },
  {
    title: 'Task Management App',
    description: 'A full-stack application for managing tasks, with user authentication and a real-time database.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Prisma'],
    imageUrl: '/images/portfolio.png', // Using a placeholder, replace with your actual image path in /public
    projectUrl: 'https://ricardomboukou.vercel.app/projects',
    githubUrl: 'https://github.com/ricardomboukou/task-app',
  },
  {
    title: 'E-commerce Storefront',
    description: 'A headless e-commerce frontend with a clean, modern design, connected to a third-party API for products and checkout.',
    technologies: ['Next.js', 'Stripe', 'GraphQL'],
    imageUrl: '/images/portfolio.png', // Using a placeholder, replace with your actual image path in /public
    projectUrl: 'https://ricardomboukou.vercel.app/projects',
    githubUrl: 'https://github.com/ricardomboukou/ecommerce',
  },
  {
    title: 'Data Visualization Dashboard',
    description: 'A dashboard for visualizing complex data sets using interactive charts and graphs.',
    technologies: ['D3.js', 'React', 'FastAPI'],
    imageUrl: '/images/portfolio.png', // Using a placeholder, replace with your actual image path in /public
    projectUrl: 'https://ricardomboukou.vercel.app/projects',
    githubUrl: 'https://github.com/ricardomboukou/dashboard',
  },
  {
    title: 'Blog Platform',
    description: 'A simple yet powerful blog platform built with React and Markdown.',
    technologies: ['React', 'Markdown', 'Node.js'],
    imageUrl: '/images/portfolio.png', // Using a placeholder, replace with your actual image path in /public
    projectUrl: 'https://ricardomboukou.vercel.app/projects',
    githubUrl: 'https://github.com/ricardomboukou/blog',
  }
];

async function main() {
  console.log(`Start seeding ...`);

  for (const projectData of projects) {
    const project = await prisma.project.upsert({
      where: { title: projectData.title }, // Assumes title is unique
      update: projectData, // Update with all data from the object
      create: projectData, // Create with all data from the object
    });
    console.log(`Upserted project with id: ${project.id}`);
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
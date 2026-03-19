// prisma/seed.ts
import 'dotenv/config'; // Ensures .env file is read
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { projects } from './data/projects';

// Create connection to PostgreSQL using pg Pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Create an instance of the Prisma adapter for PostgreSQL
const adapter = new PrismaPg(pool);

//Pass the adapter to PrismaClient constructor
const prisma = new PrismaClient({ adapter });


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
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { projectsToAdd } from './data/projects';

const prisma = new PrismaClient();

async function main() {
  for (const project of projectsToAdd) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project,
    });
  }

  console.log('✅ Projects seeded.');
}

main()
  .catch((error) => {
    console.error('❌ Error while seeding projects:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// prisma/seed.ts
import 'dotenv/config'; // Ensures .env file is read
import { PrismaClient } from '@prisma/client';
import { projects } from './data/projects';
import { users } from './data/users'
import * as bcrypt from 'bcrypt';
const prisma = new PrismaClient();

async function seedProjects() {
  console.log('🌱 Seeding projects...');

  for (const projectData of projects) {
    await prisma.project.upsert({
      where: { slug: projectData.slug },
      update: projectData,
      create: projectData
    })
  }
}

async function seedUsers() {
  console.log('🌱 Seeding projects...')

  for (const userData of users) {
    const hashedPassword = await bcrypt.hash(userData.password, 10)

    await prisma.user.upsert({
      where: { email: userData.email },
      update: {
        name: userData.name,
        password: hashedPassword
      },
      create: {
        name: userData.name,
        email: userData.email,
        password: hashedPassword

      }
    })
  }
}

async function main() {
  try {
    await seedProjects()
    await seedUsers()
  } catch (error) {
    console.error('❌ Erreur lors du seeding:', error)
    process.exit(1)
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { projects } from './data/projects';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function deleteSeedProjects() {
    console.log('🧹 Deleting seeded projects...');

    const slugs = projects.map((project) => project.slug)

    const result = await prisma.project.deleteMany({
        where: {
            slug: {
                in: slugs
            }
        }
    })
    console.log(`✅ ${result.count} project(s) deleted.`);

}

async function main() {
    try {
        await deleteSeedProjects()
    } catch (error) {
        console.error('❌ Error while deleting projects:', error);
        process.exit(1)
    }
}
main()

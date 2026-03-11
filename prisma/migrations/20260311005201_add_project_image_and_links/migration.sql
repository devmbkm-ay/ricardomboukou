-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "githubUrl" TEXT,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "isFeatured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "projectUrl" TEXT;

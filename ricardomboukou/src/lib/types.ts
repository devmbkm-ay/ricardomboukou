// This is a placeholder based on our last conversation.
// Replace it with your actual Prisma-generated types if they differ.

declare global {
  namespace Prisma {
    interface Project {
      id: string;
      title: string;
      description: string;
      technologies: string[];
      imageUrl?: string;
      githubUrl?: string;
      liveUrl?: string;
      createdAt: Date;
    }
  }
}

// This export is needed to satisfy TypeScript's module system
export {};

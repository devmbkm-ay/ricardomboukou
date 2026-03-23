import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { jwtVerify } from 'jose';

// This is a protected route. The middleware should handle authentication.
// We can add an extra layer of verification here if needed.

export async function POST(req: Request) {
  try {
    // Optional: Re-verify token if you want route-specific checks
    const token = req.cookies.get('token')?.value || '';
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    try {
      await jwtVerify(token, secret);
    } catch (err) {
      return NextResponse.json({ error: 'Unauthorized: Invalid token' }, { status: 401 });
    }

    const body = await req.json();
    const {
      slug,
      title,
      description,
      technologies,
      imageUrl,
      projectUrl,
      githubUrl,
    } = body;

    // Basic validation
    if (!slug || !title || !description || !technologies) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newProject = await prisma.project.create({
      data: {
        slug,
        title,
        description,
        technologies,
        imageUrl,
        projectUrl,
        githubUrl,
      },
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error('Failed to create project:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

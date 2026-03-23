import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { jwtVerify } from 'jose';
import { revalidatePath } from 'next/cache';

type RouteContext = {
  params: {
    id: string;
  };
};

export async function DELETE(req: NextRequest, { params }: RouteContext) {
  try {
    // Optional: Re-verify token
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

    const { id } = params;

    if (!id) {
        return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }

    await prisma.project.delete({
      where: {
        id: id,
      },
    });
    
    revalidatePath('/projects');
    revalidatePath('/admin/dashboard');

    return NextResponse.json({ message: 'Project deleted successfully' }, { status: 200 });
  } catch (error) {
    const { id } = params;
    console.error(`Failed to delete project ${id}:`, error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: RouteContext) {
    try {
      // Optional: Re-verify token
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
  
      const { id } = params;
      const body = await req.json();
  
      const updatedProject = await prisma.project.update({
        where: { id },
        data: body,
      });

      revalidatePath('/projects');
      revalidatePath(`/projects/${id}`);
      revalidatePath('/admin/dashboard');
  
      return NextResponse.json(updatedProject, { status: 200 });
    } catch (error) {
      const { id } = params;
      console.error(`Failed to update project ${id}:`, error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

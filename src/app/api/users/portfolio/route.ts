import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET user's portfolio projects
export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const portfolioProjects = await prisma.portfolioProject.findMany({
      where: {
        userId: userId
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(portfolioProjects);
  } catch (error) {
    console.error('Error fetching portfolio projects:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST new portfolio project
export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, description, link } = await req.json();

    if (!title || !description) {
      return NextResponse.json({ error: 'Title and description are required' }, { status: 400 });
    }

    const project = await prisma.portfolioProject.create({
      data: {
        title,
        description,
        link,
        userId
      }
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error creating portfolio project:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// PUT update portfolio project
export async function PUT(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, title, description, link } = await req.json();

    if (!id || !title || !description) {
      return NextResponse.json({ error: 'ID, title, and description are required' }, { status: 400 });
    }

    // Verify project belongs to user
    const existingProject = await prisma.portfolioProject.findFirst({
      where: {
        id,
        userId
      }
    });

    if (!existingProject) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    const project = await prisma.portfolioProject.update({
      where: { id },
      data: {
        title,
        description,
        link
      }
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error updating portfolio project:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE portfolio project
export async function DELETE(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }

    // Verify project belongs to user
    const existingProject = await prisma.portfolioProject.findFirst({
      where: {
        id,
        userId
      }
    });

    if (!existingProject) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    await prisma.portfolioProject.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting portfolio project:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 
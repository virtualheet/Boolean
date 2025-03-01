import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if the user owns the project
    const project = await prisma.userCreatedproject.findUnique({
      where: { 
        id: params.projectId,
        userId: userId // Additional check for ownership
      },
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found or unauthorized' }, { status: 404 });
    }

    // Fetch proposals with user information
    const proposals = await prisma.proposal.findMany({
      where: {
        projectId: params.projectId,
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            username: true,
            profileImage: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ 
      proposals,
      message: 'Proposals fetched successfully'
    });
  } catch (error) {
    console.error('Error fetching proposals:', error);
    return NextResponse.json(
      { error: 'Failed to fetch proposals' },
      { status: 500 }
    );
  }
} 
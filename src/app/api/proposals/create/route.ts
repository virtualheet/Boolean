import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { projectId, coverLetter } = await req.json();

    if (!projectId || !coverLetter) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if user has enough credits
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user || user.cradits < 1) {
      return NextResponse.json({ error: 'Insufficient credits' }, { status: 400 });
    }

    // Check if project exists
    const project = await prisma.userCreatedproject.findUnique({
      where: { id: projectId }
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    try {
      // Create proposal directly
      const newProposal = await prisma.proposal.create({
        data: {
          userId : userId,
          projectId : projectId,
          coverLetter : coverLetter,
          status: "pending"
        }
      });

      // Update user credits
      await prisma.user.update({
        where: { id: userId },
        data: {
          cradits: {
            decrement: 1
          }
        }
      });

      return NextResponse.json({ 
        success: true,
        message: "Proposal submitted successfully",
        proposal: newProposal
      });

    } catch (createError) {
      console.error('Error creating proposal:', createError);
      return NextResponse.json({ 
        success: false,
        error: "Failed to create proposal" 
      }, { status: 400 });
    }

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ 
      success: false,
      error: "Something went wrong" 
    }, { status: 500 });
  }
} 
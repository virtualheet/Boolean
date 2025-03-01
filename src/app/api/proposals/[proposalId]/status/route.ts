import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(
  req: Request,
  { params }: { params: { proposalId: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { status } = await req.json();

    if (!['pending', 'accepted', 'rejected'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status value' },
        { status: 400 }
      );
    }

    // Get the proposal with project details
    const proposal = await prisma.proposal.findUnique({
      where: { id: params.proposalId },
      include: {
        project: {
          select: {
            userId: true,
          },
        },
      },
    });

    if (!proposal) {
      return NextResponse.json(
        { error: 'Proposal not found' },
        { status: 404 }
      );
    }

    if (proposal.project.userId !== userId) {
      return NextResponse.json(
        { error: 'Unauthorized - Only project owner can update proposal status' },
        { status: 401 }
      );
    }

    // Start a transaction to update both proposal and freelancer status
    const result = await prisma.$transaction(async (tx) => {
      // Update the proposal status
      const updatedProposal = await tx.proposal.update({
        where: { id: params.proposalId },
        data: { status },
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              username: true,
            },
          },
        },
      });

      // If the proposal is accepted
      if (status === 'accepted') {
        // Create freelancer status if it doesn't exist
        await tx.asFreelancer.create({
          data: {
            userId: proposal.userId,
          },
        }).catch(() => {
          // Ignore error if freelancer status already exists
          console.log('Freelancer status already exists for user:', proposal.userId);
        });

        // Reject all other pending proposals for this project
        await tx.proposal.updateMany({
          where: {
            projectId: proposal.projectId,
            id: { not: params.proposalId },
            status: 'pending',
          },
          data: {
            status: 'rejected',
          },
        });
      }

      return updatedProposal;
    });

    return NextResponse.json({ 
      success: true,
      proposal: result,
      message: status === 'accepted' 
        ? 'Proposal accepted and freelancer status updated' 
        : 'Proposal status updated'
    });
  } catch (error) {
    console.error('Error updating proposal status:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to update proposal status',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 
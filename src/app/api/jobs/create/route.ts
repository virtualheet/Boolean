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

    const { title, description, pricing, category, skills, duration } = await req.json();
    
    // Validate required fields
    if (!title || !description || pricing === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Convert arrays to JSON strings
    const categoryJson = JSON.stringify(category || []);
    const skillsJson = JSON.stringify(skills || []);

    // Create the job
    const job = await prisma.userCreatedproject.create({
      data: {
        userId : userId,
        title :  title,
        description : description,
        pricing : Number(pricing),
        category : categoryJson,
        skills : skillsJson,
        duration : duration
      }
    });

    // Also create an entry in asJobCreater if it doesn't exist
    // await prisma.asJobCreater.upsert({
    //   where: { userId },
    //   create: { userId },
    //   update: {}
    // });

    return NextResponse.json({ success: true, job });
  } catch (error) {
    // console.error('Error creating job:', error);
    return NextResponse.json({ 
      error: 'Internal Server Error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 
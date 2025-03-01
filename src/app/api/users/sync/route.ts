import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { id, username, firstName, lastName, email, profileImage } = await req.json();

    // Check if username is already taken
    const existingUsername = await prisma.user.findUnique({
      where: { username }
    });

    if (existingUsername) {
      return NextResponse.json({ error: 'Username is already taken' }, { status: 400 });
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id }
    });

    if (existingUser) {
      // Update existing user
      const updatedUser = await prisma.user.update({
        where: { id },
        data: {
          username,
          firstName,
          lastName,
          email,
          profileImage
        }
      });
      return NextResponse.json({ user: updatedUser });
    }

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        id,
        username,
        firstName,
        lastName,
        email,
        profileImage,
        socialLinks: "[]",
        skills: "[]",
        occupation: "[]",
        education: "[]",
        cradits: 7
      }
    });

    return NextResponse.json({ status: 200, user: newUser });
  } catch (error) {
    console.error('Error syncing user:', error);
    return NextResponse.json({ error: 'Failed to sync user' }, { status: 500 });
  }
} 
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: any, res: any) {
  try {
    const body = await req.json();
    const username = body.username?.trim();

    if (!username) {
      return NextResponse.json({ 
        available: false,
        message: "Please provide a username" 
      }, { status: 400 });
    }

    const user = await prisma.user.findFirst({
      where: {
          username: username,
      }
    });

    if (user) {
      return NextResponse.json({ 
        available: false,
        message: "This username is already taken. Please try another one.",
        suggestions: [
          `${username}123`,
          `${username}_`,
          `${username}2024`
        ]
      }, { status: 200 });
    }

    return NextResponse.json({ 
      available: true,
      message: "Username is available!" 
    }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ 
      available: false,
      message: "An error occurred while checking username" 
    }, { status: 500 });
  }
}

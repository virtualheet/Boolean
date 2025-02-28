import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

// GET profile data
export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// UPDATE profile data
export async function PUT(req: Request) {
  try {
    const { userId }  = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        about: body.about,
        email: body.email,
        profileImage: body.profileImage,
        socialLinks: body.socialLinks,
        skills: body.skills,
        isFreelancer: body.isFreelancer,
        isClient: body.isClient,
        contactInfo: body.contactInfo,
      },
    });

    const addAllProjects = body.portfolioProjects.map(async (project: any) => {
        const addProjects = await prisma.portfolioProject.create({
            data: {
              userId: userId,
              title: project.title,
              description: project.description,
              link: project.link,
            },
          });
          console.log("Project Added ::", project)
    });

    // const addProjects = await prisma.portfolioProject.create({
    //   data: {
    //     userId: userId,
    //     title: body.title.portfolio,
    //     description: body.description,
    //     images: body.images,
    //   },
    // });

    return NextResponse.json(updatedUser);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 
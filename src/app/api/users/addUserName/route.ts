import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { json } from "stream/consumers";

const prisma = new PrismaClient();

export async function POST(req: any, res: any) {
  try {
    const body = await req.json();
    console.log("title::",body);

    if (body) {
        await prisma.user.update({
            where: {
                id: body.id
            },
            data: {
                username: body.username
            }
        })
    }

    return NextResponse.json({ message: "Username added successfully" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CloudinaryService from "@/app/api/services/cloudinary/cloudinary";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { title, publishingYear, image } = await req.json();

    if (!title || !publishingYear || !image) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const imageUrl = await CloudinaryService.uploadImage(image);

    const newMovie = await prisma.movieList.create({
      data: {
        title,
        publishingYear: parseInt(publishingYear),
        image: imageUrl,
        userId: session.user.id,
      },
    });

    return NextResponse.json(
      { message: "Movie created successfully", movie: newMovie },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating movie:", error);
    return NextResponse.json(
      { message: "Failed to create movie" },
      { status: 500 }
    );
  }
}

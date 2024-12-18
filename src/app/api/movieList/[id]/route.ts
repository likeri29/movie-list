import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    const movie = await prisma.movieList.findUnique({
      where: { id },
    });

    if (!movie) {
      return NextResponse.json({ message: "Movie not found" }, { status: 404 });
    }

    return NextResponse.json(movie);
  } catch (error) {
    console.error("Error fetching movie:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { title, year, image } = await req.json();

    const updatedMovie = await prisma.movieList.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(year && { publishingYear: parseInt(year) }),
        ...(image && { image }),
      },
    });

    return NextResponse.json({
      message: "Movie updated successfully",
      movie: updatedMovie,
    });
  } catch (error) {
    console.error("Error updating movie:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

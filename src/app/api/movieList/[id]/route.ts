/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, context: { params: any }) {
  try {
    const { id } = context.params;

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

export async function PATCH(req: NextRequest, context: { params: any }) {
  try {
    const { id } = context.params;

    const session = await getServerSession(authOptions);
    const userId = (session?.user as { id?: string })?.id;

    if (!session || !userId) {
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

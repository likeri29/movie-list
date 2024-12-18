"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Box, Typography, CircularProgress } from "@mui/material";
import { MovieForm } from "@/components";
import { MovieFormValues } from "@/types";
import { toast } from "react-toastify";
import { useGetMovieByIdQuery, useUpdateMovieMutation } from "@/store/movieApi";

export default function EditMoviePage() {
  const { id } = useParams();
  const router = useRouter();
  const movieId = id as string;
  const { data, isLoading, error } = useGetMovieByIdQuery(movieId);
  const [updateMovie] = useUpdateMovieMutation();
  const [movieData, setMovieData] = useState<MovieFormValues | null>(null);

  useEffect(() => {
    if (data) {
      setMovieData({
        title: data.title,
        year: data.publishingYear.toString(),
        image: data.image,
      });
    }
  }, [data]);

  const handleFormSubmit = async (data: MovieFormValues) => {
    try {
      const formData = {
        title: data.title,
        year: data.year,
        image:
          data.image instanceof File
            ? await fileToBase64(data.image)
            : data.image,
      };

      const response = await updateMovie({
        id: movieId,
        updatedMovie: formData,
      });

      if (response?.data) {
        toast.success("Movie updated successfully!");
        router.push("/");
      } else {
        toast.error(`Error updating movie`);
      }
    } catch (error) {
      console.error("Error updating movie:", error);
      toast.error("Something went wrong while updating the movie.");
    }
  };

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  if (isLoading || !movieData) {
    return (
      <Box className="flex justify-center items-center">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    toast.error("Error fetching movie");
    router.push("/");
    return;
  }

  return (
    <Box className="flex flex-col w-full h-screen p-10 md:p-20 lg:p-[120px] gap-10 mb-60 md:mb-0">
      <Typography variant="h3" className="text-white mb-8 font-bold">
        Edit Movie
      </Typography>

      <MovieForm
        onSubmit={handleFormSubmit}
        defaultValues={movieData}
        loading={isLoading}
      />
    </Box>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Box, Typography, CircularProgress } from "@mui/material";
import { MovieForm } from "@/components";
import { MovieFormValues } from "@/types";
import { toast } from "react-toastify";

export default function EditMoviePage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movieData, setMovieData] = useState<MovieFormValues | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`/api/movieList/${id}`, { method: "GET" });
        const data = await response.json();

        if (response.ok) {
          setMovieData({
            title: data.movie.title,
            year: data.movie.publishingYear.toString(),
            image: data.movie.image,
          });
        } else {
          console.error("Error fetching movie:", data.message);
        }
      } catch (error) {
        console.error("Error fetching movie:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchMovie();
  }, [id]);

  const handleFormSubmit = async (data: MovieFormValues) => {
    try {
      const formData = {
        title: data.title,
        publishingYear: data.year,
        image:
          data.image instanceof File
            ? await fileToBase64(data.image)
            : data.image,
      };

      const response = await fetch(`/api/movieList/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Movie updated successfully!");
        console.log("Updated Movie:", result.movie);
      } else {
        toast.error(`Error updating movie: ${result.message}`);
      }
    } catch (error) {
      console.error("Error updating movie:", error);
    }
  };

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  return (
    <Box className="flex flex-col w-full h-screen p-10 md:p-20 lg:p-[120px] gap-10">
      <Typography variant="h3" className="text-white mb-8 font-bold">
        Edit Movie
      </Typography>

      {loading ? (
        <Box className="flex justify-center items-center">
          <CircularProgress />
        </Box>
      ) : movieData ? (
        <MovieForm onSubmit={handleFormSubmit} defaultValues={movieData} />
      ) : (
        <Typography variant="body1" className="text-red-500">
          Movie not found.
        </Typography>
      )}
    </Box>
  );
}

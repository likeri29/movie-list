"use client";
import { Box, Typography } from "@mui/material";
import { MovieForm } from "@/components";
import { MovieFormValues } from "@/types";
import { toast } from "react-toastify";

export default function AddMoviePage() {
  const handleFormSubmit = async (data: MovieFormValues) => {
    try {
      const fileToBase64 = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = (error) => reject(error);
        });

      const imageBase64 = await fileToBase64(data.image as File);

      const response = await fetch("/api/movieList", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: data.title,
          publishingYear: data.year,
          image: imageBase64,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error:", errorData.message);
        toast.error("Failed to create the movie.");
        return;
      }

      toast.success("Movie created successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong while submitting the form.");
    }
  };

  return (
    <Box className="flex flex-col w-full h-screen p-10 md:p-20 lg:p-[120px] gap-10 md:gap-20 lg:gap-[120px]">
      <Typography variant="h3" className="text-white mb-8 font-bold">
        Create a new movie
      </Typography>

      <MovieForm onSubmit={handleFormSubmit} />
    </Box>
  );
}

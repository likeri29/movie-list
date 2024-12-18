"use client";

import { Box, Typography } from "@mui/material";
import { MovieForm } from "@/components";
import { MovieFormValues } from "@/types";
import { toast } from "react-toastify";
import { useCreateMovieMutation } from "@/store/movieApi";
import { useRouter } from "next/navigation";

export default function AddMoviePage() {
  const [createMovie, { isLoading }] = useCreateMovieMutation();

  const router = useRouter();

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

      const response = await createMovie(
        formData as unknown as MovieFormValues
      );

      if (response?.data) {
        toast.success("Movie created successfully!");
        router.push("/");
      } else {
        toast.error("Failed to create the movie.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong while submitting the form.");
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
    <Box className="flex flex-col w-full h-screen p-10 md:p-20 lg:p-[120px] gap-10 md:gap-20 lg:gap-[120px] mb-72 md:mb-0">
      <Typography variant="h3" className="text-white mb-8 font-bold">
        Create a new movie
      </Typography>

      <MovieForm onSubmit={handleFormSubmit} loading={isLoading} />
    </Box>
  );
}

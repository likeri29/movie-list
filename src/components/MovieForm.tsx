"use client";

import { useForm, Controller } from "react-hook-form";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { Input, ImagePicker } from "@/components";
import { MovieFormValues } from "@/types";

interface MovieFormProps {
  onSubmit: (data: MovieFormValues) => void;
  loading: boolean;
  defaultValues?: MovieFormValues;
}

export function MovieForm({
  onSubmit,
  defaultValues,
  loading,
}: MovieFormProps) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<MovieFormValues>({
    defaultValues,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col md:flex-row items-start justify-between gap-10"
    >
      <Box className="w-1/2">
        <Controller
          name="image"
          control={control}
          rules={{ required: "Image is required" }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Box>
              <ImagePicker
                onImageSelect={(file: File) => {
                  onChange(file);
                }}
                previewImage={typeof value === "string" ? value : null}
              />
              {error && (
                <Typography variant="body2" color="error" className="mt-2">
                  {error.message}
                </Typography>
              )}
            </Box>
          )}
        />
      </Box>

      <Box className="w-3/4 flex flex-col gap-6">
        <Input
          name="title"
          label="Title"
          control={control}
          error={errors.title?.message}
          rules={{ required: "Title is required" }}
          className="max-w-[362px]"
        />

        <Input
          name="year"
          label="Publishing year"
          control={control}
          error={errors.year?.message}
          rules={{
            required: "Publishing year is required",
            pattern: {
              value: /^[0-9]{4}$/,
              message: "Enter a valid year (e.g., 2024)",
            },
          }}
          className="max-w-[216px]"
        />

        <Box className="flex flex-col md:flex-row gap-2 max-w-[362px] mt-6 md:mt-14">
          <Button variant="outlined" fullWidth>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{
              borderRadius: "10px",
              "&:hover": { backgroundColor: "#28b66b" },
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "#fff" }} />
            ) : (
              "Submit"
            )}
          </Button>
        </Box>
      </Box>
    </form>
  );
}

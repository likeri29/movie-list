"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { TextField, Button, Box, Typography } from "@mui/material";

interface FormData {
  email: string;
  password: string;
}

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log("Form submitted:", data);
  };

  return (
    <Box className="flex items-center justify-center min-h-screen bg-[#093545]">
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg"
      >
        <Typography
          variant="h4"
          className="text-center mb-4 font-bold text-[#093545]"
        >
          Sign Up
        </Typography>

        {/* Email Field */}
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Enter a valid email address",
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
          className="mb-4"
        />

        {/* Password Field */}
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
          className="mb-6"
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          className="!bg-green-500 hover:!bg-green-600 text-white font-semibold"
        >
          Sign Up
        </Button>
      </Box>
    </Box>
  );
}

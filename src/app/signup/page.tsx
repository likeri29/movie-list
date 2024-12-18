"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { Button, Typography, Box } from "@mui/material";
import { Input } from "@/components";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface SignUpFormData {
  email: string;
  password: string;
}

export default function SignUp() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>();
  const router = useRouter();

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.error || "Failed to create account.");
        return;
      }

      toast.success(
        "Account created successfully! Now you can login using your credentials"
      );
      router.push("/signin");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <Box className="flex items-center flex-col justify-center min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm p-6 space-y-4"
      >
        <Typography
          variant="h3"
          component="h1"
          className="text-white font-bold text-center mb-4"
        >
          Sign Up
        </Typography>

        <Input
          name="email"
          label="Email"
          control={control}
          error={errors.email?.message}
          rules={{
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Please enter a valid email",
            },
          }}
        />

        <Input
          name="password"
          label="Password"
          type="password"
          control={control}
          error={errors.password?.message}
          rules={{
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          }}
        />

        <Button type="submit" fullWidth variant="contained" color="success">
          Sign Up
        </Button>
      </form>
      <Link href="/signin" className="text-[#2BD17E] hover:opacity-60">
        Sign in
      </Link>
    </Box>
  );
}

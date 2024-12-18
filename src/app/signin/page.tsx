"use client";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  Button,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Input } from "@/components";
import Link from "next/link";

interface SignInFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function SignIn() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();
  const [error, setError] = useState("");

  const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
    setError("");

    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    console.log(result);

    if (result?.error) {
      setError("Invalid email or password");
    } else {
      window.location.href = "/";
    }
  };

  return (
    <Box
      className="flex items-center justify-center flex-col min-h-screen bg-[#093545]"
      component="div"
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm p-6 bg-transparent rounded-lg space-y-4"
      >
        <Typography
          variant="h3"
          component="h1"
          className="text-white font-bold text-center mb-4"
        >
          Sign in
        </Typography>

        <Input
          name="email"
          label="Email"
          control={control}
          error={errors.email?.message}
          rules={{ required: "Email is required" }}
        />

        <Input
          name="password"
          label="Password"
          type="password"
          control={control}
          error={errors.password?.message}
          rules={{
            required: "Password is required",
          }}
        />
        <Box className="flex justify-center align-center">
          <Controller
            name="rememberMe"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    {...field}
                    checked={field.value}
                    sx={{
                      color: "#224957",

                      "&.Mui-checked": {
                        color: "#2BD17E",
                      },
                    }}
                  />
                }
                label={
                  <Typography className="text-[#A3B9BF] text-sm">
                    Remember me
                  </Typography>
                }
              />
            )}
          />
        </Box>

        <Button type="submit" fullWidth variant="contained" color="primary">
          Login
        </Button>

        {error && (
          <Typography className="text-red-500 text-sm text-center">
            {error}
          </Typography>
        )}
      </Box>
      <Link href="/signup" className="text-[#2BD17E] hover:opacity-60">
        Sign up
      </Link>
    </Box>
  );
}

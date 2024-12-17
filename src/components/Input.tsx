/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Box, TextField } from "@mui/material";
import { Controller, Control, RegisterOptions } from "react-hook-form";

interface InputProps {
  name: string;
  label: string;
  control: Control<any>;
  error?: string;
  type?: string;
  rules?: RegisterOptions;
}

export function Input({
  name,
  label,
  control,
  error,
  rules,
  type = "text",
}: InputProps) {
  return (
    <Box>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        rules={rules}
        render={({ field }) => (
          <TextField
            {...field}
            type={type}
            label={label}
            variant="outlined"
            fullWidth
            error={!!error}
            helperText={error}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                color: "#fff",
                backgroundColor: "#224957",
                "& fieldset": {
                  borderColor: "transparent",
                },
                "&:hover fieldset": {
                  borderColor: "#2BD17E",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#2BD17E",
                },
                "&.Mui-error fieldset": {
                  borderColor: "#EB5757",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#A3B9BF",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#2BD17E",
              },
              "& .MuiInputBase-input": {
                color: "#FFFFFF",
              },
              "& .MuiFormHelperText-root": {
                color: "#EB5757",
              },
            }}
          />
        )}
      />
    </Box>
  );
}

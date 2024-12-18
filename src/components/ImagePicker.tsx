"use client";

import React, { useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

interface ImagePickerProps {
  onImageSelect: (file: File) => void;
}

export function ImagePicker({ onImageSelect }: ImagePickerProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      onImageSelect(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Box
      onClick={handleClick}
      className="w-[300px] h-[300px] sm:w-[350px] sm:h-[400px] md:w-[400px] md:h-[450px] lg:w-[470px] lg:h-[500px] 
        flex justify-center items-center cursor-pointer border-2 border-dashed border-white rounded-lg bg-[#224957] hover:bg-[#092C39]"
    >
      {previewImage ? (
        <Box className="relative w-full h-full">
          <Image
            src={previewImage}
            alt="Uploaded"
            layout="fill"
            objectFit="contain"
            className="rounded-lg"
            priority
          />
        </Box>
      ) : (
        <Box className="flex flex-col justify-center items-center">
          <FileDownloadIcon sx={{ fontSize: 32, color: "#fff" }} />
          <Typography variant="body1" className="text-white text-center">
            Drop an image here or click to upload
          </Typography>
        </Box>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </Box>
  );
}

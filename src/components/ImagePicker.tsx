"use client";

import React, { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

interface ImagePickerProps {
  onImageSelect: (file: File) => void;
  previewImage?: string | null;
}

export function ImagePicker({ onImageSelect, previewImage }: ImagePickerProps) {
  const [localPreviewImage, setLocalPreviewImage] = useState<string | null>(
    previewImage || null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (previewImage) {
      setLocalPreviewImage(previewImage);
    }
  }, [previewImage]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setLocalPreviewImage(imageUrl);
      onImageSelect(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setLocalPreviewImage(imageUrl);
      onImageSelect(file);
    }
  };

  return (
    <Box
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`w-[300px] h-[300px] sm:w-[350px] sm:h-[400px] md:w-[400px] md:h-[450px] lg:w-[470px] lg:h-[500px] 
        flex justify-center items-center cursor-pointer border-2 ${
          isDragging ? "bg-[#092C39]" : "border-white"
        } border-dashed rounded-lg bg-[#224957] hover:bg-[#092C39]`}
    >
      {localPreviewImage ? (
        <Box className="relative w-full h-full">
          <Image
            src={localPreviewImage}
            alt="Uploaded"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
            priority
          />
        </Box>
      ) : (
        <Box className="flex flex-col justify-center items-center">
          <FileDownloadIcon sx={{ fontSize: 32, color: "#fff" }} />
          <Typography variant="body1" className="text-white text-center">
            {isDragging
              ? "Drop the image here"
              : "Drop an image here or click to upload"}
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

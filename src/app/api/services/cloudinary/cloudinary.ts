import cloudinary from "@/utils/cloudinary";

class CloudinaryService {
  static async uploadImage(image: string): Promise<string> {
    try {
      console.log("upload image");

      const uploadedImage = await cloudinary.uploader.upload(image, {
        folder: "movie-list",
      });

      console.log(uploadedImage);

      return uploadedImage.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Failed to upload image to Cloudinary");
    }
  }
}

export default CloudinaryService;

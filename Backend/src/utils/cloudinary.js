import { v2 as cloudinary } from "cloudinary";
import { promises as fs } from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Single file upload
const uploadCloudinary = async (filepath) => {
  try {
    const result = await cloudinary.uploader.upload(filepath, {
      folder: "ecommerce/products",
    });

    // delete local file
    await fs.unlink(filepath);
     
    return result.secure_url;
  } catch (error) {
    // agar file exist kare to delete kar do
    try {
      await fs.access(filepath);
      await fs.unlink(filepath);
    } catch {}

    console.error("Cloudinary Upload Error:", error.message);
    return null;
  }
};

// Multiple files upload
const multiUpload = async (filepaths = []) => {
  try {
    const result = await Promise.all(
      filepaths.map((path) => uploadCloudinary(path))
    );
    return result.filter((url) => url !== null);
  } catch (error) {
    console.error("Multi Upload Error:", error.message);
    return [];
  }
};

export { uploadCloudinary, multiUpload };

import { CLOUDINARY_URL, UPLOAD_PRESET } from "@/consts/cloudinary";
import axios from "axios";

export const uploadImg = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  try {
    const res = await axios.post(CLOUDINARY_URL, formData);
    return res.data.secure_url;
  } catch (error) {
    console.log(error);
  }
};

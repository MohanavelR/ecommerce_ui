import axios from "axios";
export const uploadImageToCloudinary = async (file, onProgress) => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/upload-image`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(progress);
        }
      },
    }
  );

  return res.data.data.url; // backend should return { url: "..." }
};

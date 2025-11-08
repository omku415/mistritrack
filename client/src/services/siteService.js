// api/site.js
import axios from "axios";

export const createSite = async (formData) => {
  // formData is a FormData object
  const response = await axios.post(
    "http://localhost:5000/api/sites/create",
    formData,
    {
      withCredentials: true, // sends cookies for auth
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return response.data;
};

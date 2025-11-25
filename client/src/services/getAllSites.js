// api/site.js
import axios from "axios";

export const getAllSites = async () => {
  const response = await axios.get(
    "http://localhost:5000/api/sites/all",
    {
      withCredentials: true,
      headers: { "Content-Type": "application/json" }
    }
  );

  return response.data; // returns an array of all sites
};

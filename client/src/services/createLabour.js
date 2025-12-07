// api/labour.js
import axios from "axios";

export const createLabour = async (data) => {
  // data is a normal JSON object
  const response = await axios.post(
    "http://localhost:5000/api/labour/create",
    data,
    {
      withCredentials: true, // to send cookies for auth
      headers: { "Content-Type": "application/json" },
    }
  );

  return response.data;
};

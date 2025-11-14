// api/supervisor.js
import axios from "axios";

export const createSupervisor = async (data) => {
  // data is a normal JSON object
  const response = await axios.post(
    "http://localhost:5000/api/supervisor/create",
    data,
    {
      withCredentials: true, // sends cookies for auth
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
};

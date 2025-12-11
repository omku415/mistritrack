// api/supervisor.js
import axios from "axios";

export const getSupervisorDashboard = async () => {
  const response = await axios.get(
    "http://localhost:5000/api/supervisor/dashboard",
    {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    }
  );

  return response.data; // { success, assigned, site }
};

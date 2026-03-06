import axios from "axios";

// Export Attendance
export const exportAttendance = async (date) => {
  const response = await axios.get(
    `http://localhost:5000/api/attendance/export?date=${date}`,
    {
      responseType: "blob",
      withCredentials: true,
    }
  );

  return response.data;
};
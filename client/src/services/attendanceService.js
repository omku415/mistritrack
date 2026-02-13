import axios from "axios";

// 🔹 Get labour for supervisor attendance page
export const getSupervisorLabours = async () => {
  const response = await axios.get(
    "http://localhost:5000/api/supervisor/labours",
    {
      withCredentials: true,
    }
  );

  return response.data;
};


// 🔹 Submit attendance
export const markAttendance = async (attendanceData) => {
  const response = await axios.post(
    "http://localhost:5000/api/supervisor/markAttendance",
    { attendance: attendanceData },
    {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    }
  );

  return response.data;
};
// Today Attendence.
export const getTodayAttendance = async () => {
  const response = await axios.get(
    "http://localhost:5000/api/supervisor/today-attendance",
    {
      withCredentials: true,
    }
  );

  return response.data;
};

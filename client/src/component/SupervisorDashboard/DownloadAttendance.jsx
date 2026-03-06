import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { exportAttendance } from "../../services/exportAttendence.js";

const DownloadAttendance = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (!selectedDate) {
      alert("Please select a date");
      return;
    }

    try {
      setLoading(true);

      // ✅ FIX: use local date instead of UTC
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const day = String(selectedDate.getDate()).padStart(2, "0");

      const formattedDate = `${year}-${month}-${day}`;

      const data = await exportAttendance(formattedDate);

      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `attendance-${formattedDate}.xlsx`;

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("Failed to download attendance");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div className="bg-white text-black shadow-lg p-8 rounded-xl w-96">
        <h2 className="text-xl font-bold mb-6 text-center text-black">
          Download Attendance
        </h2>

        <div className="mb-4">
          <label className="block mb-2 font-medium text-black">
            Select Date
          </label>

          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className="input input-bordered w-full bg-white text-black"
            dateFormat="yyyy-MM-dd"
          />
        </div>

        <button
          onClick={handleDownload}
          className="btn btn-success w-full text-white"
          disabled={loading}
        >
          {loading ? "Downloading..." : "Download Excel"}
        </button>
      </div>
    </div>
  );
};

export default DownloadAttendance;

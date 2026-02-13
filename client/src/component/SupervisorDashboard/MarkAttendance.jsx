import { useEffect, useState } from "react";
import {
  getSupervisorLabours,
  markAttendance,
  getTodayAttendance,
} from "../../services/attendanceService";

const MarkAttendance = () => {
  const [labours, setLabours] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(true);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const labourRes = await getSupervisorLabours();
        const todayRes = await getTodayAttendance();

        setLabours(labourRes.labours);

        const initialAttendance = {};

        // If already submitted → preload existing data
        if (todayRes.submitted) {
          setAlreadySubmitted(true);

          todayRes.attendance.forEach((record) => {
            initialAttendance[record.labour] = record.status;
          });

          // Ensure all labours exist in state
          labourRes.labours.forEach((labour) => {
            if (!initialAttendance[labour._id]) {
              initialAttendance[labour._id] = "absent";
            }
          });
        } else {
          // Default all absent
          labourRes.labours.forEach((labour) => {
            initialAttendance[labour._id] = "absent";
          });
        }

        setAttendance(initialAttendance);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (labourId, status) => {
    setAttendance((prev) => ({
      ...prev,
      [labourId]: status,
    }));
  };

  const handleSubmit = async () => {
    try {
      const formattedData = Object.keys(attendance).map((labourId) => ({
        labourId,
        status: attendance[labourId],
      }));

      await markAttendance(formattedData);

      setAlreadySubmitted(true);
      alert("Attendance saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Error saving attendance");
    }
  };

  if (loading) return <div className="p-6 text-white">Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white mb-4">
        Mark Attendance
      </h2>

      {alreadySubmitted && (
        <div className="mb-4 p-3 bg-green-600 text-white rounded">
          Attendance already submitted for today. You can edit and resubmit.
        </div>
      )}

      <div className="space-y-4">
        {labours.map((labour) => (
          <div
            key={labour._id}
            className="flex justify-between items-center bg-emerald-700 p-4 rounded-lg text-white"
          >
            <div>
              <p className="font-semibold">{labour.name}</p>
              <p className="text-sm">{labour.aadhaar}</p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => handleChange(labour._id, "present")}
                className={`btn ${
                  attendance[labour._id] === "present"
                    ? "bg-green-500"
                    : "bg-gray-500"
                }`}
              >
                Present
              </button>

              <button
                onClick={() => handleChange(labour._id, "absent")}
                className={`btn ${
                  attendance[labour._id] === "absent"
                    ? "bg-red-500"
                    : "bg-gray-500"
                }`}
              >
                Absent
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <button
          onClick={handleSubmit}
          className="btn bg-white text-emerald-700"
        >
          {alreadySubmitted ? "Update Attendance" : "Submit Attendance"}
        </button>
      </div>
    </div>
  );
};

export default MarkAttendance;

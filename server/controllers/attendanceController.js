import ExcelJS from "exceljs";
import { Attendance } from "../model/attendance.js";
import { Site } from "../model/site.js";
import ErrorHandler from "../middleware/error.js";
import { catchAsyncError } from "../middleware/catchAsyncError.js";

export const exportAttendance = catchAsyncError(async (req, res, next) => {
  const { date, startDate, endDate, site_id } = req.query;

  let siteId;

  // ADMIN can export any site
  if (req.user.role === "admin") {
    siteId = site_id;
  }

  // SUPERVISOR can export only their assigned site
  if (req.user.role === "supervisor") {
    siteId = req.user.assignedSite;
  }

  if (!siteId) {
    return next(new ErrorHandler("Site ID is required", 400));
  }

  const site = await Site.findById(siteId);

  if (!site) {
    return next(new ErrorHandler("Invalid site ID", 400));
  }

  // Build filter
  let filter = {
    site: siteId,
  };

  // Single date filter
  if (date) {
    const selectedDate = new Date(date);
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);

    filter.date = {
      $gte: selectedDate,
      $lt: nextDate,
    };
  }

  // Date range filter
  if (startDate && endDate) {
    filter.date = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };
  }

  // Fetch attendance
  const attendance = await Attendance.find(filter)
    .populate("labour", "name aadhaar")
    .populate("site", "name")
    .sort({ date: 1 });

  // Create Excel workbook
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Attendance");

  worksheet.columns = [
    { header: "Labour Name", key: "labourName", width: 25 },
    { header: "Aadhaar", key: "aadhaar", width: 20 },
    { header: "Site Name", key: "siteName", width: 25 },
    { header: "Date", key: "date", width: 15 },
    { header: "Status", key: "status", width: 15 },
  ];

  attendance.forEach((item) => {
    worksheet.addRow({
      labourName: item.labour?.name || "",
      aadhaar: item.labour?.aadhaar || "",
      siteName: item.site?.name || "",
      date: item.date.toISOString().split("T")[0],
      status: item.status,
    });
  });

  worksheet.getRow(1).font = { bold: true };

  // Set headers
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );

  res.setHeader(
    "Content-Disposition",
    `attachment; filename=attendance_${Date.now()}.xlsx`
  );

  await workbook.xlsx.write(res);

  res.end();
});
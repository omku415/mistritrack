import { Site } from "../model/site.js";
import { User } from "../model/user.js";
import ErrorHandler from "../middleware/error.js";
import { catchAsyncError } from "../middleware/catchAsyncError.js";

export const createSite = catchAsyncError(async (req, res, next) => {
  const { name, location, supervisor_id, status, description, start_date } = req.body;

  // Only admins can create sites
  if (req.user.role !== "admin") {
    return next(new ErrorHandler("Only admin can create sites", 403));
  }

  const siteData = {
    name,
    location,
    status,
    description,
    start_date,
    created_by: req.user._id,
  };

  // Handle supervisor assignment
  let supervisor = null;
  if (supervisor_id) {
    supervisor = await User.findById(supervisor_id);
    if (!supervisor || supervisor.role !== "supervisor") {
      return next(new ErrorHandler("Invalid supervisor ID", 400));
    }
    siteData.supervisor_id = supervisor_id;
  }

  // Handle Cloudinary image upload
  if (req.file && req.file.path) {
    siteData.image = req.file.path; // Cloudinary URL
  }

  // Create the site
  const site = await Site.create(siteData);

  // Assign site to supervisor if provided
  if (supervisor) {
    supervisor.assignedSite = site._id;
    await supervisor.save();
  }

  res.status(201).json({
    success: true,
    message: "Site created successfully",
    site,
  });
});

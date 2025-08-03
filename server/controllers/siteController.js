import { Site } from "../model/site.js";
import { User } from "../model/user.js";
import ErrorHandler from "../middleware/error.js";
import { catchAsyncError } from "../middleware/catchAsyncError.js";

export const createSite = catchAsyncError(async (req, res, next) => {
  const { name, location, supervisor_id, status, description } = req.body;

  if (req.user.role !== "admin") {
    return next(new ErrorHandler("Only admin can create sites", 403));
  }

  // Create site object with or without supervisor
  const siteData = {
    name,
    location,
    status,
    description,
    created_by: req.user._id,
  };

  // If supervisor is provided, validate and attach it
  let supervisor = null;

  if (supervisor_id) {
    supervisor = await User.findById(supervisor_id);
    if (!supervisor || supervisor.role !== "supervisor") {
      return next(new ErrorHandler("Invalid supervisor ID", 400));
    }
    siteData.supervisor_id = supervisor_id;
  }

  const site = await Site.create(siteData);

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

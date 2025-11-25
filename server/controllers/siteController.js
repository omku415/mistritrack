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

  let supervisor = null;

  // ------------------------------
  // 1️⃣ Validate Supervisor if provided
  // ------------------------------
  if (supervisor_id) {
    supervisor = await User.findById(supervisor_id);

    if (!supervisor || supervisor.role !== "supervisor") {
      return next(new ErrorHandler("Invalid supervisor ID", 400));
    }

    // STRICT RULE: Supervisor cannot be assigned to another site
    if (supervisor.assignedSite) {
      return next(new ErrorHandler("Supervisor is already assigned to another site", 400));
    }

    siteData.supervisor_id = supervisor_id;
  }

  // ------------------------------
  // OPTIONAL: Handle Image Upload
  // ------------------------------
  if (req.file && req.file.path) {
    siteData.image = req.file.path;
  }

  // ------------------------------
  // 2️⃣ Create the Site
  // ------------------------------
  const site = await Site.create(siteData);

  // ------------------------------
  // 3️⃣ LINK BOTH SIDES (If supervisor provided)
  // ------------------------------
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

// ------------------------------
//  GET ALL SITES
// ------------------------------
export const getAllSites = catchAsyncError(async (req, res, next) => {
  const sites = await Site.find().populate("supervisor_id", "name email");

  res.status(200).json({
    success: true,
    count: sites.length,
    sites,
  });
});

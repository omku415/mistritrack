import { Labour } from "../model/labour.js";
import { Site } from "../model/site.js";
import ErrorHandler from "../middleware/error.js";
import { catchAsyncError } from "../middleware/catchAsyncError.js";

export const createLabour = catchAsyncError(async (req, res, next) => {
  const { name, aadhaar, address } = req.body;

  let siteId;

  // ADMIN can choose site
  if (req.user.role === "admin") {
    siteId = req.body.site_id;
  }

  // SUPERVISOR site comes from assignedSite
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

  const labour = await Labour.create({
    name,
    aadhaar,
    address,
    site: siteId,
    createdBy: req.user._id,
  });

  res.status(201).json({
    success: true,
    message: "Labour added successfully",
    labour,
  });
});


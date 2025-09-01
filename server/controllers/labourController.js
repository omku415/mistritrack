import { Labour } from "../model/labour.js";
import { Site } from "../model/site.js";
import ErrorHandler from "../middleware/error.js";
import { catchAsyncError } from "../middleware/catchAsyncError.js";

export const createLabour = catchAsyncError(async (req, res, next) => {
  const { name, aadhaar, site_id, address } = req.body;

  
  const site = await Site.findById(site_id);
  if (!site) {
    return next(new ErrorHandler("Invalid site ID", 400));
  }

  
  if (req.user.role !== "admin" && req.user.role !== "supervisor") {
    return next(new ErrorHandler("Unauthorized", 403));
  }

  const labour = await Labour.create({
    name,
    aadhaar,
    address, 
    site: site_id,
    createdBy: req.user._id, 
  });

  res.status(201).json({
    success: true,
    message: "Labour added successfully",
    labour,
  });
});

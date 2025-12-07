import { User } from "../model/user.js";
import { Site } from "../model/site.js";
import ErrorHandler from "../middleware/error.js";
import { catchAsyncError } from "../middleware/catchAsyncError.js";

export const createSupervisor = catchAsyncError(async (req, res, next) => {
  const { name, email, password, assignedSite } = req.body;

  if (req.user.role !== "admin") {
    return next(new ErrorHandler("Only admin can create supervisors", 403));
  }

  // ------------------------------
  // 1️⃣ Email already exists?
  // ------------------------------
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ErrorHandler("User with this email already exists", 400));
  }

  let site = null;

  // ------------------------------
  // 2️⃣ If assignedSite is provided → validate it
  // ------------------------------
  if (assignedSite) {
    site = await Site.findById(assignedSite);

    if (!site) {
      return next(new ErrorHandler("Invalid site ID", 400));
    }

    // STRICT RULE: Site cannot have another supervisor
    if (site.supervisor_id) {
      return next(new ErrorHandler("Site already assigned to another supervisor", 400));
    }
  }

  // ------------------------------
  // 3️⃣ Create Supervisor
  // ------------------------------
  const newSupervisor = await User.create({
    name,
    email,
    password,
    role: "supervisor",
    assignedSite: assignedSite || null,
  });

  // ------------------------------
  // 4️⃣ LINK BOTH SIDES (If assignedSite provided)
  // ------------------------------
  if (assignedSite) {
    site.supervisor_id = newSupervisor._id;
    await site.save();
  }

  res.status(201).json({
    success: true,
    message: "Supervisor created successfully",
    supervisor: {
      _id: newSupervisor._id,
      name: newSupervisor.name,
      email: newSupervisor.email,
      role: newSupervisor.role,
      assignedSite: newSupervisor.assignedSite,
    },
  });
});

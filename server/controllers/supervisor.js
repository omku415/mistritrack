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

export const getSupervisorDashboard = catchAsyncError(async (req, res, next) => {
  if (req.user.role !== "supervisor") {
    return next(new ErrorHandler("Only supervisors can access this data", 403));
  }

  const supervisor = await User.findById(req.user._id);

  let site = null;

  // Try populate logic
  if (supervisor.assignedSite) {
    site = await Site.findById(supervisor.assignedSite);
  }

  // Fallback: Find by supervisor_id
  if (!site) {
    site = await Site.findOne({ supervisor_id: req.user._id });
  }

  if (!site) {
    return res.status(200).json({
      success: true,
      assigned: false,
      message: "You are not assigned to any site",
      site: null,
    });
  }

  res.status(200).json({
    success: true,
    assigned: true,
    site: {
      _id: site._id,
      name: site.name,
      location: site.location,
      status: site.status,
      description: site.description,
      image: site.image,
    },
  });
});


import { User } from "../model/user.js";
import ErrorHandler from "../middleware/error.js";
import { catchAsyncError } from "../middleware/catchAsyncError.js";


export const createSupervisor = catchAsyncError(async (req, res, next) => {
  const { name, email, password, assignedSite } = req.body;

  if (req.user.role !== "admin") {
    return next(new ErrorHandler("Only admin can create supervisors", 403));
  }

  
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ErrorHandler("User with this email already exists", 400));
  }

  
  const newSupervisor = await User.create({
    name,
    email,
    password,
    role: "supervisor",
    assignedSite: assignedSite || null, // optional
  });

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

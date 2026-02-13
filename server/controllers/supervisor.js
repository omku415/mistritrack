import { User } from "../model/user.js";
import { Site } from "../model/site.js";
import { Attendance } from "../model/attendance.js";
import { Labour } from "../model/labour.js";
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
      return next(
        new ErrorHandler("Site already assigned to another supervisor", 400),
      );
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

export const getSupervisorDashboard = catchAsyncError(
  async (req, res, next) => {
    if (req.user.role !== "supervisor") {
      return next(
        new ErrorHandler("Only supervisors can access this data", 403),
      );
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
  },
);

export const getSupervisorLabours = catchAsyncError(async (req, res, next) => {
  // 1️⃣ Only supervisor allowed
  if (req.user.role !== "supervisor") {
    return next(new ErrorHandler("Only supervisors can access this data", 403));
  }

  // 2️⃣ Check assigned site
  if (!req.user.assignedSite) {
    return next(new ErrorHandler("Supervisor not assigned to any site", 400));
  }

  // 3️⃣ Fetch labour of that site
  const labours = await Labour.find({ site: req.user.assignedSite }).select(
    "name aadhaar address",
  );

  res.status(200).json({
    success: true,
    count: labours.length,
    labours,
  });
});


export const markAttendance = catchAsyncError(async (req, res, next) => {

  if (req.user.role !== "supervisor") {
    return next(new ErrorHandler("Only supervisors can mark attendance", 403));
  }

  if (!req.user.assignedSite) {
    return next(new ErrorHandler("Supervisor not assigned to any site", 400));
  }

  const { attendance } = req.body;

  if (!attendance || attendance.length === 0) {
    return next(new ErrorHandler("No attendance data provided", 400));
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (const item of attendance) {

    const labour = await Labour.findOne({
      _id: item.labourId,
      site: req.user.assignedSite,
    });

    if (!labour) {
      return next(new ErrorHandler("Invalid labour for this site", 400));
    }

    await Attendance.findOneAndUpdate(
      {
        labour: labour._id,
        date: today,
      },
      {
        labour: labour._id,
        site: req.user.assignedSite,
        date: today,
        status: item.status,
        markedBy: req.user._id,
      },
      {
        upsert: true,  // 🔥 creates if not exists
        new: true,
      }
    );
  }

  res.status(200).json({
    success: true,
    message: "Attendance saved successfully",
  });
});


export const getTodayAttendance = catchAsyncError(async (req, res, next) => {

  if (req.user.role !== "supervisor") {
    return next(new ErrorHandler("Only supervisors allowed", 403));
  }

  if (!req.user.assignedSite) {
    return next(new ErrorHandler("Supervisor not assigned to any site", 400));
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const records = await Attendance.find({
    site: req.user.assignedSite,
    date: today,
  });

  if (records.length === 0) {
    return res.status(200).json({
      submitted: false,
      attendance: [],
    });
  }

  res.status(200).json({
    submitted: true,
    attendance: records,
  });
});
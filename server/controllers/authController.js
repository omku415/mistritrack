import { User } from "../model/user.js";
import { sendToken } from "../utils/sendToken.js";
import ErrorHandler from "../middleware/error.js";
import { catchAsyncError } from "../middleware/catchAsyncError.js";

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return next(new ErrorHandler("All fields are required", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) return next(new ErrorHandler("Invalid Email", 400));

  if (user.role !== role) {
    return next(new ErrorHandler("Invalid role selected", 400));
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return next(new ErrorHandler("Invalid credentials", 400));

  await sendToken(user, 200, "Logged in successfully", res);
});

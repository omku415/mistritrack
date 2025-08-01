import { catchAsyncError } from "./catchAsyncError.js";
import errorHandler from "./error.js";
import jwt from "jsonwebtoken";
import { User } from "../model/user.js";

export const isAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new errorHandler("User is not authenticated", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);
  if (!user) {
    return next(new errorHandler("User no longer exists", 401));
  }

  req.user = user;
  next();
});

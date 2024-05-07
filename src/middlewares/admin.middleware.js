import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyAdmin = asyncHandler(async (req, _, next) => {
  try {
    const adminUser = await User.findOne({ _id: req.user._id });
    console.log(`admin user is ${adminUser}`);
    if (!adminUser) {
      throw new ApiError(401, "you are not authorized ");
    }
    if (adminUser && adminUser.role == "admin") {
      next();
    } else {
      throw new ApiError(401, error?.message || "you are not authorized ");
    }
  } catch (error) {
    throw new ApiError(401, error?.message || "you are not admin");
  }
});

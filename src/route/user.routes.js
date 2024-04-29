import { Router } from "express";
import {
  loginUser,
  //   logOutUser,
  registerUser,
  //   refreshAccessToken,
  //   updateUserAvatar,
  //   updateUserDetails,
  //   changeCurrentPassword,
  //   getCurrentUser,
  //   getChannelProfileDetails,
  //   getWatchHistory,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();

router
  .route("/register")
  .post(upload.fields([{ name: "profilePicture", maxCount: 1 }]), registerUser);

router.route("/login").post(loginUser);

export default router;

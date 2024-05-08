import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
  registerHotel,
  getAllHotel,
} from "../controllers/hotels.controller.js";

const router = Router();

router.use(verifyJWT);
router.use(verifyAdmin);
router.route("/registerHotel").post(registerHotel);
router.route("/getAllHotel").get(getAllHotel);
export default router;

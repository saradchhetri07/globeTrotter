import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  getAllFlight,
  registerFlight,
} from "../controllers/flights.controller.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";

const router = Router();

router.use(verifyJWT);
router.use(verifyAdmin);

router.route("/registerFlight").post(registerFlight);
router.route("/getAllFlight").get(getAllFlight);
export default router;

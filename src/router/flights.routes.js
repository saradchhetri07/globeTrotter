import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { registerFlight } from "../controllers/flights.controller.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";

const router = Router();

router.use(verifyJWT);
router.use(verifyAdmin);

router.route("/registerFlight").post(registerFlight);

export default router;

import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { bookFlight } from "../controllers/user.flights.controller.js";

const router = Router();
router.use(verifyJWT);
router.route("/bookFlight").post(bookFlight);
export default router;

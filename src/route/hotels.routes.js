import { Router } from "express";

const router = Router();

router.route("/registerHotel").post(registerHotel);

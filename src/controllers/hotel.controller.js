import mongoose, { Mongoose } from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResonse } from "../utils/Apiresponse.js";
import { User } from "../models/user.models.js";

const registerHotel = asyncHandler(async (req, res) => {});

export { registerHotel };

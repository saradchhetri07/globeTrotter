import mongoose, { Mongoose } from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResonse } from "../utils/Apiresponse.js";
import { User } from "../models/user.models.js";
import { Hotel } from "../models/hotels.models.js";

const registerHotel = asyncHandler(async (req, res) => {
  const {
    hotelName,
    location,
    establishedDate,
    singleRoom,
    singleRoomRate,
    doubleRoom,
    doubleRoomRate,
    suite,
    suiteRate,
    website,
    email,
    phoneNo,
  } = req.body;

  //   if (
  //     [
  //       hotelName,
  //       location,
  //       establishedDate,
  //       singleRoom,
  //       singleRoomRate,
  //       doubleRoom,
  //       doubleRoomRate,
  //       suite,
  //       suiteRate,
  //       email,
  //       phoneNo,
  //     ].some((field) => field?.trim() === "")
  //   ) {
  //     throw new ApiError(400, "All fields are required");
  //   }

  const hotel = await Hotel.create({
    user: req.user,
    hotelName,
    location,
    establishedDate,
    singleRoom,
    singleRoomRate,
    doubleRoom,
    doubleRoomRate,
    suite,
    suiteRate,
    website: website ? website : "",
    email,
    phoneNo,
  });
  if (!hotel) {
    throw new ApiError(400, "Creating Hotel failed");
  }
  return res
    .status(200)
    .json(new ApiResonse(200, hotel, "hotel registered sucessfully"));
});

const getAllHotel = asyncHandler(async (req, res) => {
  const hotels = await Hotel.find();
  if (!hotels) {
    throw new ApiError(404, "Hotels not found");
  }
  return res
    .status(200)
    .json(new ApiResonse(200, hotels, "Hotels fetched successfully"));
});

export { registerHotel, getAllHotel };

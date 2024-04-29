import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userHotelSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    hotelId: {
      type: Schema.Types.ObjectId,
      ref: "Hotel",
    },
    arrivalDate: {
      type: Date,
      required: true,
    },
    room_type: {
      type: String,
      required: true,
    },
    roomCount: {
      type: Number,
      required: true,
    },
    hotelName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const UserHotel = mongoose.model("UserHotel", userHotelSchema);

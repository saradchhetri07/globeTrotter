import mongoose, { Schema } from "mongoose";

const flightsSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    flightName: {
      type: String,
      required: true,
    },
    flightDepart: {
      type: String,
      required: true,
    },
    flightDest: {
      type: String,
      required: true,
    },
    economyRate: {
      type: Number,
      required: true,
    },
    businessRate: {
      type: Number,
      required: true,
    },
    website: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: Number,
      required: true,
    },
    image1: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Flights = mongoose.model("Flights", flightsSchema);

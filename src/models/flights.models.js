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
    flightdest: {
      type: String,
      required: true,
    },
    economy: {
      type: Number,
      required: true,
    },
    economyRate: {
      type: Number,
      required: true,
    },
    business: {
      type: Number,
      required: true,
    },
    businessRate: {
      type: Number,
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneno: {
      type: Number,
      required: true,
    },
    image1: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Flights = mongoose.model("Flights", flightsSchema);

import mongoose, { Schema } from "mongoose";

const UserFlightSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  flightId: {
    type: Schema.Types.ObjectId,
    ref: "Flight",
  },
  departure: {
    type: String,
    required: true,
  },
  arrival: {
    type: String,
    required: true,
  },
  departureDate: {
    type: Date,
    required: true,
  },
  seat_type: {
    type: String,
    enum: ["A", "B", "C", "D", "E", "F", "G"],
    required: true,
  },
  seat_count: {
    type: Number,
    required: true,
  },
  flightName: {
    type: String,
    required: true,
  },
});

export const UserFlight = mongoose.model("UserFlight", UserFlightSchema);

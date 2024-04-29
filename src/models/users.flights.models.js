import { Schema } from "mongoose";

const UserFlightSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  flightId: {
    type: Schema.Types.ObjectId,
    ref: "Flight",
  },
  departureDate: {
    type: Date,
    required: true,
  },
  seat_type: {
    type: String,
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

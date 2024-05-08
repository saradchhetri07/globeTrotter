import { UserFlight } from "../models/users.flights.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResonse } from "../utils/Apiresponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const bookFlight = asyncHandler(async (req, res, next) => {
  const {
    departure,
    arrival,
    departureDate,
    seat_type,
    seat_count,
    flightName,
  } = req.body;

  const flightId = req.params.flightId;

  if (
    [
      flightId,
      departure,
      arrival,
      departureDate,
      seat_type,
      seat_count,
      flightName,
    ].some((field) => field.trim() === "")
  ) {
    throw new ApiError(400, "Enter all the required fields");
  }

  const bookedFlight = await UserFlight({
    userId: req.user._id,
    flightId,
    departure,
    arrival,
    departureDate,
    seat_type,
    seat_count,
    flightName,
  });
  if (!bookedFlight) {
    throw new ApiError(400, "booking unsuccessfull");
  }
  return res
    .status(200)
    .json(new ApiResonse(200, bookedFlight, "Booking Successful"));
});

export { bookFlight };

import { Flights } from "../models/flights.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResonse } from "../utils/Apiresponse.js";

//register flight degails
const registerFlight = asyncHandler(async (req, res) => {
  const {
    flightName,
    flightDepart,
    flightDest,
    economyRate,
    business,
    businessRate,
    website,
    email,
    phoneNo,
  } = req.body;
  console.log(req.body);
  if (
    [
      flightName,
      flightDepart,
      flightDest,
      economyRate,
      business,
      businessRate,
      email,
      phoneNo,
    ].some((field) => String(field).trim() === "")
  ) {
    throw new ApiError("Enter all the required fields");
  }
  const flight = await Flights.create({
    userId: req.user._id,
    flightName,
    flightDepart,
    flightDest,
    economyRate,
    businessRate,
    email,
    phoneNo,
  });
  console.log(flight);

  const createdFlight = await Flights.find({ userId: req.user._id });

  if (!createdFlight) {
    throw new ApiError(400, "flight has not been created");
  }
  return res
    .status(200)
    .json(new ApiResonse(200, createdFlight, "Flight created sucessfully"));
});

const getAllFlight = asyncHandler(async (req, res) => {
  const allFlight = await Flights.find();

  if (!allFlight) {
    throw new ApiError(404, "No flights found");
  }
  return res
    .status(200)
    .json(new ApiResonse(200, allFlight, "Flights fetched successfully"));
});

export { registerFlight, getAllFlight };

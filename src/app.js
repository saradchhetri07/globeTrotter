import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credential: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//import routers
import userRouter from "./router/user.routes.js";
import flightRouter from "./router/flights.routes.js";
import hotelRouter from "./router/hotels.routes.js";
import userHotelRouter from "./router/user.hotels.routes.js";
import userFlightRouter from "./router/users.flights.routes.js";

app.use("/api/v1/user", userRouter);
app.use("/api/v1/flight", flightRouter);
app.use("/api/v1/hotels", hotelRouter);
app.use("/api/v1/userHotels", userHotelRouter);
app.use("/api/v1/userFlightRouter", userFlightRouter);

export { app };

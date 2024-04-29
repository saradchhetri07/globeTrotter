import mongoose, { Schema } from "mongoose";

const hotelsSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    hotelName: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    establishedDate: {
      type: Date,
      required: true,
    },
    singleRoom: {
      type: Number,
      required: true,
    },
    singleRoomRate: {
      type: Number,
      required: true,
    },
    doubleRoom: {
      type: Number,
      required: true,
    },
    doubleRoomRate: {
      type: Number,
      required: true,
    },
    suite: {
      type: Number,
      required: true,
    },
    suiteRate: {
      type: Number,
      required: true,
    },
    website: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const hotels = mongoose.model("Hotel", hotelsSchema);

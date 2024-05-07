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
      type: String,
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
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Hotel = mongoose.model("Hotel", hotelsSchema);

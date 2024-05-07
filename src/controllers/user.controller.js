import mongoose, { Mongoose } from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResonse } from "../utils/Apiresponse.js";
import { response } from "express";
import { User } from "../models/user.models.js";
import { cloudinaryUpload, cloudinaryDelete } from "../utils/cloudinary.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const accessToken = await user.generateAccessToken();
    console.log(
      `inside generateAccessAndRefreshToken accesstoken is ${accessToken}`
    );

    const refreshToken = await user.generateRefreshToken();
    console.log(
      `inside generateAccessAndRefreshToken refresh token is ${refreshToken}`
    );
    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  console.log("came here");
  const {
    email,
    password,
    firstName,
    lastName,
    dateOfBirth,
    gender,
    profilePicture,
    role,
  } = req.body;

  if (
    [email, password, firstName, lastName, dateOfBirth, gender, role].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({ email: email });

  if (existedUser) {
    throw new ApiError(409, "User already exists");
  }

  // const profilePictureLocalFilePath = req.files?.profilePicture[0]?.path;
  // console.log(profilePictureLocalFilePath);

  // if (!profilePictureLocalFilePath) {
  //   throw new ApiError(404, "Put up your profile picture");
  // }

  // const uploadedProfilePicture = await cloudinaryUpload(
  //   profilePictureLocalFilePath
  // );
  // console.log(uploadedProfilePicture);

  const user = await User.create({
    email,
    password,
    firstName: firstName.toLowerCase(),
    lastName: lastName.toLowerCase(),
    dateOfBirth,
    gender,
    profilePicture: "",
    role,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering user");
  }

  return res
    .status(200)
    .json(new ApiResonse(200, createdUser, "user registered sucessfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Both email and password are required");
  }
  //if email and password are present
  const user = await User.findOne({ email: email });

  if (!user) {
    throw new ApiError(404, "User with such email not found");
  }
  //if user found then check for password
  const isValidUser = await user.isPasswordCorrect(password);

  if (!isValidUser) {
    return res.status(401).json(new ApiError(401, "Invalid credentials"));
  }
  //if valid user generate access token
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResonse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged In successfully"
      )
    );
});

const logOutUser = asyncHandler(async (req, res) => {
  //   //clear cookies
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResonse(200, {}, "User logged out"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  try {
    const incomingRefreshToken =
      req.cookies?.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
      throw new ApiError(401, "Unauthorized access");
    }

    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id).select("-password");

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (user?.refreshToken !== incomingRefreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user?._id
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResonse(
          200,
          { accessToken, refreshToken },
          "AccessToken Refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refreshToken");
  }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { newPassword, oldPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword) {
    throw new ApiError(400, "New password and confirm password didnt match");
  }

  const user = await User.findById(req.user?._id);

  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Ivalid password");
  }
  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResonse(200, {}, "Password changed sucessfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res.status(200).json(200, req.user, "User fetched sucessfully");
});

const updateUserDetails = asyncHandler(async (req, res) => {
  const { firstName, lastName, email } = req.body;

  if (!firstName && !lastName && !email) {
    throw new ApiError(400, "enter details to update");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        firstName,
        lastName,
        email,
      },
    },
    {
      new: true,
    }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResonse(200, user, "User details updated succesfully"));
});

export {
  registerUser,
  loginUser,
  logOutUser,
  changeCurrentPassword,
  getCurrentUser,
  updateUserDetails,
  refreshAccessToken,
};

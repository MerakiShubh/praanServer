import mongoose, { Schema } from "mongoose";
import { config } from "../config/config.js";
import jwt from "jsonwebtoken";
const userSchema = new Schema(
  {
    role: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.methods.generateAccessToken = function () {
  const accessToken = config.get("accessToken");
  const expiryAccessToken = config.get("expiryAccessToken");

  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
    },
    accessToken,
    {
      expiresIn: expiryAccessToken,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  const refreshToken = config.get("refreshToken");
  const expiryRefreshToken = config.get("expiryRefreshToken");

  return jwt.sign(
    {
      _id: this._id,
    },
    refreshToken,
    {
      expiresIn: expiryRefreshToken,
    }
  );
};

export const User = mongoose.model("User", userSchema);

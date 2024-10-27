import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { config } from "../config/config.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const accessToken = config.get("accessToken");
    const decodedToken = jwt.verify(token, accessToken);

    const user = await User.findById(decodedToken?._id).select("-refreshToken");

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    //now user is mounted on request
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});

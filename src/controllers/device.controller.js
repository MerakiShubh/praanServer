import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Device } from "../models/device.model.js";

const addDevice = asyncHandler(async (req, res) => {
  const { devicename, model, description, location } = req.body;

  if (
    [devicename, model, description, location].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  try {
    const device = await Device.create({
      devicename,
      model,
      description,
      location,
    });
  } catch (error) {
    throw ApiError(500, "Something went wrong while adding device");
  }

  res.status(200).json(new ApiResponse(200, "Device added successfully"));
});

export { addDevice };

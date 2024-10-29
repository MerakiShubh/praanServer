import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { DeviceData } from "../models/deviceData.model.js";

const getDeviceDataForDate = asyncHandler(async (req, res) => {
  const { date } = req.query;

  if (!date || isNaN(Date.parse(date))) {
    return res
      .status(400)
      .json(new ApiResponse(400, "Invalid or missing date parameter"));
  }

  const startOfDay = new Date(date);
  startOfDay.setUTCHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setUTCHours(23, 59, 59, 999);

  const dataRecords = await DeviceData.find({
    timestamp: { $gte: startOfDay, $lte: endOfDay },
  });

  if (dataRecords.length === 0) {
    return res.status(404).json(
      new ApiResponse(404, `Data is not available for ${date}`, {
        data: null,
      })
    );
  }

  const averages = dataRecords.reduce(
    (acc, record) => {
      acc.p1 += record.p1;
      acc.p25 += record.p25;
      acc.p10 += record.p10;
      return acc;
    },
    { p1: 0, p25: 0, p10: 0 }
  );

  const count = dataRecords.length;
  const avgData = {
    date,
    p1: (averages.p1 / count).toFixed(2),
    p25: (averages.p25 / count).toFixed(2),
    p10: (averages.p10 / count).toFixed(2),
  };

  res
    .status(200)
    .json(new ApiResponse(200, "Data fetched successfully", { data: avgData }));
});

export { getDeviceDataForDate };

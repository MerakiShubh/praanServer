import { DeviceData } from "../models/deviceData.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getRealTimeData = asyncHandler(async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const sendData = async () => {
    try {
      const deviceData = await DeviceData.aggregate([
        {
          $sort: { timestamp: -1 },
        },
        {
          $group: {
            _id: "$device",
            latestEntry: { $first: "$$ROOT" },
          },
        },
        {
          $replaceRoot: { newRoot: "$latestEntry" },
        },
      ]);

      res.write(`data: ${JSON.stringify(deviceData)}\n\n`);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  sendData();

  const intervalId = setInterval(sendData, 20000);

  req.on("close", () => {
    clearInterval(intervalId);
    res.end();
  });
});

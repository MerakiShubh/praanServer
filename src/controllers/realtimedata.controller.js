// src/controllers/data.controller.js
import { DeviceData } from "../models/deviceData.model.js";

export const getRealTimeData = async (req, res) => {
  // Set headers for SSE
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const sendData = async () => {
    try {
      // Fetch the latest entry for each device
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

      // Send the latest data to the client
      res.write(`data: ${JSON.stringify(deviceData)}\n\n`);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  // Call `sendData` immediately on connection
  sendData();

  // Send data every 20 seconds
  const intervalId = setInterval(sendData, 20000);

  // Clean up on client disconnect
  req.on("close", () => {
    clearInterval(intervalId);
    res.end();
  });
};

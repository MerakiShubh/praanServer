import { Device } from "../models/device.model.js";
import { DeviceData } from "../models/deviceData.model.js";

export const handleIncomingData = async (topic, message) => {
  try {
    if (topic === "iot/device/data") {
      const data = JSON.parse(message.toString());

      // Check if device exists in DB
      const deviceExists = await Device.findById(data.deviceId);
      if (deviceExists) {
        // Save the data to the DeviceData collection
        const newData = new DeviceData({
          device: data.deviceId,
          p1: data.p1,
          p25: data.p25,
          p10: data.p10,
          timestamp: new Date(),
        });
        await newData.save();
        console.log("Data saved to MongoDB:", newData);
      } else {
        console.warn(`Device with ID ${data.deviceId} does not exist.`);
      }
    }
  } catch (err) {
    console.error("Error handling MQTT message:", err);
  }
};

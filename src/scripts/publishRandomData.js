import mqttClient from "../mqtt/index.js";
import { Device } from "../models/device.model.js";

export const publishRandomData = async () => {
  const devices = await Device.find({});
  devices.forEach((device) => {
    const data = {
      deviceId: device._id,
      p1: Math.floor(Math.random() * 100) + 1,
      p25: Math.floor(Math.random() * 100) + 1,
      p10: Math.floor(Math.random() * 100) + 1,
    };
    mqttClient.publish("iot/device/data", JSON.stringify(data), (err) => {
      if (err) {
        console.error("Publish error:", err);
      } else {
        console.log("Data published:", data);
      }
    });
  });
};

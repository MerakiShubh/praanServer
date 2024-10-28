import mongoose from "mongoose";

const deviceDataSchema = new mongoose.Schema({
  device: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Device",
    required: true,
  },
  p1: { type: Number, required: true, min: 1, max: 100 },
  p25: { type: Number, required: true, min: 1, max: 100 },
  p10: { type: Number, required: true, min: 1, max: 100 },
  timestamp: { type: Date, default: Date.now },
});

export const DeviceData = mongoose.model("DeviceData", deviceDataSchema);

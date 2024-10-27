import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema({
  devicename: { type: String, required: true },
  model: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
});

export const Device = mongoose.model("Device", deviceSchema);

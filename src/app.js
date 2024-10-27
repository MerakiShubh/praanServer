import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "./config/config.js";

const app = express();

//cors settings
const corsOrigin = config.get("corsOrigin");
app.use(
  cors({
    origin: corsOrigin,
    credentials: true,
  })
);

//incoming data setting
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import userRouter from "./routes/user.route.js";
import addDeviceRouter from "./routes/device.route.js";
app.use("/api/v1/user", userRouter);
app.use("/api/v1/device", addDeviceRouter);
export { app };

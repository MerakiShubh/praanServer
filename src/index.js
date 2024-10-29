// src/index.js
import { app } from "./app.js";
import { config } from "./config/config.js";
import connectDB from "./db/index.js";
import mqttClient from "./mqtt/index.js";
import cron from "node-cron";
import { publishRandomData } from "./scripts/publishRandomData.js";

const port = config.get("port");

connectDB()
  .then(() => {
    // Start the server
    app.listen(port || 3000, () => {
      console.log(`⚙️ Server is running at port : ${port}`);
    });

    // Initialize MQTT connection
    mqttClient.on("connect", () => {
      console.log(
        "🔌 MQTT Client connected successfully to HiveMQ Cloud Broker"
      );
    });

    mqttClient.on("error", (err) => {
      console.error("⚠️ MQTT Client connection error:", err);
    });

    // Listen for MQTT messages on specified topics
    mqttClient.on("message", (topic, message) => {
      console.log(`📥 Received message on ${topic}: ${message.toString()}`);
    });

    // Schedule the cron job to publish random data every 20 seconds
    cron.schedule("*/20 * * * * *", () => {
      console.log("Publishing random data to HiveMQ...");
      publishRandomData();
    });
  })
  .catch((err) => {
    console.log("❌ MONGO DB connection failed!", err);
  });

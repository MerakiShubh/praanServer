import mqtt from "mqtt";
import { config } from "../config/config.js";
import { handleIncomingData } from "../controllers/mqtt.controller.js";

const brokerUrl = `mqtts://${config.get("hiveMqBrokerUrl")}`;
const options = {
  port: config.get("hiveMqPort"),
  username: config.get("hiveMqUsername"),
  password: config.get("hiveMqPassword"),
};

const client = mqtt.connect(brokerUrl, options);

client.on("connect", () => {
  console.log("Connected to HiveMQ Cloud Broker");

  // Subscribe to the topic
  client.subscribe("iot/device/data", (err) => {
    if (!err) {
      console.log("Successfully subscribed to iot/device/data");
    } else {
      console.error("Subscription error:", err);
    }
  });
});

// Use the handleIncomingData function to process messages
client.on("message", (topic, message) => {
  handleIncomingData(topic, message);
});

client.on("error", (err) => {
  console.error("MQTT connection error:", err);
});

export default client;

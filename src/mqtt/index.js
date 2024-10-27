import mqtt from "mqtt";
import { config } from "../config/config.js";

const brokerUrl = `mqtts://${config.get("hiveMqBrokerUrl")}`;
const options = {
  port: config.get("hiveMqPort"),
  username: config.get("hiveMqUsername"),
  password: config.get("hiveMqPassword"),
};

const client = mqtt.connect(brokerUrl, options);

client.on("connect", () => {
  console.log("Connected to HiveMQ Cloud Broker");

  client.subscribe("myTopic", (err) => {
    if (!err) {
      console.log("Successfully subscribed to myTopic");
    } else {
      console.log("Subscription error:", err);
    }
  });

  client.publish("myTopic", "Hello from Express App!", (err) => {
    if (err) {
      console.log("Publish error:", err);
    }
  });
});

client.on("message", (topic, message) => {
  console.log(`Received message from ${topic}: ${message.toString()}`);
});

client.on("error", (err) => {
  console.error("MQTT connection error:", err);
});

export default client;

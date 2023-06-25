// plugins/kafkaPlugin.js
import { Kafka } from "kafkajs";

export function createKafkaObject() {
  const kafka = new Kafka({
    clientId: "0",
    brokers: ["localhost:9092"], // Replace with your Kafka broker(s) address
  });

  return kafka;
}

export function kafkaPlugin() {
  const kafka = new Kafka({
    clientId: "0",
    brokers: ["localhost:9092"], // Replace with your Kafka broker(s) address
  });

  // Custom logic using the Kafka client object

  return {
    name: "kafka-plugin",
    // Additional plugin configuration (if needed)
  };
}

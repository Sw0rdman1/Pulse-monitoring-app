import express from "express";
import { Kafka } from "kafkajs";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

// Initialize Express app
const app = express();
app.use(
  cors({
    origin: "http://localhost:3030/", // Replace with your desired origin
  })
); // Enable CORS
const server = http.createServer(app);
const io = new Server(server);

// Configure Kafka
const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"], // Replace with your Kafka broker(s) address
});
const consumer = kafka.consumer({ groupId: "0" });

// Define Kafka consumer
const runConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "my-topic", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const data = message.value.toString();
      console.log(`Received message: ${data}`);

      io.emit("message", data);
    },
  });
};

// Start the Kafka consumer
runConsumer().catch(console.error);

// Start the server
const port = 3000; // Replace with your desired port
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

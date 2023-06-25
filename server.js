import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "0",
  brokers: ["localhost:9092"], // Replace with your Kafka broker(s) address
});

const producer = kafka.producer();

async function produceMessage(topic, message) {
  await producer.connect();
  await producer.send({
    topic: topic,
    messages: [{ value: message }],
  });
}

const sendRandomPulse = () => {
  setInterval(() => {
    const min = 80;
    const max = 110;
    let randomPulse = Math.floor(Math.random() * (max - min + 1)) + min;
    produceMessage("my-topic", randomPulse + "");
  }, 1000);
};

sendRandomPulse();

import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import GraphComponent from "./Graph";

const HealthMonitoringApp: React.FC = () => {
  const [heartRateData, setHeartRateData] = useState<number[]>([]);
  let currentHearthRate = heartRateData.at(heartRateData.length - 1);
  let previousHearthRates = heartRateData.slice(7, 14);
  // @ts-ignore
  useEffect(() => {
    const socket = io(); // Replace with the correct address of your Socket.io server
    socket.on("message", (data: string) => {
      console.log(data);
      const int = parseInt(data, 10);

      setHeartRateData((heartRateData: number[]) => [
        ...heartRateData.slice(-14),
        int,
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="main-screen">
      <div className="header">
        <h1>Health Care</h1>
      </div>
      <GraphComponent heartRateData={heartRateData} />
      <div className="current-pulse">
        <h2>Heart Rate:</h2>
        <h2 className="text">{currentHearthRate}</h2>
      </div>
      <p>
        <b> Previous heart rates:</b>
      </p>
      <div className="previous-pulse">
        {previousHearthRates.map((pulse) => {
          return <p>{pulse}</p>;
        })}
      </div>
    </div>
  );
};

export default HealthMonitoringApp;

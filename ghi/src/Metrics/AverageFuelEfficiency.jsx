import React from "react";
import MetricCard from "./MetricCard";

const AverageFuelEfficiency = ({ gasRecords }) => {
  const mpgArray = gasRecords.map((record) => record.mpg_per_tank);
  const totalMpg = mpgArray.reduce((acc, mpg) => acc + mpg, 0);
  const avgMPG = (totalMpg / mpgArray.length).toFixed(1);

  return <MetricCard title="Average Fuel Efficiency" value={`${avgMPG} MPG`} />;
};

export default AverageFuelEfficiency;

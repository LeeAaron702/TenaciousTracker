import React from "react";
import MetricCard from "./MetricCard";

const TotalFillUps = ({ gasRecords }) => {
  const totalFillUps = gasRecords.length;

  return <MetricCard title="Total Fill-Ups" value={`${totalFillUps}`} />;
};

export default TotalFillUps;

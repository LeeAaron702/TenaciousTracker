import React from "react";
import MetricCard from "./MetricCard";

const AverageTimeBetweenFillUps = ({ gasRecords }) => {
  let totalDays = 0;
  let count = 0;
  let lastRecord;

  gasRecords.forEach((record) => {
    if (lastRecord) {
      const days =
        (new Date(record.purchase_date) - new Date(lastRecord.purchase_date)) /
        (1000 * 60 * 60 * 24);
      totalDays += days;
      count += 1;
    }
    lastRecord = record;
  });

  const avgDays = count > 0 ? (totalDays / count).toFixed(1) : 0;

  return (
    <MetricCard
      title="Average Time Between Fill-Ups"
      value={`${avgDays} days`}
    />
  );
};

export default AverageTimeBetweenFillUps;

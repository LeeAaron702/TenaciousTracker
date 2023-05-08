import React from "react";
import MetricCard from "./MetricCard";

const LongestStretchMilesOnSingleTank = ({ gasRecords }) => {
  let maxMiles = 0;
  let lastRecord;

  gasRecords.forEach((record) => {
    if (lastRecord && record.odometer_reading > lastRecord.odometer_reading) {
      const miles = record.odometer_reading - lastRecord.odometer_reading;
      if (miles > maxMiles) {
        maxMiles = miles;
      }
    }
    lastRecord = record;
  });

  return (
    <MetricCard title="Longest Tank" value={`${maxMiles.toFixed(1)} mi`} />
  );
};

export default LongestStretchMilesOnSingleTank;

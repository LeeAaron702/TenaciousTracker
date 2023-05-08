import React from "react";
import MetricCard from "./MetricCard";

const TotalMilesDriven = ({ gasRecords }) => {
  const sortedRecords = gasRecords
    .slice()
    .sort((a, b) => a.odometer_reading - b.odometer_reading);
  const totalMiles =
    sortedRecords[sortedRecords.length - 1].odometer_reading -
    sortedRecords[0].odometer_reading;

  return <MetricCard title="Total Miles Driven" value={`${totalMiles} mi`} />;
};

export default TotalMilesDriven;

import React from "react";
import MetricCard from "./MetricCard";

const AverageCostPerMile = ({ gasRecords }) => {
  const totalSpent = gasRecords.reduce((acc, record) => acc + record.price, 0);
  const totalMiles =
    gasRecords[gasRecords.length - 1].odometer_reading -
    gasRecords[0].odometer_reading;
  const avgCostPerMile = (totalSpent / totalMiles).toFixed(2);

  return (
    <MetricCard
      title="Average Fuel Cost per Mile"
      value={`$${avgCostPerMile}`}
    />
  );
};

export default AverageCostPerMile;

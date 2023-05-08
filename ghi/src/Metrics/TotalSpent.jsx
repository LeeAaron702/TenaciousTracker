import React from "react";
import MetricCard from "./MetricCard";

const TotalSpent = ({ gasRecords, serviceRecords }) => {
  const totalFuelSpent = gasRecords.reduce(
    (acc, record) => acc + record.price,
    0
  );
  const totalServiceSpent = serviceRecords.reduce(
    (acc, record) => acc + record.service_cost,
    0
  );
  const totalSpent = totalFuelSpent + totalServiceSpent;

  if (gasRecords.length === 0 && serviceRecords.length === 0) {
    return <MetricCard title="Total Spent" value="No records found" />;
  }

  return <MetricCard title="Total Spent" value={`$${totalSpent.toFixed(2)}`} />;
};

export default TotalSpent;

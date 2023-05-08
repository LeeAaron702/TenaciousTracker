import React from "react";
import MetricCard from "./MetricCard";

const TotalMaintenanceSpent = ({ serviceRecords }) => {
  const totalMaintenanceSpent = serviceRecords.reduce(
    (acc, record) => acc + record.service_cost,
    0
  );

  if (serviceRecords.length === 0) {
    return (
      <MetricCard title="Total Maintenance Spent" value="No records found" />
    );
  }

  return (
    <MetricCard
      title="Total Maintenance Spent"
      value={`$${totalMaintenanceSpent.toFixed(2)}`}
    />
  );
};

export default TotalMaintenanceSpent;

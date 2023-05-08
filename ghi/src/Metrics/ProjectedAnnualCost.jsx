import React from "react";
import MetricCard from "./MetricCard";

const ProjectedAnnualCost = ({ gasRecords, serviceRecords }) => {
  const calculateProjectedAnnualCost = () => {
    const currentDate = new Date();
    const oneYearAgo = new Date(
      currentDate.getFullYear() - 1,
      currentDate.getMonth(),
      currentDate.getDate()
    );

    const totalFuelSpent = gasRecords
      .filter((record) => new Date(record.purchase_date) >= oneYearAgo)
      .reduce((total, record) => total + record.price * record.gallons, 0);

    const totalMaintenanceSpent = serviceRecords
      .filter((record) => new Date(record.service_date) >= oneYearAgo)
      .reduce((total, record) => total + record.service_cost, 0);

    return totalFuelSpent + totalMaintenanceSpent;
  };

  const projectedAnnualCost = calculateProjectedAnnualCost();

  return (
    <MetricCard
      title="Projected Annual Cost"
      value={`$${projectedAnnualCost.toFixed(2)}`}
    />
  );
};

export default ProjectedAnnualCost;

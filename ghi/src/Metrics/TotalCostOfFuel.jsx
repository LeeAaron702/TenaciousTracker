import React from "react";
import MetricCard from "./MetricCard";

const TotalCostOfFuel = ({ gasRecords }) => {
  const totalSpent = gasRecords.reduce((acc, record) => acc + record.price, 0);

  return <MetricCard title="Total Cost of Fuel" value={`$${totalSpent}`} />;
};

export default TotalCostOfFuel;

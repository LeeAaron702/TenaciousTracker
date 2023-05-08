import React from "react";
import MetricCard from "./MetricCard";

const TotalFuelPurchases = ({ gasRecords }) => {
  const totalGallons = gasRecords.reduce(
    (acc, record) => acc + record.gallons,
    0
  );

  return (
    <MetricCard title="Total Fuel Purchases" value={`${totalGallons} gal`} />
  );
};

export default TotalFuelPurchases;

import React from "react";
import MetricCard from "./MetricCard";

const AveragePricePerGallon = ({ gasRecords }) => {
  const totalSpent = gasRecords.reduce((acc, record) => acc + record.price, 0);
  const totalGallons = gasRecords.reduce(
    (acc, record) => acc + record.gallons,
    0
  );
  const avgPricePerGal = (totalSpent / totalGallons).toFixed(2);

  return (
    <MetricCard title="Average Price per Gallon" value={`$${avgPricePerGal}`} />
  );
};

export default AveragePricePerGallon;

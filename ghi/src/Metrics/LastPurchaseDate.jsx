import React from "react";
import MetricCard from "./MetricCard";

const LastFuelPurchaseDate = ({ gasRecords }) => {
  const lastPurchaseDate = new Date(
    gasRecords[gasRecords.length - 1].purchase_date
  );
  const month = lastPurchaseDate.toLocaleString("default", { month: "short" });
  const day = lastPurchaseDate.getDate();
  const year = lastPurchaseDate.getFullYear().toString().substr(-2);
  const formattedDate = `${month} ${day}, ${year}`;

  return <MetricCard title="Last Fuel Purchase" value={formattedDate} />;
};

export default LastFuelPurchaseDate;

import React from "react";
import MetricCard from "./MetricCard";

const AverageMPGPerMonth = ({ gasRecords }) => {
  // Get an array of all the unique year/month combinations
  const monthYearSet = new Set(
    gasRecords.map((record) => {
      const date = new Date(record.purchase_date);
      return `${date.getFullYear()}-${date.getMonth()}`;
    })
  );

  // Calculate the average MPG for each month
  const mpgByMonth = [];
  monthYearSet.forEach((monthYear) => {
    const [year, month] = monthYear.split("-");
    const totalMiles = gasRecords
      .filter(
        (record) =>
          new Date(record.purchase_date).getFullYear() === parseInt(year) &&
          new Date(record.purchase_date).getMonth() === parseInt(month)
      )
      .reduce((acc, record) => acc + record.gallons * record.mpg_per_tank, 0);
    const totalGallons = gasRecords
      .filter(
        (record) =>
          new Date(record.purchase_date).getFullYear() === parseInt(year) &&
          new Date(record.purchase_date).getMonth() === parseInt(month)
      )
      .reduce((acc, record) => acc + record.gallons, 0);
    const avgMPG = (totalMiles / totalGallons).toFixed(1);
    mpgByMonth.push({
      month: parseInt(month) + 1,
      year: parseInt(year),
      avgMPG,
    });
  });

  // Sort the data by date
  mpgByMonth.sort((a, b) => {
    if (a.year !== b.year) {
      return a.year - b.year;
    }
    return a.month - b.month;
  });

  // Extract only the last three months
  const lastThreeMonths = mpgByMonth.slice(-3);

  // Create the display string for each month
  const displayData = lastThreeMonths.map((data, index) => (
    <span
      className="d-block"
      key={index}
    >{`${data.month}/${data.year}: ${data.avgMPG} MPG`}</span>
  ));

  return <MetricCard title="Average MPG Per Month" value={displayData} />;
};

export default AverageMPGPerMonth;

import React, { useEffect, useState } from "react";
import MetricCard from "./MetricCard";

const MetricsContainer = ({ vehicleId, token, refresh }) => {
  const [metrics, setMetrics] = useState(null);
  const [status, setStatus] = useState("loading");

  const calculateMetrics = (gasRecords) => {
    const numFuelLogs = gasRecords.length;

    let totalMpg = 0;
    let longestDistance = 0;
    let totalDays = 0;

    if (gasRecords.length > 0 && gasRecords[0].odometer_reading !== undefined) {
      const firstMpg = gasRecords[0].mpg_per_tank;
      totalMpg += firstMpg;
    }

    gasRecords.reduce((prevRecord, currentRecord) => {
      if (currentRecord.odometer_reading !== undefined) {
        const distance =
          currentRecord.odometer_reading - prevRecord.odometer_reading;
        const mpg = distance / currentRecord.gallons;
        totalMpg += mpg;
        if (distance > longestDistance) {
          longestDistance = distance;
        }
      }
      if (prevRecord.purchase_date && currentRecord.purchase_date) {
        const prevDate = new Date(prevRecord.purchase_date);
        const currentDate = new Date(currentRecord.purchase_date);
        const daysBetween = (currentDate - prevDate) / (1000 * 60 * 60 * 24);
        totalDays += daysBetween;
      }

      return currentRecord;
    });

    const averageMpg = totalMpg / (numFuelLogs - 1);

    const totalGallons = gasRecords.reduce(
      (acc, record) => acc + record.gallons,
      0
    );
    const totalFuelCost = gasRecords.reduce(
      (acc, record) => acc + record.price,
      0
    );

    const lastMpg = gasRecords[gasRecords.length - 1].mpg_per_tank;
    const bestMpg = Math.max(
      ...gasRecords.map((record) => record.mpg_per_tank)
    );
    const averageFuelPurchase = totalFuelCost / numFuelLogs;
    const totalMileage =
      gasRecords[gasRecords.length - 1].odometer_reading -
      gasRecords[0].odometer_reading;
    const averagePricePerMile = totalFuelCost / totalMileage;
    const averagePricePerGallon = totalFuelCost / totalGallons;
    const averageDaysBetweenFillUps = totalDays / (numFuelLogs - 1);

    return {
      numFuelLogs,
      totalGallons,
      totalFuelCost,
      totalMileage,
      averageMpg,
      lastMpg,
      bestMpg,
      averageFuelPurchase,
      averagePricePerMile,
      averagePricePerGallon,
      longestDistance,
      averageDaysBetweenFillUps,
    };
  };

  const fetchGasRecords = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/vehicle/${vehicleId}/gas_records`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (response.ok) {
      const data = await response.json();
      if (data.length === 0) {
        setStatus("noRecords");
      } else {
        setMetrics(calculateMetrics(data));
        setStatus("loaded");
      }
    } else {
      setStatus("failed");
    }
  };

  useEffect(() => {
    if (vehicleId && token) {
      fetchGasRecords();
    }
  }, [vehicleId, token, refresh]);

  if (status === "loading") {
    return <p>Loading metrics...</p>;
  } else if (status === "failed") {
    return <p>Failed to get Gas Records.</p>;
  } else if (status === "noRecords") {
    return <p>Please record gas purchases to load metrics.</p>;
  }

  return (
    <div className="row">
      <div className="col-md-6 col-lg-4 mb-4">
        <MetricCard title="Average MPG" value={metrics.averageMpg.toFixed(2)} />
      </div>
      <div className="col-md-6 col-lg-4 mb-4">
        <MetricCard title="Last MPG" value={metrics.lastMpg.toFixed(2)} />
      </div>
      <div className="col-md-6 col-lg-4 mb-4">
        <MetricCard title="Best MPG" value={metrics.bestMpg.toFixed(2)} />
      </div>
      <div className="col-md-6 col-lg-4 mb-4">
        <MetricCard title="Number of Fuel Logs" value={metrics.numFuelLogs} />
      </div>
      <div className="col-md-6 col-lg-4 mb-4">
        <MetricCard
          title="Total Fuel Cost"
          value={`$${metrics.totalFuelCost.toFixed(2)}`}
        />
      </div>
      <div className="col-md-6 col-lg-4 mb-4">
        <MetricCard
          title="Total Gallons"
          value={metrics.totalGallons.toFixed(2)}
        />
      </div>
      <div className="col-md-6 col-lg-4 mb-4">
        <MetricCard
          title="Average Fuel Purchase"
          value={`$${metrics.averageFuelPurchase.toFixed(2)}`}
        />
      </div>
      <div className="col-md-6 col-lg-4 mb-4">
        <MetricCard
          title="Total Mileage Tracked"
          value={metrics.totalMileage.toFixed(2)}
        />
      </div>
      <div className="col-md-6 col-lg-4 mb-4">
        <MetricCard
          title="Average Price per Mile"
          value={`$${metrics.averagePricePerMile.toFixed(4)}`}
        />
      </div>
      <div className="col-md-6 col-lg-4 mb-4">
        <MetricCard
          title="Average Price per Gallon"
          value={`$${metrics.averagePricePerGallon.toFixed(2)}`}
        />
      </div>
      <div className="col-md-6 col-lg-4 mb-4">
        <MetricCard
          title="Longest Tank"
          value={`${metrics.longestDistance.toFixed(2)} miles`}
        />
      </div>
      <div className="col-md-6 col-lg-4 mb-4">
        <MetricCard
          title="Average Days Between Fill Ups"
          value={metrics.averageDaysBetweenFillUps.toFixed(2)}
        />
      </div>
    </div>
  );
};

export default MetricsContainer;

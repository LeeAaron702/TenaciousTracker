import React, { useEffect, useState } from "react";
import MetricCard from "./MetricCard";
import TotalFuelPurchases from "./TotalFuelPurchases";
import AverageFuelEfficiency from "./AverageFuelEfficiency";
import AveragePricePerGallon from "./AveragePricePerGallon";
import TotalCostOfFuel from "./TotalCostOfFuel";
import TotalMilesDriven from "./TotalMilesDriven";
import AverageCostPerMile from "./AverageCostPerMile";
import LastFuelPurchaseDate from "./LastPurchaseDate";
import AverageMPGPerMonth from "./AverageMPGPerMonth";
import TotalFillUps from "./TotalFillUps";
import LongestStretchMilesOnSingleTank from "./LongestStretchMilesOnSingleTank ";
import AverageTimeBetweenFillUps from "./AverageTimeBetweenFillUps";
import TotalSpent from "./TotalSpent";
import TotalMaintenanceSpent from "./TotalMaintenanceSpent";
import ProjectedAnnualCost from "./ProjectedAnnualCost";

const MetricsContainer = ({ vehicleId, token, refresh }) => {
  const [status, setStatus] = useState("loading");
  const [gas_records, setGasRecords] = useState([]);
  const [services, setServices] = useState([]);

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
        setStatus("loaded");
        setGasRecords(data);
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

  const fetchServices = async () => {
    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/vehicle/${vehicleId}/services`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
      const data = await response.json();
      setServices(data);
    }
  };

  useEffect(() => {
    if (token) {
      fetchServices();
    }
  }, [token, vehicleId, refresh]);

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
        <TotalSpent gasRecords={gas_records} serviceRecords={services} />
      </div>
      <div className="col-md-6 col-lg-4 mb-4">
        <AveragePricePerGallon gasRecords={gas_records} />
      </div>
      <div className="col-md-6 col-lg-4 mb-4">
        <TotalCostOfFuel gasRecords={gas_records} />
      </div>
      <div className="col-md-6 col-lg-4 mb-4">
        <AverageFuelEfficiency gasRecords={gas_records} />
      </div>
      <div className="col-md-6 col-lg-4 mb-4">
        <TotalFuelPurchases gasRecords={gas_records} />
      </div>
      <div className="col-md-6 col-lg-4 mb-4">
        <TotalMilesDriven gasRecords={gas_records} />
      </div>
      <div className="col-md-6 col-lg-4 mb-4">
        <AverageCostPerMile gasRecords={gas_records} />
      </div>
      <div className="col-md-6 col-lg-4 mb-4">
        <LastFuelPurchaseDate gasRecords={gas_records} />
      </div>
      <div className="col-md-6 col-lg-4 mb-4">
        <TotalFillUps gasRecords={gas_records} />
      </div>
      <div className="col-md-6 col-lg-4 mb-4">
        <LongestStretchMilesOnSingleTank gasRecords={gas_records} />
      </div>
      <div className="col-md-6 col-lg-8 mb-4">
        <AverageMPGPerMonth gasRecords={gas_records} />
      </div>
      <div className="col-md-6 col-lg-4 mb-4">
        <AverageTimeBetweenFillUps gasRecords={gas_records} />
      </div>
      <div className="col-md-6 col-lg-4 mb-4">
        <TotalMaintenanceSpent serviceRecords={services} />
      </div>
      <div className="col-md-6 col-lg-4 mb-4">
        <ProjectedAnnualCost
          gasRecords={gas_records}
          serviceRecords={services}
        />
      </div>
    </div>
  );
};

export default MetricsContainer;

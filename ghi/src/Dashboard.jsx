import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "@galvanize-inc/jwtdown-for-react";
import useUser from "./useUser";
import VehicleList from "./VehicleList";
import GasRecordList from "./GasRecordList";
import VehicleForm from "./VehicleForm";
import MetricsContainer from "./Metrics/MetricsContainer";
import ServiceList from "./ServiceList";
import FuelLogVisualization from "./FuelLogVisualization";
import MaintenanceCostDistribution from "./MaintenanceCostDistribution";
import RecordsMap from "./RecordMap";
import FuelEfficiencyLineGraph from "./FuelEfficiencyLineGraph";

const Dashboard = () => {
  const { token } = useContext(AuthContext);
  const user = useUser(token);
  const [newVehicleModal, setNewVeicleModal] = useState(false);

  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);

  const [refresh, setRefresh] = useState(false);
  const [services, setServices] = useState([]);

  const [gasRecords, setGasRecords] = useState([]);

  const openModal = () => {
    setNewVeicleModal(true);
  };

  const closeModal = () => {
    setNewVeicleModal(false);
  };

  const fetchServices = async () => {
    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/vehicle/${selectedVehicleId}/services`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
      const data = await response.json();
      setServices(data);
    }
  };

  const fetchVehicles = async () => {
    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/vehicles`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
      const data = await response.json();
      setVehicles(data);
    }
  };

  // useEffect(() => {
  //   if (token) {
  //     fetchVehicles();
  //   }
  // }, [token, selectedVehicleId]);

  const fetchGasRecords = async () => {
    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/vehicle/${selectedVehicleId}/gas_records`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
      const data = await response.json();
      setGasRecords(data);
    }
  };

  // useEffect(() => {
  //   if (token) {
  //     fetchGasRecords();
  //   }
  // }, [token, selectedVehicleId]);

  useEffect(() => {
    if (token) {
      fetchServices();
      fetchVehicles();
      fetchGasRecords();
    }
  }, [token, selectedVehicleId]);

  const handleTabClick = (vehicleId) => {
    setSelectedVehicleId(vehicleId);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 text-center">
          <h1>Welcome {user ? user.username : ""}</h1>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <ul className="nav nav-tabs">
            {vehicles
              .sort((a, b) => a.id - b.id)
              .map((vehicle) => (
                <li className="nav-item" key={vehicle.id}>
                  <a
                    className={`nav-link ${
                      selectedVehicleId === vehicle.id ? "active" : ""
                    }`}
                    onClick={() => handleTabClick(vehicle.id)}
                  >
                    {vehicle.make} {vehicle.model}
                  </a>
                </li>
              ))}
            <li className="nav-link" onClick={openModal}>
              New Vehicle
            </li>
          </ul>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-8">
          <div className="accordion accordion-flush" id="gas-records-accordion">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#gas-records-collapse"
                  aria-expanded="false"
                  aria-controls="gas-records-collapse"
                >
                  Gas Records
                </button>
              </h2>
              <div
                id="gas-records-collapse"
                className="accordion-collapse collapse"
                data-bs-parent="#gas-records-accordion"
              >
                <div className="accordion-body">
                  {selectedVehicleId && (
                    <GasRecordList
                      vehicleId={selectedVehicleId}
                      setRefresh={setRefresh}
                      fetchVehicles={fetchVehicles}
                      gasRecords={gasRecords}
                      fetchGasRecords={fetchGasRecords}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#service-records-collapse"
                  aria-expanded="false"
                  aria-controls="service-records-collapse"
                >
                  Service Records
                </button>
              </h2>
              <div
                id="service-records-collapse"
                className="accordion-collapse collapse"
                data-bs-parent="#gas-records-accordion"
              >
                <div className="accordion-body">
                  {selectedVehicleId && (
                    <ServiceList
                      vehicleId={selectedVehicleId}
                      setRefresh={setRefresh}
                      fetchVehicles={fetchVehicles}
                      services={services}
                      fetchServices={fetchServices}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#fuel-consumption-collapse"
                  aria-expanded="false"
                  aria-controls="fuel-consumption-collapse"
                >
                  Fuel Consumption Visualization
                </button>
              </h2>
              <div
                id="fuel-consumption-collapse"
                className="accordion-collapse collapse"
                data-bs-parent="#gas-records-accordion"
              >
                <div className="accordion-body">
                  {selectedVehicleId && (
                    <FuelLogVisualization
                      vehicleId={selectedVehicleId}
                      token={token}
                      records={gasRecords}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#fuel-efficiency-line-graph-collapse"
                  aria-expanded="false"
                  aria-controls="fuel-efficiency-line-graph-collapse"
                >
                  Fuel Efficiency MPG Line Graph
                </button>
              </h2>
              <div
                id="fuel-efficiency-line-graph-collapse"
                className="accordion-collapse collapse"
                data-bs-parent="#gas-records-accordion"
              >
                <div className="accordion-body">
                  {selectedVehicleId && (
                    <FuelEfficiencyLineGraph
                      vehicleId={selectedVehicleId}
                      token={token}
                      records={gasRecords}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#maintenance-cost-distribution-collapse"
                  aria-expanded="false"
                  aria-controls="maintenance-cost-distribution-collapse"
                >
                  Maintenance Cost Distribution by Service Type
                </button>
              </h2>
              <div
                id="maintenance-cost-distribution-collapse"
                className="accordion-collapse collapse"
                data-bs-parent="#gas-records-accordion"
              >
                <div className="accordion-body">
                  {selectedVehicleId && (
                    <MaintenanceCostDistribution
                      vehicleId={selectedVehicleId}
                      token={token}
                      services={services}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#records-map-collapse"
                  aria-expanded="false"
                  aria-controls="records-map-collapse"
                >
                  Records Map
                </button>
              </h2>
              <div
                id="records-map-collapse"
                className="accordion-collapse collapse"
                data-bs-parent="#gas-records-accordion"
              >
                <div className="accordion-body">
                  {selectedVehicleId && (
                    <RecordsMap gasRecords={gasRecords} services={services} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 mt-2">
          {selectedVehicleId && (
            <MetricsContainer
              vehicleId={selectedVehicleId}
              token={token}
              refresh={refresh}
            />
          )}
        </div>
      </div>

      {newVehicleModal && (
        <VehicleForm closeModal={closeModal} fetchVehicles={fetchVehicles} />
      )}
    </div>
  );
};

export default Dashboard;

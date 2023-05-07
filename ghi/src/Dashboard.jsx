import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "@galvanize-inc/jwtdown-for-react";
import useUser from "./useUser";
import VehicleList from "./VehicleList";
import GasRecordList from "./GasRecordList";
import VehicleForm from "./VehicleForm";
import MetricsContainer from "./Metrics/MetricsContainer";

const Dashboard = () => {
  const { token } = useContext(AuthContext);
  const user = useUser(token);
  const [newVehicleModal, setNewVeicleModal] = useState(false);

  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);

  const [refresh, setRefresh] = useState(false);

  const openModal = () => {
    setNewVeicleModal(true);
  };

  const closeModal = () => {
    setNewVeicleModal(false);
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

  useEffect(() => {
    if (token) {
      fetchVehicles();
    }
  }, [token]);

  const handleTabClick = (vehicleId) => {
    setSelectedVehicleId(vehicleId);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center">
          <h1>Welcome to your Dashboard</h1>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <ul className="nav nav-tabs">
            {vehicles.map((vehicle) => (
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
                    />
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

import React from "react";
import { useNavigate, Link } from "react-router-dom";

const VehicleList = ({ vehicles, onSelectVehicle }) => {
  const navigate = useNavigate();

  const handleCreateNewVehicle = () => {
    navigate("/vehicle/create");
  };

  return (
    <div>
      <h2 className="text-center mb-4">Vehicles</h2>
      <ul className="nav nav-tabs">
        {vehicles.map((vehicle) => (
          <li key={vehicle.id} className="nav-item">
            <a
              className="nav-link"
              onClick={() => onSelectVehicle(vehicle.id)}
              style={{ cursor: "pointer" }}
            >
              {vehicle.make} {vehicle.model}
            </a>
          </li>
        ))}
      </ul>
      <button
        className="btn btn-primary mb-4 mt-3"
        onClick={handleCreateNewVehicle}
      >
        Create New Vehicle
      </button>
    </div>
  );
};

export default VehicleList;

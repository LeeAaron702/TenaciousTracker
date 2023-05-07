import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import useToken, { AuthContext } from "@galvanize-inc/jwtdown-for-react";
import useUser from "./useUser";

const VehicleForm = ({
  vehicle = {},
  closeModal,
  fetchVehicle,
  fetchVehicles,
}) => {
  const { token } = useContext(AuthContext);
  const user = useUser(token);
  const navigate = useNavigate();
  const [make, setMake] = useState(vehicle.make || "");
  const [model, setModel] = useState(vehicle.model || "");
  const [year, setYear] = useState(vehicle.year || "");
  const [vin, setVin] = useState(vehicle.vin || "");
  const [modifications, setModifications] = useState(
    vehicle.modifications || ""
  );
  const [fuelType, setFuelType] = useState(vehicle.fuel_type || "");
  const [color, setColor] = useState(vehicle.color || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      make,
      model,
      year,
      vin,
      fuel_type: fuelType,
      color,
      modifications,
    };
    data.user_id = user.id;
    console.log(data);

    const url = vehicle.id
      ? `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/vehicle/${vehicle.id}`
      : `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/vehicle`;
    const method = vehicle.id ? "PUT" : "POST";
    const response = await fetch(url, {
      method,
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      fetchVehicles();
      closeModal();
    } else {
      console.error("Error updating/creating vehicle; Please try again");
    }
  };

  return (
    <>
      <div className="modal-backdrop fade show"></div>
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        onClick={closeModal}
      >
        <div
          className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {vehicle.id ? "Edit" : "Create"} Vehicle
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={closeModal}
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="make"
                        value={make}
                        onChange={(event) => setMake(event.target.value)}
                        required
                        placeholder="Make"
                      />
                      <label htmlFor="make">Make</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="model"
                        value={model}
                        onChange={(event) => setModel(event.target.value)}
                        required
                        placeholder="Model"
                      />
                      <label htmlFor="model">Model</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="number"
                        className="form-control"
                        id="year"
                        value={year}
                        onChange={(event) => setYear(event.target.value)}
                        required
                        placeholder="Year"
                      />
                      <label htmlFor="year">Year</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="vin"
                        value={vin}
                        onChange={(event) => setVin(event.target.value)}
                        required
                        placeholder="VIN"
                      />
                      <label htmlFor="vin">VIN</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="fuelType"
                        value={fuelType}
                        onChange={(event) => setFuelType(event.target.value)}
                        placeholder="Fuel Type"
                      />
                      <label htmlFor="fuelType">Fuel Type</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="color"
                        value={color}
                        onChange={(event) => setColor(event.target.value)}
                        placeholder="Color"
                      />
                      <label htmlFor="color">Color</label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="modifications"
                        value={modifications}
                        onChange={(event) =>
                          setModifications(event.target.value)
                        }
                        placeholder="Modifications"
                      />
                      <label htmlFor="modifications">
                        Modifications (optional)
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <button className="btn btn-primary mt-3">
                      {vehicle.id ? "Update Vehicle" : "Add Vehicle"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VehicleForm;

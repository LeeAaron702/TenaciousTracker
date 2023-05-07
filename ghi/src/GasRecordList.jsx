import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "@galvanize-inc/jwtdown-for-react";
import useUser from "./useUser";
import GasRecordForm from "./GasRecordForm";
import VehicleForm from "./VehicleForm";

const GasRecordList = ({ vehicleId, setRefresh, fetchVehicles }) => {
  const { token } = useContext(AuthContext);
  const user = useUser(token);
  const [gasRecords, setGasRecords] = useState([]);

  const [showEditVehicleModal, setShowEditVehicleModal] = useState(false);
  const [vehicle, setVehicle] = useState("");
  const [editingVehicle, setEditingVehicle] = useState(null);

  const openEditVehicleModal = (vehicle) => {
    setShowEditVehicleModal(true);
    setEditingVehicle(vehicle);
  };

  const closeEditVehicleModal = () => {
    setShowEditVehicleModal(false);
  };

  const fetchVehicle = async () => {
    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/vehicle/${vehicleId}`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
      const data = await response.json();
      setVehicle(data);
    }
  };

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedGasId, setSelectedGasId] = useState(null);

  const openModal = (gasId) => {
    setShowEditModal(true);
    setSelectedGasId(gasId);
  };

  const closeModal = () => {
    setShowEditModal(false);
    setSelectedGasId(null);
  };

  const fetchGasRecords = async () => {
    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/vehicle/${vehicleId}/gas_records`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
      const data = await response.json();
      setGasRecords(data);
    }
  };

  useEffect(() => {
    if (token) {
      fetchGasRecords();
      fetchVehicle();
    }
  }, [token, vehicleId]);

  const sortedGasRecords = gasRecords.sort(
    (a, b) => new Date(b.purchase_date) - new Date(a.purchase_date)
  );

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("en-US", {
      year: "2-digit",
      month: "short",
      day: "2-digit",
    }).format(date);
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="mb-0">Gas Records</h1>
        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={openEditVehicleModal}
        >
          Edit Current Vehicle
        </button>
        <button className="btn btn-outline-primary btn-sm" onClick={openModal}>
          Add Gas Record
        </button>
      </div>
      <div className="table-responsive">
        <table className="table table-sm table-striped">
          <thead>
            <tr>
              <th>Purchase Date</th>
              <th>Mileage</th>
              <th>Gallons</th>
              <th>MPG</th>
              <th>Cost per Gallon</th>
              <th>Total</th>
              <th>Payment Method</th>
              <th>Fuel Brand</th>
              <th>Location</th>
              <th>Notes</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {sortedGasRecords.map((gasRecord) => (
              <tr key={gasRecord.id}>
                <td>{formatDate(gasRecord.purchase_date)}</td>
                <td>{gasRecord.odometer_reading}</td>
                <td>{gasRecord.gallons}</td>
                <td>{gasRecord.mpg_per_tank}</td>
                <td> {(gasRecord.price / gasRecord.gallons).toFixed(2)}</td>
                <td>{gasRecord.price}</td>
                <td>{gasRecord.payment_method}</td>
                <td>{gasRecord.fuel_brand}</td>
                <td>{gasRecord.location}</td>
                <td>{gasRecord.notes}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => openModal(gasRecord.id)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showEditModal && (
        <GasRecordForm
          gasId={selectedGasId}
          closeModal={closeModal}
          fetchGasRecords={fetchGasRecords}
          vehicleId={vehicleId}
          gasRecords={gasRecords}
          setRefresh={setRefresh}
          vehicle={vehicle}
        />
      )}
      {showEditVehicleModal && (
        <VehicleForm
          vehicle={vehicle}
          closeModal={closeEditVehicleModal}
          fetchVehicle={fetchVehicle}
          fetchVehicles={fetchVehicles}
        />
      )}
    </div>
  );
};

export default GasRecordList;

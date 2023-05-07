import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "@galvanize-inc/jwtdown-for-react";
import useUser from "./useUser";
import { useParams, useNavigate } from "react-router-dom";
import VehicleForm from "./VehicleForm";

const VehicleDetails = () => {
  const { vehicle_id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const { token } = useContext(AuthContext);
  const user = useUser(token);
  const [loading, setLoading] = useState(true);

  const fetchVehicles = async () => {
    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/vehicle/${vehicle_id}`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
      const data = await response.json();
      setVehicle(data);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchVehicles();
    }
  }, [token]);

  const handleDelete = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/vehicle/${vehicle_id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (response.ok) {
      navigate("/vehicles");
    } else {
      console.error("Error deleting vehicle; Please try again");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Vehicle Details</h1>
      {vehicle && (
        <>
          <VehicleForm vehicle={vehicle} />
          <button className="btn btn-danger mt-3" onClick={handleDelete}>
            Delete Vehicle
          </button>
        </>
      )}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default VehicleDetails;

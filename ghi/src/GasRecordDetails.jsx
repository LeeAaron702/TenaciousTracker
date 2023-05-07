import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "@galvanize-inc/jwtdown-for-react";
import useUser from "./useUser";
import { useParams, useNavigate } from "react-router-dom";
import GasRecordForm from "./GasRecordForm";

const GasRecordDetails = () => {
  const { gas_record_id } = useParams();
  const navigate = useNavigate();
  const [gasRecord, setGasRecord] = useState(null);
  const { token } = useContext(AuthContext);
  const user = useUser(token);
  const [loading, setLoading] = useState(true);

  const fetchGasRecord = async () => {
    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/gas_record/${gas_record_id}`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
      const data = await response.json();
      setGasRecord(data);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchGasRecord();
    }
  }, [token]);

  const handleDelete = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/gas_record/${gas_record_id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (response.ok) {
      navigate("/gas_records");
    } else {
      console.error("Error deleting gas record; Please try again");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Gas Record Details</h1>
      {gasRecord && (
        <>
          <GasRecordForm gasRecord={gasRecord} />
          <button className="btn btn-danger mt-3" onClick={handleDelete}>
            Delete Gas Record
          </button>
        </>
      )}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default GasRecordDetails;

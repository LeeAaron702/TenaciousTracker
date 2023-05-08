import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "@galvanize-inc/jwtdown-for-react";
import useUser from "./useUser";

const GasRecordForm = ({
  gasId,
  closeModal,
  fetchGasRecords,
  vehicleId,
  gasRecords,
  setRefresh,
  vehicle,
}) => {
  const [previousMileage, setPreviousMileage] = useState(null);

  const { token } = useContext(AuthContext);
  const user = useUser(token);
  const navigate = useNavigate();
  const [gasRecord, setGasRecord] = useState([]);
  const [purchase_date, setPurchaseDate] = useState("");
  const [odometer_reading, setOdometerReading] = useState("");
  const [gallons, setGallons] = useState("");
  const [price, setPrice] = useState("");
  const [payment_method, setPaymentMethod] = useState("");
  const [fuel_brand, setFuelBrand] = useState("");
  const [fuel_grade, setFuelGrade] = useState(vehicle.fuel_grade);
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [mpg_per_tank, setMpgPerTank] = useState("");

  const fetchGasRecord = async () => {
    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/gas_record/${gasId}`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
      const data = await response.json();
      setGasRecord(data);
      data.vehicle_id = vehicleId;
      setPurchaseDate(data.purchase_date);
      setOdometerReading(data.odometer_reading);
      setGallons(data.gallons);
      setPrice(data.price);
      setPaymentMethod(data.payment_method);
      setFuelBrand(data.fuel_brand);
      setFuelGrade(data.fuel_grade);
      setLocation(data.location);
      setNotes(data.notes);
      setMpgPerTank(data.mpg_per_tank);
    }
  };

  const handleDelete = async () => {
    if (!gasRecord.id) return;

    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/gas_record/${gasRecord.id}`;
    const fetchConfig = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      fetchGasRecords();
      closeModal();
      setRefresh((prevRefresh) => !prevRefresh);
    } else {
      alert("Error while deleting gas record");
    }
  };

  const getPreviousMileage = () => {
    if (gasRecords && gasRecords.length > 0) {
      const sortedRecords = gasRecords.sort(
        (a, b) => new Date(b.purchase_date) - new Date(a.purchase_date)
      );
      return sortedRecords[0].odometer_reading;
    }
    return null;
  };

  const calculateMPG = (previousMileage, newMileage, gallons) => {
    if (previousMileage === null || newMileage === "" || gallons === "") {
      return "";
    }
    const distance = newMileage - previousMileage;
    const mpg = distance / gallons;
    return mpg.toFixed(2);
  };

  useEffect(() => {
    if (gasId) {
      fetchGasRecord(gasId);
    }
  }, [gasId]);

  useEffect(() => {
    const mpg = calculateMPG(previousMileage, odometer_reading, gallons);
    setMpgPerTank(mpg);
  }, [previousMileage, odometer_reading, gallons]);

  useEffect(() => {
    setPreviousMileage(getPreviousMileage());
  }, [gasRecords]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = gasRecord.id
      ? `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/gas_record/${gasRecord.id}`
      : `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/gas_record`;

    const method = gasRecord.id ? "PUT" : "POST";
    const data = {};
    data.vehicle_id = vehicleId;
    data.purchase_date = purchase_date;
    data.odometer_reading = odometer_reading;
    data.gallons = gallons;
    data.price = price;
    data.payment_method = payment_method;
    data.fuel_brand = fuel_brand;
    data.fuel_grade = fuel_grade;
    data.location = location;
    data.notes = notes;

    if (mpg_per_tank) {
      data.mpg_per_tank = mpg_per_tank;
    }

    const fetchConfig = {
      method: method,
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      fetchGasRecords();
      closeModal();
      setRefresh((prevRefresh) => !prevRefresh);
    } else {
      alert("Error while submitting gas record");
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
          className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {gasRecord.id ? "Edit" : "Create"} Gas Record for {}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={closeModal}
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit} className="row">
                <div className="col-md-3">
                  <label htmlFor="purchase_date" className="form-label">
                    Purchase Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="purchase_date"
                    value={purchase_date}
                    onChange={(e) => setPurchaseDate(e.target.value)}
                  />
                </div>
                <div className="col-md-2">
                  <label htmlFor="odometer_reading" className="form-label">
                    Odometer
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="odometer_reading"
                    value={odometer_reading}
                    onChange={(e) => setOdometerReading(e.target.value)}
                  />
                </div>
                <div className="col-md-2">
                  <label htmlFor="gallons" className="form-label">
                    Gallons
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="gallons"
                    value={gallons}
                    onChange={(e) => setGallons(e.target.value)}
                  />
                </div>
                <div className="col-md-2">
                  <label htmlFor="mpg_per_tank" className="form-label">
                    MPG
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="mpg_per_tank"
                    value={mpg_per_tank}
                    onChange={(e) => setMpgPerTank(e.target.value)}
                  />
                </div>

                <div className="col-md-2">
                  <label htmlFor="price" className="form-label">
                    Price
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="col-md-3">
                  <label htmlFor="payment_method" className="form-label">
                    Payment Method
                  </label>
                  <select
                    className="form-control"
                    id="payment_method"
                    value={payment_method}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <option value="">Select method</option>
                    <option value="Credit">Credit</option>
                    <option value="Debit">Debit</option>
                    <option value="Cash">Cash</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <label htmlFor="fuel_brand" className="form-label">
                    Fuel Brand
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="fuel_brand"
                    value={fuel_brand}
                    onChange={(e) => setFuelBrand(e.target.value)}
                  />
                </div>
                <div className="col-md-3">
                  <label htmlFor="fuel_grade" className="form-label">
                    Fuel Type
                  </label>
                  <select
                    className="form-control"
                    id="fuel_grade"
                    value={fuel_grade}
                    onChange={(e) => setFuelGrade(e.target.value)}
                  >
                    <option value="">Select fuel type</option>
                    <option value="Gasoline">Gasoline</option>
                    <option value="Diesel">Diesel</option>
                  </select>
                </div>
                <div className="col-md-2">
                  <label htmlFor="location" className="form-label">
                    Location
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <div className="col-md-11">
                  <label htmlFor="notes" className="form-label">
                    Notes
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
                <div className="col-12">
                  <button type="submit" className="btn btn-primary mt-2">
                    {gasRecord.id ? "Update" : "Create"} Gas Record
                  </button>
                  {gasRecord.id && (
                    <button
                      type="button"
                      className="btn btn-danger mt-2 ms-2"
                      onClick={handleDelete}
                    >
                      Delete Gas Record
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GasRecordForm;

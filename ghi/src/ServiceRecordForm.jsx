import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "@galvanize-inc/jwtdown-for-react";
import useUser from "./useUser";

const ServiceRecordForm = ({
  serviceId,
  closeModal,
  fetchServices,
  vehicleId,
  serviceRecords,
  setRefresh,
  services,
}) => {
  const { token } = useContext(AuthContext);
  const user = useUser(token);

  const [serviceRecord, setServiceRecord] = useState([]);
  const [service_date, setServiceDate] = useState("");
  const [service_type, setServiceType] = useState("");
  const [service_description, setServiceDescription] = useState("");
  const [service_cost, setServiceCost] = useState("");
  const [service_shop_name, setServiceShopName] = useState("");
  const [service_shop_location, setServiceShopLocation] = useState("");
  const [service_mileage, setServiceMileage] = useState("");
  const [parts_used, setPartsUsed] = useState("");
  const [warranty, setWarranty] = useState(false);
  const [notes, setNotes] = useState("");

  const fetchServiceRecord = async () => {
    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/service/${serviceId}`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
      const data = await response.json();
      setServiceRecord(data);
      data.vehicle_id = vehicleId;
      setServiceDate(data.service_date);
      setServiceType(data.service_type);
      setServiceDescription(data.service_description);
      setServiceCost(data.service_cost);
      setServiceShopName(data.service_shop_name);
      setServiceShopLocation(data.service_shop_location);
      setServiceMileage(data.service_mileage);
      setPartsUsed(data.parts_used);
      setWarranty(data.warranty);
      setNotes(data.notes);
    }
  };

  const handleDelete = async () => {
    if (!serviceRecord.id) return;

    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/service/${serviceRecord.id}`;
    const fetchConfig = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      fetchServices();
      closeModal();
      setRefresh((prevRefresh) => !prevRefresh);
    } else {
      alert("Error while deleting service record");
    }
  };

  useEffect(() => {
    if (serviceId) {
      fetchServiceRecord(serviceId);
    }
  }, [serviceId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = serviceId
      ? `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/service/${serviceId}`
      : `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/service`;

    const method = serviceId ? "PUT" : "POST";
    const data = {};
    data.vehicle_id = vehicleId;
    data.service_date = service_date;
    data.service_type = service_type;
    data.service_description = service_description;
    data.service_cost = service_cost;
    data.service_shop_name = service_shop_name;
    data.service_shop_location = service_shop_location;
    data.service_mileage = service_mileage;
    data.parts_used = parts_used;
    data.warranty = warranty;
    data.notes = notes;

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
      fetchServices();
      closeModal();
      setRefresh((prevRefresh) => !prevRefresh);
    } else {
      alert("Error while submitting service record");
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
                {serviceId ? "Edit" : "Create"} Service Record for {}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={closeModal}
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit} className="row g-3">
                <div className="col-md-4">
                  <label htmlFor="service_date" className="form-label">
                    Service Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="service_date"
                    value={service_date}
                    onChange={(e) => setServiceDate(e.target.value)}
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="service_type" className="form-label">
                    Service Type
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="service_type"
                    value={service_type}
                    onChange={(e) => setServiceType(e.target.value)}
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="service_cost" className="form-label">
                    Service Cost
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="service_cost"
                    value={service_cost}
                    onChange={(e) => setServiceCost(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="service_shop_name" className="form-label">
                    Service Shop Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="service_shop_name"
                    value={service_shop_name}
                    onChange={(e) => setServiceShopName(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="service_shop_location" className="form-label">
                    Service Shop Location
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="service_shop_location"
                    value={service_shop_location}
                    onChange={(e) => setServiceShopLocation(e.target.value)}
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="service_mileage" className="form-label">
                    Service Mileage
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="service_mileage"
                    value={service_mileage}
                    onChange={(e) => setServiceMileage(e.target.value)}
                  />
                </div>
                <div className="col-md-8">
                  <label htmlFor="service_description" className="form-label">
                    Service Description
                  </label>
                  <textarea
                    className="form-control"
                    id="service_description"
                    value={service_description}
                    onChange={(e) => setServiceDescription(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="parts_used" className="form-label">
                    Parts Used
                  </label>
                  <textarea
                    className="form-control"
                    id="parts_used"
                    value={parts_used}
                    onChange={(e) => setPartsUsed(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="notes" className="form-label">
                    Notes
                  </label>
                  <textarea
                    className="form-control"
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="warranty" className="form-label">
                    Warranty
                  </label>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="warranty"
                      checked={warranty}
                      onChange={(e) => setWarranty(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="warranty">
                      Yes
                    </label>
                  </div>
                </div>
                <div className="col-12">
                  <button type="submit" className="btn btn-primary mt-2">
                    {serviceId ? "Update" : "Save"} Service Record
                  </button>
                  {serviceId && (
                    <button
                      type="button"
                      className="btn btn-danger ms-2 mt-2"
                      onClick={handleDelete}
                    >
                      Delete Service Record
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
export default ServiceRecordForm;

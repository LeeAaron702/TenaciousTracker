import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "@galvanize-inc/jwtdown-for-react";
import useUser from "./useUser";
import ServiceRecordForm from "./ServiceRecordForm";

const ServiceList = ({ vehicleId, setRefresh, fetchVehicles }) => {
  const { token } = useContext(AuthContext);
  const user = useUser(token);
  const [services, setServices] = useState([]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);

  const openModal = (serviceId = null) => {
    setShowEditModal(true);
    setSelectedServiceId(serviceId);
  };

  const closeModal = () => {
    setShowEditModal(false);
    setSelectedServiceId(null);
  };

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
  }, [token, vehicleId]);

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="mb-0">Service Records</h1>
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={() => openModal()}
        >
          Add Service Record
        </button>
      </div>
      <div className="table-responsive">
        <table className="table table-sm table-striped">
          <thead>
            <tr>
              <th>Date</th>
              <th>Service Type</th>
              <th>Description</th>
              <th>Cost</th>
              <th>Shop Name</th>
              <th>Location</th>
              <th>Mileage</th>
              <th>Parts Used</th>
              <th>Warranty</th>
              <th>Notes</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {services
              .sort(
                (a, b) => new Date(b.service_date) - new Date(a.service_date)
              )
              .map((service) => {
                const date = new Date(service.service_date);
                const formattedDate = date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "2-digit",
                });

                return (
                  <tr key={service.service_id} value={service.service_id}>
                    <td>{formattedDate}</td>
                    <td>{service.service_type}</td>
                    <td>{service.service_description}</td>
                    <td>{service.service_cost}</td>
                    <td>{service.service_shop_name}</td>
                    <td>{service.service_shop_location}</td>
                    <td>{service.service_mileage}</td>
                    <td>{service.parts_used}</td>
                    <td>{service.warranty ? "Yes" : "No"}</td>
                    <td>{service.notes}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => openModal(service.service_id)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      {showEditModal && (
        <ServiceRecordForm
          serviceId={selectedServiceId}
          closeModal={closeModal}
          fetchServices={fetchServices}
          vehicleId={vehicleId}
          setRefresh={setRefresh}
        />
      )}
    </div>
  );
};

export default ServiceList;

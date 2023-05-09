import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "@galvanize-inc/jwtdown-for-react";
import useUser from "./useUser";
import ServiceRecordForm from "./ServiceRecordForm";

const ServiceList = ({
  vehicleId,
  setRefresh,
  fetchVehicles,
  services,
  fetchServices,
}) => {
  const { token } = useContext(AuthContext);
  const user = useUser(token);

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

  const downloadCSV = () => {
    const headers = [
      "Date",
      "Service Type",
      "Description",
      "Cost",
      "Shop Name",
      "Location",
      "Mileage",
      "Parts Used",
      "Warranty",
      "Notes",
    ];

    const rows = services.map((service) => [
      service.service_date,
      service.service_type,
      service.service_description,
      service.service_cost,
      service.service_shop_name,
      service.service_shop_location,
      service.service_mileage,
      service.parts_used,
      service.warranty ? "Yes" : "No",
      service.notes,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((row) => row.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "service_records.csv");
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="mb-0">Service Records</h2>
        <button
          className="btn btn-outline-success btn-sm"
          onClick={downloadCSV}
        >
          Export Service Records
        </button>
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

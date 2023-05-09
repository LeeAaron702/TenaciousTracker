import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const greenIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const RecordsMap = ({ gasRecords, services }) => {
  if (
    (!services || services.length === 0) &
    (!gasRecords || gasRecords.length === 0)
  ) {
    return <p>No records available to display.</p>;
  }

  const [mapData, setMapData] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  const geocodeAddress = async (address) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(
        address
      )}`
    );
    const data = await response.json();
    if (data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
      };
    }
    return null;
  };
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([
            position.coords.latitude,
            position.coords.longitude,
          ]);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    }
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const gasRecordPromises = gasRecords.map(async (record) => {
        const latLng = await geocodeAddress(record.location);
        if (latLng) {
          return {
            type: "gas",
            data: record,
            latLng,
          };
        }
        return null;
      });

      const serviceRecordPromises = services.map(async (service) => {
        const latLng = await geocodeAddress(service.service_shop_location);
        if (latLng) {
          return {
            type: "service",
            data: service,
            latLng,
          };
        }
        return null;
      });

      const allPromises = [...gasRecordPromises, ...serviceRecordPromises];
      const fetchedData = await Promise.all(allPromises);
      setMapData(fetchedData.filter((item) => item !== null));
    };

    fetchData();
  }, [gasRecords, services]);

  return userLocation ? (
    <MapContainer
      center={userLocation}
      zoom={12}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {mapData.map((record, index) => (
        <Marker
          key={index}
          position={[record.latLng.lat, record.latLng.lng]}
          icon={record.type === "gas" ? greenIcon : redIcon}
        >
          <Popup>
            {record.type === "gas" ? (
              <>
                <strong>Gas Record</strong>
                <p>
                  Date:{" "}
                  {new Date(record.data.purchase_date).toLocaleDateString()}
                  <br />
                  Gallons: {record.data.gallons}
                  <br />
                  Price: {record.data.price}
                  <br />
                  Location: {record.data.location}
                </p>
              </>
            ) : (
              <>
                <strong>Service Record</strong>
                <p>
                  Date:{" "}
                  {new Date(record.data.service_date).toLocaleDateString()}
                  <br />
                  Type: {record.data.service_type}
                  <br />
                  Cost: {record.data.service_cost}
                  <br />
                  Shop: {record.data.service_shop_name}
                  <br />
                  Location: {record.data.service_shop_location}
                </p>
              </>
            )}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  ) : (
    <p>Loading map...</p>
  );
};
export default RecordsMap;

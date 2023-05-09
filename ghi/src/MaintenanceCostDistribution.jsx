import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const MaintenanceCostDistribution = ({ vehicleId, token, services }) => {
  if (!services || services.length === 0) {
    return <p>No records available to display.</p>;
  }
  const [data, setData] = useState([]);

  useEffect(() => {
    const costByType = services.reduce((acc, service) => {
      acc[service.service_type] =
        (acc[service.service_type] || 0) + parseFloat(service.service_cost);
      return acc;
    }, {});

    const formattedData = Object.keys(costByType).map((serviceType) => ({
      name: serviceType,
      value: costByType[serviceType],
    }));

    setData(formattedData);
  }, [services]);

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8B0000",
    "#32CD32",
    "#FF00FF",
  ];

  const renderLabel = ({ name, value }) => {
    return `${name}: $${value.toFixed(2)}`;
  };

  return (
    <>
      <h3>Maintenance Cost Distribution</h3>
      <PieChart width={800} height={700}>
        <Pie
          data={data}
          cx={300}
          cy={350}
          labelLine={false}
          outerRadius={160}
          fill="#8884d8"
          dataKey="value"
          label={renderLabel}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </>
  );
};

export default MaintenanceCostDistribution;

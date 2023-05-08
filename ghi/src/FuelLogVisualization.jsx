import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

const FuelLogVisualization = ({ vehicleId, token }) => {
  const [records, setRecords] = useState([]);

  const fetchGasRecords = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/vehicle/${vehicleId}/gas_records`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.ok) {
      const data = await response.json();
      setRecords(data);
    } else {
      throw new Error("Error fetching gas records");
    }
  };

  useEffect(() => {
    fetchGasRecords();
  }, [vehicleId]);

  const barWidth = 40;
  const barSpacing = 40;
  const chartHeight = 300;
  const chartMargin = { top: 30, right: 20, bottom: 40, left: 50 };

  const getMaxGallons = () => {
    return records.reduce((max, record) => Math.max(max, record.gallons), 0);
  };

  const maxGallons = getMaxGallons();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}/${date
      .getFullYear()
      .toString()
      .slice(-2)}`;
  };

  return (
    <Container>
      <Row>
        <Col>
          <h3>Fuel Consumption Visualization</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <svg
            width="100%"
            height={chartHeight + chartMargin.top + chartMargin.bottom}
          >
            {records.map((record, index) => {
              const barHeight = (record.gallons / maxGallons) * chartHeight;
              return (
                <g
                  key={index}
                  transform={`translate(${
                    index * (barWidth + barSpacing) + chartMargin.left
                  }, ${chartMargin.top})`}
                >
                  <rect
                    x="0"
                    y={chartHeight - barHeight}
                    width={barWidth}
                    height={barHeight}
                    fill="rgba(75, 192, 192, 1)"
                  />
                  <text
                    x={barWidth / 2}
                    y={chartHeight - barHeight - 5}
                    textAnchor="middle"
                    fontSize="10"
                  >
                    {parseFloat(record.gallons).toFixed(2)}
                  </text>
                  <text
                    x={barWidth / 2}
                    y={chartHeight + 20}
                    textAnchor="middle"
                    fontSize="10"
                  >
                    {formatDate(record.purchase_date)}
                  </text>
                </g>
              );
            })}
            <text
              transform="rotate(-90)"
              x={-chartHeight / 2 - chartMargin.top}
              y={chartMargin.left / 2}
              textAnchor="middle"
              fontSize="14"
            >
              Gallons Purchased
            </text>
          </svg>
        </Col>
      </Row>
    </Container>
  );
};

export default FuelLogVisualization;

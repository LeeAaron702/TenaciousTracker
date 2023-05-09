import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

const FuelLogVisualization = ({ records }) => {
  const chartWidth = 750;
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

  const getXScale = (index) => {
    return (
      (index / (records.length - 1)) *
        (chartWidth - chartMargin.left - chartMargin.right) +
      chartMargin.left
    );
  };

  const getYScale = (gallons) => {
    return (
      chartHeight -
      chartMargin.bottom -
      (gallons / maxGallons) *
        (chartHeight - chartMargin.top - chartMargin.bottom)
    );
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
          <div style={{ overflowX: "auto" }}>
            <svg width={chartWidth} height={chartHeight}>
              <path
                d={`M ${getXScale(0)} ${getYScale(records[0].gallons)} ${records
                  .slice(1)
                  .map(
                    (record, index) =>
                      `L ${getXScale(index + 1)} ${getYScale(record.gallons)}`
                  )
                  .join(" ")}`}
                fill="none"
                stroke="rgba(75, 192, 192, 1)"
                strokeWidth="3"
              />
              {records.map((record, index) => (
                <g
                  key={index}
                  transform={`translate(${getXScale(index)}, ${getYScale(
                    record.gallons
                  )})`}
                >
                  <circle cx="0" cy="0" r="4" fill="rgba(75, 192, 192, 1)" />
                  <text x="0" y="-8" textAnchor="middle" fontSize="12">
                    {parseFloat(record.gallons).toFixed(2)}
                  </text>
                </g>
              ))}
              {records.map((record, index) => (
                <text
                  key={index}
                  x={getXScale(index)}
                  y={chartHeight - chartMargin.bottom + 20}
                  textAnchor="middle"
                  fontSize="12"
                >
                  {formatDate(record.purchase_date)}
                </text>
              ))}
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
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default FuelLogVisualization;

import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const FuelEfficiencyLineGraph = ({ records }) => {
  if (!records || records.length === 0) {
    return <p>No records available to display.</p>;
  }

  const chartWidth = 750;
  const chartHeight = 300;
  const chartMargin = { top: 30, right: 20, bottom: 40, left: 50 };

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

  const getMaxMinMPG = () => {
    let max = -Infinity;
    let min = Infinity;

    records.forEach((record) => {
      const mpg = record.mpg_per_tank;
      max = Math.max(max, mpg);
      min = Math.min(min, mpg);
    });

    return { max, min };
  };

  const { max: maxMPG, min: minMPG } = getMaxMinMPG();
  const yAxisMax = maxMPG + 10;
  const yAxisMin = minMPG - 5;

  const getYScale = (mpg) => {
    return (
      chartHeight -
      chartMargin.bottom -
      ((mpg - yAxisMin) / (yAxisMax - yAxisMin)) *
        (chartHeight - chartMargin.top - chartMargin.bottom)
    );
  };

  return (
    <Container>
      <Row>
        <Col>
          <h3>Fuel Efficiency MPG Line Graph</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <div style={{ overflowX: "auto" }}>
            <svg width={chartWidth} height={chartHeight}>
              <path
                d={`M ${getXScale(0)} ${getYScale(
                  records[0].mpg_per_tank
                )} ${records
                  .slice(1)
                  .map(
                    (record, index) =>
                      `L ${getXScale(index + 1)} ${getYScale(
                        record.mpg_per_tank
                      )}`
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
                    record.mpg_per_tank
                  )})`}
                >
                  <circle cx="0" cy="0" r="4" fill="rgba(75, 192, 192, 1)" />
                  <text x="0" y="-8" textAnchor="middle" fontSize="12">
                    {parseFloat(record.mpg_per_tank).toFixed(2)}
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
              <line
                x1={chartMargin.left}
                x2={chartWidth - chartMargin.right}
                y1={chartHeight - chartMargin.bottom}
                y2={chartHeight - chartMargin.bottom}
                stroke="black"
                strokeWidth="1"
              />
              <line
                x1={chartMargin.left}
                x2={chartMargin.left}
                y1={chartMargin.top}
                y2={chartHeight - chartMargin.bottom}
                stroke="black"
                strokeWidth="1"
              />
              {[yAxisMin, (yAxisMax + yAxisMin) / 2, yAxisMax].map(
                (value, index) => (
                  <text
                    key={index}
                    x={chartMargin.left - 10}
                    y={getYScale(value)}
                    textAnchor="end"
                    dominantBaseline="central"
                    fontSize="9"
                  >
                    {value.toFixed(1)} mpg
                  </text>
                )
              )}
            </svg>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default FuelEfficiencyLineGraph;

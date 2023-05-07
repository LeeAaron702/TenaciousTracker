import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Container fluid className="hero-container">
        <Row className="align-items-center justify-content-center text-center">
          <Col md={6}>
            <h1 className="display-3">Tenacious Tracker</h1>
            <p className="lead">
              An extremly lightweight vehicle and gas recording and MPG tracker
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;

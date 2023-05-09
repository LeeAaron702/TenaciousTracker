import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col className="cruisecontrol text-center">
            <Link to="/" className="navbar-brand fw-bold">
              <h5>Tenacious Tracker</h5>
            </Link>

            <p>est. 2023</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

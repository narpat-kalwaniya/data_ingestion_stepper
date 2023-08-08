import React from "react";
import "./ValidateQuery.css";
import { Container, Card, Row, Col, Modal } from "react-bootstrap";

const ValidateQuery = () => {
  return (
    <div className="container file-uploader-container">
      <Row>
        <Col md={3} className="full-height">
          <h7>Uploaded Query</h7>
          <div className="vertical-box"></div>
        </Col>
        <Col md={6}>
          <h7>Enter Query</h7>
          <div className="horizontal-box"></div>
          <h7>Result</h7>
          <div className="horizontal-box"></div>
        </Col>
      </Row>
    </div>
  );
};

export default ValidateQuery;

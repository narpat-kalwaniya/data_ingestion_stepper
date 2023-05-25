import React from "react";
import { Container, Form, Row, Col, Card, Button } from "react-bootstrap";

const Scheduling = () => {
  return (
    <div>
      <Row>
        <Col sm={4}>
          <Form.Label>Schedule Frequency</Form.Label>
        </Col>
        <Col sm={6}>
          <Form.Control className="mb-3"></Form.Control>
        </Col>
      </Row>
    </div>
  );
};

export default Scheduling;

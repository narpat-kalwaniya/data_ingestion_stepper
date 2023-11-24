import React, { useState } from "react";
import { Modal, Button, Form, Dropdown, Row, Col } from "react-bootstrap";

const FreshnessModal = ({ show, onClose }) => {
  const [selectedDropdown1, setSelectedDropdown1] = useState("");
  const [selectedDropdown2, setSelectedDropdown2] = useState("");
  const [selectedFreqency, setSelectedFreqency] = useState("");
  const [frequency, setFrequency] = useState(); // Initialize frequency as a number

  const handleSave = () => {
    // Handle saving the selected values and checkboxes here
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>My Modal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col>
              <Form.Label>Table Name</Form.Label>
              <Form.Select
                value={selectedDropdown1}
                onChange={(e) => setSelectedDropdown1(e.target.value)}
                style={{ fontSize: "14px" }}
              >
                <option value="">Select an option</option>
                <option value="option1">table</option>
                <option value="option2">table2</option>
                <option value="option3">table3</option>
              </Form.Select>

              <Form.Label>Column Name</Form.Label>
              <Form.Select
                value={selectedDropdown2}
                onChange={(e) => setSelectedDropdown2(e.target.value)}
                style={{ fontSize: "14px" }}
              >
                <option value="">Select an option</option>
                <option value="option1">table</option>
                <option value="option2">table2</option>
                <option value="option3">table3</option>
              </Form.Select>
            </Col>
          </Row>
          <Row>
            <Form.Label>Frequency</Form.Label>
            <Col>
              <Form.Select
                value={selectedFreqency}
                onChange={(e) => setSelectedFreqency(e.target.value)}
                style={{ fontSize: "14px" }}
              >
                <option value="">Select an option</option>
                <option value="option1">Daily</option>
                <option value="option2">Weekly</option>
                <option value="option3">Monthly</option>
              </Form.Select>
            </Col>
            <Col>
              <Form.Control
                type="number"
                value={frequency}
                onChange={(e) => setFrequency(Number(e.target.value))} // Convert input value to a number
                step="1"
                style={{ fontSize: "14px" }}
              />
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FreshnessModal;

import React, { useState } from "react";
import { Modal, Button, Form, Dropdown } from "react-bootstrap";

const FreshnessModal = ({ show, onClose }) => {
  const [selectedDropdown1, setSelectedDropdown1] = useState("");
  const [selectedDropdown2, setSelectedDropdown2] = useState("");
  const [frequency, setFrequency] = useState("");

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
          <Form.Group>
            <Form.Label>Table Name</Form.Label>
            <Dropdown onSelect={(value) => setSelectedDropdown1(value)}>
              <Dropdown.Toggle variant="light">
                {selectedDropdown1 || "Select an option"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="option1">Option 1</Dropdown.Item>
                <Dropdown.Item eventKey="option2">Option 2</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>
          <Form.Group>
            <Form.Label>Column Name</Form.Label>
            <Dropdown onSelect={(value) => setSelectedDropdown2(value)}>
              <Dropdown.Toggle variant="light">
                {selectedDropdown2 || "Select an option"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="option1">Option 1</Dropdown.Item>
                <Dropdown.Item eventKey="option2">Option 2</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>
          <Form.Group>
            <Form.Label>Frequency</Form.Label>
            <Form.Control
              type="text"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
            />
          </Form.Group>
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

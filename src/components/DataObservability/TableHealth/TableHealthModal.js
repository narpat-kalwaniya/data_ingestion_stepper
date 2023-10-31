import React, { useState } from "react";
import { Modal, Button, Form, Dropdown } from "react-bootstrap";

const TableHealthModal = ({ show, onClose }) => {
  const [selectedDropdown1, setSelectedDropdown1] = useState("");
  const [selectedDropdown2, setSelectedDropdown2] = useState("");
  const [selectedDropdown3, setSelectedDropdown3] = useState("");
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);
  const [checkbox3, setCheckbox3] = useState(false);
  const [checkbox4, setCheckbox4] = useState(false);

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
            <Form.Label>Dropdown 1</Form.Label>
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
            <Form.Label>Dropdown 2</Form.Label>
            {/* Create a similar Dropdown component for Dropdown 2 */}
          </Form.Group>
          <Form.Group>
            <Form.Label>Dropdown 3</Form.Label>
            {/* Create a similar Dropdown component for Dropdown 3 */}
          </Form.Group>
          <Form.Check>
            <Form.Check.Input
              type="checkbox"
              checked={checkbox1}
              onChange={() => setCheckbox1(!checkbox1)}
            />
            <Form.Check.Label>Checkbox 1</Form.Check.Label>
          </Form.Check>
          <Form.Check>
            <Form.Check.Input
              type="checkbox"
              checked={checkbox2}
              onChange={() => setCheckbox2(!checkbox2)}
            />
            <Form.Check.Label>Checkbox 2</Form.Check.Label>
          </Form.Check>
          <Form.Check>
            <Form.Check.Input
              type="checkbox"
              checked={checkbox3}
              onChange={() => setCheckbox3(!checkbox3)}
            />
            <Form.Check.Label>Checkbox 3</Form.Check.Label>
          </Form.Check>
          <Form.Check>
            <Form.Check.Input
              type="checkbox"
              checked={checkbox4}
              onChange={() => setCheckbox4(!checkbox4)}
            />
            <Form.Check.Label>Checkbox 4</Form.Check.Label>
          </Form.Check>
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

export default TableHealthModal;

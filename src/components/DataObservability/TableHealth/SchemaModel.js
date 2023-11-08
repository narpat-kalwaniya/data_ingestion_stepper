import React, { useState } from "react";
import { Modal, Button, Form, Dropdown, Row, Col } from "react-bootstrap";

const SchemaModal = ({ show, onClose }) => {
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);
  const [checkbox3, setCheckbox3] = useState(false);
  const [checkbox4, setCheckbox4] = useState(false);
  const [checkbox5, setCheckbox5] = useState(false);
  const [checkbox6, setCheckbox6] = useState(false);
  const [checkbox7, setCheckbox7] = useState(false);
  const [checkbox8, setCheckbox8] = useState(false);

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
              <Form.Check>
                <Form.Check.Input
                  type="checkbox"
                  checked={checkbox1}
                  onChange={() => setCheckbox1(!checkbox1)}
                />
                <Form.Check.Label>New Tables</Form.Check.Label>
              </Form.Check>
            </Col>
            <Col>
              <Form.Check>
                <Form.Check.Input
                  type="checkbox"
                  checked={checkbox2}
                  onChange={() => setCheckbox2(!checkbox2)}
                />
                <Form.Check.Label>Deleted Tables</Form.Check.Label>
              </Form.Check>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Check>
                <Form.Check.Input
                  type="checkbox"
                  checked={checkbox3}
                  onChange={() => setCheckbox3(!checkbox3)}
                />
                <Form.Check.Label>New</Form.Check.Label>
              </Form.Check>
            </Col>
            <Col>
              <Form.Check>
                <Form.Check.Input
                  type="checkbox"
                  checked={checkbox4}
                  onChange={() => setCheckbox4(!checkbox4)}
                />
                <Form.Check.Label>Modified</Form.Check.Label>
              </Form.Check>
              <Form.Check>
                <Form.Check.Input
                  type="checkbox"
                  checked={checkbox5}
                  onChange={() => setCheckbox5(!checkbox5)}
                />
                <Form.Check.Label>Data Type</Form.Check.Label>
              </Form.Check>
              <Form.Check>
                <Form.Check.Input
                  type="checkbox"
                  checked={checkbox6}
                  onChange={() => setCheckbox6(!checkbox6)}
                />
                <Form.Check.Label>Ordinal Position</Form.Check.Label>
              </Form.Check>
              <Form.Check>
                <Form.Check.Input
                  type="checkbox"
                  checked={checkbox7}
                  onChange={() => setCheckbox7(!checkbox7)}
                />
                <Form.Check.Label>Nullability</Form.Check.Label>
              </Form.Check>
            </Col>
            <Col>
              <Form.Check>
                <Form.Check.Input
                  type="checkbox"
                  checked={checkbox8}
                  onChange={() => setCheckbox8(!checkbox8)}
                />
                <Form.Check.Label>Deleted</Form.Check.Label>
              </Form.Check>
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

export default SchemaModal;

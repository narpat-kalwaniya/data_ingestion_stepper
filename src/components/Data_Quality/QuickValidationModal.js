import React from "react";
import { Form, Row, Col, Modal } from "react-bootstrap";
import Select from "react-select";
import "./Data_Quality.css";
import { useState } from "react";

function QuickValidationModal({ show, onHide }) {
  const [isvalidated, setIsvalidated] = useState(false);

  const validteHandler = () => {
    setIsvalidated(true);
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Quick Validation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="mb-4">
            <Col>
              <Form.Label>Select</Form.Label>
              <Select
                placeholder="Please select"
                isMulti
                className="custom-select custom-style"
              />
            </Col>

            <Col>
              <Form.Label>Select</Form.Label>
              <Select isMulti className="custom-select custom-style" />
            </Col>
          </Row>
          <Row className="mb-4">
            <Col>
              <Form.Label> Validation Rule</Form.Label>

              <Form.Control
                type="type"
                as="textarea"
                disabled={false}
                className="custom-select custom-style validation-rule-height"
              />
            </Col>
            <Col>
              <Form.Label> Attribute</Form.Label>

              <Form.Control
                type="text"
                as="textarea"
                disabled={false}
                className="custom-select custom-style validation-rule-height"
              />
            </Col>
          </Row>
          {isvalidated && (
            <Row>
              <Form.Label> Output</Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                disabled={false}
                className="custom-select custom-style outpot-Box-modal"
              />
            </Row>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <button className="quickValidationCloseBtn " onClick={onHide}>
          Close
        </button>
        <button className="quickValidationResetBtn">Reset</button>
        <button onClick={validteHandler} className="btn-s ">
          Validate
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default QuickValidationModal;

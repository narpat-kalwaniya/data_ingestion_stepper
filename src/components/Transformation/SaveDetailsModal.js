import React from "react";
import { Form, Row, Col, Modal } from "react-bootstrap";

const SaveDetailsModal = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Save</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="mb-4">
            <Form.Label>Enter Query Name</Form.Label>

            <Form.Control
              type="text"
              disabled={false}
              className="custom-select custom-style"
            />
          </Row>

          <Row className="mb-4">
            <Form.Label> Enter Dependent Query Name</Form.Label>

            <Form.Control
              type="text"
              disabled={false}
              className="custom-select custom-style"
            />
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn-c " onClick={onHide}>
          Close
        </button>
        <button className="btn-s ">Save</button>
      </Modal.Footer>
    </Modal>
  );
};

export default SaveDetailsModal;

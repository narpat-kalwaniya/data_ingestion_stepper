import React from "react";
import { Form, Row, Col, Modal } from "react-bootstrap";

const AddDetailsModal = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="mb-4">
            <Form.Label>Test Name</Form.Label>

            <Form.Control
              type="text"
              disabled={false}
              className="custom-select custom-style"
            />
          </Row>
          <Row className="mb-4">
            <Form.Label>Expection</Form.Label>

            <Form.Control
              type="text"
              disabled={false}
              className="custom-select custom-style"
            />
          </Row>
          <Row className="mb-4">
            <Form.Label> Data Quality</Form.Label>

            <Form.Control
              type="text"
              disabled={false}
              className="custom-select custom-style"
            />
          </Row>

          <Row className="mb-4">
            <Col>
              <Form.Label>Columns</Form.Label>
              <Form.Control
                type="text"
                disabled={false}
                className="custom-select custom-style"
              />
            </Col>

            <Col>
              <Form.Label>Expection Input</Form.Label>
              <Form.Control
                type="text"
                disabled={false}
                className="custom-select custom-style"
              />
            </Col>
          </Row>
          <Row className="mb-4">
            <Form.Label> Tags</Form.Label>

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
        <button className="btn-s ">Add</button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddDetailsModal;

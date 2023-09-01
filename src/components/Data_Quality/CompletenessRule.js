import React from "react";
import { Form, Row, Col, Modal } from "react-bootstrap";

function CompletenessRule({ show, onHide }) {
  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title> Completeness Rule</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          {" "}
          Completeness DQ rule scans a columns to count the cells with missing
          (e.g. database NULL type or blank text) or default (e.g. 'Not
          Applicable' or 'Default') values.
          <br />
          <strong> metric = 1-count(missing or default) / total rows</strong>
        </p>
        <Form>
          <Row className="mb-4">
            <Form.Label>Column Name</Form.Label>

            <Form.Control
              placeholder="Enter Column Name"
              type="text"
              disabled={false}
              className="custom-select custom-style"
            />
          </Row>
          <Row className="mb-4">
            <Form.Label>Missing/default Values</Form.Label>

            <Form.Control
              placeholder="Enter Expection"
              type="text"
              disabled={false}
              className="custom-select custom-style"
            />
          </Row>
          <Row className="mb-4">
            <Form.Label> Alert Threshold</Form.Label>

            <Form.Control
              placeholder="Enter Data Quality"
              type="text"
              disabled={false}
              className="custom-select custom-style"
            />
          </Row>

          <Row className="mb-4">
            <Form.Label> DQ Dimension</Form.Label>

            <Form.Control
              placeholder="Enter Tags"
              type="text"
              disabled={false}
              className="custom-select custom-style"
            />
          </Row>
          <Row className="mb-4">
            <Form.Label> Severity Level</Form.Label>

            <Form.Control
              placeholder="Enter Tags"
              type="text"
              disabled={false}
              className="custom-select custom-style"
            />
          </Row>
          <Row className="mb-4">
            <Form.Label> Priority Level</Form.Label>

            <Form.Control
              placeholder="Enter Tags"
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
        <button className="btn-s ">Submit</button>
      </Modal.Footer>
    </Modal>
  );
}

export default CompletenessRule;

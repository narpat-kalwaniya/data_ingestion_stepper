import React from "react";
import {
  Container,
  Form,
  Row,
  Col,
  Card,
  Button,
  Modal,
} from "react-bootstrap";

import "../../styles/main.css";
import "./ApplicationModal.css";

const ApplicationModal = (props) => {
  return (
    <Modal
      show={props.showModalApp}
      onHide={props.handleCloseModalApp}
      // size="lg"
      style={{ fontSize: "14px" }}
    >
      <Modal.Header closeButton>
        {/* <Modal.Title>Create Application</Modal.Title> */}
      </Modal.Header>
      <Modal.Body
        style={{
          minHeight: "60vh",
          maxHeight: "60vh",
          overflowY: "scroll",
        }}
        className="overflow-auto"
      >
        <Card.Body className="custom-card-body" style={{ marginTop: "5px" }}>
          <Row className="mb-4">
            <Col>
              <Form.Label>Application Name</Form.Label>

              <Form.Control
                type="text"
                disabled={false}
                className="custom-select custom-style"
              />
            </Col>
          </Row>
          <Row className="mb-4">
            <Col>
              <Form.Label>Application Type</Form.Label>

              <Form.Control
                type="text"
                disabled={false}
                className="custom-select custom-style"
              />
            </Col>
          </Row>
          <Row className="mb-4">
            <Col>
              <Form.Label> Failure Recipients</Form.Label>

              <Form.Control
                type="text"
                disabled={false}
                className="custom-select custom-style"
              />
            </Col>
          </Row>

          <Row className="mb-4">
            <Col>
              <Form.Label>Success Recipients</Form.Label>

              <Form.Control
                type="text"
                disabled={false}
                className="custom-select custom-style"
              />
            </Col>
          </Row>
        </Card.Body>
      </Modal.Body>
      <Modal.Footer>
        <button
          variant="secondary"
          onClick={props.handleCloseModalApp}
          className="btn-c"
        >
          Close
        </button>
        <button
          variant="primary"
          onClick={props.handleCloseModalApp}
          className="btn-s"
        >
          Save Changes
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ApplicationModal;

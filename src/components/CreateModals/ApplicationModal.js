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
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Create Application</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card.Body className="custom-card-body">
          <Form>
            <Row className="mb-4">
              <Col xs={3}>
                <Form.Label>Application Name</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  disabled={false}
                  className="custom-select custom-style"
                />
              </Col>
            </Row>
            <Row className="mb-4">
              <Col xs={3}>
                <Form.Label>Description</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  disabled={false}
                  className="custom-select custom-style"
                />
              </Col>
            </Row>

            <Row className="mb-4">
              <Col xs={3}>
                <Form.Label>Description</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  disabled={false}
                  className="custom-select custom-style"
                />
              </Col>
            </Row>
            <Row className="mb-4">
              <Col xs={3}>
                <Form.Label>Description</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  disabled={false}
                  className="custom-select custom-style"
                />
              </Col>
            </Row>
            <Row className="mb-4">
              <Col xs={3}>
                <Form.Label>Description</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  disabled={false}
                  className="custom-select custom-style"
                />
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={props.handleCloseModalApp}
          className="btn-cl"
        >
          Close
        </Button>
        <Button
          variant="primary"
          onClick={props.handleCloseModalApp}
          className="btn-save"
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ApplicationModal;

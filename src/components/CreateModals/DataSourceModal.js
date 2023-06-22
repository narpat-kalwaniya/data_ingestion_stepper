import React, { useState, useEffect, useContext } from "react";
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
import "./DataSourceModal.css";

const DataSourceModal = (props) => {
  return (
    <Modal
      show={props.showModalDSC}
      onHide={props.handleCloseModalDSC}
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Create Data Scouce Connection</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card.Body className="custom-card-body">
          <Form>
            <Row className="mb-4">
              <Col xs={3}>
                <Form.Label>Connection Name</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  disabled={false}
                  className="custom-select custom-style"
                  name="connection_name"
                />
              </Col>
            </Row>
            <Row className="mb-4">
              <Col xs={3}>
                <Form.Label>Connection Type</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  disabled={false}
                  className="custom-select custom-style"
                  name="connection_type"
                />
              </Col>
            </Row>

            <Row className="mb-4">
              <Col xs={3}>
                <Form.Label>Data Source Name</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  disabled={false}
                  className="custom-select custom-style"
                  name="data_source_name"
                />
              </Col>
            </Row>
            <Row className="mb-4">
              <Col xs={3}>
                <Form.Label>Environment</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  disabled={false}
                  className="custom-select custom-style"
                  name="environment"
                />
              </Col>
            </Row>
            <Row className="mb-4">
              <Col xs={3}>
                <Form.Label>Connection String</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  as="textarea"
                  rows={3}
                  disabled={false}
                  className="custom-select custom-style"
                  name="connection_string"
                />
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={props.handleCloseModalDSC}
          className="btn-cl"
        >
          Close
        </Button>
        <Button
          variant="primary"
          onClick={props.handleCloseModalDSC}
          className="btn-save"
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DataSourceModal;

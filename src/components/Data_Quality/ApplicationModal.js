import React from "react";
import { Form, Row, Col, Modal, Card } from "react-bootstrap";
import "./Data_Quality.css";

function ApplicationModal({ show, onHide }) {
  return (
    <Modal show={show} onHide={onHide} size="lg" style={{ fontSize: "14px" }}>
      <Modal.Header closeButton>
        {/* <Modal.Title> "Completeness" Rule</Modal.Title> */}
      </Modal.Header>
      <Modal.Body className="overflow-auto">
        <Card.Body className="custom-card-body" style={{ marginTop: "5px" }}>
          <Row>
            <Col xs={4} className="sidebar-container">
              <div>
                <div className="sidebar-heading">Application List</div>
              </div>
            </Col>
            <Col>
              <Form>
                <Row className="mb-4">
                  <Col>
                    <Form.Label>Application Name</Form.Label>

                    <Form.Control
                      type="text"
                      className="custom-select custom-style"
                    />
                  </Col>
                  <Col>
                    <Form.Label>Application Type</Form.Label>

                    <Form.Control
                      type="text"
                      className="custom-select custom-style"
                    />
                  </Col>
                </Row>

                <Row className="mb-4">
                  <Col>
                    <Form.Label>Failure Recipients</Form.Label>

                    <Form.Control
                      type="text"
                      className="custom-select custom-style"
                    />
                  </Col>
                  <Col>
                    <Form.Label>Success Recipients</Form.Label>

                    <Form.Control
                      type="text"
                      className="custom-select custom-style"
                    />
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Card.Body>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn-c " onClick={onHide}>
          Close
        </button>
        <button className="btn-s ">Save Changes</button>
      </Modal.Footer>
    </Modal>
  );
}

export default ApplicationModal;

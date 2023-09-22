import React from "react";
import { Form, Row, Col, Modal, Card } from "react-bootstrap";
import "../../styles/main.css";
import "../CreateModals/ApplicationModal.css";
import ReactJson from "react-json-view";

function DataSourceConnectionModal({ show, onHide }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="lg"
      style={{ fontSize: "14px" }}
    >
      <Modal.Header closeButton>
        {/* <Modal.Title></Modal.Title> */}
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col xs={3} className="sidebar-container">
            <div>
              <div className="sidebar-heading">Connection List</div>
            </div>
          </Col>
          <Col>
            <Card style={{ border: "none" }}>
              <Card.Body
                style={{
                  minHeight: "60vh",
                  maxHeight: "60vh",
                  width: "100%",
                  overflowY: "scroll",
                }}
                className="overflow-auto"
              >
                <Row className="mb-4">
                  <Col>
                    <Form.Label>Connection Name</Form.Label>

                    <Form.Control
                      type="text"
                      className="custom-select custom-style"
                    />
                  </Col>
                  <Col>
                    <Form.Label>Connection Type</Form.Label>

                    <Form.Select
                      as="select"
                      className="custom-select custom-style"
                    >
                      <option value="">-- Select --</option>{" "}
                    </Form.Select>
                  </Col>
                </Row>

                <Row className="mb-4">
                  <Col>
                    <Form.Label>Data Source Name</Form.Label>

                    <Form.Control
                      type="text"
                      className="custom-select custom-style"
                    />
                  </Col>
                  <Col>
                    <Form.Label>Environment</Form.Label>

                    <Form.Select
                      as="select"
                      className="custom-select custom-style"
                    >
                      <option>{""}</option>
                      <option>DEV</option>
                      <option>STAGE</option>
                      <option>TEST</option>
                      <option>PRODUCTION</option>
                    </Form.Select>
                  </Col>
                </Row>
                <Row className="mb-4">
                  <Col>
                    <Form.Label>Connection String</Form.Label>

                    <Form.Control
                      as="textarea"
                      rows={1}
                      className="custom-select custom-style connection-string-textarea"
                    />

                    <div className="json-view-container">
                      <ReactJson
                        theme="rjv-default"
                        name={null}
                        enableClipboard={false}
                        displayDataTypes={false}
                        displayObjectSize={false}
                      />
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
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

export default DataSourceConnectionModal;

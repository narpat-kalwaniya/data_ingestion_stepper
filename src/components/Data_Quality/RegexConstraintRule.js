import React from "react";
import { Form, Row, Col, Modal } from "react-bootstrap";
import "./Data_Quality.css";

function RegexConstraintRule({ show, onHide }) {
  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title> Regex Constraint Rule</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="mb-4">
            <div className="column_rule_table_style">
              <Form.Label style={{ width: "50%" }}>Column Name</Form.Label>

              <Form.Control
                placeholder="Enter Column Name"
                type="text"
                disabled={false}
                className="custom-select custom-style"
              />
            </div>
          </Row>
          <Row className="mb-4">
            <div className="column_rule_table_style">
              <Form.Label style={{ width: "50%" }}>Predefined Regex</Form.Label>

              <Form.Control
                placeholder="Enter Expection"
                type="text"
                disabled={false}
                className="custom-select custom-style"
              />
            </div>
          </Row>

          <Row className="mb-4">
            <div className="column_rule_table_style">
              <Form.Label style={{ width: "50%" }}>Custom Regex</Form.Label>

              <Form.Control
                placeholder="Enter Expection"
                type="text"
                disabled={false}
                className="custom-select custom-style"
              />
            </div>
          </Row>

          <Row className="mb-4">
            <div className="column_rule_table_style">
              <Form.Label style={{ width: "50%" }}> Alert Threshold</Form.Label>

              <Form.Control
                placeholder="Enter Data Quality"
                type="text"
                disabled={false}
                className="custom-select custom-style"
              />
            </div>
          </Row>

          <Row className="mb-4">
            <div className="column_rule_table_style">
              <Form.Label style={{ width: "50%" }}> DQ Dimension</Form.Label>

              <Form.Select className="custom-select custom-style">
                <option value="">Select</option>
                <option value="">1</option>
                <option value="">2</option>
                <option value="">3</option>{" "}
              </Form.Select>
            </div>
          </Row>
          <Row className="mb-4">
            <div className="column_rule_table_style">
              <Form.Label style={{ width: "50%" }}> Severity Level</Form.Label>

              <Form.Select className="custom-select custom-style">
                <option value="">Select</option>
                <option value="">1</option>
                <option value="">2</option>
                <option value="">3</option>{" "}
              </Form.Select>
            </div>
          </Row>
          <Row className="mb-4">
            <div className="column_rule_table_style">
              <Form.Label style={{ width: "50%" }}> Priority Level</Form.Label>

              <Form.Select className="custom-select custom-style">
                <option value="">Select</option>
                <option value="">1</option>
                <option value="">2</option>
                <option value="">3</option>{" "}
              </Form.Select>
            </div>
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

export default RegexConstraintRule;

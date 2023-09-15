import React from "react";
import { Form, Row, Col, Modal } from "react-bootstrap";
import "./Data_Quality.css";
import Select from "react-select";
import MultiRangesSlider from "./MultiRangesSlider";

function LengthConstraintRule({ show, onHide }) {
  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title> "Length Constraint" Rule</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          {" "}
          "Length Constraint" DQ rule scans a text column to exam the lenth of
          the string is in a valid range.
        </p>
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
              <Form.Label style={{ width: "50%" }}>Min</Form.Label>

              <Form.Control
                className="custom-select custom-style"
                size="sm"
                type="number"
              />
            </div>
          </Row>

          <Row className="mb-4">
            <div className="column_rule_table_style">
              <Form.Label style={{ width: "50%" }}>Max</Form.Label>

              <Form.Control
                className="custom-select custom-style"
                size="sm"
                type="number"
              />
            </div>
          </Row>

          <Row className="mb-4">
            <div className="column_rule_table_style">
              <Form.Label style={{ width: "33%" }}> Alert Threshold</Form.Label>
              <Col>
                <MultiRangesSlider />{" "}
              </Col>
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

export default LengthConstraintRule;

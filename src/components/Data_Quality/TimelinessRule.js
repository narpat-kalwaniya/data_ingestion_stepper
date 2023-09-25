import React from "react";
import { Form, Row, Col, Modal } from "react-bootstrap";
import "./Data_Quality.css";
import Select from "react-select";
import MultiRangesSlider from "./MultiRangesSlider";

function TimelinessRule({ show, onHide }) {
  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title> "Timeliness" Rule</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          {" "}
          "Timeliness" DQ rule exam the last modified date of each entity in the
          dataset to detect.
        </p>
        <Form>
          <Row className="mb-4">
            <div className="column_rule_table_style">
              <Form.Label style={{ width: "50%" }}>
                Business Test Name
              </Form.Label>

              <Form.Control
                placeholder="Enter Business Test Name"
                type="text"
                disabled={false}
                className="custom-select custom-style"
              />
            </div>
          </Row>
          <Row className="mb-4">
            <div className="column_rule_table_style">
              <Form.Label style={{ width: "50%" }}>
                {" "}
                Group By (column with identity)
              </Form.Label>

              <Form.Select className="custom-select custom-style groupBySelect-style">
                <option value="">Select</option>
                <option value="">1</option>
                <option value="">2</option>
                <option value="">3</option>{" "}
              </Form.Select>
            </div>
          </Row>

          <Row className="mb-4">
            <div className="column_rule_table_style">
              <Form.Label style={{ width: "50%" }}>
                {" "}
                Last modified Column
              </Form.Label>

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
              <Form.Label style={{ width: "50%" }}>
                Allowed Late days
              </Form.Label>

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

export default TimelinessRule;

import React from "react";
import { Form, Row, Col, Modal, Button } from "react-bootstrap";
import "./Data_Quality.css";
import DeleteIcon from "@mui/icons-material/Delete";
import MultiRangesSlider from "./MultiRangesSlider";

function SourceVsTargetRule({ show, onHide }) {
  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title> "Source VS Target" Rule</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          "Source VS Target" DQ rule compares the current dataset with the
          source dataset from which the data of the current dataset is from.
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
          <Row className="mb-2">
            <Col sm="6">
              <div className="column_rule_table_style">
                <Form.Label style={{ width: "60%" }}>
                  Source Data Connection
                </Form.Label>

                <Form.Control
                  placeholder="Please Enter "
                  type="text"
                  disabled={false}
                  className="custom-select custom-style groupBySelect-style "
                />
              </div>
            </Col>

            <Col sm="6">
              <div className="column_rule_table_style">
                <Form.Label style={{ width: "60%" }}>
                  {" "}
                  Target Data Connection
                </Form.Label>

                <Form.Control
                  placeholder="Please Enter "
                  type="text"
                  disabled={false}
                  className="custom-select custom-style groupBySelect-style "
                />
              </div>
            </Col>
          </Row>

          <Row className="mb-2">
            <Col sm="6">
              <div className="column_rule_table_style">
                <Form.Label style={{ width: "62%" }}>Source Dataset</Form.Label>

                <Form.Select className="custom-select custom-style">
                  <option value="">Select</option>
                  <option value="">1</option>
                  <option value="">2</option>
                  <option value="">3</option>{" "}
                </Form.Select>
              </div>
            </Col>

            <Col sm="6">
              <div className="column_rule_table_style">
                <Form.Label style={{ width: "60%" }}>Target Dataset</Form.Label>

                <Form.Control
                  placeholder="Please Enter "
                  type="text"
                  disabled={false}
                  className="custom-select custom-style"
                />
              </div>
            </Col>
          </Row>

          <div className="source-target-select-style">
            <div style={{ paddingBottom: "6px" }}>
              {" "}
              <button className="add-reco-item-btn"> Add Reco Item</button>
            </div>
            <Row className="mb-2">
              <Col sm="2">
                <Form.Select className="custom-select custom-style">
                  <option value="">Select</option>
                  <option value="">1</option>
                  <option value="">2</option>
                  <option value="">3</option>{" "}
                </Form.Select>{" "}
              </Col>

              <Col sm="2">
                <Form.Select className="custom-select custom-style">
                  <option value="">Select</option>
                  <option value="">1</option>
                  <option value="">2</option>
                  <option value="">3</option>{" "}
                </Form.Select>{" "}
              </Col>

              <Col sm="2">
                {" "}
                <Form.Select className="custom-select custom-style">
                  <option value="">Select</option>
                  <option value="">1</option>
                  <option value="">2</option>
                  <option value="">3</option>{" "}
                </Form.Select>
              </Col>

              <Col sm="2">
                <Form.Select className="custom-select custom-style">
                  <option value="">Select</option>
                  <option value="">1</option>
                  <option value="">2</option>
                  <option value="">3</option>{" "}
                </Form.Select>{" "}
              </Col>

              <Col sm="3">
                <Form.Select className="custom-select custom-style">
                  <option value="">Select</option>
                  <option value="">1</option>
                  <option value="">2</option>
                  <option value="">3</option>{" "}
                </Form.Select>{" "}
              </Col>

              <Col sm="1">
                <DeleteIcon
                  className="viewBtnStyle"
                  style={{ width: "20px", height: "20px" }}
                />
              </Col>
            </Row>

            <Row className="mb-2">
              <Col sm="2">
                <Form.Select className="custom-select custom-style">
                  <option value="">Select</option>
                  <option value="">1</option>
                  <option value="">2</option>
                  <option value="">3</option>{" "}
                </Form.Select>{" "}
              </Col>

              <Col sm="2">
                <Form.Select className="custom-select custom-style">
                  <option value="">Select</option>
                  <option value="">1</option>
                  <option value="">2</option>
                  <option value="">3</option>{" "}
                </Form.Select>{" "}
              </Col>

              <Col sm="2">
                {" "}
                <Form.Select className="custom-select custom-style">
                  <option value="">Select</option>
                  <option value="">1</option>
                  <option value="">2</option>
                  <option value="">3</option>{" "}
                </Form.Select>
              </Col>

              <Col sm="2">
                <Form.Select className="custom-select custom-style">
                  <option value="">Select</option>
                  <option value="">1</option>
                  <option value="">2</option>
                  <option value="">3</option>{" "}
                </Form.Select>{" "}
              </Col>

              <Col sm="3">
                <Form.Select className="custom-select custom-style">
                  <option value="">Select</option>
                  <option value="">1</option>
                  <option value="">2</option>
                  <option value="">3</option>{" "}
                </Form.Select>{" "}
              </Col>

              <Col sm="1">
                <DeleteIcon
                  className="viewBtnStyle"
                  style={{ width: "20px", height: "20px" }}
                />
              </Col>
            </Row>

            <Row className="mb-2">
              <Col sm="2">
                <Form.Select className="custom-select custom-style  ">
                  <option value="">Select</option>
                  <option value="">1</option>
                  <option value="">2</option>
                  <option value="">3</option>{" "}
                </Form.Select>{" "}
              </Col>

              <Col sm="2">
                <Form.Select className="custom-select custom-style  ">
                  <option value="">Select</option>
                  <option value="">1</option>
                  <option value="">2</option>
                  <option value="">3</option>{" "}
                </Form.Select>{" "}
              </Col>

              <Col sm="2">
                {" "}
                <Form.Select className="custom-select custom-style ">
                  <option value="">Select</option>
                  <option value="">1</option>
                  <option value="">2</option>
                  <option value="">3</option>{" "}
                </Form.Select>
              </Col>

              <Col sm="2">
                <Form.Select className="custom-select custom-style ">
                  <option value="">Select</option>
                  <option value="">1</option>
                  <option value="">2</option>
                  <option value="">3</option>{" "}
                </Form.Select>{" "}
              </Col>

              <Col sm="3">
                <Form.Select className="custom-select custom-style  ">
                  <option value="">Select</option>
                  <option value="">1</option>
                  <option value="">2</option>
                  <option value="">3</option>{" "}
                </Form.Select>{" "}
              </Col>

              <Col sm="1">
                <DeleteIcon
                  className="viewBtnStyle"
                  style={{ width: "20px", height: "20px" }}
                />
              </Col>
            </Row>
          </div>

          <Row className="mb-2" style={{ marginTop: "26px" }}>
            <div className="column_rule_table_style">
              <Form.Label style={{ width: "33%" }}> Alert Threshold</Form.Label>
              <Col>
                <MultiRangesSlider />{" "}
              </Col>
            </div>
          </Row>

          <Row className="mb-2">
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
          <Row className="mb-2">
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
          <Row className="mb-2">
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

export default SourceVsTargetRule;

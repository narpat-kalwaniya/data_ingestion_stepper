import React from "react";
import { Form, Row, Col, Modal } from "react-bootstrap";
import "./Data_Quality.css";
import Select from "react-select";
import MultiRangesSlider from "./MultiRangesSlider";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-sql";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-xcode";

function SqlCustom({ show, onHide }) {
  const queryChangeHandler = (newQuery) => {};
  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title> SQL Custom</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p> </p>
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
              <Form.Label style={{ width: "33%" }}>SQL Query</Form.Label>

              <Col>
                {/* <Select
                  isMulti
                  // options={orderByOptions}
                  // value={formData.DefineSourceExtractCriteria.order_by}
                  // onChange={(options) => orderByChangeHandler(options)}
                  className="custom-select custom-style"
                /> */}
                <AceEditor
                  mode="sql"
                  theme="xcode"
                  name="sql-editor"
                  fontSize="12px"
                  editorProps={{ $blockScrolling: true }}
                  style={{ width: "100%", height: "100px" }}
                  //   value={formData.sourceEntity.query || ""}
                  onChange={queryChangeHandler}
                />
              </Col>
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

export default SqlCustom;

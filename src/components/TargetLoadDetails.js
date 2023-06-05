import React, { useState } from "react";
import {
  Container,
  Form,
  Row,
  Col,
  Card,
  Button,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";

import "./TargetLoadDetails.css";

const TargetLoadDetails = () => {
  const [checked, setChecked] = useState(false);
  const chechBoxHandler = (e) => {
    setChecked(!checked);
  };

  return (
    <div className="TargetLoadDetails">
      <Row>
        <Card.Body>
          <div className="text-left">
            <Form>
              <Row>
                <div className="form-group">
                  <Row className="align-items-center mb-3">
                    <Col xs="auto">
                      <Form.Label>Target Entity Name</Form.Label>
                    </Col>
                    <Col>
                      <Form.Control
                        type="text"
                        className="textbox1"
                        disabled={false}
                      />
                    </Col>
                  </Row>
                </div>

                <div className="form-group">
                  <Row className="align-items-center mb-3">
                    <Col xs="auto">
                      <Form.Label>Target Load Type</Form.Label>
                    </Col>
                    <Col xs="auto">
                      <Form.Check
                        type="radio"
                        label="TRUNCATE"
                        name="TargetLoadDetails"
                      ></Form.Check>
                    </Col>
                    <Col xs="auto">
                      <Form.Check
                        type="radio"
                        label="INSERT"
                        name="TargetLoadDetails"
                      ></Form.Check>
                    </Col>
                    <Col xs="auto">
                      <Form.Check
                        type="radio"
                        label="INCREMENTAL"
                        name="TargetLoadDetails"
                      ></Form.Check>
                    </Col>
                    <Col xs="auto">
                      <Form.Check
                        type="radio"
                        label="SCD TYPE II"
                        name="TargetLoadDetails"
                      ></Form.Check>
                    </Col>
                  </Row>
                </div>

                <div className="form-group">
                  <Row className="mb-3">
                    <Col xs="auto">
                      <Form.Label>Data Quality Moniter</Form.Label>
                    </Col>
                    <Col className="dqt" xs="auto">
                      <Form.Label>Alert</Form.Label>
                      <Form.Control
                        type="text"
                        className="textbox2"
                      ></Form.Control>
                    </Col>
                    <Col xs="auto">
                      <Form.Label>Abort</Form.Label>
                      <Form.Control
                        type="text"
                        className="textbox2"
                      ></Form.Control>
                    </Col>
                  </Row>
                </div>
                <div className="form-group">
                  <Row className="mb-3">
                    <Col xs="auto">
                      <Form.Label>Record Count Changes Moniter</Form.Label>
                    </Col>
                    <Col xs="auto">
                      <Form.Label>Alert</Form.Label>
                      <Form.Control
                        type="text"
                        className="textbox2"
                      ></Form.Control>
                    </Col>
                    <Col xs="auto">
                      <Form.Label>Abort</Form.Label>
                      <Form.Control
                        type="text"
                        className="textbox2"
                      ></Form.Control>
                    </Col>
                  </Row>
                </div>
                {/* <div className="form-group">
                      <Form.Label>PHI/PII Identifier Status</Form.Label>
                    </div>
                    <br></br>
                    <br></br> */}
                {/* <div className="form-group">
                      <Form.Label>Target Load Details</Form.Label>
                      <ToggleButtonGroup
                        type="toggle"
                        name="options"
                        className="toggle-button"
                      >
                        <ToggleButton value="yes">Yes</ToggleButton>
                        <ToggleButton value="no">No</ToggleButton>
                      </ToggleButtonGroup>
                    </div>
                    <br></br>
                    <br></br> */}
                <div className="form-group">
                  <Form.Check
                    type="checkbox"
                    label="Maintain a copy in DataLake"
                    onChange={chechBoxHandler}
                  ></Form.Check>
                </div>
                <br></br>
                <br></br>
                {checked && (
                  <div>
                    <div className="form-group">
                      <Row className="mb-3">
                        <Col>
                          <Form.Label>Data Lake Connection</Form.Label>
                          <Form.Select aria-label="" disabled={false}>
                            <option>{""}</option>
                            <option>Connection1</option>
                            <option>Connection2</option>
                          </Form.Select>
                        </Col>
                        <Col>
                          <Form.Label>Data Lake File Format</Form.Label>
                          <Form.Select aria-label="" disabled={false}>
                            <option>{""}</option>
                            <option>CSV</option>
                            <option>PARQUET</option>
                            <option>AVRO</option>
                            <option>Source Format</option>
                          </Form.Select>
                        </Col>
                      </Row>
                    </div>

                    <div className="form-group">
                      <Row className="align-items-center mb-3">
                        <Col xs="auto">
                          <Form.Label>Data Lake Target Template</Form.Label>
                        </Col>
                        <Col>
                          <Form.Control
                            type="text"
                            className="textbox3"
                            disabled={false}
                          />
                        </Col>
                      </Row>
                    </div>
                  </div>
                )}
              </Row>
            </Form>
          </div>
        </Card.Body>
      </Row>
    </div>
  );
};

export default TargetLoadDetails;

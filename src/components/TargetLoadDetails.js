import React, { useState, useEffect } from "react";
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

const TargetLoadDetails = ({ formData, updateFormData }) => {
  const [checked, setChecked] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const changeHandler = (event) => {
    const updatedFormData = {
      ...formData,
      targetLoadDetails: {
        ...formData.targetLoadDetails,
        [event.target.name]: event.target.value,
      },
    };
    updateFormData(updatedFormData);
  };

  const optionChangeHandler = (event) => {
    setSelectedOption(event.target.value);
    const updatedFormData = {
      ...formData,
      targetLoadDetails: {
        ...formData.targetLoadDetails,
        ["TargetLoadType"]: event.target.value,
      },
    };
    updateFormData(updatedFormData);
  };

  const alertHandler1 = (event) => {
    console.log(event.target.name);
    const updatedFormData = {
      ...formData,
      targetLoadDetails: {
        ...formData.targetLoadDetails,
        ["DataQualityMoniter"]: {
          ...formData.targetLoadDetails.DataQualityMoniter,
          [event.target.name]: event.target.value,
        },
    updateFormData(updatedFormData);
  };

  const alertHandler2 = (event) => {
    console.log(event.target.name);
    const updatedFormData = {
      ...formData,
      targetLoadDetails: {
        ...formData.targetLoadDetails,
        ["RecordCountChangesMoniter"]: {
          ...formData.targetLoadDetails.RecordCountChangesMoniter,
          [event.target.name]: event.target.value,
        },
      },
    };
    updateFormData(updatedFormData);
  };

  const chechBoxHandler = (e) => {
    setChecked(!checked);
  };

  console.log("target formdata", formData);

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
                        value={formData.targetLoadDetails.TargetEntityName}
                        disabled={false}
                        name="TargetEntityName"
                        onChange={changeHandler}
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
                        id="TRUNCATE"
                        value="TRUNCATE"
                        checked={
                          selectedOption === "TRUNCATE" ||
                          formData.targetLoadDetails.TargetLoadType ===
                            "TRUNCATE"
                        }
                        onChange={optionChangeHandler}
                        label="TRUNCATE"
                        name="TRUNCATE"
                      ></Form.Check>
                    </Col>
                    <Col xs="auto">
                      <Form.Check
                        type="radio"
                        id="INSERT"
                        value="INSERT"
                        checked={
                          selectedOption === "INSERT" ||
                          formData.targetLoadDetails.TargetLoadType === "INSERT"
                        }
                        onChange={optionChangeHandler}
                        label="INSERT"
                        name="INSERT"
                      ></Form.Check>
                    </Col>
                    <Col xs="auto">
                      <Form.Check
                        type="radio"
                        id="INCREMENTAL"
                        value="INCREMENTAL"
                        checked={
                          selectedOption === "INCREMENTAL" ||
                          formData.targetLoadDetails.TargetLoadType ===
                            "INCREMENTAL"
                        }
                        onChange={optionChangeHandler}
                        label="INCREMENTAL"
                        name="INCREMENTAL"
                      ></Form.Check>
                    </Col>
                    <Col xs="auto">
                      <Form.Check
                        type="radio"
                        id="SCD TYPE II"
                        value="SCD TYPE II"
                        checked={
                          selectedOption === "SCD TYPE II" ||
                          formData.targetLoadDetails.TargetLoadType ===
                            "SCD TYPE II"
                        }
                        onChange={optionChangeHandler}
                        label="SCD TYPE II"
                        name="SCD TYPE II"
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
                        name="Alert"
                        tag="DataQualityMoniter"
                        value={
                          formData.targetLoadDetails.DataQualityMoniter.Alert
                        }
                        onChange={alertHandler1}
                      ></Form.Control>
                    </Col>
                    <Col xs="auto">
                      <Form.Label>Abort</Form.Label>
                      <Form.Control
                        type="text"
                        className="textbox2"
                        name="Abort"
                        tag="DataQualityMoniter"
                        value={
                          formData.targetLoadDetails.DataQualityMoniter.Abort
                        }
                        onChange={alertHandler1}
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
                        name="Alert"
                        value={
                          formData.targetLoadDetails.RecordCountChangesMoniter
                            .Alert
                        }
                        onChange={alertHandler2}
                      ></Form.Control>
                    </Col>
                    <Col xs="auto">
                      <Form.Label>Abort</Form.Label>
                      <Form.Control
                        type="text"
                        className="textbox2"
                        name="Abort"
                        value={
                          formData.targetLoadDetails.RecordCountChangesMoniter
                            .Abort
                        }
                        onChange={alertHandler2}
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
                          <Form.Select
                            aria-label=""
                            disabled={false}
                            name="DataLakeConnection"
                            onChange={changeHandler}
                            value={
                              formData.targetLoadDetails.DataLakeConnection
                            }
                          >
                            <option>{""}</option>
                            <option>Connection1</option>
                            <option>Connection2</option>
                          </Form.Select>
                        </Col>
                        <Col>
                          <Form.Label>Data Lake File Format</Form.Label>
                          <Form.Select
                            aria-label=""
                            disabled={false}
                            name="DataLakeFileFormat"
                            onChange={changeHandler}
                            value={
                              formData.targetLoadDetails.DataLakeFileFormat
                            }
                          >
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
                            name="DataLakeTargetTemplate"
                            value={
                              formData.targetLoadDetails.DataLakeTargetTemplate
                            }
                            onChange={changeHandler}
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

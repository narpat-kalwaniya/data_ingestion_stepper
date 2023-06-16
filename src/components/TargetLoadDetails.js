import React, { useState, useEffect, useContext } from "react";
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
import { DataContext } from "./DataContext";

import "./TargetLoadDetails.css";

const TargetLoadDetails = ({ formData, updateFormData }) => {
  const [checked, setChecked] = useState(
    formData.targetLoadDetails.MaintainCopyInDataLake
  );
  const [selectedOption, setSelectedOption] = useState("");
  const { ingestionData, updateIngestionData } = useContext(DataContext);

  const changeHandler = (event) => {
    const updatedFormData = {
      ...formData,
      targetLoadDetails: {
        ...formData.targetLoadDetails,
        [event.target.name]: event.target.value,
      },
    };
    updateFormData(updatedFormData);

    const updatedData = { ...ingestionData[0] };
    updatedData.target_load_details = {
      ...updatedData.target_load_details,
      [event.target.name]: event.target.value,
    };
    updateIngestionData(updatedData);
  };

  const optionChangeHandler = (event) => {
    setSelectedOption(event.target.value);
    const updatedFormData = {
      ...formData,
      targetLoadDetails: {
        ...formData.targetLoadDetails,
        ["target_load_type"]: event.target.value,
      },
    };
    updateFormData(updatedFormData);

    const updatedData = { ...ingestionData[0] };
    updatedData.target_load_details = {
      ...updatedData.target_load_details,
      ["target_load_type"]: event.target.value,
    };
    updateIngestionData(updatedData);
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
      },
    };
    updateFormData(updatedFormData);
    const updatedData = { ...ingestionData[0] };
    updatedData.target_load_details = {
      ...updatedData.target_load_details,
      ["data_quality_monitor_" + event.target.name]: event.target.value,
    };
    updateIngestionData(updatedData);
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
    const updatedFormData = {
      ...formData,
      targetLoadDetails: {
        ...formData.targetLoadDetails,
        [e.target.name]: e.target.checked,
      },
    };
    updateFormData(updatedFormData);

    const updatedData = { ...ingestionData[0] };
    updatedData.target_load_details = {
      ...updatedData.target_load_details,
      [e.target.name]: e.target.checked,
    };
    updateIngestionData(updatedData);
  };

  console.log("target formdata", formData);
  console.log("target ingestion data", ingestionData);

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
                        value={formData.targetLoadDetails.target_entity_name}
                        disabled={false}
                        name="target_entity_name"
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
                      <Form.Label>Data Quality Monitor</Form.Label>
                    </Col>
                    <Col className="dqt" xs="auto">
                      <Form.Label>Alert</Form.Label>
                      <Form.Control
                        type="text"
                        className="textbox2"
                        name="alert"
                        tag="DataQualityMoniter"
                        value={
                          formData.targetLoadDetails.DataQualityMoniter.alert
                        }
                        onChange={alertHandler1}
                      ></Form.Control>
                    </Col>
                    <Col xs="auto">
                      <Form.Label>Abort</Form.Label>
                      <Form.Control
                        type="text"
                        className="textbox2"
                        name="abort"
                        tag="DataQualityMoniter"
                        value={
                          formData.targetLoadDetails.DataQualityMoniter.abort
                        }
                        onChange={alertHandler1}
                      ></Form.Control>
                    </Col>
                  </Row>
                </div>
                <div className="form-group">
                  {/* <Row className="mb-3">
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
                    </Col> */}
                  {/* </Row> */}
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
                    name="is_mantain_a_copy_in_datalake"
                    checked={
                      formData.targetLoadDetails.is_mantain_a_copy_in_datalake
                    }
                    // onChange={chechBoxHandler}
                    onChange={(e) => {
                      setChecked(e.target.checked);
                      chechBoxHandler(e);
                    }}
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
                            name="datalake_connection"
                            onChange={changeHandler}
                            value={
                              formData.targetLoadDetails.datalake_connection
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
                            name="datalake_file_format"
                            onChange={changeHandler}
                            value={
                              formData.targetLoadDetails.datalake_file_format
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
                            name="datalake_target_template"
                            value={
                              formData.targetLoadDetails
                                .datalake_target_template
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

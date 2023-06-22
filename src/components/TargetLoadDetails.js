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

const TargetLoadDetails = ({ formData, updateFormData, errors6 }) => {
  const [checked, setChecked] = useState(
    formData.targetLoadDetails.is_mantain_a_copy_in_datalake
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

  // console.log("target formdata", formData);
  console.log("target load ingestion data", ingestionData);

  return (
    <Card.Body className="custom-card-body">
      <div className="text-left">
        <Form>
          <Row className="mb-4">
            <Form.Label>
              Target Entity Name <span className="text-danger">*</span>
            </Form.Label>
            <Col>
              <Form.Control
                type="text"
                className="custom-select custom-style"
                value={formData.targetLoadDetails.target_entity_name}
                disabled={false}
                name="target_entity_name"
                onChange={changeHandler}
                isInvalid={errors6.target_entity_name}
              />
              {errors6.target_entity_name && (
                <div className="error">{errors6.target_entity_name}</div>
              )}
            </Col>
          </Row>
          <Row className="mb-4">
            <Col xs="auto">
              <Form.Label>
                Target Load Type <span className="text-danger">*</span>
              </Form.Label>
            </Col>
            <Col xs="auto">
              <div className="radio-group">
                <Form.Check
                  inline
                  type="radio"
                  id="TRUNCATE"
                  value="TRUNCATE"
                  checked={
                    selectedOption === "TRUNCATE" ||
                    formData.targetLoadDetails.target_load_type === "TRUNCATE"
                  }
                  onChange={optionChangeHandler}
                  label="TRUNCATE"
                  name="TRUNCATE"
                  className="custom-radio"
                  style={{ marginRight: "25px" }}
                ></Form.Check>
                <Form.Check
                  inline
                  type="radio"
                  id="INSERT"
                  value="INSERT"
                  checked={
                    selectedOption === "INSERT" ||
                    formData.targetLoadDetails.target_load_type === "INSERT"
                  }
                  onChange={optionChangeHandler}
                  label="INSERT"
                  name="INSERT"
                  style={{ marginRight: "25px" }}
                ></Form.Check>
                <Form.Check
                  inline
                  type="radio"
                  id="INCREMENTAL"
                  value="INCREMENTAL"
                  checked={
                    selectedOption === "INCREMENTAL" ||
                    formData.targetLoadDetails.target_load_type ===
                      "INCREMENTAL"
                  }
                  onChange={optionChangeHandler}
                  label="INCREMENTAL"
                  name="INCREMENTAL"
                  style={{ marginRight: "25px" }}
                ></Form.Check>
                <Form.Check
                  inline
                  type="radio"
                  id="SCD TYPE II"
                  value="SCD TYPE II"
                  checked={
                    selectedOption === "SCD TYPE II" ||
                    formData.targetLoadDetails.target_load_type ===
                      "SCD TYPE II"
                  }
                  onChange={optionChangeHandler}
                  label="SCD TYPE II"
                  name="SCD TYPE II"
                  style={{ marginRight: "25px" }}
                ></Form.Check>
              </div>
              {errors6.target_load_type && (
                <div className="error">{errors6.target_load_type}</div>
              )}
            </Col>
          </Row>

          <Row className="mb-3">
            <Col xs={3}>
              <Form.Label>Data Quality Monitor</Form.Label>
            </Col>
            <Col>
              <Form.Label>Alert</Form.Label>
              <Form.Control
                type="text"
                name="alert"
                tag="DataQualityMoniter"
                value={formData.targetLoadDetails.DataQualityMoniter.alert}
                onChange={alertHandler1}
                className="custom-select custom-style"
              ></Form.Control>
            </Col>
            <Col>
              <Form.Label>Abort</Form.Label>
              <Form.Control
                type="text"
                name="abort"
                tag="DataQualityMoniter"
                value={formData.targetLoadDetails.DataQualityMoniter.abort}
                onChange={alertHandler1}
                className="custom-select custom-style"
              ></Form.Control>
            </Col>
          </Row>
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
          <Row className="mb-3">
            <Form.Check
              type="checkbox"
              label="Maintain a copy in DataLake"
              name="is_mantain_a_copy_in_datalake"
              checked={formData.targetLoadDetails.is_mantain_a_copy_in_datalake}
              // onChange={chechBoxHandler}
              onChange={(e) => {
                setChecked(!checked);
                chechBoxHandler(e);
              }}
              className="custom-select custom-style"
            ></Form.Check>
          </Row>
          {checked && (
            <div>
              <Row className="mb-3">
                <Col>
                  <Form.Label>Data Lake Connection</Form.Label>
                  <Form.Select
                    aria-label=""
                    disabled={false}
                    className="custom-select custom-style"
                    name="datalake_connection"
                    onChange={changeHandler}
                    value={formData.targetLoadDetails.datalake_connection}
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
                    className="custom-select custom-style"
                    name="datalake_file_format"
                    onChange={changeHandler}
                    value={formData.targetLoadDetails.datalake_file_format}
                  >
                    <option>{""}</option>
                    <option>CSV</option>
                    <option>PARQUET</option>
                    <option>AVRO</option>
                    <option>Source Format</option>
                  </Form.Select>
                </Col>
              </Row>

              <Row className="align-items-center mb-3">
                <Col xs="auto">
                  <Form.Label>Data Lake Target Template</Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    type="text"
                    className="custom-select custom-style"
                    disabled={false}
                    name="datalake_target_template"
                    value={formData.targetLoadDetails.datalake_target_template}
                    onChange={changeHandler}
                  />
                </Col>
              </Row>
            </div>
          )}
        </Form>
      </div>
    </Card.Body>
  );
};

export default TargetLoadDetails;

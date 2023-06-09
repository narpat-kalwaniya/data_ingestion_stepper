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

const TargetLoadDetails = ({
  formData,
  updateFormData,
  shouldUpdateTargetLoad,
}) => {
  const [checked, setChecked] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const [pageData, setPageData] = useState({
    TargetEntityName: "",
    TargetLoadType: "",
    DataQualityMoniter: {
      Alert: "",
      Abort: "",
    },
    RecordCountChangesMoniter: {
      Alert: "",
      Abort: "",
    },
    DataLakeConnection: "",
    DataLakeFileFormat: "",
    DataLakeTargetTemplate: "",
  });
  const changeHandler = (event) => {
    setPageData({ ...pageData, [event.target.name]: event.target.value });
  };

  const optionChangeHandler = (event) => {
    setSelectedOption(event.target.value);
    setPageData({ ...pageData, ["TargetLoadType"]: event.target.value });
  };

  const alertHandler1 = (event) => {
    console.log(event.target.name);
    setPageData({
      ...pageData,
      ["DataQualityMoniter"]: {
        ...pageData.DataQualityMoniter,
        [event.target.name]: event.target.value,
      },
    });
  };

  const alertHandler2 = (event) => {
    console.log(event.target.name);
    setPageData({
      ...pageData,
      ["RecordCountChangesMoniter"]: {
        ...pageData.RecordCountChangesMoniter,
        [event.target.name]: event.target.value,
      },
    });
  };

  const chechBoxHandler = (e) => {
    setChecked(!checked);
  };

  useEffect(() => {
    const updatedFormData = {
      ...formData, // Copy the existing formData object
      targetLoadDetails: [{ ...formData.targetLoadDetails, ...pageData }], // Add the new object to the array
    };
    updateFormData(updatedFormData);
  }, [pageData]);

  // if (shouldUpdateTargetLoad) {
  //   const updatedFormData = {
  //     ...formData,
  //     targetLoadDetails: [...formData.targetLoadDetails, pageData],
  //   };
  //   updateFormData(updatedFormData);
  // }

  console.log("pagedata", pageData);
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
                        checked={selectedOption === "TRUNCATE"}
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
                        checked={selectedOption === "INSERT"}
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
                        checked={selectedOption === "INCREMENTAL"}
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
                        checked={selectedOption === "SCD TYPE II"}
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
                        onChange={alertHandler2}
                      ></Form.Control>
                    </Col>
                    <Col xs="auto">
                      <Form.Label>Abort</Form.Label>
                      <Form.Control
                        type="text"
                        className="textbox2"
                        name="Abort"
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

import React, { useContext, useState } from "react";
import { Form, Row, Col, Modal } from "react-bootstrap";
import "./Data_Quality.css";
import Select from "react-select";
import MultiRangesSlider from "./MultiRangesSlider";
import { DataContext } from "./ColumnRulContext";

function CompletenessRule({ show, onHide }) {
  const { columnRulesData, updateColumnRulesData } = useContext(DataContext);
  const [sliderLower, setSliderLower] = useState(0);
  const [sliderUpper, setSliderUpper] = useState(0);

  const [formData, setFormData] = useState({
    BusinessTestCaseName: "",
    ColumnName: "", // Initialize with default values or empty strings
    missing_default_value: [],
    DQDimension: "",
    SeverityLevel: "",
    PriorityLevel: "",
    alert_threshold_lower: "",
    alert_threshold_upper: "",
  });

  // Handle form input changes
  const handleInputChange = (event, name) => {
    const value = event.target ? event.target.value : event;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSliderChange = (lower, upper) => {
    setFormData({
      ...formData,
      alert_threshold_lower: lower,
      alert_threshold_upper: upper,
    });
  };

  // Handle form submission
  const handleSubmit = async () => {
    const updatedData = [...columnRulesData];
    // Update the specific properties for the first item in the array
    const updatedItem = { ...updatedData[0], ...formData };

    // Replace the first item in the copy with the updated item
    updatedData[0] = updatedItem;

    // Update the columnRulesData context with the modified data
    updateColumnRulesData(updatedData);

    try {
      // Make a POST request using the fetch API
      const response = await fetch(
        "http://ec2-54-197-121-247.compute-1.amazonaws.com:8001/dqtestcases/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        // Request was successful
        const responseData = await response.json();
        console.log("API response:", responseData);
      } else {
        // Request failed
        console.error("API error:", response.status, response.statusText);
      }
    } catch (error) {
      // Handle any exceptions that may occur during the request
      console.error("API error:", error);
    }

    // Close the modal or perform any other actions
    onHide();
  };
  console.log("completness form data", formData);
  console.log("column rules data context", columnRulesData);

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title> "Completeness" Rule</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          {" "}
          Completeness DQ rule scans a columns to count the cells with missing
          (e.g. database NULL type or blank text) or default (e.g. 'Not
          Applicable' or 'Default') values.
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
                name="BusinessTestCaseName"
                value={formData.BusinessTestCaseName}
                onChange={(e) => handleInputChange(e, "BusinessTestCaseName")}
                className="custom-select custom-style"
              />
            </div>
          </Row>
          <Row className="mb-4">
            <div className="column_rule_table_style">
              <Form.Label style={{ width: "50%" }}>Column Name</Form.Label>

              <Form.Control
                placeholder="Enter Column Name"
                type="text"
                disabled={false}
                name="ColumnName"
                value={formData.ColumnName}
                onChange={(e) => handleInputChange(e, "ColumnName")}
                className="custom-select custom-style"
              />
            </div>
          </Row>
          <Row className="mb-4">
            <div className="column_rule_table_style">
              <Form.Label style={{ width: "33%" }}>
                Missing/default Values
              </Form.Label>

              <Col>
                <Select
                  isMulti
                  value={formData.missing_default_value}
                  onChange={(selectedOption) =>
                    handleInputChange(selectedOption, "missing_default_value")
                  }
                  className="custom-select custom-style"
                />
              </Col>
            </div>
          </Row>
          <Row className="mb-4">
            <div className="column_rule_table_style">
              <Form.Label style={{ width: "33%" }}> Alert Threshold</Form.Label>
              <Col>
                <MultiRangesSlider
                  alert_threshold_lower={formData.alert_threshold_lower}
                  alert_threshold_upper={formData.alert_threshold_upper}
                  onInputChange={handleSliderChange}
                />{" "}
              </Col>
            </div>
          </Row>

          <Row className="mb-4">
            <div className="column_rule_table_style">
              <Form.Label style={{ width: "50%" }}> DQ Dimension</Form.Label>

              <Form.Select
                name="DQDimension"
                value={formData.DQDimension}
                onChange={(e) => handleInputChange(e, "DQDimension")}
                className="custom-select custom-style"
              >
                <option value="">Select</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </Form.Select>
            </div>
          </Row>
          <Row className="mb-4">
            <div className="column_rule_table_style">
              <Form.Label style={{ width: "50%" }}> Severity Level</Form.Label>

              <Form.Select
                name="SeverityLevel"
                value={formData.SeverityLevel}
                onChange={(e) => handleInputChange(e, "SeverityLevel")}
                className="custom-select custom-style"
              >
                <option value="">Select</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </Form.Select>
            </div>
          </Row>
          <Row className="mb-4">
            <div className="column_rule_table_style">
              <Form.Label style={{ width: "50%" }}> Priority Level</Form.Label>

              <Form.Select
                name="PriorityLevel"
                value={formData.PriorityLevel}
                onChange={(e) => handleInputChange(e, "PriorityLevel")}
                className="custom-select custom-style"
              >
                <option value="">Select</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </Form.Select>
            </div>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn-c " onClick={onHide}>
          Close
        </button>
        <button className="btn-s " onClick={handleSubmit}>
          Submit
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default CompletenessRule;

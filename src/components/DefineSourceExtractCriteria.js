import React, { useState, useContext } from "react";
import {
  Button,
  Container,
  Card,
  Form,
  Row,
  Col,
  Badge,
  ListGroup,
  FormGroup,
} from "react-bootstrap";
import "../App.css";
import { DataContext } from "./DataContext";
import Select from "react-select";

const DefineSourceExtractCriteria = ({ formData, updateFormData, errors5 }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedValues, setSelectedValues] = useState([]);
  const [selectedIncrementalBy, setSelectedIncrementalBy] = useState("");
  const { ingestionData, updateIngestionData } = useContext(DataContext);

  const [pageData, setPageData] = useState({
    incrementalOrFullExtract: "",
    selectDistinct: false,
    incrementalBy: "",
    incrementalColumns: [],
    incrementalStartDatetime: "",
    incrementalEndDatetime: "",
    incrementalStartSeq: "",
    incrementalEndSeq: "",
    defaultStartDate: "",
    defaultStartSeq: "",
    filter: "",
    orderBy: "",
  });

  console.log(formData.tableData);

  const selectDistinctHandler = (e) => {
    console.log(e.target.value);
    setPageData({ ...pageData, [e.target.name]: !pageData.selectDistinct });
    const updatedFormData = {
      ...formData,
      DefineSourceExtractCriteria: {
        ...formData.DefineSourceExtractCriteria,
        [e.target.name]: e.target.checked,
      },
    };
    updateFormData(updatedFormData);

    const updatedData = { ...ingestionData[0] };
    updatedData.source_extract_criteria = {
      ...updatedData.source_extract_criteria,
      [e.target.name]: e.target.value,
    };
    updateIngestionData(updatedData);
  };

  const changeHandler = (e) => {
    setPageData({ ...pageData, [e.target.name]: e.target.value });
    const updatedFormData = {
      ...formData,
      DefineSourceExtractCriteria: {
        ...formData.DefineSourceExtractCriteria,
        [e.target.name]: e.target.value,
      },
    };
    updateFormData(updatedFormData);
    console.log("selected pageData", pageData);
    const updatedData = { ...ingestionData[0] };
    updatedData.source_extract_criteria = {
      ...updatedData.source_extract_criteria,
      [e.target.name]: e.target.value,
    };
    updateIngestionData(updatedData);
  };

  const handleRadioChange = (e) => {
    setSelectedOption(e.target.value);
    setPageData({ ...pageData, [e.target.name]: e.target.value });
    const updatedFormData = {
      ...formData,
      DefineSourceExtractCriteria: {
        ...formData.DefineSourceExtractCriteria,
        [e.target.name]: e.target.value,
      },
    };
    updateFormData(updatedFormData);

    const updatedData = { ...ingestionData[0] };
    updatedData.source_extract_criteria = {
      ...updatedData.source_extract_criteria,
      [e.target.name]: e.target.value,
    };
    updateIngestionData(updatedData);
  };
  // console.log("pagedata", pageData);

  const incrementalByHandler = (e) => {
    setSelectedIncrementalBy(e.target.value);
    setPageData({ ...pageData, [e.target.name]: e.target.value });
    const updatedFormData = {
      ...formData,
      DefineSourceExtractCriteria: {
        ...formData.DefineSourceExtractCriteria,
        [e.target.name]: e.target.value,
      },
    };
    updateFormData(updatedFormData);

    const updatedData = { ...ingestionData[0] };
    updatedData.source_extract_criteria = {
      ...updatedData.source_extract_criteria,
      [e.target.name]: e.target.value,
    };
    updateIngestionData(updatedData);
  };

  // console.log("sourceExtractform data", formData);
  console.log("source ingestion data", ingestionData);

  const handleSelect = (e) => {
    const selectedOption = e.target.value;
    if (!selectedValues.includes(selectedOption)) {
      setSelectedValues((prevSelectedValues) => [
        ...prevSelectedValues,
        selectedOption,
      ]);
      const updatedFormData = {
        ...formData,
        DefineSourceExtractCriteria: {
          ...formData.DefineSourceExtractCriteria,
          [e.target.name]: [...selectedValues, selectedOption],
        },
      };
      updateFormData(updatedFormData);

      const updatedData = { ...ingestionData[0] };
      updatedData.source_extract_criteria = {
        ...updatedData.source_extract_criteria,
        [e.target.name]: [...selectedValues, selectedOption],
      };
      updateIngestionData(updatedData);
    }
  };

  const handleBadgeClose = (value) => {
    setSelectedValues((prevSelectedValues) =>
      prevSelectedValues.filter((v) => v !== value)
    );
    const updatedFormData = {
      ...formData,
      DefineSourceExtractCriteria: {
        ...formData.DefineSourceExtractCriteria,
        source_incremental_column: selectedValues.filter((v) => v !== value),
      },
    };
    updateFormData(updatedFormData);

    const updatedData = { ...ingestionData[0] };
    updatedData.source_extract_criteria = {
      ...updatedData.source_extract_criteria,
      source_incremental_column: selectedValues.filter((v) => v !== value),
    };
    updateIngestionData(updatedData);
  };

  const isIncrementalSelected =
    formData.DefineSourceExtractCriteria.source_entity_type === "incremental";
  const isDateSelected =
    formData.DefineSourceExtractCriteria.source_entity_type === "incremental" &&
    formData.DefineSourceExtractCriteria.incremental_by === "Date";

  // console.log("selected values", selectedValues);
  // console.log("selected options", selectedOption);
  // console.log("selected incremental", selectedIncrementalBy);
  console.log("form data in source", formData);

  return (
    <Card.Body className="custom-card-body">
      <div className="text-left">
        <Form>
          <Row className="mb-4">
            <Col sm={6}>
              <div className="radio-group">
                <Col>
                  <Form.Label>
                    Target Load Type <span className="text-danger">*</span>
                  </Form.Label>
                </Col>
                <Form.Check
                  inline
                  type="radio"
                  label="Incremental"
                  name="source_entity_type"
                  value="incremental"
                  checked={
                    selectedOption === "incremental" ||
                    formData.DefineSourceExtractCriteria.source_entity_type ===
                      "incremental"
                  }
                  onChange={handleRadioChange}
                  // checked={dataSourceType === "RDBMS-TABLE"}
                  // onChange={selectChangeHandler}
                  className="custom-radio"
                />
                <Form.Check
                  inline
                  type="radio"
                  label="Full Extract"
                  name="source_entity_type"
                  value="fullextract"
                  checked={
                    selectedOption === "fullextract" ||
                    formData.DefineSourceExtractCriteria.source_entity_type ===
                      "fullextract"
                  }
                  onChange={handleRadioChange}
                  // checked={dataSourceType === "RDBMS-QUERY"}
                  // onChange={selectChangeHandler}
                  className="custom-radio"
                />
                {errors5.source_entity_type && (
                  <div className="error">{errors5.source_entity_type}</div>
                )}
                {/* <Form.Check
                  inline
                  type="radio"
                  label="Select Distinct"
                  name="source_entity_type"
                  value="selectDistinct"
                  checked={
                    selectedOption === "selectDistinct" ||
                    formData.DefineSourceExtractCriteria.source_entity_type ===
                      "selectDistinct"
                  }
                  onChange={handleRadioChange}
                  // checked={dataSourceType === "RDBMS-QUERY"}
                  // onChange={selectChangeHandler}
                  className="custom-radio"
                /> */}
              </div>
            </Col>
            <Col xs={3}>
              <Form.Check
                type="checkbox"
                id="checkbox"
                name="is_select_distinct"
                label="Select Distinct"
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
                // value={pageData.selectDistinct}
                onChange={selectDistinctHandler}
                checked={
                  formData.DefineSourceExtractCriteria.is_select_distinct ===
                  true
                }
              />
            </Col>
          </Row>
          <Row className="mb-4">
            <Col xs={4}>
              <Form.Label>Incremental by</Form.Label>
              <Form.Select
                aria-label=""
                disabled={!isIncrementalSelected}
                onChange={incrementalByHandler}
                value={formData.DefineSourceExtractCriteria.incremental_by}
                name="incremental_by"
                className="custom-select custom-style"
              >
                <option value="">-- Select --</option>
                <option value="Date">Date</option>
                <option value="Sequence">Sequence</option>
              </Form.Select>
            </Col>
            {isIncrementalSelected && (
              <Col>
                <Form.Label> Select Incremental Columns</Form.Label>
                {/* <Select
                isMulti
                // value={selectedOptions}
                // onChange={handleOptionChange}
                // options={formData.tableData.column}
              /> */}
                <Form.Select
                  multiple
                  onChange={handleSelect}
                  disabled={!isIncrementalSelected}
                  value={
                    formData.DefineSourceExtractCriteria
                      .source_incremental_column
                  }
                  className="custom-select custom-style"
                  name="source_incremental_column"
                >
                  {formData.tableData.map((column, index) => (
                    <option key={index} value={column.column_name}>
                      {column.column_name}
                    </option>
                  ))}
                </Form.Select>
                <div className="mt-2">
                  {formData.DefineSourceExtractCriteria.source_incremental_column.map(
                    (value) => (
                      <Badge
                        key={value}
                        variant="primary"
                        className="mr-1 mb-3"
                        style={{ marginRight: "5px" }}
                      >
                        {value}
                        <span
                          className="badge badge-secondary ml-1"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleBadgeClose(value)}
                        >
                          X
                        </span>
                      </Badge>
                    )
                  )}
                </div>
              </Col>
            )}
          </Row>

          <Row className="mb-4">
            <Col>
              <Form.Label>Incremental Start Datetime</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                className="custom-select custom-style"
                name="incremental_start_time"
                value={
                  formData.DefineSourceExtractCriteria.incremental_start_time
                }
                disabled={
                  !isIncrementalSelected ||
                  formData.DefineSourceExtractCriteria.incremental_by !== "Date"
                }
                onChange={changeHandler}
              />
            </Col>
            <Col>
              <Form.Label>Incremental End Datetime</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                className="custom-select custom-style"
                name="incremental_end_time"
                value={
                  formData.DefineSourceExtractCriteria.incremental_end_time
                }
                disabled={
                  !isIncrementalSelected ||
                  formData.DefineSourceExtractCriteria.incremental_by !== "Date"
                }
                onChange={changeHandler}
              />
            </Col>
            <Col>
              <Form.Label>Default Start Date</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                className="custom-select custom-style"
                disabled={
                  !isIncrementalSelected ||
                  formData.DefineSourceExtractCriteria.incremental_by !== "Date"
                }
                name="default_start_date"
                onChange={changeHandler}
                value={formData.DefineSourceExtractCriteria.default_start_date}
              />
            </Col>
          </Row>
          <Row className="mb-4">
            <Col>
              <Form.Label>Incremental Start Seq</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                className="custom-select custom-style"
                name="incremental_start_sequence"
                value={
                  formData.DefineSourceExtractCriteria
                    .incremental_start_sequence
                }
                disabled={
                  !isIncrementalSelected ||
                  formData.DefineSourceExtractCriteria.incremental_by !==
                    "Sequence"
                }
                onChange={changeHandler}
              />
            </Col>
            <Col>
              <Form.Label>Incremental End Seq</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                className="custom-select custom-style"
                disabled={
                  !isIncrementalSelected ||
                  formData.DefineSourceExtractCriteria.incremental_by !==
                    "Sequence"
                }
                name="incremental_end_sequence"
                onChange={changeHandler}
                value={
                  formData.DefineSourceExtractCriteria.incremental_end_sequence
                }
              />
            </Col>
            <Col>
              <Form.Label>Default Start Seq</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                className="custom-select custom-style"
                disabled={
                  !isIncrementalSelected ||
                  formData.DefineSourceExtractCriteria.incremental_by !==
                    "Sequence"
                }
                name="default_start_seq"
                onChange={changeHandler}
                value={formData.DefineSourceExtractCriteria.default_start_seq}
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Form.Label>Filter to be applied</Form.Label>
            <Col>
              <Form.Control
                type="text"
                placeholder=""
                className="custom-select custom-style"
                // disabled={isIncrementalSelected}
                name="filter"
                onChange={changeHandler}
                value={formData.DefineSourceExtractCriteria.filter}
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Form.Label>Order by</Form.Label>
            <Col>
              <Form.Control
                type="text"
                placeholder=""
                className="custom-select custom-style"
                // disabled={isIncrementalSelected}
                name="order_by"
                onChange={changeHandler}
                value={formData.DefineSourceExtractCriteria.order_by}
              />
            </Col>
          </Row>
        </Form>
      </div>
    </Card.Body>
  );
};

export default DefineSourceExtractCriteria;

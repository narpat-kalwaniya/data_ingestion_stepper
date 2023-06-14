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

const DefineSourceExtractCriteria = ({ formData, updateFormData }) => {
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

  console.log(formData);

  const selectDistinctHandler = (e) => {
    console.log(e.target.value);
    setPageData({ ...pageData, [e.target.name]: !pageData.selectDistinct });
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
  console.log("pagedata", pageData);

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

  console.log("sourceExtractform data", formData);
  console.log("source ingestion data", ingestionData);

  const handleSelect = (e) => {
    const selectedOption = e.target.value;
    if (!selectedValues.includes(selectedOption)) {
      setSelectedValues((prevSelectedValues) => [
        ...prevSelectedValues,
        selectedOption,
      ]);
    }
  };

  const handleBadgeClose = (value) => {
    setSelectedValues((prevSelectedValues) =>
      prevSelectedValues.filter((v) => v !== value)
    );
  };

  const isIncrementalSelected =
    formData.DefineSourceExtractCriteria.source_entity_type === "incremental";
  const isDateSelected =
    formData.DefineSourceExtractCriteria.source_entity_type === "incremental" &&
    formData.DefineSourceExtractCriteria.incremental_by === "Date";

  // console.log("selected values", selectedValues);
  // console.log("selected options", selectedOption);
  // console.log("selected incremental", selectedIncrementalBy);
  console.log("selected pageData", pageData);

  return (
    <div className="App">
      <Container className="h-100">
        <Card.Body>
          <Form>
            <Form.Group as={Row} className="align-items-center">
              <Form.Label column sm={2}>
                Incremental
              </Form.Label>
              <Col sm={4}>
                <Form.Check
                  type="radio"
                  label=""
                  name="source_entity_type"
                  value="incremental"
                  checked={
                    selectedOption === "incremental" ||
                    formData.DefineSourceExtractCriteria.source_entity_type ===
                      "incremental"
                  }
                  onChange={handleRadioChange}
                />
              </Col>
              <Col sm={6}>
                <Row>
                  <Col sm={6}>
                    <Form.Check
                      type="checkbox"
                      id="checkbox"
                      className="mb-0"
                      name="is_select_distinct"
                      label="Select Distinct"
                      // value={pageData.selectDistinct}
                      onChange={selectDistinctHandler}
                      checked={
                        formData.DefineSourceExtractCriteria
                          .is_select_distinct === true
                      }
                    />
                  </Col>
                  {/* <Col sm={6}>
                    <Form.Label>Select Distinct</Form.Label>
                  </Col> */}
                </Row>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="align-items-center">
              <Form.Label column sm={2}>
                Full Extract
              </Form.Label>
              <Col sm={4}>
                <Form.Check
                  type="radio"
                  label=""
                  name="source_entity_type"
                  value="fullextract"
                  checked={
                    selectedOption === "fullextract" ||
                    formData.DefineSourceExtractCriteria.source_entity_type ===
                      "fullextract"
                  }
                  onChange={handleRadioChange}
                />
              </Col>
            </Form.Group>

            <FormGroup>
              <Form.Label>Incremental by</Form.Label>
              <Form.Select
                aria-label=""
                disabled={!isIncrementalSelected}
                onChange={incrementalByHandler}
                value={formData.DefineSourceExtractCriteria.incremental_by}
                name="incremental_by"
              >
                <option value="">-- Select --</option>
                <option value="Date">Date</option>
                <option value="Sequence">Sequence</option>
              </Form.Select>
            </FormGroup>

            <Form.Group>
              <Form.Label> Select Incremental Columns</Form.Label>
              <Form.Control
                as="select"
                multiple
                onChange={handleSelect}
                disabled={!isIncrementalSelected}
              >
                {formData.tableData.map((column, index) => (
                  <option key={index} value={column.column_name}>
                    {column.column_name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <div className="mt-2">
              {selectedValues.map((value) => (
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
              ))}
            </div>

            <Form.Group as={Row}>
              <Col sm={10}>
                <Row>
                  <Col sm={6}>
                    <Form.Group as={Row} controlId="input1">
                      <Form.Label column sm={6}>
                        Incremental Start Datetime
                      </Form.Label>
                      <Col sm={4}>
                        <Form.Control
                          type="text"
                          placeholder=""
                          className="mb-3"
                          name="incremental_start_time"
                          value={
                            formData.DefineSourceExtractCriteria
                              .incremental_start_time
                          }
                          disabled={
                            !isIncrementalSelected ||
                            formData.DefineSourceExtractCriteria
                              .incremental_by !== "Date"
                          }
                          onChange={changeHandler}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group as={Row} controlId="input2">
                      <Form.Label column sm={6}>
                        Incremental End Datetime
                      </Form.Label>
                      <Col sm={4}>
                        <Form.Control
                          type="text"
                          placeholder=""
                          className="mb-3"
                          name="incremental_end_time"
                          value={
                            formData.DefineSourceExtractCriteria
                              .incremental_end_time
                          }
                          disabled={
                            !isIncrementalSelected ||
                            formData.DefineSourceExtractCriteria
                              .incremental_by !== "Date"
                          }
                          onChange={changeHandler}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col sm={6}>
                    <Form.Group as={Row} controlId="input3">
                      <Form.Label column sm={6}>
                        Incremental Start Seq
                      </Form.Label>
                      <Col sm={4}>
                        <Form.Control
                          type="text"
                          placeholder=""
                          className="mb-3"
                          name="incremental_start_sequence"
                          value={
                            formData.DefineSourceExtractCriteria
                              .incremental_start_sequence
                          }
                          disabled={
                            !isIncrementalSelected ||
                            formData.DefineSourceExtractCriteria
                              .incremental_by !== "Sequence"
                          }
                          onChange={changeHandler}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group as={Row} controlId="input4">
                      <Form.Label column sm={6}>
                        Incremental End Seq
                      </Form.Label>
                      <Col sm={4}>
                        <Form.Control
                          type="text"
                          placeholder=""
                          className="mb-3"
                          disabled={
                            !isIncrementalSelected ||
                            formData.DefineSourceExtractCriteria
                              .incremental_by !== "Sequence"
                          }
                          name="incremental_end_sequence"
                          onChange={changeHandler}
                          value={
                            formData.DefineSourceExtractCriteria
                              .incremental_end_sequence
                          }
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="input5">
              <Form.Label column sm={2}>
                Default Start Date
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  placeholder=""
                  className="mb-3"
                  disabled={
                    !isIncrementalSelected ||
                    formData.DefineSourceExtractCriteria.incremental_by !==
                      "Date"
                  }
                  name="default_start_date"
                  onChange={changeHandler}
                  value={
                    formData.DefineSourceExtractCriteria.default_start_date
                  }
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Default Start Seq
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  placeholder=""
                  className="mb-3"
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
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Filter to be applied
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  placeholder=""
                  className="mb-3"
                  disabled={isIncrementalSelected}
                  name="filter"
                  onChange={changeHandler}
                  value={formData.DefineSourceExtractCriteria.filter}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Order by
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  placeholder=""
                  className="mb-3"
                  disabled={isIncrementalSelected}
                  name="order_by"
                  onChange={changeHandler}
                  value={formData.DefineSourceExtractCriteria.order_by}
                />
              </Col>
            </Form.Group>
          </Form>
        </Card.Body>
      </Container>
    </div>
  );
};

export default DefineSourceExtractCriteria;

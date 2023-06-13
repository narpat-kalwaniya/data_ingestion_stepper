import React, { useState } from "react";
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

const DefineSourceExtractCriteria = ({ formData, updateFormData }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedValues, setSelectedValues] = useState([]);
  const [selectedIncrementalBy, setSelectedIncrementalBy] = useState("");

  const [pageData, setPageData] = useState({
    incrementalOrFullExtract: "",
    selectDistinct: false,
    incrementalBy: "",
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
  };

  console.log("sourceExtractform data", formData);
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
    formData.DefineSourceExtractCriteria.incrementalOrFullExtract ===
    "incremental";
  const isDateSelected =
    formData.DefineSourceExtractCriteria.incrementalOrFullExtract ===
      "incremental" &&
    formData.DefineSourceExtractCriteria.incrementalBy === "Date";

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
                  name="incrementalOrFullExtract"
                  value="incremental"
                  checked={
                    selectedOption === "incremental" ||
                    formData.DefineSourceExtractCriteria
                      .incrementalOrFullExtract === "incremental"
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
                      name="selectDistinct"
                      label="Select Distinct"
                      value={
                        formData.DefineSourceExtractCriteria.selectDistinct
                      }
                      onchange={selectDistinctHandler}

                      // checked={pageData.selectDistinct === true}
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
                  name="incrementalOrFullExtract"
                  value="fullextract"
                  checked={
                    selectedOption === "fullextract" ||
                    formData.DefineSourceExtractCriteria
                      .incrementalOrFullExtract === "fullextract"
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
                value={formData.DefineSourceExtractCriteria.incrementalBy}
                name="incrementalBy"
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
                          name="incrementalStartDatetime"
                          value={
                            formData.DefineSourceExtractCriteria
                              .incrementalStartDatetime
                          }
                          disabled={
                            !isIncrementalSelected ||
                            formData.DefineSourceExtractCriteria
                              .incrementalBy !== "Date"
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
                          name="incrementalEndDatetime"
                          value={
                            formData.DefineSourceExtractCriteria
                              .incrementalEndDatetime
                          }
                          disabled={
                            !isIncrementalSelected ||
                            formData.DefineSourceExtractCriteria
                              .incrementalBy !== "Date"
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
                          name="incrementalStartSeq"
                          value={
                            formData.DefineSourceExtractCriteria
                              .incrementalStartSeq
                          }
                          disabled={
                            !isIncrementalSelected ||
                            formData.DefineSourceExtractCriteria
                              .incrementalBy !== "Sequence"
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
                              .incrementalBy !== "Sequence"
                          }
                          name="incrementalEndSeq"
                          value={
                            formData.DefineSourceExtractCriteria
                              .incrementalEndSeq
                          }
                          onchange={changeHandler}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
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
                    formData.DefineSourceExtractCriteria.incrementalBy !==
                      "Date"
                  }
                  name="defaultStartDate"
                  value={formData.DefineSourceExtractCriteria.defaultStartDate}
                  onchange={changeHandler}
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
                    formData.DefineSourceExtractCriteria.incrementalBy !==
                      "Sequence"
                  }
                  name="defaultStartSeq"
                  value={formData.DefineSourceExtractCriteria.defaultStartSeq}
                  onchange={changeHandler}
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
                  value={formData.DefineSourceExtractCriteria.filter}
                  onchange={changeHandler}
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
                  name="orderBy"
                  value={formData.DefineSourceExtractCriteria.orderBy}
                  onchange={changeHandler}
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

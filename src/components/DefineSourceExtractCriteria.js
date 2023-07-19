import React, { useState, useContext } from "react";
import { Card, Form, Row, Col } from "react-bootstrap";
import "../App.css";
import { DataContext } from "./DataContext";
import AceEditor from "react-ace";
import Select from "react-select";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import SuggestionPopUpBox from "./SuggestionPopUpBox";
import "./SuggestPopUpBox.css";

import "ace-builds/src-noconflict/mode-sql";
import "ace-builds/src-noconflict/theme-xcode";
// import "ace-builds/src-noconflict/theme-terminal";

const DefineSourceExtractCriteria = ({ formData, updateFormData, errors5 }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedValues, setSelectedValues] = useState([]);
  const [selectedIncrementalBy, setSelectedIncrementalBy] = useState("");
  const { ingestionData, updateIngestionData } = useContext(DataContext);
  const [orderBy, setOrderBy] = useState([]);
  const [incrementalColumns, setIncrementalColumns] = useState([]);

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
    updateFormData(updatedFormData, 5);

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
    updateFormData(updatedFormData, 5);
    console.log("selected pageData", pageData);
    const updatedData = { ...ingestionData[0] };
    updatedData.source_extract_criteria = {
      ...updatedData.source_extract_criteria,
      [e.target.name]: e.target.value,
    };
    updateIngestionData(updatedData);
  };

  const filterHandler = (code) => {
    setPageData({ ...pageData, filter: code });
    const updatedFormData = {
      ...formData,
      DefineSourceExtractCriteria: {
        ...formData.DefineSourceExtractCriteria,
        filter: code,
      },
    };
    updateFormData(updatedFormData, 5);
    console.log("selected pageData", pageData);
    const updatedData = { ...ingestionData[0] };
    updatedData.source_extract_criteria = {
      ...updatedData.source_extract_criteria,
      filter: code,
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
    updateFormData(updatedFormData, 5);

    const updatedData = { ...ingestionData[0] };
    updatedData.source_extract_criteria = {
      ...updatedData.source_extract_criteria,
      [e.target.name]: e.target.value,
    };
    updateIngestionData(updatedData);
  };

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
    updateFormData(updatedFormData, 5);

    const updatedData = { ...ingestionData[0] };
    updatedData.source_extract_criteria = {
      ...updatedData.source_extract_criteria,
      [e.target.name]: e.target.value,
    };
    updateIngestionData(updatedData);
  };

  const orderByChangeHandler = (selectedOptions) => {
    const selectedLabels = selectedOptions.map((option) => option.label);
    setOrderBy(selectedLabels);
    console.log("order by", orderBy);

    setPageData({ ...pageData, order_by: selectedLabels });
    const updatedFormData = {
      ...formData,
      DefineSourceExtractCriteria: {
        ...formData.DefineSourceExtractCriteria,
        order_by: selectedLabels,
      },
    };
    updateFormData(updatedFormData, 5);

    const updatedData = { ...ingestionData[0] };
    updatedData.source_extract_criteria = {
      ...updatedData.source_extract_criteria,
      order_by: selectedLabels,
    };
    updateIngestionData(updatedData);
  };

  const incrementalColumnsHandler = (selectedOptions) => {
    const selectedLabels = selectedOptions.map((option) => option.label);
    setIncrementalColumns(selectedLabels);
    setPageData({ ...pageData, incrementalColumns: selectedLabels });
    const updatedFormData = {
      ...formData,
      DefineSourceExtractCriteria: {
        ...formData.DefineSourceExtractCriteria,
        source_incremental_column: selectedLabels,
      },
    };
    updateFormData(updatedFormData, 5);

    const updatedData = { ...ingestionData[0] };
    updatedData.source_extract_criteria = {
      ...updatedData.source_extract_criteria,
      source_incremental_column: selectedLabels,
    };
    updateIngestionData(updatedData);
    // const selectedOption = e.target.value;
    // if (!selectedValues.includes(selectedOption)) {
    //   setSelectedValues((prevSelectedValues) => [
    //     ...prevSelectedValues,
    //     selectedOption,
    //   ]);
    //   const updatedFormData = {
    //     ...formData,
    //     DefineSourceExtractCriteria: {
    //       ...formData.DefineSourceExtractCriteria,
    //       [e.target.name]: [...selectedValues, selectedOption],
    //     },
    //   };
    //   updateFormData(updatedFormData,5);

    //   const updatedData = { ...ingestionData[0] };
    //   updatedData.source_extract_criteria = {
    //     ...updatedData.source_extract_criteria,
    //     [e.target.name]: [...selectedValues, selectedOption],
    //   };
    //   updateIngestionData(updatedData);
    // }
  };

  // console.log("sourceExtractform data", formData);
  // console.log("source ingestion data", ingestionData);

  // const handleBadgeClose = (value) => {
  //   setSelectedValues((prevSelectedValues) =>
  //     prevSelectedValues.filter((v) => v !== value)
  //   );
  //   const updatedFormData = {
  //     ...formData,
  //     DefineSourceExtractCriteria: {
  //       ...formData.DefineSourceExtractCriteria,
  //       source_incremental_column: selectedValues.filter((v) => v !== value),
  //     },
  //   };
  //   updateFormData(updatedFormData,5);

  //   const updatedData = { ...ingestionData[0] };
  //   updatedData.source_extract_criteria = {
  //     ...updatedData.source_extract_criteria,
  //     source_incremental_column: selectedValues.filter((v) => v !== value),
  //   };
  //   updateIngestionData(updatedData);
  // };

  const isIncrementalSelected =
    formData.DefineSourceExtractCriteria.source_entity_type === "incremental";
  const isDateSelected =
    formData.DefineSourceExtractCriteria.source_entity_type === "incremental" &&
    formData.DefineSourceExtractCriteria.incremental_by === "Date";

  function copiesOrderBy(arr, key, suffix1, suffix2) {
    return arr.flatMap((obj) => [obj[key] + suffix1, obj[key] + suffix2]);
  }

  const orderByOptions = copiesOrderBy(
    formData.tableData,
    "column_name",
    " asc",
    " desc"
  ).map((option) => ({
    value: option,
    label: option,
  }));

  const extractColumnNames = (array, key) => {
    return array.map((item) => ({ value: item[key], label: item[key] }));
  };

  const column_names = extractColumnNames(formData.tableData, "column_name");
  console.log(column_names);

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
                isInvalid={errors5.incremental_by}
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
              {errors5.incremental_by && (
                <div className="error">{errors5.incremental_by}</div>
              )}
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
                <Select
                  className="custom-select custom-style"
                  isMulti
                  options={column_names}
                  isInvalid={errors5.source_incremental_column}
                  disabled={!isIncrementalSelected}
                  value={column_names.filter((option) =>
                    formData.DefineSourceExtractCriteria.source_incremental_column.includes(
                      option.label
                    )
                  )}
                  // value={
                  //   formData.DefineSourceExtractCriteria.incrementalColumns
                  // }
                  onChange={incrementalColumnsHandler}
                />
                {errors5.source_incremental_column && (
                  <div className="error">
                    {errors5.source_incremental_column}
                  </div>
                )}
                {/* <Form.Select
                  multiple
                  isInvalid={errors5.source_incremental_column}
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
                </Form.Select> */}
                {/* <div className="mt-2">
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
                </div> */}
              </Col>
            )}
          </Row>

          <Row className="mb-4">
            <Col md={4}>
              <Form.Label for="incremental_start_time">
                Start Datetime
              </Form.Label>
              <Form.Control
                // type="text"
                isInvalid={errors5.incremental_start_time}
                type="datetime-local"
                step="0.001"
                placeholder=""
                id="incremental_start_time"
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
              {errors5.incremental_start_time && (
                <div className="error">{errors5.incremental_start_time}</div>
              )}
            </Col>
            <Col md={4}>
              <Form.Label for="incremental_start_time">End Datetime</Form.Label>
              <Form.Control
                // type="text"
                isInvalid={errors5.incremental_end_time}
                type="datetime-local"
                placeholder=""
                className="custom-select custom-style"
                name="incremental_end_time"
                step="0.001"
                id="incremental_end_time"
                value={
                  formData.DefineSourceExtractCriteria.incremental_end_time
                }
                disabled={
                  !isIncrementalSelected ||
                  formData.DefineSourceExtractCriteria.incremental_by !== "Date"
                }
                onChange={changeHandler}
              />
              {errors5.incremental_end_time && (
                <div className="error">{errors5.incremental_end_time}</div>
              )}
            </Col>
            <Col md={4}>
              <Form.Label for="default_start_date">
                Default Start Date
              </Form.Label>
              <Form.Control
                // type="text"
                isInvalid={errors5.default_start_date}
                placeholder=""
                type="datetime-local"
                step="0.001"
                className="custom-select custom-style"
                disabled={
                  !isIncrementalSelected ||
                  formData.DefineSourceExtractCriteria.incremental_by !== "Date"
                }
                name="default_start_date"
                id="default_start_date"
                onChange={changeHandler}
                value={formData.DefineSourceExtractCriteria.default_start_date}
              />
              {errors5.default_start_date && (
                <div className="error">{errors5.default_start_date}</div>
              )}
            </Col>
          </Row>
          <Row className="mb-4">
            <Col>
              <Form.Label for="incremental_start_sequence">
                {" "}
                Start Seq
              </Form.Label>
              <Form.Control
                type="text"
                isInvalid={errors5.incremental_start_sequence}
                step="0.001"
                placeholder=""
                className="custom-select custom-style"
                name="incremental_start_sequence"
                id="incremental_start_sequence"
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
              {errors5.incremental_start_sequence && (
                <div className="error">
                  {errors5.incremental_start_sequence}
                </div>
              )}
            </Col>
            <Col>
              <Form.Label for="incremental_end_sequence">End Seq</Form.Label>
              <Form.Control
                type="text"
                isInvalid={errors5.incremental_end_sequence}
                placeholder=""
                className="custom-select custom-style"
                disabled={
                  !isIncrementalSelected ||
                  formData.DefineSourceExtractCriteria.incremental_by !==
                    "Sequence"
                }
                name="incremental_end_sequence"
                id="incremental_end_sequence"
                onChange={changeHandler}
                value={
                  formData.DefineSourceExtractCriteria.incremental_end_sequence
                }
              />
              {errors5.incremental_end_sequence && (
                <div className="error">{errors5.incremental_end_sequence}</div>
              )}
            </Col>
            <Col>
              <Form.Label for="default_start_seq">Default Start Seq</Form.Label>
              <Form.Control
                type="text"
                isInvalid={errors5.default_start_seq}
                placeholder=""
                className="custom-select custom-style"
                disabled={
                  !isIncrementalSelected ||
                  formData.DefineSourceExtractCriteria.incremental_by !==
                    "Sequence"
                }
                name="default_start_seq"
                id="default_start_seq"
                onChange={changeHandler}
                value={formData.DefineSourceExtractCriteria.default_start_seq}
              />
              {errors5.default_start_seq && (
                <div className="error">{errors5.default_start_seq}</div>
              )}
            </Col>
          </Row>
          <Row className="mb-3">
            <Form.Label>
              Filter to be applied
              <SuggestionPopUpBox
                title={`Apply the additional filter for the ingestion in Source SQL languange without the "WHERE" clause and thesemicolon.
                  E.g. Provide only "id < 5" in the filter for the query "SELECT * FROM table WHERE id < 5;"`}
              >
                <AiOutlineExclamationCircle className="suggetionPopupIconstyle" />
              </SuggestionPopUpBox>
            </Form.Label>
            <Col>
              <AceEditor
                mode="sql"
                theme="xcode"
                editorProps={{ $blockScrolling: true }}
                style={{ width: "100%", height: "50px" }}
                value={formData.DefineSourceExtractCriteria.filter}
                onChange={filterHandler}
              />
              {/* <Form.Control
                type="text"
                placeholder=""
                className="custom-select custom-style"
                // disabled={isIncrementalSelected}
                name="filter"
                onChange={changeHandler}
                value={formData.DefineSourceExtractCriteria.filter}
              /> */}
            </Col>
          </Row>
          <Row className="mb-3">
            <Form.Label>Order by</Form.Label>
            <Col>
              <Select
                isMulti
                options={orderByOptions}
                value={orderByOptions.filter((option) =>
                  formData.DefineSourceExtractCriteria.order_by.includes(
                    option.label
                  )
                )}
                onChange={orderByChangeHandler}
                className="custom-select custom-style"
              />
            </Col>
          </Row>
        </Form>
      </div>
    </Card.Body>
  );
};

export default DefineSourceExtractCriteria;

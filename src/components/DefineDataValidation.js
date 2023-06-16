import React, { useEffect, useState } from "react";
import {
  Table,
  Form,
  Input,
  InputGroup,
  Col,
  Row,
  Badge,
  FormControl,
} from "react-bootstrap";

import { Select, Form as AntdForm, Input as AntdInput, Tag } from "antd";

const headers = [
  "Column Name",
  // "Source Data Type",
  "Target Data Type",
  "Validation Rule",
  "Validation Input",
  "Quality Score",
];

export const DefineDataValidation = ({ formData, updateFormData }) => {
  const [testcases, setTestcases] = useState([]);
  const [selectedTestcases, setSelectedTestcases] = useState([]);
  const [selectedTags, setselectedTags] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [tableData, setTableData] = useState([...formData.tableData]);

  useEffect(() => {
    fetchTestcases();
  }, []);

  const fetchTestcases = async () => {
    try {
      const response = await fetch(
        "http://ec2-54-197-121-247.compute-1.amazonaws.com:8000/testcasemaster/"
      ); // Replace with your API endpoint
      const data = await response.json();
      setTestcases(data);
      setSelectedTestcases(Array(formData.tableData.length).fill(""));
    } catch (error) {
      console.log("Error fetching test cases:", error);
    }
  };
  console.log("input_values", selectedTestcases);

  const targetDataTypes = [
    "ARRAY",
    "BIGINT",
    "BINARY",
    "BOOLEAN",
    "CHAR",
    "DECIMAL",
    "DOUBLE",
    "DOUBLE PRECISION",
    "INT",
    "INTEGER",
    "NCHAR",
    "NUMERIC",
    "NVARCHAR",
    "NUMBER",
    "STRING",
    "TEXT",
    "TIME",
    "TIMASTAMP_TZ",
    "TIMESTAMP_LTZ",
    "TIMESTAMP_NTZ",
    "VARBINARY",
    "VARCHAR",
  ];

  const handleTestcaseChange = (e, index) => {
    const updatedTestcases = [...selectedTestcases];
    updatedTestcases[index] = e.target.value;
    setSelectedTestcases(updatedTestcases);
  };

  // const handleTestcaseChange = (option, index) => {
  //   setSelectedTestcases((prevSelectedTestcases) => {
  //     const updatedSelectedTestcases = [...prevSelectedTestcases];
  //     updatedSelectedTestcases[index] = option;
  //     return updatedSelectedTestcases;
  //   });
  // };


  const validationRuleHandler = (option, index) => {
    setSelectedTestcases((prevSelectedTestcases) => {
      const updatedSelectedTestcases = [...prevSelectedTestcases];
      updatedSelectedTestcases[index] = option;
      return updatedSelectedTestcases;
    });
    const updatedTableData = [...tableData];
    updatedTableData[index].validation_rule = option.value;
    setTableData(updatedTableData);

    const updatedFormData = {
      ...formData,
      tableData: updatedTableData,
    };
    updateFormData(updatedFormData);
  };

  const validationInputHandler = (target, index) => {
    const updatedTableData = [...tableData];
    updatedTableData[index].validation_input = target.value;
    setTableData(updatedTableData);

    const updatedFormData = {
      ...formData,
      tableData: updatedTableData,
    };
    updateFormData(updatedFormData);

  const handleTagsChange = (e, index, maxValue) => {
    const tempSelectedTags = JSON.parse(JSON.stringify(selectedTags));
    tempSelectedTags[index] = e;
    debugger;
    if (tempSelectedTags[index].length <= maxValue) {
      setselectedTags(tempSelectedTags);
    } else {
      setselectedTags(selectedTags);
    }

  };

  const validateTagCount = (_, value) => {
    console.log("value", value);
    const desiredCount = 3; // Specify the desired tag count here
    const tagCount = value ? value.length : 0;
    if (tagCount > desiredCount) {
      return Promise.reject(`Please select fewer than ${desiredCount} values`);
    } else {
      return Promise.resolve();
    }
  };

  const qualityScoreHandler = (value, index) => {
    const updatedTableData = [...tableData];
    updatedTableData[index].quality_score = value;
    setTableData(updatedTableData);
  };

  console.log(formData.tableData);

  return (
    <Table responsive>
      <thead>
        <tr>
          {headers.map((name, index) => (
            <th key={index}>{name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {formData.tableData.map((column, index) => {
          let selectedValue = testcases?.[selectedTestcases[index]]
            ? testcases?.[selectedTestcases[index]]
            : 0;
          if (selectedValue && selectedValue.template) {
            selectedValue =
              Number(
                selectedValue?.template
                  ?.replaceAll("}", "")
                  ?.replaceAll("{", "")
                  ?.replaceAll(" ", "")
                  ?.split(",")
                  ?.pop()
                  ?.split(":")
                  ?.pop()
              ) || 0;
          }
          return (
            <tr key={index}>
              <td>{column.column_name}</td>
              {/* <td>{column.data_type}</td> */}
              <td>{column.target_datatype}</td>
              <td>
                <Form.Control
                  as="select"
                  value={selectedTestcases[index]}
                  onChange={(e) => handleTestcaseChange(e, index)}
                  placeholder="Enter expectation"
                >
                  <option value="">Select Test Case</option>
                  {testcases.map((testcase, subIndex) => (
                    <option key={testcase.testcase_master_id} value={subIndex}>
                      {testcase.testcase_name_alias}
                    </option>
                  ))}
                </Form.Control>
              </td>
              {/* <AntdForm.Item name={`expectationInput-${index}`}> */}
              <Select
                value={selectedTestcases[index]}
                onChange={(option) => validationRuleHandler(option, index)}
                options={testcases.map((testcase) => ({
                  value: testcase.testcase_name,
                  label: testcase.testcase_name_alias,
                }))}
                placeholder="Select Test Case"
                isSearchable
              />
            </td>
            <td>
              <AntdForm.Item
                name={`expectationInput-${index}`}
                rules={[
                  {
                    validator: validateTagCount,
                  },
                ]}
                onChange={(e) => validationInputHandler(e.target, index)}
              >
                <AntdSelect mode="tags" placeholder="Expectation Input" />
              </AntdForm.Item>
            </td>
            <td>
              <Form.Control
                type="text"
                onChange={(e) => qualityScoreHandler(e.target.value, index)}
              />
              {/* </AntdForm.Item> */}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

import React, { useEffect, useState } from "react";
import { Table, Form, Input, Col, Row } from "react-bootstrap";

const headers = [
  "Column Name",
  "Source Data Type",
  "Target Data Type",
  "Validation Rule",
  "Validation Input",
];

export const DefineDataValidation = ({ formData }) => {
  const [testcases, setTestcases] = useState([]);
  const [selectedTestcases, setSelectedTestcases] = useState([]);

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

  const renderValidationInput = (index) => {
    const selectedTestCase = selectedTestcases[index];
    const matchingTestCase = testcases.find(
      (testCase) => testCase.testcase_name === selectedTestCase
    );

    if (matchingTestCase) {
      const { template, testcase_name_alias } = matchingTestCase;

      if (template) {
        try {
          const { input_values } = JSON.parse(template);

          if (input_values === 0) {
            return null;
          }

          return (
            <Form.Control
              type="text"
              placeholder={`Enter ${testcase_name_alias} input`}
              maxLength={input_values}
            />
          );
        } catch (error) {
          console.log("Error parsing JSON:", error);
        }
      }
    }

    return <Form.Control type="text" placeholder="Enter validation input" />;
  };

  console.log(formData);

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
        {formData.tableData.map((column, index) => (
          <tr key={index}>
            <td>{column.column_name}</td>
            <td>{column.data_type}</td>
            <td>
              <Form.Select aria-label="Default select example">
                <option value="">Select Target Data Type</option>
                {targetDataTypes.map((dataType, index) => (
                  <option key={index} value={dataType}>
                    {dataType}
                  </option>
                ))}
              </Form.Select>
            </td>
            <td>
              <Form.Control
                as="select"
                value={selectedTestcases[index]}
                onChange={(e) => handleTestcaseChange(e, index)}
                placeholder="Enter expectation"
              >
                <option value="">Select Test Case</option>
                {testcases.map((testcase) => (
                  <option
                    key={testcase.testcase_master_id}
                    value={testcase.testcase_name}
                  >
                    {testcase.testcase_name_alias}
                  </option>
                ))}
              </Form.Control>
            </td>
            <td>{renderValidationInput(index)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

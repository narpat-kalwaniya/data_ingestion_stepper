import React, { useEffect, useState, useContext } from "react";
import { Table, Form } from "react-bootstrap";
import { DataContext } from "./DataContext";

const headers = [
  "",
  "Column Name",
  "Source Data Type",
  "Target Data Type",
  "Primary Key",
  "Business Key",
  "Transformation Logic",
];

const TbData = ({ formData, updateFormData }) => {
  const [tableData, setTableData] = useState([...formData.tableData]);
  // const [pageData, setPageData] = useState([...tableData]);

  console.log(tableData);
  // console.log(pageData);

  const handleCheck = () => {
    // Handle checkbox click event if needed
  };

  const handleTargetDataTypeChange = (event, columnIndex) => {
    const updatedTableData = [...tableData];
    updatedTableData[columnIndex].target_datatype = event.target.value;
    setTableData(updatedTableData);

    const updatedFormData = {
      ...formData,
      tableData: updatedTableData,
    };
    updateFormData(updatedFormData);
    // console.log(tableData);
    console.log(formData);
    // setPageData([
    //   ...pageData,
    //   { ...pageData[columnIndex], ["target_datatype"]: event.target.value },
    // ]);
  };

  const primaryKeyHandler = (checked, index) => {
    const updatedTableData = [...tableData];
    updatedTableData[index].is_target_primary_key = checked;
    setTableData(updatedTableData);

    const updatedFormData = {
      ...formData,
      tableData: updatedTableData,
    };
    updateFormData(updatedFormData);
  };

  const businessKeyHandler = (checked, index) => {
    const updatedTableData = [...tableData];
    updatedTableData[index].is_business_key = checked;
    setTableData(updatedTableData);

    const updatedFormData = {
      ...formData,
      tableData: updatedTableData,
    };
    updateFormData(updatedFormData);
  };

  const transformLogicHandler = (value, index) => {
    const updatedTableData = [...tableData];
    updatedTableData[index].transformation_logic = value;
    setTableData(updatedTableData);

    const updatedFormData = {
      ...formData,
      tableData: updatedTableData,
    };
    updateFormData(updatedFormData);
  };

  console.log("form data", formData);

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

  const { ingestionData } = useContext(DataContext);
  console.log("target ingestion", ingestionData);
  return (
    <tbody>
      {tableData.map((column, index) => (
        <tr key={index}>
          <td>
            <Form.Check onClick={handleCheck} />
          </td>
          <td>{column.column_name}</td>
          <td>{column.data_type}</td>
          <td>
            <Form.Select
              aria-label="Default select example"
              onChange={(event) => handleTargetDataTypeChange(event, index)}
              value={formData.tableData[index].target_datatype}
            >
              <option value="">Select Target Data Type</option>
              {targetDataTypes.map((dataType, index) => (
                <option key={index} value={dataType}>
                  {dataType}
                </option>
              ))}
            </Form.Select>
          </td>
          <td>
            <Form.Check
              type="checkbox"
              onChange={(e) => primaryKeyHandler(e.target.checked, index)}
              checked={formData.tableData[index].is_target_primary_key === true}
            />
          </td>
          <td>
            <Form.Check
              type="checkbox"
              onChange={(e) => businessKeyHandler(e.target.checked, index)}
              checked={formData.tableData[index].is_business_key === true}
            />
          </td>
          <td>
            <Form.Control
              type="text"
              onChange={(e) => transformLogicHandler(e.target.value, index)}
              value={formData.tableData[index].transformation_logic}
            />
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export const TargetSchema = ({ formData, updateFormData }) => {
  return (
    <Table responsive>
      <thead>
        <tr>
          {headers.map((name, index) => (
            <th key={index}>{name}</th>
          ))}
        </tr>
      </thead>
      <TbData formData={formData} updateFormData={updateFormData} />
    </Table>
  );
};

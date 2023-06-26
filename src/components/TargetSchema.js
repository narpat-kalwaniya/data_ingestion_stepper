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
  const { ingestionData, updateIngestionData } = useContext(DataContext);
  const [showInputBoxes, setShowInputBoxes] = useState(false);
  const [newRowIndex, setNewRowIndex] = useState(null);
  console.log("fd", formData);
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
    // console.log(formData);
    // setPageData([
    //   ...pageData,
    //   { ...pageData[columnIndex], ["target_datatype"]: event.target.value },
    // ]);

    const updatedData = {
      attributes: [
        updatedTableData, // Add new attribute object
      ],
    };
    updateIngestionData(updatedData);
  };
  // console.log(pageData);

  const primaryKeyHandler = (checked, index) => {
    const updatedTableData = [...tableData];
    updatedTableData[index].is_target_primary_key = checked;
    setTableData(updatedTableData);

    const updatedFormData = {
      ...formData,
      tableData: updatedTableData,
    };
    updateFormData(updatedFormData);
    // console.log(pageData);

    const updatedData = {
      attributes: [
        updatedTableData, // Add new attribute object
      ],
    };
    updateIngestionData(updatedData);
  };
  // console.log(formData);
  const businessKeyHandler = (checked, index) => {
    const updatedTableData = [...tableData];
    updatedTableData[index].is_business_key = checked;
    setTableData(updatedTableData);

    const updatedFormData = {
      ...formData,
      tableData: updatedTableData,
    };
    updateFormData(updatedFormData);
    // console.log(pageData);

    const updatedData = {
      attributes: [
        updatedTableData, // Add new attribute object
      ],
    };
    updateIngestionData(updatedData);
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
    // console.log(pageData);

    const updatedData = {
      attributes: [
        updatedTableData, // Add new attribute object
      ],
    };
    updateIngestionData(updatedData);
  };

  const addRow = () => {
    const newRow = {
      column_name: "",
      data_type: "",
      target_datatype: "",
      is_target_primary_key: false,
      is_business_key: false,
      transformation_logic: "",
    };

    const updatedTableData = [newRow, ...tableData];
    setTableData(updatedTableData);
    setNewRowIndex(0);
    setShowInputBoxes(true);

    const updatedFormData = {
      ...formData,
      tableData: updatedTableData,
    };
    updateFormData(updatedFormData);
  };

  const deleteRow = (index) => {
    const updatedTableData = [...tableData];
    updatedTableData.splice(index, 1); // Remove the row at the specified index
    setTableData(updatedTableData);
    setNewRowIndex(null); // Reset the new row index

    const updatedFormData = {
      ...formData,
      tableData: updatedTableData,
    };
    updateFormData(updatedFormData);
  };

  const handleColumnNameChange = (event, index) => {
    const updatedTableData = [...tableData];
    updatedTableData[index].column_name = event.target.value;
    setTableData(updatedTableData);

    const updatedFormData = {
      ...formData,
      tableData: updatedTableData,
    };
    updateFormData(updatedFormData);
  };

  const handleDataTypeChange = (event, index) => {
    const updatedTableData = [...tableData];
    updatedTableData[index].data_type = event.target.value;
    setTableData(updatedTableData);

    const updatedFormData = {
      ...formData,
      tableData: updatedTableData,
    };
    updateFormData(updatedFormData);
  };

  console.log("target ingestion", ingestionData);

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

  console.log("table data", tableData);
  return (
    <tbody style={{ fontSize: "12px" }}>
      <tr>
        <td colSpan="7" style={{ textAlign: "right" }}>
          <button onClick={addRow}>Add Row</button>
        </td>
      </tr>
      {formData.tableData.map((column, index) => (
        <tr
          key={index}
          style={{
            height: "20px",
          }}
        >
          <td>
            <Form.Check onClick={handleCheck} />
          </td>
          <td>
            {index === newRowIndex && showInputBoxes ? (
              <Form.Control
                type="text"
                value={column.column_name}
                onChange={(event) => handleColumnNameChange(event, index)}
                className="custom-select custom-style"
              />
            ) : (
              column.column_name
            )}
          </td>
          <td>
            {index === newRowIndex && showInputBoxes ? (
              <Form.Control
                type="text"
                value={column.data_type}
                onChange={(event) => handleDataTypeChange(event, index)}
                className="custom-select custom-style"
              />
            ) : (
              column.data_type
            )}
          </td>
          <td style={{ width: "150px" }}>
            <Form.Select
              aria-label="Default select example"
              onChange={(event) => handleTargetDataTypeChange(event, index)}
              value={formData.tableData[index].target_datatype}
              className="custom-select custom-style"
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
              checked={column.is_target_primary_key}
              onChange={(e) => {
                primaryKeyHandler(e.target.checked, index);
              }}
            />
          </td>
          <td>
            <Form.Check
              type="checkbox"
              checked={column.is_business_key}
              onChange={(e) => businessKeyHandler(e.target.checked, index)}
            />
          </td>
          <td style={{ width: "150px" }}>
            <Form.Control
              type="text"
              value={column.transformation_logic}
              onChange={(e) => transformLogicHandler(e.target.value, index)}
              className="custom-select custom-style"
            />
          </td>
          <td>
            {index === newRowIndex && showInputBoxes ? (
              <button onClick={() => deleteRow(index)}>X</button>
            ) : null}
          </td>
        </tr>
      ))}
      {/* <tr>
        <td colSpan="7" style={{ textAlign: "right" }}>
          <button onClick={addRow}>Add Row</button>
        </td>
      </tr> */}
    </tbody>
  );
};

export const TargetSchema = ({ formData, updateFormData }) => {
  return (
    <Table hover responsive>
      <thead
        style={{
          backgroundColor: "#F3F3F3",
          fontSize: "12px",
          height: "50px",
          alignItems: "center",
        }}
      >
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

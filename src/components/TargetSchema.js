import React, { useEffect, useState, useContext } from "react";
import { Table, Form } from "react-bootstrap";
import { DataContext } from "./DataContext";
import AceEditor from "react-ace";

// Import the SQL mode for Ace Editor (for SQL syntax highlighting)
import "ace-builds/src-noconflict/mode-sql";

// Import the GitHub theme for Ace Editor (or any other theme you prefer)
import "ace-builds/src-noconflict/theme-github";

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
  const { ingestionData, updateIngestionData } = useContext(DataContext);
  // const [tableData, setTableData] = useState([...formData.tableData]);
  const [showInputBoxes, setShowInputBoxes] = useState(false);
  const [newRowIndex, setNewRowIndex] = useState(null);
  console.log("fd", formData);
  // console.log(pageData);

  const handleCheck = (checked, index) => {
    const updatedTableData = [...formData.tableData];

    // if (checked) {
    //   // Add or update the is_target_primary_key property
    //   updatedTableData[index].selected = true;
    // } else {
    //   // Remove the column from tableData
    //   updatedTableData.splice(index, 1);
    // }
    updatedTableData[index].selected = checked;

    const updatedFormData = {
      ...formData,
      tableData: updatedTableData,
    };
    updateFormData(updatedFormData);
  };

  const handleTargetDataTypeChange = (event, columnIndex) => {
    const updatedTableData = [...formData.tableData];
    updatedTableData[columnIndex].target_datatype = event.target.value;
    // setTableData(updatedTableData);

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
    const updatedTableData = [...formData.tableData];
    updatedTableData[index].is_target_primary_key = checked;
    // setTableData(updatedTableData);

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
    const updatedTableData = [...formData.tableData];
    updatedTableData[index].is_business_key = checked;
    // setTableData(updatedTableData);

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

  const transformLogicHandler = (index, value) => {
    const updatedTableData = [...formData.tableData];
    updatedTableData[index].transformation_logic = value;
    // setTableData(updatedTableData);

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

  // const handleQueryChange = (id, value) => {
  //   console.log("logic", value);
  //   // const updatedTableData = tableData.map((row) =>
  //   //   row.id === id ? { ...row, query: value } : row
  //   // );
  // };

  const addRow = () => {
    const newRow = {
      column_name: "",
      data_type: "",
      target_datatype: "",
      is_target_primary_key: false,
      is_business_key: false,
      transformation_logic: "",
      validation_rules: [],
      validation_input: [],
      quality_score: null,
    };

    const updatedTableData = [newRow, ...formData.tableData];
    // setTableData(updatedTableData);
    setNewRowIndex(0);
    setShowInputBoxes(true);

    const updatedFormData = {
      ...formData,
      tableData: updatedTableData,
    };
    updateFormData(updatedFormData);
  };

  const deleteRow = (index) => {
    const updatedTableData = [...formData.tableData];
    updatedTableData.splice(index, 1); // Remove the row at the specified index
    // setTableData(updatedTableData);
    setNewRowIndex(null); // Reset the new row index

    const updatedFormData = {
      ...formData,
      tableData: updatedTableData,
    };
    updateFormData(updatedFormData);
  };

  const handleColumnNameChange = (event, index) => {
    const updatedTableData = [...formData.tableData];
    updatedTableData[index].column_name = event.target.value;
    // setTableData(updatedTableData);

    const updatedFormData = {
      ...formData,
      tableData: updatedTableData,
    };
    updateFormData(updatedFormData);
  };

  const handleDataTypeChange = (event, index) => {
    const updatedTableData = [...formData.tableData];
    updatedTableData[index].data_type = event.target.value;
    // setTableData(updatedTableData);

    const updatedFormData = {
      ...formData,
      tableData: updatedTableData,
    };
    updateFormData(updatedFormData);
  };

  console.log("target ingestion", ingestionData[0].attributes);

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

  console.log("table data", formData.tableData);
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
            <Form.Check
              type="checkbox"
              checked={column.selected}
              onChange={(e) => {
                handleCheck(e.target.checked, index);
              }}
            />
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
            <AceEditor
              mode="sql" // Set the syntax highlighting mode to SQL
              theme="tomorrow" // Set the editor theme (e.g., 'github', 'monokai', 'dracula', etc.)
              // name={`query-${row.id}`}
              value={column.transformation_logic}
              onChange={(value) => transformLogicHandler(index, value)}
              width="100%"
              height="50px"
              // showPrintMargin={false}
              // showGutter={true}
              // highlightActiveLine={true}
              editorProps={{ $blockScrolling: true }}
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

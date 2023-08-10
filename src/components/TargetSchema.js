import React, { useEffect, useState, useContext } from "react";
import { Table, Form, ProgressBar } from "react-bootstrap";
import { DataContext } from "./DataContext";
import AceEditor from "react-ace";
import { Add } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/main.css";
//

// Import the SQL mode for Ace Editor (for SQL syntax highlighting)
import "ace-builds/src-noconflict/mode-sql";

// Import the GitHub theme for Ace Editor (or any other theme you prefer)
import "ace-builds/src-noconflict/theme-github";

const headers = [
  "Column Name",
  "Source Data Type",
  "Target Data Type",
  "Primary Key",
  "Business Key",
  "Transformation Logic",
];

const TbData = ({ formData, updateFormData, setIsDraftSaved }) => {
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
    // updateIngestionData(updatedData);
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
    // updateIngestionData(updatedData);
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
    // updateIngestionData(updatedData);
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
    // updateIngestionData(updatedData);
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
      data_type: "NA",
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
    setIsDraftSaved(false);
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
      <td colSpan="7" style={{ textAlign: "right" }}>
        <span
          onClick={addRow}
          style={{ cursor: "pointer", paddingTop: "10px", color: "#18749C" }}
        >
          + Add Column
        </span>
      </td>

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
            {index === newRowIndex && showInputBoxes
              ? // <Form.Control
                //   type="text"
                //   value={column.data_type}
                //   onChange={(event) => handleDataTypeChange(event, index)}
                //   className="custom-select custom-style"
                // />
                column.data_type
              : column.data_type}
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
              theme="xcode" // Set the editor theme (e.g., 'github', 'monokai', 'dracula', etc.)
              // name={`query-${row.id}`}
              value={column.transformation_logic}
              onChange={(value) => transformLogicHandler(index, value)}
              width="100%"
              height="50px"
              showPrintMargin={false}
              showGutter={false}
              cursorStart={5}
              // highlightActiveLine={true}
              editorProps={{ $blockScrolling: true }}
            />
          </td>
          <td>
            {index === newRowIndex && showInputBoxes ? (
              <button className="delete-btn" onClick={() => deleteRow(index)}>
                <i className="bi bi-x-lg text-danger"></i>{" "}
                {/* bi-x-lg is the class for the larger "x" icon */}
              </button>
            ) : // <span

            //   style={{
            //     position: "sticky",
            //     cursor: "pointer",
            //     border: "1px",
            //     borderColor: "red",
            //     color: "red",
            //     padding: "5px",
            //     borderRadius: "50%",
            //     width: "10px",
            //   }}
            // >
            //   X
            // </span>
            null}
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

export const TargetSchema = ({
  formData,
  updateFormData,
  setIsDraftSaved,
  isTableLoad,
  setIsTableLoad,
  isUpdate,
  setIsUpdate,
}) => {
  console.log("tableLoad", isTableLoad);
  console.log("isUpdate", isUpdate);
  const [isSelectedAll, setIsSelectedAll] = useState(true);

  const areAllSelected = formData.tableData.every(
    (obj) => obj["selected"] === true
  );

  console.log("areAllSelected", areAllSelected);

  const selectAllHandler = () => {
    setIsSelectedAll(!isSelectedAll);
    formData.tableData.forEach((obj) =>
      Object.assign(obj, { selected: isSelectedAll })
    );
  };
  return (
    <div>
      {isTableLoad && !isUpdate && (
        <div
          style={{
            display: "flex",
            position: "relative",
            alignItems: "center",
            width: "200px",
            margin: "auto",
          }}
        >
          <ProgressBar
            animated
            now={100}
            label="Loading..."
            style={{
              top: "200px",
              display: "flex",
              position: "relative",
              alignItems: "center",
              width: "200px",
              margin: "auto",
            }}
          />
        </div>
      )}
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
            <td style={{ textAlign: "left" }}>
              <Form.Check
                type="checkbox"
                checked={areAllSelected}
                onChange={(e) => {
                  selectAllHandler(e.target.checked);
                }}
              />
            </td>
            {headers.map((name, index) => (
              <th key={index}>{name}</th>
            ))}
          </tr>
        </thead>
        <TbData
          formData={formData}
          updateFormData={updateFormData}
          setIsDraftSaved={setIsDraftSaved}
        />
      </Table>
    </div>
  );
};

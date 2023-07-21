import React, { useEffect, useState, useContext } from "react";
import { Table, Form, Dropdown } from "react-bootstrap";
import { DataContext } from "./DataContext";
import "./TargetSchemaMig.css";

const headers = [
  "Column Name",
  "Source Data Type",
  "Target Data Type",
  "Primary Key",
  "Business Key",
  "Transformation Logic",
];

const TbData = ({
  formData,
  updateFormData,
  handlePageChange,
  currentData,
  uniqueTables,
  currentTable,
}) => {
  const { ingestionData, updateIngestionData } = useContext(DataContext);

  const handleTargetDataTypeChange = (event, id) => {
    // const updatedTableData = [...formData.tableData];
    // updatedTableData[columnIndex].target_datatype = event.target.value;
    // const newUpdatedData = updatedTableData.map((item) => {
    //   if (item.id === id) {
    //     return {
    //       ...item,
    //       target_datatype: event.target.value,
    //     };
    //   }
    //   return item;
    // });

    const updatedTableData = formData.tableData.map((item) =>
      item.id === id ? { ...item, target_datatype: event.target.value } : item
    );

    const updatedFormData = {
      ...formData,
      tableData: updatedTableData,
    };

    updateFormData(updatedFormData);

    const updatedData = {
      attributes: [
        updatedTableData, // Add new attribute object
      ],
    };

    updateIngestionData(updatedData);
  };

  const primaryKeyHandler = (checked, id) => {
    // const updatedTableData = [...formData.tableData];
    // updatedTableData[index].is_target_primary_key = checked;
    const updatedTableData = formData.tableData.map((item) =>
      item.id === id ? { ...item, is_target_primary_key: checked } : item
    );

    const updatedFormData = {
      ...formData,
      tableData: updatedTableData,
    };
    updateFormData(updatedFormData);

    const updatedData = {
      attributes: [
        updatedTableData, // Add new attribute object
      ],
    };
    updateIngestionData(updatedData);
  };

  const businessKeyHandler = (checked, id) => {
    // const updatedTableData = [...formData.tableData];
    // updatedTableData[index].is_business_key = checked;
    const updatedTableData = formData.tableData.map((item) =>
      item.id === id ? { ...item, is_business_key: checked } : item
    );

    const updatedFormData = {
      ...formData,
      tableData: updatedTableData,
    };
    updateFormData(updatedFormData);

    const updatedData = {
      attributes: [
        updatedTableData, // Add new attribute object
      ],
    };
    updateIngestionData(updatedData);
  };

  const transformLogicHandler = (value, id) => {
    // const updatedTableData = [...formData.tableData];
    // updatedTableData[index].transformation_logic = value;
    const updatedTableData = formData.tableData.map((item) =>
      item.id === id ? { ...item, transformation_logic: value } : item
    );

    const updatedFormData = {
      ...formData,
      tableData: updatedTableData,
    };
    updateFormData(updatedFormData);

    const updatedData = {
      attributes: [
        updatedTableData, // Add new attribute object
      ],
    };
    updateIngestionData(updatedData);
  };

  const handleColumnNameChange = (event, id) => {
    // const updatedTableData = [...formData.tableData];
    // updatedTableData[index].column_name = event.target.value;
    const updatedTableData = formData.tableData.map((item) =>
      item.id === id ? { ...item, column_name: event.target.value } : item
    );

    const updatedFormData = {
      ...formData,
      tableData: updatedTableData,
    };
    updateFormData(updatedFormData);
  };

  const handleDataTypeChange = (event, id) => {
    // const updatedTableData = [...formData.tableData];
    // updatedTableData[index].data_type = event.target.value;

    const updatedTableData = formData.tableData.map((item) =>
      item.id === id ? { ...item, data_type: event.target.value } : item
    );

    const updatedFormData = {
      ...formData,
      tableData: updatedTableData,
    };
    updateFormData(updatedFormData);
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

  console.log("current data", currentData);

  return (
    <>
      {currentData.map((column) => (
        <tr key={column.id} style={{ height: "20px" }}>
          <td>
            <Form.Control
              type="text"
              value={column.column_name}
              onChange={(event) => handleColumnNameChange(event, column.id)}
              className="custom-select custom-style"
            />
          </td>
          <td>
            <Form.Control
              type="text"
              value={column.data_type}
              onChange={(event) => handleDataTypeChange(event, column.id)}
              className="custom-select custom-style"
            />
          </td>
          <td style={{ width: "150px" }}>
            <Form.Select
              aria-label="Default select example"
              onChange={(event) => handleTargetDataTypeChange(event, column.id)}
              value={column.target_datatype}
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
                primaryKeyHandler(e.target.checked, column.id);
              }}
            />
          </td>
          <td>
            <Form.Check
              type="checkbox"
              checked={column.is_business_key}
              onChange={(e) => businessKeyHandler(e.target.checked, column.id)}
            />
          </td>
          <td style={{ width: "150px" }}>
            <Form.Control
              type="text"
              value={column.transformation_logic}
              onChange={(e) => transformLogicHandler(e.target.value, column.id)}
              className="custom-select custom-style"
            />
          </td>
        </tr>
      ))}
      <td colSpan="6" style={{ textAlign: "right" }}>
        <div className="dropdown-container">
          <Dropdown onSelect={handlePageChange}>
            <Dropdown.Toggle variant="secondary" id="dropdown-pagination">
              {currentTable}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {uniqueTables.map((category, index) => (
                <Dropdown.Item key={index} eventKey={index + 1}>
                  {category}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </td>
    </>
  );
};

export const TargetSchemaMig = ({ formData, updateFormData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTable, setSelectedTable] = useState("");

  const uniqueTables = Array.from(
    new Set(formData.tableData.map((item) => item.table_name))
  );

  const totalPages = uniqueTables.length;

  const currentTable = uniqueTables[currentPage - 1];
  const currentData = formData.tableData.filter(
    (item) => item.table_name === currentTable
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setSelectedTable(uniqueTables[pageNumber - 1]);
  };
  return (
    <>
      <div>
        {currentData[0]?.source_entity_name !== undefined ? (
          <div className="heading-container">
            <div
              style={{ textAlign: "left" }}
            >{`${currentData[0]?.source_entity_name}`}</div>
            <div
              style={{ textAlign: "right" }}
            >{`${currentData[0]?.target_entity_name} `}</div>
          </div>
        ) : (
          // <span
          //   style={{ whiteSpace: "nowrap", display: "inline-block" }}
          // >{`${currentData[0]?.source_entity_name} >>${currentData[0]?.target_entity_name} `}</span>
          <span>loading...</span>
        )}
      </div>
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
        <tbody style={{ fontSize: "12px" }}>
          <TbData
            formData={formData}
            updateFormData={updateFormData}
            currentData={currentData}
            handlePageChange={handlePageChange}
            currentTable={currentTable}
            uniqueTables={uniqueTables}
          />
        </tbody>
      </Table>
    </>
  );
};

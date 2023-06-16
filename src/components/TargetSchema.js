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
  const [tableData, setTableData] = useState([]);

  // console.log(tableData);
  // console.log(pageData);

  useEffect(() => {
    const requestData = {
      data_source_type: formData.sourceEntity.data_source_type,
      query: formData.sourceEntity.query,
      db_name: formData.sourceEntity.db_name,
      schema_name: formData.sourceEntity.schema_name,
      table_name: formData.sourceEntity.table_name,
      bucket_name: formData.sourceEntity.bucket_name,
      full_file_name: formData.sourceEntity.full_file_name,
      source_entity_name: `${formData.sourceEntity.db_name}.${formData.sourceEntity.schema_name}.${formData.sourceEntity.table_name}`,
      connection_id: formData.sourceEntity.connection_id,
    };

    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://ec2-54-197-121-247.compute-1.amazonaws.com:8000/getcolumns/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          if (Array.isArray(responseData)) {
            // console.log("response data", requestData);
            responseData.forEach((object) => {
              object.is_business_key = false;
              object.is_target_primary_key = false;
              object.transformation_logic = "";
              object.is_masking = false;
              object.masking_logic = "";
              object.validation_rule = "";
              object.validation_input = "";
              object.quality_score = "";
            });
            setTableData(responseData);
          }
        } else {
          console.error("Error:", response.status);
        }
      } catch (error) {
        console.error("Error:", error);
      }

      // const updatedFormData = {
      //   ...formData,
      //   tableData: tableData,
      // };
      // updateFormData(updatedFormData);
    };

    fetchData();
  }, []);

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
  };
  // console.log("form data", formData);

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
  console.log("table data", tableData);
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
              // value={formData.tableData[index].target_datatype}
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
              // checked={column.is_select_distinct}
              onChange={(e) => {
                primaryKeyHandler(e.target.checked, index);
              }}
            />
          </td>
          <td>
            <Form.Check
              type="checkbox"
              onChange={(e) => businessKeyHandler(e.target.checked, index)}
            />
          </td>
          <td>
            <Form.Control
              type="text"
              onChange={(e) => transformLogicHandler(e.target.value, index)}
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

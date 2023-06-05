import React, { useEffect, useState } from "react";
import { Table, Form } from "react-bootstrap";

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
            console.log("response data", requestData);
            setTableData(responseData);
          }
        } else {
          console.error("Error:", response.status);
        }
      } catch (error) {
        console.error("Error:", error);
      }

      const updatedFormData = {
        ...formData,
        TargetSchema: tableData,
      };
      updateFormData(updatedFormData);
    };

    fetchData();
  }, [updateFormData]);

  const handleCheck = () => {
    // Handle checkbox click event if needed
  };

  const handleTargetDataTypeChange = (event, columnIndex) => {
    const updatedTableData = [...tableData];
    updatedTableData[columnIndex].target_datatype = event.target.value;
    setTableData(updatedTableData);
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
              // value={column.target_datatype || ""}
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
            <Form.Check />
          </td>
          <td>
            <Form.Check />
          </td>
          <td>
            <Form.Control />
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

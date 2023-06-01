// import { Table, Form, Input, Col, Row } from "react-bootstrap";
// import TableData from "./TableData";

// const headers = [...Object.keys(TableData), "TargetDatatype", "ValidationRule"];
// const ThData = () => {
//   return headers.map((name) => <th key={name}>{name}</th>);
// };

// const TbData = ({ formData }) => {
//   return formData.ColumnName.map((d, index) => (
//     <tr>
//       <td>{d}</td>
//       <td>{TableData.SourceDatatype[index]}</td>
//       <td>
//         <Form.Select aria-label="Default select example">
//           <option value="1">Datatype1</option>
//           <option value="2">Datatype2</option>
//           <option value="3">Datatype3</option>
//         </Form.Select>
//       </td>
//       <td>
//         <Form.Control></Form.Control>
//       </td>
//     </tr>
//   ));
// };
// export const DefineDataValidation = ({ formData }) => {
//   return (
//     <Table responsive>
//       <thead>
//         <tr>{ThData()}</tr>
//       </thead>
//       <tbody>
//         <TbData formData={formData} />
//       </tbody>
//     </Table>
//   );
// };

import React from "react";
import { Table, Form, Input, Col, Row } from "react-bootstrap";

const headers = [
  "Column Name",
  "Source Data Type",
  "Target Data Type",
  "Validation Rule",
];

export const DefineDataValidation = ({ formData }) => {
  console.log("formdata", formData);
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
              <Form.Control></Form.Control>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

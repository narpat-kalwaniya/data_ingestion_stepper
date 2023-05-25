import React from "react";
import { Table, Form, Input, Col, Row } from "react-bootstrap";
import TableData from "./TableData";

const headers = [
  "Policy Name",
  "Column Name",
  "PHI/PII Indicator",
  "Mask/Tokenize",
  "Masking Logic",
  "Role",
];

const checkHandler = () => {

}

const ThData = () => {
  return headers.map((name) => <th key = {name}> {name}</th>)
}

const TbData = () => {
  return TableData.ColumnName.map((d, index) => (
    <tr>
      <td></td>
      <td>{d}</td>
      <td></td>
      {/* <td>
                {TableData.SampleValues[index].map((val) => (
                  <p>{val}</p>
                ))}
              </td> */}
      <td>
        <Form.Check></Form.Check>
      </td>
      <td>
        <Form.Control></Form.Control>
      </td>
      <td>
        <Form.Control></Form.Control>
      </td>
    </tr>
  ));
};


const ApplyMasking = () => {
  return (
    <Table responsive>
      <thead>
        <tr>{ThData()}</tr>
      </thead>
      <tbody>{TbData()}</tbody>
    </Table>
  );
};

export default ApplyMasking;

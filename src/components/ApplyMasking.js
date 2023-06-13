import React from "react";
import { Table, Form, Input, Col, Row, FormCheck } from "react-bootstrap";
import TableData from "./TableData";

const headers = [
  // "Policy Name",
  "Column Name",
  // "PHI/PII Indicator",
  "Mask/Tokenize",
  "Masking Logic",
  // "Role",
];

const ThData = () => {
  return headers.map((name) => <th key={name}> {name}</th>);
};

const ApplyMasking = ({ formData, updateTargetLoad }) => {
  console.log("masking target load", updateTargetLoad);
  console.log("masking form data", formData);
  return (
    <Table responsive>
      <thead>
        <tr>{ThData()}</tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td>
            <FormCheck></FormCheck>
          </td>

          <td>
            <Form.Control></Form.Control>
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default ApplyMasking;

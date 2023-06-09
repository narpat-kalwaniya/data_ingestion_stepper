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

const ThData = () => {
  return headers.map((name) => <th key={name}> {name}</th>);
};

const ApplyMasking = ({ formData }) => {
  console.log("masking form", formData);
  return (
    <Table responsive>
      <thead>
        <tr>{ThData()}</tr>
      </thead>
    </Table>
  );
};

export default ApplyMasking;

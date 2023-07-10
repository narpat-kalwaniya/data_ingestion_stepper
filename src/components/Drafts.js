import React, { useEffect, useState } from "react";

import { styled } from "@mui/material/styles";
import { Table } from "react-bootstrap";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

function Drafts(drafts, setDrafts) {
  const headers = [
    "Module",
    "Source Entity Name",
    "Target Entity Name",
    "Status",
  ];

  console.log(drafts);

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

      <tbody style={{ fontSize: "12px" }}>
        {drafts.drafts.map((row, index) => (
          <tr
            key={index}
            style={{
              height: "20px",
            }}
          >
            <td>Data Ingestion</td>
            <td>{row.tableData[0].source_entity_name}</td>
            <td>{row.tableData[0].target_entity_name}</td>
            <td style={{ color: "red" }}>Draft</td>
            {/* <td style={{ color: "blue" }}>View</td>
            <td style={{ color: "blue" }}>Edit</td>
            <td style={{ color: "blue" }}>Delete</td> */}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default Drafts;

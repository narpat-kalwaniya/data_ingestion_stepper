import React, { useEffect, useState } from "react";

import { Table } from "react-bootstrap";

import { Trash } from "react-bootstrap-icons";

import { formContext } from "./formContext";
import { useContext } from "react";

function Drafts(props) {
  const headers = [
    "Module",
    "Source Entity Name",
    "Target Entity Name",
    "Status",
    "",
  ];

  console.log(props.formData);

  const rowClickHandler = (row) => {
    props.setFormData(row);
    props.setOpen(true);
    props.setStep(row.current_step);
    props.handleClose(
      "Batch Ingestion of Relational Sources for Single Entity"
    );
    console.log(props.formData);
  };

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
        {props.drafts.map((row, index) => (
          <tr
            key={index}
            style={{
              height: "20px",
              cursor: "default",
            }}
            onClick={(event) => rowClickHandler(row)}
          >
            <td>Data Ingestion</td>
            <td>{row.tableData[0].source_entity_name}</td>
            <td>{row.tableData[0].target_entity_name}</td>
            <td style={{ color: "red" }}>Draft</td>
            <td>
              <Trash className="trash" />
            </td>
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

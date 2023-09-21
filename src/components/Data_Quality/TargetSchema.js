import React, { useEffect, useState, useContext } from "react";
import { Table, Form, ProgressBar } from "react-bootstrap";

import AceEditor from "react-ace";
import { Add } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../styles/main.css";
import "../TargetSchemaMig.css";

// Import the SQL mode for Ace Editor (for SQL syntax highlighting)
import "ace-builds/src-noconflict/mode-sql";

// Import the GitHub theme for Ace Editor (or any other theme you prefer)
import "ace-builds/src-noconflict/theme-github";

const headers = ["Column Name", "Source Data Type", "Transformation Logic"];

const TargetSchema = () => {
  return (
    <>
      {/* <div
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
      </div> */}

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
            <Form.Check type="checkbox" checked="" />
            {headers.map((name, index) => (
              <th key={index}>{name}</th>
            ))}
          </tr>
        </thead>
        <tbody style={{ fontSize: "12px" }}></tbody>{" "}
        <tbody style={{ fontSize: "12px" }}>
          {" "}
          <td colSpan="7" style={{ textAlign: "right" }}>
            {" "}
            <span
              style={{
                cursor: "pointer",
                paddingTop: "10px",
                color: "#18749C",
              }}
            >
              + Add Column
            </span>
          </td>
          <tr
            style={{
              height: "20px",
            }}
          >
            <td>
              <Form.Check type="checkbox" checked="" />
            </td>
            <td> </td>
            <td>
              <Form.Control
                type="text"
                className="custom-select custom-style"
              />
            </td>

            <td style={{ width: "150px" }}>
              <AceEditor
                mode="sql" // Set the syntax highlighting mode to SQL
                theme="xcode" // Set the editor theme (e.g., 'github', 'monokai', 'dracula', etc.)
                // name={`query-${row.id}`}
                value=""
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
              <button className="delete-btn">
                <i className="bi bi-x-lg text-danger"></i>{" "}
                {/* bi-x-lg is the class for the larger "x" icon */}
              </button>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default TargetSchema;

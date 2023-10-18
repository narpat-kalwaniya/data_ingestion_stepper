import React from "react";
import { Table } from "react-bootstrap";

const MissingDataSource = () => {
  const headers = ["Modified Date", "Source", "Validation"];
  const tableData = [
    { date: "2023-10-17", text: "Source 1" },
    { date: "2023-10-18", text: "Source 2" },
    { date: "2023-10-19", text: "Source 3" },
  ];
  return (
    <div style={{ fontSize: "10px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p
          style={{
            fontSize: "12px",
            marginTop: "4px",
            marginBottom: "4px",
          }}
        >
          Missing Data Source
        </p>
      </div>
      <Table hover responsive bordered={false}>
        <thead
          style={{
            backgroundColor: "#F3F3F3",

            height: "30px",
            alignItems: "center",
          }}
        >
          <tr>
            {headers.map((header) => (
              <th>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.slice(0, 1).map((row, index) => (
            <tr
              key={index}
              style={{
                cursor: "pointer",
              }}
            >
              <td>{row.date}</td>
              <td>{row.text}</td>
              <td>
                <span
                  style={{
                    cursor: "pointer",
                    paddingTop: "10px",
                    color: "#18749C",
                  }}
                >
                  Not an Anomaly
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default MissingDataSource;

import React from "react";
import { Table } from "react-bootstrap";

const OrdinalPositionChanged = () => {
  const headers = [
    "Modified Date",
    "Source",
    "Attributes",
    "Previous",
    "Current",
    "Validation",
  ];
  const tableData = [
    { date: "2023-10-17", text: "Bookings", text1: "Passenger ID" },
    { date: "2023-10-18", text: "Flights", text1: "Departure Time" },
    { date: "2023-10-19", text: "Tickets", text1: "Price" },
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
          Ordinal Position Changed
        </p>
      </div>
      <Table hover responsive bordered={false}>
        <thead
          style={{
            backgroundColor: "#b3c100",

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
              <td>country_code</td>
              <td>5</td>
              <td>4</td>
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

export default OrdinalPositionChanged;

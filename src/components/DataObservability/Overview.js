import React, { useState } from "react";
import { Table } from "react-bootstrap";

const Overview = () => {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "30%" }}>
        <Table hover responsive>
          <thead
            style={{
              backgroundColor: "#F3F3F3",
              fontSize: "12px",
              height: "30px",
              alignItems: "center",
            }}
          >
            <tr>
              <td>Title</td>
              <td>Value</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>null values</td>
              <td>100</td>
            </tr>
          </tbody>
        </Table>
      </div>
      <div>content</div>
    </div>
  );
};

export default Overview;

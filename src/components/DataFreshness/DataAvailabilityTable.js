import React from "react";
import Table from "react-bootstrap/Table";

const data = [
  {
    id: 1,
    col1: "uat.public.youtube",
    col2: "Daily",
    col3: "May 13, 2023",
    col4: "May 7, 2023",
    col5: "6",
    col6: "Stale",
  },
  {
    id: 2,
    col1: "uat.public.youtube",
    col2: "Daily",
    col3: "May 13, 2023",
    col4: "May 7, 2023",
    col5: "6",
    col6: "Stale",
  },
  {
    id: 3,
    col1: "uat.public.youtube",
    col2: "Daily",
    col3: "May 13, 2023",
    col4: "May 7, 2023",
    col5: "6",
    col6: "Stale",
  },
  {
    id: 4,
    col1: "uat.public.youtube",
    col2: "Daily",
    col3: "May 13, 2023",
    col4: "May 7, 2023",
    col5: "6",
    col6: "Stale",
  },
  {
    id: 5,
    col1: "uat.public.youtube",
    col2: "Daily",
    col3: "May 13, 2023",
    col4: "May 7, 2023",
    col5: "6",
    col6: "Stale",
  },
  // Add more data rows as needed
];
const DataAvailabilityTable = () => {
  return (
    <div style={{ height: "300px", overflowY: "scroll" }}>
      <Table striped bordered hover responsive>
        <caption style={{ captionSide: "top", textAlign: "center" }}>
          Data Availability
        </caption>
        <thead>
          <tr>
            <th>Source</th>
            <th>Frequency</th>
            <th>Expected Date</th>
            <th>Actual Date</th>
            <th>Missing Period</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.col1}</td>
              <td>{row.col2}</td>
              <td>{row.col3}</td>
              <td>{row.col4}</td>
              <td>{row.col5}</td>
              <td>{row.col6}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DataAvailabilityTable;

import React from "react";
import Table from "react-bootstrap/Table";

const data = [
  {
    id: 1,
    col1: "uat.public.youtube",
    col2: "50",
    col3: "2",
  },
  {
    id: 2,
    col1: "uat.public.youtube",
    col2: "50",
    col3: "2",
  },
  {
    id: 3,
    col1: "uat.public.youtube",
    col2: "50",
    col3: "2",
  },
  {
    id: 4,
    col1: "uat.public.youtube",
    col2: "50",
    col3: "2",
  },
  {
    id: 5,
    col1: "uat.public.youtube",
    col2: "50",
    col3: "2",
  },
  // Add more data rows as needed
];
const FsdsTable = () => {
  return (
    <div style={{ height: "330px", overflowY: "scroll" }}>
      <Table striped bordered hover responsive>
        <caption style={{ captionSide: "top", textAlign: "center" }}>
          Frequently Failed Data Source (In Days)
        </caption>
        <thead>
          <tr>
            <th>Source</th>
            <th>Success Rate %</th>
            <th>Average Delay (In Days)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.col1}</td>
              <td>{row.col2}</td>
              <td>{row.col3}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default FsdsTable;

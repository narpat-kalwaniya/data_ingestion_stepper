import React, { useState } from "react";
import { Table } from "react-bootstrap";
import RunDetails from "./RunDetails";

const Runs = () => {
  const [isRowClicked, setIsRowClicked] = useState(false);
  const headers = ["header-1", "header-2", "header-3", "header-4"];
  const dummyData = [
    {
      id: 1,
      header1: "Run 1",
      header2: "Value 2",
      header3: "Value 3",
      header4: "Value 4",
    },
    {
      id: 2,
      header1: "Run 2",
      header2: "Value 8",
      header3: "Value 9",
      header4: "Value 10",
    },
  ];

  const rowclickHandler = () => {
    setIsRowClicked(true);
  };
  return (
    <div>
      {isRowClicked ? (
        <RunDetails />
      ) : (
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
              {headers.map((name, index) => (
                <th key={index}>{name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dummyData.map((row) => (
              <tr key={row.id} onClick={rowclickHandler}>
                <td>{row.header1}</td>
                <td>{row.header2}</td>
                <td>{row.header3}</td>
                <td>{row.header4}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default Runs;

import React, { useState, useContext } from "react";
import { Table } from "react-bootstrap";
import RunDetails from "./RunDetails";
import { mycontext } from "./DataObservability";

const Runs = (props) => {
  const { steps, setSteps, isRowClicked, setIsRowClicked } =
    useContext(mycontext);
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

  const rowclickHandler = (row) => {
    setIsRowClicked(true);
    const updatedSteps = [...steps];
    updatedSteps[1] = row.header1;
    setSteps(updatedSteps);
  };
  // const steps = useContext(mycontext).steps;
  // const setSteps = useContext(mycontext).setSteps;
  console.log(steps);
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
              <tr key={row.id} onClick={() => rowclickHandler(row)}>
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

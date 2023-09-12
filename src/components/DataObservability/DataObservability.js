import React, { useEffect, useState, createContext } from "react";

import { Card, Col, Row, Table } from "react-bootstrap";
import Runs from "./Runs";
import SearchBarsRow from "./SearchBars";
import { Button, ButtonGroup, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Path from "./Path";

const mycontext = createContext();

const DataObservability = () => {
  const [isDetails, setIsDetails] = useState(false);
  const [steps, setSteps] = useState([]);
  const [isRowClicked, setIsRowClicked] = useState(false);
  const [activeTab, setActiveTab] = useState("Overview");

  const headers = [
    "Pipeline ID",
    "Pipeline Type",
    "Name",
    "Input",
    "Scheduled Status",
    "Last Execution Status",
    "Last Executed DateTime",
  ];
  const dummyData = [
    {
      id: 1,
      header1: "Pipeline 1",
      header2: "Value 2",
      header3: "Value 3",
      header4: "Value 4",
      header5: "Value 5",
      header6: "Value 6",
    },
    {
      id: 2,
      header1: "Pipeline 2",
      header2: "Value 8",
      header3: "Value 9",
      header4: "Value 10",
      header5: "Value 11",
      header6: "Value 12",
    },
    {
      id: 3,
      header1: "Pipeline 3",
      header2: "Value 14",
      header3: "Value 15",
      header4: "Value 16",
      header5: "Value 17",
      header6: "Value 18",
    },
  ];

  const rowclickHandler = (row) => {
    setIsDetails(true);
    console.log(row.header1);
    const updatedSteps = [...steps, row.header1];
    setSteps(updatedSteps);
  };

  const backHandler = () => {
    setIsDetails(false);
  };

  return (
    <Col style={{ marginLeft: "20px" }}>
      {!isDetails ? (
        <Row>
          <Col>
            <SearchBarsRow />
          </Col>
        </Row>
      ) : null}

      {/* <div style={{ position: "relative", width: "100px" }}>
        <Row>
          <ButtonGroup className="navigation-buttons">
            <Button
              variant="light"
              onClick={() => backHandler()}
              // disabled={currentPage === 1}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </Button>
            <Button
              variant="light"
              // onClick={() => handlePageChange(1)}
              // disabled={currentPage === 5}
              // Assuming you have a maximum of 5 pages, adjust as needed
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </Button>
          </ButtonGroup>
        </Row>
      </div> */}
      <mycontext.Provider
        value={{
          steps,
          setSteps,
          isRowClicked,
          setIsRowClicked,
          activeTab,
          setActiveTab,
          setIsDetails,
          isDetails,
        }}
      >
        <Path />
      </mycontext.Provider>
      <Card
        className="Card-outer custom-card-body "
        style={{
          minHeight: "300px",
          marginRight: "20px",
          marginTop: "100px",
        }}
      >
        <Row>
          <Col>
            {!isDetails ? (
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
                      <td>{row.header5}</td>
                      <td>{row.header6}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <mycontext.Provider
                value={{
                  steps,
                  setSteps,
                  isRowClicked,
                  setIsRowClicked,
                  activeTab,
                  setActiveTab,
                }}
              >
                <Runs />
              </mycontext.Provider>
            )}
          </Col>
        </Row>
      </Card>
    </Col>
  );
};
export { mycontext };

export default DataObservability;

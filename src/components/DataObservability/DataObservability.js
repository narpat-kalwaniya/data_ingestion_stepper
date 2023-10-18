import React, { useEffect, useState, createContext } from "react";

import { Card, Col, Row, Table } from "react-bootstrap";
import Runs from "./Runs";
import SearchBarsRow from "./SearchBars";
import { Button, ButtonGroup, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Path from "./Path";
import PipelineChart from "./PipelineChart";
import Counter from "./Counter";
import TaskDetails from "./TaskDetails";

const mycontext = createContext();

const DataObservability = () => {
  const [isDetails, setIsDetails] = useState(false);
  const [steps, setSteps] = useState([]);
  const [isRowClicked, setIsRowClicked] = useState(false);
  const [activeTab, setActiveTab] = useState("Overview");
  const [isTaskClicked, setIsTaskClicked] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [pipelineLogs, setPipelineLogs] = useState([]);
  const [filteredPipeLogs, setFilteredPipeLogs] = useState([]);
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [chartView, setChartView] = useState(null);
  const [selectedRun, setSelectedRun] = useState(null);

  const headers = [
    "Pipeline ID",
    "Pipeline Type",
    "Name",
    "Input",
    "Scheduled Status",
    "Last Execution Status",
    "Last Executed DateTime",
    // "No. of Tasks",
    "",
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
      Tasks: ["Task1", "Task2", "Task3"],
    },
    {
      id: 2,
      header1: "Pipeline 2",
      header2: "Value 8",
      header3: "Value 9",
      header4: "Value 10",
      header5: "Value 11",
      header6: "Value 12",
      Tasks: ["Task1", "Task2"],
    },
    {
      id: 3,
      header1: "Pipeline 3",
      header2: "Value 14",
      header3: "Value 15",
      header4: "Value 16",
      header5: "Value 17",
      header6: "Value 18",
      Tasks: ["Task1", "Task2", "Task3"],
    },
  ];

  const rowclickHandler = (row, index) => {
    setIsDetails(true);
    const updatedSteps = [...steps, row.pipeline_name];
    setSteps(updatedSteps);
    setIsTaskClicked(false);
    setSelectedRow(index);
    setChartView(null);
  };

  const openTasksHandler = (row, index) => {
    setIsTaskClicked(!isTaskClicked);
    setSelectedRow(index);
  };

  useEffect(() => {
    const fetchPipelineLogs = async () => {
      try {
        const response = await fetch(
          `http://ec2-54-197-121-247.compute-1.amazonaws.com:8001/pipelogs/`
        );
        const data = await response.json();
        setPipelineLogs(data);
        setFilteredPipeLogs(data);
      } catch (error) {
        console.error("Error fetching pipelineLogs:", error);
      }
    };
    fetchPipelineLogs();
  }, []);

  console.log(pipelineLogs);
  console.log(filteredPipeLogs);

  const backHandler = () => {
    setIsDetails(false);
  };

  const lineageHandler = (index) => {
    setChartView(index);
    setSelectedRow(index);
  };

  const chartCloseHandler = () => {
    setChartView(null);
  };

  const filterData = (searchTerm) => {
    const filteredItems = pipelineLogs.filter((item) =>
      item.pipeline_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPipeLogs(filteredItems);
  };

  console.log(chartView);
  // console.log(
  //   pipelineLogs[0].executions[pipelineLogs[0].executions.length - 1].tasks[
  //     pipelineLogs[0].executions[pipelineLogs[0].executions.length - 1].tasks
  //       .length - 1
  //   ].validation_result
  // );

  return (
    <Col>
      {!isDetails ? (
        <Row>
          <Col>
            <SearchBarsRow
              filterData={filterData}
              filteredPipeLogs={filteredPipeLogs}
            />
            {/* <Counter pipelineLogs={pipelineLogs} /> */}
          </Col>
        </Row>
      ) : null}

      {isDetails ? (
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
            showTaskDetails,
            setShowTaskDetails,
            selectedRun,
            setSelectedRun,
          }}
        >
          <Path />
        </mycontext.Provider>
      ) : null}

      <Card
        className="Card-outer custom-card-body "
        style={{
          minHeight: "300px",
          // marginRight: "20px",
          // marginTop: "100px",
        }}
      >
        <Row>
          <Col>
            {!isDetails ? (
              <Table hover responsive bordered={false}>
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
                  {filteredPipeLogs.map((row, index) => (
                    <tr
                      key={index}
                      style={{
                        cursor: "pointer",
                        backgroundColor:
                          selectedRow === index ? "#f7a84f" : null,
                        fontSize: "12px",
                      }}
                    >
                      <td onClick={() => rowclickHandler(row, index)}>
                        {row.executions[0].tasks[0].pipeline_id}
                      </td>
                      <td onClick={() => rowclickHandler(row, index)}></td>
                      <td onClick={() => rowclickHandler(row, index)}>
                        {" "}
                        {row.pipeline_name}
                      </td>
                      <td onClick={() => rowclickHandler(row, index)}></td>
                      <td onClick={() => rowclickHandler(row, index)}></td>
                      <td
                        onClick={() => rowclickHandler(row, index)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <div className="status-cell">
                          <span
                            className={`status-dot ${
                              ["failed", "error"].some((s) =>
                                row.executions[row.executions.length - 1].tasks[
                                  row.executions[row.executions.length - 1]
                                    .tasks.length - 1
                                ].validation_result
                                  .toLowerCase()
                                  .includes(s)
                              )
                                ? "failure-dot"
                                : "success-dot"
                            }`}
                          ></span>
                        </div>
                        {
                          row.executions[row.executions.length - 1].tasks[
                            row.executions[row.executions.length - 1].tasks
                              .length - 1
                          ].validation_result
                        }
                      </td>
                      <td onClick={() => rowclickHandler(row, index)}>
                        {
                          row.executions[row.executions.length - 1]
                            .dag_execution_start_time
                        }
                      </td>
                      {/* <td onClick={() => openTasksHandler(row, index)}>
                        
                      </td> */}
                      <td onClick={() => lineageHandler(index)}>
                        <span
                          style={{
                            cursor: "pointer",
                            paddingTop: "10px",
                            color: "#18749C",
                          }}
                        >
                          Chart View
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : showTaskDetails ? (
              <mycontext.Provider
                value={{ steps, setSteps, activeTab, setActiveTab }}
              >
                <TaskDetails />
              </mycontext.Provider>
            ) : (
              <mycontext.Provider
                value={{
                  steps,
                  setSteps,
                  isRowClicked,
                  setIsRowClicked,
                  activeTab,
                  setActiveTab,
                  showTaskDetails,
                  setShowTaskDetails,
                  selectedRow,
                  selectedRun,
                  setSelectedRun,
                  pipelineLogs,
                }}
              >
                <Runs selectedRow={selectedRow} pipelineLogs={pipelineLogs} />
              </mycontext.Provider>
            )}
          </Col>
          {chartView | (chartView === 0) ? (
            <Col xs={4}>
              <div className="d-flex justify-content-end">
                <Button
                  variant="outline-danger"
                  className="close-x"
                  style={{ padding: "0.1rem 0.3rem" }}
                  onClick={() => chartCloseHandler()}
                >
                  <span aria-hidden="true">&times;</span> {/* Close icon (X) */}
                </Button>
              </div>
              <PipelineChart></PipelineChart>
            </Col>
          ) : null}
        </Row>
      </Card>
    </Col>
  );
};
export { mycontext };

export default DataObservability;

import React, { useState, useContext } from "react";
import { Row, Tab, Table, Tabs } from "react-bootstrap";

import { mycontext } from "./DataObservability";
import { BiListCheck, BiBarChart, BiBell } from "react-icons/bi";
import { AiOutlineFileText } from "react-icons/ai";
import Tasks from "./Tasks";

const Runs = (props) => {
  const {
    steps,
    setSteps,
    isRowClicked,
    setIsRowClicked,
    showTaskDetails,
    setShowTaskDetails,
    selectedRow,
    selectedRun,
    setSelectedRun,
    pipelineLogs,
  } = useContext(mycontext);
  const [activeTab, setActiveTab] = useState("Run List");

  const headers = [
    "Run ID",
    "Pipeline ID",
    "Pipeline Type",
    "Name",
    "Input",
    "Scheduling Status",
    "Execution Status",
    "Execution DateTime",
  ];
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

  const rowclickHandler = (row, index) => {
    setIsRowClicked(true);
    const updatedSteps = [...steps.slice(0, 2)];
    updatedSteps[1] = row.tasks[0].log_id;
    setSteps(updatedSteps);
    setSelectedRun(index);
    setShowTaskDetails(false);
  };
  const handleTabChange = (tab) => {
    // console.log(steps);
    setActiveTab(tab);
    // const updatedSteps = [...steps];
    // updatedSteps[2] = tab;
    // setSteps(updatedSteps);
  };
  // const steps = useContext(mycontext).steps;
  // const setSteps = useContext(mycontext).setSteps;
  console.log(props.pipelineLogs[props.selectedRow]);
  console.log(steps);
  return (
    <div>
      <Row style={{ marginLeft: "0px", marginRight: "10px" }}>
        <Tabs activeKey={activeTab} onSelect={handleTabChange} className="mb-3">
          <Tab
            eventKey="Run List"
            title={
              <>
                <BiListCheck /> Run List
              </>
            }
          >
            {/* Content for Tab 1 */}
          </Tab>
          <Tab
            eventKey="Logs"
            title={
              <>
                <AiOutlineFileText /> Logs
              </>
            }
          >
            {/* Content for Tab 2 */}
          </Tab>
          <Tab
            eventKey="Metrics"
            title={
              <>
                <BiBarChart /> Metrics
              </>
            }
          >
            {/* Content for Tab 3 */}
          </Tab>
          <Tab
            eventKey="Alerts"
            title={
              <>
                <BiBell /> Alerts
              </>
            }
          >
            {/* Content for Tab 4 */}
          </Tab>
        </Tabs>

        <div className="content-container">
          {/* Content based on activeTab */}
          {activeTab === "Run List" && (
            <Table hover responsive>
              <thead
                style={{
                  backgroundColor: "#F3F3F3",
                  fontSize: "12px",
                  height: "30px",
                  alignItems: "center",
                }}
              >
                <tr
                  style={{
                    cursor: "pointer",
                    // backgroundColor:
                    //   selectedRow === row.id ? "#ced4da" : null,
                    fontSize: "12px",
                  }}
                >
                  {headers.map((name, index) => (
                    <th key={index}>{name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {props.pipelineLogs[props.selectedRow].executions.map(
                  (row, index) => (
                    <tr
                      key={index}
                      onClick={() => rowclickHandler(row, index)}
                      style={{
                        cursor: "pointer",
                        backgroundColor:
                          selectedRun === index ? "#f7a84f" : null,
                        fontSize: "12px",
                      }}
                    >
                      <td>{row.tasks[0].log_id}</td>
                      <td>{row.header2}</td>
                      <td>{row.header3}</td>
                      <td>{row.header4}</td>
                    </tr>
                  )
                )}
              </tbody>
            </Table>
          )}
          {activeTab === "Logs" && <div>Content for Tab 2</div>}
          {activeTab === "Metrics" && <div>Content for Tab 3</div>}
          {activeTab === "Alerts" && <div>Content for Tab 4</div>}
        </div>
      </Row>
      {isRowClicked ? (
        <Tasks
          tasks={
            props.pipelineLogs[props.selectedRow].executions[selectedRun].tasks
          }
        />
      ) : null}
    </div>
  );
};

export default Runs;

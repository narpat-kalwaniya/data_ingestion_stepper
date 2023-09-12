import React, { useState, useContext } from "react";
import { Row, Tab, Table, Tabs } from "react-bootstrap";
import RunDetails from "./RunDetails";
import { mycontext } from "./DataObservability";
import { BiListCheck, BiBarChart, BiBell } from "react-icons/bi";
import { AiOutlineFileText } from "react-icons/ai";

const Runs = (props) => {
  const { steps, setSteps, isRowClicked, setIsRowClicked } =
    useContext(mycontext);
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

  const rowclickHandler = (row) => {
    setIsRowClicked(true);
    const updatedSteps = [...steps];
    updatedSteps[1] = row.header1;
    setSteps(updatedSteps);
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
  console.log(steps);
  return (
    <div>
      {isRowClicked ? (
        <RunDetails />
      ) : (
        <Row style={{ marginLeft: "0px", marginRight: "10px" }}>
          <Tabs
            activeKey={activeTab}
            onSelect={handleTabChange}
            className="mb-3"
          >
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
            {activeTab === "Logs" && <div>Content for Tab 2</div>}
            {activeTab === "Metrics" && <div>Content for Tab 3</div>}
            {activeTab === "Alerts" && <div>Content for Tab 4</div>}
          </div>
        </Row>
      )}
    </div>
  );
};

export default Runs;

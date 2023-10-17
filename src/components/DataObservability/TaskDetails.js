import React, { useContext, useState } from "react";
import { Tabs, Tab, Container, Card, Row } from "react-bootstrap";
import "../../styles/main.css";
import Overview from "./Overview";
import { mycontext } from "./DataObservability";
import { BiListCheck, BiBarChart, BiBell, BiGrid } from "react-icons/bi";
import { AiOutlineFileText } from "react-icons/ai";

const TaskDetails = (props) => {
  // Set the default active tab
  const {
    steps,
    setSteps,
    isRowClicked,
    setIsRowClicked,
    activeTab,
    setActiveTab,
  } = useContext(mycontext);

  const handleTabChange = (tab) => {
    console.log(steps);
    setActiveTab(tab);
    const updatedSteps = [...steps];
    updatedSteps[3] = tab;
    setSteps(updatedSteps);
  };
  console.log(activeTab);
  return (
    <Row style={{ marginLeft: "0px", marginRight: "10px" }}>
      <Tabs activeKey={activeTab} onSelect={handleTabChange} className="mb-3">
        <Tab
          eventKey="Overview"
          title={
            <>
              <BiGrid /> Overview
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
        {activeTab === "Overview" && <Overview />}
        {activeTab === "Logs" && <div>Content for Tab 2</div>}
        {activeTab === "Metrics" && <div>Content for Tab 3</div>}
        {activeTab === "Alerts" && <div>Content for Tab 4</div>}
      </div>
    </Row>
  );
};

export default TaskDetails;

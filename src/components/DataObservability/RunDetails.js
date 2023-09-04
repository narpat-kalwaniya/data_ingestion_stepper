import React, { useState } from "react";
import { Tabs, Tab, Container, Card, Row } from "react-bootstrap";
import "../../styles/main.css";
import Overview from "./Overview";

const RunDetails = () => {
  const [activeTab, setActiveTab] = useState("tab1"); // Set the default active tab

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  return (
    <Row style={{ marginLeft: "0px", marginRight: "10px" }}>
      <Tabs activeKey={activeTab} onSelect={handleTabChange} className="mb-3">
        <Tab eventKey="Overview" title="Overview">
          {/* Content for Tab 1 */}
        </Tab>
        <Tab eventKey="Logs" title="Logs">
          {/* Content for Tab 2 */}
        </Tab>
        <Tab eventKey="Metrics" title="Metrics">
          {/* Content for Tab 3 */}
        </Tab>
        <Tab eventKey="Alerts" title="Alerts">
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

export default RunDetails;

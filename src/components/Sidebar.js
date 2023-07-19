import React, { useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Container fluid>
      <Row>
        <Col xs={3} className={sidebarOpen ? "open" : "closed"}>
          {/* Sidebar content */}
        </Col>
        <Col xs={9}>{/* Main content */}</Col>
      </Row>
      <Button onClick={toggleSidebar}>
        {sidebarOpen ? "Close Sidebar" : "Open Sidebar"}
      </Button>
    </Container>
  );
};

export default Sidebar;

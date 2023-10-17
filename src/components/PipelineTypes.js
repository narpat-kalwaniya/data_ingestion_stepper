import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaCode, FaDatabase, FaServer } from "react-icons/fa";
import "../styles/main.css";

const PipelineTypes = () => {
  const pipelines = [
    {
      title: "Batch Ingestion of Relational Sources for Single Entity",
      icon: <FaCode size={30} />,
    },
    { title: "Data Migration", icon: <FaDatabase size={30} /> },
    { title: "Upload Data From UI", icon: <FaServer size={30} /> },
    { title: "Realtime Ingestion", icon: <FaServer size={30} /> },
    { title: "ELT-Transformations", icon: <FaDatabase size={30} /> },
    { title: "Data Quality Pipelines", icon: <FaServer size={30} /> },
    { title: "Data Masking Pipelines", icon: <FaServer size={30} /> },
    { title: "Snowpark Development Notebook", icon: <FaDatabase size={30} /> },
    {
      title: "Streamlit App Development Notebook",
      icon: <FaServer size={30} />,
    },
    {
      title: "Snowflake Data Consumption Pipelines",
      icon: <FaServer size={30} />,
    },
    // Add more pipeline types here
  ];

  return (
    <div className="full-screen-page">
      <Container fluid>
        <Row>
          {pipelines.map((pipeline, index) => (
            <Col key={index} md={3} className="pipeline-card">
              <div className="icon-container">{pipeline.icon}</div>
              <div className="title-container text-left">
                <h2>{pipeline.title}</h2>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default PipelineTypes;

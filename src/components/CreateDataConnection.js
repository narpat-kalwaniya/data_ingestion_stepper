import React, { useState, useEffect, useContext } from "react";
import { Container, Form, Row, Col, Card, Button } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { DataContext } from "./DataContext";
import "../styles/main.css";
import "./CreateDataConnection.css";

const CreateDataConnection = ({ formData, updateFormData, step, errors }) => {
  const [connections, setConnections] = useState([]);
  const [applications, setApplications] = useState([]);
  const { ingestionData, updateIngestionData } = useContext(DataContext);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const response = await fetch(
          "http://ec2-54-197-121-247.compute-1.amazonaws.com:8000/conndetails/"
        );
        const data = await response.json();
        setConnections(data);
      } catch (error) {
        console.error("Error fetching connections:", error);
      }
    };

    const fetchApplications = async () => {
      try {
        const response = await fetch(
          "http://ec2-54-197-121-247.compute-1.amazonaws.com:8000/appdetails/"
        );
        const data = await response.json();
        setApplications(data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchConnections();
    fetchApplications();
  }, []);

  const handleSelection = (event) => {
    const selectedConnectionName = event.target.value;
    const updatedFormData = {
      ...formData,
      CreateDataConnection: {
        ...formData.CreateDataConnection,
        dataSource: selectedConnectionName,
      },
      sourceEntity: {
        ...formData.sourceEntity,
        connection_id: connections[0].connection_id,
      },
    };
    updateFormData(updatedFormData);

    const updatedData = {
      source_connection_id: selectedConnectionName,
      app_id: connections[0].app_id,
    };
    updateIngestionData(updatedData);
  };

  const handleTargetSelection = (event) => {
    const selectedConnectionName = event.target.value;
    const updatedFormData = {
      ...formData,
      CreateDataConnection: {
        ...formData.CreateDataConnection,
        dataTarget: selectedConnectionName,
      },
    };
    updateFormData(updatedFormData);

    const updatedData = {
      target_connection_id: selectedConnectionName,
    };
    updateIngestionData(updatedData);
  };

  const handleApplicationSelection = (event) => {
    const selectedApplicationName = event.target.value;
    const updatedFormData = {
      ...formData,
      CreateDataConnection: {
        ...formData.CreateDataConnection,
        application: selectedApplicationName,
      },
    };
    updateFormData(updatedFormData);
  };

  const filteredSourceConnections = connections.filter(
    (connection) => connection.connection_type === "POSTGRES"
  );
  const filteredTargetConnections = connections.filter(
    (connection) => connection.connection_type === "SNOWFLAKE"
  );

  console.log("form data", formData);

  console.log("ingestion data", ingestionData);

  return (
    <div className="page1">
      <Row>
        <Card.Body>
          <div className="text-left">
            <Form>
              <Row>
                <div>
                  <Row className="mb-3">
                    <Form.Label>
                      Data Source Connection{" "}
                      <span className="text-danger">*</span>
                    </Form.Label>
                    <Col>
                      <Form.Select
                        onChange={handleSelection}
                        value={formData.CreateDataConnection.dataSource}
                        isInvalid={errors.dataSource}
                        required
                      >
                        <option value="">-- Select --</option>{" "}
                        {filteredSourceConnections.map((connection) => (
                          <option
                            key={connection.connection_id}
                            value={connection.connection_name}
                          >
                            {connection.connection_name}
                          </option>
                        ))}
                      </Form.Select>
                      {errors.dataSource && (
                        <div className="error">{errors.dataSource}</div>
                      )}
                    </Col>
                    <Col>
                      <Icon.CloudPlusFill size={40} className="icon" />
                    </Col>
                  </Row>
                </div>
                <div>
                  <Row className="mb-3">
                    <Form.Label>
                      Data Target Connection{" "}
                      <span className="text-danger">*</span>
                    </Form.Label>
                    <Col>
                      <Form.Select
                        onChange={handleTargetSelection}
                        value={formData.CreateDataConnection.dataTarget}
                        isInvalid={errors.dataTarget}
                        required
                      >
                        <option value="">-- Select --</option>{" "}
                        {filteredTargetConnections.map((connection) => (
                          <option
                            key={connection.connection_id}
                            value={connection.connection_name}
                          >
                            {connection.connection_name}
                          </option>
                        ))}
                      </Form.Select>
                      {errors.dataTarget && (
                        <div className="error">{errors.dataTarget}</div>
                      )}
                    </Col>
                    <Col>
                      <Icon.PatchPlusFill size={40} className="icon" />
                    </Col>
                  </Row>
                </div>
                <div>
                  <Row className="mb-3">
                    <Form.Label>
                      Application <span className="text-danger">*</span>
                    </Form.Label>
                    <Col>
                      <Form.Select
                        onChange={handleApplicationSelection}
                        value={formData.CreateDataConnection.application}
                        isInvalid={errors.application}
                        required
                      >
                        <option value="">-- Select --</option>{" "}
                        {applications.map((application) => (
                          <option
                            key={application.app_id}
                            value={application.app_name}
                          >
                            {application.app_name}
                          </option>
                        ))}
                      </Form.Select>
                      {errors.application && (
                        <div className="error">{errors.application}</div>
                      )}
                    </Col>
                    <Col>
                      <Icon.WindowPlus className="icon" size={40} />
                    </Col>
                  </Row>
                </div>
              </Row>
            </Form>
          </div>
        </Card.Body>
      </Row>
    </div>
  );
};

export default CreateDataConnection;

import React, { useState, useEffect } from "react";
import { Container, Form, Row, Col, Card, Button } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";

const CreateDataConnection = ({ formData, updateFormData }) => {
  const [connections, setConnections] = useState([]);
  const [applications, setApplications] = useState([]);

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
      dataSource: selectedConnectionName,
      sourceEntity: {
        ...formData.sourceEntity,
        connection_id: connections[0].app_id,
      },
    };
    updateFormData(updatedFormData);
  };

  const handleTargetSelection = (event) => {
    const selectedConnectionName = event.target.value;
    const updatedFormData = { ...formData, dataTarget: selectedConnectionName };
    updateFormData(updatedFormData);
  };

  const handleApplicationSelection = (event) => {
    const selectedApplicationName = event.target.value;
    const updatedFormData = {
      ...formData,
      application: selectedApplicationName,
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

  return (
    <div className="page1">
      <Row>
        <Card.Body>
          <div className="text-left">
            <Form>
              <Row>
                <div>
                  <Row>
                    <Form.Label>Data Source Connection</Form.Label>
                    <Col>
                      <Form.Select onChange={handleSelection}>
                        <option value="">Select Source Connection</option>
                        {filteredSourceConnections.map((connection) => (
                          <option
                            key={connection.connection_id}
                            value={connection.connection_name}
                          >
                            {connection.connection_name}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                    <Col>
                      <Icon.CloudPlusFill size={40} className="icon" />
                    </Col>
                  </Row>
                </div>
                <div>
                  <Row>
                    <Form.Label>Data Target Connection</Form.Label>
                    <Col>
                      <Form.Select onChange={handleTargetSelection}>
                        <option value="">Select Target Connection</option>
                        {filteredTargetConnections.map((connection) => (
                          <option
                            key={connection.connection_id}
                            value={connection.connection_name}
                          >
                            {connection.connection_name}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                    <Col>
                      <Icon.PatchPlusFill size={40} className="icon" />
                    </Col>
                  </Row>
                </div>
                <div>
                  <Row>
                    <Form.Label>Application</Form.Label>
                    <Col>
                      <Form.Select onChange={handleApplicationSelection}>
                        <option value="">Select Application</option>
                        {applications.map((application) => (
                          <option
                            key={application.app_id}
                            value={application.app_name}
                          >
                            {application.app_name}
                          </option>
                        ))}
                      </Form.Select>
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
